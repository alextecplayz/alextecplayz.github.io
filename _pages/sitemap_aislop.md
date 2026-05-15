---
templateEngineOverride: liquid
postid_alt: Sitemap
permalink: /sitemap_all.xml
lang: en
locale: en_US
title: "Sitemap"
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	{% for item in collections.posts_slop %}<url><loc>{{ site.baseurl }}{{ item.data.permalink }}</loc></url>{% endfor %}
</urlset>
