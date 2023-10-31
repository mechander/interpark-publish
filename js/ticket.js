window.addEventListener("load", function () {
  const fileName = "ticket.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다
  xhr.open("GET", fileName);
  xhr.send();
  // 데이터의 전송 상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    //console.log("데이터 전송 상태 확인", event.target.readyState);
    //if (event.target.readyState === XMLHttpRequest.DONE) {
    //console.log("자료 가져오는데 성공완료", event.target.response);
    // }
  };

  const htmlTicketTag = ``;

  const ticKetSlide = ".ticket-slide .swiper-wrapper";

  var swiperTicket = new Swiper(".ticket-slide", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24,
    speed: 500,
    navigation: {
      nextEl: ".ticket-slide-wrap .slide-next-bt",
      prevEl: ".ticket-slide-wrap .slide-next-bt",
    },
  });
});
