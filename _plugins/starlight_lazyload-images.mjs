import { JSDOM } from "jsdom";

export default function(eleventyConfig) {
  eleventyConfig.addTransform('lazyload-images', function(content, outputPath) {
	// Only process HTML files
	if (!outputPath.endsWith('.html') || !content.includes('<img')) {
	  return content;
	}

	const dom = new JSDOM(content, { contentType: 'text/html' });
	const document = dom.window.document;
	const images = [...document.querySelectorAll('img')];

	images.forEach(img => {
	  // Skip excluded images
	  if (img.classList.contains('header-logo')) {return;}
	  // Add lazy loading if not already present
	  if (!img.hasAttribute('loading')) {
		img.setAttribute('loading', 'lazy');
	  }
	});

	return '<!DOCTYPE html>' + document.documentElement.outerHTML;
  });
}