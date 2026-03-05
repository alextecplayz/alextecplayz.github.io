// Inspired by https://github.com/RichDom2185/jekyll-auto-tooltips/
// then adapted from my own Ruby plugin into 11ty JS
// with a different approach, since I couldn't wrangle 11ty into
// doing it properly without having some sort of impact on the DOM
// like leaving empty text in the div, instead of inserting them
// into <p> elements.

import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import fs from "fs";
import path from "path";

const tooltipsPath = path.resolve("./_data/tooltips.json");
const tooltips = JSON.parse(fs.readFileSync(tooltipsPath, "utf-8"));

export default function (eleventyConfig) {
	const tooltipMap = tooltips.reduce((acc, tooltip) => {
		acc[tooltip.name.toLowerCase()] = tooltip.desc.join("\n").replace(/"/g, '&quot;');
		return acc;
	}, {});

	const tooltipRegex = /\[\[\:*(.+?)\:(.+?)\]\]/gi;

	const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true,
	}).use(markdownItAnchor);

	eleventyConfig.addTransform("injectTooltips", (content, outputPath) => {
		if (!outputPath || !outputPath.endsWith(".html")) return content;
		const foundKeys = new Set();
		const replacedContent = content.replace(tooltipRegex, (match, key, label) => {
			key = key.trim().toLowerCase();
			label = label.trim();
			if (tooltipMap[key]) {
				foundKeys.add(key);
				return `<a href="#glossary-${key}" id="tooltip-${key}" class="def-tooltip-link" aria-label="Definition of ${label}">${label}</a>`;
			}
			return match;
		});
		let glossaryHtml = '<div class="tooltips-container">\n';
		foundKeys.forEach((key) => {
			const rawMarkdown = tooltipMap[key];
			const renderedDesc = md.render(rawMarkdown).trim();
			glossaryHtml += `  <div id="glossary-${key}" class="def-tooltip-popup post post-content monospace" hidden><a href="#tooltip-${key}" class="tooltip-close" title="Return to term">Close tooltip</a>${renderedDesc}</div>\n`;
		});
		glossaryHtml += '</div>\n';
		return replacedContent.replace(
			/<div[^>]*id=["']tooltips-box["'][^>]*>/i,
			`$&${glossaryHtml}`
		);
	});
}