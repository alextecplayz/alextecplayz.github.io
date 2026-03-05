export default function(eleventyConfig) {
	eleventyConfig.addTransform("injectShareDialogs", (content, outputPath) => {
		if (!outputPath?.endsWith('.html')) return content;
		const allMatches = [...content.matchAll(/<a\b[^>]*data-share-url=["']([^"']+)["'][^>]*data-share-title=["']([^"']+)["'][^>]*data-share-description=["']([^"']+)["'][^>]*data-share-date=["']([^"']+)["'][^>]*data-share-thumbnail=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)];
		if (allMatches.length === 0) return content;
		const foundShares = [];
		let updatedContent = content;
		allMatches.forEach((match, index) => {
			const [, url, title, desc, date, thumb, innerHTML] = match;
			const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50);
			const slug = `${cleanTitle}-${Date.now()}-${index}`;
			const buttonHTML = `<a class="share-trigger article-button-light monospace medium pointer" href="#share-${slug}" id="share-link-${slug}">${innerHTML}</a>`;
			updatedContent = updatedContent.replace(match[0], buttonHTML);
			foundShares.push({slug, url, title, desc, date, thumb});
		});
		if (foundShares.length === 0) return content;
		let shareDialogs = '';
		foundShares.forEach(({slug, url, title, desc, date, thumb}) => {
			const fullInfo = `Post by AlexTECPlayz on ${date} titled "${title}".\n\nDescription:\n${desc}\n\nRead the post on her blog: https://alextecplayz.com${url}`;
			shareDialogs += `
<div id="share-${slug}" class="share-dialog">
	<div class="pop-up share-pop-up z-index100">
		<div class="pop-up-content open">
			<div class="pop-up-content-titlebar">
				<p class="flex centered grotesk semibold rem2 white pop-up-title">Share this</p>
				<a class="article-button-dark button-modal grotesk medium" href="#share-link-${slug}" title="Close the share sheet">Close</a>
			</div>
			<div class="pop-up-scrollbox">
				<div class="article flexrow-to-col">
					<div class="article-left">
						<img class="article-image-size" src="${thumb}" alt="${title}">
					</div>
					<div class="article-right">
						<p class="article-title rem2 white boldonse semibold">${title}</p>
						<p class="article-desc rem1 lightgray semibold monospace italic">${desc}</p>
						<p class="article-date rem1 lightgray grotesk bold">${date}</p>
					</div>
				</div>
			</div>
			<div class="flex column monospace rem1-25 lightgray medium">
				<a class="masto-follow-btn monospace medium" href="https://share.joinmastodon.org/#text=Post by AlexTECPlayz on ${date} titled ${title}. Read the post on her blog: https://alextecplayz.com${url}" target="_blank" rel="noopener">Share on <img src="/images/custom_emojis/mastodon-white.webp" alt="mastodon-white" class="emoji" loading="lazy" width="24" height="24"> Mastodon</a>
				<div class="copy-section">
					<p class="semibold white">Copy link to page:</p>
					<input aria-labelledby="input-${slug}" type="text" readonly class="copy-field monospace rem1-25 lightgray medium" value="https://alextecplayz.com${url}">
					<span id="input-${slug}" class="hidden">This is a text box where the URL of the post you're about to share can be selected entirely using CTRL+A and copied in order to be shared to a different platform. The text box reads: https://alextecplayz.com${url}</span>
				</div>
				<div class="copy-section">
					<p class="semibold white">Copy additional information:</p>
					<textarea aria-labelledby="label-${slug}" readonly class="copy-field monospace rem1-25 lightgray medium" rows="5">${fullInfo}</textarea>
					<span id="label-${slug}" class="hidden">This is a text box where full information about the post you're about to share can be selected entirely using CTRL+A and copied in order to be shared a different platform. The text box reads: ${fullInfo}</span>
				</div>
				<p>Click or tap in the text field and select all (CTRL+A) / "Select All", you can then copy this and share it anywhere.</p>
			</div>
		</div>
	</div>
</div>\n`;
		});
		return updatedContent.replace(/<div[^>]*id=["']share-section["'][^>]*>/i, `$&${shareDialogs}`);
	});
}