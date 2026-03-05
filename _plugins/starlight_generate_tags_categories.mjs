import fs from "fs";
import path from "path";

export default function generateTagsAndCategoriesPlugin(eleventyConfig) {
	const baseDir = "./";
	const dataDir = path.join(baseDir, "_data");
	let tags = [];
	let categories = [];

	try {
		tags = JSON.parse(fs.readFileSync(path.join(dataDir, "allTags.json"), "utf-8"));
	} catch (e) {
		console.warn("Could not read _data/allTsags.json or invalid JSON:", e);
	}

	try {
		categories = JSON.parse(fs.readFileSync(path.join(dataDir, "allCategories.json"), "utf-8"));
	} catch (e) {
		console.warn("Could not read _data/allCategories.json or invalid JSON:", e);
	}

	function slugify(str) {
		return String(str)
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\w\-]+/g, "")
			.replace(/\-\-+/g, "-")
			.replace(/^-+/, "")
			.replace(/-+$/, "");
	}

	function writeFile(relativePath, content) {
		const fullPath = path.join(baseDir, relativePath);
		const dir = path.dirname(fullPath);
		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(fullPath, content);
	}

	function createCategoryPage(category) {
		const slug = slugify(category);
		const content = `---
layout: category
permalink: /categories/${slug}.html
title: Items in the "${category}" category
description: Just a page listing all items in the "${category}" category
category: ${category}
---`;
		const filepath = path.join("categories", `${slug}.md`);
		writeFile(filepath, content);
	}

	function createTagPage(tag) {
		const slug = slugify(tag);
		const content = `---
layout: tag
permalink: /tags/${slug}.html
title: Items with the "${tag}" tag
description: Just a page listing all items with the "${tag}" tag
tag: ${tag}
---`;
		const filepath = path.join("tags", `${slug}.md`);
		writeFile(filepath, content);
	}

	categories.forEach(createCategoryPage);
	tags.forEach(createTagPage);

	console.info(`Generated ${categories.length} categories and ${tags.length} tags.`);
};