---
layout: post
postid: PO-260707-01
permalink: /posts/2026-07-07-Give-me-interop.html
type: post
lang: en
locale: en_US
title: "Shitting on SmartThings and device ecosystems"
description: "Tech ecosystems suck. Interoperability is the way."
date: 2026-07-07T00:00:00+02:00
categories:
  - Post
tags:
  - 2026
  - Technology
  - AlexTECPlayz
image_banner_link_lq: https://raw.githubusercontent.com/alextecplayz/alextecplayz.github.io-media/refs/heads/main/assets/post-thumbnails/2026-07-00-Give-me-interop-lq.webp
image_banner_link: https://raw.githubusercontent.com/alextecplayz/alextecplayz.github.io-media/refs/heads/main/assets/post-thumbnails/2026-07-00-Give-me-interop.webp
toc: true
bg: "article-bg-gry1"
---

Remember SmartThings? Remember how it was supposed to connect everything, so it all would work from a single app? Remember those dreams?

The topic of today is how the smart home and device ecosystems have failed us.

# SmartThings

**"SmartThings lets you easily connect, control and automate your smart home from one app. Compatible with hundreds of devices and brands, SmartThings brings your entire smart home together in one seamless experience."** - [from the SmartThings homepage](https://www.samsung.com/us/smartthings/)

Go fuck yourselves, that is a lie.

At the beginning of July I bought two [TP-Link Tapo P110 plugs](https://www.tp-link.com/ro/home-networking/smart-plug/tapo-p110/) because my PC was randomly hard rebooting (which turned out to be the PSU thankfully, so I have swapped from the [Gigabyte P450B](https://www.gigabyte.com/Power-Supply/GP-P450B) to the [Seasonic Core GX 650W](https://seasonic.com/core-gx/)), and while I'll say they're rather easy to set up, it involves me having to download their stupid Tapo app, create a TP-Link account (there's always a requirement for accounts for smart home apps, this is another rant I will have in a section below!), and then finally connect to these products.

There's this description in small text on the [Tapo page](https://partners.smartthings.com/partners/tapo) for SmartThings partners: "Aimed at offering users an exceptionally smart lifestyle, Tapo provides easy-to-use smart living products and comprehensive whole home solutions, including smart security, entry solution, cleaning, lighting, automation, **and the user-friendly Tapo app**.", which sounds like an optional component, not a requirement.

It takes about 5 minutes to go through the whole process of finding the plug, connecting it to wi-fi, a software update, and then ANOTHER software update. It could be faster tbh.

But my whole fucking problem is that you NEED the Tapo app. You can't add the device via SmartThings, Google Home, or some other smart home app and have all functionality. It must be Tapo, or you've wasted money on these plugs and you can't use them from your phone.

I was also considering Philips Hue for a future RGB ceiling light and maybe some ambient lights in my office / bedroom, but besides being expensive as all hell, they need the Philips Hue app. Again, they won't work without this app, you need to set them up there.

"Oh, so buy devices that support Matter, those will work!" and spend more money on a third device, a Matter hub that controls these devices. So now it's the [XKCD competing standards comic](https://xkcd.com/927/). "This standard isn't interoperable as promised? *Here's a new standard that surely promises to be compatible this time, pinky promise!*"

So for each brand of shit smart home tech, you need a new app. It starts to add up. Tapo, Philips Hue, IKEA Home Smart, Nest (via the Nest or Google Home app), if you buy from brands like Xiaomi you need the Xiaomi Home app (which isn't compatible with SmartThings directly, you need SmartThings IFTTT), and so on. By the end of the day you end up with 20 different fucking apps on your phone.

So much for the "one seamless experience" when you need to create a dozen different fucking accounts for these dozen different fucking apps, then add those devices individually from those dozen fucking apps, don't forget to connect them to SmartThings via an official plugin or some community plugin, workaround or third-party provider, or your own DIY thing, and by the end of the day you'll be banging your head on walls wondering why the fuck you even bought this shit when you could have used them without the 'smart' functionality.

SmartThings, Zigbee, Thread, Matter, fuckass names and shitty standards / ecosystems that will never be interoperable because there's always a third-party company out there with their own stupid fucking mindset and ideas that thinks it's sooo special and should be exempt from this. The Tapo app lets me monitor the P110's power usage in real-time and also provide me with daily / weekly / monthly graphs and averages, lets me set the price for a mW used, etc. The official SmartThings connection / integration only lets me power on/off the plug, but no monitoring. So what's the fucking point?

What's the fucking point of SmartThings, or as a manufacturer, integrating with SmartThings at all if your fuckass app does 100% of the things, and SmartThings does only half (or less than half) of things? Why even bother for the stupid SmartThings partner thing at all? It's misleading and anti-consumer.

## Smart homes and accounts

On this same topic, why the fuck is it necessary for me to create accounts for smart home apps? I don't want to control my plugs remotely, I just want to monitor the energy usage while I'm connected to my local network. I don't want to save my router's wi-fi password into your stupid cloud that will inevitably get breached by some *l33t hAx0r script kiddies* or a state actor with a paperclip, a TV remote and a Nokia 3310 in an afternoon (*I jest, of course. They'd only need the Nokia 3310*).

SmartThings needs a Samsung account to do anything besides access a 'demo home'. Google Home and Nest need a Google account or a legacy Nest account. Xiaomi Home needs a Mi account (depending on the region and app used, a Global or China Mi account (*Glory to the CCP! +5000 social credit!*)). TP-Link Tapo needs a TP-Link account. Philips Hue needs a Philips account. The IKEA Home app needs an IKEA account, you get the idea.

**Stupid fuckass accounts for their stupid fuckass apps for their stupid fuckass products, so you can use them in your fucking home.**

Smart homes are a fucked-up, miserable joke and a nightmare, and probably a full-time job just to set up and maintain them. Jesus christ...

**September 10, 2026 edit:** I wrote this post on June 7th and never got around to publishing it, but [following GamersNexus' reveal that LG TVs just plain spy on you](https://www.youtube.com/watch?v=6IFVTcM28KA), it only hardens my theory that they want smart home users to have accounts because besides the convenience of syncing stuff through the power of *the Cloud(TM)*, they gather and slurp up more information about you, what devices you have, how you use them, so they can sell you more ads for more products, and this data is indistinguishable from spying on you to gather information for blackmail.

*"We at $BRAND know that you have multiple of our cameras, one is in your bedroom, one is in your kitchen, one is outside your front door and because you willingly synchronize the recording to our cloud, we now know exactly where you live (as if we didn't already via GPS, Wi-Fi or plain IP tracing and a bit of geopositioning). Here are some more ads from our brand and sub-brands for you to buy. It'd be a shame now if we were to leak this data to someone..."*

{% aside %}
**September 13, 2026 addendum:** [huh, *that predictable*, LG?](https://youtu.be/ToP9xfLDSME?t=1463). In this new Gamers Nexus video the security researcher revealed that yes, LG is in fact pinging home nearly exact location data, even when plugged in as a dumb monitor via HDMI. Oh but sure, LG doesn't spy on you. Fuck you LG, keep lying about this.
{% endaside %}

Even if the intent isn't blackmail or spying on people, we have seen time and time again that hackers love to do what they do best, and gathering such incredibly personal and valuable information as the *specific information on what devices a smart home user has, how they are positioned (e.g. room category or name), personal habits, timelines, etc.* would easily be extracted en-masse and then sold on the dark web, and so, someday a rando e-mails you with this information asking for ransom or someone just breaks into your house because they're a mentally ill motherfucker intent on violence and killing, or they rob you or whatever. Now what?

**The smartest fucking approach to having a smart home is to NOT have a smart home account, never synchronize your smart home technology to the cloud, or expose them to the Internet.** I get it, convenience is great, so you can watch your live camera feeds from an app over the Internet, or to have your smart tech work in unison or follow a routine, or to trigger your washing machine remotely while at work, etc. but there are risks to stuff like this.

If anything, it pushes me to not actually have any smart home tech in my house. CCTV sure, but I would never imagine buying a smart doorbell or door lock, roombas, not even shit like Philips Hue, smart fridges (instant red flag if you have a smart fridge imo), not even garden robots, and a 'hell the fuck no' to remote garage door openers.

# Smart TVs fucking suck

Smart TVs fucking suck. I don't think I need to expand on this. Okay, I actually do.

Samsung's shitty fuckass 'smart TVs' that have that shitty, slow, fuckass Tizen OS which is incomprehensibly hard to navigate. I had to guide two of my relatives with steps to uninstall and then reinstall Netflix on their TVs. One had a Frame TV, the other had a similar TV, but it was from a different year so it had a different UI altogether...

[As if Samsung's The Frame wasn't already a fucking disaster dumpster fire piece of shit, as per this Snazzy Labs video I watch almost every month at this point because I love to hate on Samsung being fucking ass](https://www.youtube.com/watch?v=VvI0TtwsqX0)

YOU NEED A SAMSUNG ACCOUNT TO INSTALL APPS FROM THE APP STORE!

I yearn for the day when I could install Linux on a fucking Smart TV...

**September 10 edit:** and now that we know LG at the very least [spies on you through your TV](https://www.youtube.com/watch?v=6IFVTcM28KA), it's likely other manufacturers will also be investigated at some point, and they will arrive at the same conclusion, which is that TVs shouldn't have cameras and microphones, and neither should the remotes. That, and never connect your smart TV to the internet, which only helps you so far because there is always the risk of someone popping a USB drive with an exploit to copy the transcripts and the audio recordings themselves that the TV saves, even if they're not uploaded somewhere.

# Devices

But on the broader sense, devices. When you think of ecosystem, what do you think of? Apple, Google, Samsung, Xiaomi, these big fuckass companies that strive to make their devices ideally most compatible with their own products while neglecting everything else.

Apple is of course, famous for this. Apple devices (e.g. watch, earpods) are not as useful with Android devices, some functionality is disabled because of course, only with an iPhone can your stupid fuckass watch that has the necessary hardware to record and measure specific health data, can then display that data. You're SOL (shit out of luck) on Android.

But even so, what about when planning for the future? Do you really want to spend your whole life buying only stupid fuckass products from a single fuckass company? Sure, if you were living in the 2010s Apple might have been a good ecosystem to get yourself locked in, but if you were never a Trump supporter, now in the 2020s you'll be hitting yourself for sticking with this trillion-dollar fascist bootlicker corporation.

Google? Hardware ecosystem? What...hardware ecosystem? You have the Google Pixel phones, the Pixel watch, and the Pixel buds. The soon-to-be-released Googlebook. What Google really excels in is a digital ecosystem, however.

Or Samsung? Would you really want to sit your whole life using only Samsung's shitty fuckass products? As mentioned in the Smart TVs section, their shitty fuckass smart TVs? And I hear their appliances aren't any better. Fridges, washing machines, etc. are also quite fucking bad and prone to breakage. The washing machines come with a limited amount of programs, you can download additional ones from the SmartThings app. Their phones are anti-consumer and starting with OneUI 8.0, can no longer have their bootloader unlocked. So once they stop receiving software updates, they cannot be unlocked to use a custom ROM that continues to provide updates, and also stops any idea about running native Linux (e.g. postmarketos on them).

It now makes a lot of fucking sense as to why SmartThings is a venture started by Samsung. SmartThings sucks, because Samsung is incompetent and sucks fucking ass. Only an incompetent corporation that can't even [have good hardware and software or heaven forbid, get Dolby licensing for their thousand-dollar TVs](https://www.youtube.com/watch?v=VvI0TtwsqX0?t=978) could think of SmartThings, a corporation management team's wet dream: lock consumers into OUR standard, let other companies and corporations become 'partners' by letting their devices work from our app with however much (or little) functionality those companies decide, and our consumers will LOVE it, they will eat it like the good little dogs they are (*not that kind of 'good dogs' btw*). Profit!!!

# Okay, but interoperability isn't always good

Examples include HDMI CEC, hot-swapping SATA, SmartThings itself, fucking USB-C and its bajilion variants, and so on. Okay, so why could that be?

**Because there's no one to keep these fuckass companies accountable!**

If there's any conclusion you should draw from this post, is that you should try to find tech that is interoperable with each other where possible. And to stop being loyal to a single company. Stop being loyal to any company, in fact, because companies are not your friends, and will always prioritize profits. If you're fanboying/fangirling for a company, you're a sad, sad person.

Yeah, it's just another rant post from my draft folder that remained unpublished for months (was written in July but I'm only publishing it now in October JFC)
