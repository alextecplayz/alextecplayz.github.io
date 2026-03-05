import fs from "fs";
import path from "path";
export default function (eleventyConfig) {
	//const baseDir = "./";
	//const dataDir = path.join(baseDir, "_data");
	//let videos = [];
	//try {
	//	videos = JSON.parse(fs.readFileSync(path.join(dataDir, "videos.json"), "utf-8"));
	//} catch (e) {
	//	console.warn("Could not read _data/videos.json or invalid JSON:", e);
	//}
	eleventyConfig.addCollection("feedItems", (collectionApi) => {
			const posts = collectionApi.getFilteredByGlob("./_posts/*.md");
			const notes = collectionApi.getFilteredByGlob("./_notes/*.md");
			const all = [
				...posts.map((p) => ({
				data: p.data,
				date: p.date,
				inputPath: p.inputPath,
				isPost: true,
				})),
				...notes.map((n) => ({
				data: n.data,
				date: n.date,
				inputPath: n.inputPath,
				isNote: true,
				})),
				//...videos.map((v) => ({
                //data: v,
                //date: new Date(v.date),
                //isVideo: true,
            	//})),
			];
	
			return all.sort((a, b) => b.date - a.date);
		});
		eleventyConfig.addLiquidFilter("findByInputPath", function(collection, inputPath) {
			return collection.find(p => p.inputPath === inputPath) || null;
	});
}