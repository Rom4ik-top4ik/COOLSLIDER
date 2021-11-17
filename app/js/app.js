import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation} from 'swiper'
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

import { gsap, Power2 } from 'gsap'

import MicroModal from 'micromodal'

document.addEventListener('DOMContentLoaded', () => {

  //MODAL

  MicroModal.init({
    openTrigger: 'data-micromodal-open',
    closeTrigger: 'data-micromodal-close',
    disableFocus: true,
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  })

  //SWIPER

	const swiperIMG = new Swiper('.slider-img', {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el:'.slider-pagination-count .total',
      type: 'custom',
      renderCustom: function(swiper, current, total) {
        let totares = total >= 10 ? total : `0${total}`
        return totares
      }
    }
  })

  const swiperText = new Swiper('.slider-text', {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    }
  })

  swiperIMG.controller.control = swiperText
  swiperText.controller.control = swiperIMG

  //GEAR

  let gear = document.querySelector('.slider-gear')

  swiperText.on('slideNextTransitionStart', function() {
    gsap.to(gear, 2.8, {
      rotation: '+=40',
      ease: Power2.easeOut
    })
  })
  swiperText.on('slidePrevTransitionStart', function() {
    gsap.to(gear, 2.8, {
      rotation: '-=40',
      ease: Power2.easeOut
    })
  })

  //SLIDE CHANGE

  let curnum = document.querySelector('.slider-pagination-count .current'),
     pagcure = document.querySelector('.slider-pagination-current__num')

  swiperText.on('slideChange', function(){
    let ind = swiperText.realIndex + 1,
     indRes = ind >= 10 ? ind : `0${ind}`
    gsap.to(curnum, .2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function() {
        gsap.to(curnum, .1, {
          force3D: true,
          y: 10,
        })
        curnum.innerHTML  = indRes
        pagcure.innerHTML = indRes
      }
    })
    gsap.to(curnum, .2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: .3,
    })
  })

//CURSOR

const body   = document.querySelector('body'),
      cursor = document.getElementById('cursor'),
      links  = document.getElementsByTagName('a')


let mouseX = 0, mouseY = 0, posX = 0, posY = 0

function mouseCoords(e) {
  mouseX = e.pageX
  mouseY = e.pageY
}

gsap.to({}, .01, {
  repeat: -1,
  onRepeat: () => {
    posX += (mouseX - posX) / 6
    posY += (mouseY - posY) / 6
    gsap.set(cursor, {
      css: {
        left: posX,
        top: posY
      }
    })
  }
})

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('mouseover', () => {
    cursor.classList.add('active')
  })
  links[i].addEventListener('mouseout', () => {
    cursor.classList.remove('active')
  })
}

body.addEventListener('mousemove', e => {
  mouseCoords(e)
  cursor.classList.remove('hidden')
})
body.addEventListener('mouseout', e => {
  cursor.classList.add('hidden')
})

})
