---
layout: post
postid: PO-260224-01
permalink: /posts/2026-02-24-Lessons-from-PRISONIA-part-1.html
type: post
lang: en
locale: en_US
title: "Lessons from PRISONIA, part 1"
description: "Things I learned while developing PRISONIA, Sapphire, and working with Godot 4."
date: 2026-02-24t10:30:00+02:00
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
image_banner_link:
toc: true
---

*All code displayed here falls under my classic CC BY-NC-SA 4.0 + No AI Scraping license. Fuck off AI, I don't give you permission to train or use any content on my website without my explicit approval, and without paying me what my content is worth.*

As I get closer to finally being able to show off what I've been working on since August last year, here are a few things I've learned while developing PRISONIA, my Sapphire toolkit, and working with Godot 4.4-4.7.

## Developing a custom tilemap in a 3D space

Developers may want to create their own tilemap implementations due to several reasons, mine was that Godot's own TileMapLayer was not great for my use case. I'm developing the tilemap to exist in a 3D space, not 2D, because I want to support shadows and other rendering features usually seen in 3D.

Let's walk through my attempts, all the way to the current implementation.

### Unreal Engine attempts at a 3D tilemap

But first, Unreal Engine.

PRISONIA initially started on UE4, before being tested in UE5, and then was moved in July 2025 to Godot.

In Unreal Engine, I initially tried to use Unreal's own Paper2D-based PaperTileMap. Unlike Godot, '2D' in Unreal Engine is still in 3D space, so given enough time and effort, I could have shadows on the Paper2D tilemap. But at the time I couldn't manage to get some basic features in-place, like drawing tiles on it (similar to how in Godot you have tilesets, and you can configure corners and whatnot). And in UE4 (and earlier versions of UE5), Paper2D was still in beta - Paper2D has actually been in beta **for a decade** at this point. It's clear that Epic prioritizes 3D features, and that's fine.

So I tried a custom approach. I don't know the specifics anymore, but I drew my own grid lines via Blueprints and by creating a grid material to draw them, then used mesh instancing (`InstancedStaticMesh` / ISM) to draw the grid 'tiles'. Once I got a grid layer done, I'd just duplicate above. I'd use struct arrays and used the index to match to each tile, to get my custom tile data, because of course, Unreal doesn't/didn't have custom metadata you could append to nodes - or at least not without creating your own blueprint with variables, and so on.

It of course, didn't perform that great, not even on PC while running in the editor, because after all it's Unreal Engine, if you really want to develop a 2D game in it you have to cut down significantly on lighting, shadows, etc., especially for mobile - which I couldn't get to run on my phone with 4.27, and with 5.2 at the time, it of course was horrible, and the resolution scale was inexplicably bad, both on the Galaxy A10 and the Redmi Note 11.

Barring all that, it was *one* step closer to my needs, but nowhere near enough.

### Godot attempts at a 3D tilemap

And then I moved to Godot 4.5 on July 7, it was 4.5 beta 2 at the time, and I was still growing accustomed to Godot.

Initially I tried to do it via godot modules or GDExtensions, but I quickly realized while porting portions of other projects that GDscript is very powerful, and you don't leave a lot of performance on the table if you were to use it instead of C++.

Heck, I even tested Terrain3D for a few days to see if I could use it instead, since Godot tilemap's own way of handling corners didn't fit all of my use cases. Safe to say that Terrain3D was both overkill and not great for my needs, despite being quite a competent add-on for other projects.

No, instead, I replicated what I did in Unreal.

For the background, I use a `QuadMesh` that has the grid background material, and it's located behind the tilemaps. The player is a `Node3D` that has a `CollisionShape3D` and a `Camera3D` using Orthographic projection. I tried both Perspective and Orthographic both in UE and Godot and Orthographic was the one that works the best at retaining a 2D-like scene that has no depth. Ideally, I'd have something in between the two, where I can still preserve some depth, but I'll worry about that later.

At the time, the custom tilemap used one Array variable, the levelList, which would have newly-created floor levels comprised of a `Node3D` and a `GridMap` appended to it. A `GridMap` was used for each level's floor tile map, including a `MeshLibrary` and a `QuadMesh`. I'd subdivide the quad (e.g. a 32x32 tilemap would have one quad of size Vector2(32,32) * 0.01), with a width and depth of 1.

While sure, this works well for PC, it effectively creates tens of thousands, if not hundreds of thousands of primitives, which is not handled well by mobile GPUs, especially not by a low-end mid-range phone like the Redmi Note 11, my variant only has 4GBs of RAM, and uses a custom ROM on Android 16 (*because I insist on staying on the latest Android version, instead of using Android 13 which is supposedly better for gaming, or the stock ROM*), and this would result in all of my background apps (personalDNSfilter, Sunup, Syncthing, and the running game) crashing, due to the fast increase in RAM usage - one such tilemap would take hundreds of MiB of RAM, roughly 100-300 if I remember right. A miserable first attempt, but an attempt nonetheless.

{% video %}
/images/post-media/2026/PRISONIA/lessons_prisonia_redmicrash_spchk.webm alt="A screen recording of the game using scrcpy with the GridMap system. I spawn chunks to form a 128x128 tilemap. For debugging purposes, I set the spawn timer to take 0.5s between each tilemap being spawned, to debug memory problems at the time. Given that it's subdividing the quad for each tile, it's generating effectively hundreds of thousands of primitives gradually, and having a massive gradual increase in memory that would be unsustainable." title="A screen recording of the game using scrcpy with the GridMap system. I spawn chunks to form a 128x128 tilemap. For debugging purposes, I set the spawn timer to take 0.5s between each tilemap being spawned, to debug memory problems at the time. Given that it's subdividing the quad for each tile, it's generating effectively hundreds of thousands of primitives gradually, and having a massive gradual increase in memory that would be unsustainable."
{% endvideo %}

Of course, I also tested `TileMap` (now deprecated), and `TileMapLayer`, with limited degrees of success.

I reused the skeleton of the `GridMap`, created a `SubViewport` for each floor in which I added each `TileMapLayer`, then at runtime created a material for each, added the texture of the subviewport and...success! Well, partially. I can't cast 3D shadows this way, and since each floor had one full quad, creating 'holes' would only remove tiles in the tilemaplayer, so even if I were to somehow cast cursed 3D shadows, they wouldn't reach the floor below because there's no physical hole punched in the quad, only the 2D tilemap.

Ugh, back to the drawing board...

