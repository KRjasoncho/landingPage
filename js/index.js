const wrap = document.querySelector(".main-wrap"); // 보여지는 영역
const mainList = document.querySelectorAll(".main-list");
const nav = document.querySelector("nav");
const navTitle = document.querySelector("h1");
const navImg = document.querySelectorAll(".nav-item img");
const navBtn = document.querySelector(".start-btn");
const footer = document.querySelector("footer");

let page = 0; // 영역 초기값
const lastPage = mainList.length - 1; // 마지막 페이지
let isScrolling = false; //스크롤 잠금 상태

const throttleScroll = (e) => {
  if (isScrolling) return; // 이미 스크롤 중이면 무시

  isScrolling = true; //스크롤 중 상태로 변경
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

  // last page nav/footer 적용
  if (page === lastPage) {
    nav.classList.add("lastNav");
    footer.classList.remove("none");
    navBtn.style.display = "none";
  } else {
    nav.classList.remove("lastNav");
    footer.classList.add("none");
    navBtn.style.display = "block";
  }

  // page 2/4 white 적용
  if (page === 2 || page === 4) {
    navBtn.classList.add("white-btn");
    navTitle.classList.add("filter-white");
    navImg.forEach((img) => {
      img.classList.add("filter-white");
    });
  } else {
    navBtn.classList.remove("white-btn");
    navTitle.classList.remove("filter-white");
    navImg.forEach((img) => {
      img.classList.remove("filter-white");
    });
  }

  console.log(page);

  setTimeout(() => {
    isScrolling = false;
  }, 1000); // 1초동안 스크롤링 무시
};

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    throttleScroll(e);
  },
  { passive: false } // 스크롤 디폴트기능 제거
);
