import { LitElement, html } from 'lit';
import '../components/MyForm';

export default class HomePage extends LitElement {
  render() {
    return html`
      <main>
        <my-form></my-form>
      </main>
    `;
  }
}

customElements.define('home-page', HomePage);