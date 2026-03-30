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

const logoText = document.querySelector('.logo-text')
const mediaQuery = window.matchMedia('(max-width: 1024px)')

function handleChange(e) {
  if (e.matches) {
    logoText.textContent = 'СТРОИТЕЛЬНАЯ ЭКСПЕРТИЗА'
  } else {
    logoText.textContent = 'Регистрационные номера в СРО: И-050-006700022508-1309, П-153-006700022508-3157.'
  }
}

// при загрузке
handleChange(mediaQuery)
// при изменении
mediaQuery.addEventListener('change', handleChange)

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

// function enableSubmitBtn() {
//   document.querySelectorAll('[type="submit"]').forEach((btn) => {
//     btn.disabled = false // Разблокируем все кнопки отправки
//   })
// }
// function onloadCallback() {
//   renderRecaptchas()
// }
// function renderRecaptchas() {
//   if (typeof grecaptcha !== 'undefined') {
//     document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
//       if (!recaptcha.hasAttribute('data-widget-id')) {
//         let widgetId = grecaptcha.render(recaptcha, {
//           sitekey: recaptcha.getAttribute('data-sitekey'),
//         })
//         recaptcha.setAttribute('data-widget-id', widgetId)
//       }
//     })
//   } else {
//     console.warn('grecaptcha не определён.')
//   }
// }
// document.addEventListener('DOMContentLoaded', renderRecaptchas)
// function resetAllRecaptchas() {
//   if (typeof grecaptcha !== 'undefined') {
//     document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
//       let widgetId = recaptcha.getAttribute('data-widget-id')
//       if (widgetId) {
//         grecaptcha.reset(widgetId)
//       }
//     })
//   } else {
//     console.warn('grecaptcha не определён.')
//   }
// }

// function submitForm(selector) {
//   let form = document.querySelector(selector)
//   if (!form) return // Если форма не найдена, выходим

//   form.addEventListener('submit', function (event) {
//     event.preventDefault() // Останавливаем стандартную отправку

//     let formData = new FormData(form)
//     let submitBtn = form.querySelector('[type="submit"]')
//     submitBtn.disabled = true // Блокируем кнопку, чтобы избежать повторных кликов

//     fetch(form.action, { method: form.method, body: formData })
//       .then((response) => response.json()) // Ожидаем JSON-ответ
//       .then((data) => {
//         if (data.success === true) {
//           ym(95211276, 'reachGoal', 'Отправка_формы') // Фиксируем событие в Метрике
//           form.reset() // Очищаем форму
//           resetAllRecaptchas()
//           closeModal()
//           showModal()
//         } else {
//           alert(data.error || 'Ошибка при отправке формы. Попробуйте ещё раз.')
//         }
//       })
//       .catch((error) => console.error('Ошибка запроса:', error))
//       .finally(() => {
//         submitBtn.disabled = false // Разблокируем кнопку
//       })
//   })
// }

// // Вызываем функцию для каждой формы
// submitForm('.modal-window')
// submitForm('.send-form')

// === Разблокировка кнопок после прохождения капчи ===
function enableSubmitBtn() {
  document.querySelectorAll('[type="submit"]').forEach((btn) => {
    btn.disabled = false
  })
}

// === Рендер всех reCAPTCHA ===
function renderRecaptchas() {
  if (typeof grecaptcha === 'undefined') {
    console.warn('grecaptcha не определён.')
    return
  }

  document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
    if (!recaptcha.hasAttribute('data-widget-id')) {
      const widgetId = grecaptcha.render(recaptcha, {
        sitekey: recaptcha.getAttribute('data-sitekey'),
        callback: enableSubmitBtn,
      })

      recaptcha.setAttribute('data-widget-id', widgetId)
    }
  })
}

// === Вызывается после загрузки API ===
function onloadCallback() {
  renderRecaptchas()
}

// === Сброс всех капч ===
function resetAllRecaptchas() {
  if (typeof grecaptcha === 'undefined') return

  document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
    const widgetId = recaptcha.getAttribute('data-widget-id')
    if (widgetId !== null) {
      grecaptcha.reset(widgetId)
    }
  })
}

// === Отправка формы ===
function submitForm(selector) {
  const form = document.querySelector(selector)
  if (!form) return

  const submitBtn = form.querySelector('[type="submit"]')
  if (submitBtn) submitBtn.disabled = true

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const recaptcha = form.querySelector('.g-recaptcha')
    const widgetId = recaptcha?.getAttribute('data-widget-id')

    const captchaResponse = typeof grecaptcha !== 'undefined' && widgetId ? grecaptcha.getResponse(widgetId) : null

    // ❗ Проверка капчи
    if (!captchaResponse) {
      alert('Подтвердите, что вы не робот')
      return
    }

    const formData = new FormData(form)

    submitBtn.disabled = true

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          // Метрика
          if (typeof ym !== 'undefined') {
            ym(95211276, 'reachGoal', 'Отправка_формы')
          }

          form.reset()
          resetAllRecaptchas()

          if (typeof closeModal === 'function') closeModal()
          if (typeof showModal === 'function') showModal()
        } else {
          alert(data.error || 'Ошибка при отправке формы.')
        }
      })
      .catch((error) => {
        console.error('Ошибка запроса:', error)
        alert('Ошибка сети. Попробуйте позже.')
      })
      .finally(() => {
        submitBtn.disabled = false
      })
  })
}

// === Инициализация ===
submitForm('.modal-window')
submitForm('.send-form')