#### Road to success

I pondered about it for a while, I'd continue tweaking the gridmap-based approach then I tried implementing a chunk-based approach, but it unfortunately wasn't great, so it'd still cause issues.

But of course, like all good ideas, they come when you least expect them, and I had a stroke of genius one night at ~3AM before going to sleep: what if I used just one Quad per floor, and punched holes / merged newly-placed tiles into it? Surely this would be hugely more efficient?

And indeed, after refactoring the tilemap which took a little while, the approach proved significantly more performant. The story is that simple, I read the page on [Procedural Geometry](https://docs.godotengine.org/en/latest/tutorials/3d/procedural_geometry/index.html) from the Godot Docs, and I looked at all the four techniques, before finally settling on **`ArrayMesh`**.

##### Punching holes

Punching holes also had two stages:

I first experimented with creating a 3x3 area, in which 8 tiles would be created in the quad (16 vertices), and the center to be punched out. I didn't think at the time I could go lower. I basically created 8 tiles around the tile that was supposed to be the hole, and stitched it to the tilemap's quad. It would result in a clean 3x3 area with the tile in the center empty. Success!

But I soon managed to go even lower, so now it's just punching 1 hole, without adding any tiles around it. I just create the amount of vertices required to punch a square 1x1 hole for a tile, which reduced the amount of on-screen vertices even further.

Here's how a hole punch would look with approach 1, vs approach 2:

{% gallery %}
/images/post-media/2026/PRISONIA/lessons_diagram_tilemap_tile_punch1.webp alt="The first approach to tile holes in the tilemap. It's a diagram of a dark grey grid on which a square tilemap using the colour red is placed. On this tilemap, in the center is a square 1x1 hole. Around this hole, 8 squares are placed in a circular manner, while keeping a square shape." title="The first approach to tile holes in the tilemap. It's a diagram of a dark grey grid on which a square tilemap using the colour red is placed. On this tilemap, in the center is a square 1x1 hole. Around this hole, 8 squares are placed in a circular manner, while keeping a square shape."
/images/post-media/2026/PRISONIA/lessons_diagram_tilemap_tile_punch2.webp alt="The second approach to tile holes in the tilemap. It's a diagram of a dark grey grid on which a square tilemap using the colour red is placed. On this tilemap, in the center is a square 1x1 hole." title="The second approach to tile holes in the tilemap. It's a diagram of a dark grey grid on which a square tilemap using the colour red is placed. On this tilemap, in the center is a square 1x1 hole."
{% endgallery %}

So while the first approach would add 16 vertices to each requested hole, the second approach only adds the minimum amount of vertices that creates the hole, and the vertices that connect it to the four corners of the tilemap.

##### Current implementation

I now currently use a few arrays:

```gdscript
var floorlist : Array[Node3D]
var holes : Dictionary									# Dict of Vector3i(floor,tile_x,tile_z)
var dirty_floors : Array[int]
var dirty_layers : Array								# Array of floor, layer
var floor_data: Array[Jailbird_Data_Tile]

# Per floor, per layer
var bg_instances: Array[MeshInstance3D] = []
var fg_instances: Array[MeshInstance3D] = []
var top_instances: Array[MeshInstance3D] = []
var overlay_instances: Array[MeshInstance3D] = []

var bg_meshes: Array[ArrayMesh] = []
var fg_meshes: Array[ArrayMesh] = []
var top_meshes: Array[ArrayMesh] = []
var overlay_meshes: Array[ArrayMesh] = []
```

I create a Jailbird_Data_Tile for each floor level. Jailbird_Data_Tile is a RefCounted that houses per-(existing/created)tile data in a compact format using packedarrays, like this:

```gdscript
var has_any_foreground := false
var has_any_top := false
var has_any_overlay := false
# [...] I initially tried using a Dictionary, but that would be more memory-expensive, so packedarrays it is
var width: int							# default 1
var height: int							# default 1
var background_type: PackedInt32Array
var foreground_type: PackedInt32Array
var top_type: PackedInt32Array
var foreground_face: PackedByteArray
var temperature: PackedInt32Array
var is_outside: PackedByteArray			# 0/1
var is_accessible: PackedByteArray		# 0/1
var occupier_id: PackedInt32Array		# -1 = none, occupier id instead of object ref
var path_cost: PackedFloat32Array
var sector: PackedInt32Array
var room: PackedInt32Array
var utility_face: PackedByteArray
var utility_mask: PackedByteArray		# bits: 1=water, 2=elec, 4=vent
var dirt_level: PackedByteArray
var damage_level: PackedByteArray
var tags: PackedStringArray
```

The background is now created at runtime in the level itself, by creating a QuadMesh with that same grid material, it's tied to the position of the player and the viewport size, all while drawing only two triangles (vertices, as Godot names them in the Debugger UI). I set the width and height at runtime, and can alter the background and the colour of the grid depending on the game mode (e.g. Mod Studio (WIP), else set a dark grey colour).

##### Using one ArrayMesh for each layer of a floor

One floor of the tilemap is now comprised of four floor layers: BG, FG, TOP, OVERLAY. A floor level is created via an Node3D, and it's there just to keep things organized and easy to debug, and a MeshInstance3D. All layers except BG are set as not visible for now, until I finish working out how the tile data is supposed to interact with the tilemap and additional modes such as building stuff on the tilemap, adding and removing tiles, but I'm still thinking on the approach used by the Jailbird_Data_Tile, since I already see a few ways in which it could be broken to not display stuff depending on the present bits in the arrays, especially for the overlay layer.

For each of the four floor layers, I create a floor quad using an ArrayMesh, manually set the width and height via tilemap_width * tileSize (and tilemap_height * tileSize, respectively), where tilemap_height/width is an int (e.g. 32 by default), and tileSize is a float with value 0.32. So one tile is 10.24 units in world space.

I then manually set up the vertices via an array, and the normals, UVs and indices, and finally, create the mesh via ArrayMesh.add_surface_from_arrays():

```gdscript
func _create_single_floor_quad() -> ArrayMesh:
	var mesh = ArrayMesh.new()
	var arrays = []
	arrays.resize(Mesh.ARRAY_MAX)
	
	var width = tilemap_width * tileSize
	var height = tilemap_height * tileSize

	var vertices = PackedVector3Array([
		Vector3(0, 0, 0),				# Bottom left
		Vector3(width, 0, 0),			# Bottom right
		Vector3(width, 0, height),		# Top right
		Vector3(0, 0, height)			# Top left
	])

	var normals = PackedVector3Array([Vector3.UP, Vector3.UP, Vector3.UP, Vector3.UP])
	var uvs = PackedVector2Array([Vector2(0,0), Vector2(1,0), Vector2(1,1), Vector2(0,1)])
	var indices = PackedInt32Array([0,1,2, 2,3,0])

	arrays[Mesh.ARRAY_VERTEX] = vertices
	arrays[Mesh.ARRAY_NORMAL] = normals
	arrays[Mesh.ARRAY_TEX_UV] = uvs
	arrays[Mesh.ARRAY_INDEX] = indices

	mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
	return mesh
```
Took me a bit to figure this stuff out, but thankfully it's a one-time addition to the code, you don't have to touch this unless you do stuff like punching holes, adding individual tiles to a mesh, etc.

##### Tile metadata

The four floor layers - BG, FG, TOP, OVERLAY - are supposed to represent the contents (texture) of one tile. BG is the background, such as floor material (e.g. dirt, concrete), FG takes care of objects on top of BG such as walls or objects (e.g. bed, crate, fridge), TOP takes care of ceiling-mounted lights and other such items, and OVERLAY is a special, all-in-one layer that at runtime is supposed to display the requested data. OVERLAY takes care of displaying textures that represent electricity, water, vents, deployment, sectors, temperature, and possibly more.

{% gallery %}
/images/post-media/2026/PRISONIA/lessons_diagram_tilemap_data.webp alt="A diagram with a grey grid which explains the four floor layers, BG, FG, TOP, OVERLAY and what they each represent, and the JAILBIRD_DATA_TILE data container. Overlay represents electricity, water, deployment, sectors, etc. Top represents Lights, ceiling-attached objects. FG represents walls, entryways, furniture. BG represents floors, terrain. JAILBIRD_DATA_TILE contains data such as width, height, bg, fg, top, etc." title="A diagram with a grey grid which explains the four floor layers, BG, FG, TOP, OVERLAY and what they each represent, and the JAILBIRD_DATA_TILE data container. Overlay represents electricity, water, deployment, sectors, etc. Top represents Lights, ceiling-attached objects. FG represents walls, entryways, furniture. BG represents floors, terrain. JAILBIRD_DATA_TILE contains data such as width, height, bg, fg, top, etc."
{% endgallery %}

And then creating tiles, or punching holes in the tilemap, this one took the longest time, since it's easy to bork it if you're not paying attention.

But in the easiest way to explain it, when you add or remove tiles, you then mark the layer on which you performed the action as "dirty", which means it needs to be rebuilt. You really don't want to keep layers dirty for too long, since each of these actions (removing or adding tiles) would increase the amount of primitives needed to be rendered, and thus making it more expensive on the CPU to rebuild the layer - since [all procedural geometry generation methods described in Godot Docs - ArrayMesh, MeshDataTool, SurfaceTool, ImmediateMesh - **run on the CPU**, not the GPU](https://docs.godotengine.org/en/latest/tutorials/3d/procedural_geometry/index.html). Future support for GPU-based procgen geometry may happen someday.

THANKFULLY, because of the fact that it's merging all vertices in order to keep the primitive size down when I punch a hole or add a new tile, this operation is *significantly cheaper* on mobile. Before, because I used to subdivide the quad (e.g. a 32x32 tilemapp would result in 32x32 tiles), rebuilding would take longer especially since it's done on _process when the number of dirty_floors exceeds 0, and would result in quite significant frame spikes from the CPU, and because it would only add more and more primitives each time something like that would happen (and because I have the TileMapSpawner adding a new chunk each 1 frame - it was set to 0.5 for testing, as it would almost instantly crash the game on mobile on 0.01 at the time), the RAM would spike significantly. It would add roughly 50-100MiB per tilemap chunk spawned. On PC, it reached a whole-ass GiB of RAM when spawning multiple 32x32 tilemaps to form a 128x128 tilemap.

Also take in account that Godot automatically performs frustrum culling where possible, so even if I'm on say, the ground floor (6), while sure I may set floors 0-5 visible, they still may get culled if there's no holes in the current floor.

Because remember, each tilemap has multiple floors, and each floor has multiple layers. At this time, I'm using 11 floors (0-5 are "underground" floors, 6 is the ground floor, 7-11 are the over-ground floors). You should be able to take a guess as to why that would crash a phone that has ~1GB of available RAM, especially if you also didn't perform any RAM memory reductions and CPU optimization, or to reduce primitive count.

**When developing for mobile, you should also test on a mid-range phone that uses a custom ROM and not a lot of RAM.** Why? Take my current phone for example, the Redmi Note 11 uses a custom ROM, but you have to understand that this phone has poor RAM and zRAM (compressed swap in RAM) management. So if you're loading big images or running heavy memory operations, you quickly exhaust physical RAM. This forces the system to compress and swap pages via zRAM, which lives on slower NAND flash storage (in short, memory pressure from large enough assets or operations). Mid-ranger NAND speeds (like UFS 2.x) aren't flagship-fast, so this constant compress/decompress cycle causes RAM thrashing: the CPU stalls waiting for I/O, leading to stutters, hitches, and crashes if it gets bad enough.

Go through Project Settings, look at each feature related to graphics and textures, reduce some values and test. Tweak some other values, test again. You'll soon notice which settings consume more RAM and VRAM, and you'll find the sweet spot eventually.

##### Rough performance metrics

So what you essentially have to do is reduce the number of disk operations, and keep your RAM+VRAM usage within reasonable limits for a phone of this calibre.

Anyway, rough performance metrics on mobile (Redmi Note 11):

| Metric (Godot)      | GridMap                      | ArrayMesh (att. 1)         | AM (2)    | Godot ArrayMesh (current)                    |
| ------------------- | ---------------------------- | -------------------------- | --------- | -------------------------------------------- |
| FPS                 | 2-20 FPS                     | 10-20 FPS                  | 20-23 FPS | **40 FPS** (ground floor),<br>47 FPS (lowest floor),<br>40FPS (highest floor) |
| Primitives          | **>100K primitives**         | **4008**                   | ~4008     | **2606** (ground floor),<br>2494 (lowest floor, many tile holes added),<br>2718 (highest floor, more tile holes added) |
| Static Memory (MiB) | 200 MiB-upwards of 400, then crash | 115 MiB              | ~115 MiB  | **88.09 MiB**, with small, smooth increases |
| Video Memory (MiB)  | 210 MiB                      | 202.6 MiB                  | 202.3 MiB | **75.20 MiB**, with no spikes |
| State               | On load, chunks loading...   | On load, all chunks loaded | On load, all chunks loaded | On load, all chunks loaded, post-load, many tile holes added using timescale 100 |
| Changes             | The initial GridMap approach | Initial ArrayMesh attempt, added 3x3 cutout zone | Reuse one ArrayMesh per floor, 1x1 cutout zone | Use gl_compatibility, move from JoltPhysics to GodotPhysics3D + set it to run in a separate thread, set reflection size to 4, disable shadow casting from my sky light and environment, MSAA 3D to 8x, glow upscale mode to 0 (faster), also set the material of the tilemap to not receive shadows |

And a video that shows off the tilemap system on Linux as of February 6, which is as of Feb 24, the current implementation:

{% video %}
/images/post-media/2026/PRISONIA/lessons_sapphire_tilemap_20260206.webm alt="" title=""
{% endvideo %}

This video is the game being launched via the editor, note how it starts at 107.5 MiB static RAM memory, and 183.6 MiB VRAM. It starts with roughly 6570 primitives drawn before falling to 3176 on the ground floor, with many holes being added, as the tilemap system handles the 'dirty' layers and removing primitives where possible. You can see how they're also connected to the quad through these horizontal streaks in wireframe mode. Clean, 1x1 holes in the quad. With a lot more holes in the quad on the ground floor, it goes to 12752 vertices. On the highest floor level it goes to 76322 vertices.

{% gallery %}
/images/post-media/2026/PRISONIA/lessons_tilemap_wireframe_f0.webp alt="" title=""
/images/post-media/2026/PRISONIA/lessons_tilemap_wireframe_f11.webp alt="" title=""
/images/post-media/2026/PRISONIA/lessons_tilemap_wireframe_f11_closeup.webp alt="" title=""
{% endgallery %}

I want to continue minimizing the amount of primitives in the future by culling lower floors when there's no tile underneath. But at this point, the primitive count is well below the 2 million vertex limit (180 MB VRAM) on Mali GPUs for mobile - so at least for now, it's no longer the priority when it comes to performance optimization. Current stats on Linux:

| Metric (Godot)      | Godot ArrayMesh (current) |
| ------------------- | ------------------------- |
| FPS                 | 60 FPS                    |
| Primitives          | ~2000 primitives without punching any holes; 26994 primitives with lots of holes on all 11 floors |
| Static Memory (MiB) | 87.52 MiB                 |
| Video Memory (MiB)  | 228.1 MiB, using Mobile rendering mode (not gl_compatibility) |

So, ~2000 primitives on startup (with the current setup, no holes added) vs >100K if you were to subdivide each tile in the quad. That's a whopping **98.2% decrease in primitives**! And once you start adding lots of holes, and you reach, let's say, ~30K primitives? That's still a **75% decrease**.

#### Future work

{% gallery %}
/images/post-media/2026/PRISONIA/lessons_diagram_tilemap_castingshadows.webp alt="A diagram with a black background on which all 11 floors are overlaid on top of each other, in an isometric view. The first 5 floors (underground levels) are coloured brown, the ground floor (6) is coloured dark green, the last 5 floors (overground levels) are coloured light blue, to indicate they're empty. There is a zoomed view of two floors - ground floor and the first floor above, which is empty. On the ground floor there is an isometric red building which is supposed to cast a shadow behind it, as the light direction of the sky is facing north-east." title="A diagram with a black background on which all 11 floors are overlaid on top of each other, in an isometric view. The first 5 floors (underground levels) are coloured brown, the ground floor (6) is coloured dark green, the last 5 floors (overground levels) are coloured light blue, to indicate they're empty. There is a zoomed view of two floors - ground floor and the first floor above, which is empty. On the ground floor there is an isometric red building which is supposed to cast a shadow behind it, as the light direction of the sky is facing north-east."
{% endgallery %}

{% aside postid %}
But the *problem* with this approach is that I'd have to create unique shadow shapes for many kinds of objects, it's not particularly sustainable in the long-term as I keep adding new content. Honestly, I think it'll just be a toggle to enable or disable settings on lower-end devices, and that's that.
{% endaside %}

Obviously, this isn't the end for the tilemap. I still need to cast shadows to it, and try to cast shadows on mobile without decimating performance. Unfortunately, because I'm using `gl_compatibility` on my phone, this unfortunately [excludes the idea of casting fake shadows](https://techhub.social/@alextecplayz/111054112284086789) via decals, but not via textures 😊, so not all hope is lost for phones like mine.

Tiles will use `TextureAtlas`es from a few sprites, that's the simpler stuff of the bunch. And I need to implement my own 3x3 'brush' for walls and terrain, so that it blends nicely.

## Sapphire

Okay, this has been through some stuff. Sapphire initially started out as a [game engine fork of Godot]({{ site.baseurl }}/posts/2024-01-14-Sapphire-thread.html), but I've since then abandoned that idea, choosing to move everything to a few GDscript plugins.

And I've never been happier! I don't really have to worry about new upstream commits from Godot performing some advanced changes that I can't easily fix, since I don't know *every* aspect of Godot via C++, *just enough to get by*. But, I've grown to love GDscript, and it's surprisingly damn good for a scripting language. And unlike Unreal Engine where if you need some advanced features or handle big data, you *must use C++*. I reiterate again how Unreal Engine 5 had a [major performance issue if you'd add items to a Blueprint Struct](https://techhub.social/@alextecplayz/112287504699406857). To no one's surprise, it doesn't happen in UE4.27.2, the last version of Unreal 4. If you want that in UE5, use C++, because it won't work in the UI unless you either restart frequently or have plenty of free RAM to handle whatever memory leak is being caused by the struct.

So far, everything is separated into three plugins: `Sapphire`, `Sapphire.Editor`, and `Sapphire.Material3` (which will be open-sourced when it's ready). Let's explore each plugin in detail. But if you want to skip that, it's totally fine. Here's a nice graph that explains the hierarchy of the three, and how they interact with the Godot Editor.

{% gallery %}
/images/post-media/2026/PRISONIA/sapphire_plugins_chart.webp alt="A chart of the three Sapphire plugins and how they interact with Godot Engine." title="A chart of the three Sapphire plugins and how they interact with Godot Engine."
{% endgallery %}

### Plugin: Sapphire

File size as of 24.02.2026: 6.3 MB (without the .git folder)

#### Console

**PREFACE: If you want a good console that is similar, try [jitspoe/godot-console](https://github.com/jitspoe/godot-console), it's surprisingly good!**

{% video %}
/images/post-media/2026/PRISONIA/lessons_sapphire_console_cvrs.webm alt="" title=""
/images/post-media/2026/PRISONIA/lessons_sapphire_console_gds.webm alt="" title=""
{% endvideo %}

The console is of course, inspired by the Source engine console, but I modernized it by adding a few features that are especially useful. You can execute GDscript directly in the console, and you can quickly toggle the DevUI with the click of a button. I'm also working on a search / filter functionality, and the ability to specify a category before the text, which is useful for both filtering and determining what ran the command. For example, instead of "[19:48:38] INFO: Sapphire plugin enabled", you'll see "[SapphirePlugin] [19:48:38] INFO Sapphire plugin enabled".

I shamelessly yoinked some of the commands, such as buddha, god, noclip, notarget, _restart, _autosave from [Source's console command list](https://developer.valvesoftware.com/wiki/Console_Command_List), I did it on purpose because I'm so used to Source engine commands that I wouldn't want to use other types like Unreal's 'ghost' or 'fly' commands, those are just so...*odd*.

The console will soon have a dependency on Schema, or at least one of Schema's systems, which would be a GDScript parser. Yes, a GDScript parser within GDScript, or at the very least I'll try. The issue is that when you type something in the Console's GDscript and it's not correct, when running in the editor it pauses execution on the error, but at runtime it just gives you an error that isn't sent to the console itself. So either I send the error, or I try to interpret the code myself.

Console errors use Godot's `Engine.capture_script_backtraces()`, so it's not some custom implementation. And it's quite good, you can call it from say, script A where you move the player, and it'll return an accurate backtrace that starts there and ends at the console logger.

And yes, the console is localized. Speaking of...

#### Localization

Sapphire comes with two CSV files, one is used by UI text such as Settings, the Console and the console command outputs, and the CC0 [Polyglot Gamedev sheet](https://docs.google.com/spreadsheets/d/17f0dQawb-s_Fd7DHgmVvJoEGDMH_yoSd8EYigrb0zmM/edit?gid=296134756#gid=296134756). Thankfully, someone else has [converted it to a Godot-accepted CSV format](https://github.com/WeekieNHN/localization_package), I stumbled upon it while learning how to localize stuff in Godot, and [their *very* helpful video](https://www.youtube.com/watch?v=vD5mha26JXo) links to it. Honestly, [subscribe to Weekie](https://www.youtube.com/@weekie/videos), his videos are pretty cool.

#### Settings

Settings, you say? Yes, a universal settings menu that lets me select what options to enable and expose to the user, as well as UI customization by passing a Texture, and setting TextureAtlases' Rect2 values to their corresponding coordinates, which is really nice, because I don't have to fiddle with creating settings menus from the ground up again. Unfortunately, I don't have footage of this at the moment since I'm still hard at work on it, but you'll see it in part 2 or PRISONIA footage, whichever one comes first.

#### GlyphImage, GlyphTouch

Two UI nodes that handle glyphs for two different purposes. GlyphImage shows you the glyphs of a given input action in either the Settings-set input glyph display mode (e.g. XBOX), or override it and set it to show a different glyph set, like for keyboard and mouse, or Switch 2. And it lets you toggle between regular or 2x (higher resolution) textures.

GlyphTouch on the other hand comes with a few pre-made touch gestures that I can use as tutorial hints for players using touch screens. Really handy stuff!

Both of them use [Kenney's CC0-licensed Input Prompts](https://kenney.nl/assets/input-prompts), they use the _sheet_default.png and _sheet_double.png files, it's significantly better than loading each *individual glyph, which needlessly adds to the VRAM used by the game*. Work smarter, not harder. Don't just throw individual glyphs into VRAM, please just use a single texture and use texture atlases instead, it's significantly cheaper and objectively the best way to go about it.

#### Schema

{% gallery %}
/images/post-media/2026/PRISONIA/sapphire_schema_chart.webp alt="A chart of Schema's inner workings and how they interact with each other." title="A chart of Schema's inner workings and how they interact with each other."
{% endgallery %}

**Schema hasn't seen updates since September 2025, it's still highly experimental and very prone to breakage!**

Schema is a project to generate node graphs for visual scripting using GDscript. When you create a node with Schema, you're writing GDscript. When you're writing GDscript, Schema automatically adds graph nodes depending on what you code.

It's comprised of multiple parts, each with their own purpose.

##### Schema: generators and generated files

In order for GDscript nodes to be added to the graph, first you need to know what is part of the Class List, and then separately, extract the methods and properties used by the Class List. In come two extremely simple generators that write to two files.

`Schema_Gen_ClassList`, which writes a `PackedStringArray` to a new file, `Schema_ClassList`. It's this simple:

```gdscript
extends Node
class_name Schema_Gen_ClassList

const CLASSLIST_PATH = "res://addons/Sapphire_SchemaEditor/classlist_generated.gd"

func _ready():
	create_class_list_file()

func create_class_list_file():
	var class_list = ClassDB.get_class_list()

	# Check if the file already exists
	var classlistfile = FileAccess.open(CLASSLIST_PATH, FileAccess.READ_WRITE)

	# Write the PackedStringArray to the file
	classlistfile.store_line("extends Resource")
	classlistfile.store_line("class_name Schema_ClassList")
	classlistfile.store_line("var classList = PackedStringArray([")

	for className in class_list:
		classlistfile.store_line("	\"" + className + "\",")

	classlistfile.store_line("])")

	classlistfile.close()
```

and `Schema_Gen_ClassDB`, which writes a `Dictionary` to a new file, `Schema_ClassDB` with the methods and properties exposed by GDscript classes:

```gdscript
extends Node
class_name Schema_Gen_ClassDB

const CLASSDB_PATH = "res://addons/Sapphire_SchemaEditor/classdb_generated.gd"

func create_class_db_file(input: Dictionary):
	var classdb = input

	# Check if the file already exists
	var classdbfile = FileAccess.open(CLASSDB_PATH, FileAccess.READ_WRITE)

	print("D | Schema | Generating the ClassDB file...")

	# Write the header for the GDScript file
	classdbfile.store_line("extends Resource")
	classdbfile.store_line("class_name Schema_ClassDB")
	classdbfile.store_line("var classDB = {")

	for className in classdb:
		var classInfo = classdb[className]
		var methods = classInfo.methods
		var properties = classInfo.properties

		# Build methods string
		var methods_list = []
		for method in methods:
			methods_list.append("\"" + method + "\"")
		var methods_str = "[" + ", ".join(methods_list) + "]"

		# Build properties string
		var properties_list = []
		for property in properties:
			properties_list.append("\"" + property + "\"")
		var properties_str = "[" + ", ".join(properties_list) + "]"

		# Write the class information to the file
		classdbfile.store_line("	\"" + className + "\": {")
		classdbfile.store_line("		\"className\": \"" + className + "\",")
		classdbfile.store_line("		\"methods\": " + methods_str + ",")
		classdbfile.store_line("		\"properties\": " + properties_str)
		classdbfile.store_line("	},")

	classdbfile.store_line("}")

	classdbfile.close()
```

The output files look like this:\
\
`Schema_ClassDB`:

```gdscript
extends Resource
class_name Schema_ClassDB
var classDB = {
	"AESContext": {
		"className": "AESContext",
		"methods": ["start", "update", "get_iv_state", "finish", "init_ref", "reference", "unreference", "get_reference_count", "free", "_init", "_to_string", "_notification", "_set", "_get", "_get_property_list", "_validate_property", "_property_can_revert", "_property_get_revert", "_iter_init", "_iter_next", "_iter_get", "get_class", "is_class", "set", "get", "set_indexed", "get_indexed", "get_property_list", "get_method_list", "property_can_revert", "property_get_revert", "notification", "to_string", "get_instance_id", "set_script", "get_script", "set_meta", "remove_meta", "get_meta", "has_meta", "get_meta_list", "add_user_signal", "has_user_signal", "remove_user_signal", "emit_signal", "call", "call_deferred", "set_deferred", "callv", "has_method", "get_method_argument_count", "has_signal", "get_signal_list", "get_signal_connection_list", "get_incoming_connections", "connect", "disconnect", "is_connected", "has_connections", "set_block_signals", "is_blocking_signals", "notify_property_list_changed", "set_message_translation", "can_translate_messages", "tr", "tr_n", "get_translation_domain", "set_translation_domain", "is_queued_for_deletion", "cancel_free"],
		"properties": ["RefCounted", "AESContext", "script"]
	},
	// ...
	"ZIPReader": {
		"className": "ZIPReader",
		"methods": ["open", "close", "get_files", "read_file", "file_exists", "get_compression_level", "init_ref", "reference", "unreference", "get_reference_count", "free", "_init", "_to_string", "_notification", "_set", "_get", "_get_property_list", "_validate_property", "_property_can_revert", "_property_get_revert", "_iter_init", "_iter_next", "_iter_get", "get_class", "is_class", "set", "get", "set_indexed", "get_indexed", "get_property_list", "get_method_list", "property_can_revert", "property_get_revert", "notification", "to_string", "get_instance_id", "set_script", "get_script", "set_meta", "remove_meta", "get_meta", "has_meta", "get_meta_list", "add_user_signal", "has_user_signal", "remove_user_signal", "emit_signal", "call", "call_deferred", "set_deferred", "callv", "has_method", "get_method_argument_count", "has_signal", "get_signal_list", "get_signal_connection_list", "get_incoming_connections", "connect", "disconnect", "is_connected", "has_connections", "set_block_signals", "is_blocking_signals", "notify_property_list_changed", "set_message_translation", "can_translate_messages", "tr", "tr_n", "get_translation_domain", "set_translation_domain", "is_queued_for_deletion", "cancel_free"],
		"properties": ["RefCounted", "ZIPReader", "script"]
	},
},
```

`Schema_ClassList`:

```gdscript
extends Resource
class_name Schema_ClassList
var classList = PackedStringArray([
	"AESContext",
	"AStar2D",
	"AStar3D",
	"AStarGrid2D",
	"AbstractPolygon2DEditor",
	"AbstractPolygon2DEditorPlugin",
	"AcceptDialog",
	"ActionMapEditor",
	"AimModifier3D",
	"AnchorPresetPicker",
	"AnimatableBody2D",
	"AnimatableBody3D",
	"AnimatedSprite2D",
	"AnimatedSprite3D",
	"AnimatedTexture",
	// ...
	"XRPositionalTracker",
	"XRServer",
	"XRTracker",
	"XRVRS",
	"ZIPPacker",
	"ZIPReader",
])
```

But wait! If you look again in the Schema chart, you'll see that a third file exists, `Schema_ClassList_Ignore`! While this one isn't auto-generated, it was generated by me manually. ClassList_Ignore is exactly what it sounds like: it *ignores* specific classes that GDscript cannot access (e.g all editor-only nodes that are created via C++ only, or specific classes that may not be accessed as-is via GDscript).

`Schema_ClassList_Ignore`:

```gdscript
extends Resource
class_name Schema_ClassList_Ignore
# These are hand-picked classes that CANNOT be used by Schema, as they are either internal (non-exposed) classes, or cannot be instantiated to be used by the Schema ClassDB
var classListIgnore = PackedStringArray([
	"AbstractPolygon2DEditor",
	"AbstractPolygon2DEditorPlugin",
	"ActionMapEditor",
	"AnchorPresetPicker",
	"AnimationBezierTrackEdit",
	"AnimationLibraryEditor",
	"AnimationMarkerEdit",
	"AnimationMarkerKeyEditEditorPlugin",
	"AnimationMixer",
	"AnimationNodeBlendSpace1DEditor",
	"AnimationNodeBlendSpace2DEditor",
	"AnimationNodeBlendTreeEditor",
	"AnimationNodeStateMachineEditor",
	"AnimationPlayerEditor",
	"AnimationPlayerEditorPlugin",
	"AnimationTimelineEdit",
	"AnimationTrackEditDefaultPlugin",
	"AnimationTrackEditPlugin",
	"AnimationTrackEditor",
	// ...
	"VisualShaderNode",
	"VisualShaderNodeConstant",
	"VisualShaderNodeGroupBase",
	"VisualShaderNodeOutput",
	"VisualShaderNodeParameter",
	"VisualShaderNodeParticleEmitter",
	"VisualShaderNodePlugin",
	"VisualShaderNodePluginDefault",
	"VisualShaderNodeResizableBase",
	"VisualShaderNodeSample3D",
	"VisualShaderNodeTextureParameter",
	"VisualShaderNodeVarying",
	"VisualShaderNodeVectorBase",
	"VoxelGIEditorPlugin",
	"VoxelGIGizmoPlugin",
	"WebRTCDataChannel",
	"WebRTCPeerConnection",
	"WebRTCDataChannelExtension",
	"WebRTCMultiplayerPeer",
	"WebRTCPeerConnectionExtension",
	"Window",
	"WindowWrapper",
	"WorkerThreadPool",
	"XRInterface",
	"XRTracker",
])
```

By itself in the Sapphire plugin, Schema will only be useful for mod support, on which I haven't yet started working in Godot, but in Unreal the concept was simple: in the user configuration file, you'd have a folder for mods, and you could create folders in it, with mod manifests and mod files, and you'd load them at runtime. The same concept will apply in Godot, made more simple by the fact that Godot *just lets you do it*, instead of converting files to binary UAsset files and whatnot.

I mentioned the GDscript parser system earlier for the Console, but it'll be used by Schema, mainly for the mod support since I'll just let you write GDscript directly, or use Schema's visual node system, depending on your experience coding or modding. The custom GDscript parser will also have a blacklist of stuff you can't write, or commands you shouldn't be able to execute. After all, I wouldn't want a rogue mod force-quitting the game or trying to access files outside the mod directory. So I need to make sure that I can put up guardrails against stuff like this.

### Plugin: Sapphire.Editor

File size as of 24.02.2026: 129.3 KB (without the .git folder)

#### Console Debugger

Oh yes, this. Quite an early little thing I coded one night, but if running via the editor (and having Sapphire.Editor enabled), it adds a dock in the bottom panel which lets the in-game console connect via localhost to the editor's console, which means I can send commands from the editor to the game. Fun!

{% video %}
/images/post-media/2026/PRISONIA/lessons_sapphire_console_debugger.webm alt="" title=""
{% endvideo %}

The code, besides settng up UI and then cleaning up, is just this, it's this simple:

```gdscript
func _enter_tree() -> void:
	title = "Console"
	default_slot = DOCK_SLOT_BOTTOM
	available_layouts = EditorDock.DOCK_LAYOUT_HORIZONTAL
	setupUI()
	consoleInput.text_submitted.connect(_on_console_input_submitted)
	call_deferred("setup_udp_client")
func _exit_tree() -> void: cleanup()

func toggle_devui() -> void:
	if udp_client: udp_client.put_packet("devui".to_utf8_buffer())

func setup_udp_client():
	udp_client = PacketPeerUDP.new()
	udp_client.connect_to_host("127.0.0.1", 4242)

func _on_console_input_submitted(text: String):
	if text.is_empty():
		return
	consoleLogLabel.append_text("[i]>> " + text + "[/i]\n")
	consoleInput.clear()
	if udp_client:
		udp_client.put_packet(text.to_utf8_buffer())
		consoleLogLabel.append_text("[color=green]✓ Sent via UDP[/color]\n")
	else:
		consoleLogLabel.append_text("[color=red]UDP client not ready[/color]\n")
```

#### GraphicsDebuggers

I haven't fully ported the code from C++, but basically this adds support for launching a graphics debugger of choice (RenderDoc, NVIDIA Nsight Graphics, a third-party tool) for the current scene, or for the game. In C++, the code was surprisingly simple. This is the code from August 2025, that only adds RenderDoc support which was then expanded to check against many editor settings:

```cpp
// in /editor/run/editor_run_bar.cpp:509
void EditorRunBar::run_renderdoc(String p_scene_path) {
	String renderdoc_path = EDITOR_GET("filesystem/external_programs/debugging/renderdoc_graphics_debugger");
	String renderdoc_settings_path = ProjectSettings::get_singleton()->globalize_path(GLOBAL_GET("debug/settings/renderdoc/settings_path"));
	List<String> paths;
	paths.push_back(renderdoc_settings_path);

	String absolute_scene_path = ProjectSettings::get_singleton()->globalize_path(p_scene_path);
	String absolute_project_path = ProjectSettings::get_singleton()->globalize_path("res://");

	// Create JSON options as Godot dictionaries
	Dictionary json_data;
	Dictionary settings;
	Dictionary options;
	String command_line;

    json_data["rdocCaptureSettings"] = 1;
    settings["autoStart"] = true;
	command_line = "--path \"" + absolute_project_path + "\" --scene \"" + absolute_scene_path + "\"";
    settings["commandLine"] = command_line;
	//settings["environment"] = Array();					// Add any environment variables if needed
	settings["executable"] = OS::get_singleton()->get_executable_path();
    settings["inject"] = false;
    settings["numQueuedFrames"] = 0;
	options["allowFullscreen"] = true;
    options["allowVSync"] = true;
    options["apiValidation"] = false;
    options["captureAllCmdLists"] = false;
    options["captureCallstacks"] = false;
    options["captureCallstacksOnlyDraws"] = false;
    options["debugOutputMute"] = true;
    options["delayForDebugger"] = 0;
    options["hookIntoChildren"] = false;
    options["refAllResources"] = false;
    options["verifyBufferAccess"] = false;
	settings["options"] = options;
    settings["queuedFrameCap"] = 0;
	//settings["workingDir"] = "";							// Set working directory, curr unused
	json_data["settings"] = settings;

	// Create RenderDoc .cap file in renderdoc_settings_path by writing JSON to file
	Error json_err;
	Ref<FileAccess> file = FileAccess::open(renderdoc_settings_path, FileAccess::WRITE, &json_err);
	if (json_err != OK) {
		ERR_PRINT("Failed to open file for writing: " + renderdoc_settings_path);
	} else {
		String json_string = JSON::stringify(json_data);
        file->store_string(json_string);
        file->close();
	}

	// Finally, run RenderDoc
	const Error err = OS::get_singleton()->open_with_program(renderdoc_path, paths);
	if (err != OK) {
		ERR_PRINT_ED(vformat(TTR("Couldn't run RenderDoc (error code %d): %s %s\nCheck `filesystem/external_programs/debugging/renderdoc_graphics_debugger` in the Editor Settings and `debug/settings/renderdoc/settings_path` in the Project Settings."), err, renderdoc_path, renderdoc_settings_path));
	}
}
```

and then just duplicate the `play_button` and `play_scene_button` buttons in `EditorRunBar::EditorRunBar()`, just remove the keyboard shortcut and set it to use run_renderdoc after you duplicate the `void EditorRunBar::play_main_scene(bool p_from_native)` and `void EditorRunBar::play_current_scene(bool p_reload, const Vector<String> &p_play_args)` functions. Don't forget to add the references in `editor_run_bar.h` and voila! Create the `"filesystem/external_programs/debugging/renderdoc_graphics_debugger"` editor setting in the editor settings code, create the `"debug/settings/renderdoc/settings_path"` project setting, and it should run RenderDoc. Of course, this isn't the full code, but it's a starting point for you to finish it 😉

In the editor, this looked like this prior to me moving to plugins:

{% gallery %}
/images/post-media/2026/PRISONIA/sapphire_editor_run_bar_grd.webp alt="A screenshot of the Editor Run Bar, but with two extra buttons." title="A screenshot of the Editor Run Bar, but with two extra buttons."
{% endgallery %}

As an alternative, you can use [jose-lico/Godot-RenderDoc-Launcher](https://github.com/jose-lico/Godot-RenderDoc-Launcher), but that only supports RenderDoc, so you'll have to add support for other tools yourself.

#### Schema Editor

{% video %}
/images/post-media/2026/PRISONIA/sapphire_editor_schema.webm alt="" title=""
{% endvideo %}

Again, I remind you that I haven't worked on bring this into the Sapphire.Editor and the Sapphire plugins, it was worked on separately, I've yet to unify it, but I don't have the time for something as heavy as Schema right now. But here's a video where I ignore the warning I placed at the button that rebuilds the ClassDB...which crashes the editor.

Anyway, it basically adds a button to the script editor UI, which then creates a new Graph in which it's supposed to represent the GDscript of the file. That took a bit of sleuthing to get right, basically I'm walking up and following the editor tree to find the script editor window.

There are some quirks that haven't been resolved since I last worked on it - at the time, Godot 4.6 had just entered development. For one, if you open the graph view then navigate to a documentation page, it'll cause some errors because there's no 'code' in the documentation page, so it can't do anything with it. I need to somehow block it from working on doc pages. For another, as mentioned, the ClassDB generator crashes the editor sometimes, but the ClassList generator works despite the null instance error that was thrown in the video.

Also, you were offered a peek at the million tabs open in three rows in VSCode for my 11ty website at a *totally normal 1:43 AM* so...hello there, past me!

### Plugin: Sapphire.Material3

File size as of 24.02.2026: 5.9 MB (without the .git folder)

I worked on this a bit in [January](https://techhub.social/@alextecplayz/115827734861480819), but essentially I'm trying to recreate Material You Expressive in Godot, because I dislike native Android app development, and I need / want to build a bookmark manager app that supports importing and exporting to browser-supported formats like HTML.

{% video %}
/images/post-media/2026/sapphire_md3_colorgen.mp4
/images/post-media/2026/sapphire_md3_contrast_carousel.mp4
{% endvideo %}

It's a fun little project, but I haven't worked on it since then. I'll return to it when I have the time.

## Project Neighbourhood

I mentioned this project back in my [2026 year in review post]({{site.baseurl}}/posts/2025-01-11-Year-In-Review.html), but only vaguely, at the end of it. PN was quickly put together as a prototype while thinking about some approaches for PRISONIA's tilemap, it's meant to be a wacky, simple game inspired by Neighbours From Hell and Hello Neighbor, where you piss off your stupid neighbours in silly ways like painting their whole house with these buckets, or having a yard sale with their stuff, etc.

Here's some early footage of that I shot for this post, but I haven't worked on it since the end of October, I want to release this as a demo on Itch, and if people like the idea, I'll commit to it.

{% video %}
/images/post-media/2026/PN/PN_paint_test_1.mp4
{% endvideo %}

You can paint walls, floors, ceilings, fences, and the neighbours themselves.

{% video %}
/images/post-media/2026/PN/PN_cleaner_1.mp4
{% endvideo %}

You can clean paint off the walls (but not the neighbour!)

{% video %}
/images/post-media/2026/PN/PN_watching_tv_1.mp4
{% endvideo %}

...spend some quality time together and watch TV

{% video %}
/images/post-media/2026/PN/PN_paint_doors_1.mp4
{% endvideo %}

Contribute to the community by painting their doors *red* (?)

{% video %}
/images/post-media/2026/PN/PN_tv_steal_and_flyoff.mp4
{% endvideo %}

Steal their TV, prop jump on the roof and fly off with it...

{% video %}
/images/post-media/2026/PN/PN_prop_jump_fly_neighbor.mp4
{% endvideo %}

Prop jump AND take the neighbor with you

{% video %}
/images/post-media/2026/PN/PN_trickshot_1.mp4
/images/post-media/2026/PN/PN_trickshot_2.mp4
{% endvideo %}

Put the neighbor on some wall they can't get down from or get them stuck mid-air and land some TV trick shots while you're at it.

*You know, now that I think about it, Project Neighbourhood isn't as neighbour-friendly as I thought it might be.*

PN is supposed to be a funny, short demo with 3 neighbours and how their ignorance led to the player being angered enough to start terrorizing them as a way of revenge. None of them have any names at this time, but the 3 neighbours in the demo will have this backstory: neighbour 1's dog keeps pooping in the player's yard and mating with their dog, neighbour 2's coddled rascal kids throw rocks at the player's windows while going to school, and neighbour 3 crashed his car in a pole that tore through the player's roof and nearly set their house on fire.

I won't get rid of the prop-jumping feature, I think that could be fun to see how players would speedrun the game or set some wacky stuff in motion to complete some in-game objectives, but the neighbours aren't as dumb as you think. I hope I'll be able to make them prop-jump as well, or at least offer some way to counter this OP feature, similar to how in HN1 the Neighbor could pull out a vacuum to try and pull the player from the roof or other high surfaces they couldn't otherwise reach on foot.

## Conclusions?

GDscript is really awesome, and coming from Unreal Engine's Blueprints system, it's quite similar, if GDscript was the code version of that. You can make games and editor plugins with it directly, you don't need a separate IDE, you don't need some stupid compiler, you don't need to bother with C++ if you don't want to, GDscript is first-class citizen in Godot 4.

Find creative but meaningful ways to optimize your games, and test on mobile if it's one of your target platforms. Test it on a mid-range phone (or even a low-end phone), that's when you really see the difference in performance between PC and mobile.

And also, play around with Godot, make a bunch of prototype demos or projects, explore it to your heart's content, because at the end of the day, you're only getting better at it, and it can also give you fresh ideas while not forcing you to burn yourself out.