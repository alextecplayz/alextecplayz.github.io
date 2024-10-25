---
layout: post
lang: en
locale: en_US
title: "Sapphire Game Engine thread"
description: "A continuously-updated thread and Fedi comments regarding Sapphire."
date: 2024-01-14 00:00:00 +0200
indicator_type: notice
indicator_class: notice-danger
indicator_text: Experimental
indicator_text_onpage: CAUTION! The project is in very early development
categories: Post
fedicomments: true
fedipostid: 111755914285831968
image_banner_link: /images/post-thumbnails/Sapphire_GridBanner.webp
image_banner_alt: The Sapphire Engine logo, a few engine screenshots and VSCode laid on a dark gray grid background at an angle.
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: <a class="header-button monospace semibold" href="#landing">Top</a><br><a class="header-button monospace semibold" href="#the-what">The What</a><br><a class="header-button monospace medium italic" href="#why-did-you-choose-the-name-sapphire">Why did you choose the name Sapphire?</a><br><a class="header-button monospace semibold" href="#the-why">The Why</a><br><a class="header-button monospace semibold" href="#the-when">The When</a><br><a class="header-button monospace semibold" href="#internal-roadmap">Internal Roadmap</a><br><a class="header-button monospace medium italic" href="#foundation">Foundation</a><br><a class="header-button monospace medium italic" href="#core">Core</a><br><a class="header-button monospace medium italic" href="#advancement-1">Advancement 1</a><br><a class="header-button monospace medium italic" href="#advancement-2">Advancement 2</a><br><a class="header-button monospace medium italic" href="#future-maintenance-expansion">Future maintenance, expansion</a>
---

**NOTE:** This page may be more up-to-date than the [Vanta Interactive Docs](https://docs.vantainteractive.com/en/sapphire/) regarding Sapphire.

---

## The What

Sapphire is Vanta Interactive's internal game engine equivalent to Unreal Engine, in order to reduce our dependencies on critical projects that may change their licensing terms or EULAs at any time, and to better fit our studio's specific needs. The interface, along with the engine's functionality is purposefully designed to be near-identical to Unreal Engine's workflow, to ensure a smooth transition, not to mention a smoother project transfer experience, between Unreal and Sapphire.

Currently, Sapphire is being developed using C++, but in the future it will support additional languages such as Lua (editor features for plugins, exposing project features for modding support), JavaScript, and it's possible it may integrate languages such as Python or Rust as well, but this is still subject to change.

The rendering APIs used by Sapphire will specifically and exclusively target the latest versions, such as OpenGL 4.6 (desktop), OpenGL ES 3.2 (mobile), Vulkan 1.3 (desktop, 1.1 or higher on Android), DirectX 12 (Windows, Wine).

The engine is designed from the ground up with modularity in mind, to allow modules (plugins) to be swapped out with ease, which also helps reduce unnecessary content in packaged projects.

The user interface is using ImGui exclusively, as it's very lightweight, requires no additional packages or programs to be installed, and it's generally a much pleasant experience compared to Qt and GTK. Of course, this also means that some things have to be re-made, such as the custom titlebar, and to integrate platform-specific APIs related to windowing (e.g. Linux, Windows), not to mention it's truly cross-platform, it can also run on the web if Sapphire would ever expand to allow the development of web-based game projects.

![Sapphire has theming support!]({{ site.baseurl }}/images/post-media/Sapphire_ThemeShowcase.webp "Sapphire has theming support!")

Sapphire also comes with some tasteful new features, such as vertical tabs (*WIP*), theming support (*Done!*), a Security dashboard (*WIP*) that is mostly useful if you'd be implementing DRM or anti-cheat, and a 'Compliance' dashboard (*WIP*) where you can check if all of the dependencies of the project have licenses mentioned in the project (e.g if you're using NVIDIA Reflex, or LZ4 for compression, the dashboard would give you a checklist of things, such as if you've added the license for LZ4 in a user-accessible interface, such as the credits screen). Spark will be a feature in the long-term future, similar to Visual Studio's IntelliSense but for Schema, and perhaps a self-hosted LLM trained on engine documentation and code, and which could be trained on your project's code as well (*assuming we could have LLMs take up very little RAM, storage and energy to train, in like a decade or so, then I think this would be very feasible and very useful*). I have many more ideas for things that would be added, but I don't want to spoil anything.

Platform support? So far, Sapphire can be built using CMake on Android (ARM64), Linux (ARM64, AMD64 and RISCV64) and Windows (ARM64, AMD64). I won't support any Apple platforms (not only because of the high entry barrier to even own an Apple device, but then I'd also have to worry about Metal and whatnot, and I'm definitely not into learning Objective-C, Swift or something else). I won't support consoles either, at least for now. PCVR support? Yes. Perhaps even PCXR support later down the line, even if I may not see many benefits *right now*. But *imagine* using a game engine in a decade or so, on your *stupidly thin* XR glasses. That'd be pretty cool, actually. I may support the Web platform as well (through WebGPU), but that'd be a different can of worms that would be opened in the possibly far future, not now.

I'm still considering many options when it comes to licensing Sapphire, but as a one-man team, I definitely can't offer any support if I were to license this out freely or commercially to users or studios. However, I will regardless document all of the APIs in the documentation, which will be Markdown-based, and can be accessed both in a browser (e.g. through website generators such as Jekyll, Hugo, 11ty) and the engine through a dedicated Documentation window. One of the options I'm thinking of is making older major and potentially some minor versions of Sapphire source-available, if not open-source. Who knows, maybe I'll just keep it closed-source forever, there's a lot of thinking to be had about this specifically.

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

I mean, how am I supposed to develop *PRISONIA* with a performance hog like Unreal that runs like shit on my mid-range Redmi Note 11 even on low settings and low resolution? How could I possibly even think of a mobile version when I'd have to try and somehow dismember the engine and remove some of the problematic performance hogs, as a wholly separate engine (as if Unreal isn't already massive at 30+ GBs per engine without the source code, and without counting the dozens of GBs of Derived Data Caches per engine, and even more on top of that, per project). How am I supposed to tear down Paper2D and make my own system instead that would work the way I envisioned? No, it's not worth fighting an engine just to make my game(s) work the way I want.

