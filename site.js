// Fade the logo and menu out before leaving the page; the next page fades them back in
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// "/" and "/index.html" are the same homepage
const page = path => path.replace(/\/index\.html$/, '/');
const samePage = path => page(path) === page(location.pathname);

document.querySelectorAll('.menu__link, .masthead .logo').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const newTab = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (newTab || href.startsWith('#') || samePage(link.pathname)) return;

    e.preventDefault();
    link.closest('.masthead').classList.add('is-leaving');
    setTimeout(() => { location.href = link.href; }, reduceMotion ? 0 : 700);
  });
});

// Coming back with the browser's Back button restores the page as it was left
addEventListener('pageshow', e => {
  if (e.persisted) document.querySelectorAll('.masthead.is-leaving').forEach(n => n.classList.remove('is-leaving'));
});
