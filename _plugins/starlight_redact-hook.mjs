export default function(eleventyConfig) {
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(function(md) {
			const regex = /\/\/\/*(.+?)\/\/\//gi;
			const originalRender = md.render.bind(md);

			md.render = function(src, env) {
				const replacedSrc = src.replace(regex, (match, innerText) => {
					const blocks = "█".repeat(innerText.length);
					return `<span class="redacted">${blocks}</span>`;
				});
				return originalRender(replacedSrc, env);
			};

			return md;
		});
	});
};