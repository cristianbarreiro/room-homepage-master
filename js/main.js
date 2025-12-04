class CarouselController {
  constructor(selectorPrefix = 'info') {

    this.radios = [
      document.getElementById(`${selectorPrefix}-1`),
      document.getElementById(`${selectorPrefix}-2`),
      document.getElementById(`${selectorPrefix}-3`),
      document.getElementById(`${selectorPrefix}-4`),
      document.getElementById(`${selectorPrefix}-5`),
      document.getElementById(`${selectorPrefix}-6`)
    ];

    this.prevButton = document.getElementById(`${selectorPrefix}-1`);
    this.nextButton = document.getElementById(`${selectorPrefix}-2`);

    this.attachEvents();
  }

  getCurrentIndex() {
    return this.radios.findIndex((radio) => radio && radio.checked);
  }

  goNext() {
    let current = this.getCurrentIndex();
    if (current === -1) current = 0;
    const next = (current + 1) % this.radios.length;
    if (this.radios[next]) this.radios[next].checked = true;
  }

  goPrev() {
    let current = this.getCurrentIndex();
    if (current === -1) current = 0;
    const prev = (current - 1 + this.radios.length) % this.radios.length;
    if (this.radios[prev]) this.radios[prev].checked = true;
  }

  attachEvents() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.goPrev();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.goNext();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CarouselController('info');
});