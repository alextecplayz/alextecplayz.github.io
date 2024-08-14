---
layout: post
lang: en
locale: en_US
title: "Notes"
description: "/notes is a page where I usually post shorter content or move my comments from platforms like Twitter, reddit that I want to keep or to link back to, in order to prevent unauthorized AI scraping and training."
date: 2024-08-05
categories: Post
image_banner_link:
image_banner_alt:
metadata_proglang:
metadata_platforms:
metadata_timespan:
highlight: true
toc: <a class="header-button monospace semibold" href="#landing">Top</a><br><a class="header-button monospace semibold" href="#why-are-you-still-rooting-your-android-reddit1b5dhio">Why are you still rooting your android? [reddit/1b5dhio]</a><br><a class="header-button monospace semibold" href="#facebook-app-on-android-reddit1aw9lqi">Facebook app on Android [reddit/1aw9lqi]</a><br><a class="header-button monospace semibold" href="#does-anyone-know-what-lgbt-people-were-like-back-in-the-stone-ages-reddit1asmc0g">Does anyone know what LGBT people were like back in the stone ages? [reddit/1asmc0g]</a><br><a class="header-button monospace semibold" href="#am-i-the-only-one-who-started-to-hate-the-subject-romanian-language-and-literature-reddit18glzip">Am I the only one who started to hate the subject “Romanian language and literature”? [reddit/18glzip]</a><br><a class="header-button monospace semibold" href="#is-it-too-hard-for-some-to-respect-my-decisions-reddit18pgjhp">Is it too hard for some to respect my decisions? [reddit/18pgjhp]</a><br><a class="header-button monospace semibold" href="#what-is-the-best-way-to-clean-a-project-to-package-it-reddit18wz6kn">What is the best way to clean a project to package it [reddit/18wz6kn]</a><br><a class="header-button monospace semibold" href="#grapheneos-better-than-dumb-phones--reddit1ah5tpt">GrapheneOS better than dumb phones ? [reddit/1ah5tpt]</a><br><a class="header-button monospace semibold" href="#how-to-delete-a-gmail-account---and-take-back-your-privacy-reddit1ams1hw">How to delete a Gmail account - and take back your privacy! [reddit/1ams1hw]</a>
---

