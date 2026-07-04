---
layout: post
postid: PO-260704-01
permalink: /posts/2026-07-04-Lessons-from-PRISONIA-part-2.html
type: post
lang: en
locale: en_US
title: "Lessons from PRISONIA, part 2"
description: "C# obfuscation, re-developing the tilemap, NPCs and navigation."
date: 2026-07-04t15:50:00+02:00
categories:
  - Post
tags:
  - 2026
  - PRISONIA
  - Devlog
  - Game
  - Game development
  - AlexTECPlayz
  - State of affairs
  - Project Jailbird
image_banner_link: /images/post-thumbnails/2026-02-24-lessons-from-prisonia-part-two.webp
toc: true
---

Hi there! It's been a few months. How are you holding up?

I've been somewhat well; I'm quite surprised that I managed to not burn myself out and that I've managed to keep quite a good track record of commits and work on PRISONIA. So what's the deets? How are things progressing?

This post was initially supposed to release on June 1st, but I had more progress, so it was delayed until July.

## Developing a custom tilemap in a 3D space (part 2)

While my optimized tilemap idea *was* great at the time, it was largely clinging on the idea that I'll somehow manage to draw at runtime on the tilemap the tiles based on my tileset, using BlitTexture. That...didn't work.

Fortunately, I've stumbled upon the [TileMapLayer3D](https://github.com/DanTrz/TileMapLayer3D) plugin, which is unbelievably powerful, and it's basically now my tilemap system. If I had money I could spend right now, I would donate to Dan.

Under the hood, it uses 'chunk' MultiMeshArrays that are built from PackedInt32Arrays for a few types of tiles, but for me, I've modified the plugin slightly. It supports square tiles (planes), boxes, triangles, and prisms. I've cut it down to only squares and boxes for my use case. These types are just MultiMesh (derived from GeometryInstance3D).

My biggest problem is that the plugin is not exactly well-documented in the repo for programmatic placement and deletion of tiles. Fortunately, [Dan has a comment on how to place tiles programmatically](https://github.com/DanTrz/TileMapLayer3D/discussions/14).

And this worked well! Up until I increased the amount of layers I use and the tilemap size (and of course, rendering 11 floors at once). By default, the play area is 128x128 for a small prison. This divides into 16 32x32 chunks. Placement quickly became stuttery as it basically has to rebuild the whole mesh for that layer.

In comes my idea to only update and rebuild the specific tiles you place, without affecting the other tiles. Here it is in practice:

{% video %}
/images/post-media/2026/PRISONIA/lessons2_performant_tps.webm alt="" title=""
{% endvideo %}

It's smooth and reliable; it causes no noticeable hitches or stutters when you place tiles and then rebuild the chunks. It should hopefully scale well for prisons larger than 128x128. I will keep the 32x32 chunk divide, though I think it's a good sweet spot between performance and RAM usage. More tilemaps (with their own tile data) means more RAM usage, which is, of course, undesirable, but I think this is a good compromise.

{% aside postid %}
**NOTE** that here I'm talking about the game's RAM usage in the editor. I tested PRISONIA as a standalone executable on Linux, and it seems to use ~1.1 GiB of RAM and ~530 MiB of VRAM as of **June 6, 2026**. I'm not sure if I can cut that down more; I'll look into it. Android RAM + VRAM usage may be different.
{% endaside %}

Unfortunately, this comes at the cost of increased RAM usage; however, I think it's worth the current trade-off. At this stage, a 128x128 tilemap uses 196.2 MiB of RAM, 32 MB of which is both tile data (`Jailbird_Data_Tile`, that stores the actual game's tile positions, IDs, etc.) and tilemap layer data (internal 'chunks' filled with tiles used by `TileMapLayer3D`). This is an increase from the 88.09 MiB amount I shared in the table in [part 1]({{site.baseurl}}/posts/2026-02-24-Lessons-from-PRISONIA-part-1.html).

VRAM has also increased, at 430.0 MiB, now that I use both a texture for the whole tile set and a texture for normal maps, plus a texture for characters. This is an increase from a whopping 75.20 MiB VRAM.

