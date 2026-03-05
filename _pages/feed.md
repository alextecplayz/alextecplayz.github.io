---
templateEngineOverride: liquid
postid_alt: RSSFeed
permalink: /feed.xml
lang: en
locale: en_US
title: "feed"
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
	<channel>
		<description>My site. It has a blog.</description>
		<link>https://alextecplayz.com/</link>
		<title>AlexTECPlayz' Blog</title>
		<category>Tech</category>
		<copyright>Copyright 2020-2026 AlexTECPlayz. All rights reserved.</copyright>
		<docs>https://www.rssboard.org/rss-specification</docs>
		<generator>11ty (Eleventy)</generator>
		<image>
			<link>https://alextecplayz.com/</link>
			<title>AlexTECPlayz' Blog</title>
			<url>{{ site.baseurl }}/favicon/favicon-32x32.png</url>
			<description>Read my posts via RSS</description>
			<height>32</height>
			<width>32</width>
		</image>
		<language>en</language>
		{% for item in collections.feedItems %}<item>{% if item.isVideo %}
					<title><![CDATA[{{ item.data.title }}]]></title>
					<link>https://www.youtube.com/watch?v={{ item.data.url }}</link>
					<description><![CDATA[{{ item.data.description }}]]></description>
					<pubDate>{{ item.date | dateToRfc822 }}</pubDate>
					<guid>{{ item.data.id }}</guid>{% elsif item.isNote %}{% assign note = collections.notes | findByInputPath: item.inputPath %}
					<title><![CDATA[{{ item.data.title }}]]></title>
					<link>{{ site.baseurl }}{{ item.data.url }}</link>
					<description><![CDATA[{{ item.data.description }}]]></description>
					<pubDate>{{ item.date | dateToRfc822 }}</pubDate>
					<content:encoded><![CDATA[{{ note.templateContent }}]]></content:encoded>
					<guid>{{ item.data.postid }}</guid>{% else %}{% assign post = collections.posts | findByInputPath: item.inputPath %}
					<title><![CDATA[{{ item.data.title }}]]></title>
					<link>{{ site.baseurl }}{{ item.data.permalink }}</link>
					<description>{{ item.data.description }}</description>
					<pubDate>{{ item.date | dateToRfc822 }}</pubDate>
					<content:encoded><![CDATA[{{ post.templateContent }}]]></content:encoded>
					<guid>{{ item.data.postid }}</guid>{% endif %}
					{% for category in item.data.categories %}<category>{{ category | downcase }}</category>{% endfor %}
			</item>{% endfor %}
	</channel>
</rss>