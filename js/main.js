// 當滾動時改變導航欄樣式
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const scrolled = window.scrollY > 50;

  if (scrolled) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// 搜尋框動畫
const searchInput = document.querySelector(".search-box input");
const searchBox = document.querySelector(".search-box");

searchInput.addEventListener("focus", function () {
  searchBox.classList.add("active");
  this.style.width = "300px";
});

searchInput.addEventListener("blur", function () {
  searchBox.classList.remove("active");
  this.style.width = "200px";
});

// 平滑滾動到頁面頂部
document.querySelector(".navbar-brand").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Footer 社交媒體圖標動畫
const socialLinks = document.querySelectorAll(".social-links a");
socialLinks.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const rotation = Math.random() * 20 - 10;
    this.style.transform = `translateY(-3px) rotate(${rotation}deg)`;
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotate(0)";
  });
});

// 電子報訂閱表單優化
const subscribeForm = document.querySelector(".input-group");
const subscribeInput = subscribeForm.querySelector("input");
const subscribeButton = subscribeForm.querySelector("button");

subscribeButton.addEventListener("click", function () {
  if (subscribeInput.value && isValidEmail(subscribeInput.value)) {
    // 成功訂閱動畫
    this.innerHTML = '<i class="fas fa-check"></i>';
    this.classList.add("success");

    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-paper-plane me-1"></i>訂閱';
      this.classList.remove("success");
      subscribeInput.value = "";
    }, 2000);
  } else {
    // 錯誤提示動畫
    subscribeForm.classList.add("error");
    setTimeout(() => {
      subscribeForm.classList.remove("error");
    }, 500);
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 下拉選單互動優化
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const menu = dropdown.querySelector(".dropdown-menu");

  dropdown.addEventListener("mouseenter", function () {
    menu.style.display = "block";
    setTimeout(() => menu.classList.add("show"), 0);
  });

  dropdown.addEventListener("mouseleave", function () {
    menu.classList.remove("show");
    setTimeout(() => (menu.style.display = "none"), 300);
  });
});

// Banner 輪播功能
document.addEventListener("DOMContentLoaded", function () {
  const bannerSlider = {
    currentSlide: 0,
    items: document.querySelectorAll(".banner-item"),
    indicators: document.querySelectorAll(".indicator"),

    init() {
      if (this.items.length === 0) return; // 如果沒有輪播項目就返回

      // 設置初始狀態
      this.items[0].classList.add("active");

      // 綁定控制按鈕事件
      const prevBtn = document.querySelector(".banner-controls .prev");
      const nextBtn = document.querySelector(".banner-controls .next");

      if (prevBtn) {
        prevBtn.addEventListener("click", () => this.prev());
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => this.next());
      }

      // 綁定指示點事件
      if (this.indicators.length > 0) {
        this.indicators.forEach((indicator, index) => {
          indicator.addEventListener("click", () => this.goToSlide(index));
        });
      }

      // 自動輪播
      this.startAutoPlay();
    },

    next() {
      this.goToSlide((this.currentSlide + 1) % this.items.length);
    },

    prev() {
      this.goToSlide(
        this.currentSlide === 0 ? this.items.length - 1 : this.currentSlide - 1
      );
    },

    goToSlide(index) {
      // 移除當前活動狀態
      this.items[this.currentSlide].classList.remove("active");
      if (this.indicators.length > 0) {
        this.indicators[this.currentSlide].classList.remove("active");
      }

      // 設置新的活動狀態
      this.currentSlide = index;
      this.items[this.currentSlide].classList.add("active");
      if (this.indicators.length > 0) {
        this.indicators[this.currentSlide].classList.add("active");
      }
    },

    startAutoPlay() {
      setInterval(() => this.next(), 5000); // 每5秒自動切換
    },
  };

  // 商品卡片動畫效果
  function setupProductCards() {
    const products = document.querySelectorAll(".product-card");
    if (products.length === 0) return; // 如果沒有商品卡片就返回

    products.forEach((product) => {
      product.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
        this.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
      });

      product.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
      });
    });
  }

  // FAQ 手風琴效果
  function setupFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length === 0) return; // 如果沒有FAQ項目就返回

    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".toggle-icon i");

      // 確保初始狀態
      answer.style.maxHeight = "0";

      button.addEventListener("click", function (e) {
        e.preventDefault();

        // 關閉其他所有開啟的項目
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherItem.querySelector(".toggle-icon i");

            otherItem.classList.remove("active");
            otherAnswer.style.maxHeight = "0";
            otherIcon.classList.replace("fa-minus", "fa-plus");
          }
        });

        // 切換當前項目
        const isActive = item.classList.contains("active");

        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.classList.replace("fa-plus", "fa-minus");
        } else {
          item.classList.remove("active");
          answer.style.maxHeight = "0";
          icon.classList.replace("fa-minus", "fa-plus");
        }
      });
    });
  }

  // 回到頂部按鈕功能
  function setupBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    // 顯示/隱藏按鈕
    function toggleBackToTopButton() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // 滾動到頂部
    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // 監聽滾動事件
    window.addEventListener("scroll", toggleBackToTopButton);

    // 監聽點擊事件
    backToTopBtn.addEventListener("click", scrollToTop);
  }

  // 初始化所有功能
  try {
    bannerSlider.init();
    setupProductCards();
    setupFAQ();
    setupBackToTop();

    // AOS 動畫初始化
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    }
  } catch (error) {
    console.error("初始化過程發生錯誤:", error);
  }
});

// 滾動時的視差效果
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Header 相關功能
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const headerTop = document.querySelector(".header-top");
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  // 設置初始狀態
  navbar.style.top = headerTop.offsetHeight + "px";

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 當滾動超過頂部資訊列高度時
    if (scrollTop > headerTop.offsetHeight) {
      headerTop.style.transform = "translateY(-100%)";
      navbar.style.position = "fixed";
      navbar.style.top = "0";
      navbar.style.width = "100%";
      navbar.classList.add("navbar-scrolled");
    } else {
      headerTop.style.transform = "translateY(0)";
      navbar.style.position = "absolute";
      navbar.style.top = headerTop.offsetHeight + "px";
      navbar.classList.remove("navbar-scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // 搜尋框切換
  const searchToggle = document.querySelector(".search-toggle");
  const searchBox = document.querySelector(".search-box");

  if (searchToggle) {
    searchToggle.addEventListener("click", function () {
      searchBox.classList.toggle("active");
    });
  }

  // 漢堡選單動畫
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
});

// 監聽視窗大小改變
window.addEventListener("resize", () => {
  const activeAnswers = document.querySelectorAll(
    ".faq-item.active .faq-answer"
  );
  activeAnswers.forEach((answer) => {
    answer.style.maxHeight = answer.scrollHeight + "px";
  });
});
// 添加點擊波紋效果
function createRipple(event) {
  const card = event.currentTarget;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  card.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// 為所有卡片添加事件監聽
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", createRipple);
});
