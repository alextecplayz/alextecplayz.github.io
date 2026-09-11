export default async function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode('emoji', async function(iconName) {
	const urlPath = `https://raw.githubusercontent.com/alextecplayz/alextecplayz.github.io-media/refs/heads/main/assets/custom_emojis/${iconName}`;
	return `<img src="${urlPath}" alt="${iconName}" class="emoji" loading="lazy" width="24" height="24"/>`;
  });
}
