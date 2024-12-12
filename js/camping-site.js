document.addEventListener('DOMContentLoaded', function() {
    // 定義全域常數
    const ACTIVITIES = {
        family: "親子同樂",
        adventure: "探險體驗",
        nature: "生態教育",
        photography: "攝影創作",
        bbq: "野炊烤肉"
    };

    const FEATURES = {
        mountain: "山林景觀",
        river: "溪流戲水",
        stargazing: "星空露營",
        glamping: "豪華露營"
    };

    const FACILITIES = {
        wifi: "無線網路",
        shower: "淋浴設施",
        parking: "停車場",
        restaurant: "餐廳"
    };

    const IMAGES = [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
        'https://images.unsplash.com/photo-1517824806704-9040b037703b',
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
        'https://images.unsplash.com/photo-1600240644455-3edc55c375fe',
        'https://images.unsplash.com/photo-1571687949921-1306bfb24b72'
    ];

    const NAMES = [
        "山林探險營地", "湖畔度假營區", "森林野趣營地", "星空露營基地", 
        "親子歡樂營", "探險者營地", "溪流野營區", "高山露營地",
        "海邊度假營", "生態探索營"
    ];

    // 分頁相關變數
    const ITEMS_PER_PAGE = 9;
    let currentPage = 1;
    let totalPages = 0;
    let allCampingData = [];

    // 渲染分頁按鈕
    function renderPagination(totalItems) {
        totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const paginationContainer = document.querySelector('.pagination-container');
        
        let paginationHTML = `
            <button class="pagination-btn" onclick="changePage('prev')" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // 生成分頁按鈕
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                paginationHTML += `
                    <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                            onclick="changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (
                i === currentPage - 2 || 
                i === currentPage + 2
            ) {
                paginationHTML += `<button class="pagination-btn">...</button>`;
            }
        }

        paginationHTML += `
            <button class="pagination-btn" onclick="changePage('next')" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;
    }

    // 切換頁面
    window.changePage = function(page) {
        if (page === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (typeof page === 'number') {
            currentPage = page;
        }

        renderCampingCards(getCurrentPageData());
        renderPagination(allCampingData.length);
    };

    // 獲取當前頁面的數據
    function getCurrentPageData() {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return allCampingData.slice(startIndex, endIndex);
    }

    // 模擬營區資料生成器
    function generateCampingData(count) {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: NAMES[Math.floor(Math.random() * NAMES.length)] + (i + 1) + "號",
            image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
            activities: Object.keys(ACTIVITIES).sort(() => 0.5 - Math.random()).slice(0, 2),
            features: Object.keys(FEATURES).sort(() => 0.5 - Math.random()).slice(0, 2),
            facilities: Object.keys(FACILITIES).sort(() => 0.5 - Math.random()).slice(0, 3),
            price: Math.floor(Math.random() * 4000) + 500,
            originalPrice: Math.floor(Math.random() * 6000) + 1000,
            rating: (Math.random() * 2 + 3).toFixed(1),
            isHot: Math.random() > 0.7,
            isNew: Math.random() > 0.8,
            hasDiscount: Math.random() > 0.75,
            city: "台北市",
            district: "信義區",
            reviewCount: Math.floor(Math.random() * 100) + 1
        }));
    }

    // 生成星星評分
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return `
            ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
            ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
            ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
        `;
    }

    // 獲取標籤圖標
    function getTagIcon(type) {
        const icons = {
            family: 'fas fa-users',
            adventure: 'fas fa-hiking',
            nature: 'fas fa-leaf',
            photography: 'fas fa-camera',
            bbq: 'fas fa-fire',
            mountain: 'fas fa-mountain',
            river: 'fas fa-water',
            stargazing: 'fas fa-star',
            glamping: 'fas fa-campground'
        };
        return icons[type] || 'fas fa-tag';
    }

    // 獲取設施圖標
    function getFacilityIcon(type) {
        const icons = {
            wifi: 'fas fa-wifi',
            shower: 'fas fa-shower',
            parking: 'fas fa-parking',
            restaurant: 'fas fa-utensils'
        };
        return icons[type] || 'fas fa-check';
    }

    // 渲染營區卡片
    function renderCampingCards(data) {
        const campingList = document.querySelector('.camping-list');
        campingList.innerHTML = data.map(camp => `
            <div class="camp-card">
                <div class="camp-image">
                    <img src="${camp.image}" alt="${camp.name}">
                    <div class="camp-badges">
                        ${camp.isHot ? '<span class="badge hot"><i class="fas fa-fire"></i> 熱門</span>' : ''}
                        ${camp.isNew ? '<span class="badge new"><i class="fas fa-star"></i> 新品</span>' : ''}
                        ${camp.hasDiscount ? '<span class="badge discount"><i class="fas fa-tag"></i> 特價</span>' : ''}
                    </div>
                    <button class="btn-favorite">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                
                <div class="camp-content">
                    <div class="camp-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${camp.city} ${camp.district}</span>
                    </div>
                    
                    <h3 class="camp-title">${camp.name}</h3>
                    
                    <div class="camp-rating">
                        <div class="stars">
                            ${generateStars(camp.rating)}
                        </div>
                        <span class="rating-score">${camp.rating}</span>
                        <span class="review-count">(${camp.reviewCount}則評價)</span>
                    </div>

                    <div class="camp-tags">
                        ${camp.activities.map(tag => `
                            <span class="tag activity">
                                <i class="${getTagIcon(tag)}"></i>
                                ${ACTIVITIES[tag]}
                            </span>
                        `).join('')}
                        ${camp.features.map(tag => `
                            <span class="tag feature">
                                <i class="${getTagIcon(tag)}"></i>
                                ${FEATURES[tag]}
                            </span>
                        `).join('')}
                    </div>

                    <div class="camp-facilities">
                        ${camp.facilities.map(facility => `
                            <span class="facility" title="${FACILITIES[facility]}">
                                <i class="${getFacilityIcon(facility)}"></i>
                            </span>
                        `).join('')}
                    </div>

                    <div class="camp-meta">
                        <div class="camp-price">
                            ${camp.hasDiscount ? `
                                <span class="original-price">NT$ ${camp.originalPrice.toLocaleString()}</span>
                            ` : ''}
                            <span class="current-price">
                                <small>NT$</small>
                                <strong>${camp.price.toLocaleString()}</strong>
                                <small>/晚</small>
                            </span>
                        </div>
                        <button class="btn-book">
                            <i class="fas fa-campground"></i>
                            立即預訂
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 初始化
    function initialize() {
        // 生成所有數據
        allCampingData = generateCampingData(50);
        
        // 渲染第一頁數據
        renderCampingCards(getCurrentPageData());
        
        // 渲染分頁
        renderPagination(allCampingData.length);

        // 添加篩選事件監聽器
        setupFilterListeners();
    }

    // 篩選功能
    function setupFilterListeners() {
        // 這裡添加篩選相關的事件監聽器
        const filterInputs = document.querySelectorAll('.filter-options input');
        filterInputs.forEach(input => {
            input.addEventListener('change', function() {
                // 重置到第一頁
                currentPage = 1;
                
                // 應用篩選
                const filteredData = applyFilters(allCampingData);
                
                // 重新渲染
                renderCampingCards(getCurrentPageData());
                renderPagination(filteredData.length);
            });
        });
    }

    // 應用篩選條件
    function applyFilters(data) {
        // 獲取所有選中的篩選條件
        const selectedFilters = {
            activities: Array.from(document.querySelectorAll('.filter-options input[name="activity"]:checked')).map(el => el.value),
            features: Array.from(document.querySelectorAll('.filter-options input[name="feature"]:checked')).map(el => el.value),
            facilities: Array.from(document.querySelectorAll('.filter-options input[name="facility"]:checked')).map(el => el.value)
        };

        // 應用篩選
        return data.filter(camp => {
            return (
                (!selectedFilters.activities.length || camp.activities.some(a => selectedFilters.activities.includes(a))) &&
                (!selectedFilters.features.length || camp.features.some(f => selectedFilters.features.includes(f))) &&
                (!selectedFilters.facilities.length || camp.facilities.some(f => selectedFilters.facilities.includes(f)))
            );
        });
    }

    // 啟動應用
    initialize();
});
