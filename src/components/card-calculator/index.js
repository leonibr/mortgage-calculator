import { ResultCard } from './result-card';
import { Slider } from './slider';
import { InputField } from './input-field';
import { mortgageMath } from '../../modules/math.es6';
import { Formats } from '../../modules/helpers';
import { Sounds } from '../../modules/sound';
const src = `
<aside class="card-calculator__main">
<label>Change values to calculate your results</label>
<hr class="card-calculator__separator" />
<form class="card-calculator__form">
  <ash-slider id="years" label="Years of mortgage" min="1" max="40" step="1"></ash-slider>
  <ash-slider
    id="rate"
    label="Rate of interest (%)"
    initial="1.8"
    min="0.1"
    max="10"
    step="0.1"
  ></ash-slider>
    <ash-input-field
      id="loan-amount"
      label="Loan Amount"
      required="required"
    >
    </ash-input-field>
    <div class="card-calculator__form_row">
      <ash-input-field
        id="annual-tax"
        required="required"
        label="Annual Tax"
      >
      </ash-input-field>
      <ash-input-field
      id="annual-insurance"
      required="required"
      label="Annual Insurance"
      >
      </ash-input-field>
    </div>

    <div class="card-calculator__form_footer">
    <button class="btn__primary">Calculate</button>
    </div>
  </form>
  </aside>
  <ash-result-card principal="" tax="" insurance="" total="" ></ash-result-card>
`;

class CardCalculator extends HTMLElement {
  get result() {
    return this.querySelector('ash-result-card');
  }
  get button() {
    return this.querySelector('.btn__primary');
  }
  get annualTax() {
    return this.querySelector('#annual-tax');
  }
  get annualInsurance() {
    return this.querySelector('#annual-insurance');
  }
  get loan() {
    return this.querySelector('#loan-amount');
  }
  get years() {
    return this.querySelector('#years');
  }
  get rate() {
    return this.querySelector('#rate');
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
        if (!element.checkValidity()) {
          isValid = false;
        }
      }
      if (isValid) {
        const annualTax = Formats.stringToNumber(self.annualTax.value);
        const taxValue = mortgageMath.tax(annualTax);
        const annualInsurance = Formats.stringToNumber(self.annualInsurance.value);
        const insuranceValue = mortgageMath.insurance(annualInsurance);

        const years = Formats.stringToNumber(self.years.value);
        const rate = Formats.stringToNumber(self.rate.value);
        const loanAmount = Formats.stringToNumber(self.loan.value);

        const interest = mortgageMath.principal(rate, loanAmount, years);

        this.result.setAttribute('tax', taxValue);
        this.result.setAttribute('insurance', insuranceValue);
        this.result.setAttribute('principal', interest);
        this.result.setAttribute('total', interest + taxValue + insuranceValue);
        console.log('submitted');
        Sounds.beep();
      }
      console.log(
        `button clicked with loan: ${self.loan.value}, tax: ${self.annualTax.value}, insurance: ${self.annualInsurance.value}`
      );
    });
  }
}
window.customElements.define('ash-card-calculator', CardCalculator);
