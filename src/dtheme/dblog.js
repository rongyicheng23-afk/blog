/* ==============================
   DOCHII Blog - 博客页面专用脚本
   只包含博客文章页面需要的功能
============================== */

/* ==============================
   点赞按钮（带本地存储）
   - 点击后 +1，并保存到 localStorage
============================== */
document.addEventListener('DOMContentLoaded', function() {
  const likeBtn = document.querySelector(".like-btn");
  
  if (likeBtn) {
    // 获取当前页面的文章名称作为唯一标识
    const blogName = window.location.pathname.split('/').pop().replace('.html', '');
    const storageKey = `blog-likes-${blogName}`;
    
    // 从 localStorage 取出已保存的点赞数
    let savedLikes = localStorage.getItem(storageKey);
    if (savedLikes) {
      likeBtn.textContent = `👍 已赞 (${savedLikes})`;
      likeBtn.dataset.count = savedLikes;
    } else {
      likeBtn.dataset.count = 0;
    }
    
    // 点击按钮时，增加计数
    likeBtn.addEventListener("click", () => {
      let count = parseInt(likeBtn.dataset.count || 0);
      count++;
      likeBtn.dataset.count = count;
      likeBtn.textContent = `👍 已赞 (${count})`;
      localStorage.setItem(storageKey, count);
      
      // 添加点击动画效果
      likeBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 200);
    });
  }
  
  /* ==============================
     阅读量统计
     - 页面加载时自动增加阅读量
  ============================== */
  const viewsEl = document.querySelector(".views span");
  
  if (viewsEl) {
    // 获取当前页面的文章名称作为唯一标识
    const blogName = window.location.pathname.split('/').pop().replace('.html', '');
    const storageKey = `blog-views-${blogName}`;
    
    // 获取或初始化阅读量
    let views = parseInt(localStorage.getItem(storageKey) || 0);
    views++;
    viewsEl.textContent = views;
    localStorage.setItem(storageKey, views);
  }
  
  /* ==============================
     回到顶部按钮
     - 页面滚动超过 300px 显示
     - 点击按钮平滑滚动回顶部
  ============================== */
  const backToTopBtn = document.getElementById("backToTop");
  
  if (backToTopBtn) {
    // 初始隐藏
    backToTopBtn.style.display = "none";
    
    // 滚动时显示/隐藏按钮
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    
    // 点击按钮回到顶部
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  /* ==============================
     代码块复制功能（可选）
     - 为代码块添加复制按钮
  ============================== */
  const codeBlocks = document.querySelectorAll("pre code, .codehilite pre");
  
  codeBlocks.forEach((block) => {
    // 创建复制按钮
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 复制";
    copyBtn.className = "copy-code-btn";
    copyBtn.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 4px 8px;
      font-size: 12px;
      background: #444;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    `;
    
    // 鼠标悬停时显示
    copyBtn.addEventListener("mouseenter", () => {
      copyBtn.style.opacity = "1";
    });
    copyBtn.addEventListener("mouseleave", () => {
      copyBtn.style.opacity = "0.7";
    });
    
    // 点击复制代码
    copyBtn.addEventListener("click", () => {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = "✅ 已复制";
        setTimeout(() => {
          copyBtn.textContent = "📋 复制";
        }, 2000);
      }).catch((err) => {
        console.error("复制失败:", err);
        copyBtn.textContent = "❌ 失败";
        setTimeout(() => {
          copyBtn.textContent = "📋 复制";
        }, 2000);
      });
    });
    
    // 将按钮添加到代码块的父元素
    const parent = block.parentElement;
    if (parent && parent.tagName === "PRE") {
      parent.style.position = "relative";
      parent.appendChild(copyBtn);
    }
  });
  
  /* ==============================
     图片懒加载优化
     - 为图片添加加载动画
  ============================== */
  const images = document.querySelectorAll(".blog-content img");
  
  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s";
    
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    
    // 如果图片已经加载（从缓存）
    if (img.complete) {
      img.style.opacity = "1";
    }
  });
  
  /* ==============================
     打印功能（可选）
     - Ctrl+P 快捷键打印文章
  ============================== */
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "p") {
      e.preventDefault();
      window.print();
    }
  });
  
  console.log("✅ 博客页面脚本加载完成");
});

