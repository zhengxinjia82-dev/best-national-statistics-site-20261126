// Site-wide hover tooltip: one floating box, filled from the data-tip
// attribute of whatever SVG element the pointer is over. Native <title>
// elements are also present on every chart mark as a fallback.
export function initTooltip() {
  let box = document.getElementById('tooltip');
  if (!box) {
    box = document.createElement('div');
    box.id = 'tooltip';
    box.className = 'tooltip';
    box.hidden = true;
    document.body.appendChild(box);
  }
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest ? e.target.closest('[data-tip]') : null;
    if (!t) { box.hidden = true; return; }
    box.textContent = t.getAttribute('data-tip');
    box.hidden = false;
  });
  document.addEventListener('mousemove', (e) => {
    if (box.hidden) return;
    const pad = 12;
    let x = e.clientX + pad, y = e.clientY + pad;
    const r = box.getBoundingClientRect();
    if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 8) y = e.clientY - r.height - pad;
    box.style.left = x + 'px';
    box.style.top = y + 'px';
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest('[data-tip]')) box.hidden = true;
  });
}
