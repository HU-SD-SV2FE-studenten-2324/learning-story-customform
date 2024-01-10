import { LitElement, html, css } from 'lit';
import './MyInput';

export default class MyForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      button {
        margin: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: green;
        color: white;
      }
      button:hover, button:focus {
        background-color: yellowgreen;
      }

    `;
  }

  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.data = {};
  }

  submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    this.data = Object.fromEntries(formData.entries());
    form.reset();
  }

  clearData() {
    this.data = {};
  }

  render() {
    return html`
      <h1>Reparatiekaart</h1>
      <form @submit=${this.submitForm}>
        <my-input name="my-custom-input" required></my-input>
        <button tabindex="0" type="submit">Submit</button>
      </form>

      <hr/>
      <pre>${JSON.stringify(this.data, null, 2)}</pre>
      <button tabindex="0" @click=${this.clearData}>Clear data</button>
    `;
  }
}

customElements.define('my-form', MyForm);
