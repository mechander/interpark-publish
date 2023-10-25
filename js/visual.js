// 백엔드 Response 데이터
const xh = new XMLHttpRequest();
xh.open("GET", "visual.json");
xh.send();
xh.onreadystatechange = function (event) {
  // console.log(event.target);
  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다!!");
    console.log(event.target.response);
    const result = JSON.parse(event.target.response);
    console.log(result);
  }
};

const visualRes = {};
// 출력을 시켜줄 문장을 만들자.
let visualHtml = "";
// total 만큼 반복하자.
//for 은 반복을 하는데 true 인 경우만 반복한다.
for (i = 1; i <= visualRes.total; i++) {
  console.log(i);
  let temp = `
    <div class="swiper-slide">
        <div class="visual-slide-item">
            <a href="${visualRes["visual_" + i].url}">
                <img src="${visualRes["visual_" + i].file}" alt="${
    visualRes["visual_" + i].url
  }" />
            </a>
        </div>
    </div>
`;

  visualHtml += temp;
}

// 어디다가 자료를 출력할 것인지 지정
const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
visualSlide.innerHTML = visualHtml;
