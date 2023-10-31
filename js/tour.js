window.addEventListener("load", function () {
  const fileName = "tour.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다
  xhr.open("GET", fileName);
  xhr.send();
  // 데이터의 전송 상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    // 네트워크로 xhr 로 연결을 하면 연결 과정마다 readyState 가 바뀜
    // readyState 가 바뀐 상태를 onreadystatechange 로 확인 가능
    // event.target.readyState 를 보고서 할 일을 별도로 if 문에서 작성을 함

    if (event.target.readyState === XMLHttpRequest.DONE) {
      // event.target 에는 다양한 네트워크 결과가 담겨있음
      // 그중 우리는 결과 문자열을 보고싶음
      // 결과 문자열은 event.target.response 에 보관되어 있음
      // 그래서 변수에 담음
      const res = event.target.response;
      //console.log(res);
      const json = JSON.parse(res);
      //console.log(json);
      makeHtmlTag(json);
    }
  };
  //html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    //console.log(_res);

    let htmlTourTag = ``;
    console.log(_res.total);
    for (let i = 0; i < _res.total; i++) {
      //console.log("tour_" + (i + 1));
      const index = i + 1;
      const obj = _res["tour_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}" class="tour-link">
            <div class="tour-img"><img src="${obj.image}" alt="${obj.desc}" /></div>
            <div class="tour-info">
                <strong class="tour-caption">${obj.badge}</strong>
                <ul class="tour-good-list">
                  <li><span class="tour-good-info-tit">${obj.tour_title}</span></li>
                  <li><p class="tour-good-info-desc">${obj.desc}</p></li>
                  <li><span class="tour-good-info-price"><b class="black">${obj.price}</b>원</span></li>
                </ul>
            </div>
          </a>
        </div>
      </div>
      `;
      console.log(tempTag);
      htmlTourTag += tempTag;
      console.log(htmlTourTag);
      showHtmlTag(htmlTourTag);
    }
  }

  //html출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    console.log(_html);
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }

  //swiper 만들고 실행하기
  function makeSwiper() {
    //const tourSlide = "tour-slide .swiper-wrapper";

    //const tourSwiper = new swiperTour("tour-slide-slide");

    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
      speed: 500,
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
    });
  }
});
