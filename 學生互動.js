"use strict";
(() => {
  const byId = (id) => document.getElementById(id);
  const editor = byId("htmlEditor");
  if (!editor) return;
  const initialHTML = editor.value;
  const allowedTags = new Set(["H1", "H2", "H3", "P", "STRONG", "EM", "UL", "OL", "LI", "DIV", "SPAN", "SECTION", "A", "BR"]);
  // 練習只呈現基本結構；重新建立元素，不保留事件、外連或其他屬性。
  function cleanHTML(source) {
    const parsed = new DOMParser().parseFromString(source, "text/html");
    const output = document.createElement("div");
    function copy(node, parent) {
      if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE && allowedTags.has(node.tagName)) {
        const element = document.createElement(node.tagName.toLowerCase());
        parent.appendChild(element);
        for (const child of node.childNodes) copy(child, element);
      }
    }
    for (const child of parsed.body.childNodes) copy(child, output);
    return output.innerHTML;
  }
  function renderHTML(announce = true) {
    const content = cleanHTML(editor.value);
    byId("htmlPreview").srcdoc = '<!doctype html><html lang="zh-TW"><head><meta charset="utf-8">' +
      '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; base-uri \'none\'; form-action \'none\'">' +
      '<style>body{font-family:system-ui,sans-serif;color:#172b3a;line-height:1.7;padding:8px 16px;overflow-wrap:anywhere}h1,h2,h3{line-height:1.4}p{margin:12px 0}</style></head><body>' + content + '</body></html>';
    if (announce) byId("htmlFeedback").textContent = "預覽已更新。找找標題、段落和加粗內容，對照你改的標籤。";
  }
  byId("runHtml").addEventListener("click", () => renderHTML());
  byId("resetHtml").addEventListener("click", () => {
    editor.value = initialHTML;
    renderHTML(false);
    byId("htmlFeedback").textContent = "已還原 HTML 範例。";
  });
  function renderCSS(announce = true) {
    const color = byId("cssColor").value;
    const font = byId("cssFont").value;
    const padding = byId("cssPadding").value;
    const radius = byId("cssRadius").value;
    Object.assign(byId("cssPreview").style, {color, fontSize: font + "px", padding: padding + "px", borderRadius: radius + "px"});
    byId("cssFontValue").textContent = font + "px";
    byId("cssPaddingValue").textContent = padding + "px";
    byId("cssRadiusValue").textContent = radius + "px";
    byId("cssCode").textContent = `.practice-card {\n  color: ${color};\n  font-size: ${font}px;\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n}`;
    if (announce) byId("cssFeedback").textContent = "樣式已更新；觀察內側留白、字級與圓角的差異。";
  }
  ["cssColor", "cssFont", "cssPadding", "cssRadius"].forEach((id) => byId(id).addEventListener("input", () => renderCSS()));
  byId("resetCss").addEventListener("click", () => {
    byId("cssColor").value = "#075985";
    byId("cssFont").value = "18";
    byId("cssPadding").value = "16";
    byId("cssRadius").value = "12";
    renderCSS(false);
    byId("cssFeedback").textContent = "已還原 CSS 數值。";
  });
  const answers = {
    q1: {value: "a", explanation: "p 表示段落，適合放座右銘；背景色由 CSS 設定。"},
    q2: {value: "b", explanation: ".motto 對應 class；#motto 則對應 id。"},
    q3: {value: "b", explanation: "padding 在邊框內；margin 是邊框外的間距。"}
  };
  const quiz = byId("basicsQuiz");
  quiz.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quiz);
    let score = 0, missing = 0;
    for (const [name, answer] of Object.entries(answers)) {
      const selected = data.get(name);
      const correct = selected === answer.value;
      if (!selected) missing++;
      if (correct) score++;
      byId(name + "Feedback").textContent = !selected ? "請先選一個答案。" : (correct ? "答對了。" : "再想想。") + answer.explanation;
    }
    byId("quizFeedback").textContent = missing ? `還有 ${missing} 題未作答，請補選後再檢查。` : `答對 ${score} / 3 題。可以修改答案，再試一次。`;
  });
  quiz.addEventListener("reset", () => {
    for (const name of Object.keys(answers)) byId(name + "Feedback").textContent = "";
    byId("quizFeedback").textContent = "已清除作答，可以重新練習。";
  });
  renderHTML(false);
  renderCSS(false);
  document.querySelectorAll(".lab-interactive").forEach((element) => { element.hidden = false; });
})();
