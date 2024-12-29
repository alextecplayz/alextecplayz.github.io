---
layout: post
type: page
lang: en
locale: en_US
title: "Changelog"
description: "Website changelog, from version 1.0 to the latest release."
date: 2024-12-21
categories:
  - Page
tags:
  - Changelog
  - Website
image_banner_link:
image_banner_alt:
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: <a class="header-button monospace semibold" href="#landing">Top</a><br>
---

## [1.7.0] | Search, Mobile (Dec 25, 2024)
 - Added (almost) full-text search based on a revamped version of [project searchlight](https://github.com/alextecplayz/proto-searchlight)
 - Revamped sitemap to use custom `Vedalia` namespace with custom XML tags that make search all that more capable
 - Revamped the mobile UI, using a bottom navigation bar, and some screen sizing improvements
 - Using Lucide Icons
 - Added support for Effects, currently available are Vignette, Rain and Snow, all three of which look delightful
 - Updated all pages and posts to support Vedalia tags, using the new `type: pagetype` which corresponds to the `vedalia:type` XML tag
 - Expanded the JS for `common.js` for better readability, added comments, and using a minimized version in production.
 - Re-added PWA manifest, PWAs are great.
 - Share pop-ups and share sheets!
 - Custom emojis! :atp: :vi-wb:

## [1.6.0] (Nov 28, 2024 / e532b77)
 - Accessibility improvements on the home page, now using the `title` attribute in HTML for the 88x31 banners
 - Added `id` attributes to the portfolio sections, so they can be linked properly
 - Added /llms.txt as per [llms-txt](https://llmstxt.org/) that offers some quick information to LLMs that might browse the site (willingly or unwillingly, [violating my license](https://github.com/alextecplayz/alextecplayz.github.io/blob/main/LICENSE) unless they *pay* me)

## [1.6.0] (Nov 17, 2024 / b6cb01f)
 - Small updates and changes to /about, /recommends, /uses, and to CSS

## [1.6.0] (Oct 25, 2024 / 70330ea)
 - Remove the expand plugin's liquid tags because GitHub Pages fails to serve the site otherwise. This means the plugin is therefore unused in production, but it still is used in development to easily generate tables before replacing them with the built HTML.

## [1.6.0] | Fediverse (Oct 25, 2024 / 8f2e13c)
 - Website now supports loading comments from the Fediverse in an iframe (*as normal website security rules may prevent content such as images to load, otherwise*)
 - Updated themes and theme names (Light becomes Calcite White, Dark becomes Obsidian Gray, AMOLED Black stays the same), with new themes: Catppuccin Latte, Frappe, Macchiato and Mocha, with more to come soon.
 - Added more features that can be supported through the `head` include: feature-theming, feature-nofooter and feature-iframe
 - Misc changes for workflows: removed lighthouse-analysis.yml, stale.yml, generator-generic-ossf-slsa3-publish.yml and renamed jekyll-build-pages.yml to jekyll.yml
 - Created a new Jekyll (Ruby) plugin: expand.rb that's supposed to create `<details>` elements using Jekyll markup

## [1.5.3] | Notes, Recommends and Theming (Aug 14, 2024 / 8f9f7ba)
 - Added /notes, /recommends pages
 - Added settings modal, theme selection with Light, Dark and AMOLED Black (more themes will be added soon enough)
 - one more 88x31 banner (seirdy.one)
 - CSS cleanup
 - /uses refactored, with a "What I don't recommend using" section
 - fixed some alt text issues
 - more CSS changes for mobile screen sizing

## [1.5.2] | Portfolio (Jul 25, 2024 / cbcd17d)
 - Added portfolio page and subpages for Project Anubis, Frosted Planet and a miscellaneous voxel showcase
 - Removed any mentions of DM Sans and replaced them with Space Grotesk, and replaced Outfit with Space Mono, in a slight brand update
 - Updated /uses with more items
 - Using .webp images for portfolio

## [1.5.11] | Schema (Jul 18, 2024 / be227da)
 - fixed FC6 thumbnail which was apparently smaller than the rest
 - Added Schema.org stuff for Article, Review, Author

## [1.5.1] | Small changes (Jul 17, 2024 / a36c2b5)
 - Improvements to robots.txt, now very comprehensive and granular
 - Improved /about, /uses
 - Images have a smaller size, after compression
 - Following many Google Lighthouse tips
 - CSP policy, XSS hardening, Document policy
 - nonce-gen.rb Jekyll plugin written to generate the nonce every time the site is built, this value is used by the `site.data.nonce` Liquid value
 - Replaced external ImgBB images and 88x31 banners with GitHub-hosted .WEBP variants instead of .PNG (and/or .JPG) that massively reduce the storage size, improve download speed and less data consumption
 - Some behind-the-scenes prepwork for more features for articles
 - Some small JS unifications for insert-banners and sticky-header
 - Gemfile is updated, it *shouldn't* cause the GH Jekyll builder to fail
 - Removed Johnvertisement banner
 
## [2024-06-01] | Website update (May 31, 2024 / 54c65c3)
 - Updated license with no AI scraping clause
 - Created two new posts: "Announcing Prisonia" and "Vanta Interactive turns SIX!"
 - Added 88x31 banners
 - Updated /uses, /support
 - Preliminary Portfolio page

## [1.5] | CassowaryV2 - PROPER website refresh (Apr 10, 2024 / 9270f75)
 - Uses Jekyll to significantly reduce development and iteration time, blog posts can be written much faster in Markdown now
 - Updated Obsidian Design System
 - Removed PWA, A2H support (they're not needed in my case)
 - Much faster, much more efficient
 - New page thumbnails
 - Stopped using a grid-like layout, posts are listed one per row now
 - Games, projects were all moved to the Vanta Interactive website
 - Code highlighting using `highlight.js`
 - Sticky ToC (table of contents) on eligible pages and posts

## [1.0] | CassowaryV2 - Website refresh (using my own design system and methods) (Dec 17, 2022 / 73fdaf5)
 - Uses Obsidian design system
 - Modern interface that suits my needs
 - PWA install pop-up on Mobile and Desktop
 - PWA support
 - A2H (Add to home) support
 - New post layouts that will be used soon
 - New page layouts that will be used soon
 - Efficient service worker
 - Efficient and fast page loading

## [0.9] | CassowaryV2 - Website refresh (Dec 16, 2022 / 4fc5881)
 - Uses Obsidian design system
 - Modern interface
 - Most posts will be ported by the time 1.0 is released
 - 0.9 is a temporary release that isn't supposed to have all the features listed in 1.0 (above)

## [1.0] | CassowaryV1 - Initial website (using Jekyll and minimal-mistakes)
 - Uses custom design system
 - Modern interface
 - Uses Jekyll
 - Theming support
 - Efficient and fast page loading
