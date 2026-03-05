---
layout: post
language: en
locale: en_US
title: "re: Why are you still rooting your android? [reddit/1b5dhio]"
description: "My comment on this reddit post, archived here"
date: 2024-03-03t13:48:23+02:00
id: "reddit/1b5dhio"
postid: NO-240303-01
permalink: "/notes/why-are-you-still-rooting-your-android-reddit1b5dhio.html"
type: note
categories:
  - Note
tags:
  - 2024
  - Android rooting
  - tracking
  - Privacy
  - Security
  - ad blocking
  - data minimization
  - data backup
  - data restore
  - Android root modules
  - VPN
  - DNS
  - Android kernel
  - Android kernel manager
---

### Why are you still rooting your android? [reddit/1b5dhio]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/androidroot/comments/1b5dhio/why_are_you_still_rooting_your_android/kt5ajqt/?context=3)

---

- extra volume steps (only achieved through a Magisk module that's modifying the build prop, or certain custom ROMs)
- A-GPS SUPL replacer module
- microG (system apps)
- Rboard flag modifications for Gboard
- LSPosed modules
- Termux, programs run through Termux such as Btop (task manager with terminal UI, root is needed to read certain data)
- VPN (OpenVPN for pDNSf) + personalDNSfilter in root mode (filterlist that allows me to block IP addresses and web addresses in a simple and customizable interface, with support for additional filterlists that can be imported from wherever you want) // Basically always-on VPN + adblocking, malware website blocking, privacy improvements in general because trackers are blocked outright
- AFWall+ firewall to block or allow apps to use certain network features such as LAN, Mobile Data, Wi-Fi, VPN
- the ability to access /data/data/ for apps that ONLY store their data there, instead of Android/data (e.g. Megapolis. GTA LCS - games that only keep their save files and preferences in /data/data/, so you can't transfer from a different device or use old saves without root)
- Lucky Patcher can patch apps using root instead of having to create new modified apps that I need to then reinstall (which might involve backing up the apps' /data/data/ folder to avoid losing data)
- unlimited Google Photos storage (can be done through root or through certain custom ROMs, like I do)
- Franco Kernel Manager (FKM), can change SELinux policy, undervolt my CPU, GPU, adjust RAM stuff such as zRAM state and size, other Kernel settings, per-app performance profiles, general performance overview through a dashboard
- general app/data backup and restore is much easier with root