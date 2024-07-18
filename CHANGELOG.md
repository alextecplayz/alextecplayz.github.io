# Cassowary Changelog

## [1.5.11] | Schema
  - fixed FC6 thumbnail which was apparently smaller than the rest
  - Added Schema.org stuff for Article, Review, Author

## [1.5.1] | Small changes
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

## [1.5] | CassowaryV2 - PROPER website refresh
  - Uses Jekyll to significantly reduce development and iteration time, blog posts can be written much faster in Markdown now
  - Updated Obsidian Design System
  - Removed PWA, A2H support (they're not needed in my case)
  - Much faster, much more efficient
  - New page thumbnails
  - Stopped using a grid-like layout, posts are listed one per row now
  - Games, projects were all moved to the Vanta Interactive website

## [1.0] | CassowaryV2 - Website refresh (using my own design system and methods)
  - Uses Obsidian design system
  - Modern interface that suits my needs
  - PWA install pop-up on Mobile and Desktop
  - PWA support
  - A2H (Add to home) support
  - New post layouts that will be used soon
  - New page layouts that will be used soon
  - Efficient service worker
  - Efficient and fast page loading

## [0.9] | CassowaryV2 - Website refresh
  - Uses Obsidian design system
  - Modern interface
  - Most posts will be ported by the time 1.0 is released
  0.9 is a temporary release that isn't supposed to have all the features listed in 1.0 (above)

## [1.0] | CassowaryV1 - Initial website (using Jekyll and minimal-mistakes)
  - Uses custom design system
  - Modern interface
  - Uses Jekyll
  - Theming support
  - Efficient and fast page loading
