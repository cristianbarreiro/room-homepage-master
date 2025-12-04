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
  new MobileMenuController();
});

class MobileMenuController {
  constructor() {
    this.overlay = document.getElementById('mobile-nav-open');
    this.openLabel = document.querySelector('#mobile-nav label[for="mobile-menu-toggle-open"]');
    this.openIcon = document.querySelector('.menu-img');
    this.closeLabel = this.overlay ? this.overlay.querySelector('label[for="mobile-menu-toggle-close"]') : null;
    this.closeIcon = document.getElementById('menu-close-img');
    this.openInput = document.getElementById('mobile-menu-toggle-open');
    this.closeInput = document.getElementById('mobile-menu-toggle-close');
    this.links = this.overlay ? this.overlay.querySelectorAll('a') : [];
    this.isOpen = false;
    this.init();
  }

  init() {
    if (
      !this.overlay ||
      (!this.openLabel && !this.openIcon && !this.openInput) ||
      !this.closeIcon
    ) {
      return;
    }

    this.overlay.setAttribute('aria-hidden', 'true');
    const primaryOpenTrigger = this.openIcon || this.openLabel;
    if (primaryOpenTrigger) {
      primaryOpenTrigger.setAttribute('aria-expanded', 'false');
    }

    this.getUniqueTriggers([this.openLabel, this.openIcon]).forEach((trigger) => {
      this.prepareTrigger(trigger, () => this.open());
    });

    this.prepareTrigger(this.closeIcon, () => this.close());

    if (this.openInput) {
      this.openInput.addEventListener('change', () => {
        if (this.openInput.checked) this.open();
      });
    }

    this.links.forEach((link) => {
      link.addEventListener('click', () => this.close());
    });

    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) this.close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) this.close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && this.isOpen) this.close();
    });
  }

  prepareTrigger(element, action) {
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.addEventListener('click', (event) => {
      event.preventDefault();
      action();
    });
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        action();
      }
    });
  }

  open() {
    if (this.isOpen) return;
    this.overlay.classList.add('is-visible');
    document.body.classList.add('nav-locked');
    this.overlay.setAttribute('aria-hidden', 'false');
    const primaryOpenTrigger = this.openIcon || this.openLabel;
    if (primaryOpenTrigger) {
      primaryOpenTrigger.setAttribute('aria-expanded', 'true');
    }
    if (this.openInput) this.openInput.checked = true;
    if (this.closeInput) this.closeInput.checked = false;
    this.isOpen = true;
  }

  close() {
    if (!this.isOpen) return;
    this.overlay.classList.remove('is-visible');
    document.body.classList.remove('nav-locked');
    this.overlay.setAttribute('aria-hidden', 'true');
    const primaryOpenTrigger = this.openIcon || this.openLabel;
    if (primaryOpenTrigger) {
      primaryOpenTrigger.setAttribute('aria-expanded', 'false');
    }
    if (this.closeInput) this.closeInput.checked = true;
    if (this.openInput) this.openInput.checked = false;
    this.isOpen = false;
  }

  getUniqueTriggers(elements) {
    return [...new Set(elements.filter(Boolean))];
  }
}