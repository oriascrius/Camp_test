// 渲染營區卡片的函數
function renderCampingSites(sites) {
    const container = document.querySelector('.camping-spots');
    container.innerHTML = ''; // 清空容器

    sites.forEach(site => {
        const card = createCampingCard(site);
        container.appendChild(card);
    });
}

// 創建單個營區卡片的函數
function createCampingCard(site) {
    const card = document.createElement('div');
    card.className = 'spot-card';
    card.dataset.region = site.region;
    card.dataset.category = site.category;
    card.dataset.price = site.price;

    // 轉換特色設施為圖標和文字
    const featureIcons = {
        wifi: { icon: 'wifi', text: '無線網路' },
        bathroom: { icon: 'bath', text: '獨立衛浴' },
        kitchen: { icon: 'utensils', text: '公共廚房' },
        bbq: { icon: 'fire', text: 'BBQ設施' },
        pool: { icon: 'swimming-pool', text: '游泳池' },
        playground: { icon: 'child', text: '兒童遊戲區' },
        parking: { icon: 'parking', text: '停車場' },
        shower: { icon: 'shower', text: '淋浴設施' },
        restaurant: { icon: 'hamburger', text: '餐廳' },
        store: { icon: 'store', text: '商店' }
    };

    // 轉換分類為中文
    const categoryNames = {
        tent: '一般帳篷',
        glamping: '豪華露營',
        rv: '露營車',
        cabin: '小木屋',
        treehouse: '樹屋',
        container: '貨櫃屋',
        yurt: '蒙古包',
        'camping-car': '露營車',
        family: '親子營區',
        pet: '寵物友善'
    };

    card.innerHTML = `
        <div class="spot-image">
            <img src="${site.image}" alt="${site.name}">
            <div class="spot-badge">${categoryNames[site.category]}</div>
        </div>
        <div class="spot-content">
            <div class="spot-header">
                <h3 class="spot-title">${site.name}</h3>
                <div class="spot-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${site.location}</span>
                </div>
            </div>
            <div class="spot-features">
                ${site.features.map(feature => `
                    <div class="feature-item" title="${featureIcons[feature].text}">
                        <i class="fas fa-${featureIcons[feature].icon}"></i>
                        <span>${featureIcons[feature].text}</span>
                    </div>
                `).join('')}
            </div>
            <div class="spot-footer">
                <div class="spot-price">
                    NT$${site.price.toLocaleString()}<span>/晚</span>
                </div>
                <div class="spot-rating">
                    <i class="fas fa-star"></i>
                    <span>${site.rating}</span>
                </div>
            </div>
            <div class="spot-date">
                <input type="text" class="flatpickr" data-id="${site.id}" placeholder="選擇入住日期">
            </div>
        </div>
    `;

    // 初始化該卡片的 Flatpickr
    initializeFlatpickr(card.querySelector('.flatpickr'), site.price);

    return card;
}

// 初始化 Flatpickr 的函數
function initializeFlatpickr(element, pricePerNight) {
    flatpickr(element, {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        locale: "zh_tw",
        disableMobile: "true",
        showMonths: 2,
        rangeSeparator: " 至 ",
        onChange: function(selectedDates) {
            if (selectedDates.length === 2) {
                const nights = Math.round((selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24));
                const totalPrice = pricePerNight * nights;
                
                const priceElement = element.closest('.spot-card').querySelector('.spot-price');
                priceElement.innerHTML = `NT$${totalPrice.toLocaleString()}<span>/${nights}晚</span>`;
            }
        }
    });
}

