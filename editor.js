import render from "./render.js";
import { prepend, append } from "./mount.js";

const editor = render("div#editor");
const content = render("div#content[contenteditable]")
const toolbar = render("div#toolbar");
const buttonTypes = [
	"raise",
	"lower",
	"link",
	"bold",
	"italic"
];

function replaceSelection (type) {
	const range = window
		.getSelection()
		.getRangeAt(0);

	const content = range.cloneContents();
	switch (type) {
		case "link": {
			range.deleteContents();
			range.insertNode(append(render("a[href=#]"), content));
		}
		case "bold": {
			range.deleteContents();
			range.insertNode(append(render("strong"), content));
		}
		case "italic": {
			range.deleteContents();
			range.insertNode(append(render("em"), content));
		}
	}
}

const actions = {
	raise () {
		console.log("raise");
	},
	lower () {
		console.log("lower");
	},
	link () {replaceSelection("link");},
	bold () {replaceSelection("bold");},
	italic () {replaceSelection("italic");}
}

buttonTypes
	.map(type => render(`button.${type}[title=${type}]`))
	.forEach(button => {
		button.addEventListener("click", actions[button.className]);
		append(toolbar, button);
	});

function getCaretCoords () {
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

function moveToolbar () {
	const position = getCaretCoords();
	toolbar.style.left = `${position.x + 4}px`;
	toolbar.style.top = `${position.y + 4}px`;
}

["keydown", "keyup", "mousedown", "mouseup", "mousemove"].forEach(event => {
	content.addEventListener(event, event => {
		if (event.type === "mousemove" && !event.buttons) return;
		moveToolbar();
	});
});

prepend(document.body, append(editor, content, toolbar));