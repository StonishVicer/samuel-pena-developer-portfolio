const { gsap } = window;

export default function initStaggeredMenu(options = {}) {
  if (!gsap) {
    console.warn('GSAP not loaded');
    return () => {};
  }

  const {
    position = 'right',
    menuButtonColor = '#e2e2e2',
    openMenuButtonColor = '#9ffa43',
    changeMenuColorOnOpen = true,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose
  } = options;

  const toggleBtn = document.getElementById('sm-toggle');
  const panel = document.getElementById('staggered-menu-panel');
  const prelayersContainer = document.querySelector('.sm-prelayers');
  const prelayers = document.querySelectorAll('.sm-prelayer');
  const textInner = document.querySelector('.sm-toggle-textInner');
  const iconEl = document.querySelector('#sm-toggle .sm-icon');
  const plusH = document.querySelector('#sm-toggle .sm-icon-line:not(.sm-icon-line-v)');
  const plusV = document.querySelector('#sm-toggle .sm-icon-line-v');

  if (!toggleBtn || !panel || !textInner || !iconEl) {
    console.warn('StaggeredMenu: required elements not found');
    return () => {};
  }

  let open = false;
  let busy = false;
  let openTl = null;
  let closeTween = null;

  const offscreen = position === 'left' ? -100 : 100;

  function setup() {
    gsap.set([panel, ...prelayers], { xPercent: offscreen, opacity: 0 });
    if (prelayersContainer) gsap.set(prelayersContainer, { xPercent: 0 });
    if (plusH) gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
    if (plusV) gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
    gsap.set(iconEl, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(textInner, { yPercent: 0 });
    gsap.set(toggleBtn, { color: menuButtonColor });
  }

  function resetItems() {
    const itemEls = panel.querySelectorAll('.sm-panel-item');
    const wraps = panel.querySelectorAll('.sm-panel-itemWrap');
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = panel.querySelectorAll('.sm-socials-link');

    if (itemEls.length) gsap.set(itemEls, { clearProps: 'transform' });
    if (wraps.length) wraps.forEach(w => w.style.setProperty('--sm-num-opacity', '0'));
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
  }

  setup();

  function buildOpenTimeline() {
    if (openTl) { openTl.kill(); openTl = null; }
    if (closeTween) { closeTween.kill(); closeTween = null; }

    const itemEls = panel.querySelectorAll('.sm-panel-item');
    const wraps = panel.querySelectorAll('.sm-panel-itemWrap');
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = panel.querySelectorAll('.sm-socials-link');

    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    prelayers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: offscreen, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = prelayers.length ? (prelayers.length - 1) * 0.07 : 0;
    const panelInsert = lastTime + (prelayers.length ? 0.08 : 0);
    const panelDur = 0.65;

    tl.fromTo(panel, { xPercent: offscreen, opacity: 0 }, { xPercent: 0, opacity: 1, duration: panelDur, ease: 'power4.out' }, panelInsert);

    if (itemEls.length) {
      const itemsStart = panelInsert + panelDur * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1 } }, itemsStart);
      tl.to(wraps, { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: { each: 0.08 } }, itemsStart + 0.1);
    }

    if (socialTitle || socialLinks.length) {
      const sStart = panelInsert + panelDur * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, sStart);
      }
      if (socialLinks.length) {
        tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: { each: 0.08 } }, sStart + 0.04);
      }
    }

    tl.eventCallback('onComplete', () => { busy = false; });
    openTl = tl;
    return tl;
  }

  function playOpen() {
    if (busy) return;
    busy = true;
    resetItems();
    const tl = buildOpenTimeline();
    if (tl) tl.play(0);
    else busy = false;
  }

  function playClose() {
    if (openTl) { openTl.kill(); openTl = null; }
    if (closeTween) closeTween.kill();

    closeTween = gsap.to([...prelayers, panel], {
      xPercent: offscreen, opacity: 0, duration: 0.32, ease: 'power3.in', overwrite: 'auto',
      onComplete: () => {
        const itemEls = panel.querySelectorAll('.sm-panel-item');
        const wraps = panel.querySelectorAll('.sm-panel-itemWrap');
        const socialLinks = panel.querySelectorAll('.sm-socials-link');
        if (itemEls.length) gsap.set(itemEls, { clearProps: 'transform' });
        if (wraps.length) wraps.forEach(w => w.style.setProperty('--sm-num-opacity', '0'));
        if (socialLinks.length) gsap.set(socialLinks, { clearProps: 'transform,opacity' });
        busy = false;
      }
    });
  }

  function animateIcon(opening) {
    gsap.to(iconEl, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? 'power4.out' : 'power3.inOut',
      overwrite: 'auto'
    });
  }

  function animateColor(opening) {
    if (changeMenuColorOnOpen) {
      gsap.to(toggleBtn, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        delay: 0.18, duration: 0.3, ease: 'power2.out', overwrite: 'auto'
      });
    }
  }

  function animateText(opening) {
    gsap.to(textInner, {
      yPercent: opening ? -20 : 0,
      duration: opening ? 0.8 : 0.4,
      ease: opening ? 'power4.out' : 'power3.inOut',
      overwrite: 'auto'
    });
  }

  function toggle() {
    const target = !open;
    open = target;
    toggleBtn.setAttribute('aria-expanded', target);
    toggleBtn.setAttribute('aria-label', target ? 'Close menu' : 'Open menu');
    panel.setAttribute('aria-hidden', !target);

    if (target) {
      if (onMenuOpen) onMenuOpen();
      playOpen();
    } else {
      if (onMenuClose) onMenuClose();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }

  function close() {
    if (!open) return;
    open = false;
    toggleBtn.setAttribute('aria-expanded', false);
    toggleBtn.setAttribute('aria-label', 'Open menu');
    panel.setAttribute('aria-hidden', true);
    if (onMenuClose) onMenuClose();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }

  toggleBtn.addEventListener('click', toggle);

  const closeBtn = document.getElementById('sm-close');
  if (closeBtn) closeBtn.addEventListener('click', close);

  if (closeOnClickAway) {
    document.addEventListener('mousedown', (e) => {
      if (open && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
        close();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) close();
  });

  panel.querySelectorAll('.sm-panel-item').forEach(link => {
    link.addEventListener('click', () => { if (open) close(); });
  });

  return { toggle, open: () => { if (!open) toggle(); }, close, destroy() { toggleBtn.removeEventListener('click', toggle); if (closeBtn) closeBtn.removeEventListener('click', close); } };
}
