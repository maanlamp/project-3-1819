import turndown from "./turndown.js";
//Marked is available globally through a <script> tag

export function HTMLToMarkdown (nodeOrText) {
	return turndown(nodeOrText)
		.replace(/(?:\r?\n){2}\s+/g, "\n\n"); //Remove weird/unwanted white lines
}

export function markdownToHTML (markdown) {
	return marked(markdown);
}