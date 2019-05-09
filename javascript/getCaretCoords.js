import { render } from "./DOM.js";

export default async function getCaretCoords () {
	await new Promise(resolve => setTimeout(resolve, 0));
	//wait till next event loop tick so that focusing on the editor doesnt return {0,0} then that's not true
	try {
		const selection = window.getSelection();
		const range = selection
			.getRangeAt(0)
			.cloneRange();
		range.collapse(true);

		let rect = range.getClientRects()[0] || {};
		let x = rect.right;
		let y = rect.bottom;

		if (!x && !y) {
			const span = render(`span "\u200b"`);
			range.insertNode(span);
			const parent = span.parentNode;
			rect = span.getClientRects()[0];
			x = rect.right;
			y = rect.bottom;
			parent.removeChild(span);
			parent.normalize();
		}

		return { x, y };
	} catch (err) {
		console.warn(`Could not get caret position: ${err}`);
		return { x: 0, y: 0 };
	}
}