document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".crime-filter-item[data-color]").forEach(function (item) {
    var borderColor = item.getAttribute("data-color");
    item.style.borderColor = borderColor;
    item.style.borderWidth = "4px";
    item.style.borderStyle = "outset";
  });
});
