//TurndownService is available in global scope through a <script> tag

const service = new TurndownService({
	headingStyle: "atx",
	hr: "- - -",
	bulletListMarker: "-",
	codeBlockStyle: "fenced"
});

export default service.turndown.bind(service);