## The When

I started developing Sapphire in December 2023 while toying around with GTK4. I quickly discovered GTK4 wasn't really meant for 'advanced' programs such as a literal game engine, plus it was massive and a pain in the ass to work with. I wouldn't want something as heavy as GTK to possibly become a performance hog on top of whatever performance hog a game engine can become.

In January, I restarted but with Qt6 instead, for which I [made a post on January 14, 2024](https://techhub.social/@alextecplayz/111755914285831968) saying how easier it was to use Qt6 - despite it also being a pain in the ass at some points, the Qt6 docs were really helpful to point me in the right direction when implementing something. But Qt also felt limiting. It also felt bloated (I mean, Sapphire Qt6 had dozens of Qt6 dependencies), so I started looking again.

In a moment of sheer genius, I remembered a reddit comment mentioning ImGui a while back that I saved, and I looked at some examples of programs developed with ImGui. I didn't even look at the code, I just dropped ImGui as a submodule in my project's third party folder and got to work. On [August 1, 2024 I posted about moving to ImGui](https://techhub.social/@alextecplayz/112889354792216487) with a small showcase of the custom titlebar and an empty window with a barebones vertical 'bar' that is still there today. Moving to ImGui only took a few days, and I breathed so much easier when I finally removed the Qt6 dependencies and toolchains from CMake and my project. Current CMake dependencies? SDL3, GLUT, OpenGL, Vulkan -dev packages to be installed on you system.

The file size of the folder for the current iteration of Sapphire, including many, many third-party dependencies such as ImGui, GLFW, FreeGLUT, DirectX 12 headers from Microsoft, headers for NVapi, PhysX, RT Denoiser, RTXDI, RTXGI, RTXMU, RTXPT, ogg, nlohmann's json header, a dozen of Khronos header submodules for EGL, OpenGLES, OpenGL, OpenXR, SPIR-V, Vulkan, glslang, Intel's XESS, libjxl, lz4, lua, OpenFBX, Valve's Fossilize, steam-audio, GameNetworkingSockets, among many others, rests at just shy under **500MB**. Now, of course, Sapphire is still really, really early in development, I'm still heavily focused on the user interface, because I want UI to be a mostly one-and-done thing for the time being, but that's still nonetheless impressive.

There is no current official estimate at this time for a release window for the first major version of Sapphire, but I'm guessing it could be in the second half of 2025 (H2 2025), when the Foundation and Core have been developed (*you may consult the [internal roadmap](#internal-roadmap) below to read more about those stages*). I have also put *PRISONIA* on hold just so I can prioritize Sapphire more, so I guess I'll be missing the announced Q4 2024 window, oh well.

## Internal Roadmap

Section collapsed for your convenience. It's a rough internal roadmap designed around the needs of my projects first and foremost.

<details class="details">
  <summary style="">Expand to show the contents of this collapsed section</summary>
  
<p>Everything here is subject to change or restructuring, depending on a project’s needs at that time.</p>

<h3 id="foundation">FOUNDATION</h3>
<p>Foundational development that lays the groundwork and a solid, stable and modular base on top of which all other additions and expansions will be developed.</p>

<table>
  <thead>
    <tr>
      <th>Progress</th>
      <th>Task</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FINISHED</td>
      <td>1. Engine architecture design</td>
      <td>Outline the overall architecture, ensure modularity so that components can be independently developed and maintained</td>
    </tr>
    <tr>
      <td>INDEV</td>
      <td>2. Rendering API abstraction layer</td>
      <td>Develop an abstraction layer for the rendering pipeline that handles the multiple APIs (DirectX, OpenGL, Vulkan) accordingly</td>
    </tr>
    <tr>
      <td>INDEV</td>
      <td>3. Corundum - Vulkan, OpenGL</td>
      <td>Implement both in one phase, due to the universal support for all Sapphire platforms. Mesh shaders will be used implicitly</td>
    </tr>
    <tr>
      <td>POST T4</td>
      <td>4. Corundum - DirectX</td>
      <td>One requirement is that the Windows version of the engine can be developed and built on Linux, which requires the use of MinGW</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>5. Corundum - Aster, Vendor integrations</td>
      <td>Implement ray tracing, path tracing; AMD FSR, NVIDIA DLSS, Intel XeSS, RTX, RTXDI, NRD, RTXGI and other vendor features</td>
    </tr>
    <tr>
      <td>POST T4</td>
      <td>6. Volta - Basic physics integration</td>
      <td>Develop the base for Volta (overall physics module) with basic physics simulations, collision detection, rigid body dynamics</td>
    </tr>
    <tr>
      <td>POST T4</td>
      <td>7. Basalt - Basic audio integration</td>
      <td>Develop the base for Basalt (overall audio module) with environmental sound effects, 3D positional audio, and integrate OpenAL</td>
    </tr>
    <tr>
      <td>POST T4</td>
      <td>8. Granite - Integration</td>
      <td>Develop the asset pipeline, which handles serialization, data storage, management</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>9. Input system - Handling</td>
      <td>Develop an input management system to handle multi-platform inputs, such as touchscreen, controllers and traditional M&amp;K</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>10. Scripting system - Lua</td>
      <td>Implement engine scripting using Lua</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>11. Schema</td>
      <td>Schema visual scripting system, that provides a visual graph representation of C++ code</td>
    </tr>
  </tbody>
</table>

<h3 id="core">CORE</h3>
<p>Expand the engine by focusing on key features required for Project Jailbird</p>

<table>
  <thead>
    <tr>
      <th>Progress</th>
      <th>Task</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TBD</td>
      <td>12. Corundum - 2D Rendering</td>
      <td>Develop a dedicated 2D pipeline, with support for tilemaps, sprites, sprite animations, directional sprites, and 2D physics part of Volta</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>13. UI system for game projects</td>
      <td>Develop or extend ImGui to work as a user interface system that will be used in game projects</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>14. Scripting system - Lua modding</td>
      <td>Extend the scripting system to support game project modding using Lua</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>15. Steamworks, Steam API, Workshop</td>
      <td>Implement Steam-specific features such as Steamworks, the Steam API, Workshop, Steam Audio through various plugins</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>16. Nexus - Networking layer base</td>
      <td>Develop a networking layer to be used as the base for Nexus (overall multiplayer, networking, online features module)</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>17. Nexus - Basic Multiplayer</td>
      <td>Extend Nexus with basic multiplayer features such as server-client, peer-to-peer, low-latency, replication</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>18. Nimble - Performance profiling tools</td>
      <td>Integrate native profiling tools to measure hardware usage and frame rates, with graphs and play sessions</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>19. Nimble - Debugging, diagnostic tools</td>
      <td>Integrate native, in-editor debug tools to help detect performance bottlenecks, memory leaks, threading issues, and general status</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>20. Nimble - Implement NVIDIA Reflex</td>
      <td>Implement NVIDIA Reflex as separate plugin that will integrate with Nimble and the game project to offer latency improvements</td>
    </tr>
  </tbody>
</table>

<h3 id="advancement-1">ADVANCEMENT 1</h3>
<p>Expand the engine foundation and core by focusing on key features required for Project Odyssey</p>

<table>
  <thead>
    <tr>
      <th>Progress</th>
      <th>Task</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TBD</td>
      <td>21. Corundum - Aura implementation</td>
      <td>Extend Corundum with capabilities outlined by submodule Aura (lighting, targeted lighting, scenario lighting, volumetrics)</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>22. Corundum - Aster implementation</td>
      <td>Extend Corundum with capabilities outlined by submodule Aster (ray, path tracing, rasterisation)</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>23. Corundum - Slyph implementation</td>
      <td>Extend Corundum with capabilities outlined by submodule Slyph (VFX)</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>24. Corundum - customizable shader pipeline</td>
      <td>Extend Corundum with capabilities to create and modify a wide range of shader types - vertex, fragment, geometry, compute, ray tracing</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>25. Volta - Advanced physics simulations</td>
      <td>Extend Volta with other-worldly physics simulation, joint systems, soft body dynamics, targeted physics scenarios</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>26. Volta - Celest implementation</td>
      <td>Extend Volta with Celest capabilities as a plugin, providing celestial body and space physics simulation</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>27. Terra (part I), Litha implementation</td>
      <td>Landscape editing, erosion, sculpting capabilities</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>28. AI framework base</td>
      <td>Implement basic AI features (behaviour trees, EQS, navigation meshes, state machines)</td>
    </tr>
  </tbody>
</table>

<h3 id="advancement-2">ADVANCEMENT 2</h3>
<p>Expand on the advanced features available in the engine, by working on highly advanced features required for projects Mountain, Eiffel and Vidal, and improving the scalability, optimization and large-scale capabilities required for such projects.</p>

<table>
  <thead>
    <tr>
      <th>Progress</th>
      <th>Task</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TBD</td>
      <td>29. Terra (part II) implementation</td>
      <td>Landscape generation, scenario-based and random world generation capabilities</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>Large-scale environments (e.g. cities)</td>
      <td>Extend LOD, performance, scalability capabilities to handle the simulation of multiple cities, and massive environments</td>
    </tr>
    <tr>
      <td>TBD</td>
      <td>Spark - IntelliSense, LLM</td>
      <td>Develop Spark to have IntelliSense-like features for Schema, and possibly as an LLM with some editor access and abilities</td>
    </tr>
  </tbody>
</table>

<h3 id="future-maintenance-expansion">FUTURE MAINTENANCE, EXPANSION</h3>
<p>Ensure the engine remains up to date with the latest technologies targeted by Sapphire, and meeting future project requirements</p>

<table>
  <thead>
    <tr>
      <th>Progress</th>
      <th>Task</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RECURRING</td>
      <td>X. Document all requirements</td>
      <td>Document all requirements, provide a copy of the license in the main LICENSE.md file, keep track of dependencies</td>
    </tr>
    <tr>
      <td>RECURRING</td>
      <td>X. ImGui user interface development</td>
      <td>Develop the user interface of the Editor using Dear ImGui</td>
    </tr>
    <tr>
      <td>RECURRING</td>
      <td>X. Documentation</td>
      <td>Constantly-evolving engine documentation that must be maintained and updated frequently</td>
    </tr>
    <tr>
      <td>RECURRENT</td>
      <td>Technology updates and implementations</td>
      <td>Implement, update or upgrade to new technologies as they release</td>
    </tr>
    <tr>
      <td>UNKNOWN</td>
      <td>AR, XR, VR support</td>
      <td>Only VR is confirmed to be developed in the future, AR and XR support is speculative at this point in time</td>
    </tr>
    <tr>
      <td>UNKNOWN</td>
      <td>Future project needs</td>
      <td>Continuously assess the needs for future projects, beyond the previous stages’ implementations</td>
    </tr>
  </tbody>
</table>

</details>

*As a final note, the comments displayed below are from under [this post](https://techhub.social/@alextecplayz/111755914285831968) which is used as the 'parent' of Sapphire conversations on my profile.*