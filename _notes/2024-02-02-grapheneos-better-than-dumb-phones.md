---
layout: post
language: en
locale: en_US
title: "re: GrapheneOS better than dumb phones? [reddit/1ah5tpt]"
description: "My comment on this reddit post, archived here"
date: 2024-02-02t15:29:07+02:00
id: "reddit/1ah5tpt"
postid: NO-240202-01
permalink: "/notes/grapheneos-better-than-dumb-phones--reddit1ah5tpt.html"
type: note
categories:
  - Note
tags:
  - 2024
  - GrapheneOS
  - Android
  - Smartphone
  - Smartphones
  - Technology
  - Tech
  - Dumb phones
  - Google Pixel
  - Linux
  - BSD
  - source code
  - open-source
  - Privacy
  - Security
  - tracking
---

### GrapheneOS better than dumb phones ? [reddit/1ah5tpt]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/degoogle/comments/1ah5tpt/graphene_os_better_than_dumb_phones/koljpjn/?context=3)

---

Dumb phones have their own advantages - removable batteries, they're simple and the battery lasts longer because of this, they're cheap and disposable - while a new or used Google Pixel currently supported by GrapheneOS might set you back a few hundred bucks.

The only other better alternative to GrapheneOS that I can think of is a theoretical device where you have complete control over the source code used by the hardware, and running a heavily privacy-focused distribution of Linux or BSD. GrapheneOS can't really do more advanced stuff related to connectivity other than the ability to restrict access to cell towers, WiFi, etc, you're just toggling off some stuff, but there's no granular control over this stuff, especially not over the modem, which is separated from the OS anyway, as it should be.

If you can audit and modify the source code of any of the components, you could spot anything that may be tweaked to improve your privacy further. Most smartphone modems are closed source, so you can't know if there's some hardware or software backdoor, or if the modem could be accidentally leaking data. Additionally, you could implement selective network or cell tower access, protocol filtering, the ability to only connect to certain trusted networks. Heck, you could probably expose software to the system to run a VPN and a DNS filter directly on it, for lower CPU and RAM usage, making it the first physical line of defense when it comes to generally blocking website trackers, specific IP and web addresses (through filterlists, for example), and so much more.

Most smartphone modems are proprietary - usually developed by Samsung, Qualcomm, MediaTek - but there are some efforts to develop open-source modems, not specifically for smartphones, but I wouldn't exclude the possibility.

Take IMSI catchers for example, also known as StingRays. They can act as a cell tower and all devices will automatically choose it because of its signal strength over any actual phone towers. The vast majority, if not all, consumer smartphones and dumb phones don't allow you to manually choose a phone tower - heck, depending on the mobile provider, even doing that would be violating their ToS or something.
