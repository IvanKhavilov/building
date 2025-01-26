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
  $('.partners__box').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })
})

function setupParallax() {
  let mainParalax = document.getElementById('bg-parallax')
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY
    mainParalax.style.transform = `translateY(${scrollY}px)`
    mainParalax.style.backgroundPositionY = `${-scrollY / 2}px`
  })
}
setupParallax()

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
        if (data == true) {
          console.log(data)
          alert('Сообщение отправлено') // Вывод сообщения об успешной отправке
          closeModal() // Закрытие модального окна
        } else {
          console.log(data)
          alert('Сообщение не отправлено') // Вывод сообщения об ошибке
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
submitForm('.send-form')
