# 위툰스쿨 교재 전시관

AI 웹툰 제작 도구 위툰(WeToon)과 함께하는 **미니수업 교재 4종**을 소개하는 웹 전시관입니다.
각 교재를 선택하면 소개와 학습목표, 그리고 본문 5페이지 미리보기를 볼 수 있습니다.

## 교재 구성
1. **AI 리터러시** — AI는 친구일까, 도구일까?
2. **사회정서** — 내 마음을 그려봐요!
3. **안전 교육** — 급식실 화재 안전 교육
4. **미디어 리터러시** — 보이는 게 전부일까?

## 구조
```
index.html          전시관 메인(4권 갤러리)
book.html           교재 상세 + 5페이지 뷰어 (?id=book1~book4)
assets/css/         스타일
assets/js/          data.js(교재 데이터) · gallery.js · book.js
assets/images/      교재별 표지 + 미리보기 이미지
```

## 로컬에서 보기
```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```

## 배포
GitHub Pages로 배포됩니다. (Settings → Pages → Branch: main / root)

---
발행 (주)제이지비피애틱 · [wetoon.ai](https://wetoon.ai)
