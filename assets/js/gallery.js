/* 갤러리(메인) 렌더링 */
(function () {
  var S = window.SITE, books = window.BOOKS;

  // 사이트 소개 텍스트
  document.getElementById("site-intro").textContent = S.intro;
  document.getElementById("site-author").textContent = S.author;
  document.getElementById("site-site").textContent = S.site;
  document.getElementById("f-author").textContent = S.author;
  var fsite = document.getElementById("f-site");
  fsite.textContent = S.site;
  fsite.href = "https://" + S.site;

  // 책 카드
  var grid = document.getElementById("grid");
  grid.innerHTML = books
    .map(function (b) {
      return (
        '<a class="card" href="book.html?id=' + b.id + '">' +
          '<div class="thumb">' +
            '<span class="badge" style="background:' + b.color + '">' + b.no + "</span>" +
            '<img src="assets/images/' + b.id + '/cover.jpg" alt="' + b.title + ' 표지" loading="lazy" />' +
          "</div>" +
          '<div class="body">' +
            '<span class="cat" style="color:' + b.color + '">' + b.category + "</span>" +
            "<h3>" + b.title + "</h3>" +
            "<p>" + b.summary + "</p>" +
            '<span class="more" style="color:' + b.color + '">자세히 보기 <span class="arrow">→</span></span>' +
          "</div>" +
        "</a>"
      );
    })
    .join("");

  // 공통 특징
  document.getElementById("features").innerHTML = window.COMMON_FEATURES.map(
    function (f) {
      return '<div class="feat">' + f + "</div>";
    }
  ).join("");
})();
