import { LitElement, html, css } from 'lit';

const INITIAL_VALUE = '';

export default class MyInput extends LitElement {
  static get properties() {
    return {
      name: { type: String, reflect: true },
      value: { type: String, reflect: true },
      required: { type: Boolean, reflect: true },
      validity: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px solid purple;
      }

      label {
        color: purple;
      }

      #custom-input {
        outline: none;
        border: 3px solid purple;
      }

      #custom-input:invalid {
        outline: none;
        border: 3px solid red;
      }

      #custom-input:valid {
        outline: none;
        border: 3px solid green;
      }

      span[data-valid] {
        color: red;
        font-weight: bold;
      }

      span {
        color: green;
      }
    `;
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.name = 'custom-input';
    this.value = INITIAL_VALUE;
    this.internals = this.attachInternals();
    this.validity = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0'); // This makes the element focusable
    this.addEventListener('focus', this.setFocus.bind(this)); // Redirect the focus to the input
    
    this.internals.setFormValue(this.value);
    if (this.required) {
      this.internals.setValidity({ customError: true }, 'Field is required');
    }
  }

  setFocus() {
    this.shadowRoot.querySelector('input').focus();
  }

  onCustomInput(event) {
    const input = event.target;
    this.value = event.target.value;
    this.internals.setFormValue(this.value);
    this.setValidity(input);
  }

  formResetCallback() {
    this.value = INITIAL_VALUE;
    this.internals.setFormValue(this.value);
  }

  setValidity(input) {
    if(!input.checkValidity()) {
      this.validity = input.validity;
      const errorMsg = input.validity.patternMismatch ? 'Please enter a valid phone number' : 'Field is required';
      this.internals.setValidity({ customError: true }, errorMsg);
    } else {
      this.internals.setValidity({});
    }
  }

  render() {
    console.log(this.validity);
    return html`
      <label for="custom-input">Custom Input</label>
      <input
        tabindex="0"
        id="custom-input"
        name="custom-input"
        type="tel"
        pattern="[0-9]{10}"
        ?required=${this.required}
        .value="${this.value}"
        @input=${this.onCustomInput}
      />
      <pre>
        badInput: <span ?data-valid=${this.validity.badInput}>${this.validity.badInput}</span>
        customError: <span ?data-valid=${this.validity.customError}>${this.validity.customError}</span>
        patternMismatch: <span ?data-valid=${this.validity.patternMismatch}>${this.validity.patternMismatch}</span>
        rangeOverflow: <span ?data-valid=${this.validity.rangeOverflow}>${this.validity.rangeOverflow}</span>
        rangeUnderflow: <span ?data-valid=${this.validity.rangeUnderflow}>${this.validity.rangeUnderflow}</span>
        stepMismatch: <span ?data-valid=${this.validity.stepMismatch}>${this.validity.stepMismatch}</span>
        tooLong: <span ?data-valid=${this.validity.tooLong}>${this.validity.tooLong}</span>
        tooShort: <span ?data-valid=${this.validity.tooShort}>${this.validity.tooShort}</span>
        typeMismatch: <span ?data-valid=${this.validity.typeMismatch}>${this.validity.typeMismatch}</span>
        valid: <span ?data-valid=${this.validity.valid}>${this.validity.valid}</span>
        valueMissing: <span ?data-valid=${this.validity.valueMissing}>${this.validity.valueMissing}</span>
      </pre>
    `;
  }
}

customElements.define('my-input', MyInput);
