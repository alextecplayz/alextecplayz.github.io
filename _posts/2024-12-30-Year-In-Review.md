---
layout: post
type: post
lang: en
locale: en_US
title: "2024 Year In Review"
description: "Looking back through 2024, from starting big projects like Sapphire, to helping localize Bluesky in Romanian; from applying to many jobs to getting hired nowhere. With ups and downs, 2024 was quite a good year for me."
date: 2024-12-30 01:00:00 +0200
indicator_type:
indicator_class:
indicator_text:
indicator_text_onpage:
categories:
  - Post
tags:
  - 2024
  - Year in Review
  - AlexTECPlayz
  - State of affairs
fedicomments: false
fedipostid: 
image_banner_link: /images/post-thumbnails/YearInReview2024.webp
image_banner_alt: 
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: <a class="header-button monospace semibold" href="#landing">Top</a><br><a class="header-button monospace semibold" href="#january">January</a><br><a class="header-button monospace semibold" href="#february">February</a><br><a class="header-button monospace semibold" href="#march">March</a><br><a class="header-button monospace semibold" href="#april">April</a><br><a class="header-button monospace semibold" href="#may">May</a><br><a class="header-button monospace semibold" href="#june">June</a><br><a class="header-button monospace semibold" href="#july">July</a><br><a class="header-button monospace semibold" href="#august">August</a><br><a class="header-button monospace semibold" href="#september">September</a><br><a class="header-button monospace semibold" href="#october">October</a><br><a class="header-button monospace semibold" href="#november">November</a><br><a class="header-button monospace semibold" href="#december">December</a><br><a class="header-button monospace semibold" href="#2025">2025</a><br><a class="header-button monospace semibold" href="#summary">Summary</a><br>
---

Happy holidays, for the remainder of the holidays that continue through for the first few days / weeks after the New Year. Another year dawns upon us all, with both things to fear, but to also be happy about (or not). In this blog post, I'll try to look back through each month of 2024, to outline what I've managed to achieve this year. I can categorically say that 2024 has been MUCH better than 2023, and I'm hoping 2025 will be better.

## January

