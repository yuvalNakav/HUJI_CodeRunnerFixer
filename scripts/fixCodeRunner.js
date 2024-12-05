let isActive = true;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * @param {HTMLElement} mainContent
 */
function resetContentLayout(mainContent) {
  const topScrollRect = document.getElementById("topofscroll")?.getBoundingClientRect();
  console.log("🚀 ~ resetContentLayout ~ topScrollRect:", topScrollRect);
  if (mainContent) {
    console.log("all good?");
    mainContent.style.position = null;
    mainContent.style.width = null;
  }
}

/**
 * @param {HTMLElement} mainContent
//  * @param {CSSStyleDeclaration} width
 */
async function addRevertButton({ mainContent, width }) {
  window.addEventListener("resize", fixLayout);
  const button = document.createElement("button");
  button.onclick = () => {
    if (isActive) {
      resetContentLayout(mainContent);
      window.removeEventListener("resize", fixLayout);
    } else {
      fixLayout();
      window.addEventListener("resize", fixLayout);
    }
    isActive = !isActive;
  };
  button.textContent = "Resize Runner";
  button.id = "fixer-revert-btn";
  const rowDiv = document.getElementsByClassName("row")[0];
  rowDiv.append(button);

  button.style.borderRadius = ".25rem";
  button.style.backgroundColor = "#005f9f";
  button.style.color = "#FFF";
  button.style.margin = "0px";
  button.style.padding = "0px";
  button.style.height = "40px";

  for (let i = 0; i < 3; i++) {
    await sleep(300);
    button.style.opacity = "50%";
    await sleep(300);
    button.style.opacity = "100%";
  }
}

function fixLayout() {
  const mainContent = document.getElementById("page-content");
  const quizNav = document.getElementById("theme_osiris-drawers-blocks");
  const contentRect = mainContent.getBoundingClientRect();
  const { width } = contentRect;
  const asideRect = quizNav && document.getElementById("theme_osiris-drawers-blocks")?.getBoundingClientRect();
  if (mainContent && asideRect?.left) {
    mainContent.style.position = "absolute";
    mainContent.style.left = "0";
    mainContent.style.width = `${asideRect.left}px`;
    return { mainContent, width };
  } else console.log("im dumb:(");
}
addRevertButton(fixLayout());