Ironically enough, the [gibberish generator I use](https://thinkzone.wlonk.com/Gibber/GibGen.htm) made this sentence at one point, through sheer randomness, and I can't help but agree: *By making Reddit content online, we’re able to use the world.*

*/notes has the following format for a section: {title of post} [{platform}/{id}]. Link-backs would have the following format: /notes#{title-of-post}-{platform}{id}*

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
- AFWall+ firewall to block or allow apps to use certain network features such as LAN, Mobile Data, Wi-Fi, VPN)
- the ability to access /data/data/ for apps that ONLY store their data there, instead of Android/data (e.g. Megapolis. GTA LCS - games that only keep their save files and preferences in /data/data/, so you can't transfer from a different device or use old saves without root)
- Lucky Patcher can patch apps using root instead of having to create new modified apps that I need to then reinstall (which might involve backing up the apps' /data/data/ folder to avoid losing data)
- unlimited Google Photos storage (can be done through root or through certain custom ROMs, like I do)
- Franco Kernel Manager (FKM), can change SELinux policy, undervolt my CPU, GPU, adjust RAM stuff such as zRAM state and size, other Kernel settings, per-app performance profiles, general performance overview through a dashboard
- general app/data backup and restore is much easier with root

---

### Facebook app on Android [reddit/1aw9lqi]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/DeFacebook/comments/1aw9lqi/facebook_app_on_android/krgrie6/?context=3)

---

Use the website instead of the app, restrict website permissions and tracking. Heck, use Firefox or a privacy-focused fork such as Mull, install some extensions and you'd get even more privacy, combined with ad blocking and some skins or theming.

If you need to use the app, create a Work Profile using Shelter, install the app in it to keep it separate from the rest. Don't allow permissions UNLESS absolutely necessary. Contacts, Call logs, Location, Camera, Microphone, Files access are all sensitive permissions that you should grant carefully. Remove them afterwards if you have to use a feature that requires such a permission once or every once in a while, otherwise it will access them frequently to snoop on you and deliver targeted ads and invade your privacy.

If you want to take it to the extreme, you can try modifying the app, patching it, whatever, so you can deny access to even more stuff. In total, the Facebook app has 88 permissions, Facebook Lite has 70. The majority of these are not directly exposed in the user interface of the system, they're referred to as 'appops'. These much more granular and precise permissions allow Facebook to, in addition to the access granted by the permissions I listed in the paragraph above, access the list of apps installed on the device, access your Google account, access your billing information, control Wi-Fi, NFC, audio settings, prevent your phone from going to sleep (keeping screen awake), etc. These can be disabled through patches with or without root, depending on the app used.

Lucky Patcher (not available on any storefront, has its own dedicated website) works with root and non-root (root = direct patch to installed app, non-root = patch app or APK file, you need to uninstall existing Facebook app before installing patched file). There is also App Ops (available on Google Play) that does this with Shizuku, so you don't need root, but it might be finicky and some features are limited to a purchasable license from Google Play).

---

### Does anyone know what LGBT people were like back in the stone ages? [reddit/1asmc0g]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/lgbt/comments/1asmc0g/does_anyone_know_what_lgbt_people_were_like_back/kqrqszg/?context=3)

---

Interesting question. In my opinion, I suppose it would really depend on where they lived. Culture and society would be the major factors that would determine this. Tribes with less education would have more oppression, while the tribes trying to stay ahead of the curve, be progressive and accepting, would be a safer place.

Take hunter-gatherer societies (Paleolithic-Mesolithic): gender roles would be somewhat less rigidly defined, as both men and women performed roughly the same roles: hunting animals, gathering food and supplies, caring for children. Some lived a nomadic lifestyle, where regardless of who you were, you had to adapt, so obviously labor and responsibilities would be again distributed equally. I think in such societies, gender fluidity would be accepted more, as regardless of who you were, you still had the same level of contribution, did the same level of tasks and had to adapt depending on the situation. Men had to take care of children just as well as women, and women had to hunt as well as men.

But in other societies, such as the agricultural societies that appeared later on (Neolithic and later), things would change. Tasks became more specialized, with men engaging more in hard labor such as plowing and animal care, while the women engaged in household activities such as cooking, childcare and hand-crafted stuff such as clothes. I assume this is where gender roles were primarily 'formed', and why they stayed roughly the same until modern times?

Additionally, there was surplus production of goods, which led to wealth accumulation and the development of complex social hierarchies, and where patriarchal systems emerged, and men were the typical holders of power, wealth and authority? Not to mention the wealth accumulation led to the concept of private property - land, housing -, which led to inheritance and an even deeper entrenching of the gender roles, and the reinforcement of male lineage. In such societies, I would assume it wouldn't be a pleasant place to be as a person that would stray away from the gender roles.

---

### Am I the only one who started to hate the subject "Romanian language and literature"? [reddit/18glzip]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/CasualRO/comments/18glzip/doar_eu_am_%C3%AEnceput_s%C4%83_detest_materia_limba_si/kd4f24j/?context=3)

**NOTE:** *The original text is in Romanian, but an English version is also provided, as this website is primarily using the English language, not Romanian. Original Romanian post title is 'Doar eu am început să detest materia "limba si literatura română"?'*

---

**[Romanian] / [Română]**

Scopul materiei, într-un sistem de educație ca lumea și profesori buni, ar fi de a încuraja și/sau dezvolta gândirea critică, analitică, nu de a memora eseuri lungi de câteva pagini pentru un examen la finalul clasei a XII-a. Majoritatea textelor din programa actuală au un rost dacă le răsfoiești, ce te pot ajuta și astăzi.

Spre exemplu: '*Ion*' și '*Moara cu noroc*' te învață despre moralitate, alegeri, consecințe, așteptările din partea societății, '*Luceafărul*' are teme adânci despre filozofie și romanță, '*Plumb*' despre simbolism și exprimarea emoțiilor interioare, '*Enigma Otiliei*' oferă o privire în natura umană, '*Moromeții*' examinează schimbările culturale în România intre '30 și după cel de-al Doilea Război Mondial, '*Iona*' despre condiția umană și existența, etc.

Combină asta cu orele de Etică, Psihologie, Filozofie, Logică, cel puțin eu asta am avut pe profilul uman - dar nu ar strica puțin din fiecare și la real, și ajungi o persoană formată care poate să gândească critic, să interpreteze, analizeze și să își exprime ideile coerent. Limbajul poate fi pompos, desigur, dar e pur și simplu cum s-au exprimat autorii operelor respective în acele timpuri, deoarece se punea accentul pe astfel de limbaj. Tu, după ce citești operele și scrii eseurile necesare (apartenența operei X la genul Y, caracterizarea personajului Z, etc), se presupune că ai putut să determini, de unul singur, argumente logice care te ajută să îți susții punctul de vedere în eseul respectiv.

Vrei să dovedești de ce opera '*Ion*' aparține genului epic? Trebuie să găsești argumentele potrivite care susțin asta. Vrei să dovedești despre personajul Ghiță că este corupt de Lică, ajunge însetat după avere, devine violent, etc - trebuie să determini asta, nu să îți reamintești eseul scris de profa și să îl torni în pagină ca și o copie xerox.

Gramatica este importantă, dar la fel e și gândirea critică. Cum au scris deja și alții, se aplică același lucru și la matematică. Memorezi unele formule de bază, și pe restul ajungi să le deduci tu, după caz. Dacă vrem o 'țară ca afară', oamenii trebuie să poată analiza ce se întâmplă, și să ajungă la concluzia potrivită.

Contează 'norocul' pe care îl ai să ajungi la un profesor, sau o profesoară bună de limba română, care vor ca elevii să se implice cu adevărat, nu să tocească și să reproducă la infinit, și apoi să vomite eseurile predate la clasă în sala de examen. Îți înțeleg frustrarea - nu o să te învețe cum să faci bani, sau alte lucruri care pot fi mai folositoare în viața de zi cu zi, dar ai nevoie și de asta.

*Scuze dacă am scris prea mult, am nevoie de somn* 😅

---

**[English] / [Engleză]**

The purpose of the subject, in a proper education system and good teachers, would be to encourage and/or develop critical, analytical thinking, not to memorize essays several pages long for an exam at the end of the twelfth grade. Most of the texts in the current syllabus make sense if you skim through them, which can still help you today.

For example: '*Ion*' and '*Moara cu noroc*' teach you about morality, choices, consequences, expectations from society, '*Luceafărul*' has deep themes about philosophy and romance, '*Plumb*' about symbolism and the expression of inner emotions, '*Enigma Otiliei*' ' offers a glimpse into human nature, '*Moromeții*' examines the cultural changes in Romania between the 1930s and after the Second World War, '*Iona*' about the human condition and existence, etc.

Combine that with Ethics, Psychology, Philosophy, Logic classes, at least that's what I had on my humanities profile - but it wouldn't hurt to have a little of each in the sciences profile, and you end up a trained person who can think critically, interpret, analyze and to express their ideas coherently. The language can be pompous, of course, but it is simply how the authors of the respective works expressed themselves in those times, because such language was emphasized. You, after reading the works and writing the necessary essays (the belonging of the work X to the genre Y, the characterization of the character Z, etc.), it is assumed that you were able to determine, on your own, logical arguments that help you support your point of view in the essay respectively.

Do you want to prove why the opera '*Ion*' belongs to the epic genre? You have to find the right arguments to support it. You want to prove about the character Ghiță that he becomes corrupted by Lică, thirsty for wealth, violent, etc. - you have to determine that, not recall the essay written by the professor and pour it on the page like a xerox copy.

Grammar is important, but so is critical thinking. As others have already written, the same applies to math. You memorize some basic formulas, and you end up deducing the rest yourself, as needed. If we want a 'country like outside', people must be able to analyze what is happening, and reach the right conclusion.

It matters the 'luck' you have to reach a good Romanian teacher, or a good Romanian teacher, who want the students to really get involved, not to rote and reproduce endlessly, and then vomit the essays taught in class in exam room. I understand your frustration - it's not going to teach you how to make money, or other things that may be more useful on a day-to-day basis, but you need that too.

*Sorry if I wrote too much, I need sleep* 😅

---

### Is it too hard for some to respect my decisions? [reddit/18pgjhp]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/CasualRO/comments/18pgjhp/chiar_le_e_greu_unora_sa_%C3%AEmi_accepte_deciziile/keql1v8/?context=3)

**NOTE:** *The original text is in Romanian, but an English version is also provided, as this website is primarily using the English language, not Romanian. Original Romanian post title is 'Chiar le e greu unora sa îmi accepte deciziile ?'*

---

**[Romanian] / [Română]**

Aromanticismul și Asexualitatea sunt cât se poate de reale. Vezi:

- Hammack, P.L., Frost, D.M., & Hughes, S.D. (2018/19). Queer Intimacies: A New Paradigm for the Study of Relationship Diversity. The Journal of Sex Research, 56(4-5), 556-592. - [eScholarship - UC Santa Cruz](https://escholarship.org/uc/item/285899t4)
- Bulmer, M., & Izuma, K. (2018). Implicit and explicit attitudes toward sex and romance in asexuals. The Journal of Sex Research, 55(8), 962-974. - [White Rose ePrints (PDF)](https://eprints.whiterose.ac.uk/114509/1/Final_manuscript.pdf)

---

**[English] / [Engleză]**

Aromanticism and Asexuality are as real as it gets. See:

- Hammack, P.L., Frost, D.M., & Hughes, S.D. (2018/19). Queer Intimacies: A New Paradigm for the Study of Relationship Diversity. The Journal of Sex Research, 56(4-5), 556-592. - [eScholarship - UC Santa Cruz](https://escholarship.org/uc/item/285899t4)
- Bulmer, M., & Izuma, K. (2018). Implicit and explicit attitudes toward sex and romance in asexuals. The Journal of Sex Research, 55(8), 962-974. - [White Rose ePrints (PDF)](https://eprints.whiterose.ac.uk/114509/1/Final_manuscript.pdf)

---

### What is the best way to clean a project to package it [reddit/18wz6kn]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/UnrealEngine5/comments/18wz6kn/what_is_the_best_way_to_clean_a_project_to/kg1m882/?context=3)

---

Look into PakBlacklist (*deprecated, but still works*) and DefaultPakFileRules.ini, where you can exclude files using regex, and you can exclude editor content as well. PakBlacklist would be placed in your project's Build/(platform)/ folder, and DefaultPakFileRules in the project's Config folder.

I use PakBlacklist for Android packaging, and it would look something like this:

{% highlight ini %}
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
{% endhighlight %}

so I can just remove this content from being packaged in Android builds to save storage space, and to avoid including useless or in-dev content.

The DefaultPakFileRules.ini example is found in (ue4/5 install directory)/Engine/Config/BasePakFileRules.ini and would be placed in your project's Config folder, it would look something like this:

{% highlight ini %}
; is used as comment in the file, will be ignored by editor
; the rules are applied in order
[SectionName] ; e.g. ExcludeContentForLinux
; Sections might need to follow certain names for it to work properly, so check the source code
; or additional documentation where possible. I don't think you can just add a random name to the
; section stuff.
Platforms="Linux"
bExcludeFromPaks=true ; files listed below will be excluded from Pak files entirely
+Files=".../Engine/Content/Slate/Tutorials/"
+Files=".../Content/GAME_DEV/Materials/dev_*"   ; regex can be used with * to exclude any files that
                                                ; have dev_ before the rest of the filename
+Files=".../Engine/Plugins/Enterprise/"

[ExcludeContentFromMobile]
Platforms="Android,iOS"
bExcludeFrompaks=true
+Files=".../Content/MobileStarterContent"
{% endhighlight %}

Now, this will require the manual work of you having to look into what files are USED by the project, from files or folders you wouldn't think they would be used. Do NOT exclude the editor fonts folder if you don't have your own font files, for example, as you will get a warning the files are missing when you start the game on platforms such as Android, which would be unprofessional and a glaring issue if it's a Shipping version. Heck, some content if excluded might just crash the game, so look and test carefully.

Also, you might want to set some file and folder naming conventions. For any additional content you don't use, either delete it altogether or move it to a specific folder and/or subfolder. For development stuff, have a separate folder. Post-launch or DLC content? Their own folder. I use this, for example, and it works well for my use case:

{% highlight ini %}
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
{% endhighlight %}

alongside PrimaryAssetLabels in each, such as PAL_GAME_BASE that is put in the GAME_BASE folder, helps to tell the editor that the content in this folder (incl. subfolders) is packaged in some way, and put in a certain chunk (e.g. 100) if you use chunking. I recommend to use numbers such as 100, 200, 990, etc. to allow for some leeway in between for patched content or additional content that you might just have to include in a chunk closer to the initial chunk. I consider 0-95 to be the chunks where 'overflow' content such as improperly packaged localization, additional assets I might have missed to exclude might end up in.


---

### GrapheneOS better than dumb phones ? [reddit/1ah5tpt]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/degoogle/comments/1ah5tpt/graphene_os_better_than_dumb_phones/koljpjn/?context=3)

---

Dumb phones have their own advantages - removable batteries, they're simple and the battery lasts longer because of this, they're cheap and disposable - while a new or used Google Pixel currently supported by GrapheneOS might set you back a few hundred bucks.

The only other better alternative to GrapheneOS that I can think of is a theoretical device where you have complete control over the source code used by the hardware, and running a heavily privacy-focused distribution of Linux or BSD. GrapheneOS can't really do more advanced stuff related to connectivity other than the ability to restrict access to cell towers, WiFi, etc, you're just toggling off some stuff, but there's no granular control over this stuff, especially not over the modem, which is separated from the OS anyway, as it should be.

If you can audit and modify the source code of any of the components, you could spot anything that may be tweaked to improve your privacy further. Most smartphone modems are closed source, so you can't know if there's some hardware or software backdoor, or if the modem could be accidentally leaking data. Additionally, you could implement selective network or cell tower access, protocol filtering, the ability to only connect to certain trusted networks. Heck, you could probably expose software to the system to run a VPN and a DNS filter directly on it, for lower CPU and RAM usage, making it the first physical line of defense when it comes to generally blocking website trackers, specific IP and web addresses (through filterlists, for example), and so much more.

Most smartphone modems are proprietary - usually developed by Samsung, Qualcomm, MediaTek - but there are some efforts to develop open-source modems, not specifically for smartphones, but I wouldn't exclude the possibility.

Take IMSI catchers for example, also known as StingRays. They can act as a cell tower and all devices will automatically choose it because of its signal strength over any actual phone towers. The vast majority, if not all, consumer smartphones and dumb phones don't allow you to manually choose a phone tower - heck, depending on the mobile provider, even doing that would be violating their ToS or something.

---

### How to delete a Gmail account - and take back your privacy! [reddit/1ams1hw]
[Link to Post, Comment and/or Context](https://old.reddit.com/r/degoogle/comments/1ams1hw/how_to_delete_a_gmail_account_and_take_back_your/kpse58k/?context=3)

---

I recommend these websites as well:

[JustWhatsTheData](https://justwhatsthedata.github.io/) - List of companies and what types of data they collect about you, with some useful color coding

[JustGetMyData](https://justgetmydata.com/) - Direct links to a good amount of popular websites to download or access the data they have on you

[JustDeleteMe](https://justdeleteme.xyz/) - Direct links to deleting accounts on popular websites, where possible. Some have black color coding that inform you that you can't delete your account, but this doesn't mean the account can't get banned, for example. Some forums can't delete your account, so you can ask to be banned instead.