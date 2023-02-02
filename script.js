const tabsBox = document.querySelector(".tabs-box");
const arrowIcons = document.querySelectorAll(".icon i");
const allTabs = document.querySelectorAll(".tab");

let isDragging = false;

const handleIcons = () => {
  let scrollVal = Math.round(tabsBox.scrollLeft);
  let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth > scrollVal ? "flex" : "none";
};

allTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // remove the active class from the previous tab and add to current tab
    tabsBox.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
  });
});

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // if left icon is clicked, reduce 350 from tabsbox scrollLeft else add
    tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;
    setTimeout(() => handleIcons(), 50);
  });
});

const dragging = (e) => {
  // console.log("dragging...");
  if (!isDragging) return;
  tabsBox.classList.add("dragging");
  tabsBox.scrollLeft -= e.movementX;
  handleIcons();
};

const dragStop = () => {
  let isDragging = false;
  tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => (isDragging = true));
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
