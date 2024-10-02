const wrap = document.querySelector(".main-wrap"); // 보여지는 영역
const mainList = document.querySelectorAll(".main-list");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navTitle = document.querySelector("h1");
const navImg = document.querySelectorAll(".nav-item a");
const navBtn = document.querySelector(".purple-btn");
const footer = document.querySelector("footer");
const breadCrumbs = document.querySelectorAll(".bread-crumbs button");

let page = 0; // 영역 초기값
const lastPage = mainList.length - 1; // 마지막 페이지
let isScrolling = false; // 스크롤 잠금 상태
let flags = false;

const updateUI = () => {
  // last page nav/footer 적용
  if (page === lastPage) {
    header.classList.add("last-header");
    nav.classList.add("last-nav");
    footer.classList.remove("none");
    navBtn.style.display = "none";
  } else {
    header.classList.remove("last-header");
    nav.classList.remove("last-nav");
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

  // page[2] animation
  let animationInprogress = false;
  const aniContent = document.querySelector(".main-list .ani-content");
  const solutionList = document.querySelectorAll(
    ".solution-wrap .solution-box"
  );
  const playMediaQuery = window.matchMedia("(min-width: 1401px)");

  const startAnimation = () => {
    if (page === 2 && playMediaQuery.matches) {
      if (!flags) {
        if (animationInprogress) return; // 애니메이션이 진행중이면 종료
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
            aniContent.classList.remove("shrink");

            setTimeout(() => {
              solutionList.forEach((el, index) => {
                setTimeout(() => {
                  el.style.opacity = 1;
                }, index * 1500);
              });
            }, 1000);
          }, 1000);
        }, 1500);

        setTimeout(() => {
          navImg.forEach((img) => img.classList.remove("filter-white"));
          navBtn.classList.remove("white-btn");
          navTitle.classList.remove("filter-white");
          breadCrumbs[2].classList.remove("focusTap2");
        }, 1700);
      }
      animationInprogress = false;
      flags = true;
    }
  };
  if (playMediaQuery.matches) {
    startAnimation();
  } else {
    aniContent.classList.remove("full");
    aniContent.classList.add("sub-title");
    solutionList.forEach((el) => {
      el.style.opacity = 1;
    });
  }

  playMediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      startAnimation();
    }
  });
};

// page[4] hovering animation
function handleHover(item, hoverClass, titleClass, contentClass) {
  const provideTitle = item.querySelector(".provide-title");
  const provideContent = item.querySelector(".provide-content");

  item.addEventListener("mouseover", () => {
    item.classList.add(hoverClass);

    if (provideTitle) {
      provideTitle.classList.add("hovering-title", "hover-box-underline");
    }

    if (provideContent) {
      provideContent.classList.add(contentClass);
      provideContent.style.display = "block";
    }
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove(hoverClass);

    if (provideTitle) {
      provideTitle.classList.remove("hovering-title", "hover-box-underline");
    }

    if (provideContent) {
      provideContent.classList.remove(contentClass);
      provideContent.style.display = "none";
    }
  });
}

// 좌측 리스트 처리
document.querySelectorAll(".provide-list-left").forEach((list) => {
  list.querySelectorAll(".provide-list").forEach((item) => {
    handleHover(item, "hover-box-left", "hovering-title", "hovering-list");
  });
});

// 우측 리스트 처리
document.querySelectorAll(".provide-list-right").forEach((list) => {
  list.querySelectorAll(".provide-list").forEach((item) => {
    handleHover(item, "hover-box-right", "hovering-title", "hovering-list");
  });
});

// 스크롤이벤트
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
    e.stopPropagation();
    e.preventDefault();

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
