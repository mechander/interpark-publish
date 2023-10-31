// 모든 js 는 html 태그를 로드 완료하고 실행해야 안전하다.
// 그런데 현재 .js파일을 head태그에서 불러들이므로 불안전하다.
// 오류가 날 확률이 무척 높다.
// 아래의 window는  웹브라우저다.
//onload는 절대로 소문자로 작성압니다. 약속되어 있습니다.
// 아래 문자 해석
// 웹브라우저에 htllm, css, js, image..
// 로드 완료 하면 function을 한다라고 약속을 하였다.
// window.onload = function(){

// }
window.addEventListener("load", function () {
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성: 의사코드
  // 1. 외부 데이터를 불러온다.
  //: 외부 데이터 파일명.json
  const fileName = "recommend.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다
  xhr.open("GET", fileName);
  xhr.send();
  // consoe.log(xhr);
  // 데이터의 전송 상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    //console.log(event);
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      //console.log(this.readyState)
      //console.log("자료 가져오는데 성공완료", event.target.response);
      // 코드가 가독성이 떨어지므로 변수에 담는다. 규칙은 const 부터 작성하자.
      // const가 문제가 된다면 let으로 변경한다.
      // res 외부에서 들어온 데이타 보통 쓰는 변수명
      const res = event.target.response;
      //res 를 전달해서 html 태그를 만든다.
      //데이터를 전달할때 정리해서 전달하는 것이 관례
      // 전달받은 문자열을 js에서 사용하도록
      //JSON 데이터로 해석 (parse)하여 객체화{원시데이터 묶음} 한다.
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };
  //html 태그를 만드는 기능
  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    //console.log(_res);
    // html 태그를 백틱을 이용해서 만든다.
    let htmlRecommendTag = ``;
    // _res 에 담겨진 객체에서 total 을 보관한다.
    //const total = _res.total;

    // 우리가 몇번 반복(total)해야 하는지 안다.
    // for (초기값; 조건; 증감) {
    // 반복 하고 싶은일
    // }
    for (let i = 0; i < _res.total; i++) {
      // 가독성이 떨어진다.
      const index = i + 1;
      const obj = _res["good_" + index];
      //console.log(obj);

      const tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item">
            <a href="${obj.url}" class="recommend-link">
              <div class="recommend-img">
                <img src="${obj.image}" alt="${obj.desc}" />
              </div>
              <div class="recommend-info">
                <ul class="recommend-good-list">
                  <li>
                    <span class="recommend-good-info-price">
                      <b>${obj.discount}%</b>
                      <em>${obj.price}</em>
                      원
                    </span>
                  </li>
                  <li>
                    <p class="recommend-good-info-desc">
                    ${obj.desc}
                    </p>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      `;
      //console.log(tempTag);
      htmlRecommendTag += tempTag;
    }
    //console.log(htmlRecommendTag);
    // 관례에 맞지 않다
    //for (let i = 1; i <= total; i++) {
    //  console.log("good_" + i);
    // }
    showHtmlTag(htmlRecommendTag);
  }
  //html출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    //console.log(_html);
    // swiper 태그에 백틱을 배치한다.
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;
    //swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    const swiperRecommend = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 27,
      speed: 500,
      navigation: {
        nextEl: ".recommend-slide-wrap .slide-next-bt",
        prevEl: ".recommend-slide-wrap .slide-prev-bt",
      },
    });
  }
  // 4. swiper 작동시킨다.
  //const recommendSwiper = new swiperRecommend(".recommend-slide");
});