There's also been an increase for the initial loading time of the map. For a 128x128 tilemap, it takes roughly 11 seconds to see the first rendered frame while running the project via the Godot editor. It shouldn't be a major issue, though, but I've tried and keep exploring ways to bring this down, but it ultimately falls to a bottleneck in how I both generate the tile data (which is quite fast in the step, and the tile data generation is handled by spawning multiple threads before handing it off back to the main thread once complete) and then request `TileMapLayer3D` to build the tilemap arrays from the resulted data.

Oh, did I mention normal maps? That's also an addition I made to the TileMapLayer3D plugin. Independently of that, the shaders also received a small fix for flipped tiles. You see, if you flip a tile, it uses the backface's shading, so if the scene receives shadows, for example, the flipped tiles will always be darker since they're not using the correct face.

And yes, shadows work.

{% video %}
/images/post-media/2026/PRISONIA/lessons2_layer_shadows.webm alt="" title=""
{% endvideo %}

## Re-developing a custom tilemap system

You presumably read through the whole section before this one. Take it and throw it into your brain's recycle bin. Because that's still slow and uses a lot of RAM. And I replaced it with a new system on June 30.

Build the tilemap via a shader, and throw it on a Rect/MeshInstance3D with a Quad mesh. It's that simple. On demand, create additional layers. Okay, let me expand on this:

TileMapLayer3D is pretty good, but it's heavy enough on slower computers (and large tilemaps) that you will notice a stutter each time you place a tile or something. So I modified TML3D, which allowed me to directly update in place. The way TML3D works is that when you run `save_tile_data_direct`, and if a tile already exists at the requested position, it would first delete it before adding a new tile to the columnar storage. And that works, but it becomes expensive once you have a 32x32 tilemap, and more so with increasing chunk sizes.

So instead, I added a check, and if there is a tile there, it no longer deletes it, but via a new function `_update_tile_columnar_at()` it could update in place without this expensive intermediary step.

And that worked, but the RAM still increases (and is heavier on the GPU), especially when you also create the data in RAM for the tilemap(s). So I stuck to this for now while pondering a lighter solution. BlitTexture wouldn't work since it has some restrictions on how many textures you can use, and it didn't seem to work in my testing, but it's likely that I was just using it wrong. So I returned to wondering if I could instead create a custom tilemap texture that's fed to the shader and updated when needed.

And the answer is yes, you can!

I pass in my albedo and normal textures and create an RGBA8 map texture that encodes per cell which atlas tile to use and how to transform it (rotation, flip). And the tilemap system currently has only 12 functions, only 1 of which is inspired by TML3D, the save_tile_data_direct function, and I'm reusing its GlobalUtil file.

This system stores the tile info metadata dictionary keyed by a 64-bit unique tile key generated from grid position and orientation. Tile metadata stored is currently x, z (cell indices), the UV rect, mesh rotation, and if it's flipped. The map texture passed to the shader stores (one pixel per cell, so if the chunk is 32x32, the texture is also 32x32) as packed fields the encoded per-cell tile selection and state.

So the performance difference is now (while running in the editor, not standalone):

| Tilemap system used / Performance category | TileMapLayer3D-based with modifications | quad + shader |
| ------------------------------------------ | --------------------------------------- | ------------- |
| RAM usage (128x128 tilemap with 32x32 'chunks') + time to generate | 530MiB (baseline), ~16 seconds | 188.4 MiB, ~4.5 seconds |
| RAM usage (256x256 tilemap with 32x32 'chunks') + time to generate | 1.1GiB, ~30 seconds | 237.7 MiB, ~6.73 seconds |
| RAM usage (512x512 tilemap with 32x32 'chunks') + time to generate | >6.5 GiB, >5 minutes, would crash | 512.2 MiB, ~18.21 seconds |

I mentioned that layers are now created on demand. Which means that for an 11-floor prison where floors 0-6 (0-5 are underground, 6 is ground floor) by default only the base layer (floor) is created that has dirt, grass, stone, etc. Floors above are empty by default, so no layers are created. When you then paint something like terrain, a new layer is added above the base layer that adds the terrain texture. Add objects? A new layer is added. Deployment? New layer. Plans? New layer.

