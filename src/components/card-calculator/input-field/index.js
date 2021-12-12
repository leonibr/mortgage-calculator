const src = `
    <label class="input-field__label">Label</label>    
    <span class="input-field__prefix">
      $ 
      <input type="text" class="input-field__field" />
    </span>
    <span class="input-field__message">Mandatory Field</span>
`;

class InputField extends HTMLElement {
  static formAssociated = true;
  get value() {
    return this.value_;
  }
  set value(v) {
    this.value_ = v;
    this.internals_.setFormValue(v);
  }
  get form() {
    return this.internals_.form;
  }
  get name() {
    return this.getAttribute('name');
  }
  get type() {
    return this.localName;
  }
  get validity() {
    return this.internals_.validity;
  }
  get validationMessage() {
    return this.internals_.validationMessage;
  }
  get willValidate() {
    return this.internals_.willValidate;
  }

  checkValidity() {
    if (this.value_ === undefined || this.value_ < 0 || this.value_ === '') {
      this.internals_.setValidity({ customError: true }, 'Mandadory');
    }
    return this.internals_.checkValidity();
  }
  reportValidity() {
    return this.internals_.reportValidity();
  }

  get label() {
    return this.querySelector('.input-field__label');
  }
  get inputText() {
    return this.querySelector('.input-field__field');
  }

  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = src;
    this.classList.add('input-field');
    this.appendChild(template.content.cloneNode(true));
    this.internals_ = this.attachInternals();
    this.value_ = undefined;
    const label = this.getAttribute('label');
    const required = this.getAttribute('required');
    if (required) {
      this.isRequired = true;
    } else {
      this.isRequired = false;
    }
    this.label.innerHTML = label;
  }
  connectedCallback() {
    const self = this;

    self.addEventListener('input', this.updateValue(self));
    self.addEventListener('onfocus', () => {
      const prefix = self.querySelector('.input-field__prefix');
      console.log(prefix);
      prefix.focus();
    });
    self.inputText.addEventListener('keypress', (ev) => {
      var char = String.fromCharCode(ev.which);

      if ('1234567890'.indexOf(char) < 0 && ev.which !== 13) {
        ev.preventDefault();
      }
      if (char === '0' && self.value_.toString().length === 0) {
        ev.preventDefault();
      }
    });
    self.inputText.addEventListener('keyup', () => {
      const value = self.value_.toString().replace(/,/g, '');
      const numbers = value.toString().split('').reverse();
      const agg = [];
      if (numbers.length > 0) {
        numbers.map((num, idx) => {
          if (idx > 0 && idx % 3 === 0) {
            agg.push(',');
          }
          agg.push(num);
        });
        const finalResponse = agg.reverse().reduce((p, c) => `${p}${c}`);
        self.inputText.value = finalResponse;
        self.value_ = finalResponse;
        const updateFn = self.updateValue(self);
        updateFn(finalResponse);
      }
    });
    self.inputText.addEventListener('focus', () => {
      const prefix = self.querySelector('.input-field__prefix');
      prefix.classList.add('focus');
    });
    self.inputText.addEventListener('blur', () => {
      const prefix = self.querySelector('.input-field__prefix');
      prefix.classList.remove('focus');
    });
  }
  disconnectedCallback() {
    const self = this;
    this.removeListner('input', this.updateValue(self));
  }

  updateValue(self) {
    const txt = self.inputText;
    return (ev) => {
      //
      try {
        const pureResponse = `${ev.target.value}`;
        if (!self.matches(':disabled') && self.isRequired && pureResponse === '') {
          console.log('manadatory');
          self.internals_.setValidity({ customError: true }, 'Mandadory');
        } else {
          console.log('is clean');
          self.internals_.setValidity({});
        }
        self.value_ = pureResponse;
        self.internals_.setFormValue(self.value_);
      } catch (error) {
        console.error(error);
      }
    };
  }
}

window.customElements.define('ash-input-field', InputField);
