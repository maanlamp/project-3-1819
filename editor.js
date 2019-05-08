import render from "./render.js";
import { prepend, append } from "./mount.js";

const editor = render("div#editor[contenteditable]");
prepend(document.body, editor);