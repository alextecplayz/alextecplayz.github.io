---
layout: post
language: en
locale: en_US
title: "expanding on chattification of websites and general enshittification"
description: "Just a longer version of a comment thread I made on Mastodon"
date: 2026-03-02T01:40:00+02:00
id: "mastodon"
postid: NO-260302-01
permalink: "/notes/chattification-enshittification.html"
type: note
categories:
  - Note
tags:
  - 2026
  - Politics
  - US Politics
---

Expanded and Enhanced(TM) on a rant about what I call the `chattification` of websites. Started [the thread here](https://techhub.social/@alextecplayz/116160006758193691). Was first meant to be a post about individuality and whatnot but this remained in my post drafts since fuckin March 2026 (posted Oct 04, 2026), JFC.

Before LLMs came to be, many big websites with products, services, or just the vague promise of a *thing* used chats. [Intercom](https://www.intercom.com/) - [which now uses AI](https://fin.ai/), [Zendesk](https://www.zendesk.com/) - [which now uses AI](https://www.zendeskrelate.com/event/1ce444c1-4c9b-4b1f-9f54-5e85d97d6a75/zendesk-relate-2026), [HelpCrunch](https://helpcrunch.com) - [which now uses AI](https://helpcrunch.com/chatbot.html), [HubSpot](https://hubspot.com) - [which now uses AI](https://www.hubspot.com/products/artificial-intelligence). You know, those *annoying little chat circles in the bottom right corner of these pages*, sometimes having some sort of animation, or red dots with numbers to get your attention, or worse, automatically opening up a conversation with a chat bot, like 'Hello, welcome to ${SERVICE}, how can I help you?' and some quick action buttons underneath. Sure, on large screens it'll open up in a corner and they'll be a general nuisance, but on mobile they open up to cover THE WHOLE SCREEN, which is when you get into instant trash territory. Avoid companies that do this like the plague.

Anyway, so you get on these big websites, you take a look around, "hm, this looks interesting", "hm, not bad, but how does it compare to X or Y?", and you go on the Pricing page or, if you're unlucky enough, you're directly hit with the "Contact us" button.

So they can't be arsed to even provide an estimate or a starting price for their stupid fucking product or service, or they're so mysterious enough that basically their website is just their logo and a contact button, that they're directly forcing you to talk with *(and let's be honest here, from personal experience as working in CS)* an outsourced, minimum-wage customer service or sales worker that then has to use a canned response or to provide some basic information because the higher-ups skimped on hiring a web developer.

It's always "contact us". Please, just contact our customer service or sales team that we enforce shitty quotas upon, please, look, we've designed this website to give you as little and as vague as possible information about us and our product/service/thing, so please just contact us, we promise to respond in max 24 hours.

Because of these shitty pop-ups I have Intercom and ZD blocked network-wide, and of course, I use uBlock Origin on all of my browsers, on all of my devices, and you should too. And ZD specifically, IME it's quite slow, it uses ~1GB of RAM because it's just a bunch of React components duct taped together with the blood, sweat and tears of web developers.

And since the introduction of LLMs and the greater AI bubble, such websites have now replaced (or kept, but enshittified the existing stuff) search bars with chat inputs. I've seen big websites, documentation pages and *big news websites* replace their search page with 'Ask AI'. And for new or up-and-coming docs page, it's AI-first because they didn't bother to hire a documentation writer or to write real documentation anymore, a Getting Started guide - or worse, their documentation and support are spread all over Discord, Slack, Telegram or *Matrix*.

OpenAI has had a bottom-fixed 'Ask ChatGPT' chat bar for years at this point. Just take a look at any of their recent news pages, such as [this article](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) announcing that a [human-validated benchmarking feature that evaluates AI models](https://openai.com/index/introducing-swe-bench-verified/) has become "increasingly contaminated", so now they recommend going a step above and using SWE-bench Pro or whatever. The irony is not lost on them.

We've replaced full-text (or basic) search capabilities from Algolia - oh wait, they've also [enshittified](https://www.algolia.com/resources/asset/ebook-2026-b2c-ecommerce-ai-trends) - with chat boxes.

In a few years from now, you'll have something like Google Play replacing search with Gemini, and you ask it to find an app, and Gemini will do its gosh darn best to find it while avoiding clones, scams or actual malware that occasionally slips on Google Play -- oh wait, Gemini is already used to show reviews and frequently asked questions for some apps on the store.

And here are a dozen or so examples of existing or future enshittification, because I can list them off the top of my head:

Don't want to read a book? Just ask Gemini.

{% gallery %}
https://raw.githubusercontent.com/alextecplayz/alextecplayz.github.io-media/refs/heads/main/assets/post-media/2026/photo_2026-03-02_17-30-40.jpg
{% endgallery %}

Need to file taxes, or at least learn how to, or have some other questions about our complex legal system? Just ask AI. [Romania's national agency for fiscal administration (ANAF) has launched ANA](https://www.businessforum.ro/industry/20260126/anaf-launches-virtual-tax-assistant-chatbot-2785), a chatbot for logged-in users so they can request fiscal obligation information. They claim it's totally made in Romania, but I'm not so sure. Then again, the chatbot is cretin enough that it's not an LLM, because anything more than 'tax % for LLC' is replied with "I can't help you with the '${your question}' prompt, please try rephrasing.", so I wouldn't be surprised if it's a simple word matcher, because that's what I would expect from people that LITERALLY pieced the ANAF website with duct tape, because [everything from the JS they wrote to unoptimized images REEKS of beginner-level idiot son of some person that works for the government](https://www.reddit.com/r/programare/comments/1wrq0k3/programatorii_de_la_anaf_ar_trebui_sa_schimbe/). `omulet2.png` . The government has already enshittified in-person interactions with our government institutions:

Want to start a business? Sure, go to 3-4 institutions: ONRC - Office for the Commerce Registry, then open a bank account for the soon-to-be founded company, then go to ANAF, possibly require notarized or authorised copies of whatever papers they request. If ONRC finds a mistake in your dossier, you need to correct it and try again. If you made 3 mistakes, you need to review your entire dossier and re-apply. It's a lot of bureaucracy for even the simplest things, because some people ask you to go to institution X with this here sheet of paper, they sign it or whatever, and you bring it back - something that could have been done online, or if you had the hindsight, you'd have done that before. Run around the city like a jester, sit in endless lines, get berated at by an older woman in her 50s or 60s, and finally, your company is founded after a lot of headaches. Some of the physical paper forms barely even have enough space to accomodate your address, email, phone number, etc.

is it really that hard to make a form on the web with the following required fields:
- Family name
- First name (because Romania, it's Family name then First name locally)
- Personal Identification Number (basically like the SSN for US folks) (from where DOB, personal address can be identified in the system, please don't make people write it again 'just because', or pre-fill those forms from it)
- Phone number
- E-mail address
- Company name (and a verify button next to it to check if it's available)
- Company physical address (even if you have a 'virtual' office or whatever, it still needs a physical address)
- Company mail address (and checkbox to use the same as physicall)
- Company bank account (and whatever else might be needed from the bank)
- Company starting capital (~200 RON usually?)
- Company type (dropdown between SRL, SRL-D, SRL with micro taxation, SA, and so on)
- A drag and drop / multi-selection file picker that lets you upload all relevant documents (whiich should be listed below the file picker, instead of letting you guess or scour other pages to find out)
- Submit button

jesus christ, people. it's nearly 2027.

eMAG Romania recently introduced a chatbot named 'iZi' (easy) currently in beta, that also supposedly uses a "totally Romanian-made" chatbot so you can ask it questions to find things you need, and it'll create a dedicated wishlist for you.

It's a nice feature in theory, I'll give them that, but it's another way to further enshittify online shopping, because when I search for 'Google Pixel 10' on the site I get dozens of sponsored products from companies like Samsung and Apple, phone cases, accessories and some keyboard-mashed Chinese brand names like woooxydis, eithfjso or zooarhe with their own cheaply-made accessories, when all I'm looking for is a fucking phone from a specific brand.

So we've enshittified our sites and our institutions, now we provide an enshittified solution to the problems we've created. As it happens, [the Norwegian Consumer Council has published a great video, A Day in the Life of an Enshittificator](https://www.youtube.com/watch?v=T4Upf_B9RLQ) that gets my point across. You buy a productt, it gets shittier, and you're fucked. You buy a car, you split essential stuff like heated seats or heated wheel, or even a screen that's just 1 inch bigger into subscriptions and expensive add-ons, because the customer can't buy a new car since they have no more money, but they can afford these additions, you don't really have a choice when it comes to heated seats in the winter, you need to buy that, for example.

So instead of a one-and-done purchase they nickel-and-time you for these little things, some of which are essential.

And when we enshittify LLMs further, we'll come up with a different solution to this problem. But this also means that we're streamlining everything.

And we've already streamlined phones, all big-brand phones look the same. Sony, Apple, Samsung, Motorola (*which [has ~recently announced their partnership with GrapheneOS](https://9to5google.com/2026/03/01/motorola-confirms-grapheneos-partnership-for-a-future-smartphone-porting-features/)*), Xiaomi, OnePlus, etc. All phones feature the same boring, corporate, soulless gray, white and black, with some soft color version as well. S26 series has two Samsung website exclusive colors, Siler Shadow and Pink Gold, which just looks fantastic, and honestly I'd buy it if I had the money, even with the risk that comes with owning a Samsung device, and their historic anti-consumer and anti-repair practices.

I don't mention Xiaomi here, because Xiaomi is just Android's shittier version of Apple, and it's prettty much obvious given Xiaomi skipped a Mi line to use the same numbering scheme as Apple this year, the phones look nearly identical except for an added screen on the back of the camera island, uses the same colours, and Xiaomi's take on the iPhone Duo. As one great philosopher once said, "There is no higher form of flattery than Xiaomi"