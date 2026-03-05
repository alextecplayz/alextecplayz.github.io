export default function (eleventyConfig) {
	eleventyConfig.addPairedShortcode('video', function(content) {
		const lines = content.trim().split('\n').map(line => line.trim()).filter(Boolean);
		const siteBaseurl = this.page || this.ctx ? (this.page.site?.baseurl || this.ctx?.site?.baseurl || '') : '';
		let html = '<div class="flex row overflow-scroll" vocab="https://schema.org/" typeof="VideoObject" itemscope itemtype="https://schema.org/VideoObject">';
		lines.forEach(line => {
			const pathMatch = line.match(/^(\S+)/);
			const path = pathMatch ? pathMatch[1] : '';
			const vidPath = path.startsWith('http') ? path : `${siteBaseurl}${path}`;
			const attrs = {};
			const attrMatches = line.match(/(\w+)=["]([^"]+)["]/g);
			if (attrMatches) {
				attrMatches.forEach(attr => {
					const match = attr.match(/(\w+)=["]([^"]+)["]/);
					if (match) {
						attrs[match[1]] = match[2];
					}
				});
			}
			html += `
			<figure class="image-frame">
				<video property="contentUrl" itemprop="contentUrl" class="post-image-size" src="${vidPath}" alt="${attrs.alt || 'There is no alt text provided for this video'}" title="${attrs.title || 'There is no title provided for this video'}" loop="true" controls playsinline="true" preload="metadata">
				<span class="hidden" property="license" itemprop="license">${attrs.license || "https://alextecplayz.com/licensing.html"}</span>
				<span class="hidden" property="acquireLicensePage" itemprop="acquireLicensePage">https://alextecplayz.com/licensing.html</span>
				<span class="hidden" property="copyrightNotice" itemprop="copyrightNotice">${attrs.copyright || 'Unknown'}</span>
				<span class="hidden" property="creditText" itemprop="creditText">${attrs.credit || 'Unknown'}</span>
				<span class="hidden" rel="schema:creator">
					<span typeof="schema:Person" itemprop="creator" itemtype="https://schema.org/Person" itemscope>
						<span property="schema:name" itemprop="name" content="${attrs.name || 'Unknown person(s)'}"></span>
					</span>
				</span>
				<div class="image-frame-buttons">`;
			if (!attrs.maximize || attrs.maximize === 'true') {
				html += `
					<a class="image-frame-button rem1 bold grotesk" href="${vidPath}" title="Maximize the image">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
					</a>`;
	  		}
			if (attrs.fullrespath) {
				const fullresPath = attrs.fullrespath;
				html += `
					<a class="image-frame-button rem1 bold grotesk" href="${fullresPath}" title="Full resolution">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-upscale"><path d="M16 3h5v5"></path><path d="M17 21h2a2 2 0 0 0 2-2"></path><path d="M21 12v3"></path><path d="m21 3-5 5"></path><path d="M3 7V5a2 2 0 0 1 2-2"></path><path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19"></path><path d="M9 3h3"></path><rect x="3" y="11" width="10" height="10" rx="1"></rect></svg>
					</a>`;
			}
			html += `
				</div>
			</figure>`;
		});
		html += '</div>';
		return html;
	});
	eleventyConfig.addPairedShortcode('gallery', function(content) {
		const lines = content.trim().split('\n').map(line => line.trim()).filter(Boolean);
		const siteBaseurl = this.page || this.ctx ? (this.page.site?.baseurl || this.ctx?.site?.baseurl || '') : '';
		let html = '<div class="flex row overflow-scroll" vocab="https://schema.org/" typeof="ImageObject" itemscope itemtype="https://schema.org/ImageObject">';
		lines.forEach(line => {
			const pathMatch = line.match(/^(\S+)/);
			const path = pathMatch ? pathMatch[1] : '';
			const imgPath = path.startsWith('http') ? path : `${siteBaseurl}${path}`;
			const attrs = {};
			const attrMatches = line.match(/(\w+)=["]([^"]+)["]/g);
			if (attrMatches) {
				attrMatches.forEach(attr => {
					const match = attr.match(/(\w+)=["]([^"]+)["]/);
					if (match) {
						attrs[match[1]] = match[2];
					}
				});
			}
			html += `<div class="flex column">
				<figure class="image-frame">
					<img property="contentUrl" itemprop="contentUrl" class="post-image-size" src="${imgPath}" alt="${attrs.alt || 'There is no alt text provided for this image'}" title="${attrs.title || 'There is no title provided for this image'}" loading="lazy">
					<span class="hidden" property="license" itemprop="license">${attrs.license || "https://alextecplayz.com/licensing.html"}</span>
					<span class="hidden" property="acquireLicensePage" itemprop="acquireLicensePage">https://alextecplayz.com/licensing.html</span>
					<span class="hidden" property="copyrightNotice" itemprop="copyrightNotice">${attrs.copyright || 'Unknown'}</span>
					<span class="hidden" property="creditText" itemprop="creditText">${attrs.credit || 'Unknown'}</span>
					<span class="hidden" rel="schema:creator">
						<span typeof="schema:Person" itemprop="creator" itemtype="https://schema.org/Person" itemscope>
							<span property="schema:name" itemprop="name" content="${attrs.name || 'Unknown person(s)'}"></span>
						</span>
					</span>
					<div class="image-frame-buttons">`;
			if (!attrs.maximize || attrs.maximize === 'true') {
				html += `<a class="image-frame-button rem1 bold grotesk" href="${imgPath}" title="Maximize the image"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg></a>`;
	  		}
			if (attrs.fullrespath) {
				const fullresPath = attrs.fullrespath;
				html += `<a class="image-frame-button rem1 bold grotesk" href="${fullresPath}" title="Full resolution"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-upscale"><path d="M16 3h5v5"></path><path d="M17 21h2a2 2 0 0 0 2-2"></path><path d="M21 12v3"></path><path d="m21 3-5 5"></path><path d="M3 7V5a2 2 0 0 1 2-2"></path><path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19"></path><path d="M9 3h3"></path><rect x="3" y="11" width="10" height="10" rx="1"></rect></svg></a>`;
			}
			if (attrs.alt) {html += `<p class="image-frame-alt rem0-75 lightgray monospace medium"><strong>ALT:</strong>&nbsp;${attrs.alt}</p>`;}
			html += `
					</div>
				</figure>`;
			if (attrs.caption) {html += `<p class="image-frame-caption rem1 lightgray monospace medium">${attrs.caption}</p>`;}
			html += `
			</div>`;
		});
		html += '</div>';
		return html;
	});
	eleventyConfig.addPairedShortcode('atpads', function(content) {
		const lines = content.trim().split('\n').map(line => line.trim()).filter(Boolean);
		const siteBaseurl = this.page || this.ctx ? (this.page.site?.baseurl || this.ctx?.site?.baseurl || '') : '';
		let html = '<p class="medium rem1 lightgray italic"><< The content continues after these non-sponsored (and totally legit!1!!) advertisements >></p><div class="atpads-container slop" vocab="https://schema.org/" typeof="ImageObject" itemscope itemtype="https://schema.org/ImageObject">';
		lines.forEach(line => {
			const pathMatch = line.match(/^(\S+)/);
			const path = pathMatch ? pathMatch[1] : '';
			const imgPath = path.startsWith('http') ? path : `${siteBaseurl}${path}`;
			const attrs = {};
			const attrMatches = line.match(/(\w+)=["]([^"]+)["]/g);
			if (attrMatches) {
				attrMatches.forEach(attr => {
					const match = attr.match(/(\w+)=["]([^"]+)["]/);
					if (match) {
						attrs[match[1]] = match[2];
					}
				});
			}
			html += `
			<figure class="image-frame">
				<img property="contentUrl" itemprop="contentUrl" class="post-image-size" src="${imgPath}" alt="${attrs.alt || 'There is no alt text provided for this image'}" title="${attrs.title || 'There is no title provided for this image'}" loading="lazy">
				<span class="hidden" property="license" itemprop="license">${attrs.license || "https://alextecplayz.com/licensing.html"}</span>
				<span class="hidden" property="acquireLicensePage" itemprop="acquireLicensePage">https://alextecplayz.com/licensing.html</span>
				<span class="hidden" property="copyrightNotice" itemprop="copyrightNotice">${attrs.copyright || 'Unknown'}</span>
				<span class="hidden" property="creditText" itemprop="creditText">${attrs.credit || 'Unknown'}</span>
				<span class="hidden" rel="schema:creator">
					<span typeof="schema:Person" itemprop="creator" itemtype="https://schema.org/Person" itemscope>
						<span property="schema:name" itemprop="name" content="${attrs.name || 'Unknown person(s)'}"></span>
					</span>
				</span>
				<div class="image-frame-buttons">`;
			if (!attrs.maximize || attrs.maximize === 'true') {
				html += `
					<a class="image-frame-button rem1 bold grotesk" href="${imgPath}" title="Maximize the image">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
					</a>`;
	  		}
			if (attrs.fullrespath) {
				const fullresPath = attrs.fullrespath;
				html += `
					<a class="image-frame-button rem1 bold grotesk" href="${fullresPath}" title="Full resolution">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-upscale"><path d="M16 3h5v5"></path><path d="M17 21h2a2 2 0 0 0 2-2"></path><path d="M21 12v3"></path><path d="m21 3-5 5"></path><path d="M3 7V5a2 2 0 0 1 2-2"></path><path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19"></path><path d="M9 3h3"></path><rect x="3" y="11" width="10" height="10" rx="1"></rect></svg>
					</a>`;
			}
			if (attrs.alt) {html += `<p class="image-frame-caption rem0-75 lightgray monospace medium">${attrs.alt}</p>`;}
			html += `
				</div>
			</figure>`;
		});
		html += '</div>';
		return html;
	});
}