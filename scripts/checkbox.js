export class Checkbox {
  constructor(props, { initState }) {
    this.value = !!initState;
    this.target = null;
    this.emit = null;

    this.update(props);
  }

  update({ label }) {
    this.labelText = '' + label;

    if (this.target) {
      this.target.lastChild.innerText = this.labelText;
    }
  }

  render(target) {
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'checkbox' + Math.random();
    input.checked = this.value;

    let label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.innerText = this.labelText;

    input.onchange = () => {
      if (this.emit) this.emit(!!input.checked);
    }

    target.appendChild(input);
    target.appendChild(label);

    Object.assign(target.style, {
      height: '20px',
      padding: '2px'
    });
    this.target = target;
  }

  async *output() {
    while (true) {
      yield this.value;
      this.value = await new Promise(resolve => this.emit = resolve);
    }
  }
}
