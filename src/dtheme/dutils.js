/* ==============================
   动态年份（自动更新页脚年份）
============================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==============================
   点赞按钮（带本地存储）
   - 每个文章卡片的点赞数独立存储
   - 点击后 +1，并保存到 localStorage
============================== */
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((btn, index) => {
  // 从 localStorage 取出已保存的点赞数
  let savedLikes = localStorage.getItem("likes-" + index);
  if (savedLikes) {
    btn.textContent = `👍 已赞 (${savedLikes})`;
    btn.dataset.count = savedLikes;
  }

  // 点击按钮时，增加计数
  btn.addEventListener("click", () => {
    let count = btn.dataset.count ? parseInt(btn.dataset.count) : 0;
    count++;
    btn.dataset.count = count;
    btn.textContent = `👍 已赞 (${count})`;
    localStorage.setItem("likes-" + index, count); // 保存到本地
  });
});

/* ==============================
   阅读量统计
   - 点击文章标题链接时，阅读数 +1
============================== */
const blogLinks = document.querySelectorAll(".blog-link");

blogLinks.forEach((link) => {
  link.addEventListener("click", () => {
    let viewsEl = link.closest(".blog-card").querySelector(".views span");
    let count = parseInt(viewsEl.textContent) + 1;
    viewsEl.textContent = count;
  });
});

/* ==============================
   搜索文章
   - 输入关键字，实时筛选文章卡片
============================== */
document.getElementById("searchInput").addEventListener("input", function () {
  let keyword = this.value.toLowerCase();
  document.querySelectorAll(".blog-card").forEach((card) => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword) ? "block" : "none";
  });
});

/* ==============================
   分类筛选
   - 点击分类按钮，筛选对应文章
============================== */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let category = btn.dataset.category;
    document.querySelectorAll(".blog-card").forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ==============================
   夜间模式切换
   - 点击按钮切换 dark 模式
   - 状态保存在 localStorage
============================== */
const darkModeBtn = document.getElementById("darkModeToggle");

// 页面加载时检查本地存储
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// 点击切换暗黑模式
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

/* ==============================
   回到顶部按钮
   - 页面滚动超过 300px 显示
   - 点击按钮平滑滚动回顶部
============================== */
const backToTopBtn = document.getElementById("backToTop");

// 滚动时显示/隐藏按钮
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// 点击按钮回到顶部
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
