const delay = t => new Promise(r => setTimeout(() => r(), t));

const MousePos = throttle => {
  throttle = throttle > 10 ? throttle : 10;

  return class {
    constructor(props) {
      this.count = 0;
      this.update(props);

      this.mouseMove = e => {
        this.lastPos = { x: e.pageX, y: e.pageY }
      }

      window.addEventListener('mousemove', this.mouseMove);
    }

    async *output() {
      let pos = null;
      if (!this.lastPos) {
        yield Object.assign(new Error(), { stale: true });
      }

      while (true) {
        await delay(throttle);

        if (!this.lastPos || this.lastPos === pos) continue;
        pos = this.lastPos;

        yield {
          dx: pos.x - this.x0,
          dy: pos.y - this.y0,
          count: ++this.count
        };
      }
    }

    update({ origin }) {
      [this.x0, this.y0] = origin;
    }

    dispose() {
      window.removeEventListener('mousemove', this.mouseMove);
    }
  }
}

export const mousePos = throttle => {
  const component = MousePos(throttle);

  return (x0, y0) => ({
    __EllxMeta__: { component },
    origin: [x0, y0]
  });
}
