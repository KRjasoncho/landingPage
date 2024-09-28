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

  // page[2] animation
  let animationInprogress = false;
  const aniContent = document.querySelector(".main-list .ani-content");
  const solutionList = document.querySelectorAll(
    ".solution-wrap .solution-box"
  );

  const resetAnimation = () => {
    aniContent.classList.add("full");
    aniContent.classList.remove("sub-title");
    aniContent.classList.remove("shrink");
    aniContent.classList.add("ani-content");
    navBtn.classList.add("white-btn");
    navTitle.classList.add("filter-white");
    navImg.forEach((img) => img.classList.add("filter-white"));
    if (page === 2) {
      breadCrumbs[2].classList.add("focusTap2");
    }

    // aniContent의 opacity를 항상 1로 설정
    aniContent.style.opacity = 1;
    solutionList.forEach((el) => {
      el.style.opacity = 0; // opacity를 0으로 초기화
    });
  };

  const startAnimation = () => {
    if (animationInprogress) return; // 애니메이션이 진행중이면 종료
    animationInprogress = true;

    setTimeout(() => {
      aniContent.classList.add("shrink");

      setTimeout(() => {
        aniContent.classList.remove("full");
        aniContent.classList.add("sub-title");
        aniContent.classList.remove("shrink");

        let timeouts = []; // 타이머 ID를 저장할 배열
        let animationInProgress = false; // 애니메이션 진행 상태 체크

        function clearAllTimeouts() {
          // 배열에 저장된 모든 타이머를 취소
          timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
          timeouts = []; // 타이머 배열 초기화
        }

        function resetSolutionList() {
          // 모든 요소의 opacity를 0으로 초기화
          solutionList.forEach((el) => {
            el.style.opacity = 0; // opacity를 0으로 설정
          });
        }

        function startList() {
          // 페이지가 2가 아닐 경우 애니메이션을 중단하고 모든 타이머 취소
          if (page !== 2) {
            clearAllTimeouts(); // 타이머 취소
            resetSolutionList(); // opacity 초기화
            animationInProgress = false; // 애니메이션 상태 초기화
            return; // page !== 2일 때 함수 종료
          }

          // 페이지가 2일 경우 애니메이션 실행
          clearAllTimeouts(); // 이전 타이머를 완전히 초기화하고 새롭게 시작
          resetSolutionList(); // opacity를 0으로 초기화
          animationInProgress = true; // 애니메이션 진행 상태 설정

          // 애니메이션 시작
          solutionList.forEach((el, index) => {
            const timeoutId = setTimeout(() => {
              // page가 여전히 2일 경우에만 opacity를 변경
              if (page === 2) {
                el.style.opacity = 1; // opacity를 1로 설정
              }
            }, index * 1000);

            // 타이머 ID를 배열에 저장
            timeouts.push(timeoutId);
          });
        }

        // 페이지 상태가 바뀔 때마다 이 함수를 호출해야 함
        startList();

        // 페이지가 바뀔 때마다 startList()를 호출해 줘야 함
        window.addEventListener("popstate", () => {
          clearAllTimeouts(); // 이전 타이머를 취소
          resetSolutionList(); // opacity 초기화
          startList(); // 새 애니메이션 시작
        });

        // 페이지를 이동할 때마다 이 코드를 호출하여 페이지 상태를 업데이트
        function navigateToPage(newPage) {
          page = newPage; // 새로운 페이지 상태로 업데이트
          clearAllTimeouts(); // 현재 애니메이션 취소
          resetSolutionList(); // opacity를 0으로 초기화
          startList(); // 새 애니메이션 시작
        }
      }, 1000); // 첫 번째 타임아웃
    }, 1500); // 두 번째 타임아웃

    setTimeout(() => {
      navImg.forEach((img) => img.classList.remove("filter-white"));
      navBtn.classList.remove("white-btn");
      navTitle.classList.remove("filter-white");
      breadCrumbs[2].classList.remove("focusTap2");
    }, 1500); // UI 변경
  };

  // 페이지가 2일 때 애니메이션 시작
  if (page === 2) {
    if (animationInprogress) return; // 진행 중이면 종료
    animationInprogress = false;
    resetAnimation();
    startAnimation();
  } else {
    animationInprogress = false; // 애니메이션 종료
    resetAnimation(); // 다른 페이지에서 애니메이션 초기화
  }
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
