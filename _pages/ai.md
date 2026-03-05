---
layout: post
postid_alt: AI
permalink: /ai.html
type: post
lang: en
locale: en_US
title: "AI use or endorsement"
description: ""
categories:
  - Post
tags:
  - 2026
  - Generative AI
  - AlexTECPlayz
  - State of affairs
image_banner_link:
toc: true
---

None of my posts are AI-generated. I don't run my posts through an LLM. I used to use LanguageTool to spell-check and improve a few posts, but since then I've moved to using [Harper](https://writewithharper.com/), the Rust-based, open-source language server. I use it in VSCode via its official extension. I do not use AI for e-mails, comments, replies, I don't have AI write for or pretend to be me.

If I do want to use an LLM, I used to use Perplexity, Duck.AI or ChatGPT - mainly Perplexity because it shows the web search results better - but now since Perplexity and Duck.AI are enforcing rate-limits for logged-out users, I decided to try local LLMs again, and now I use [Alpaca](https://flathub.org/en/apps/com.jeffser.Alpaca), with its Ollama plugin, and I run [Qwen3 (0.6B parameters)](https://huggingface.co/Qwen/Qwen3-0.6B) and [Triangle104/InternVL3-1B-Instruct-Q4_K_M-GGUF (0.6B parameters)](https://huggingface.co/Triangle104/InternVL3-1B-Instruct-Q4_K_M-GGUF), since they run surprisingly fast on my GTX 1650 GPU, in short ~50W bursts per response, using roughly ~700MB of VRAM or so, at least from me looking at `nvtop`'s statistics. Both models are Apache 2.0-licensed. And I also run [GPT-2 medium (355M parameters)](https://huggingface.co/openai-community/gpt2-medium) through [ggml](https://github.com/ggml-org/ggml) for my own entertainment, sometimes it generates some funny stuff, even though it's *obviously* just quoting paragraphs from its owned trained datasets at times, and has no real NLP.

That said, I reiterate that I don't use AI slop for my blog posts, and I'll never publish AI-generated imagery or text to this blog. And I don't even dare touch AI-gen music, that's the lowest form of slop IMO, it's so obviously bad even in 2026, I just block it in YTM, but it still shows up in the play queue, so I'm always vigilant regarding what songs I listen to.

I recognize the possibilities of this tech, I did play around with [Suno AI](https://suno.com/home) for a day back at the beginning of 2025 to see what's all the fuss about, and I wasn't impressed in the slightest. It's cool that we've managed to create large language models that can spit out human-adjacent text that may even seem convincing at times, but I'm wholly against it in the current way it's still being hyped, as part of the 'AI' bubble that I can't help but hope that it pops any day now, because it's taken away accessible RAM and HDDs from consumers. I advocate for ethical generative tool use, and I can't help but hope that some open-source LLM trained on only open, properly-licensed data will someday be available for general use. [KL3M](https://aleainstitute.ai/work/kl3m-data-project/) is an AI model family that claims to use 'copyright-clean' training resources, but it's mainly intended for some very basic legal text (*and any response from KL3M should not be taken as legal advice*), and while I would love to try it out, I couldn't convert its [safetensors model](https://huggingface.co/alea-institute/kl3m-003-1.7b) to .gguf so that I could run it through Alpaca.

**LLMs are NOT intelligent, they have no conscience, thoughts, rationality, they are not human, or even human-adjacent. LLMs do not 'understand', have no concept of thought or a mind. Anyone that's telling you otherwise is a moron that has no idea how LLMs operate, and the underlying tech that is used to power LLMs. Fuck those people, do not listen to them.**

[More on my thoughts about AI]({{ site.baseurl }}/posts/2026-01-10-AI-Musings.html)