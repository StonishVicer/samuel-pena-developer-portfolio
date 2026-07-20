const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

export default function initLogoLoop(container, options = {}) {
  const {
    logos = [],
    speed = 120,
    direction = 'left',
    logoHeight = 48,
    gap = 40,
    hoverSpeed = 0,
    fadeOut = true,
    fadeOutColor,
    scaleOnHover = true,
    ariaLabel
  } = options;

  if (!container || logos.length === 0) return () => {};

  let active = true;
  let raf = null;
  let running = false;
  let lastTimestamp = null;
  let offset = 0;
  let velocity = 0;
  let isHovered = false;
  let seqWidth = 0;
  let copyCount = ANIMATION_CONFIG.MIN_COPIES;

  const isVertical = direction === 'up' || direction === 'down';
  const targetVelocity = (() => {
    const magnitude = Math.abs(speed);
    let dir;
    if (isVertical) {
      dir = direction === 'up' ? 1 : -1;
    } else {
      dir = direction === 'left' ? 1 : -1;
    }
    const speedSign = speed < 0 ? -1 : 1;
    return magnitude * dir * speedSign;
  })();

  container.classList.add('logoloop');
  if (isVertical) container.classList.add('logoloop--vertical');
  else container.classList.add('logoloop--horizontal');
  if (fadeOut) container.classList.add('logoloop--fade');
  if (scaleOnHover) container.classList.add('logoloop--scale-hover');

  container.style.setProperty('--logoloop-gap', `${gap}px`);
  container.style.setProperty('--logoloop-logoHeight', `${logoHeight}px`);

  if (fadeOutColor) {
    container.style.setProperty('--logoloop-fadeColor', fadeOutColor);
  }

  if (ariaLabel) {
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', ariaLabel);
  }

  const track = document.createElement('div');
  track.className = 'logoloop__track';
  container.appendChild(track);

  function renderLogoItem(item, key) {
    const li = document.createElement('li');
    li.className = 'logoloop__item';
    li.setAttribute('role', 'listitem');

    const link = document.createElement('a');
    link.className = 'logoloop__link';
    link.href = item.href || '#';
    link.setAttribute('aria-label', item.alt || item.label || 'Technology logo');
    if (item.href) {
      link.target = '_blank';
      link.rel = 'noreferrer noopener';
    }

    if (item.src) {
      const img = document.createElement('img');
      img.className = 'logoloop__img';
      img.src = item.src;
      img.alt = item.alt || '';
      img.title = item.title || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      link.appendChild(img);
    } else if (item.label) {
      const badge = document.createElement('span');
      badge.className = 'logoloop__badge';
      badge.style.setProperty('--logo-color', item.color || '#888');
      badge.style.setProperty('--logo-text', item.textColor || '#fff');
      badge.textContent = item.label;
      link.appendChild(badge);
    }

    li.appendChild(link);
    return li;
  }

  function createLogoLists() {
    track.innerHTML = '';

    for (let copyIdx = 0; copyIdx < copyCount; copyIdx++) {
      const list = document.createElement('ul');
      list.className = 'logoloop__list';
      list.setAttribute('role', 'list');
      if (copyIdx > 0) list.setAttribute('aria-hidden', 'true');

      logos.forEach((item, itemIdx) => {
        const li = renderLogoItem(item, `${copyIdx}-${itemIdx}`);
        list.appendChild(li);
      });

      if (copyIdx === 0) {
        list.setAttribute('data-seq', 'true');
      }

      track.appendChild(list);
    }

    waitForImages();
  }

  function waitForImages() {
    const images = track.querySelectorAll('.logoloop__img');
    if (images.length === 0) {
      updateDimensions();
      return;
    }

    let remaining = images.length;
    function onLoad() {
      remaining--;
      if (remaining <= 0) {
        updateDimensions();
      }
    }

    images.forEach(img => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      }
    });
  }

  function updateDimensions() {
    if (!active) return;

    if (isVertical) {
      const parentHeight = container.parentElement?.clientHeight ?? 0;
      if (parentHeight > 0) {
        container.style.height = `${parentHeight}px`;
      }
      const seqEl = track.querySelector('[data-seq]');
      const seqRect = seqEl?.getBoundingClientRect();
      const sequenceHeight = seqRect?.height ?? 0;

      if (sequenceHeight > 0) {
        seqWidth = Math.ceil(sequenceHeight);
        const viewport = container.clientHeight || parentHeight || sequenceHeight;
        const needed = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        const newCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, needed);

        if (newCount !== copyCount) {
          copyCount = newCount;
          createLogoLists();
          return;
        }
      }
    } else {
      const seqEl = track.querySelector('[data-seq]');
      const seqRect = seqEl?.getBoundingClientRect();
      const sequenceWidth = seqRect?.width ?? 0;

      if (sequenceWidth > 0) {
        seqWidth = Math.ceil(sequenceWidth);
        const containerWidth = container.clientWidth || 1;
        const needed = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        const newCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, needed);

        if (newCount !== copyCount) {
          copyCount = newCount;
          createLogoLists();
          return;
        }
      }
    }
  }

  let updateTimer = null;
  function scheduleUpdate() {
    if (updateTimer) clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      updateTimer = null;
      updateDimensions();
    }, 100);
  }

  createLogoLists();

  let resizeObserver = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      scheduleUpdate();
    });
    resizeObserver.observe(container);
  } else {
    window.addEventListener('resize', scheduleUpdate);
  }

  function animate(timestamp) {
    if (!active || !running) {
      running = false;
      return;
    }

    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    const target = isHovered ? hoverSpeed : targetVelocity;

    const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
    velocity += (target - velocity) * easingFactor;

    if (seqWidth > 0) {
      offset += velocity * deltaTime;
      offset = ((offset % seqWidth) + seqWidth) % seqWidth;

      const transform = isVertical
        ? `translate3d(0, ${-offset}px, 0)`
        : `translate3d(${-offset}px, 0, 0)`;
      track.style.transform = transform;
    }

    raf = requestAnimationFrame(animate);
  }

  let visObserver = null;
  if (typeof IntersectionObserver !== 'undefined') {
    visObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!running && active) {
              running = true;
              lastTimestamp = null;
              raf = requestAnimationFrame(animate);
            }
          } else {
            running = false;
            if (raf) {
              cancelAnimationFrame(raf);
              raf = null;
            }
          }
        });
      },
      { threshold: 0 }
    );
    visObserver.observe(container);
  } else {
    running = true;
  }

  raf = requestAnimationFrame(animate);

  function handleMouseEnter() {
    isHovered = true;
  }
  function handleMouseLeave() {
    isHovered = false;
  }

  track.addEventListener('mouseenter', handleMouseEnter);
  track.addEventListener('mouseleave', handleMouseLeave);

  function destroy() {
    active = false;
    running = false;

    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }

    if (visObserver) {
      visObserver.disconnect();
    }

    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', scheduleUpdate);
    }

    if (updateTimer) {
      clearTimeout(updateTimer);
    }

    track.removeEventListener('mouseenter', handleMouseEnter);
    track.removeEventListener('mouseleave', handleMouseLeave);

    container.innerHTML = '';
    container.classList.remove(
      'logoloop',
      'logoloop--horizontal',
      'logoloop--vertical',
      'logoloop--fade',
      'logoloop--scale-hover'
    );
    container.removeAttribute('role');
    container.removeAttribute('aria-label');
  }

  return destroy;
}
