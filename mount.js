export function prepend (parent, ...rest) {
	const children = rest.flat();
	parent.prepend(...children);
	return parent;
}

export function append (parent, ...rest) {
	const children = rest.flat();
	parent.append(...children);
	return parent;
}