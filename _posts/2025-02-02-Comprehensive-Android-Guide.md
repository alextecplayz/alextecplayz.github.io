---
layout: post
type: post
lang: en
locale: en_US
title: "Comprehensive Android Guide"
description: "A comprehensive guide with must-haves and recommendations regarding security, privacy and general usability for an Android ROM. Some of the steps require root."
date: 2025-02-02 20:43:00 +0200
indicator_type:
indicator_class:
indicator_text:
indicator_text_onpage:
categories:
  - Post
tags:
  - 2025
  - Guide
  - Privacy
  - Security
  - How-to
  - Android
fedicomments: true
fedipostid: 113936059393427853
image_banner_link: /images/post-thumbnails/AlexTECPlayz_GridBanner.webp
image_banner_alt: 
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: true
---

Hi! This is my comprehensive guide to setting up an Android-powered device, enhancing its privacy and security capabilities using apps or modules, any optional steps, recommendations and much more. This all comes from my decade of experience of using Android.

### Prerequisites

- This guide assumes you know how to use a computer running Windows and/or Linux
- This guide assumes you know how to use tools such as ADB, and to run commands from the Windows Command Prompt or Linux terminal of your choice
- This guide assumes you already have [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools#downloads) (which includes the `adb` and `fastboot` binaries required for flashing a custom recovery in later steps) installed on your computer
- This guide assumes you already have the Android USB Driver (generic or device/OEM-specific) installed on your computer

### Notes

- This guide is based on Android 15 and will be updated each time a new version of Android is released. Not all features may be available on older versions.
- This guide uses Samsung and Xiaomi steps for custom ROM, custom recovery, kernel and root installation procedures. Please consult other guides that can be found on XDA for other recommended manufacturers / brands.
- This guide covers Samsung despite not meeting one requirement from the 'Choosing an Android device' section, because Samsung custom ROMs do not support file-based encryption (FBE).

### Warnings

- This guide minimizes your privacy footprint when using Google Play Services or microG on your device. You can remove them / not install them if you're using a GAPPS-free custom ROM. It's up to you.
- This guide doesn't cover high-risk situations, such as if you're being tracked by your government (*e.g. you're a whistleblower*). That requires much more drastic measures, and this guide simply isn't enough. You'll need a proper threat model for this.

### Choosing an Android device

If you haven't picked an Android device, or have trouble deciding, here are *my* deciding factors. This may differ for you.

- Must be at least a mid-range device in terms of overall specifications and product series / range. For Samsung, look for the Galaxy A2x-A7x, where A2x is between low and mid-range, A5x is the de-facto mid-range, and A7x is between mid-range and higher, but still not anywhere close to a flagship. For Xiaomi, choose the Redmi Note series. Google has the Pixel a series.
- Do not buy a device that doesn't come from a globally-recognized smartphone manufacturer like Samsung, Xiaomi, OnePlus, Nothing. This means no devices from stores such as Temu, Alibaba, no devices such as Jolla, Alcatel, Allview, SHIFT, E-boda, Myria.
- Stay away from Jolla, Volla, Murena and Purism, and other 'privacy-focused' devices. They suck in terms of specs and in general.
- Stay away from certain Chinese-based companies like Huawei, Honor, Meizu, Infinix, IQOO, Hisense, Tecno, Lenovo. Xiaomi remains an outlier, as you will see in the next section why.
- 4GB RAM at minimum, 6-8GB RAM recommended as of 2025. 64GB of storage (ROM) at minimum, 32GB or lower may be an exception if you need to purchase a device for a specific purpose. Then you can lower your product series / range as well. The aversion to Chinese-based companies remains regardless of needs.
- microSD support, NFC are necessary.
- At minimum, a processor equal to the Snapdragon 678 in terms of performance and at most 11nm in terms of transistor size. Bigger transistors require and consume more power, and are more inefficient.
- 48MP camera should be the baseline, but depending on the manufacturer and device drivers, this may be reduced, but 10MP is the minimum when it comes to Samsung devices, 48MP for Xiaomi.
- At minimum, the device (new or pre-owned / used) should at least have Android 9 or Android 11, because of Project Treble that is Android 8+.
- The ability to unlock the bootloader is absolutely necessary. Xiaomi has an overwhelmingly shitty limitation for bootloader unlocking that requires you to create a Xiaomi (Global, or if using a CN device and living in CN, a Xiaomi CN) account, then initializing the bootloader unlock procedure through their Windows program (that does run through Wine, but you may have trouble finding the device, so a Windows 8.1 virtual machine through Virtualbox is recommended) - that, and do not purchase a Xiaomi device that uses HyperOS, it will make the bootloader unlocking process significantly more difficult. Samsung is considerably better, but Samsung has its own faults. RedMagic and ZTE are hostile and prevent bootloader unlocking. ASUS may have some hits and misses as well, so just Google your ASUS phone model + bootloader unlock to see if there are any relevant results.
- Do not purchase the device from a carrier, under any circumstances. Some carriers enforce their own carrier networks, so you can't use other SIMs. Some carriers bloat the device with extra stuff beyond the factory-provided bloatware (region-dependent, network-dependent). Some carriers provide their own software integrations such as AT&T or T-Mobile having their own over-the-air (OTA) update mechanism / screen and features. Avoid at all costs the North American or South Korean models of Samsung devices, use only Samsung devices that have been purchased in the European Union area to ensure they can have their bootloader unlocked.

To note:
- Xiaomi limits how many devices you can unlock the bootloaders for in a 24-hour period
- Samsung immediately and permanently disables the Knox security features when you unlock the bootloader by destroying an e-fuse. Samsung does not allow the use of the Knox security enclave by custom ROMs, which prohibits the installation of the only ROM in the next section that provides hardware security and hardening, GrapheneOS, as GOS is developed with a separate physical security processor / enclave in mind.
- Nothing downgrades the camera capabilities on their devices with each update. This may not be intentional, but just an actual bug. Still, something to keep in mind.

### Choosing an Android ROM

To save you the hassle: If you want the most secure Android ROM, choose [GrapheneOS](https://grapheneos.org/) (shortened to GOS) with a supported Google Pixel device such as Pixel 6 or higher. Do not use a Pixel 5a or older. Non-Google devices are unsupported and there's practically no one out there that modifies or provides support for GrapheneOS on other devices. Pixel 8 and newer are strongly recommended as they offer a minimum of 7 years of support from Google, and support the memory tagging feature (more on that in a moment)

If you don't have a Google Pixel, choose [LineageOS](https://lineageos.org) or [crDroid](https://crdroid.net/) which is based on LineageOS, or just plain [AOSP](https://source.android.com/). There are also ArrowOS, EvolutionX and DerpFest that are alright, but I'd rather vouch for LineageOS (shortened to LOS) and crDroid.

If your device is not officially supported, do not fret. Thankfully, there are XDA forums or Telegram channels for tight-knit communities around specific models of phones that are widespread, such as the aforementioned Galaxy A1x-A7x range of devices, or the Redmi Note range. This includes the Redmi Note 11 that I'm currently using, and my past Galaxy A10.

**Strongly avoid one-off ROMs or other ROMs.** It's not even about the risk of malware or something, but one-off ROMs may be test builds, debug builds, they may be incomplete in terms of feature-set or Android base implementation, or hardware support for the device of your choice. This means avoid risingOS, LMODroid, VoltageOS, Project Pixelage, Genesis OS, PixelOS, Project Blaze, Project Matrixx, StatiXOS, and [stay the fuck away from ElixirOS](https://xdaforums.com/t/elixiros-to-break-and-wipe-your-device.4672456/), because they have a hidden trigger that wipes your internal storage and microSD card storage if you attempt to bypass the payment process to gain access to paid features.

Strongly avoid the OEM-provided skin/ROM on Xiaomi devices, such as MIUI or HyperOS. Do note that you (most likely) will lose access to useful features such as RAM Plus (RAM+) and some other built-in goodies that work well such as the Xiaomi screen recorder, but it's just a trade-off you'll have to put up with. This doesn't apply to Samsung's OneUI, you can keep using that if you don't want to change your ROM.

Avoid /e/OS and CalyxOS. GrapheneOS is simply in a league of its own. If you can't use GrapheneOS, stick to LineageOS or crDroid instead of using these two 'alternatives'. /e/OS specifically has weaker privacy and security compared to GOS, plus they support insecure devices, doesn't support verified boot, and gives Google services privileged (system app) access, even through microG. /e/OS is also NOT de-Googled. This makes /e/OS deceitful in my eyes. More or less the same thing for CalyxOS. It's based on LineageOS but still reduces security, misses out on security updates, and generally doesn't actually improve much. Again, you're much better off manually hardening LineageOS through my guide instead of using something like /e/OS or CalyxOS.

**Strongly avoid ROMs that do not encrypt your internal storage!** This depends on the device. For example, Galaxy A10 ROMs will most likely not encrypt your device's storage, which would allow someone using a custom recovery to just access the files right away - NOTE: This is not a 'feature' of the custom ROM, but it's simply impossible to retain an encrypted file system on a Samsung device since the File-Based Encryption implementation used by Samsung is heavily dependent on Knox. As a result, a Samsung device running a custom kernel or a custom ROM will not have an encrypted /data partition! Most, if not all Redmi Note 11 custom ROMs will encrypt the storage. All LineageOS-based ROMs including crDroid, starting with LineageOS 15 (based on Android 8) introduce the 'Trust' interface in the Settings app. You can find this under Settings > Security & privacy > More security & privacy > Trust. If you see this: Encryption Enabled, then you're good to go.

**Strongly avoid ROMs that do not ship the regular Android security patches**. These are very important in order to protect your device from many up-and-coming vulnerabilities.

Okay, so back to GrapheneOS, what does it do that's so much better than anything else?
- GrapheneOS is based on AOSP, and builds up / improves on top of this stable base
- GrapeheneOS has historically contributed (upstreamed) a lot to the AOSP project regarding security, so they have a proven track record of reliability
- GrapheneOS offers attack surface reduction features such as disabling by default features like NFC, Bluetooth, UWB, or when the screen is locked, the USB-C, microUSB port, pogo pins, camera. This can prevent simple attacks such as malicious devices disguised as chargers from accessing your phone's internal storage, or someone using your device camera from the lock screen (through a lock screen shortcut). By default, the charging port of a GrapheneOS-powered device prohibits data transfers when the device is locked, both at hardware and kernel level. This is in contrast to regular AOSP and most likely other OEMs, where the feature (available in the Developer Settings portion of the Settings app, only blocks access at the HAL - Hardware Abstraction Layer - and OS level, but not at the actual hardware or kernel levels)
- GrapheneOS includes a hardened memory allocator and hardened libc to protect against the common classes of vulnerabilities and memory corruption, and reducing the sensitive data lifetime in RAM, among many other things that you can read in the [Features](https://grapheneos.org/features#exploit-mitigations) section of their website
- scoped storage and contacts, which can allow you to selectively share specific contacts and files with apps, instead of allowing full access like on every other Android ROM or Android-based OS.
- sandboxed Google Play that can be optionally installed
- doesn't include or use Google services by default
- duress PIN/Password
- improved user profiles that provides better, more private separation of data
- the Vanadium browser based on Chromium, that's the most comprehensive and hardened browser on Android. Other browsers do borrow features, but cannot borrow specific features that make use of GrapheneOS' hardware-based additions, such as hardware memory tagging or enabling hybrid post-quantum cryptography
- and much, much more.

Do keep in mind that through this guide I will try to improve the security and privacy of a ROM based on LineageOS, a custom build of crDroid 11 based on Android 15 that's developed to support the Redmi Note 11 specifically.

### Installing

#### For GrapheneOS

Just use the [WebUSB-based installer](https://grapheneos.org/install/web) or follow the [command-line installation guide](https://grapheneos.org/install/cli) instead. Both are straight-forward and should be simple enough to understand.

#### For any other ROM

Here's a general guide that should apply to most devices. This guide assumes you haven't unlocked the bootloader, haven't flashed a custom recovery, haven't flashed a custom ROM and/or haven't flashed a custom kernel or rooted your device. Additionally, when it comes to installing the custom ROM, the guide assumes you do not set up the device in this section. Refer to the next main section to set up your device.

##### Unlock your device's bootloader

NOTES:

- Unlocking the bootloader will wipe all data from the internal storage of the device, so it's basically performing a factory reset procedure. This happens whenever you lock or unlock the bootloader.
- Unless you're running GrapheneOS, DO NOT, under any circumstance, lock your bootloader again if you are installing ANY custom ROM. Locking the bootloader with a custom ROM installed will (most likely) permanently brick your device, as most phone manufacturers do not support this feature for anything other than their own OEM-provided skin / ROM / OS.
- For Samsung devices: after you unlock the bootloader, you're passing the point of no return. You will not be able to access again features dependent on Samsung Knox, such as potential Galaxy AI features, the Samsung Knox apps suite and features, you will lose the ability to download and install over-the-air (OTA) updates from the device, requiring a manual flash of the update through the Download Mode. There is NO ability that can restore Knox. If you see any service that claims to restore Knox, know that it's an utter scam. The only way to regain access to Knox is by replacing the motherboard of your phone.
- For most phone manufacturers, including Xiaomi and Samsung, unlocking your bootloader permanently voids your warranty, and the repair service can easily figure out if you have unlocked the bootloader or not, through a very wide variety of detection features provided by the Android system or their own software. There's no reliable way to hide that your device has an unlocked bootloader.

- **If using Xiaomi** and running **MIUI** (NOT HyperOS!), the [english MIUI website](https://en.miui.com/unlock/download_en.html) provides a simple solution, but they don't mention some stuff on the page:
  1. Create a Xiaomi account. This is **necessary** for the bootloader unlock procedure to work!
  2. Enable the Developer Settings, by pressing 7 times on the build number on the About phone page.
  3. Navigate to the Developer Settings, toggle on the `OEM unlocking` option. Then, tap on `Mi Unlock status`. You'll need to log in with the Xiaomi account you've created on your phone. You need a valid SIM card, and you'll need to enable mobile data, and disable Wi-Fi. You will need to add a phone number to your Xiaomi account as well. All of these are necessary in order to unlock the bootloader on a Xiaomi device.
  2. Download the Mi Unlock program, run it on Windows 8.1 or higher (does not matter if you have Windows installed on bare metal or through a virtual machine), and log in with the same Xiaomi account that you've used to log in on your device.
  3. Shut down your phone manually, then after it's been shut down, hold at the same time the Volume Down key and the Power button for roughly 7 seconds to enter the Fastboot mode
  4. Connect your phone to the PC where Mi Unlock is running using a USB cable and click "Unlock".
  5. At this point, if you haven't done this before, Xiaomi will not unlock the device. Instead, it will show you a waiting period of roughly 168 hours (a week) or so before you can unlock your device. Do NOT perform the unlock procedure until at least one day after the mentioned period has passed, as the period is most likely using CN time, so one more day will account for the timezone difference. If the alotted period + 1 day has passed, you can connect your device to the PC and click "Unlock" again, it should work now. Do NOT click the "Unlock" button multiple times, as that may increase the waiting period to somewhere between 2 and 4 weeks, depending on how much you keep pressing the button.

- **If using Samsung**, the process is very straightforward thankfully. MAKE SURE that the Samsung device you have bought is from any country in the European Union. North American and South Korean models do not have the ability of having their bootloader unlocked.
  1. Connect to the Internet after setting up the device.
  2. Open the Settings app, scroll all the way down to About Device, and tap on Software information. Scroll (if needed) down, and tap on the Build number seven times. If you have a screen lock method such as a PIN or Password, you will be prompted to enter it after the seventh tap.
  3. This has now enabled the Developer Settings menu. Navigate back to the home screen of the Settings app by tapping Back twice, then scroll down until you reach below the About Device section, where the Developer Settings is situated (Android 9+)
  4. You should see a 'OEM unlocking' option in the Developer Settings, right below 'Enable Bluetooth HCI snoop log' and above 'Running services'. Toggle on this feature. You'll get some pop-ups and may be required to re-enter your PIN or password if you have a screen lock option.
  5. Turn off the phone manually, then after it's been shut down, hold at the same time the Volume Up and Volume Down buttons AND plug in a USB cable capable of data transfer, such as the cable that comes with the device in the box. Release the buttons when you see something on the screen.
  6. You will see a new screen that warns you about installing a custom OS and whatnot. Press the Volume Up key once to proceed, which will boot into the Download Mode, specific to Samsung devices.
  7. You should now be presented with a screen that asks if you want to lock or unlock your bootloader (depending on the existing state of the bootloader), press and hold Volume Up for a few seconds.
  8. You will be presented with one final confirmation step, press Volume Up to proceed with the bootloader unlock operation. This will factory reset your device.
  9. Once the operation has been completed, the device will automatically reboot and it will start the OEM or Android setup wizard again, just like when you have first set up the device.

##### Flash a recovery

What is a 'recovery', you might ask? It's a built-in feature of Android-powered devices. OEM-provided recoveries usually have simple features such as the option to factory reset your device, to wipe the cache partition, and to apply updates from local storage.

To make everyone's life easier, we won't stick to the OEM-provided recovery, and we'll install what is called a 'custom recovery'. There are two big choices in the Android world when it comes to custom recoveries: [TWRP](https://twrp.me/) and [OrangeFox](https://orangefox.download/).

TWRP stands for TeamWin Recovery Project, it's an open-source custom recovery fork based on the OmniROM/android_bootable_recovery GitHub repository. TWRP has an official list of supported devices [here](https://twrp.me/Devices/). Try to use an official TWRP release where possible.

OrangeFox is another open-source custom recovery project. Their device list is available on their [download site](https://orangefox.download/). Again, try to use an official OrangeFox release where possible.

- **If using Xiaomi**, you will most likely just flash the file as-is using the `fastboot` command.
  - **If you want to flash TWRP**
    1. Download the TWRP .zip file. Download the TWRP .img file as well. Copy the .img file to where you have platform-tools installed on your computer, or you can use its path from the commandline. Copy the .zip file to your phone's internal or external storage.
    2. Reboot your phone into bootloader mode. This is usually Volume Down + Power for a few seconds.  Holding the Volume Down + Power for seven seconds will force restart the device.
    3. Find your phone's name (e.g. `Redmi Note 11`), it should be on the box or you could see this in the Settings > About device page. This is extremely important for the next step.
    4. Search your phone name + partition or A/B on the web. You need to look for information related to your phone's *partition scheme*. Some phones use A/B, some use Virtual A/B, some have an A-only partition, etc. If you don't know what these are, oversimplified, they're one or two slots (A or A/B) that the device duplicates important partitions such as `system`, `vendor`, `boot` in order to allow successful roll-backs in case of a faulty device software update. It's important to find out precisely the partitioning scheme for your device.
    - If you have an `A-only` device, or a `Virtual A/B` device with a dedicated recovery partition:
      1. Flash TWRP by running the following command: `fastboot flash recovery /path/to/twrp.img`
      2. Once completed, reboot into the newly installed recovery by pressing (*usually*) the Volume Up + Power buttons, or via the `fastboot reboot recovery` command.
    - If you have an `A/B` or `Virtual A/B` device with a 'standard' `boot-as-recovery` mode:
      1. Boot TWRP by running the following command: `fastboot boot /path/to/twrp.img`. Do NOT run this command on a device that has a dedicated recovery partition, or you will brick your device!
      2. At this stage, the custom recovery is NOT installed. You're just booting into a temporary recovery.
      3. Check if TWRP performs accordingly - check if the touchscreen works by navigating around, and check if partitions have been mounted successfully. Mainly, the `/data` partition. Navigate to /data/media/0/ or /data/data/ for example, and see if folders and/or files show up.
      4. If so, you can flash the TWRP.zip file. Tap on the "Install" button from the TWRP home screen. Navigate to where the TWRP .zip file is stored, and tap on it.
      5. Swipe to confirm flashing the file. This should install TWRP in both slots (slots A and B separately).
      6. You can confirm this by rebooting back to recovery. From the TWRP home screen, tap on "Reboot", and either tap on Shut Down and then use the key combination (Volume Up + Power) or the "Reboot to recovery" button to reboot into the newly installed recovery.
    - If your ROM uses `vendor_boot-as-recovery`, do not perform any command. The process and commands for such a device may vary by device. Look for dedicated guides on flashing the recovery on your phone name if you have such a device.

  - **If you want to flash OrangeFox**
    0. If you've already installed TWRP, you can just install the OrangeFox .zip file (without any wipes beforehand), and the next time you reboot to the recovery, you will have switched to OrangeFox.
    1. If you still have your stock recovery, follow these steps:
    2. Download the OrangeFox .zip file, and extract its `recovery.img` file. Copy it to where you have platform-tools installed on your computer, or you can use its path from the commandline. Copy the OrangeFox .zip file to your phone's internal or external storage.
    3. Reboot your phone into bootloader mode. This is usually Volume Down + Power for a few seconds. Holding the Volume Down + Power for seven seconds will force restart the device.
    4. Find your phone's name (e.g. `Redmi Note 11`), it should be on the box or you could see this in the Settings > About device page. This is extremely important for the next step.
    5. Search your phone name + partition or A/B on the web. You need to look for information related to your phone's *partition scheme*. Some phones use A/B, some use Virtual A/B, some have an A-only partition, etc. If you don't know what these are, oversimplified, they're one or two slots (A or A/B) that the device duplicates important partitions such as `system`, `vendor`, `boot` in order to allow successful roll-backs in case of a faulty device software update. It's important to find out precisely the partitioning scheme for your device.
    - If you have an `A-only` device, or a `Virtual A/B` device with a dedicated recovery partition:
      1. Flash OrangeFox by running the following command: `fastboot flash recovery /path/to/recovery.img`
      2. Once completed, reboot into the newly installed recovery by pressing (*usually*) the Volume Up + Power buttons, or via the `fastboot reboot recovery` command.
    - If you have an `A/B` or `Virtual A/B` device with a 'standard' `boot-as-recovery` mode:
      1. Boot OrangeFox by running the following command: `fastboot boot /path/to/recovery.img`. Do NOT run this command on a device that has a dedicated recovery partition, or you will brick your device!
      2. At this stage, the custom recovery is NOT installed. You're just booting into a temporary recovery.
      3. Now, transfer your OrangeFox .zip file over to the device (or already have it in the internal/external storage before the previous step).
      4. Check if OrangeFox performs accordingly - check if the touchscreen works by navigating around, changing appearance settings, etc., and check if partitions have been mounted successfully. Mainly, the `/data` partition. Navigate to /data/media/0/ or /data/data/ for example, and see if folders and/or files show up.
      5. Okay, time to actually flash OrangeFox properly. Navigate to where the OrangeFox .zip file is placed on your device, and tap on it. Select flash.
      6. After installation, the device will automatically reboot into the newly installed OrangeFox. That's it!
    - If your ROM uses `vendor_boot-as-recovery`, do not perform any command. The process and commands for such a device may vary by device. Look for dedicated guides on flashing the recovery on your phone name if you have such a device.

- **If using Samsung**, you will most likely flash the recovery via [Odin3](https://technastic.com/odin-download-samsung-latest-all-versions/), a leaked internal Samsung firmware flashing tool designed to load and flash firmware images onto Samsung devices. There is no 'official' way to download this, but the link I provided is safe. Download the 3.14.1 or 3.14.4 release, it doesn't really matter.

NOTE: There are a number of prerequisites for this. Namely, two other files need to be downloaded.
  - File 1: VBMeta_disabled.tar, [open-source](https://github.com/libxzr/vbmeta-disable-verification) program that patches the VBMeta partition (a partition containing metadata used for verifying the integrity of other partitions during the boot process, essentially Verified Boot) and disabling the verification flags inside. This is absolutely necessary to run a custom ROM or kernel on a Samsung device, there's no other way around it.
  - File 2: [multi-disabler](https://xdaforums.com/t/pie-10-11-system-as-root-multidisabler-disables-encryption-vaultkeeper-auto-flash-of-stock-recovery-proca-wsm-cass-etc.3919714/) [open-source](https://github.com/ianmacd/multidisabler-samsung) flashable script that will disable a number of features on Samsung devices that may otherwise cause issues when running a custom recovery, custom kernel and/or custom ROM. The major features that get disabled are File-Based Encryption (FBE), which would otherwise encrypt the /data partition. It is a rather unfortunate side effect that will downgrade your device's security, effectively making it unencrypted. This only happens on Samsung devices, most likely due to Samsung's FBE implementation being heavily dependent on Knox features such as the TEE (Trusted Execution Environment enclave situated in the Knox portion of the device processor) and Keymaster (a security component running in the TEE that manages, creates and deletes the cryptographic keys used for the file-based encryption). Other features that get disabled are the system recovery auto-restoration mechanism that may be triggered, which would otherwise overwrite the custom recovery and re-install the OEM-provided recovery, and process authentication, which needs to be disabled in order to run a custom kernel.

  1. Download the .tar archive of the latest version of the recovery of your choice to the computer - TWRP (*twrp-version-model.img.tar*)or OrangeFox (*download the .zip file, extract the recovery's .img file, rename it to recovery.img and re-archive it using the GNU tar archive format*).
  2. Download the multi-disabler .tar archive to your device, such as on a SD card, or to your computer (from where you can share it to your phone via USB later)
  3. Boot your Samsung device into Download Mode as before (hold Volume Up and Volume Down at the same time, and insert a USB cable **capable of data transfer**). Accept the warning by pressing Volume Up.
  4. [CRITICAL] Look in the top left corner of the screen, where there is some text. Only proceed if the text displays OEM LOCK OFF and REACTIVATION LOCK OFF. Do not proceed if any of these two values are ON!
  5. If both values are off, we can proceed.
  6. Launch Odin3, it should detect the device right away (make sure Odin3 is running on the computer that you plugged your Samsung device into, and that the cable is capable of data transfer).
  7. In Odin, click on the Userdata button, navigate and select the VBMeta_disabled.tar file in the file manager window that shows up.
  8. In Odin, click on the AP button, navigate and select the custom recovery's .tar file in the file manager window that shows up.
  9. In Odin, after selecting both files, you can press on the "Start" button. Odin will flash both files to your device. The process will not take more than a minute usually, not even on the low-end devices.
  10. The device WILL reboot after the files have been flashed. When the screen has turned off, immediately press Volume Up and Power to access the newly installed recovery.
  11. In TWRP, you will be presented with a start screen, just swipe right using the '>>' handle button to the right. Don't select the read-only setting before doing so. In OrangeFox, you should just be presented with the home screen outright.
  12. If you have the multi-disabler file on your SD card, proceed to step 12. Otherwise, send it from your computer. Both TWRP and OrangeFox enable the ADB and USB file transfer modes by default. You should be able to copy and paste the multi-disabler.tar file to your device's internal storage at this point, or to send it using the ADB command `adb push /path/to/multi-disabler.tar /sdcard/`.
  13. From the TWRP home screen, select the first option on the screen, which is "Install", and navigate to the multi-disabler.tar file, select it and swipe right on the button handle to flash it. From the OrangeFox home screen, just navigate to the multi-disabler.tar file, select it and tap to flash.
  14. If all went well, congratulations! You now have a custom recovery, have unfortunately disabled verified boot and file-based encryption. It's the only way to run a custom ROM on a modern Samsung device.

##### Flashing a custom ROM

Okay, at this stage you should have the bootloader unlocked, and should be using either TWRP or OrangeFox. Flashing a custom ROM is significantly easier with a custom recovery.

0. Remove your device's lock screen protection, such as the PIN, password or anything else you're using (recommended)
1. Download the .zip for your custom ROM. For LineageOS, [here is the officially supported download list](https://wiki.lineageos.org/devices/). For crDroid, [here is the download list](https://crdroid.net/downloads) to your device (and move it to the external storage, such as an SD card, USB flash drive or to your computer, from where you'll transfer it back to your device later).
2. Boot into your custom recovery.
3. Have your custom ROM .zip file ready. If you don't have it on the device, you can use `adb push /path/to/customrom.zip /sdcard1/` (for external storage)
4. Format the /data partition, first and foremost.
  - From TWRP, select "Wipe", then "Format Data" and confirm it. After the process has finished, reboot back to recovery. Go back to the TWRP home screen and "Reboot" > "Reboot to recovery".
  - From OrangeFox, select "Menu", "Manage partitions", "Data", "Format Data" and confirm by typing 'yes'. Reboot back to recovery.
5. After rebooting back to recovery, you'll need to format some partitions before installing a custom ROM.
  - From TWRP, select "Wipe", then "Advanced Wipe", and check only the boxes the custom ROM maintainer has indicated to check. Usually, this is "Dalvik / ART Cache", "System", "Data", "Internal Storage", and in rarer cases, "Vendor". Do not select "Vendor" unless the custom ROM maintainer specifically indicates this. Swipe to wipe.
  - From OrangeFox, select "Menu", "Manage partitions", check "Dalvik / ART Cache", "System", "Data", "Internal Storage", and in rarer cases, "Vendor". Do not select "Vendor" unless the custom ROM maintainer specifically indicates this. Swipe to wipe.
6. Okay, go back to the home screen of your custom recovery. You're ready to flash the custom ROM file.
  - From TWRP, select "Install" and navigate to the custom ROM .zip file. Select it, and swipe to install.
  - From OrangeFox, navigate to the custom ROM .zip file, select it, check "Reflash OrangeFox after flashing a ROM" (because, in some cases, custom ROMs will install their own custom recovery). Unless stated otherwise, check this setting. Some ROMs (not LineageOS or crDroid) may not work without the custom recovery for whatever reason, in which case you'll have to keep the recovery that is installed by the ROM. Swipe to install.
7. That's it! You can wipe the cache from the screen that shows up after the flash is complete, then reboot to the system.

##### Flashing a kernel

You may optionally want to install a kernel, either for tweaks using apps such as EKTweaks (Eureka kernel tweaks app, Samsung-only), hKtweaks (Samsung-only), or FKM (Franco Kernel Manager, more universal and should work with most kernels), or if you want to install KernelSU. If you're installing KSU, follow this guide, and ignore the section below about Rooting your device, since you've already done it.

0. Have the custom kernel .zip in your internal storage. Reboot to recovery.
1. Simply flash the .zip file from the recovery.
  - From TWRP, select "Install" and navigate to the custom kernel .zip file. Select it, and swipe to install.
  - From OrangeFox, navigate to the custom kernel .zip file. Select it, and swipe to install.
2. Done! Reboot to system.

If the kernel includes KernelSU (usually indicated by a ksu in the file name), then the kernel has KernelSU integrated inside. You can install the KernelSU manager app on your phone. If the app doesn't detect the root, then you can re-flash the kernel again, it should work. You can re-flash the kernel as many times as you want with no downsides.

##### Rooting your device

There are some key differences between different root methods. KernelSU and APatch patch the kernel, which make them significantly harder to detect compared to Magisk. KernelSU requires a kernel that has been specifically patched in order to work. APatch can manually or automatically patch the `boot.img` boot image that contains the kernel. Magisk is a systemless root solution that also patches the boot image, but it doesn't alter the kernel itself. This is what makes Magisk so much more approachable and supported by many more devices compared to KernelSU (KSU) or APatch.

**Strongly avoid** any rooting solution that isn't [KernelSU](https://kernelsu.org), [Magisk](https://github.com/topjohnwu/Magisk) or [APatch](https://github.com/bmax121/APatch). I won't cover APatch installation, as I haven't used it and see no need to use it if I have KernelSU installed.

IF YOU ALREADY HAVE KERNELSU, DO NOT PROCEED. Skip this section, as you already have root.

In this section, we're installing a different root system, [Magisk](https://github.com/topjohnwu/Magisk). The installation is simple.

You can do it as per [the guide](https://topjohnwu.github.io/Magisk/install.html#getting-started), using the Magisk app, but that's complicated for most users.

OR

You can install Magisk from the recovery. Download the Magisk APK, rename it to .zip (or .apk.zip, doesn't matter), and have it in your phone's storage.

1. Boot into the custom recovery.
2. Simply flash the .zip file.
  - From TWRP, select "Install" and navigate to the Magisk .zip file. Select it, and swipe to install.
  - From OrangeFox, navigate to the Magisk .zip file. Select it, and swipe to install.
3. Done! Reboot to system. You can now install the Magisk APK file, Magisk may require you to reboot your device again via the app which would install some more things (but this pop-up doesn't always show up). If there's no pop-up and Magisk indicates that it's installed (in the Magisk section, Installed Yes means Magisk is installed), then you're good to go.

### Setting up

So, you're on the OEM or Android setup wizard screen. Some steps may differ, some may be different depending on the operating system. But generally, the rule is this: don't connect to the Internet, continue with the offline installation experience. Don't log into a Google account, uncheck all Google checkboxes related to location, backups, data sharing, and any optional data sharing settings (such as the LineageOS or crDroid usage & diagnostics). Any other personalization settings (theming, navigation, apps) are *up to you* to decide, *obviously*.

Then, also follow the additional setup that's found 

This guide uses Android 15 as the base for settings that you should change. Older versions may lack some features.

Going through each page in the Settings app, you should do the following:

- **Network & internet**
  - **Internet**
    - **Network preferences**
      - disable "Turn on Wi-Fi Automatically"
      - set WiFi timeout to 2 minutes
      - disable "Notify for public networks"
      - disable "Allow WEP networks"
    - **Saved networks**
      - tap on network name, then disable "Auto-connect". Above, in "Privacy", make sure you're using a per-connection randomized MAC (or per-network randomized MAC), and disable "Send device name"
  - **SIMs > 'SIM provider name'**
    - Disable "VoLTE"
    - Disable "Wi-Fi calling"
    - Disable "Carrier video calling"
  - **Hotspot**
    - Turn on "Allow clients to use VPNs", all connections will be routed through the active VPN service on your device
    - **Wi-Fi hotspot**
      - Change Hotspot name to something generic
      - Change security to at least WPA2/WPA3-Personal, or WPA2/WPA3-Enterprise if the device or ROM supports it. Don't go exclusively for WPA3-Personal unless you're sure that all devices that will use your hotspot support the WPA3-Personal or WPA3-Enterprise standard.
      - Change Hotspot password to something secure, like a passphrase
      - Change "Turn off hotspot automatically" to 1 minute to preserve your battery life
      - In Speed & compatibility, keep 2.4 GHz unless you're sure that all devices that will use your hotspot support the 5 GHz Wi-Fi frequency
      - In Connected devices, set the Limit of connected devices to something less than the default 32. I'd recommend 1 to 4 by default, increase it if you need to have more devices connected to the hotspot at once.
      - Turn on "Hidden network" after all devices have connected to the hotspot. This will hide the hotspot name in the list of available WLAN networks.
  - **Data Saver**
    - Configure the list of apps you'd like to be able to use unrestricted mobile data when the data saver is turned on. The rule of thumb is to allow the browser(s) you actually use on a daily basis to be able to access unrestricted mobile data, any apps that perform file synchronization such as DAVx5 or your *DAV of choice, music streaming apps, NewPipe, the VPN and DNS apps you'll be using, and then any other apps of your choice, but I'd suggest keeping the list rather small.
  - **VPN**
    - After you install the VPN app of your choice, tap on the cogwheel and turn on the "Always-on VPN" and "Block connections without VPN" settings.
  - **Private DNS**
    - If you use a private DNS such as Cloudflare, AdGuard, Cloud9, NextDNS, or some other provider, enter the hostname after tapping the "Private DNS provider hostname" radio button. Otherwise, tap on the Off radio button and confirm by tapping Save.
  - Some ROMs remove this option, however, there's a toggle for checking the Internet connection by calling Google IPs (connectivitycheck.gstatic.com). Disable this (you can always block the domain via DNS).

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_NetworkPrefs.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_NetworkPrefs.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifi.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifi.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifi_Privacy.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifi_Privacy.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_carrier.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_carrier.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_hotspottethering.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_hotspottethering.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifihotspot.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Wifihotspot.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN_provider.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN_provider.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **Connected devices**
  - **USB** (*option is visible when connected to a USB cable, such as when using a charger*)
    - Use USB for... set it to "No data transfer", only change this when you need to.
  - set Bluetooth timeout to 1 minute
  - **Connection preferences**
    - **Printing**
      - Turn off the default print spooler service.
    - Don't link your device to a Chromebook
    - Don't use Quick Share

- **Apps**
  - **Default apps**
    - Caller ID & spam app > None
    - Digital assistant app > Google or None (or other app, if you want a digital assistant app)
    - Home app > usually the system-provided home launcher or third-party launchers
    - Phone app > usually the system Phone app or Google Phone, I heavily recommend you do not use other phone apps
    - SMS app > usually the system Messages app or Google Messages, or an open-source app like QUIK (fork of QKSMS). I heavily recommend you do not use other SMS apps, especially not if they're not open-source.
    - Wallet app > None (don't use Google Wallet) or your bank's app if it allows NFC payments
    - Opening links > disable Instant apps. For the list of installed apps, just disallow automatically opening links on a per-app basis with few exceptions. Exceptions include Google Play, Aurora Store, Droid-ify (or other F-Droid clients), music apps, NewPipe.
  - **Cloned Apps**
    - Clone apps if you need multiple accounts and the app doesn't allow you to manage multiple accounts.
  - **Assistant**
    - Settings for the Assistant app are available if logged in a Google account on the Google app
  - **Cloud media app**
    - If using Google Photos, tap the cogwheel and tap Allow access to Google Photos, and select the Google account, if you want to be able to select apps that are in the cloud but not on the device, if you'd like to use the photo picker for cloud photos and albums.
  - **App battery usage**
    - Restrict most apps here. This would generally improve the battery life of the device. A list of system and user apps that should or shouldn't be restricted from running in the background:
      - Aegis (Disable 'Allow background usage', since Aegis closes when entering the Recents pane anyway)
      - Android System Intelligence (Allow, Optimized / Disable if you don't use ASI features)
      - Android System WebView (Allow, Optimized)
      - antivirus apps and scanners such as Bitdefender Antivirus Free, Hypatia, Kaspersky, Malwarebytes (Allow, Unrestricted for real-time scanning of newly installed apps)
      - App Manager (Allow, Optimized)
      - Aurora Store (Disallow, only download and update apps when using the app)
      - password managers such as Bitwarden (Allow, Unrestricted)
      - calendar apps such as Google Calendar, Etar (Allow, Unrestricted)
      - camera apps (Disallow)
      - browsers such as Chrome, Firefox (Allow, Unrestricted)
      - alarms and time apps such as Google Clock (Allow, Optimized)
      - the home launcher of your choice (e.g. crDroid Home, Lawnchair, Launcher3, Nova Launcher) (Allow, Optimized)
      - backup and restore apps such as DataBackup (Allow, Optimized)
      - Digital Wellbeing (Allow, Optimized)
      - system file manager (Files) and file manager apps you use most commonly (Allow, Optimized)
      - keyboard apps such as Gboard, Samsung Keyboard (Allow, Unrestricted)
      - Google (Disable)
      - Google Play services (Enable, Unrestricted is set by the system, can't be changed if Google Play services is a system app)
      - Google Play Store (Disable)
      - music apps such as InnerTune, YouTube Music, Spotify (Allow, Unrestricted)
      - games (Disable)
      - KernelSU and other root manager apps (Allow, Optimized)
      - social media and communication apps including Moshidon, WhatsApp Business, Facebook Messenger, Facebook (Disable)
      - NewPipe (Allow, Unrestricted if you want background playback / Disable otherwise)
      - VPN and DNS apps (Allow, Unrestricted)
      - shopping apps such as Amazon, Nordstrom, eBay, Steam (Disallow)
      - Google Photos (Disable unless you need background photo upload & sync)
      - weather apps (Disable unless you need weather notifications)
      - recorder apps such as Google Recorder, Samsung Recorder (Allow, Unrestricted)
      - Shizuku (Allow, Optimized)
  - **Special app access** (**do not** *disable permissions for system apps here!*)
    - **All files access**
      - Be careful with this permission. Allow very specific apps, such as the file manager of your choice (e.g ZArchiver) and the system Camera app, if it requests this permission. Disallow apps such as Aurora Store and App Manager after setting them up, since if you use Shizuku (or root), the apps won't use the Android All files access permission.
    - **Device admin apps**
      - Disable all. If using Shelter, toggle it on for both the work and base user profile. Disable Find My Device if you don't have a Google account or you don't use the feature.
    - **Display over other apps**
      - Disallow all except for Phone, Google, and apps such as Shazam.
    - **Do Not Disturb access**
      - Allow the Digital Wellbeing and Phone app, and Google Play services. System UI and Shell already have this setting toggled on and can't / shouldn't be changed. Disallow Google Services Framework and Google.
    - **Media management apps**
      - Only allow apps that should be able to modify or delete media files created with other apps without asking you. Generally, you should enable this for the Music app(s) of your choice, Google Photos and other similar apps.
    - **Modify system settings**
      - Disallow everything except for Google Play services, then go one by one and enable only for apps that actually require changing system settings, such as the Camera app, the Phone app, the Google Photos app, ProShot.
    - **Notification read, reply & control**
      - Disallow everything. This would also reduce the background app usage for stuff like Android System Intelligence, Google Play services, Google, and the home launcher app you're using.
    - **Change media output**
      - There shouldn't be any apps that would request this permission yet. If there are, filter out the apps that seem suspicious.
    - **Picture-in-picture**
      - You should disallow all apps except for something like the browser(s) of your choice. Disallow this, even for Google Play services.
    - **Premium SMS**
      - There shouldn't be any apps that would request this permission. If there are, disallow them all.
    - **Unrestricted mobile data**
      - This allows apps to run in the background and use mobile data without restrictions when using the Data Saver mode. It's the same list that you've accessed before in SIMs > SIM provider name > Data Saver
    - **Install unknown apps**
      - Heavily filter what apps you should allow to install apps. Disallow most apps, the ones that should have this permission are Aurora Store, Chrome (or your browser(s) of choice), Droid-ify, the native Files app, and perhaps another file manager such as ZArchiver.
    - **Alarms & reminders**
      - Disallow all apps that you don't want to set and schedule alarms and reminders. Allow apps such as Digital Wellbeing.
    - **Usage access**
      - Disallow all apps that you don't want to be able to access this data. Generally, you should allow apps such as Android System Intelligence, App Manager, Digital Wellbeing and the Google Play services
    - **VR helper services**
      - Disallow all apps that don't need VR. Apps that may need this are Google Cardboard and other VR games and apps.
    - **Wi-Fi control**
      - Disallow all apps. You can allow certain apps such as Camera or apps that should be able to automatically turn on Wi-Fi.
    - **Screen turn-on control**
      - Disallow all apps, this should mainly be Google Play services by default
    - **Full-screen notifications**
      - Disallow this permission for every app except for your Clock app, Phone and Google Play services.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Apps_Defaultapps.webp" alt="A screenshot of the Settings app, on its 'Default apps' page" title="A screenshot of the Settings app, on its 'Default apps' page">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Apps_Defaultapps.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **Notifications**
  - App notifications > Allow notifications from apps that *should* be able to send you notifications, such as the browser(s) of your choice, any social media apps you haven't restricted the background battery usage permission, antivirus apps, backup apps, music apps, NewPipe, file managers, VPN and DNS apps, weather apps and so on
  - Notification history > Enable (unless your specific use case requires turning off this feature)
  - Conversations, Bubbles > Allow apps to show bubbles
  - Notification read, reply & control is the same list as the Apps > Special app access > Notification read, reply & control list
  - Notifications on lock screen > Hide silent conversations and notifications OR Don't show any notifications, depending on your use case
  - disable Sensitive notifications which hides the sensitive content on the lock screen or the lock screen notification panel
  - enable Notification cooldown
  - **Do Not Disturb**
    - Allow specific people, apps to interrupt based on your preferences
    - Alarms & other interruptions > enable Alarms, Media sounds, disable Touch sounds, and enable or disable Reminders and Calendar events according to your preferences
    - Set the default schedule, which is Sleeping
    - Set the Duration for Quick Settings to Ask every time
    - Set Display options for filtered notifications to No sound from notifications
  - turn off Flash notifications
  - Allow wireless emergency alerts, disable Test alerts. Disable wireless emergency alerts if your use case requires turning off this feature. Turn off Vibration unless you need it.
  - Disable "Hide silent notifications in status bar"
  - Enable "Allow notification snoozing"
  - Disable "Notification dot on app icon" unless you specifically need it
  - Disable "Enhanced notifications" (formerly known as Android Adaptive Notifications) unless you need suggested actions, replies and other conversation features in app notifications.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Notifications.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Notifications.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **Display**
  - **Lock screen**
    - Privacy > Show sensitive content only when unlocked, or Don't show notifications at all
    - Enable Show widgets on lock screen (a feature that will be expanded to mobile, hopefully)
    - Disable Add users from lock screen
    - Disable Use device controls
    - Shortcuts > Camera, Flashlight or some other shortcuts from the list (or disable them altogether)
    - Disable Always show time and info
    - Disable Lift to check phone
    - Disable Wake screen for notifications
  - Screen timeout > Disable screen attention
  - Dark theme > use a custom schedule that you adjust it monthly, don't use Turns on from sunset to sunrise (which uses Location)
  - Night light > Turns on at custom time
  - Screen saver > Off
  - Disable Tap to wake
  - Disable Tap to sleep
  - Disable Wake on plug

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Display_Lockscreen.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Display_Lockscreen.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **Security & privacy**
  - **Device unlock**
    - Screen lock > use Password, not PIN, None, Swipe or Pattern
    - Screen lock
      - Lock after screen timeout > Immediately after timeout
      - Enable Power button instantly locks
    - do not use biometrics such as Fingerprint or Face unlock
  - **Privacy controls**
    - **Permission manager**
      - **Body sensors**
        - allow only healthcare and fitness apps such as Samsung Health
      - **Calendar**
        - only allow the calendar, clock and *DAV (e.g. DAVx5)
        - disable Google, Google Photos
      - **Call logs**
        - Allow for Android System Intelligence, Google Messages, Google Phone (or system messaging, phone app)
        - Disable Google, WhatsApp Business
      - **Camera**
        - Don't allow any apps to use the camera all the time
        - Allow apps such as 2FA and password managers apps to use the camera when the app is open. The apps use the camera to be able to scan 2FA QR codes
        - Allow Android System Intelligence
        - Allow Camera apps
        - Allow the browser(s) of your choice
        - Don't allow any apps that you don't use regularly to use the camera at all, or apps that *don't make sense* to even ask for the Camera permission
      - **Contacts**
        - Allow the contacts app that you use, *DAV apps, the Phone app and optionally calendar apps
        - Deny Google, Google Play Store, Chrome, Maps, Google Photos this permission.
      - **Files**
        - Allow a few apps this permission. It's a weird permission that isn't the same as the 'All files access' permission.
      - **Health Connect**
        - Allow apps to read and write health-related permissions through the Google Health Connect app
      - **Location**
        - Deny the Google app, and most apps from being allowed to use the location permission all the time
        - Allow very, very few apps from being allowed to access your location when the app is in use, such as Organic Maps, Google Maps, the calendar app and Camera apps if you want to save location information
      - **Microphone**
        - Deny apps such as Google, Google Play Store, Maps, Steam, Google Translate, Gboard
        - Allow apps such as camera apps to use it while in use, and browsers.
        - Most apps should never allow you to use the microphone all the time, not even the system Phone or Messages apps
      - **Music and audio**, **Photos and videos**
        - Allow these permissions at your discretion. The permissions allow you to grant access to specific photos and videos in some scenarios.
      - **Nearby devices**
        - Deny most apps this permission. Apps that may require it for certain features (e.g. external microphones) include the system Camera app or Google Recorder
      - **Notifications**
        - Permit only the apps you need to send notifications. Tapping on the app name (not the toggle) permits you to toggle specific notification types / groups in some cases. Not all apps implement this granular feature.
      - **Phone**
        - Permit only apps such as the contacts, messages and phone apps this feature.
        - Disable Google, Android System Intelligence
        - WhatsApp and WhatsApp Business may need this in order to initiate voice or video calls
      - **SMS**
        - Deny Google, Google Play Store
      - **Additional permissions**
        - **Car information**
          - Few apps built for Android Auto can use this permission
        - **Shizuku**
          - Grant Shizuku access sparingly. Use Shizuku instead of root for Aurora Store, f-droid apps such as Droid-ify, SAI, ZArchiver unless you specifically need to access root-only features in these apps
    - enable Health Connect
    - disable Camera, Microphone access by default. You can toggle them back on using quick settings toggles
    - Enable Show clipboard access
    - Disable Show passwords
    - Location access > Disable use assisted GPS, disable Use Location by default
  - **Private Space**
    - private space is just like Shelter, but it's not a work profile. It's a third type of profile. Apps from the private space stop running when the private space is closed. Sharing files between the private space and regular user profile is much harder compared to Shelter. Set up private space to auto-lock when you lock the screen. Not all custom ROMs may play nice with Private Space.
  - More security & privacy
    - Trust (if using LineageOS, crDroid or other LineageOS-based ROM)
      - Ensure SELinux is enforcing
      - Ensure Android security patches for Platform and Vendor are up to date
      - Ensure Encryption is enabled
      - Set Restrict USB to Allow USB connections when unlocked, or Deny USB connections altogether
      - crDroid statistics > disable Stats collection
      - SMS messages limit > Always confirm
      - Enable security alerts for SELinux status and Build signature
    - Show media on lock screen > up to you if you want to disable or enable it
    - Enable Allow camera software extensions
    - Enable Personalize using app data
    - Clipboard auto-clear > Enable, set timeout to 5 minutes
    - Android System Intelligence > disable Customize the experience using your Google Account data, enable Keyboard Suggestions and smart replies, they're all running on the device.
    - Autofill service from Google > disable
    - Usage & diagnostics > Disable
    - Disable Android Safe Browsing, live threat protection
    - Theft protection > up to you
    - SIM lock > enable Lock SIM
    - Trust agents > Disable all unless you use any of them
    - App pinning > Enable, enable Ask for password before unpinning

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Securityprivacy_Trust.webp" alt="A screenshot of the Settings app, on the 'Trust' page" title="A screenshot of the Settings app, on the 'Trust' page">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Securityprivacy_Trust.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **Location**
  - disable Use location, disable Use assisted GPS

- **Passwords, passkeys & ccounts**
  - Preferred service > Change to the password manager of your choice, such as Bitwarden
  - Disable additional services > Google (Google Password Manager, Google Pay, Google Wallet)
  - Enable automatically sync app data (unless your use case requires turning off this feature)

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_passwords.webp" alt="A screenshot of the Settings app, on the 'Passwords, passkeys & accounts' page" title="A screenshot of the Settings app, on the 'Passwords, passkeys & accounts' page">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_passwords.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

- **System**
  - **Gestures**
    - Quickly open camera > Off (unless you need the feature)
    - Navigation > disable Hold Home for Assistant (Button navigation), Swipe to invoke assistant (Gesture navigation)
    - Disable Lift to check phone
    - Press & hold power button > Power menu
    - Double tap to check phone > Disable
  - **Users**
    - Enable Delete guest activity
    - Disable Allow guest to make phone calls
    - Disable Add users from lock screen
  - **Developer options**
    - *Developer options can be enabled by navigating to About phone > tapping the "Build number" option seven times (You will be prompted to enter your screen lock password if you have a screen lock method)*
    - Memory > Disable "Enable memory usage profiling"
    - Disable "Stay awake"
    - Disable "Automatic system updates"
    - don't enable System UI demo mode
    - Enable Quick settings developer tiles for Sensors Off, Wireless debugging and Show taps
    - Disable "USB debugging" when not in use, regularly tap on "Revoke USB debugging authorizations"
    - Disable "Wireless debugging", do not enable "Rooted debugging" unless you really need it
    - Do not enable "Disable adb authorization timeout"
    - Leave enabled the "Verify bytecode of debuggable apps" option
    - in Feature flags, enable "settings_contextual_home"
    - Leave disabled the "Allow screen overlays on Settings" option
    - Enable "Force peak refresh rate" if you have an AMOLED display and a 90Hz display, the battery hit is not noticeable at least on my Redmi Note 11
    - Enable "Wireless display certification"
    - Enable "Enable Wi-Fi Verbose Logging"
    - Enable "Wi-Fi scan throttling"
    - Enable "Wi-Fi non-persistent MAC randomization" unless you need a static MAC address for whatever reason
    - Enable "Tethering hardware acceleration"
    - In Default USB configuration > select No data transfer
    - Enable "Always show crash dialog"
    - Enable "Show background ANRs"
    - Enable "Show notification channel warnings"

### Setting up a VPN

In this section, we're going to set up a specific VPN app, [OpenVPN for personalDNSfilter](https://www.zenz-solutions.de/openvpn-for-personaldnsfilter/). It allows you to connect to a VPN that supports OpenVPN profiles. For my use case, I use ProtonVPN, which allows exporting OpenVPN configurations, while also allowing you to run via root a DNS app ([personalDNSfilter](https://www.zenz-solutions.de/personaldnsfilter-wp/)) which acts as a local DNS server through which all connections pass through, and get filtered (blocked / allowed) based on multiple filterlists, including [my own](https://github.com/alextecplayz/filterlist) through StreamCapture, which redirects the DNS traffic to the DNS app.

#### Downloading and installing the app

So, first we install the app. OpenVPN for personalDNSfilter only has [GitHub Releases](https://github.com/IngoZenz/ics-openvpn/releases/tag/0.0.3) from where the APK can be retrieved. It's unfortunately not on Google Play or F-Droid. I also recommend opening the Settings app, navigating to the app's page and allowing it Unrestricted mobile data usage and unrestricted battery usage, so Android doesn't kill the app.

#### Downloading the OpenVPN profiles from the VPN provider

For Proton VPN, we can download configuration files from the [Proton VPN > OpenVPN / IKEv2 page](https://account.proton.me/u/0/vpn/OpenVpnIKEv2). At this stage, we can also retrieve (and reset, when needed) the credentials that will be used to connect to the VPN from the app - the username and password. Save these somewhere, you'll need them in a moment. Downloading OpenVPN configurations is simple and straight-forward:

1. We select the platform - Android
2. We select the protocol - UDP
3. We download the configuration file(s) directly. They will be saved using the .ovpn file format

#### Importing the profiles

Open the newly-installed OpenVPN for pDNSf app, and tap on the 'Add Profile' (plus in a circle) icon, and tap on Import. Navigate to the .ovpn file(s) you have downloaded on your phone, and select one of them. It will be saved using the profile name that matches the filename / `'region'-'free/paid'-'serverID'.protonvpn.net.udp` format. Import any and all profiles that you have downloaded, they're all saved when you close the editor (not the app).

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Home.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Home.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Configuring the profiles

In the 'Basic' tab:
- set Type to Username/Password, if not set already
- set Behaviour on AUTH_FAILED to Ignore, retry to save your password
- add the username and password in their corresponding fields

In the 'IP and DNS' tab, in the DNS section:
- tick Override DNS Settings by Server
- set searchDomain to blinkt.de
- set DNS Server and Backup DNS Server to 10.10.10.10, the address that will be used by personalDNSfilter to receive the redirected DNS traffic

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Editing.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Editing.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

In the 'Allowed apps' tab, you can enable 'VPN is used for all apps but exclude selected' and you can check any apps that should bypass the VPN, if needed.

Don't forget in the app settings to choose a default VPN profile, if you'd want the app to automatically connect to a specific profile.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Sett.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/OVPN_Sett.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

If that's done, you can now use OpenVPN for personalDNSfilter. Let's set personalDNSfilter as well.

### Setting up a DNS (requires root)

Right, we've set up OpenVPN for pDNSf, which is one piece of the puzzle. That will use the Android VPN system to work as a VPN app, and does not require root. personalDNSfilter running without a local VPN does require root, however. And it's going to receive the redirected traffic from the VPN, which allows us to both monitor what traffic comes in (via the app list interface), and allow us to filter it (blacklisting, whitelisting domains and IPs) using filter lists.

#### Downloading and installing the app

Unlike OpenVPN for pDNSf, personalDNSfilter is available on [GitHub](https://github.com/IngoZenz/personaldnsfilter), [Google Play](https://play.google.com/store/apps/details?id=dnsfilter.android) and [F-Droid](https://f-droid.org/en/packages/dnsfilter.android/). Installation is straightforward, just like any other Android app. And just like before, to avoid Android killing the app randomly, navigate to the app's page in the Settings app, and allow it unrestricted background usage and unrestricted mobile data usage.

#### Configuring personalDNSfilter

Depending on the root solution you have installed, you have to grant the app root access differently. If you have KernelSU, you need to install the KernelSU app (the KernelSU manager) and grant personalDNSfilter Superuser using the Default app profile. If you have Magisk, you can grant the app root access via the Magisk manager, or when the app requests root.

When you first open the app, tap on 'Advanced settings', and toggle on (enable) the following:
- CNAME cloaking protection (aggressive)
- DNS proxy mode without local VPN
- Allow only local DNS proxy requests
- Root mode without local VPN (which should request root)
- Prevent device sleep

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_advsett.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_advsett.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

Tap Advanced settings again to close the menu, and make sure 'Enable blocking' and 'Autostart' are enabled.

Then, at the top where you see DNS: [IP]::PORT::DOH {pencil icon}, tap on that and uncheck both UDP entries, otherwise personalDNSfilter will complain about it when in root mode. Tap on the checkmark to confirm.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_DNS.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_DNS.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Starting OpenVPN for pDNSf and personalDNSfilter

At this stage, you're pretty much configured and ready to go. Open the OpenVPN for pDNSf app, tap on one of the profiles (make sure the username and password are entered and valid), the app will request Android to become a VPN provider. Tap 'OK'. Then, you can navigate to the Android Settings app > Network & internet > VPN > tap on the cogwheel next to OpenVPN for pDNSf > enable Always-on VPN and Block connections without VPN. You can now enjoy network filtering and tunneling!

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN_provider.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_VPN_provider.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

NOTE: When running in root mode (and not as an Android VPN provider), personalDNSfilter will not have an app whitelist / blacklist.

#### Additional (optional) configuration

##### Configuring filters

personalDNSfilter app > Advanced settings > Configure filter update, where you can set the filter update interval in days (by default set to 7), and you can activate / deactivate filter lists.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_filters.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_filters.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

You can also add custom filter lists. Here's how to add mine, for example:

Where you see the `<new> <new> {pencil icon}` field at the bottom, tap on the pencil icon to 'Edit' the filter (which will create a new entry for it). In Category and Name, use whatever you'd like. In the URL, set the URL to `https://raw.githubusercontent.com/alextecplayz/filterlist/main/hosts-portmaster`. Check the Active box, and tap on the check mark (✓) button to save. Tap on Advanced settings to close the menu, and tap on 'RELOAD FILTER', which will re-download and build the 'master' filter index used by the app.

##### Configuring additional hosts (blacklists, whitelists, custom IP mappings)

NOTE: This isn't supposed to fit big lists. This option is supposed to work as overruling filterlists or specific rules. Please don't shove thousands of entries here, it's not what it's for. The app performs wonderfully with ~200 entries (~100 blacklist, ~100 whitelist) on my 4GB RAM Redmi Note 11 and before that, with ~150 entries total on the 2GB RAM Galaxy A10. OpenVPN for pDNSf will use roughly 20MB of RAM, and personalDNSfilter roughly 67MB of RAM.

The formatting is as follows:
- 1 host name per line per entry for blacklist, whitelist or IP forwarding
- the `*` wildcard character can be used for host blocking, subdomains, domains and domain extensions
- for whitelisting, use the `!` as a prefix

Examples:
```
blacklist.this.domain - gets blacklisted
!whitelist.me.please - gets whitelisted
>forwarded.ip 192.168.100.1
```

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_blacklist.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_blacklist.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_whitelist.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_whitelist.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

Also note that personalDNSfilter allows you to filter domains from the initial list interface. When you see a domain that's blacklisted, it's going to use the color red. You can long-tap on it to whitelist it using the Remove filter option, which adds it to an automatic entries section in the additional hosts list. When you see a domain that's whitelisted / allowed, it's going to use the color green and a check mark. You can long-tap on it to blacklist it using the Add filter option.

##### Additional features

The app also has a Backup and restore option (but I don't use this, I just use the DataBackup app to back up the app and its files outright, which means a seamless restore experience).

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_backup.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_backup.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

And there's the 'Edit configuration file' page, which is more or less the same stuff that you can already configure visually using toggles and such, but in text format. I'm not going to dive into that, there's not really a need if you've already performed everything in this section.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_configfile.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/pDNSf_configfile.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

### Setting up and using App Manager for additional tracker blocking and debloating

Download and install [App Manager](https://f-droid.org/en/packages/io.github.muntashirakon.AppManager/) from F-Droid. Grant it access using your root manager. We'll disable some functionality. Tap the three dots in the top right corner, and tap Settings. Go to Appearance, "Enable/disable features", and deselect Interceptor, Package Installer, Use the Internet and tap Close. Make sure in Settings > Mode of operation is set to Root.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/AppMgr_features.webp" alt="A screenshot of the App Manager app, on its 'Appearance' page, with the 'Enable/disable features' pop-up listing all the features that can be modified" title="A screenshot of the App Manager app, on its 'Appearance' page, with the 'Enable/disable features' pop-up listing all the features that can be modified">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/AppMgr_features.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

Using App Manager, we'll debloat the system and block trackers in the apps themselves, thanks to the root mode.

#### Debloating

Look in the table below, and search for the package name or app name in order to find these apps. When you find the app, tap on it, and tap Freeze or Uninstall, based on my recommendation. Do NOT randomly uninstall apps instead of disabling them from the list below, as some of these might soft-lock your custom ROM, which would result in a bootloop.

<div class="overflow-scroll">
<table>
  <thead>
    <tr>
      <th>App Name</th>
      <th>Package Name</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ad Privacy</td>
      <td>com.android.adserrvices.api</td>
      <td>Ad privacy settings in Google account</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Android Auto</td>
      <td>com.google.android.projection.gearhead</td>
      <td>Android Auto stub / pre-installed app</td>
      <td>Uninstall</td>
    </tr>
    <tr>
      <td>Android Switch</td>
      <td>com.google.android.apps.restore</td>
      <td>Data transfer apps between Android devices</td>
      <td>Uninstall</td>
    </tr>
    <tr>
      <td>BCR</td>
      <td>com.chiller3.bcr</td>
      <td>Basic Call Recorder app</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>Calculator</td>
      <td>com.android.calculator2</td>
      <td>Google Calculator</td>
      <td>Uninstall</td>
    </tr>
    <tr>
      <td>Calendar</td>
      <td>org.lineageos.etar</td>
      <td>Disable if you’re installing a different Calendar app</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Default Print Service</td>
      <td>com.android.bips</td>
      <td>Disable if you’re not printing</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Device Health Services</td>
      <td>com.google.android.apps.turbo</td>
      <td>“Predicts how long your battery will last based on your usage”</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Dynamic System Updates</td>
      <td>com.android.dynsystem</td>
      <td>You most likely don’t need the DSU capabilities</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Face Unlock</td>
      <td>co.aospa.sense</td>
      <td>Paranoid Android face unlock app</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>FM Radio</td>
      <td>com.caf.fmradio</td>
      <td>Just an FM radio, requires headphones to be plugged in</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Gallery</td>
      <td>com.android.gallery3d</td>
      <td>Disable or uninstall if using Google Photos or other gallery app</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>Game Space</td>
      <td>io.chaldeaprjkt.gamespace</td>
      <td>chaldeaprjkt’s Game Space <a href="https://github.com/chaldeaprjkt/packages_apps_GameSpace">alternative</a> to the proprietary Game Dashboard from Google</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>io.chaldeaprjkt.gamespace.auto _generated_rro_product__</td>
      <td>io.chaldeaprjkt.gamespace.auto_generated_rro_product__</td>
      <td>Just an auto-generated overlay to be used with Game Space</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Gmail</td>
      <td>com.google.android.gm</td>
      <td>Uninstall if you don’t need it</td>
      <td>Uninstall</td>
    </tr>
    <tr>
      <td>Google Assistant</td>
      <td>com.android.hotwordenrollment.xgoogle</td>
      <td>Disable or uninstall</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>Google Assistant</td>
      <td>com.android.hotwordenrollment.okgoogle</td>
      <td>Disable or uninstall</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>Google Location History</td>
      <td>com.google.android.gms.location.history</td>
      <td>Disable or uninstall</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>Google One Time Init</td>
      <td>com.google.android.onetimeinitializer</td>
      <td>Handles the first-time setup wizard when you turn on your phone</td>
      <td>Freeze (Disable) after completing setup</td>
    </tr>
    <tr>
      <td>Google Partner Setup</td>
      <td>com.google.android.partnersetup</td>
      <td>Its purpose is completely unknown</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Markup</td>
      <td>com.google.android.markup</td>
      <td>Built-in screenshot cropper. Had a <a href="https://en.wikipedia.org/wiki/ACropalypse">vulnerability</a> that could reveal the original (non-cropped) image.</td>
      <td>Uninstall</td>
    </tr>
    <tr>
      <td>MatLog</td>
      <td>org.omnirom.logcat</td>
      <td>Logcat viewer</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Music</td>
      <td>org.lineageos.twelve</td>
      <td>LineageOS 22 music player, disable if unused</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>OmniJaws</td>
      <td>org.omnirom.omnijaws</td>
      <td>Weather widget</td>
      <td>Freeze (Disable) or Uninstall</td>
    </tr>
    <tr>
      <td>OmniStyle</td>
      <td>org.omnirom.omnistyle</td>
      <td>crDroid app that lets you use pre-installed images at the top of the extended QS panel</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>PDF Viewer</td>
      <td>org.lineageos.camelot</td>
      <td>LineageOS 22 PDF Viewer, disable if unused</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Seedvault</td>
      <td>com.stevesoltys.seedvault</td>
      <td>Backup app for local contacts and files</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Speech Recognition and Synthesis from Google</td>
      <td>com.google.android.tts</td>
      <td>Disable if you don’t use the text-to-speech (TTS) features</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Tags</td>
      <td>com.google.android.tag</td>
      <td>Google Tag Manager, does anyone even use this for sites and apps anymore?</td>
      <td>Freeze (Disable)</td>
    </tr>
    <tr>
      <td>Terminal</td>
      <td>com.android.virtualization.terminal</td>
      <td>Cannot be used if your device does not support the Android Virtualization Framework. You’re much better off using Termux instead</td>
      <td>Freeze (Disable)</td>
    </tr>
  </tbody>
</table>
</div>

#### Disabling trackers in apps

App Manager can disable activities, services, receivers and providers of any installed app. It just so happens that trackers that are added to apps, such as Firebase, Google's App Measurement Service, the Google Play Proxy Billing Activity, Google Ads, Amazon Billing, and loads more trackers and ads can be disabled this way.

When you notice an app that has trackers discovered by App Manager, the package name will be brown. Tap on the app in the list, and the first 'chip' / button you'll see under the app version is '{num} trackers' in orange. Tap on this, make sure all trackers are selected, and then tap on Block. The button will turn cyan after App Manager successfully blocks the trackers.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/AppMgr_blocktrackers.webp" alt="A screenshot of the App Manager app, on the page of an app (Bitdefender Antivirus Free), and a pop-up listing all the trackers to block" title="A screenshot of the App Manager app, on the page of an app (Bitdefender Antivirus Free), and a pop-up listing all the trackers to block">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/AppMgr_blocktrackers.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

### Minimizing your footprint in privacy-invasive apps

#### WhatsApp, WhatsApp Business

- In the device settings, on the app page for either of the two apps, do the following:
  - Turn off notifications (if you want)
  - Disallow all permissions, then allow the following permissions only:
    - Camera (for video calls, camera feature when sending someone an attachment)
    - Contacts (in order to message your contacts, WhatsApp will hide that contact's Last Seen if Contacts is disallowed, and will display the direct phone numbers with prefixes instead)
    - Microphone (for video and audio calls, microphone recording feature when sending someone an attachment)
    - Music and audio (to send audio files as attachments)
    - Phone (in order to initiate or pick up video or audio calls)
    - Photos and videos (to send media files as attachmens)
    - Call logs is unnecessary. Location can be used if you need to share your location. Nearby devices may be used by some niche feature.
  - Disable background data usage (if you want)
  - Disallow background usage (if you want)
  - Disallow Picture-in-picture, Install unknown apps and Alarms & reminders
- In the app itself:
  - three dots in the top right corner > Settings
    - **Account**
      - Security notifications > enable "Show security notifications on this device"
      - Passkeys > Create passkeys
      - Don't add an email address
      - Enable two-step verification, create a 6-digit PIN
    - **Privacy**
      - Last seen and online
        - Who can see my last seen > My contacts except... (choose contacts that should not be able to see your Last seen) or Never; Who can see when I'm online > Same as last seen
      - Profile photo
        - My contacts except... or Never
      - About
        - My contacts except... or Never
      - Disable Read receipts if you don't need them
      - Default message timer > Off, 7 days or 24 hours based on your preference
      - Groups
        - My contacts except... (choose contacts that should not be able to add you to groups)
      - Live location > don't grant Location permission = You aren't sharing live location in any chats
      - Calls > Silence unkown callers
      - Blocked contacts > block contacts or phone numbers
      - App lock > Enable "Unlock with biometric", set it to automatically lock immediately, and disable "Show content in notifications" if you've added biometric authentication. You can then remove your fingerprint, and the app will require you use your lock screen password instead, as a fallback.
      - Advanced > Do not enable "Block unknown account messages" or "Protect IP address in calls", but enable "Disable link previews"
    - **Chats**
      - Enable keep chats archived
      - Allow chat backup, if you do not select a Google account, it will perform a local chat backup instead. Enable end-to-end encryption for the chat backup, it's up to you to select either a password or a 64-digit encryption key. Ignore the 'Add a Google account' pop-up after creating it, because it will perform a local E2EE backup instead.
    - **Storage and data**
      - Enable "Use less data for calls"
      - Set up a proxy if needed
      - Set "Media upload quality" to HD quality
      - Set all three media auto-download settings (When using mobile data, When connected on Wi-Fi, When roaming) to No media by unchecking all four attachment types (Photos, Audio, Videos, Documents) and tapping OK.
  - lock sensitive chats, which will require biometrics (and the lock screen password as fallback, if biometrics are disabled after enabling "Unlock with biometric").
  - you can link up to four devices using the Linked device feature

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_2FA.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_2FA.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Passkeys.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Passkeys.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_SecurityNotifs.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_SecurityNotifs.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Privacy.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Privacy.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Storage.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Storage.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Backup.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_Backup.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_E2EBackup.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/WA_E2EBackup.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Google Photos
- Photos settings
  - Privacy
    - Location options > disable "Estimate missing locations"
    - Disable "Face Groups" and "Show pets with people"

#### Google Phone
- Settings
  - Caller ID & spam > disable "Filter spam calls" and "See caller and spam ID"
  - Assisted dialing > turn it off (unknown how Google determines home country)
  - Caller ID announcement > Announce caller ID > Never
  - Flip To Silence > disable "Flip To Silence"

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Phone.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Phone.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Google Messages
 - Don't sign in to a Google account, or if signed in, tap on the account picture in the top right corner, expand the accounts list and select "Use without an account", and then tap "Sign out" on the next screen.
 - Messages settings
   - RCS chats > Disable "Turn on RCS chats"
   - Automatic previews > Disable "Only download data on Wi-Fi", "Show only web link previews" and "Show all previews", so that Google doesn't perform any server-side scanning about the previews, using information from your chat history
   - Spam protection > Toggle off "Enable spam protection", so that Messages doesn't send any data to Google about your messages or spam callers
   - Help improve Messages > Toggle off "Improve Messages"

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_RCS.webp" alt="The Google Messages app, on its 'RCS chats' page, with multiple options disabled" title="The Google Messages app, on its 'RCS chats' page, with multiple options disabled">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_RCS.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_previews.webp" alt="The Google Messages app, on its 'Automatic previews' page with all options disabled" title="The Google Messages app, on its 'Automatic previews' page with all options disabled">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_previews.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_spam.webp" alt="The Google Messages app, on its 'Spam protection' page" title="The Google Messages app, on its 'Spam protection' page">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_spam.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>
<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_improve.webp" alt="The Google Messages app, on its 'Help improve Messages' page" title="The Google Messages app, on its 'Help improve Messages' page">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Messages_improve.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Gboard
- Privacy
  - Disable "Share usage statistics"
  - Disable "Improve for everyone"
  - Select any and all of the languages you wish to use with Gboard, Gboard will download language dictionaries to be used with the auto-correct, suggestion, spell check and glide typing
  - After that, you can navigate to the app settings in the system's Settings app, and disable network access entirely (crDroid, GrapheneOS).

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Gboard.webp" alt="A screenshot of the Gboard app, on its 'Privacy' page, displaying the options from the list in this section" title="A screenshot of the Gboard app, on its 'Privacy' page, displaying the options from the list in this section">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Gboard.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Google Recorder
- Don't log in with a Google account, or "Use the app without an account" from the account picker
- Recorder settings > disable Backup & sync

#### Google Maps
- Turn on incognito mode if possible
- Settings
  - Disable "Wi-Fi only"
  - Video settings > Autoplay off
  - Offline maps settings > Disable "Auto-update offline maps", "Auto-download recommended maps"
  - Personal content
    - Disable "Timeline emails", "Google Photos"
    - Enable "Restricted profile"
    - Follow the Google account footprint minimization section below to disable certain features, the changes will be reflected here if Maps displays on the Personal content page "Web & App Activity is off" and "Location is off"

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Maps.webp" alt="A screenshot of the Google Maps app, on its 'Personal content' page, displaying the options from the list in this section" title="A screenshot of the Google Maps app, on its 'Personal content' page, displaying the options from the list in this section">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Maps.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

#### Play Store
- Play Protect > cogwheel in the top right corner of the page, disable "Improve harmful app detection" and "Scan apps with Play Protect"

### Minimizing your Google Account footprint

#### Changing your online settings on the Google Account web page

Visit the [Google Account](https://accounts.google.com) page to begin. Select the account you want to use for this. This assumes you're using a desktop browser to perform the changes.

Back up any information you'd like before proceeding. You can download the My Activity data by navigating to "Data & privacy" in the sidebar, click "My activity" and from the sidebar select "Other activity". You'll find these on the page:
- Download your data from My Activity > "Download your data"
- Data shared for research > "Download your data"
Under the "Data from apps and services you use" section on the "Data & privacy" page of Google Account, select "Download your data"

From the sidebar, select "Personal Info".

In the "Basic Info" section:
- Click on the Profile picture, tap on "Visible to everyone" to change the setting, and choose "People you interact with". Click "Save"
- Click on Birthday, uncheck "Highlight birthday" and then select "Only you" under "Choose who can see your birthday". Click "Save"
- Click on Gender, and select "Only you" under "Choose who can see your gender"

In the "Contact Info" section:
- Tap on "Emails from Google" and de-select everything:
  - Under the Maps section:
    - de-select Feedback, Insights, Maps contributions, Product updates
  - Under the Google Updates section:
    - de-select New device tips
  - Under the Local Guides section:
    - de-select Contributions, News & Product updates, Perks, Research & Feedback
  - Under the News section:
    - de-select Daily briefing and Tips and tricks
  - Under the Photos section:
    - de-select Account reminders
  - Under the Travel section:
    - de-select Flight price alerts

In the "Your profiles" section:
- If you have a Google Play Games profile, select it from the "See profiles" page. Tap on the Play Games profile, and then tap "See full profile" which will redirect you to the Google Play website
  - Here, expand the Profile and privacy section and perform the following:
    - Disable "Let others find your profile using your email address" and "Receive friend invites"
    - Tap on the "Everyone can see your game activity" pencil, and set it as "Only you" or "Friends"
    - Tap on the "Games you play can automatically access your friends list" and set it to "No"

In the "Choose what others see" section:
- Tap on the "Go to About me" button
  - Here, in both the "About" and "Work & education" sections, set everything you can to "Only you" and delete any places, links, the introduction and occupation, and any other fields.

From the sidebar, select "Data & privacy".

In the "History settings" section:
- Click on "Web & App activity", and turn it off. Choose an auto-delete option, if applicable. De-select any subsettings. Click on "Manage all Web & App activity" to delete any such activities
- Click on "Timeline", and turn it off. Choose an auto-delete option, if applicable. De-select any subsettings.
- Click on "YouTube History" and turn it off. De-select any subsettings. Choose an auto-delete option, if applicable. Click on "Manage history" to view and delete the history.
- Click on "My Activity", and from the sidebar, select "Other activity", this will take you to a new page, scroll to the "Other activity" section and go through each one of the settings, deleting and turning off everything you can:

NOTE: Some pages you will navigate to will have the "Delete All" button, you can click that and confirm to delete all data related to that section.

  - My Ad Center > "Go to My Ad Center" > in the center top-right corner of the page, change "Personalized ads" to "Off"
  - Google Pay experience > "Manage activity" > Personalization within Google Pay > toggle to Off
  - Google Wallet passes data > "View and manage data for your passes" > Turn off "Use passes across Google", uncheck "Get better recommendations, results and more based on your passes in places like Maps, Calendar and Assistant", turn off "Personalization within Wallet"
  - Google Workspace search history > "Manage Google Workspace search history" > Google Workspace search history > toggle to "Off"
  - Gemini Apps activity > "Manage activity" > Turn off
  - Google Photos personalization > "Manage Google Photos personalization" > turn off "Activity-based personalization"
  - YouTube channel subscriptions > "View Subscriptions" > click on all the 'x' for the activity you can find. This WILL delete the subscription activity AND unsubscribe you from those channels!
  - YouTube "Not interested" feedback > Delete
  - YouTube survey answers > Delete
  - Comments on YouTube > "View Comments" > click on all the 'x' for the activity you can find. This WILL delete the comment activity AND delete your comments!
  - Comment Likes and Dislikes on YouTube > "View Comment Likes and Dislikes" > click on all the 'x' for the activity you can find. This WILL delete the like/dislike activity and unlike/undislike the comments!
  - YouTube Community Posts > "View Community Posts" > click on all the 'x' for the activity you can find. This WILL delete your interactions with community posts, such as poll votes
  - YouTube live chat messages > "View Messages" > click on all the 'x' for the activity you can find.
  - YouTube likes and dislikes > "View Likes and Dislikes" > click on all the 'x' for the activity you can find. This WILL delete your like/dislike activity activity and unlike/undislike the videos!
  - YouTube Customize Your Feed Feedback > Delete
  - YouTube purchase activity > "View activity" > click on all the 'x' for the activity you can find.
  - YouTube gift settings > "View gift settings" > click on all the 'x' for the activity you can find.
  - YouTube Playables Game Progress > "View Playables Game Progress" > click on all the 'x' for the activity you can find.
  - YouTube Playables Saved Scores > "View Playables Saved Scores" > click on all the 'x' for the saved scores you can find.
  - Feedback on content made using YouTube's AI-powered tools or features > "View feedback" > click on all the 'x' for the feedback activity you can find.
  - Hyping YouTube videos > "View hype activity" > click on all the 'x' for the activity you can find.
  - YouTube Sharing > "View Sharing Activity" > click on all the 'x' for the activity you can find.
  - YouTube other video interactions > "View other video interactions" > click on all the 'x' for the activity you can find.
  - Google Word Coach > Delete
  - Place Answers > "View Activity" > click on all the 'x' for the activity you can find.
  - Your interests & notifications > Delete
  - News Preferences > "View Activity" > click on all the 'x' for the activity you can find.
  - Google app podcast subscriptions > "View Subscriptions" > click on all the 'x' for the subscription activity you can find. This will unsubscribe you from those podcasts.
  - Chrome History > "View history" > click on all the 'x' for the history you can find.
  - Government Exam Quiz Activity > Delete
  - Translate language selections > Delete
  - Dictionary and Pronounciation search info > Delete
  - Promo activity > Delete
  - Product price tracking > Delete
  - Google Play Books feedback > "View activity" > click on all the 'x' for the activity you can find.
  - Play Games Activity > "View activity" > click on all the 'x' for the activity you can find.
  - Google Play content from app developers > "View activity" > click on all the 'x' for the activity you can find.
  - Play personalization options > "View options" > click on all the 'x' for the activity you can find.
  - Place Suggested Answers feedback > Delete
  - Call & Message Information > "Visit Google Voice" and "Visit Google Fi"
  - Purchases and reservations > "Manage purchases" and "Manage reservations"
  - My Ad Center preferences (already deleted in the previous step)
  - Google Podcasts Preferences > "View Activity" > click on all the 'x' for the activity you can find.
  - Google survey answers > "View answers" > click on all the 'x' for the answers you can find.
  - Data archive and sharing history > "View history" to see the history of data archives and sharing events. This activity cannot be deleted.
  - Data shared for research > Delete
  - Google Assistant routines > Delete
  - Voice and Face Match enrollment > "View data" > click on "Delete all enrollments"
  - Crisis Response User Reports > Delete
  - Assistant Memory > "View Memories" > sidebar "Delete All" and confirm
  - Your business information > Delete
  - Google Podcasts episode queue > Delete
  - “Hold for Me”, “Direct My Call” and “Call Screen” shared audio > Delete
  - Requests for services > Delete
  - Receipts shared with Google Opinion Rewards > "View Receipts" > cogwheel in the center top-right corner, to the right of the search bar > Delete all receipts > check the "I understand and want to delete all" box and click "Delete all receipts"
  - Comments on Search > "View Comments" > click on all the 'x' for the comment activity you can find.
  - Media likes and dislikes on Search > "See likes and dislikes" > click on all the 'x' for the like and dislike activity you can find.
  - Media likes and dislikes on Google TV > "See likes and dislikes" > click on all the 'x' for the like and dislike activity you can find.
  - Your ratings and reviews on Search > "See ratings and reviews" > click on all the 'x' for the activity you can find.
  - Crowdsource activity > "Manage activity" > click on all the 'x' for the activity you can find or from the "Delete All" button in the sidebar.
  - Portrait activity > "Manage activity" > click on all the 'x' for the activity you can find or from the "Delete All" button in the sidebar.
  - Generative imagery in Search > "See generated images"
  - Speak User Account > Delete
- Turn off Search personalization. Click on "Search personalization", turn it off. In the "Your Search data" section, click on each and remove everything you can, including unliking or unfollowing items, removing Not interested items, and adjusting your Streaming preferences by de-selecting any streaming service visible, such as Netflix and Amazon Prime.
- Click on "Linked Google services" and uncheck everything, then click "Next" and follow the steps provided, if any.
- "Manage Google Fit privacy" > "Export your data" then "Deletion options". Remove any devices connected to Fit. In "Data shared with Google Assistant", disable all options. In "Fit personalization options", disable all options. In "Fit data permissions", disable all options.

Under the "Data from apps and services you use" section:
- Apps and services > click on "Delete a service" and choose the Google services you wish to delete
- Third-party apps & services > select the services and apps you wish to remove or de-associate with your Google account

From the sidebar, select "Security".

Under the "Enhanced Safe Browsing for your account" section > "Manage Enhanced Safe Browsing" and turn it off.

Password Manager > migrate out all passwords to your password manager of choice, and delete everything from the Google Password Manager afterwards.

From the sidebar, select "People & sharing".

Under the "Contacts" section:
- remove any Contacts
- turn off "Contact info saved from interactions"
- turn off "Contact info from your devices"

Turn off Location sharing. Turn off "Business personalization". Turn off "Shared endorsements in ads".

#### Changing your Google settings on the Google Account-connected device

Open the device Settings app, and navigate to the bottom, and tap on 'Google'. Tap on 'All services'. We'll go section by section, just like before. There will be some overlap between this and the Google Account web page, but there are some preferences that are per-device preferences.

<figure class="image-frame">
  <img class="post-image-size" src="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Googleservices.webp" alt="" title="">
  <div class="image-frame-buttons">
    <a class="image-frame-button rem1 bold grotesk" href="{{ site.baseurl }}/images/post-media/2025/02/ComprehensiveAndroidGuide/Sett_Googleservices.webp" title="Maximize the image"><i data-lucide="maximize"></i></a>
  </div>
</figure>

Under the "Settings for Google apps" section:
- Connected apps > cogwheel icon > disable Sign-in prompts, and disconnect any app(s) from the Third-party apps & services page, if you don't need them
- Google Fit
  - Connected apps and services is the same as Connected Apps
  - Manage data > delete any data in the list
- Google Wallet - same as the Google Account web page
- Play Games
  - Privacy & Settings > toggle off everything in the Privacy section, and change to Only you or Friends only for who can see your game activity, and No to games accessing your friends list automatically
  - Sign in account > Change > Sign out of all games > Sign out
- Search, Assistant & Voice > should redirect you to the Google app's settings page

Under the "Connected devices & sharing" section:
- Cast options > turn off Media control notifications
- Chromebook > unlink any Chromebooks connected
- Devices >
- Quick Share > use it without a Google account

Under the "Privacy & security" section:
- Ads > Reset advertising ID, then Delete advertising ID, and make sure "Enable debug logging for ads" is disabled
- Personalize using shared data > disable all apps, because Google *may* save some of the data to your account for personalization, therefore it's not completely device-only data
- Phone Number Verification > disable "Automatically verify phone number(s)"
- System services updates > turn off Automatically install system services updates. You will miss out on the Google-provided security scans, malware protection, fraud and spam detection, parental controls and child safety features, some apps and Google Play features, and allegedly improvements to battery life, data consumption and device performance, whatever *that* means.
- Usage & diagnostics > ensure it's turned off

Under the "Autofill & passwords" section:
- Autofill with Google > make sure it's disabled. You can't enable it if you haven't selected Google as the preferred service for passwords, passkeys & autofill in the device settings
- Passkey-linked devices > Clear
- Phone number sharing > disable
- SMS verification codes > disable for both the Autofill service and Default browser

Under the "Backup & restore" section:
- Backup > make sure it's disabled. If you a screen such as "Back up your device with Google One" and asks you to turn it on, it means you aren't backing up your data from the device
- Google Contacts sync > Status > disable Google Contacts sync, and Also sync device contacts > disable it
- Restore contacts > make sure there is nothing to restore

Under the "Kids & family" section:
- Family group > make sure you're not in a family group, or haven't created a family group. If you don't use this feature, the screen should be an onboarding screen with the text "Bring your family together on Google" and a button "Create a family group". You can back out.
- Parental controls > if you're not using the feature, the screen should be an onboarding screen to "Set up parental controls"

Under the "Personal & device safety" section:
- Find My Device > turn off "Use Find My Device"
- Theft protection
  - make sure you're not using Identity Check. If you're not using the feature, the screen should be an onboarding screen to "Set up Identity Check"
  - disable Theft Detection Lock and Offline Device Lock
  - Remote Lock > disable Use Remote Lock
  - Find & erase your device > disable Use Find My Device
- Unknown tracker alerts > disable "Allow alerts" > Turn off
