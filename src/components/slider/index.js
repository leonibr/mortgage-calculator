const src = `
<label id='title' class="app-slider__title"></label>
<div class="app-slider__content">
  <label id='min' class="app-slider__content__min">i</label>
  <div class="app-slider__content__range">
    <input type="range"
        min="0" max="1" step="1"  />
  </div>
  <label id='max' class="app-slider__content__max">ii</label>
  <input type="text"  class="app-slider__content__value"/>
</div>`;

export class Slider extends HTMLElement {
  get maxValue() {
    return +this.getAttribute('max');
  }
  get minValue() {
    return +this.getAttribute('min');
  }
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = src;

    const title = this.getAttribute('label');
    const stepValue = this.getAttribute('step');
    const currentValue = parseInt(this.maxValue / 2);
    const initial = this.getAttribute('initial');

    this.appendChild(template.content.cloneNode(true));
    this.classList.add('app-slider');
    const insideTitle = this.querySelector('#title');
    this.inputRange = this.querySelector('input[type="range"]');
    this.inputText = this.querySelector('input[type="text"]');
    this.min = this.querySelector('#min');
    this.max = this.querySelector('#max');
    this.inputRange.setAttribute('min', this.minValue);
    this.inputRange.setAttribute('max', this.maxValue);
    this.inputRange.setAttribute('step', stepValue);
    this.inputRange.value = currentValue;

    this.min.innerHTML = this.minValue;
    this.max.innerHTML = this.maxValue;
    insideTitle.innerHTML = title;
    if (initial && initial.toString().length > 0) {
      this.inputRange.value = initial;
    }
  }

  updateValue(newValue) {
    const self = this;
    const text = this.inputText;
    const range = this.inputRange;
    if (isNaN(newValue)) {
      text.setCustomValidity('Invalid value');
      return;
    }
    newValue = +newValue;
    if (newValue > this.maxValue || newValue < this.minValue) {
      text.setCustomValidity('Out of range');
      return;
    }
    self.value = newValue;
    text.value = newValue;
    range.value = newValue;
    text.setCustomValidity('');

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }
  eventInput(self) {
    return (ev) => {
      const val = +ev.target.value;
      self.updateValue(val);
    };
  }

  connectedCallback() {
    const self = this;
    const text = self.inputText;
    const range = self.inputRange;
    range.addEventListener('input', self.eventInput(self));
    text.addEventListener('input', self.eventInput(self));
    text.addEventListener('blur', self.verifyValueOnBlur(self));
    const initialValue = +self.inputRange.value;
    self.updateValue(initialValue);
  }
  disconnectedCallback() {
    const self = this;
    const text = this.inputText;
    const range = this.inputRange;
    range.removeEventListener('input', self.eventInput(self));
    text.removeEventListener('input', self.eventInput(self));
    text.removeEventListener('blur', this.verifyValueOnBlur(self));
  }

  verifyValueOnBlur(self) {
    return (ev) => {
      const rawValue = ev.target.value;
      console.log(`rawValue ${rawValue}`);
      if (!isNaN(rawValue)) {
        const value = +rawValue;
        console.log(`value ${value}`);
        if (value > self.maxValue) {
          console.log('is higher ajusting to max');
          self.updateValue(this.maxValue);
        }
        if (value < this.minValue) {
          console.log('is lower ajusting to min');
          this.updateValue(this.minValue);
        }
      }
    };
  }
}

window.customElements.define('app-slider', Slider);
