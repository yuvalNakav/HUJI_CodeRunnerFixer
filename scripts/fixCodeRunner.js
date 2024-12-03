function fixLayout() {
  const mainContent = document.getElementById("page-content");
  const quizNav = document.getElementById("theme_osiris-drawers-blocks");
  const asideRect = quizNav && document.getElementById("theme_osiris-drawers-blocks")?.getBoundingClientRect();
  if (mainContent && asideRect?.left) {
    mainContent.style.position = "absolute";
    mainContent.style.right = asideRect.left.toString();
    mainContent.style.left = "0";
    mainContent.style.width = `${asideRect.left}px`;
    console.log("code runner fixed");
  } else console.log("im dumb:(");
}
window.addEventListener("resize", fixLayout);
fixLayout();
