!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.getElementsByTagName("body")[0],a=null;t.addEventListener("click",(function(){a=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(a),t.removeAttribute("disabled"),e.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.bbfc4f16.js.map