I still need to bring into the new system a few QoL stuff that makes it feel smoother. Currently, if I draw tiles over the whole 32×32 at once, it takes a little bit to iterate over and finally render the change to the texture, and therefore, the tilemap. Also, shadows. They don't work with this new system just yet. And corners are fucked, as you can see:

{% gallery %}
/images/post-media/2026/PRISONIA/lessons2_cornersarefucked.webp alt="" title=""
{% endgallery %}

## Obfuscating C# code in Godot

GDScript and regular C# can be read really easily if you extract game files. So I fell down the obfuscation rabbit hole for two days on June 5 and 6, discovered [Obfuscar](https://github.com/obfuscar/obfuscar), and 13h30m later (cumulative) reading up on stuff and testing all kinds of methods, this is what I came up with:

First, generate your C# solution for your project (obviously).

Second, ALL the code you want obfuscated, you move it into a library (a subfolder in your project, with its own .csproj). Don't forget to point your project's .csproj to include this library AND exclude its code.

So for PRISONIA, the directory tree of the root project folder is:

```
./
├── addons/
├── android/
├── bin/
├── _cache/
├── Content/
├── LibJailbird/
│   ├── Jailbird/
│   │   ├── Data/
│   │   │   ├── Jailbird_Data_Tile.cs
│   │   │   └── Jailbird_Data_Tile.cs.uid
│   │   ├── GameState/
│   │   │   ├── GSCSharp.cs
│   │   │   └── GSCSharp.cs.uid
│   │   └── UI/
│   │       ├── Hotbar.cs
│   │       ├── Hotbar.cs.uid
│   │       ├── Stat.cs
│   │       └── Stat.cs.uid
│   ├── LibJailbird.csproj
│   └── obfuscar.xml
├── private/
├── redist/
├── ...
├── PRISONIA.csproj
├── PRISONIA.sln
└── project.godot
```

In `PRISONIA.csproj` I mention the following:

```xml
	</PropertyGroup>
	<ItemGroup>
		<Compile Include="**\*.cs" Exclude=".godot\**\*;obj\**\*;bin\**\*;LibJailbird\**\*" />
		<ProjectReference Include="LibJailbird\LibJailbird.csproj" />
	</ItemGroup>
```

It's imperative you exclude the code in your library, as otherwise you'd have warnings or even errors about duplicates and your project won't compile. Also, if you don't exclude the files, they'll get included in the plain-readable PRISONIA.dll (/your project's .dll) since we're not obfuscating that one.

In `LibJailbird/LibJailbird.csproj` I have the following:

```xml
<Project Sdk="Godot.NET.Sdk/4.7.0-beta.5">
	<PropertyGroup>
		<TargetFramework>net8.0</TargetFramework>
		<EnableDynamicLoading>true</EnableDynamicLoading>
		<EnableDefaultCompileItems>false</EnableDefaultCompileItems>
	</PropertyGroup>

	<ItemGroup>
		<Compile Include="Jailbird\**\*.cs" />
	</ItemGroup>

	<Target Name="Obfuscate" AfterTargets="Build" Condition="'$(Configuration)' == 'ExportRelease'">
		<PropertyGroup>
			<ObfuscarPath>/home/alextec/.dotnet/tools/obfuscar.console</ObfuscarPath>
			<TemplateConfig>$(ProjectDir)obfuscar.xml</TemplateConfig>
			<FinalConfig>$(TargetDir)obfuscar_final.xml</FinalConfig>
			<OriginalDll>$(TargetDir)$(TargetName).dll</OriginalDll>
			<DeobDll>$(TargetDir)$(TargetName)_deob.dll</DeobDll>
		</PropertyGroup>

		<!-- 1. Rename original to deobfuscated -->
		<Move SourceFiles="$(OriginalDll)" DestinationFiles="$(DeobDll)" />
		<!-- 2. Copy deobfuscated to original for Obfuscar to process -->
		<Copy SourceFiles="$(DeobDll)" DestinationFiles="$(OriginalDll)" />

		<!-- 3. Read template, replace placeholder, write to FinalConfig -->
		<ReadLinesFromFile File="$(TemplateConfig)">
			<Output TaskParameter="Lines" ItemName="TemplateLines" />
		</ReadLinesFromFile>
		<WriteLinesToFile File="$(FinalConfig)" Overwrite="true" Lines="@(TemplateLines->Replace('TEMP_DLL_PATH', '$(OriginalDll)'))" />

		<!-- 4. Execute Obfuscar -->
		<Exec Command="$(ObfuscarPath) $(FinalConfig)" />

		<!-- 5. Cleanup -->
		<Delete Files="$(FinalConfig)" />
	</Target>
</Project>
```

