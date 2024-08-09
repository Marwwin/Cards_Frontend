export class BaseComponent extends HTMLElement {
  logging = false;
  static #counter = 0;
  constructor() {
    super();
    this.id = BaseComponent.#counter++;
  }

  connectedCallback() {
    this.connectedCallbackLogging();
  }

  connectedCallbackLogging() {
    if (this.logging) {
      console.log(`${this.constructor.name}#${this.id} added to page.`);
    }
  }

  disconnectedCallback() {
    this.disconnectedCallbackLogging();
  }

  disconnectedCallbackLogging() {
    if (this.logging) {
      console.log(`${this.constructor.name}#${this.id} removed from page.`);
    }
  }
  adoptedCallback() {
    this.adoptedCallbackLogging();
  }

  adoptedCallbackLogging() {
    if (this.logging) {
      console.log(`${this.constructor.name}#${this.id} moved to new page.`);
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.attributeChangedCallbackLogging(name, oldValue, newValue);
  }

  attributeChangedCallbackLogging(name, oldValue, newValue) {
    if (this.logging) {
      console.log(
        `${this.constructor.name}#${this.id} Attribute ${name} has changed.`,
      );
    }
  }
}
