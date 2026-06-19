/* 교재 상세 + 본문 뷰어 */
(function () {
  var params = new URLSearchParams(location.search);
  var id = params.get("id") || "book1";
  var book = window.BOOKS.filter(function (b) { return b.id === id; })[0];
  if (!book) { location.replace("index.html"); return; }

  var TOTAL = window.PAGE_COUNT;
  var S = window.SITE;

  // 테마 색상
  document.documentElement.style.setProperty("--brand", book.color);

  // 메타/소개
  document.title = book.title + " | 위툰스쿨 교재 전시관";
  var badge = document.getElementById("badge");
  badge.textContent = book.category;
  badge.style.background = book.color;
  document.getElementById("series").textContent = book.series;
  document.getElementById("title").textContent = book.title;
  document.getElementById("subtitle").textContent = book.subtitle;
  document.getElementById("summary").textContent = book.summary;
  document.getElementById("cover").src = "assets/images/" + id + "/cover.jpg";
  document.getElementById("cover").alt = book.title + " 표지";

  document.getElementById("objectives").innerHTML = book.objectives
    .map(function (o) { return "<li>" + o + "</li>"; })
    .join("");
  var styleTag = document.createElement("style");
  styleTag.textContent = "#objectives li:before{background:" + book.color + "}";
  document.head.appendChild(styleTag);

  var wlink = document.getElementById("wetoon-link");
  wlink.href = "https://" + S.site;
  document.getElementById("foot").innerHTML =
    "발행 " + S.author + " · " +
    '<a href="https://' + S.site + '" target="_blank" rel="noopener">' + S.site + "</a>";

  // ===== 뷰어 =====
  var stage = document.getElementById("stage");
  var pageImg = document.getElementById("page");
  var counterEl = document.getElementById("counter");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var thumbs = document.getElementById("thumbs");
  var BLUR = window.BLUR_PAGE || 0;
  var PMAP = window.PAGE_MAP || [];
  var TOTAL_PAGES = book.pages || TOTAL;     // 교재 실제 페이지 수
  function realPage(n) { return PMAP[n - 1] || n; } // 미리보기 순서 → 실제 쪽

  function src(n) { return "assets/images/" + id + "/page" + n + ".jpg"; }

  var current = 1;
  function show(n) {
    current = Math.min(Math.max(1, n), TOTAL);
    pageImg.src = src(current);
    pageImg.alt = book.title + " " + realPage(current) + "쪽";
    counterEl.textContent = "전체 " + TOTAL_PAGES + "쪽 중 " + realPage(current) + "쪽";
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === TOTAL;
    stage.classList.toggle("blurred", current === BLUR);
    Array.prototype.forEach.call(thumbs.children, function (btn, i) {
      btn.classList.toggle("active", i + 1 === current);
    });
  }

  // 썸네일
  var t = "";
  for (var i = 1; i <= TOTAL; i++) {
    var lock = i === BLUR ? ' class="locked"' : "";
    t += '<button data-n="' + i + '"' + lock + '><img src="' + src(i) + '" alt="' + i + '번째 미리보기" loading="lazy" /></button>';
  }
  thumbs.innerHTML = t;
  Array.prototype.forEach.call(thumbs.children, function (btn) {
    btn.addEventListener("click", function () { show(Number(btn.dataset.n)); });
  });

  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "Escape") closeLb();
  });

  // 라이트박스(확대)
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  function openLb() {
    if (current === BLUR) return; // 블러 페이지는 확대 불가
    lbImg.src = src(current);
    lb.classList.add("open");
  }
  function closeLb() { lb.classList.remove("open"); }
  pageImg.addEventListener("click", openLb);
  document.getElementById("lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });

  var startPage = parseInt(params.get("p"), 10);
  show(startPage >= 1 && startPage <= TOTAL ? startPage : 1);
})();
