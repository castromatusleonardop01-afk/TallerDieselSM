// Taller Diesel S.M. — interacciones de la página
(function () {
    // ----- Menú móvil -----
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    function closeMenu() {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

    // ----- Galería: ver más -----
    var grid = document.getElementById('galleryGrid');
    var moreBtn = document.getElementById('galleryMore');
    moreBtn.addEventListener('click', function () {
        var showing = grid.classList.toggle('show-all');
        moreBtn.innerHTML = showing
            ? '<i class="fa-solid fa-chevron-up"></i> Ver menos'
            : '<i class="fa-solid fa-images"></i> Ver más fotos';
        if (!showing) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ----- Visor de fotos -----
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lbImg');
    var items = Array.prototype.slice.call(grid.querySelectorAll('.g-item'));
    var current = 0;
    var lastFocus = null;

    function visibleItems() {
        return items.filter(function (el) { return el.offsetParent !== null; });
    }
    function show(i) {
        var list = visibleItems();
        current = (i + list.length) % list.length;
        var img = list[current].querySelector('img');
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
    }
    function openLb(el) {
        lastFocus = el;
        show(visibleItems().indexOf(el));
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        document.getElementById('lbClose').focus();
    }
    function closeLb() {
        lb.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (el) {
        el.addEventListener('click', function () { openLb(el); });
    });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });

    // ----- Año del pie de página -----
    document.getElementById('year').textContent = new Date().getFullYear();
})();
