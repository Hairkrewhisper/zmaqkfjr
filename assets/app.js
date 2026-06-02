/* LeCucine — shared interactions: currency switch, mobile menu, accordion, gallery */
(function(){
  // ---------- Currency ----------
  // Base prices are stored in RUB (data-rub). EUR is derived with a fixed rate
  // (easily swappable for a live FX API later).
  var RATE_RUB_PER_EUR = 100;
  function fmt(n, cur){
    var s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return cur === 'eur' ? (s + ' \u20ac') : (s + ' \u20bd');
  }
  function applyCurrency(cur){
    document.querySelectorAll('[data-rub]').forEach(function(el){
      var rub = parseFloat(el.getAttribute('data-rub'));
      if(isNaN(rub)) return;
      var val = cur === 'eur' ? rub / RATE_RUB_PER_EUR : rub;
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + fmt(val, cur) + suffix;
    });
    document.querySelectorAll('.cur-switch button').forEach(function(b){
      b.classList.toggle('is-on', b.getAttribute('data-cur') === cur);
    });
    try{ localStorage.setItem('lc_currency', cur); }catch(e){}
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest('.cur-switch button');
    if(b){ applyCurrency(b.getAttribute('data-cur')); }
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
