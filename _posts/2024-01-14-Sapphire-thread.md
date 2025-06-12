---
layout: post
type: post
lang: en
locale: en_US
title: "Sapphire Game Engine thread"
description: "A continuously-updated thread and Fedi comments regarding Sapphire."
date: 2024-01-14 00:00:00 +0200
ledate: 2025-06-09 21:26:15 +0200
indicator_type: notice
indicator_class: notice-warning
indicator_text: In development
indicator_text_onpage: WARNING! The project is in continuous development
categories:
  - Post
  - Roadmap
tags:
  - 2024
  - Development
  - Software
  - Sapphire Game Engine
  - Sapphire
  - Game Engine
  - game engine development
  - software development
  - game development
  - roadmap
  - PRISONIA
  - Unreal Engine
  - Unreal Engine 4
  - Unreal Engine 5
  - Update
  - State of affairs
fedicomments: true
fedipostid: 111755914285831968
image_banner_link: /images/post-thumbnails/Sapphire_GridBanner.webp
image_banner_alt: The Sapphire Engine logo, a few engine screenshots and VSCode laid on a dark gray grid background at an angle.
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: true
---

**NOTE:** This page may be more up-to-date than the [Vanta Interactive Docs](https://docs.vantainteractive.com/en/sapphire/) regarding Sapphire.

---

## The What

Sapphire is Vanta Interactive's internal game engine equivalent to Unreal Engine, in order to reduce our dependencies on critical projects that may change their licensing terms or EULAs at any time, and to better fit our studio's specific needs. 

In the past, Sapphire was a custom (from the ground up) built game engine using C++, used ImGui for the user interface, and had a basic plugin system.

As of February 23, 2025, Sapphire is no longer a fully custom game engine. It's a hard fork of [Godot Engine](https://github.com/godotengine/godot), following the `master` branch, and merging some bigger PRs earlier than upstream.

On top of that, Sapphire expands the functionality using engine modules such as a module to support `Dear ImGui` (which was previously used in the custom-built Sapphire engine), has ongoing work on bringing closer support for workflows using programs such as `MagicaVoxel`, `Blender`, `Aseprite`, `RenderDoc` as well as integrations with importers from Source Engine / Source 2, and when time allows, will re-write and optimize the now-abandoned [`godot-visual-script`](https://github.com/godotengine/godot-visual-script) module that was removed with Godot 4.0, as I personally do not enjoy working much with GDScript, and would rather use C++, C# and a Blueprints-like visual scripting system.

Sapphire removes support for Apple devices such as macOS, iOS and visionOS, as we don't have plans to target Apple devices. Console support is also unplanned.

And this being a fork, Sapphire benefits from the same PRs and changes from upstream. Sapphire will remain closed-source at this time, however modules such as the visual script module and integrations with other programs may be open-sourced. Sapphire will also aim to improve documentation on existing Godot features as well as new features.

Features previously mentioned in this post such as vertical tabs, a 'license compliance'/dependency dashboard will also be implemented. Sapphire Spark is also in pre-development stages, using the Model Context Protol (MCP), which allows models such as LLMs to interface and interact with the editor.

### Why did you choose the name Sapphire?

Sapphire is a gem (*generally blue, but there is pink sapphire as well!*), and I like gems. Additionally, Sapphire is composed of other things, mainly Corundum, which is a codename for the renderer. And of course, I *love* codenames, so of course the modules for Sapphire also have names:

- **Apex**: animation tools, keyframe editor, motion capture module
- **Aster**: (r)aster, ray & path tracing
- **Aura**: lightning and volumetrics module of Corundum
- **Basalt**: audio processing, sound design, audio volumetrics module
- **Boreas**: sky, atmospheric effects
- **Celest**: celestial body simulation plugin
- **Corundum**: renderer (overall)
- **Glacier**: ice, snow, frost simulation
- **Granite**: data storage, asset management module
- **Kaida**: foliage, vegetation, flora ecosystem simulation
- **Litha**: landscape, terrain erosion, sculpting
- **Mariana**: advanced ocean, sea simulations, sea ecosystems
- **Nexus**: multiplayer, networking, online features module (overall)
- **Nimble**: engine’s performance management and optimization tools
- **Poseidon**: fluid simulation module
- **Riven**: physics-based destruction, fracture simulation module
- **Slyph**: advanced particle simulation
- **Spark**: engine and project-aware helper inspired by IntelliSense, that could expand to have an LLM integration that would be trained and run locally
- **Terra**: terrain generation, landscape editing, environmental tools module
- **Volta**: physics simulation (overall)
- **Zephyr**: wind, air, gas simulation module

## The Why

I founded Vanta Interactive with the idea that I could make a lot more software for myself, and of course, the world / the community under a 'business' brand, as opposed to my personal brand, AlexTECPlayz (*yes, ATP is not just a username, but it's also my personal brand*). It mainly started as a game studio, because I always wanted to make games (*I do have many great ideas for games, so why let those ideas go to waste?*), but it has now expanded to also being a software and web development studio. 

Now, as a game developer, I have ~5 years of experience with Unreal Engine 4 and 5 (as of 2024), but I always had my gripes with Tim Sweeney and Epic Games as a company. The whole Unity thing where they abruptly changed the EULA definitely spurred me to drop everything I was doing in Unreal and go all-in on a custom game engine, simply because there's no telling what changes could happen to Unreal, plus it's just a heavy, monolithic engine that is very resource-intensive and runs like shit on 8GBs of RAM.

Then, there's also some annoying differences between UE4 and UE5 (well, mainly *issues*), such as [UE5 eating up pretty much every bit of RAM you have when you create arrays specifically in Blueprint Struct files](https://techhub.social/@alextecplayz/112287504699406857), which [I presume is either something the Unreal developers didn't notice, or didn't bother fixing](https://techhub.social/@alextecplayz/112287777281507338), due to all the heavy push for UE5 to come out of Early Access. In comparison, the same Jailbird (*PRISONIA*) [UE4 project hasn't had even a bit of bump in the 865 MBs of RAM memory it was using adding the same amounts, if not more, of arrays](https://techhub.social/@alextecplayz/112287712283058467). Minor gripe, sure, but add in all of the other reasons I mentioned, and you'd see why I'd want to move away from Unreal to do my own thing. I haven't even listed the reasons from the Docs page:

- Android support is lacking outside of a few basic configuration options.
- If older versions of Unreal Engine are used, such as 4.27.2, they will, by default, use old or unsupported, out-of-date libraries and APIs that will prevent the built Android application from being published to Google Play Store, and other Android platforms that enforce specific versions of APIs.
- Unreal’s support for OpenGL ES 3.1 features is disappointing and quite lacking. OpenGL ES 3.2 is available starting from Unreal 5, but this would limit the device support for published Android applications. If an Android game is not graphically intensive, or does not need to use GLES 3.2, there is no need to use Unreal 5.
- Not just that, but Unreal feels quite bloated, and a performance hog. Unreal 5 is, by default, much more resource-intensive compared to Unreal 4.
- The support for Paper2D is thoroughly disappointing and saddening. Paper2D was introduced in Unreal almost a decade ago, and it is still in Beta, with no significant ongoing development to fully release it into a stable feature. To date, there are no upcoming plans on the public Unreal Engine roadmap to complete Paper2D.

I mean, how am I supposed to develop *PRISONIA* with a performance hog like Unreal that runs like shit on my mid-range Redmi Note 11 even on low settings and low resolution? How could I possibly even think of a mobile version when I'd have to try and somehow dismember the engine and remove some of the problematic performance hogs, as a wholly separate engine (as if Unreal isn't already massive at 30+ GBs per engine installation without counting the source code, and without counting the dozens of GBs of Derived Data Caches per engine, and even more on top of that, per project). How am I supposed to tear down Paper2D and make my own system instead that would work the way I envisioned? No, it's not worth fighting an engine just to make my game(s) work the way I want.

## The When

I started developing Sapphire in December 2023 while toying around with GTK4. I quickly discovered GTK4 wasn't really meant for 'advanced' programs such as a literal game engine, plus it was massive and a pain in the ass to work with. I wouldn't want something as heavy as GTK to possibly become a performance hog on top of whatever performance hog a game engine can become.

In January, I restarted but with Qt6 instead, for which I [made a post on January 14, 2024](https://techhub.social/@alextecplayz/111755914285831968) saying how easier it was to use Qt6 - despite it also being a pain in the ass at some points, the Qt6 docs were really helpful to point me in the right direction when implementing something. But Qt also felt limiting. It also felt bloated (I mean, Sapphire Qt6 had dozens of Qt6 dependencies), so I started looking again.

In a moment of sheer genius, I remembered a reddit comment mentioning ImGui a while back that I saved, and I looked at some examples of programs developed with ImGui. I didn't even look at the code, I just dropped ImGui as a submodule in my project's third party folder and got to work. On [August 1, 2024 I posted about moving to ImGui](https://techhub.social/@alextecplayz/112889354792216487) with a small showcase of the custom titlebar and an empty window with a barebones vertical 'bar' that is still there today. Moving to ImGui only took a few days, and I breathed so much easier when I finally removed the Qt6 dependencies and toolchains from CMake and my project. Current CMake dependencies? SDL3, GLUT, OpenGL, Vulkan -dev packages to be installed on you system.

In February 2025, I decided that perhaps the best move, considering that I just started a full-time job at the time (*which in time, made me more tired and generally less 'in the mood' to code something as complex as an engine from the ground-up)* was to migrate to Godot and make Sapphire a hard fork of it.

## The Future

It's June 2025. I'm thinking of quitting my current job because it's made me very tired (especially as I've been transferred to a different department after a small restructuring) and taking a part-time remote job instead. This will allow me to work more on Sapphire (which is already gamedev-ready, considering it's basically Godot with my additions on top), and perhaps even squeeze some time in for projects such as PRISONIA.

*As a final note, the comments displayed below are from under [this post](https://techhub.social/@alextecplayz/111755914285831968) which is used as the 'parent' of Sapphire conversations on my profile.*
