// Header shadow
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const links = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => menuBtn.setAttribute('aria-expanded', links.classList.toggle('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }));

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 5) * 70 + 'ms'; io.observe(el); });

if (document.getElementById('budget')) {
// Budget matcher (sample listings — replace with live catalog data)
  const LISTINGS = [
    { name: 'Siomai Sentral', cat: 'food', type: 'Food cart', size: '4 sqm', price: 180000 },
    { name: 'Lutong Bahay Express', cat: 'food', type: 'Rice meals', size: '30 sqm', price: 850000 },
    { name: 'Kape Tayo', cat: 'food', type: 'Coffee kiosk', size: '25 sqm', price: 1120000 },
    { name: 'Biyahe Travel Hub', cat: 'travel', type: 'Travel agency desk', size: '12 sqm', price: 450000 },
    { name: 'Ganda Nail Bar', cat: 'beauty', type: 'Nail & lash studio', size: '20 sqm', price: 680000 },
    { name: 'Hilot Wellness Studio', cat: 'beauty', type: 'Massage & spa', size: '45 sqm', price: 1450000 },
  ];
  const budgetEl = document.getElementById('budget'), catEl = document.getElementById('category');
  const resultsEl = document.getElementById('results'), countEl = document.getElementById('resultCount');
  const peso = n => 'Php ' + n.toLocaleString('en-PH');
  const parseBudget = () => Number(budgetEl.value.replace(/[^\d.]/g, '')) || 0;
  const seal = '<span class="verified"><svg><use href="#seal"/></svg>Verified</span>';
  function render() {
    const b = parseBudget(), c = catEl.value;
    const hits = LISTINGS.filter(l => l.price <= b && (c === 'all' || l.cat === c)).sort((x, y) => y.price - x.price).slice(0, 3);
    countEl.textContent = hits.length ? `Top matches within ${peso(b)}` : 'No matches yet';
    resultsEl.innerHTML = hits.length
      ? hits.map(l => `<div class="listing"><div><h4>${l.name}</h4><small>${l.type} • ${l.size} • ${peso(l.price)}</small></div>${seal}</div>`).join('')
      : '<p class="empty">Try a higher budget or another category.</p>';
    document.querySelectorAll('.cat').forEach(btn => btn.classList.toggle('on', btn.dataset.cat === c));
  }
  budgetEl.addEventListener('input', render);
  budgetEl.addEventListener('blur', () => { budgetEl.value = 'PHP ' + parseBudget().toLocaleString('en-PH', { minimumFractionDigits: 2 }); });
  budgetEl.addEventListener('focus', () => { budgetEl.value = String(parseBudget()); });
  catEl.addEventListener('change', render);
  document.querySelectorAll('.cat').forEach(btn => btn.addEventListener('click', () => {
    catEl.value = catEl.value === btn.dataset.cat ? 'all' : btn.dataset.cat; render();
  }));
  render();
}

// ARIA panel
const ariaBtn = document.getElementById('ariaBtn'), ariaPanel = document.getElementById('ariaPanel');
ariaBtn.addEventListener('click', () => ariaBtn.setAttribute('aria-expanded', ariaPanel.classList.toggle('open')));
ariaPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ariaPanel.classList.remove('open'); ariaBtn.setAttribute('aria-expanded', false); }));

// Subscribe (front-end only — connect to your mailing service)
document.getElementById('subscribeForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('formMsg').textContent = 'Salamat! You’re on the list.';
  e.target.reset();
});
document.getElementById('year').textContent = new Date().getFullYear();
