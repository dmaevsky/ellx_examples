class Checkbox {
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
      if (this.afterRender) this.afterRender();
    }
  }

  render({ target, afterRender }) {
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
    this.afterRender = afterRender;
    if (afterRender) afterRender();
  }

  async *output() {
    while (true) {
      yield this.value;
      this.value = await new Promise(resolve => this.emit = resolve);
    }
  }
}

export const checkbox = label => ({
  __EllxMeta__: { component: Checkbox },
  label
});
