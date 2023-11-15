let isShowed = false;

const directive = {
  created(el, binding) {
    let id = String(Math.random()).slice(2);
    let hint;

    const onResize = () => {
      fitPositionHintForElem(el, hint);
    };

    el.addEventListener("pointerover", () => {
      if (isShowed) return;
      hint = createHintElement(id, binding.value);
      showHintForElem(el, hint);
      window.addEventListener("resize", onResize);
      console.log(hint);
    });

    el.addEventListener("pointerleave", () => {
      hideHint(hint);
      window.removeEventListener("resize", onResize);
    });
  },
};

function createHintElement(id, content) {
  let hint = document.createElement("div");
  hint.className = `hint-${id} hint-directive`;
  hint.textContent = content;
  return hint;
}

function showHintForElem(el, hint) {
  fitPositionHintForElem(el, hint);
  document.body.append(hint);
  isShowed = true;
}

function fitPositionHintForElem(el, hint) {
  let elemCors = el.getBoundingClientRect();
  let windowWidth = document.documentElement.clientWidth;

  let widthToRight = windowWidth - elemCors.left;
  let widthToLeft = elemCors.left;

  let offsetTop = document.documentElement.scrollTop + elemCors.bottom;
  hint.style.top = offsetTop + "px";

  if (widthToRight > widthToLeft) {
    let offsetLeft = document.documentElement.scrollLeft + elemCors.left;
    hint.style.left = offsetLeft + "px";
    hint.style.maxWidth = widthToRight - 50 + "px";
  } else {
    hint.style.right = widthToRight + "px";
    hint.style.maxWidth = widthToLeft - 50 + "px";
  }

  let windowHeight = document.documentElement.clientHeight;
  hint.style.maxHeight = windowHeight - elemCors.top - 50 + "px";
}

function hideHint(hint) {
  hint.classList.add("disappearance-animation");
  isShowed = false;
  setTimeout(() => {
    hint.remove();
  }, 500);
}

export { directive };
