/**
 * 标签页管理器类
 */
class TabManager {
    /**
     * 构造函数
     * @param {Object} options 配置选项
     * @param {string} options.container 标签页导航容器选择器
     * @param {string} options.content 标签页内容容器选择器
     * @param {string} options.activeClass 激活状态的类名
     */
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.content = document.querySelector(options.content);
        this.activeClass = options.activeClass || 'active';
        this.init();
    }

    /**
     * 初始化标签页
     */
    init() {
        if (!this.container || !this.content) {
            console.error('标签页容器未找到');
            return;
        }

        // 绑定点击事件
        this.container.addEventListener('click', (e) => {
            const tabItem = e.target.closest('.tab-nav-item');
            if (tabItem) {
                this.switchTab(tabItem);
            }
        });

        // 初始化第一个标签页
        const firstTab = this.container.querySelector('.tab-nav-item');
        if (firstTab) {
            this.switchTab(firstTab);
        }
    }

    /**
     * 切换标签页
     * @param {HTMLElement} tabItem 被点击的标签页项
     */
    switchTab(tabItem) {
        // 移除所有标签页的激活状态
        this.container.querySelectorAll('.tab-nav-item').forEach(item => {
            item.classList.remove(this.activeClass);
        });

        // 移除所有内容区域的激活状态
        this.content.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove(this.activeClass);
        });

        // 激活当前标签页
        tabItem.classList.add(this.activeClass);

        // 激活对应的内容区域
        const tabId = tabItem.dataset.tab;
        const tabPane = this.content.querySelector(`#${tabId}`);
        if (tabPane) {
            tabPane.classList.add(this.activeClass);
        }

        // 触发标签页切换事件
        const event = new CustomEvent('tab-change', {
            detail: {
                tabId: tabId,
                tabItem: tabItem
            }
        });
        this.container.dispatchEvent(event);
    }
}

/**
 * 初始化菜单切换功能
 */
function initMenuToggle() {
    const toggleBtn = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
}

// 导出模块
window.TabManager = TabManager;
window.initMenuToggle = initMenuToggle; 