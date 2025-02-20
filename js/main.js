$(document).ready(function () {
  function initSlider(selector) {
    $(selector).slick({
      arrows: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1180,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
  }
  initSlider('.certificate__items')
  initSlider('.rewiews__items')
  initSlider('.our-objects__items')

  function initFancybox(selector) {
    $(selector).fancybox({
      prevEffect: 'none',
      nextEffect: 'none',
      closeBtn: false,
      helpers: {
        title: { type: 'inside' },
        buttons: {},
      },
    })
  }
  initFancybox('.objects')
  initFancybox('.certificate__item')
  initFancybox('.rewiews__item')

  $('.partners__box').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
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

function showModal() {
  const modal = document.getElementById('successModal')
  modal.style.display = 'flex'
  setTimeout(() => {
    modal.style.display = 'none'
  }, 5000)
}

function submitForm(selector) {
  let form = document.querySelector(selector)
  if (!form) return // Если форма не найдена, выходим

  form.addEventListener('submit', function (event) {
    event.preventDefault() // Останавливаем стандартную отправку

    let formData = new FormData(form)
    let submitBtn = form.querySelector('[type="submit"]')

    fetch(form.action, { method: form.method, body: formData })
      .then((response) => response.json()) // Ожидаем JSON-ответ
      .then((data) => {
        if (data.success === true) {
          ym(95211276, 'reachGoal', 'Отправка_формы') // Фиксируем событие в Метрике
          form.reset() // Очищаем форму
          closeModal()
          showModal()
        } else {
          alert(data.error || 'Ошибка при отправке формы. Попробуйте ещё раз.')
        }
      })
      .catch((error) => console.error('Ошибка запроса:', error))
  })
}

// Вызываем функцию для каждой формы
submitForm('.modal-window')
submitForm('.send-form')
