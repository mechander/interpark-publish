window.addEventListener("load", function () {
  const fileName = "live.json";

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
    let htmlliveTag = ``;

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
                <div class="live-slide-item">
                <a href="#" class="live-link">
                    <div class="live-img"><img src="images/l1.jpg" alt="" /></div>
                    <div class="live-info">
                    <div class="live-info-sect1">
                        <span class="live-info-state">LIVE</span>
                        <p class="live-info-tit">[나트랑] 스완도르 올인클루시브 5일 70만원대~</p>
                    </div>
                    <div class="live-info-sect2">
                        <div class="live-info-sect2-inner">
                        <span class="live-info-date">11월 02일 (목)</span>
                        <p class="live-info-time">18:00</p>
                        </div>
                    </div>
                    </div>
                </a>
                <a href="#" class="live-detail">
                    <div class="live-detail-info">
                    <div class="detail-img"><img src="images/detail1.png"  alt="" /></div>
                    <div class="detail-info">
                        <span class="detail-tit">[카쇼라X스완도르 리조트]올인올인올인올인올인</span>
                        <p class="detail-info_inr"><em class="detail-discount">12%</em><span class="detail-price">35,000</span>원</p>
                    </div>
                    </div>
                </a>
                </div>
            </div>
          `;
      }
      //console.log(tempTag);
      htmlliveTag += tempTag;
    }
    showHtmlTag(htmlliveTag);
  }

  function showHtmlTag(_html) {
    //console.log(_html);
    // swiper 태그에 백틱을 배치한다.
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;
    //swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    const swiperRecommend = new Swiper(".live-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 27,
      speed: 500,
      navigation: {
        nextEl: ".live-slide-wrap .slide-next-bt",
        prevEl: ".live-slide-wrap .slide-prev-bt",
      },
    });
  }
});
