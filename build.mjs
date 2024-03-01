import esbuild from "esbuild";
import htmlPlugin from "@chialab/esbuild-plugin-html";
import { minify } from "html-minifier";
import fs from "fs";

await esbuild.build({
	entryPoints: ["index.html", "assets/linkedin_in.png"],
	plugins: [htmlPlugin()],
	loader: {
		".png": "dataurl",
		".svg": "dataurl",
		".css": "css",
		".ttf": "file",
	},
	// drop: ["console"],

	bundle: true,
	outdir: "dist",
	minify: true,
	assetNames: "assets/[name]-[hash]",
	chunkNames: "[ext]/[name]-[hash]",
});

const file = fs.readFileSync("dist/index.html");

fs.writeFileSync(
	"dist/index.html",
	minify(file.toString(), {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true,
		conservativeCollapse: true,
		minifyCSS: false,
		removeComments: true,
		removeEmptyAttributes: true,
		removeAttributeQuotes: true,
		removeRedundantAttributes: true,
		removeStyleLinkTypeAttributes: true,
	}),
);
