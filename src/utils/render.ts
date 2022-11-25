import { Component } from "src/components/Block";

function render(query: string, component: Component) {
    const root = document.querySelector(query);

    if (!root)
        throw new Error("No root element");

    root.appendChild(component.getContent());
    return root;
}

export { render }