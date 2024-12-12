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
 */
async function addRevertButton(mainContent) {
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
/**
 * @param {HTMLElement} editor
 * @param {string} action
 */
function adjustFontSize(action, editor) {
  const fontSize = Number(editor.style.fontSize.replace(/\D/g, ""));
  newSize = action === "+" ? `${fontSize + 5}px` : `${fontSize - 5}px`;
  editor.style.fontSize = newSize;
}

/**
 * @param {HTMLElement} editor
 */
function addFontControls(editor) {
  const plusButton = document.createElement("button");
  plusButton.onclick = () => adjustFontSize("+", editor);
  plusButton.textContent = "+";
  // plusButton.style.right = "2%"
  const minusButton = document.createElement("button");
  minusButton.onclick = () => adjustFontSize("-", editor);
  minusButton.textContent = "-";
  // plusButton.style.right = "5%"
  const buttons = [minusButton, plusButton];
  const buttonDiv = document.createElement("div");
  buttonDiv.append(buttons);
  buttons.forEach((button) => {
    button.style.borderRadius = ".25rem";
    button.style.backgroundColor = "#005f9f";
    button.style.color = "#FFF";
    button.style.margin = "0px";
    button.style.padding = "0px";
    button.style.height = "40px";
  });
  editor.append(buttonDiv);
  // buttonDiv.style.position = "absolute";
  // buttonDiv.style.top = "0px";
  // buttonDiv.style.right = "2%";
  buttonDiv.style.display = "flex";
  buttonDiv.style.flexDirection = "row";
}

function fixLayout() {
  const editors = document.querySelectorAll(".ace_content");
  console.log("🚀 ~ fixLayout ~ editors:", editors.length);

  // for (let i = 0; i < editors.length; i++) {
  //   console.log("hi!!!");
  //   addFontControls(editors[i]);
  // }
  const mainContent = document.getElementById("page-content");
  console.log("🚀 ~ fixLayout ~ mainContent:", mainContent);
  const quizNav = document.getElementById("theme_osiris-drawers-blocks");
  const contentRect = mainContent.getBoundingClientRect();
  const { width } = contentRect;
  const asideRect = quizNav && document.getElementById("theme_osiris-drawers-blocks")?.getBoundingClientRect();

  if (mainContent && asideRect) {
    mainContent.style.position = "absolute";
    mainContent.style.left = "0";
    mainContent.style.width = asideRect.left ? `${asideRect.left}px` : `98vw`;
    return { mainContent, width };
  } else console.log("im dumb:(");
}
addRevertButton(fixLayout());

document.addEventListener(onkeydown, (ev) => {
  if (ev.ctrlKey && ev.key === "Enter") console.log("correct bind");
});