with the `obfuscar.xml` file:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Obfuscator>
	<Var name="KeepPublicApi" value="true"/>
	<Var name="HidePrivateApi" value="true"/>
	<Var name="RenameProperties" value="false"/>
	<Var name="RenameEvents" value="false"/>
	<Var name="RenameFields" value="false"/>
	
	<!-- Protect Godot integration -->
	<SkipNamespace name="Godot"/>
	<SkipNamespace name="Godot.*"/>
	<SkipNamespace name="GodotPlugins"/>
	<SkipNamespace name="GodotPlugins.*"/>
	<SkipNamespace name="GodotSharp*"/>
	
	<!-- Protect internal compiler types -->
	<SkipType name="&lt;PrivateImplementationDetails&gt;*" skipFields="false" skipMethods="false"/>

	<Module file="TEMP_DLL_PATH">
	</Module>
</Obfuscator>
```

which not only runs `obfuscar`, but then it also automatically copies the file to the output directory once complete.

The key thing to have in your project (outside your library, and included in your project's C# files) is a loader / proxy for your library. For example, I made this `LibJailbird.cs`, which I set as an autoload that is first in the autoload list:

```cs
using Godot;
using System;
using Jailbird;

namespace PRISONIA
{
	public partial class LibJailbird : Godot.Node
	{
		public static LibJailbird Instance { get; private set; }
		[Export] public Godot.Node GSCSharp = new Jailbird.GameState.GSCSharp();

		public override void _Ready()
		{
			Instance = this;
			AddChild(GSCSharp);
		}

		// --- PROXIES BELOW ---
		public static Jailbird.UI.Button.Hotbar CreateJailbirdUIButtonHotbar() { return new Jailbird.UI.Button.Hotbar(); }
		public static Jailbird.UI.Button.Stat CreateJailbirdUIButtonStat() { return new Jailbird.UI.Button.Stat(); }
	}
}
```

this lets me access the stuff from my library without including any risky code that I want to keep obfuscated. Note that because we're excluding the library from the project's .cs file, your linter may warn you about your library's include (`using Jailbird;`), and in GDScript, you will not be able to use .new().

For example if I want to create the Hotbar button, **I cannot use** this: `var J_UI_B_H = load("res://LibJailbird/Jailbird/UI/Button/Hotbar.cs")` and then use `J_UI_B_H.new()`, because Godot will point out that there's no method `.new()` in `CSharpScript`. This file is being read as a CSharpScript without it being added to the MSBuild, which is why you'll need a function in your intermediary `LibJailbird.cs` file that returns that.

Instead, I can use `var button : Btn = LibJailbird.CreateJailbirdUIButtonHotbar()`.

In hindsight, this may seem like the obvious choice, but I haven't used C# in 6 years, and I followed the instructions from [this post on Itch by Midnight Spire Games](https://midnightspiregames.itch.io/minerva-labyrinth/devlog/899501/c-obfuscation-in-godot) and [this comment on godot's issue #1407](https://github.com/godotengine/godot-proposals/issues/1407#issuecomment-2992560303). But it didn't work with the PRISONIA.dll generated by the export process. It failed specifically due to an error with GodotPlugins that I couldn't seem to exclude via the obfuscar config, and I couldn't seem to find GodotPlugins in the GodotSharp.dll. Because it turns out, this is present only in the file that can be found at, which never gets packaged with the rest of the DLLs. I presume it's part of the executable or something.:

```
Godot Engine v4.7.beta5.mono.official.bbd3f43b5 - https://godotengine.org
Vulkan 1.4.341 - Forward Mobile - Using Device #0: NVIDIA - NVIDIA GeForce GTX 1650

