import { deleteSync as fullclean } from 'del';
import feedPlugin  from '@11ty/eleventy-plugin-rss';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItFootnote from 'markdown-it-footnote';
import pluginTOC from 'eleventy-plugin-toc';
import pluginIcons from 'eleventy-plugin-icons';
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import CleanCSS from 'clean-css';
import autoTooltips from './_plugins/starlight_auto-tooltips.mjs';
import feedHelper from './_plugins/starlight_feed.mjs';
import mediaEmbedGen from './_plugins/starlight_media-embeds.mjs';
import nonceGenerator from './_plugins/starlight_nonce-gen.mjs';
import redactHook from './_plugins/starlight_redact-hook.mjs';
import shareSheetNoJS from './_plugins/starlight_nojs-sharesheet.mjs';
import customEmojis from './_plugins/starlight_custom-emojis.mjs';

export default async function (eleventyConfig) {
	fullclean('_site/*');
	let markdownItOpts = {html: true, breaks: true, linkify: false}
	eleventyConfig.setLibrary('md', markdownIt(markdownItOpts).use(markdownItAnchor).use(markdownItFootnote));
	eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		wrapper: 'div',
		wrapperClass: '',
		flat: true,
	});
	eleventyConfig.addPlugin(pluginIcons, {
		mode: 'inline',
		sources: [
			{name: 'lucide', path: 'node_modules/lucide-static/icons'},
			{name: 'lucide-lab', path: 'node_modules/@lucide/lab/icons'},
		],
		icon: {
			class: (name, source) => `emoji`,
		},
	});
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(autoTooltips);
	eleventyConfig.addPlugin(feedHelper);
	eleventyConfig.addPlugin(mediaEmbedGen);
	eleventyConfig.addPlugin(nonceGenerator);
	eleventyConfig.addPlugin(redactHook);
	eleventyConfig.addPlugin(shareSheetNoJS);
	eleventyConfig.addPlugin(customEmojis);
	eleventyConfig.setLiquidOptions({dynamicPartials: true, strict_filters: true,})
	// Collections for posts, tags, categories, etc.
	eleventyConfig.addCollection("pages", collection => {return collection.getFilteredByGlob('./_pages/*.md');});
	eleventyConfig.addCollection("posts", collection => collection.getFilteredByGlob('./_posts/*.md').sort((a, b) => b.date - a.date));
	eleventyConfig.addCollection("notes", (collection) => collection.getFilteredByGlob("./_notes/*.md"));
	// Filters
	eleventyConfig.addFilter("cssmin", function (code) {return new CleanCSS({}).minify(code).styles;});
	// Liquid filters
	eleventyConfig.addLiquidFilter("filterByTag", (posts, tag) => {return posts.filter(post => post.data.tags.includes(tag));});
	eleventyConfig.addLiquidFilter("getPostByID", function(posts, postID) {return posts.find(post => post.data.postid === postID) || null;});
	// getting post by ID is significantly easier than a for loop each time.
	// post IDs are of this format:
	// PA - Page / PO - Post / NO - Note / VD - Video + YYMMDD-XX
	eleventyConfig.addLiquidFilter("getPostByAltID", function(posts, postAltID) {return posts.find(post => post.data.postid_alt === postAltID) || null;});
	// alternate post ID, for specific posts, such as SapphireThread, AndroidGuide, About, Changelog
	eleventyConfig.addLiquidFilter("getRandomPost", function(posts) {
		if (!posts || posts.length === 0) return null;
		const randomIndex = Math.floor(Math.random() * posts.length);
		return posts[randomIndex];
	});
	eleventyConfig.addLiquidFilter("dateToRfc3339", feedPlugin.dateToRfc3339);
	eleventyConfig.addLiquidFilter("dateToRfc822", feedPlugin.dateToRfc822);
	// Copy folders wholesale
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("favicon");
	eleventyConfig.addPassthroughCopy("fonts");
	eleventyConfig.addPassthroughCopy("images");
	eleventyConfig.addPassthroughCopy("cv.txt");
	eleventyConfig.addPassthroughCopy("cv.pdf");
	eleventyConfig.addPassthroughCopy("ai.txt");
	eleventyConfig.addPassthroughCopy("robots.txt"); // just making sure, but they're already added by default
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	// Shortcodes
	// Discover Environment Liquid Shortcode
	// https://kittygiraudel.com/2020/11/30/from-jekyll-to-11ty/
	// {% production %}on prod!{% endproduction %}
	eleventyConfig.addPairedShortcode('production', content => process.env.ELEVENTY_RUN_MODE === "build" ? content : undefined)
	eleventyConfig.addPairedLiquidShortcode("aside", function(content, postIdArg) {
		const md = new markdownIt();
		const htmlContent = md.render(content);
		return `<aside class="aside-content monospace lightgray rem1"><p class="monospace bold rem1 hidden-on-desktop">Aside for paragraph below:</p>${htmlContent}</aside>`;
	});
	eleventyConfig.addPairedLiquidShortcode("portfolio-grid-element", function(content) {
		return `<div class="article column">${content}</div>`;
	});
	eleventyConfig.addPairedLiquidShortcode("markdownIt", function(content) {
		const md = new markdownIt();
		const htmlContent = md.render(content);
		return `${htmlContent}`;
	})
	return {
		passthroughFileCopy: true,
		dir: {
			input: ".",
			includes: "_includes",
			output: "_site",
		}
	}
}
