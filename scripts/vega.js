export const Plot = (vegaEmbed, spec) => class {
  constructor(props) {
    this.update(props);
  }

  update({ values }) {
    this.spec = { ...spec, data: { name: 'source', values } };
    if (this.view) this.view.data('source', values).run();
  }

  async render(target) {
    const result = await vegaEmbed(target, this.spec);
    this.view = result.view;
  }

  dispose() {
    if (this.view) this.view.finalize();
  }
}