ERROR: .NET: Failed to get GodotPlugins initialization function pointer
	at: initialize_hostfxr_and_godot_plugins (modules/mono/mono_gd/gd_mono.cpp:487)
ERROR: Parameter "godot_plugins_initialize" is null.
	at: initialize (modules/mono/mono_gd/gd_mono.cpp:656)
```

and there you have it, you just have to separate your C# code into a separate library that gets included in your godot project's `.csproj` file, and then you can run obfuscar (or some other tool) on that library without possibly running into issues down the line.

Likewise, I have updated Sapphire and moved some core (e.g. all of Console, Commands Manager, Logger, Sapphire, Sapphire_Autoloads, DevUI) to C# with minor hiccups along the way, but now it's identical to the GDScript version. I kept sapphire.gd and sapphire_autoloads.gd which are added automatically as autoloads when the plugin is enabled, which then become the middlemen between the C# and GDScript. And yes, I created a separate .csproj for Sapphire, which means it gets packaged as a separate .dll file as well.

So it'd be PRISONIA.dll, LibJailbird.dll, Sapphire.dll, although currently I have enabled "Embed Build Outputs" in the export settings, which means that the export is the single PRISONIA(.exe/.x86_64/…) executable, with embedded .pck and files. It may not be the prettiest option if I want to update the content via patches later on, but I'm still in development, so I'll cross that bridge when I get there.

---

**Short break: I've been using Zed (well, a fork named [Gram](https://gram.liten.app/)) full-time since May 4**, and I like it for the most part, but it's inconsistent to the point of being annoying sometimes.

{% gallery %}
/images/post-media/2026/Screenshot_20260606_135151.webp alt="A screenshot of Gram of the LibJailbird.cs code, highlighting that some lines use spaces instead of tabs." title="A screenshot of Gram of the LibJailbird.cs code, highlighting that some lines use spaces instead of tabs."
{% endgallery %}

I mean, what the fuck? Why is it using spaces AND tabs when I mainly prefer tabs? It just adds spaces randomly, it's fucking moronic and annoying.

BOTH my Zed global settings in settings.jsonc and a specific setting for CSharp to use hard tabs are enabled, and yet it still adds tabs!

```json
	"languages": {
		"CSharp": {
			"hard_tabs": true
		},
	},
	"hard_tabs": true,
	"tab_size": 4,
