const btnToTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 250) {
    btnToTop.style.display = 'block';
  } else {
    btnToTop.style.display = 'none';
  }
});

btnToTop.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
});
