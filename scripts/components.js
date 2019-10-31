const ELLX_META = Symbol.for('~ellxMeta');
const delay = t => new Promise(r => setTimeout(() => r(), t));

class MousePos {
  constructor(props) {
    this.distance = 0;
    this.update(props);

    this.mouseMove = e => {
      this.lastPos = { x: e.pageX, y: e.pageY }
    }

    window.addEventListener('mousemove', this.mouseMove);
  }

  async *output() {
    let pos = null;
    while (true) {
      await delay(this.throttle);

      if (!this.lastPos) continue;

      if (pos) {
        let dx = this.lastPos.x - pos.x;
        let dy = this.lastPos.y - pos.y;
        let delta = Math.sqrt(dx * dx + dy * dy);
        if (delta < 1) continue;

        this.distance += delta;
      }
      pos = this.lastPos;
      yield { ...pos, distance: this.distance };
    }
  }

  update({ throttle }) {
    this.throttle = throttle > 10 ? throttle : 10;
  }

  dispose() {
    window.removeEventListener('mousemove', this.mouseMove);
  }
}

export const mousePos = throttle => ({
  [ELLX_META]: { component: MousePos },
  throttle
});
