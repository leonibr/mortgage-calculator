import { Formats } from '../../../modules/helpers';
const src = `
<div class="result-card__report">
      <h1>Your Results</h1>
      <div class="result-card__report_group">
        <label class="result-card__report_group_label">Principal & Interest</label>
        <span id="principal-response" class="result-card__report_group_response">$ 1,438.79</span>
      </div>
      <div class="result-card__report_group">
        <label class="result-card__report_group_label">Tax</label>
        <span id="tax-response" class="result-card__report_group_response">$ 83.33</span>
    </div>
    <div class="result-card__report_group">
      <label class="result-card__report_group_label">Insurance</label>
      <span id="insurance-response" class="result-card__report_group_response">$ 25.00</span>
    </div>
   <hr class="result-card__separator" />
    <div class="result-card__report_group">
      <label class="result-card__report_group_label bigger">Total Monthly Payment</label>
      <span id="total-response" class="result-card__report_group_response">$ 25.00</span>
    </div>
</div>
`;

class ResultCard extends HTMLElement {
  get principal() {
    return this.querySelector('#principal-response');
  }
  get tax() {
    return this.querySelector('#tax-response');
  }
  get insurance() {
    return this.querySelector('#insurance-response');
  }
  get total() {
    return this.querySelector('#total-response');
  }

  static get observedAttributes() {
    return ['principal', 'tax', 'insurance', 'total'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'tax':
        if (!newValue || newValue === 0) {
          this.cleanHtmlCtrl(this.tax);
          break;
        }
        this.populateHtmlCtrl(this.tax, newValue);
        break;
      case 'principal':
        if (!newValue || newValue === 0) {
          this.cleanHtmlCtrl(this.principal);
          break;
        }
        this.populateHtmlCtrl(this.principal, newValue);
        break;
      case 'insurance':
        if (!newValue || newValue === 0) {
          this.cleanHtmlCtrl(this.insurance);
          break;
        }
        this.populateHtmlCtrl(this.insurance, newValue);
        break;
      case 'total':
        if (!newValue || newValue === 0) {
          this.cleanHtmlCtrl(this.total);
          break;
        }
        this.populateHtmlCtrl(this.total, newValue);
        break;
    }
  }
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = src;
    this.classList.add('result-card');
    this.appendChild(template.content.cloneNode(true));
  }

  cleanHtmlCtrl(htmlControl) {
    htmlControl.innerHTML = '$ - -';
    htmlControl.classList.add('grey');
  }
  populateHtmlCtrl(htmlControl, value) {
    htmlControl.innerHTML = `$ ${Formats.toString(value)}`;
    htmlControl.classList.remove('grey');
  }

  connectedCallback() {
    const self = this;
    self.cleanHtmlCtrl(self.principal);
    self.cleanHtmlCtrl(self.tax);
    self.cleanHtmlCtrl(self.insurance);
    self.cleanHtmlCtrl(self.total);
  }
}
window.customElements.define('ash-result-card', ResultCard);
