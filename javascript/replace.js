export function replaceSelection (type) {
	let range;
	try {
		range = window
			.getSelection()
			.getRangeAt(0);

		switch (type) {
			case "raise":  return raise(range);
			case "lower":  return lower(range);
			case "link":   return link(range);
			case "bold":   return bold(range);
			case "italic": return italic(range);
		}
	} catch {
		return false;
	}
}

function raise (range) {
	const parentType = range.commonAncestorContainer.parentElement.nodeName;
	if (["DIV", "P"].includes(parentType)) return document.execCommand("formatBlock", false, "H2");
	if (!range.cloneContents().firstChild)
		return range.surroundContents("H2");
	const level = Number(parentType.substr(-1));
	if (isNaN(level))
		return document.execCommand("formatBlock", false, "H2");
	else
		return document.execCommand("formatBlock", false, `H${Math.max(2, Math.min(6, level - 1))}`);
}

function lower (range) {
	const parentType = range.commonAncestorContainer.parentElement.nodeName;
	if (parentType === "H6") return document.execCommand("formatBlock", false, "P");
	if (!range.cloneContents().firstChild)
		return range.surroundContents("H2");
	const level = Number(parentType.substr(-1));
	if (isNaN(level))
		return document.execCommand("formatBlock", false, "H2");
	else
		return document.execCommand("formatBlock", false, `H${Math.max(2, Math.min(6, level + 1))}`);
}

function link (range) {
	//Als het al een link is, verwijder dan de anchor
	return document.execCommand("createLink", false, window.prompt("Paste a link here", range.cloneContents().textContent));
}

function bold (range) {
	return document.execCommand("bold", false, null); //Doet bij headings rare dingen :/
}

function italic (range) {
	document.execCommand("italic", false, null);
}