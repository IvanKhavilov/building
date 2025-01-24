$(document).ready(function () {
  $('.fancybox-button').fancybox({
    prevEffect: 'none',
    nextEffect: 'none',
    closeBtn: false,
    helpers: {
      title: { type: 'inside' },
      buttons: {},
    },
  })
})
let mainParalax = document.getElementById('bg-parallax')
this.addEventListener('scroll', function () {
  mainParalax.style.top = +this.scrollY + 'px'
  mainParalax.style.backgroundPositionY = -+(+this.scrollY) / 2 + 'px'
})

const btnForm = document.querySelectorAll('.btn-form')
const modalWindow = document.querySelector('.modal-window')
const overlay = document.getElementById('overlay')
const btnClose = document.querySelector('.btn-close')

for (let i = 0; i < btnForm.length; i++) {
  btnForm[i].addEventListener('click', function () {
    modalWindow.classList.add('active')
  })
}

function closeModal() {
  modalWindow.classList.remove('active')
}

overlay.addEventListener('click', closeModal)
btnClose.addEventListener('click', closeModal)

const geolocationBtn = document.getElementById('geolocation-btn__inner')
const map = document.querySelectorAll('.map')

const changeClass = (el) => {
  for (let btn of document.querySelectorAll('.geolocation-btn')) {
    btn.classList.remove('active')
  }
  el.classList.add('active')
}
geolocationBtn.addEventListener('click', (e) => {
  const currBtn = e.target.dataset.location
  changeClass(e.target)

  for (let i = 0; i < map.length; i++) {
    map[i].classList.remove('active')
    if (map[i].dataset.map === currBtn) {
      map[i].classList.add('active')
    }
  }
})

let submitForm = function (selector) {
  document.querySelector(selector).addEventListener('submit', function (event) {
    event.preventDefault() // Предотвращаем отправку формы по умолчанию

    let formData = new FormData(this)

    fetch('mail.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Закрытие модального окна при успешной отправке
          this.closest('.modal-window').classList.remove('open')
          alert(data.message) // Вывод сообщения об успешной отправке
        } else {
          alert(data.message) // Вывод сообщения об ошибке
        }
        this.reset() // Сбрасываем форму
      })
      .catch((error) => {
        console.error('Ошибка:', error)
        alert('Ошибка при отправке формы.')
      })
  })
}

submitForm('.modal-window')
