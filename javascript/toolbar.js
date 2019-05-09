import { render, append } from "./DOM.js";
import { replaceSelection } from "./replace.js";
import getCaretCoords from "./getCaretCoords.js";

function capitalise (string) {
	return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

export function createToolbar (htmlTimeout) {
	const toolbar = render("div#toolbar>p#editType");
	const buttonTypes = [
		"raise",
		"lower",
		"link",
		"bold",
		"italic"
		//quote?
		//list?
	];

	buttonTypes
		.map(type => render(`button.${type}[title=${capitalise(type)}]`))
		.forEach(button => {
			button.addEventListener("click", () => {
				replaceSelection(button.className);
				updateToolbarButtons(toolbar);
				moveToolbar(toolbar);
				htmlTimeout.reset();
			});
			append(toolbar, button);
		});

	return toolbar;
}

export async function moveToolbar (toolbar) {
	const position = await getCaretCoords();
	const { innerWidth, innerHeight } = window;
	const maxLeft = innerWidth - 250;
	const maxTop = innerHeight - 50; //DOES NOT ACCOUNT FOR SCROLLING, FIXXXXX!!!!!
	toolbar.style.left = `${Math.min(maxLeft, position.x + 4)}px`;
	toolbar.style.top = `${Math.min(maxTop, position.y + 4)}px`;
}

export function updateToolbarButtons (toolbar) {
	try {
		const currentElement = window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;
		const currentElementName = currentElement.nodeName;
		toolbar.querySelector("#editType").textContent = (()=>{
			switch (currentElementName) {
				case "H1":
					return "Title";
				case "H2":case "H3":case "H4":case "H5":case "H6":
					return "Heading";
				case "A":
					return "Link";
				case "UL":case "OL":case "LI":
					return "List";
				case "BLOCKQUOTE":
					return "Quote";
				default: return "Paragraph";
			}
		})();

		const enabled = (() => {
			if (currentElement.id === "content") return [];
			switch (currentElementName) {
				case "H1":
					return [];
				case "H2":
					return ["lower"];
				case "H3":case "H4":case "H5":case "H6":
					return ["raise", "lower"];
				case "P": case "DIV":
					return ["raise", "link", "bold", "italic"];
				case "B": case "STRONG":
					return ["raise", "link", "bold", "italic"];
				case "I": case "EM":
					return ["raise", "link", "bold", "italic"];
			}
		})();

		Array.from(toolbar.querySelectorAll("button"), button => button.classList.add("hidden"));
		if (!enabled.length) return;
		toolbar.querySelectorAll(enabled.map(className => "." + className).join())
			.forEach(button => button.classList.remove("hidden"));
	} catch (err) {
		console.warn(err);
	}
}