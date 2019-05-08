// Interfaces but in JS bc TS sux
class Component {
	view () {}
}
// End of interfaces

const HTMLChars = /<[^>]+>/g;

class EditableDocumentFragment extends Component {
	constructor () {
		super();
		this.text = "";
		this.class = "editableDocumentFragment";
	}

	input (event) {
		this.text = event.srcElement.value;
	}

	view () {
		return m("textarea", {
			class: "raw",
			value: this.text,
			oninput: event => this.input(event)
		});
	}
}

class Heading extends EditableDocumentFragment {
	constructor (text = "New Heading") {
		super();
		this.level = 1;
		this.text = text; //This only sets the text the first time
	}

	raise () {
		if (this.level > 1)
			this.level -= 1;
		return this;
	}

	lower () {
		if (this.level < 6)
			this.level += 1;
		return this;
	}

	resize (event) {
		event.preventDefault();
		if (event.type === "click" && this.level > 1) {
			this.level -= 1;
			return this;
		} else if (event.type === "contextmenu" && this.level < 6) {
			this.level += 1;
			return this;
		}
	}

	view () {
		return m(
			`h${this.level}`,
			{
				class: this.class,
				onclick: event => {this.resize(event)},
				oncontextmenu: event => {this.resize(event)}
			},
			[
				this.text,
				super.view()
			]
		);
	}
}

const title = new Heading();
m.mount(document.body, title);