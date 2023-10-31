var swiper = new Swiper(".live-slide", {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false, //사용자 터치 후 자동실행 다시
  },
  speed: 500,
  navigation: {
    nextEl: ".live-slide-next",
    prevEl: ".live-slide-prev",
  },
});
