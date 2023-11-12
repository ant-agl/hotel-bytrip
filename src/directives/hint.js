const directive = {
  created(el, binding) {
    let id = String(Math.random()).slice(2);
    let hint;

    const onResize = () => {
      fitPositionHintForElem(el, hint);
    };

    el.addEventListener("pointerover", () => {
      hint = createHintElement(id, binding.value);
      showHintForElem(el, hint);
      window.addEventListener("resize", onResize);
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
}

function fitPositionHintForElem(el, hint) {
  let elemCors = el.getBoundingClientRect();
  let scrollTop = document.documentElement.scrollTop + elemCors.bottom;
  let scrollLeft = document.documentElement.scrollLeft + elemCors.left;
  hint.style.left = scrollLeft + 10 + "px";
  hint.style.top = scrollTop - 10 + "px";
}

function hideHint(hint) {
  hint.classList.add("disappearance-animation");
  setTimeout(() => hint.remove(), 500);
}

export { directive };
