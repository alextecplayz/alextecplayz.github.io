---
layout: post
language: en
locale: en_US
title: "re: Facebook app on Android [reddit/1aw9lqi]"
description: "My comment on this reddit post, archived here"
date: 2024-02-21t16:05:45+02:00
id: "reddit/1aw9lqi"
postid: NO-240221-01
permalink: "/notes/facebook-app-on-android-reddit1aw9lqi.html"
type: note
categories:
  - Note
tags:
  - 2024
  - Facebook
  - Meta
  - Android
  - Android app
  - Android apps
  - Privacy
  - tracking
  - data minimization
  - Android root
  - Android rooting
---

### Facebook app on Android [reddit/1aw9lqi]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/DeFacebook/comments/1aw9lqi/facebook_app_on_android/krgrie6/?context=3)

---

Use the website instead of the app, restrict website permissions and tracking. Heck, use Firefox or a privacy-focused fork such as Mull, install some extensions and you'd get even more privacy, combined with ad blocking and some skins or theming.

If you need to use the app, create a Work Profile using Shelter, install the app in it to keep it separate from the rest. Don't allow permissions UNLESS absolutely necessary. Contacts, Call logs, Location, Camera, Microphone, Files access are all sensitive permissions that you should grant carefully. Remove them afterwards if you have to use a feature that requires such a permission once or every once in a while, otherwise it will access them frequently to snoop on you and deliver targeted ads and invade your privacy.

If you want to take it to the extreme, you can try modifying the app, patching it, whatever, so you can deny access to even more stuff. In total, the Facebook app has 88 permissions, Facebook Lite has 70. The majority of these are not directly exposed in the user interface of the system, they're referred to as 'appops'. These much more granular and precise permissions allow Facebook to, in addition to the access granted by the permissions I listed in the paragraph above, access the list of apps installed on the device, access your Google account, access your billing information, control Wi-Fi, NFC, audio settings, prevent your phone from going to sleep (keeping screen awake), etc. These can be disabled through patches with or without root, depending on the app used.

Lucky Patcher (not available on any storefront, has its own dedicated website) works with root and non-root (root = direct patch to installed app, non-root = patch app or APK file, you need to uninstall existing Facebook app before installing patched file). There is also App Ops (available on Google Play) that does this with Shizuku, so you don't need root, but it might be finicky and some features are limited to a purchasable license from Google Play.