```

Fix your shit, Zed. Stop focusing on AI so much, and start focusing on the user experience, because the plugin system is barebones and simple settings like these are not respected!

**Short break over**

---

Okay, but you might be wondering, what's the use case? Why this section on C# obfuscation?

I have moved Sapphire and parts of PRISONIA to C#. I used [gdscript2all](https://github.com/Lcbx/GdScript2All) where possible, but it was mostly done by hand, it's surprisingly similar thanks to Godot's C# feature parity which is (somewhat) close to GDScript, where you just replace snake_case with PascalCase. This way I can make it ever-so-slightly harder to reverse-engineer everything. But ultimately, code is code, and with enough dedication someone could reverse-engineer anything.

Anyway.

## NPCs!

NPCs also use layers, because I combine multiple body parts and accessories from a NPC sprite. The newbie game developer might think that I would have to create Quads for each, apply the texture, do all of that complex stuff (which starts to hammer the process and navigation process once you end up with hundreds, thousands of NPCs). And then you also want to add chat bubbles so NPCs have dialogue over their heads. Labels and Subviewports? Oh no, Subviewports have a hard limit (*255, ask me how I know*) before Godot starts to dump thousands of errors into the log, plus those Subviewports are processed independently which seriously drags down performance.

No, that'd be inefficient and wouldn't work with old processors. My i7-2600 handles about ~800 NPCs on-screen with navigation enabled before the FPS starts to dip into the 30-40s and stutters would begin.

MultiMeshInstance3D comes to the rescue again. I have centralized tilemap generation, NPC management, navigation management into my tilemap spawner system, so it's slightly easier to handle everything all at once.

There's an NPC Sprite Manager which is independent of the NPC logic system, and its only purpose is to handle the visuals. I have multiple body parts for NPCs: body, head, glasses, fo (face overlays), hat, arm_left, arm_right, hand_left, hand_right, leg_left, leg_right. You can see how having 11 parts and using per-NPC quads would be an issue, right?

Instead, there's one MultiMeshInstance3D per part. One MultiMeshInstance3D for the body, one MultiMeshInstance3D for the head, one for the glasses, etc.

In the NPC sprite manager I create these, I create one MultiMesh and one QuadMesh of size Vector2(1,1) to define the standard 'unit' of an NPC (1×1, which would be the size of a 'tile') for each of these 11 parts, and then create offsets. So if I have one NPC at X=5, Z=10, and one NPC at X=0, Z=100, I have to calculate the offsets of each part to match their positions at that time. And then throw a shader on each that resizes the quad and applies the offsets, which are passed through as a single vec4 packed instance uniform (16 bytes per sprite node).

Each float32 carries two float16 values via half-float packing.
- x = pack(region_x, region_y)   normalized UV offset
- y = pack(region_w, region_h)   normalized UV size
- z = pack(pos_x, pos_y)         vertex offset
- w = pack(pos_z, flags)         z-offset + packed flags (bits 0-1: flip, 2+: scale)

I then unpack 8 half-floats from 4 floats from x, y, z, w, use UV remapping, apply per-part scaling and apply the quad resize and offset as mentioned. It's complicated, I know, and I'll probably forget everything about it soon enough, but if you have a good system in-place, you don't have to bother with it later on, so it's worth the effort.

Beyond that there is a custom charactersprite system that uses the centralized tilemap spawner system to access the multimesh instance and its index. The character sprite system stores the dictionaries for body data, limb data and head data (3 separate dictionaries). This handles part parenting (e.g. head is a child of body, hand_left is a child of arm_left), base positions, the rect 'cache' (because the first time you spawn in an NPC would cause a noticeable stutter, same thing for the first chat bubble created), instead I pre-spawn an NPC that is never killed or moved (so a 'dummy') that prevents this when you play the game.

{% video %}
/images/post-media/2026/PRISONIA/lessons2_dummy.webm alt="This NPC, right here. That's the dummy. Of course, he'll be hidden in the game." title="This NPC, right here. That's the dummy. Of course, he'll be hidden in the game."
{% endvideo %}

Then there are 200 lines of code that updates all of the body parts, their orientation, rotations, scale, arm rotation on the CPU, leg movement on the GPU by passing back to the shader the changes to the leg textures per step, etc. Again, a good system that you create once and then forget about it because it works well.

And here's the result!

{% video %}
/images/post-media/2026/PRISONIA/lessons2_npcs1.webm alt="Placing NPCs and letting them wander around. ...They complain a lot, don't they?" title="Placing NPCs and letting them wander around. ...They complain a lot, don't they?"
{% endvideo %}

Notice how there may be some strange offsets or split-second changes, that's due to the shader and how the quad is being resized, and the offsets are being applied. It's still impressive technically, even if not yet completely glitch-free. Another benefit of this system is that it uses just one master sprite for all NPC parts, skin tones, etc. I already have checks in place to enable spawning only NPCs of a specific type (e.g. human, robot, undead, zombie, protogen (:3)) which will be useful for custom map presets and so on.

{% gallery %}
/images/post-media/2026/PRISONIA/lessons2_npcs_aliens.webp alt="You can have a prison only filled with aliens..." title="You can have a prison only filled with aliens..."
/images/post-media/2026/PRISONIA/lessons2_npcs_protogens.webp alt="...or only with protogens!" title="...or only with protogens!"
/images/post-media/2026/PRISONIA/lessons2_npcs_mixed.webp alt="Or enable them all. Zombies, skeletons, robots, goblins, aliens, protogens, vampires, ogres, and humans, all in the same world." title="Or enable them all. Zombies, skeletons, robots, goblins, aliens, protogens, vampires, ogres, and humans, all in the same world."
{% endgallery %}

## Navigation

I need to update it because it becomes inefficient once you have hundreds of NPCs. So, I'm thinking of going the route of flow maps or whatever, which bundles up nearby NPCs' navigation, which makes it easier to handle thousands, if not tens of thousands of NPCs navigating the multiple floors in my game.

So far, my approach is this:

I have a walkability cache, an AStarGrid2D array, a NPC registry and an NPC spatial hash dictionary.

Get all floor levels, for each create a PackedByteArray, resize this array to tilemap width * tilemap height, fill with value 0, append to walkability cache.

Create the AStarGrid2D, set the region to Rect2i(0, 0, tilemap width, tilemap height), cell size Vector2(1,1), Diagonal Mode - At Least One Walkable, Octile heuristics for default compute and estimate, and update it, before appending it to the AStarGrid2D array.

Then for the initial walkability scan do for each floor, for z in range tilemap height, for x in range tilemap width, call my walkability function which is slower than the scans ran afterwards. This one gets the z and x, and the floor level, and checks the chunk's tile data at that location to check if it's not of a specific tile type (e.g. NOT of tile type 0 which is walls). Then call a simple function that sets if the tile should be walkable or not.

## UI

I have finally started working on UI, and I have to say, I love UI themes. The only thing that bothers me is that you can't have variations in one theme. I can't have multiple button variations (regular, warning, pass, error, dark mode, light mode) in one theme. Hopefully someday Godot will support this, I don't want to duplicate my Theme files to create variations.

Anyway, here's the main menu UI, settings, profile UI, management/escape UIs. They're not wired up to anything yet, but I'm hoping to get it done by next week. If all goes well, I can hopefully start testing this game with a few of my friends before expanding to broader testing, and finally entering Early Access. Not having a job is quite the motivator, even if this heat really fucked up my productivity.

{% gallery %}
/images/post-media/2026/PRISONIA/lessons2_mainmenu_ui.webp alt="The main menu." title="The main menu."
/images/post-media/2026/PRISONIA/lessons2_mainmenu_settings.webp alt="The settings screen. There are a few tabs for categories - Accessibility, Audio, Controls, Display, Game, Legal." title="The settings screen. There are a few tabs for categories - Accessibility, Audio, Controls, Display, Game, Legal."
/images/post-media/2026/PRISONIA/lessons2_mainmenu_manager.webp alt="The manager mode screen. A list on the left for levels in the main campaign (that won't be part of the initial EA release though), an info panel with settings on the right." title="The manager mode screen. A list on the left for levels in the main campaign (that won't be part of the initial EA release though), an info panel with settings on the right."
/images/post-media/2026/PRISONIA/lessons2_mainmenu_escape.webp alt="The escape screen. It's more or less the same as the management mode screen, with small changes." title="The escape screen. It's more or less the same as the management mode screen, with small changes."
/images/post-media/2026/PRISONIA/lessons2_mainmenu_profile.webp alt="The profile/account manager. Yes, I drew that protogen!" title="The profile/account manager. Yes, I drew that protogen!"
{% endgallery %}

I swear the Manager and Escape windows are supposed to be bigger, they're just currently fucked up.

Working with UI sizes is also a pain in the ass in Godot, I couldn't get it to auto-size based on the screen size, I tried all sorts of combinations. The only way to get it to expand the viewport when resizing the window (e.g. 1080p without leaving black bars all over the place) was to set the main menu to a square size (720×720). Which means I have to manually size up the windows now, because the Manager, Escape windows are supposed to almost fill the screen, both in height and width, instead of being the same size as the main menu. Fractional scaling (e.g. 1.5x) doesn't seem to affect it either. What the hell?

{% video %}
/images/post-media/2026/PRISONIA/lessons2_mainmenu_ui.webm alt="" title=""
{% endvideo %}

---

And in case you wondered, here's how sane my github log is for this project. Here's a screenshot from back when I was working on the tilemap.

{% gallery %}
/images/post-media/2026/PRISONIA/lessons2_gitlog.webp alt="I promise I'm largely sane." title="I promise I'm largely sane."
{% endgallery %}
