const wrap = document.querySelector(".main-wrap")[0];
const mainList = document.querySelectorAll(".main-list");

let page = 0;
const lastPage = mainList.length - 1;

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
  { passive: false }
);