On January 4 I created the VantaInteractive/project-jailbird repository with four commits, starting the development of PRISONIA in Unreal Engine 4.27.2. On January 13, VantaInteractive/Sapphire gets new commits after the last commits having been added November 25, 2023, when Sapphire was still using GTK4, OpenGL and GLFW. January 13 handles a complete repository cleanup. The next day, VantaInteractive/Sapphire gets new commits, this time the UI components have been rebuilt using Qt6. Sapphire is now using OpenGL and GLUT. [Wrote on Mastodon](https://techhub.social/@alextecplayz/111755914285831968) about how Qt6 has been much easier to adopt compared to GTK4, plus GTK4 may be slower in performance and may not be the best suited for 'advanced applications' that have many menus and submenus. Two days later, [I post](https://techhub.social/@alextecplayz/111762956207770671) about how the engine now has icons (from Material Icons and Material Symbols). Later in the day I [post another update](https://techhub.social/@alextecplayz/111767884994926672) showing off a better default layout, added editor tabs, and created dialogs for About and Create Project.

## February

On February 26 and 27 I toy around with [vertical tabs](https://techhub.social/@alextecplayz/112000270744544290) for Sapphire and a custom square titlebar to better match the design system I'm going for, and to support the vertical tabs feature. Sapphire is put on hold until April, then again until June.

## March

Near the end of the month, March 21-24, I launch [:vi-bw:Status](https://status.vantainteractive.com), [:vi-bw:Legal](https://legal.vantainteractive.com). [Happy Trump Indictment Day](https://techhub.social/@alextecplayz/112190518988848805)!

## April

On April 7 I add the Intel XeSS submodule to Sapphire. Development is put on hold until June, as PRISONIA development continues. On April 10 I push the V6 version of the [:vi-bw:Vanta Interactive website](https://vantainteractive.com) and the [:vi-bw:Docs](https://docs.vantainteractive.com), and website update 1.5. On April 21 I moved PRISONIA from Unreal 4.27.2 to Unreal 5.2.1, migrated to using the PaperZD plugin instead of the built-in, aging Paper2D system. This would be necessary because Google Play wouldn't let me publish APKs for internal testing unless I used the latest Google Play Billing API (because even if you disable the Billing plugins in Unreal, it still implements some form of billing API in your produced APK file, even if you don't use Billing.)

## May

Birthday! I turned 19. On May 31 I push more changes to the VI Website, Docs and Legal. From the end of May until the beginning of June, I work as a 'contractor' at a hospital, helping them prepare their management system for the yearly inspection. I'll do it again next year, if my schedule permits.

## June

On June 1, PRISONIA gets announced on [my site]({{ site.baseurl }}/post/2024/06/01/Announcing-Prisonia.html) and on [:mastodon:Mastodon](https://techhub.social/@alextecplayz/112543436664142843). PRISONIA in UE5 features [multi-floor construction](https://techhub.social/@alextecplayz/112543459702716644), [preliminary Lua mod support](https://techhub.social/@alextecplayz/112543479365568796), [todo lists with tasks and subtasks](https://techhub.social/@alextecplayz/112543501064035623), [customizable action banners](https://techhub.social/@alextecplayz/112543577330000851) (both for development and modding), swapping out wardens and their abilities, etc. Still, [as mentioned](https://techhub.social/@alextecplayz/112543586933366191), the long-term goal was Sapphire since January, even though PRISONIA was the priority from February through May. Last 2 commits to VantaInteractive/project-jailbird, in which I started work on a way to handle tiles, because of course, Unreal can't handle pathfinding in 2D that easily, and especially not in an expandable map like the game's. So, PRISONIA has been put into stasis while I bring Sapphire up to snuff, before I can begin migrating the game to the new engine. On June 14, the initial switch from Qt6 to ImGui is successful. Initial re-implementations of Corundum, the lovely menu bar that I've come to like for being so simple, yet so great, while on June 29 the initial custom title bar implementation, small util and helper changes take place.

On June 25, I started applying to jobs through eJobs.

## July

Nothing particular takes place in July. I just take a month-long break and play games.

## August

[Big update about Sapphire](https://techhub.social/@alextecplayz/112889354792216487) on Mastodon, as the month's first commit gets published on August 1. Custom title bar, vertical tabs, Qt6 is completely removed, and there's a big overhaul to the UI thanks to ImGui being so simple to pick up, learn and use. Throughout the month, more commits to Sapphire are published, as development ramps up. On August 31 I finally come out as trans to two of my best friends, after sprinkling many hints about this for months beforehand (*plus, I was out on GitHub (Jan 4) and Mastodon for a while at this point*). Look, you have to understand, I have trust issues and Romania isn't really the best place to be trans 😅, plus one of those best friends was rather transphobic just a year beforehand.

## September

By September 8, I moved from GLFW to SDL3, I have a [preliminary plugin system the next day](https://techhub.social/@alextecplayz/113110130536417333) that scans for manifest changes or the presence of a manifest in `/Content/Plugins/`. On September 21 there's a major restructuring that involves removing most of the submodules and re-adding only the includes and the license for each. Also added is a ROADMAP.md and improved the CMakeLists.txt to better discover and build the engine's code, including plugin (module) code. Two days later I started work on plugin library (.so) detection, loading, and installation into specific folders (e.g., `/Content/Plugins/2D/2DSystem/Binaries/{platform}/2DSystem.{fileextension}`). Later that day, I refactor how plugins are installed, so /Content/Plugins is created at build-time. More work continues until September 28 when I finally manage to have a plugin interface that would allow plugins to be loaded. September 29 and 30 handle 2/3 of UI theme support, that is per-project managed.

## October

By October 2, theme support is mostly finished.

## November

Ordered on Halloween (of all things, but it was a Black Friday sale) a Raspberry Pi 5 4GB [kit](https://electronix.ro/produs/kit-placa-de-baza-raspberry-pi-5-4gb/) that included a [case](https://www.raspberrypi.com/products/raspberry-pi-5-case/), SD card, and the [board](https://www.raspberrypi.com/products/raspberry-pi-5/?variant=raspberry-pi-5-4gb) itself with the [charger](https://www.raspberrypi.com/products/27w-power-supply/) for a measly EUR 87, quite a great deal. *Little did I know at the time, that the userspace was 32-bit while the kernel was 64-bit…*. The next day, I tried setting up an e-mail server. It did manage to send e-mails through Gmail's proxy, but I gave up because…ISP blocking ports. Four days later, I ordered the [Pi 5 M.2 SSD hat](https://www.raspberrypi.com/products/m2-hat-plus/) and a [256GB Samsung M.2 SSD](https://www.amazon.com/SAMSUNG-PM991A-MZALQ256HBJD-256GB-Internal/dp/B0BC27QCZ2) from eMAG, and picked them up Nov. 6. Shout out to [rpi-clone](https://rpi-clone.jeffgeerling.com/), I've used it twice so far (*second time was in December*) and it's damn good. Straightforward and hassle-free. Just how a system clone should be.

By November 8, RPI5-1 is now running Radicale CalDAV & CardDAV and Vaultwarden. Tried self-hosting both the new and the old Firefox Sync + accounts infra, but it's an absolute nightmare to try to run, and gave up because it's a miserable piece of shit. Mozilla (and Chrome, for that matter!) should provide fully-fledged sync servers that can be self-hosted, and have the ability to store the synchronized data server-side, without all of this bullshit. Chrome, in particular, lacks any modern sync server that can be self-hosted.

## December

On December 2 I switch from OpenGL to Vulkan, which means that I have to re-do some parts of the Sapphire renderer, as I've completely dropped anything that isn't Vulkan. I just want to focus on one renderer at this time, and Vulkan is the logical one to keep going forward.

On December 7 (*I haven't written about this on Fedi because it wasn't a big deal, but*) as per the November 1 foreshadowing, I had the great (dis)pleasure to find out that I was running a 32-bit userspace while trying to compile a Ruby version so I can run the Mastodon server. No problem! rpi-clone my system to the 16gb SD card from RPi, flash Raspberry Pi OS Lite (64-bit kernel, 64-bit userland) to an 8GB microSD that I'd use to flash the new system, rpi-clone the new system to the SSD, mount the old install and transfer everything over. All within the hour, totally seamless with no issues whatsoever.

December 8 is a better day, as I managed to update and get [:visoc:Vanta Social](https://github.com/VantaInteractive/Social) up and [:mastodon:running](https://techhub.social/@alextecplayz/113618245868821503)! I'll probably still use techhub as my primary account for the time being, I might mirror or boost some posts to the Vanta Social accounts, but right now there's not much to post about there. Vanta Social allows me to have the 'branded' look using Obsidian, and I can create accounts specific to certain projects such as Sapphire and PRISONIA, which is great. And the best part? It's not even using that much RAM on my 4GB Raspberry Pi 5. Still, it's a nice little achievement that I wanted to do before the year ends. Give my accounts on there a follow if you'd like! I'll start posting using them in 2025. [:atp:@alextecplayz@social.vantainteractive.com](https://social.vantainteractive.com/@alextecplayz), [:vi-pride:@vantainteractive@social.vantainteractive.com](https://social.vantainteractive.com/@vantainteractive), [:sapphire:@sapphire@social.vantainteractive.com](https://social.vantainteractive.com/@sapphire), [:prisonia:@prisonia@social.vantainteractive.com](https://social.vantainteractive.com/@prisonia)

From December 17 until the end of the year at least, I'm on a binge playing TheoTown every day, or every other day. Same for HITMAN: World of Assassination (for which, my full trilogy review is almost done, so it'll come out in January 2025). Also, Fedi might not like this one because *hurr durr Bluesky is corporate, not decentralized, etc.*, but Claudiu Cristea and I have managed to get a [pull request](https://github.com/bluesky-social/social-app/pull/6456) accepted into the social-app repository that adds Romanian localization the next day, yay! Regardless of one's opinions of a website or an app, I think we can all agree that supporting additional languages can only be helpful, as it's making the web more accessible. Also, happy Saturnalia if you celebrate it!

And…it's December 24. Merry Christmas! Happy holidays, if you celebrate! Santa's got a website update! Since Dec. 18 I've been hard at work on update 1.7 for my website! Fulltext search on all pages based on the sitemap, search is a revamp of an old project of mine, [project searchlight](https://github.com/alextecplayz/proto-searchlight), but now with filtering (sorting, snippets, excluding certain types of content) — *this feature has been on the back-burner a couple of times, I tried before (as seen on the Vanta Interactive website search), but that version is miserable to work with*, a more mobile-friendly UI, a new home page, some QoL where possible, and a few more minor additions, like visual effects such as vignette, rain and snow, custom emojis, some more tasteful features such as page navigation and sharing! There are categories and tags to select, too. Enjoy!

## 2025

And in three days, it's 2025. This year, either I'm getting a job that pays well (*I'm currently unemployed*), or the more likely option, going to college for three years. Either way, I want to allocate a portion of my monthly salary to donate to a couple associations and groups. This would be separate from the 3.5% income tax that I can also re-allocate to a couple of associations, namely ONGs (you can find a handy list [here](https://formular230.ro/organizatii/) — *note that the site is not official*).

I was thinking of the following places for my income tax to be divided up to: [MozaiQ](https://www.mozaiqlgbt.ro/), [Pride Association](https://asociatiapride.ro/en/), [Ark Oradea](https://www.instagram.com/arkoradea/) and [TransCore](https://transcore.ro/). Additional donations (outside my income tax) will be divided up to: possibly the same four as mentioned before, plus [Starea Naţiei](https://stareanatiei.ro/), [Recorder](https://recorder.ro/), and perhaps a few more that I haven't yet decided on.

IF I go to college, and that's a big IF, post-graduation I'll get a job, and a few months down the line I'll start a business entity for Vanta Interactive. Which would also allow me to freelance (B2B or B2C), something that I'm not permitted without a business or an individual entity (See the conundrum? Can't freelance without a legal entity, and therefore, lots of money. Can't have money without a job. *How is one supposed to earn money without a job, and without being able to freelance, legally?*). This would mean that I would have to spend less time on doing the stuff I like, and more time on catching up on whatever subjects I'd need, in order to apply to the college I chose (*more details about this in 2025*).

## Summary

So, to summarize, in 2024 I started working on my own game engine, which is a big project in of itself, fully embraced ImGui instead of heavy, bloated Qt6 or GTK4. I kept updating my website because I really do love web design. Worked on a game but put it on hold due to me dropping Unreal altogether to embrace Sapphire's development. I finally made a proper search feature that isn't miserable. I'm well on my way to master Jekyll and Liquid, and continued to further my skills with HTML, CSS and had loads of fun with JS, and will keep on using these instead of switching to any web framework. Furthermore, I bought and set up a Raspberry Pi 5 to run a Cal, CardDAV, Vaultwarden and Vanta Social. Not only that, but I bettered my understanding of human psychological behaviours, self-introspection, and came out as trans to my best friends. I also continued to explore how hormones work and how they contribute to the physiological and psychological development of humans. Continued developing my nuanced political leanings. Got better at photography, I'm using the camera hardware on my Redmi Note 11 to the fullest. Applied to many jobs, had a couple of interviews, didn't get hired anywhere.

In 2025 I might have less free time as I will most likely go to college for three years, so there's that. But at least it's something that's interesting to me, so it won't be a complete waste of time, plus the curriculum doesn't seem to have any extra subjects that would make no sense to be there, which is fantastic.

Here's to (hopefully) an even better year for me, and for everyone. Enjoy every little win you can, because it helps if you have anxiety or were in depression and are feeling down.