// 篩選功能
function initializeFilters() {
    const filters = {
        region: 'all',
        category: 'all',
        feature: 'all',
        price: 1000000 // 預設最高價格
    };

    // 監聽篩選器變化
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', function() {
            filters[this.dataset.filter] = this.value;
            applyFilters();
        });
    });

    // 監聽價格範圍變化
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            filters.price = parseInt(this.value);
            document.getElementById('price-value').textContent = `NT$${filters.price.toLocaleString()}`;
            applyFilters();
        });
    }

    // 快速篩選標籤點擊
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.dataset.value;
            
            // 更新視覺效���
            document.querySelectorAll(`.filter-tag[data-filter="${filterType}"]`)
                .forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新對應的選擇框
            const select = document.querySelector(`select[data-filter="${filterType}"]`);
            if (select) {
                select.value = filterValue;
                filters[filterType] = filterValue;
                applyFilters();
            }
        });
    });

    function applyFilters() {
        const filteredSites = campingSites.filter(site => {
            const matchesRegion = filters.region === 'all' || site.region === filters.region;
            const matchesCategory = filters.category === 'all' || site.category === filters.category;
            const matchesFeature = filters.feature === 'all' || site.features.includes(filters.feature);
            const matchesPrice = site.price <= filters.price;

            return matchesRegion && matchesCategory && matchesFeature && matchesPrice;
        });

        renderCampingSites(filteredSites);
    }
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    // 生成並渲染初始資料
    const campingSites = generateCampingData(30);
    renderCampingSites(campingSites);
    
    // 初始化篩選器
    initializeFilters();
});

// 生成營區資料
const campingData = [
    {
        id: 1,
        name: "北部帳篷營區",
        location: "台北市",
        category: "tent",
        features: ["wifi", "parking", "bbq"],
        price: 78000,
        rating: 4.5,
        image: "path/to/image1.jpg",
        region: "north"
    },
    // ... 可以繼續添加更多資料
];

// 生成 30 筆隨機資料的函數
function generateCampingData(count) {
    const regions = ["north", "south", "east", "west", "central"];
    const categories = ["tent", "glamping", "rv", "cabin", "treehouse", "container", "yurt", "camping-car", "family", "pet"];
    const features = ["wifi", "bathroom", "kitchen", "bbq", "pool", "playground", "parking", "shower", "restaurant", "store"];
    const cities = {
        north: ["台北市", "新北市", "基隆市", "宜蘭縣"],
        south: ["高雄市", "台南市", "屏東縣"],
        east: ["花蓮縣", "台東縣"],
        west: ["桃園市", "新竹市", "苗栗縣"],
        central: ["台中市", "彰化縣", "南投縣"]
    };

    const data = [];
    
    for(let i = 1; i <= count; i++) {
        const region = regions[Math.floor(Math.random() * regions.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const randomFeatures = features
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 5) + 2);
        
        data.push({
            id: i,
            name: `${region}${category}營區${i}號`,
            location: cities[region][Math.floor(Math.random() * cities[region].length)],
            category: category,
            features: randomFeatures,
            price: Math.floor(Math.random() * 150000) + 50000,
            rating: (Math.random() * 2 + 3).toFixed(1),
            image: getImageUrl(category),
            region: region
        });
    }
    
    return data;
}

// 根據分類獲取圖片 URL 的函數
function getImageUrl(category) {
    const categoryImages = {
        tent: "https://source.unsplash.com/800x600/?tent,camping",
        glamping: "https://source.unsplash.com/800x600/?glamping,luxury",
        rv: "https://source.unsplash.com/800x600/?rv,camper",
        cabin: "https://source.unsplash.com/800x600/?cabin,wood",
        treehouse: "https://source.unsplash.com/800x600/?treehouse",
        container: "https://source.unsplash.com/800x600/?container,home",
        yurt: "https://source.unsplash.com/800x600/?yurt",
        "camping-car": "https://source.unsplash.com/800x600/?camping,car",
        family: "https://source.unsplash.com/800x600/?family,camping",
        pet: "https://source.unsplash.com/800x600/?pet,friendly"
    };

    return categoryImages[category] || "https://source.unsplash.com/800x600/?camping";
}

// 生成 30 筆資料
const campingSites = generateCampingData(30);