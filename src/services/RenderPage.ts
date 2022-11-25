import { Component } from "../components/Component";

export class RenderPage {
    currentPage : Component
    root: HTMLElement | null
    constructor(query: string) {
        this.root = document.querySelector(query);
    }
    render(component: Component) {
      
        if (!this.root)
            throw new Error("No root element");

        if(this.currentPage && this.root.contains(this.currentPage.getContent())) {
            this.root.removeChild(this.currentPage.getContent());
        }
        
        this.currentPage = component;

        this.root.appendChild(component.getContent());
        component.dispatchComponentDidMount();
        return this.root;
    }
}
