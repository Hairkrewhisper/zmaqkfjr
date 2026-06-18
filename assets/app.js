/* LeCucine — shared interactions: currency switch, mobile menu, accordion, gallery */
(function(){
  // ---------- Currency ----------
  // Each price carries both currencies taken 1:1 from the Figma macet:
  // data-rub (default, ₽) and data-eur (exact € value from the design).
  function fmt(n, cur){
    var s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return cur === 'eur' ? (s + ' \u20ac') : (s + ' \u20bd');
  }
  function applyCurrency(cur){
    document.querySelectorAll('[data-rub]').forEach(function(el){
      var val = parseFloat(el.getAttribute(cur === 'eur' ? 'data-eur' : 'data-rub'));
      if(isNaN(val)) return;
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + fmt(val, cur) + suffix;
    });
    document.querySelectorAll('.cur-sw').forEach(function(b){
      b.setAttribute('aria-checked', cur === 'eur' ? 'true' : 'false');
    });
    try{ localStorage.setItem('lc_currency', cur); }catch(e){}
  }
  document.addEventListener('click', function(e){
    if(e.target.closest('.cur-toggle')){
      var cur = (localStorage.getItem('lc_currency') === 'eur') ? 'rub' : 'eur';
      applyCurrency(cur);
    }
  });
  var saved = 'rub';
  try{ saved = localStorage.getItem('lc_currency') || 'rub'; }catch(e){}
  applyCurrency(saved);

  // ---------- Mobile drawer ----------
  document.addEventListener('click', function(e){
    if(e.target.closest('.burger')){ document.querySelector('.drawer').classList.add('open'); document.body.style.overflow='hidden'; }
    if(e.target.closest('.drawer-close') || e.target.classList.contains('drawer-backdrop')){
      document.querySelector('.drawer').classList.remove('open'); document.body.style.overflow='';
    }
  });

  // ---------- Advantages accordion ----------
  document.addEventListener('click', function(e){
    var h = e.target.closest('.adv-head');
    if(h){ h.closest('.adv-item').classList.toggle('open'); }
  });

  // ---------- Gallery (single image with arrows) ----------
  document.querySelectorAll('[data-gallery]').forEach(function(g){
    var imgs = JSON.parse(g.getAttribute('data-gallery'));
    var i = 0; var imgEl = g.querySelector('img');
    function show(){ imgEl.src = imgs[i]; }
    g.querySelector('.prev') && g.querySelector('.prev').addEventListener('click', function(){ i=(i-1+imgs.length)%imgs.length; show(); });
    g.querySelector('.next') && g.querySelector('.next').addEventListener('click', function(){ i=(i+1)%imgs.length; show(); });
  });

  // ---------- Factory view toggle (2/3 cols) ----------
  document.querySelectorAll('.view-toggle button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('.view-toggle button').forEach(function(x){x.classList.remove('is-on');});
      b.classList.add('is-on');
      var grid = document.querySelector('[data-catalog-grid]');
      if(!grid) return;
      grid.classList.toggle('grid-3', b.getAttribute('data-cols')==='3');
    });
  });
})();
