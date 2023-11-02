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
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTicketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = "";
      if (i === _res.total - 1) {
        tempTag = `
          <div class="swiper-slide">바로가기</div>
        `;
      } else {
        // 일반적인 내용을 출력한다.
        tempTag = `
        <div class="swiper-slide">
          <div class="ticket-slide-item">
              <a href="${obj.url}" class="ticket-link">
                <div class="ticket-img"><img src="${obj.image}" alt="${obj.tit}" /></div>
                <div class="ticket-info">
                    <ul class="ticket-good-list">
                      <li><span class="ticket-good-info-tit">${obj.tit}</span></li>
                      <li><p class="ticket-good-info-desc">${obj.desc}</p></li>
                      <li><span class="ticket-good-info-date">${obj.date}</span></li>
                      <li><span class="ticket-good-info-point seat">${obj.point}</span></li>
                    </ul>
                </div>
              </a>
          </div>
        </div>
      `;
      }
      //console.log(tempTag);
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);
  }

  function showHtmlTag(_html) {
    //console.log(_html);
    // swiper 태그에 백틱을 배치한다.
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;
    //swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    const swiperRecommend = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 27,
      speed: 500,
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },
    });
  }
});
