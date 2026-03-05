---
layout: post
language: en
locale: en_US
title: "re: What is the best way to clean a project to package it [reddit/18wz6kn]"
description: "My comment on this reddit post, archived here"
date: 2024-01-02t22:52:00+02:00
postid: NO-240102-01
id: "reddit/18wz6kn"
permalink: "/notes/what-is-the-best-way-to-clean-a-project-to-package-it-reddit18wz6kn.html"
type: note
categories:
  - Note
tags:
  - 2024
  - Unreal Engine
  - Unreal Engine 4
  - Unreal Engine 5
  - Android game development
  - Game development
  - Content management
---

### What is the best way to clean a project to package it [reddit/18wz6kn]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/UnrealEngine5/comments/18wz6kn/what_is_the_best_way_to_clean_a_project_to/kg1m882/?context=3)

---

Look into PakBlacklist (*deprecated, but still works*) and DefaultPakFileRules.ini, where you can exclude files using regex, and you can exclude editor content as well. PakBlacklist would be placed in your project's Build/(platform)/ folder, and DefaultPakFileRules in the project's Config folder.

I use PakBlacklist for Android packaging, and it would look something like this:

```
../../../Content/GAME_DEV/
../../../Engine/Content/ArtTools
../../../Engine/Content/Maps
../../../Engine/Plugins/Runtime/WebBrowserWidget
../../../Engine/Plugins/Runtime/MeshModellingToolset
../../../Engine/Plugins/Experimental/CommonUI
../../../Engine/Plugins/Media/MediaPlate
../../../Engine/Plugins/Blendables/
../../../Engine/Plugins/Enterprise/
../../../Engine/Plugins/Editor/
../../../Engine/Content/SlateDebug/
../../../Engine/Content/Tutorial/
../../../Engine/Content/Slate/Fonts/
../../../Engine/Content/Slate/Testing/
../../../Engine/Content/Slate/Tutorials/
../../../Engine/Content/Slate/Icons/
../../../Engine/Content/Slate/CrashTracker/
../../../Engine/Content/Slate/Old/
../../../Engine/Content/Slate/Docking/
../../../Engine/Content/Slate/Common/
../../../Engine/Plugins/Runtime/LeapMotionController/
../../../Engine/Plugins/Editor/SpeedTreeImporter/Content/SpeedTree9/game_wind_noise.ubulk
```

so I can just remove this content from being packaged in Android builds to save storage space, and to avoid including useless or in-dev content.

The DefaultPakFileRules.ini example is found in (ue4/5 install directory)/Engine/Config/BasePakFileRules.ini and would be placed in your project's Config folder, it would look something like this:

```ini
; is used as comment in the file, will be ignored by editor
; the rules are applied in order
[SectionName] ; e.g. ExcludeContentForLinux
; Sections might need to follow certain names for it to work properly, so check the source code
; or additional documentation where possible. I don't think you can just add a random name to the
; section stuff.
Platforms="Linux"
bExcludeFromPaks=true
; files listed below will be excluded from Pak files entirely
+Files=".../Engine/Content/Slate/Tutorials/"
+Files=".../Content/GAME_DEV/Materials/dev_*"
; regex can be used with * to exclude any files that
; have dev_ before the rest of the filename
+Files=".../Engine/Plugins/Enterprise/"

[ExcludeContentFromMobile]
Platforms="Android,iOS"
bExcludeFrompaks=true
+Files=".../Content/MobileStarterContent"
```

Now, this will require the manual work of you having to look into what files are USED by the project, from files or folders you wouldn't think they would be used. Do NOT exclude the editor fonts folder if you don't have your own font files, for example, as you will get a warning the files are missing when you start the game on platforms such as Android, which would be unprofessional and a glaring issue if it's a Shipping version. Heck, some content if excluded might just crash the game, so look and test carefully.

Also, you might want to set some file and folder naming conventions. For any additional content you don't use, either delete it altogether or move it to a specific folder and/or subfolder. For development stuff, have a separate folder. Post-launch or DLC content? Their own folder. I use this, for example, and it works well for my use case:

```
Legend:
GAME_ ; folder, (number) - chunk number
GAME_BASE (100) ; Content that is used by other content, or considered part of the 'base' game, such 
                ; as the non-DLC content
GAME_DEV (990)  ; Content that is used in development and testing, NEVER included or cooked in Shipping
                ; builds
GAME_DLC1 (200) ; Content that is used by DLC1 of the game, that usually isn't used by any follow-up
                ; DLCs or additional content
GAME_DLC2 (300) ; Content that is used by DLC2 of the game
GAME_MODULENAME, EP1, CODENAME, MP, SP (200-890)    ; If you have modules, e.g. a large part of the game,
                                                    ; such as a game mode, episodic content, etc, you may
                                                    ; prefer to have separate GAME_MODULENAME folders for
                                                    ; each, so players could potentially exclude certain
                                                    ; content from being used or installed.
GAME_BONUSCONTENT (995) ; bonus content, such as in-dev showcases in a game museum, soundtrack player,
                        ; other media etc
GAME_SDK, MODDING (950-980) ; If you want to expose additional stuff or have a full-blown SDK, mod kit,
                            ; tools, separate it and ensure players can exclude such content from being
                            ; installed to save space
```

alongside PrimaryAssetLabels in each, such as PAL_GAME_BASE that is put in the GAME_BASE folder, helps to tell the editor that the content in this folder (incl. subfolders) is packaged in some way, and put in a certain chunk (e.g. 100) if you use chunking. I recommend to use numbers such as 100, 200, 990, etc. to allow for some leeway in between for patched content or additional content that you might just have to include in a chunk closer to the initial chunk. I consider 0-95 to be the chunks where 'overflow' content such as improperly packaged localization, additional assets I might have missed to exclude might end up in.