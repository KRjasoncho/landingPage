const wrap = document.querySelector(".main-wrap"); // 보여지는 영역
const mainList = document.querySelectorAll(".main-list");

let page = 0; // 영역 초기값
const lastPage = mainList.length - 1; // 마지막 페이지

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      page++;
    } else if (e.deltaY < 0) {
      page--;
    }
    if (page < 0) {
      page = 0;
    } else if (page > lastPage) {
      page = lastPage;
    }
    wrap.style.transform = `translateY(${page * -100}vh)`;
  },
  { passive: false } // 스크롤 디폴트기능 제거
);
