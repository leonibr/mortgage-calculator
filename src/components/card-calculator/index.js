const math = require('../../modules/math');
const src = `
<aside class="card-calculator__main">
<label>Change values to calculate your results</label>
<hr class="card-calculator__separator" />
<form class="card-calculator__form">
  <app-slider id="years" label="Years of mortgage" min="1" max="40" step="1"></app-slider>
  <app-slider
    id="rate"
    label="Rate of interest (%)"
    initial="1.8"
    min="0.1"
    max="10"
    step="0.1"
  ></app-slider>
    <app-input-field
      id="loan-amount"
      label="Loan Amount"
      required="required"
    >
    </app-input-field>
    <div class="card-calculator__form_row">
      <app-input-field
        id="annual-tax"
        required="required"
        label="Annual Tax"
      >
      </app-input-field>
      <app-input-field
      id="annual-insurance"
      required="required"
      label="Annual Insurance"
      >
      </app-input-field>
    </div>

    <div class="card-calculator__form_footer">
    <button class="btn__primary">Calculate</button>
    </div>
  </form>
  </aside>
    <aside class="card-calculator__result">
      <div class="card-calculator__result_card">
            <h1>Your Results</h1>
            <div class="card-calculator__result_card_group">
              <label class="card-calculator__result_card_group_label">Principal & Interest</label>
              <span class="card-calculator__result_card_group_response">$ 1,438.79</span>
            </div>
            <div class="card-calculator__result_card_group">
              <label class="card-calculator__result_card_group_label">Tax</label>
              <span class="card-calculator__result_card_group_response">$ 83.33</span>
          </div>
          <div class="card-calculator__result_card_group">
            <label class="card-calculator__result_card_group_label">Insurance</label>
            <span class="card-calculator__result_card_group_response">$ 25.00</span>
          </div>
         <hr class="card-calculator__separator" />
          <div class="card-calculator__result_card_group">
            <label class="card-calculator__result_card_group_label bigger">Total Monthly Payment</label>
            <span class="card-calculator__result_card_group_response">$ 25.00</span>
          </div>
      </div>
    </aside>
`;

class CardCalculator extends HTMLElement {
  get button() {
    return this.querySelector('.btn__primary');
  }
  get tax() {
    return this.querySelector('#annual-tax');
  }
  get insurance() {
    return this.querySelector('#annual-insurance');
  }
  get loan() {
    return this.querySelector('#loan-amount');
  }
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = src;
    this.classList.add('card-calculator');
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const self = this;

    self.button.addEventListener('click', (ev) => {
      ev.preventDefault();
      const form = self.querySelector('.card-calculator__form');
      let isValid = true;
      for (let index = 0; index < form.elements.length; index++) {
        const element = form.elements[index];
      }
      if (form.checkVaidity() === false) {
        console.log('form is invalid');
      }

      // });  ((el) => el.checkValidity());
      console.log(`button clicked with loan: ${loan}, tax: ${tax}, insurance: ${insurance}`);
    });
  }
}
window.customElements.define('app-card-calculator', CardCalculator);
