const wrap = document.querySelector(".main-wrap"); // 보여지는 영역
const mainList = document.querySelectorAll(".main-list");
const nav = document.querySelector("nav");
const navTitle = document.querySelector("h1");
const navImg = document.querySelectorAll(".nav-item a");
const navBtn = document.querySelector(".purple-btn");
const footer = document.querySelector("footer");
const breadCrumbs = document.querySelectorAll(".bread-crumbs button");

let page = 0; // 영역 초기값
const lastPage = mainList.length - 1; // 마지막 페이지
let isScrolling = false; // 스크롤 잠금 상태

const updateUI = () => {
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

  // page 4 white 적용
  if (page === 4) {
    navBtn.classList.add("white-btn");
    navTitle.classList.add("filter-white");
    navImg.forEach((img) => img.classList.add("filter-white"));
  } else {
    navBtn.classList.remove("white-btn");
    navTitle.classList.remove("filter-white");
    navImg.forEach((img) => img.classList.remove("filter-white"));
  }

  // page별 bread-crumbs css 적용
  breadCrumbs.forEach((breadcrumb, index) => {
    breadcrumb.classList.toggle("focusTap", index === page);
  });

  // 페이지 이동
  wrap.style.transform = `translateY(${page * -100}vh)`;

  console.log(`현재 페이지: ${page}`);

  // page2 animation
  let animationInprogress = false;
  const aniContent = document.querySelector(".main-list .ani-content");
  const resetAnimation = () => {
    aniContent.classList.add("ani-content");
    aniContent.classList.add("full");
    aniContent.classList.remove("sub-title");
    aniContent.classList.remove("shrink");
    aniContent.style.opacity = 1;
  };

  if (page === 2) {
    if (!animationInprogress) {
      animationInprogress = true;
      navBtn.classList.add("white-btn");
      navTitle.classList.add("filter-white");
      navImg.forEach((img) => img.classList.add("filter-white"));
      breadCrumbs[2].classList.add("focusTap2");

      setTimeout(() => {
        aniContent.classList.add("shrink");
        setTimeout(() => {
          aniContent.classList.remove("full");
          aniContent.classList.add("sub-title");
          aniContent.classList.remove("full");
          aniContent.classList.remove("shrink");

          //애니메이션 끝
          navImg.forEach((img) => img.classList.remove("filter-white"));
          breadCrumbs[2].classList.remove("focusTap2");
          navBtn.classList.remove("white-btn");
          navTitle.classList.remove("filter-white");
        }, 500);
      }, 1000);
      animationInprogress = false;
    }
  } else {
    resetAnimation();
  }
};

const throttleScroll = (e) => {
  if (isScrolling) return; // 이미 스크롤 중이면 무시

  isScrolling = true; // 스크롤 중 상태로 변경

  // 스크롤 방향에 따라 페이지 인덱스 증가/감소
  if (e.deltaY > 0) {
    page++;
  } else if (e.deltaY < 0) {
    page--;
  }

  // 페이지 인덱스 경계 처리
  page = Math.max(0, Math.min(page, lastPage));

  updateUI(); // UI 업데이트

  // 1초 후 스크롤 가능
  setTimeout(() => {
    isScrolling = false;
  }, 1000); // 1초 동안 스크롤링 무시
};

// Breadcrumb 클릭 이벤트 추가
breadCrumbs.forEach((breadcrumb, index) => {
  breadcrumb.addEventListener("click", (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    e.preventDefault(); // 기본 클릭 동작 방지

    // 클릭한 버튼의 인덱스에 해당하는 페이지로 이동
    page = index;
    isScrolling = false; // 클릭 시 스크롤 잠금 해제
    updateUI(); // UI 업데이트
  });
});

// 스크롤 이벤트
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    throttleScroll(e);
  },
  { passive: false } // 스크롤 디폴트 기능 제거
);
