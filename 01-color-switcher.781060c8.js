!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.getElementsByTagName("body")[0],n=null;e.disabled=!0,t.addEventListener("click",(function(){n=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled"),e.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.781060c8.js.map