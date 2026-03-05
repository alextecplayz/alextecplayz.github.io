import { promises as fs } from 'fs';
import { join, resolve } from 'path';

export default async function (eleventyConfig) {
  const iconsDir = 'images/custom_emojis';
  eleventyConfig.addAsyncShortcode('emoji', async function(iconName) {
	const extList = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
	let foundExt;
	for (const ext of extList) {
	  const fullPath = resolve(iconsDir, `${iconName}${ext}`);
	  try {
		await fs.access(fullPath);
		foundExt = ext;
		break;
	  } catch {
		// Continue to next extension
	  }
	}
	if (!foundExt) {
	  console.warn(`Icon "${iconName}" not found in ${iconsDir}`);
	  return `<span title="Icon: ${iconName}">?</span>`;
	}
	const urlPath = `/images/custom_emojis/${iconName}${foundExt}`;
	return `<img src="${urlPath}" alt="${iconName}" class="emoji" loading="lazy" width="24" height="24">`;
  });
}