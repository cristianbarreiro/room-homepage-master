class CarouselController {
  constructor() {
    this.slides = [
      {
        image: document.getElementById('image-hero-1'),
        article: document.querySelector('.discover'),
        nav: document.querySelector('.back-forward')
      },
      {
        image: document.getElementById('image-hero-2'),
        article: document.querySelector('.available'),
        nav: document.querySelector('.back-forward')
      },
      {
        image: document.getElementById('image-hero-3'),
        article: document.querySelector('.manufactured'),
        nav: document.querySelector('.back-forward')
      }
    ];

    this.currentIndex = 0;
    this.prevTrigger = document.getElementById('info-1');
    this.nextTrigger = document.getElementById('info-2');

    this.init();
  }

  init() {
    this.updateView();
    this.attachEvents();
  }

  updateView() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentIndex;
      if (!slide.image || !slide.article || !slide.nav) return;

      slide.image.style.display = isActive ? 'grid' : 'none';
      slide.article.style.display = isActive ? 'grid' : 'none';
      slide.nav.style.display = 'grid';
    });
  }

  goNext() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateView();
  }

  goPrev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateView();
  }

  attachEvents() {
    if (this.prevTrigger) {
      this.prevTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        this.goPrev();
        this.resetTriggers();
      });
    }

    if (this.nextTrigger) {
      this.nextTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        this.goNext();
        this.resetTriggers();
      });
    }
  }

  resetTriggers() {
    [this.prevTrigger, this.nextTrigger].forEach((trigger) => {
      if (trigger) trigger.checked = false;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CarouselController();

  const body = document.body;
  const menuOpenTrigger = document.querySelector('.menu-img');
  const menuCloseTrigger = document.getElementById('menu-close-img');

  if (menuOpenTrigger) {
    menuOpenTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.add('menu-open');
    });
  }

  if (menuCloseTrigger) {
    menuCloseTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.remove('menu-open');
    });
  }
});