const mainDiv = document.querySelector('#mainDiv');
mainDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.innerText === 'ИЗМЕНИТЬ') {
    const divCard = e.target.closest('[data-notebook]')
    const divForm = divCard.nextElementSibling;
    divCard.classList.toggle('nodisplay');
    divForm.classList.toggle('nodisplay');
  }
})
