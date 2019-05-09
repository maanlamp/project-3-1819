import { render, prepend, append } from "./javascript/DOM.js";
import { moveToolbar, createToolbar, updateToolbarButtons } from "./javascript/toolbar.js";
import { HTMLToMarkdown, markdownToHTML } from "./javascript/parse.js";
import ResetableTimeout from "./javascript/resetableTimeout.js";

const editor = render("div#editor");
const content = render(`div#content[contenteditable]>h1 "New log"`);
const raw = render(`textarea#raw`);
const htmlTimeout = new ResetableTimeout({
	timeout: 500,
	handler () {
		raw.value = HTMLToMarkdown(content);
	}
});
const toolbar = createToolbar(htmlTimeout);
htmlTimeout.handler();
const rawTimeout = new ResetableTimeout({
	timeout: 500,
	handler () {
		const html = markdownToHTML(raw.value);
		content.innerHTML = html;
		console.log("hey");
	}
});

["keydown", "keyup", "mousedown", "mouseup", "mousemove"].forEach(event => {
	content.addEventListener(event, event => {
		if (event.type === "mousemove" && !event.buttons) return;
		updateToolbarButtons(toolbar);
		moveToolbar(toolbar);
		htmlTimeout.reset();
	});
});

raw.addEventListener("input", event => {
	rawTimeout.reset();
});

prepend(document.body, append(editor, content, raw, toolbar));

/* REMOVE THIS ON PRODUCTION, FOR SHOWCASING ONLY */
const str = `
# Scientific borakthrough

We have done it! We discovered dark matter!

## Why this is huge
Because all nerds around the _**globe**_ want to know why the universe's expansion is slowing down, you dummy!

Let me list a couple of other reasons:
- Science is just cool in general
- Finally something to talk about other than the Kardashians
- Just 'cause!

### Haters
Yes, there have been some haters. Here is the gist of all the hate mails we've recieved:
> Omgz0rs, ur liek not even skientizt, go resursh spacewasves l0l

> I h8 u u poopooheads

And, my personal favourite:
> 👺👺👺👺
Whatever that may mean...

Oh right, don't forget to [look at the research on our website](home.cern).
`;
raw.value = "";
const lines = str.trim().split(/\n+/);
setTimeout(() => { //Start ofter 5 seconds
	lines.forEach((line, i) => {
		[...line, "\n\n"].forEach((char, j) => {
			setTimeout(() => {
				raw.value += char;
			}, 6000*i + 50*j);
		});
	});
}, 1000);
const a = setInterval(()=>{
	rawTimeout.handler();
}, 500);
setTimeout(()=>{
	clearInterval(a);
},100000);