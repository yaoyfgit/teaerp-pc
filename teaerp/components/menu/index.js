import { menuConfig } from '../../js/config/menu.js';

// 菜单组件
class Menu {
    constructor() {
        this.menus = menuConfig;
        this.currentModule = null;
        this.currentMenu = null;
    }

    // 初始化
    init() {
        this.renderMenu();
        this.bindEvents();
        this.setActiveMenu();
        this.expandActiveMenuParents();
    }

    // 渲染菜单
    renderMenu() {
        const menuContainer = document.querySelector('.main-menu');
        if (!menuContainer) return;

        // 渲染一级菜单
        menuContainer.innerHTML = this.menus.map(module => `
            <div class="menu-module" data-key="${module.key}">
                <div class="module-title">
                    <i class="icon icon-${module.icon}"></i>
                    <span>${module.title}</span>
                    <i class="icon icon-arrow"></i>
                </div>
                ${this.renderSubMenu(module.children)}
            </div>
        `).join('');
    }

    // 渲染子菜单
    renderSubMenu(items) {
        if (!items) return '';

        return `
            <ul class="sub-menu">
                ${items.map(item => `
                    <li class="menu-item" data-key="${item.key}">
                        ${item.children ? `
                            <div class="menu-group">
                                <i class="icon icon-${item.icon || 'default'}"></i>
                                <span>${item.title}</span>
                                <i class="icon icon-arrow"></i>
                            </div>
                            ${this.renderSubMenu(item.children)}
                        ` : `
                            <a href="${item.path}" class="menu-link">
                                <i class="icon icon-${item.icon || 'default'}"></i>
                                <span>${item.title}</span>
                            </a>
                        `}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // 绑定事件
    bindEvents() {
        // 模块标题点击事件
        document.addEventListener('click', (e) => {
            const moduleTitle = e.target.closest('.module-title');
            if (moduleTitle) {
                const menuModule = moduleTitle.closest('.menu-module');
                this.toggleModule(menuModule);
            }
        });

        // 菜单组点击事件
        document.addEventListener('click', (e) => {
            const menuGroup = e.target.closest('.menu-group');
            if (menuGroup) {
                const menuItem = menuGroup.closest('.menu-item');
                this.toggleSubMenu(menuItem);
            }
        });

        // 菜单链接点击事件
        document.addEventListener('click', (e) => {
            const menuLink = e.target.closest('.menu-link');
            if (menuLink) {
                this.handleMenuClick(menuLink);
            }
        });

        // 监听路由变化
        window.addEventListener('popstate', () => {
            this.setActiveMenu();
            this.expandActiveMenuParents();
        });
    }

    // 切换模块展开状态
    toggleModule(menuModule) {
        const subMenu = menuModule.querySelector('.sub-menu');
        if (subMenu) {
            const isExpanded = menuModule.classList.contains('expanded');
            
            // 收起其他模块
            document.querySelectorAll('.menu-module').forEach(module => {
                if (module !== menuModule) {
                    module.classList.remove('expanded');
                    const moduleSubMenu = module.querySelector('.sub-menu');
                    if (moduleSubMenu) {
                        moduleSubMenu.style.display = 'none';
                    }
                }
            });

            // 切换当前模块
            menuModule.classList.toggle('expanded');
            subMenu.style.display = isExpanded ? 'none' : 'block';
        }
    }

    // 处理菜单点击
    handleMenuClick(menuLink) {
        // 移除所有激活状态
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // 设置当前菜单激活状态
        const menuItem = menuLink.closest('.menu-item');
        menuItem.classList.add('active');

        // 展开父级菜单
        this.expandParentMenus(menuItem);
    }

    // 切换子菜单
    toggleSubMenu(menuItem) {
        const subMenu = menuItem.querySelector('.sub-menu');
        if (subMenu) {
            const isExpanded = menuItem.classList.contains('expanded');
            
            // 收起同级其他展开的菜单
            const siblings = menuItem.parentElement.children;
            Array.from(siblings).forEach(sibling => {
                if (sibling !== menuItem) {
                    sibling.classList.remove('expanded');
                    const siblingSubMenu = sibling.querySelector('.sub-menu');
                    if (siblingSubMenu) {
                        siblingSubMenu.style.display = 'none';
                    }
                }
            });

            // 切换当前菜单
            menuItem.classList.toggle('expanded');
            subMenu.style.display = isExpanded ? 'none' : 'block';
        }
    }

    // 设置当前激活的菜单
    setActiveMenu() {
        const path = window.location.pathname;
        
        // 移除所有激活状态
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // 查找并设置当前激活的菜单
        const menuLink = document.querySelector(`.menu-link[href="${path}"]`);
        if (menuLink) {
            const menuItem = menuLink.closest('.menu-item');
            menuItem.classList.add('active');
        }
    }

    // 展开当前激活菜单的父级菜单
    expandActiveMenuParents() {
        const activeMenuItem = document.querySelector('.menu-item.active');
        if (activeMenuItem) {
            this.expandParentMenus(activeMenuItem);
        }
    }

    // 展开父级菜单
    expandParentMenus(menuItem) {
        let parent = menuItem.parentElement;
        while (parent) {
            if (parent.classList.contains('sub-menu')) {
                const parentItem = parent.closest('.menu-item');
                if (parentItem) {
                    parentItem.classList.add('expanded');
                    parent.style.display = 'block';
                }
            } else if (parent.classList.contains('menu-module')) {
                parent.classList.add('expanded');
                const moduleSubMenu = parent.querySelector('.sub-menu');
                if (moduleSubMenu) {
                    moduleSubMenu.style.display = 'block';
                }
            }
            parent = parent.parentElement;
        }
    }
}

// 导出菜单实例
export const menu = new Menu();

// 初始化
document.addEventListener('DOMContentLoaded', () => menu.init()); 