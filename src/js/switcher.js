const switchEl = document.querySelector('.switcher-toggle');

switchEl.addEventListener('change', e => {
  if (e.target.checked) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

if (localStorage.getItem('theme') === 'dark') {
  switchEl.checked = true;
  document.body.classList.add('dark');
  document.body.classList.remove('light');
}
