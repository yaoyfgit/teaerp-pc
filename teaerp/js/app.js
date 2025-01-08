// 菜单配置
const menuConfig = [
    {
        key: 'purchase',
        title: '采购管理',
        icon: 'shopping-cart',
        children: [
            {
                key: 'requirement',
                title: '采购需求',
                icon: 'clipboard-list',
                path: '/projects/ERP/teaerp/pages/purchase/demand.html'
            },
            {
                key: 'order',
                title: '采购订单',
                icon: 'file-invoice',
                path: '/projects/ERP/teaerp/pages/purchase/order.html'
            },
            {
                key: 'receive',
                title: '通知收货',
                icon: 'truck-loading',
                path: '/projects/ERP/teaerp/pages/purchase/receive.html'
            },
            {
                key: 'return',
                title: '通知退货',
                icon: 'undo',
                path: '/projects/ERP/teaerp/pages/purchase/return.html'
            },
            {
                key: 'analysis',
                title: '采购分析',
                icon: 'chart-line',
                path: '/projects/ERP/teaerp/pages/purchase/analysis.html'
            }
        ]
    },
    {
        key: 'sale',
        title: '销售管理',
        icon: 'store',
        children: [
            {
                key: 'order',
                title: '销售订单',
                icon: 'file-invoice-dollar',
                path: '/projects/ERP/teaerp/pages/sales/order.html'
            },
            {
                key: 'delivery',
                title: '通知发货',
                icon: 'truck',
                path: '/projects/ERP/teaerp/pages/sales/delivery.html'
            },
            {
                key: 'return',
                title: '通知退货',
                icon: 'undo-alt',
                path: '/projects/ERP/teaerp/pages/sales/return.html'
            },
            {
                key: 'analysis',
                title: '销售分析',
                icon: 'chart-bar',
                path: '/projects/ERP/teaerp/pages/sales/analysis.html'
            },
            {
                key: 'manual',
                title: '产品手册',
                icon: 'book',
                path: '/projects/ERP/teaerp/pages/sales/product-manual.html'
            }
        ]
    },
    {
        key: 'supplier',
        title: '供应商管理',
        icon: 'truck',
        children: [
            {
                key: 'info',
                title: '供应商信息',
                icon: 'info-circle',
                path: '/projects/ERP/teaerp/pages/supplier/info.html'
            },
            {
                key: 'contract',
                title: '供应商合同',
                icon: 'file-contract',
                path: '/projects/ERP/teaerp/pages/supplier/contract.html'
            },
            {
                key: 'reconciliation',
                title: '供应商对账',
                icon: 'balance-scale',
                path: '/projects/ERP/teaerp/pages/supplier/reconciliation.html'
            },
            {
                key: 'analysis',
                title: '供应商分析',
                icon: 'chart-pie',
                path: '/projects/ERP/teaerp/pages/supplier/analysis.html'
            }
        ]
    },
    {
        key: 'customer',
        title: '客户管理',
        icon: 'users',
        children: [
            {
                key: 'info',
                title: '客户列表',
                icon: 'user-circle',
                path: '/projects/ERP/teaerp/pages/customer/list.html'
            },
            {
                key: 'contract',
                title: '客户合同',
                icon: 'file-signature',
                path: '/projects/ERP/teaerp/pages/customer/contract.html'
            },
            {
                key: 'reconciliation',
                title: '客户对账',
                icon: 'balance-scale-right',
                path: '/projects/ERP/teaerp/pages/customer/reconciliation.html'
            },
            {
                key: 'service',
                title: '客户服务',
                icon: 'headset',
                path: '/projects/ERP/teaerp/pages/customer/service.html'
            },
            {
                key: 'analysis',
                title: '客户分析',
                icon: 'chart-area',
                path: '/projects/ERP/teaerp/pages/customer/analysis.html'
            }
        ]
    },
    {
        key: 'stock',
        title: '库存管理',
        icon: 'warehouse',
        children: [
            {
                key: 'inbound',
                title: '入库管理',
                icon: 'sign-in-alt',
                path: '/projects/ERP/teaerp/pages/stock/inbound.html'
            },
            {
                key: 'outbound',
                title: '出库管理',
                icon: 'sign-out-alt',
                path: '/projects/ERP/teaerp/pages/stock/outbound.html'
            },
            {
                key: 'flow',
                title: '库存流水',
                icon: 'stream',
                path: '/projects/ERP/teaerp/pages/stock/stock-flow.html'
            },
            {
                key: 'query',
                title: '库存查询',
                icon: 'search',
                path: '/projects/ERP/teaerp/pages/stock/stock-query.html'
            },
            {
                key: 'check',
                title: '库存盘点',
                icon: 'clipboard-check',
                path: '/projects/ERP/teaerp/pages/stock/stock-check.html'
            },
            {
                key: 'warning',
                title: '库存预警',
                icon: 'exclamation-triangle',
                path: '/projects/ERP/teaerp/pages/stock/stock-warning.html'
            },
            {
                key: 'transfer',
                title: '库存调拨',
                icon: 'exchange-alt',
                path: '/projects/ERP/teaerp/pages/stock/stock-transfer.html'
            },
            {
                key: 'analysis',
                title: '库存分析',
                icon: 'chart-line',
                path: '/projects/ERP/teaerp/pages/stock/stock-analysis.html'
            }
        ]
    },
    {
        key: 'production',
        title: '生产管理',
        icon: 'industry',
        children: [
            {
                key: 'bom',
                title: 'BOM管理',
                icon: 'sitemap',
                children: [
                    { key: 'material', title: '物料管理', icon: 'boxes', path: '/projects/ERP/teaerp/pages/production/bom/material.html' },
                    { key: 'structure', title: '结构管理', icon: 'project-diagram', path: '/projects/ERP/teaerp/pages/production/bom/structure.html' },
                    { key: 'process', title: '工艺路线', icon: 'route', path: '/projects/ERP/teaerp/pages/production/bom/process.html' }
                ]
            },
            {
                key: 'plan',
                title: '生产计划',
                icon: 'calendar-alt',
                path: '/projects/ERP/teaerp/pages/production/plan/index.html'
            },
            {
                key: 'workorder',
                title: '工单管理',
                icon: 'tasks',
                path: '/projects/ERP/teaerp/pages/production/workorder/index.html'
            },
            {
                key: 'process',
                title: '生产过程',
                icon: 'cogs',
                path: '/projects/ERP/teaerp/pages/production/process/index.html'
            },
            {
                key: 'collect',
                title: '数据采集',
                icon: 'database',
                children: [
                    {
                        key: 'material-collect',
                        title: '物料采集',
                        icon: 'box',
                        path: '/projects/ERP/teaerp/pages/production/collect/material.html'
                    },
                    {
                        key: 'progress-collect',
                        title: '进度采集',
                        icon: 'tasks',
                        path: '/projects/ERP/teaerp/pages/production/collect/progress.html'
                    },
                    {
                        key: 'energy-collect',
                        title: '能耗采集',
                        icon: 'bolt',
                        path: '/projects/ERP/teaerp/pages/production/collect/energy.html'
                    }
                ]
            },
            {
                key: 'execute',
                title: '生产执行',
                icon: 'play',
                path: '/projects/ERP/teaerp/pages/production/execute/task.html'
            },
            {
                key: 'progress',
                title: '生产进度',
                icon: 'chart-line',
                children: [
                    { key: 'progress-plan', title: '进度计划', icon: 'calendar-check', path: '/projects/ERP/teaerp/pages/production/progress/plan.html' },
                    { key: 'progress-monitor', title: '进度监控', icon: 'eye', path: '/projects/ERP/teaerp/pages/production/progress/monitor.html' },
                    { key: 'progress-report', title: '进度报告', icon: 'file-alt', path: '/projects/ERP/teaerp/pages/production/progress/report.html' }
                ]
            },
            {
                key: 'mrp',
                title: 'MRP运算',
                icon: 'calculator',
                children: [
                    { key: 'mrp-execute', title: '运算执行', icon: 'play-circle', path: '/projects/ERP/teaerp/pages/production/mrp/execute.html' },
                    { key: 'mrp-monitor', title: '运算监控', icon: 'desktop', path: '/projects/ERP/teaerp/pages/production/mrp/monitor.html' }
                ]
            },
            {
                key: 'analysis',
                title: '生产分析',
                icon: 'chart-bar',
                children: [
                    {
                        key: 'energy-analysis',
                        title: '能耗分析',
                        icon: 'bolt',
                        path: '/projects/ERP/teaerp/pages/production/analysis/energy.html'
                    },
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        icon: 'dollar-sign',
                        path: '/projects/ERP/teaerp/pages/production/analysis/cost.html'
                    },
                    {
                        key: 'capacity-analysis',
                        title: '产能分析',
                        icon: 'industry',
                        path: '/projects/ERP/teaerp/pages/production/analysis/capacity.html'
                    },
                    {
                        key: 'efficiency-analysis',
                        title: '效率分析',
                        icon: 'tachometer-alt',
                        path: '/projects/ERP/teaerp/pages/production/analysis/efficiency.html'
                    },
                    {
                        key: 'quality-analysis',
                        title: '质量分析',
                        icon: 'check-circle',
                        path: '/projects/ERP/teaerp/pages/production/analysis/quality.html'
                    },
                    {
                        key: 'performance-analysis',
                        title: '绩效分析',
                        icon: 'chart-line',
                        path: '/projects/ERP/teaerp/pages/production/analysis/performance.html'
                    }
                ]
            }
        ]
    },
    {
        key: 'finance',
        title: '财务管理',
        icon: 'money-bill-wave',
        children: [
            {
                key: 'ledger',
                title: '总账管理',
                icon: 'book',
                children: [
                    {
                        key: 'account',
                        title: '科目设置',
                        icon: 'cog',
                        path: '/projects/ERP/teaerp/pages/finance/ledger/account.html'
                    },
                    {
                        key: 'voucher',
                        title: '凭证管理',
                        icon: 'file-invoice',
                        path: '/projects/ERP/teaerp/pages/finance/ledger/voucher.html'
                    },
                    {
                        key: 'book',
                        title: '账簿查询',
                        icon: 'book-open',
                        path: '/projects/ERP/teaerp/pages/finance/ledger/book.html'
                    }
                ]
            },
            {
                key: 'receivable',
                title: '应收管理',
                icon: 'hand-holding-usd',
                children: [
                    {
                        key: 'bill',
                        title: '应收单',
                        path: '/projects/ERP/teaerp/pages/finance/receivable/bill.html'
                    },
                    {
                        key: 'receipt',
                        title: '收款单',
                        path: '/projects/ERP/teaerp/pages/finance/receivable/receipt.html'
                    },
                    {
                        key: 'aging',
                        title: '应收账龄',
                        path: '/projects/ERP/teaerp/pages/finance/receivable/aging.html'
                    }
                ]
            },
            {
                key: 'payable',
                title: '应付管理',
                icon: 'credit-card',
                children: [
                    {
                        key: 'bill',
                        title: '应付单',
                        path: '/projects/ERP/teaerp/pages/finance/payable/bill.html'
                    },
                    {
                        key: 'payment',
                        title: '付款单',
                        path: '/projects/ERP/teaerp/pages/finance/payable/payment.html'
                    },
                    {
                        key: 'aging',
                        title: '应付账龄',
                        path: '/projects/ERP/teaerp/pages/finance/payable/aging.html'
                    }
                ]
            },
            {
                key: 'cost',
                title: '成本管理',
                icon: 'calculator',
                children: [
                    {
                        key: 'cost-accounting',
                        title: '成本核算',
                        path: '/projects/ERP/teaerp/pages/finance/cost/cost-accounting.html'
                    },
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        path: '/projects/ERP/teaerp/pages/finance/cost/cost-analysis.html'
                    },
                    {
                        key: 'cost-report',
                        title: '成本报表',
                        path: '/projects/ERP/teaerp/pages/finance/cost/cost-report.html'
                    },
                    {
                        key: 'cost-adjustment',
                        title: '成本调整',
                        path: '/projects/ERP/teaerp/pages/finance/cost/cost-adjustment.html'
                    }
                ]
            },
            {
                key: 'invoice',
                title: '发票管理',
                icon: 'file-invoice',
                children: [
                    {
                        key: 'invoice-management',
                        title: '发票管理',
                        path: '/projects/ERP/teaerp/pages/finance/invoice/index.html'
                    },
                    {
                        key: 'invoice-statistics',
                        title: '发票统计',
                        path: '/projects/ERP/teaerp/pages/finance/invoice/statistics.html'
                    }
                ]
            },
            {
                key: 'expense',
                title: '费用管理',
                icon: 'receipt',
                children: [
                    {
                        key: 'expense-management',
                        title: '费用管理',
                        path: '/projects/ERP/teaerp/pages/finance/expense/index.html'
                    },
                    {
                        key: 'expense-statistics',
                        title: '费用统计',
                        path: '/projects/ERP/teaerp/pages/finance/expense/statistics.html'
                    }
                ]
            },
            {
                key: 'analysis',
                title: '财务分析',
                icon: 'chart-bar',
                path: '/projects/ERP/teaerp/pages/finance/analysis/index.html'
            }
        ]
    },
    {
        key: 'system',
        title: '系统管理',
        icon: 'cog',
        children: [
            {
                key: 'user',
                title: '用户管理',
                icon: 'user-cog',
                path: '/projects/ERP/teaerp/pages/system/user.html'
            },
            {
                key: 'role',
                title: '角色管理',
                icon: 'users-cog',
                path: '/projects/ERP/teaerp/pages/system/role.html'
            },
            {
                key: 'permission',
                title: '权限管理',
                icon: 'lock',
                path: '/projects/ERP/teaerp/pages/system/permission.html'
            },
            {
                key: 'log',
                title: '日志管理',
                icon: 'history',
                path: '/projects/ERP/teaerp/pages/system/log.html'
            },
            {
                key: 'monitor',
                title: '系统监控',
                icon: 'desktop',
                path: '/projects/ERP/teaerp/pages/system/monitor.html'
            },
            {
                key: 'config',
                title: '系统配置',
                icon: 'sliders-h',
                path: '/projects/ERP/teaerp/pages/system/config.html'
            },
            {
                key: 'backup',
                title: '系统备份',
                icon: 'database',
                path: '/projects/ERP/teaerp/pages/system/backup.html'
            },
            {
                key: 'recovery',
                title: '系统恢复',
                icon: 'redo',
                path: '/projects/ERP/teaerp/pages/system/recovery.html'
            },
            {
                key: 'upgrade',
                title: '系统升级',
                icon: 'arrow-up',
                path: '/projects/ERP/teaerp/pages/system/upgrade.html'
            },
            {
                key: 'maintenance',
                title: '系统维护',
                icon: 'tools',
                path: '/projects/ERP/teaerp/pages/system/maintenance.html'
            }
        ]
    },
    {
        key: 'operation',
        title: '经营计划',
        icon: 'chart-line',
        children: [
            {
                key: 'target',
                title: '计划制定',
                icon: 'bullseye',
                path: '/projects/ERP/teaerp/pages/operation/plan/target/index.html'
            },
            {
                key: 'adjust',
                title: '计划调整',
                icon: 'sliders-h',
                path: '/projects/ERP/teaerp/pages/operation/plan/adjust/index.html'
            },
            {
                key: 'analysis',
                title: '计划分析',
                icon: 'chart-bar',
                path: '/projects/ERP/teaerp/pages/operation/plan/analysis/index.html'
            }
        ]
    }
];

// 菜单管理
const Menu = {
    // 渲染菜单
    renderMenu() {
        const menuContainer = document.querySelector('.main-menu');
        if (!menuContainer) return;

        // 渲染一级菜单
        menuContainer.innerHTML = menuConfig.map(module => `
            <div class="menu-module" data-key="${module.key}">
                <div class="module-title">
                    <i class="fas fa-${module.icon}"></i>
                    <span>${module.title}</span>
                    <i class="fas fa-chevron-down icon-arrow"></i>
                </div>
                ${this.renderSubMenu(module.children)}
            </div>
        `).join('');

        this.bindEvents();
        this.setActiveMenu();
    },

    // 渲染子菜单
    renderSubMenu(items) {
        if (!items) return '';

        return `
            <ul class="sub-menu">
                ${items.map(item => `
                    <li class="menu-item" data-key="${item.key}">
                        ${item.children ? `
                            <div class="menu-group">
                                <i class="fas fa-${item.icon || 'circle'}"></i>
                                <span>${item.title}</span>
                                <i class="fas fa-chevron-down icon-arrow"></i>
                            </div>
                            ${this.renderSubMenu(item.children)}
                        ` : `
                            <a href="${item.path}" class="menu-link">
                                <i class="fas fa-${item.icon || 'circle'}"></i>
                                <span>${item.title}</span>
                            </a>
                        `}
                    </li>
                `).join('')}
            </ul>
        `;
    },

    // 绑定事件
    bindEvents() {
        // 模块标题点击事件
        document.querySelectorAll('.module-title').forEach(title => {
            title.addEventListener('click', () => {
                const menuModule = title.closest('.menu-module');
                this.toggleModule(menuModule);
            });
        });

        // 菜单组点击事件
        document.querySelectorAll('.menu-group').forEach(group => {
            group.addEventListener('click', () => {
                const menuItem = group.closest('.menu-item');
                this.toggleSubMenu(menuItem);
            });
        });

        // 菜单链接点击事件
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleMenuClick(link);
            });
        });
    },

    // 切换模块展开状态
    toggleModule(menuModule) {
        const subMenu = menuModule.querySelector('.sub-menu');
        if (subMenu) {
            const isExpanded = menuModule.classList.contains('expanded');
            
            // 如果当前模块包含激活的菜单项，则不允许折叠
            const hasActiveItem = menuModule.querySelector('.menu-item.active');
            if (hasActiveItem && isExpanded) {
                return;
            }
            
            // 收起其他模块
            document.querySelectorAll('.menu-module').forEach(module => {
                if (module !== menuModule && !module.querySelector('.menu-item.active')) {
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
    },

    // 切换子菜单
    toggleSubMenu(menuItem) {
        const subMenu = menuItem.querySelector('.sub-menu');
        if (subMenu) {
            const isExpanded = menuItem.classList.contains('expanded');
            
            // 如果当前菜单项包含激活的子项，则不允许折叠
            const hasActiveItem = menuItem.querySelector('.menu-item.active');
            if (hasActiveItem && isExpanded) {
                return;
            }
            
            // 收起同级其他展开的菜单
            const siblings = menuItem.parentElement.children;
            Array.from(siblings).forEach(sibling => {
                if (sibling !== menuItem && !sibling.querySelector('.menu-item.active')) {
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
    },

    // 处理菜单点击
    handleMenuClick(menuLink) {
        // 移除其他菜单项的激活状态，但保持当前菜单项的父级菜单展开状态
        document.querySelectorAll('.menu-item').forEach(item => {
            if (!menuLink.closest('.menu-module').contains(item)) {
                item.classList.remove('active');
            }
        });

        // 设置当前菜单激活状态
        const menuItem = menuLink.closest('.menu-item');
        menuItem.classList.add('active');

        // 展开所有父级菜单
        this.expandParentMenus(menuItem);

        // 收起其他一级菜单（不包含当前激活菜单的父级）
        const currentModule = menuLink.closest('.menu-module');
        document.querySelectorAll('.menu-module').forEach(module => {
            if (module !== currentModule) {
                module.classList.remove('expanded');
                const moduleSubMenu = module.querySelector('.sub-menu');
                if (moduleSubMenu) {
                    moduleSubMenu.style.display = 'none';
                }
            }
        });
    },

    // 设置当前激活的菜单
    setActiveMenu() {
        const path = window.location.pathname;
        
        // 移除所有激活状态
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // 查找并设置当前激活的菜单
        const menuLink = document.querySelector(`.menu-link[href*="${path}"]`);
        if (menuLink) {
            const menuItem = menuLink.closest('.menu-item');
            menuItem.classList.add('active');

            // 展开所有父级菜单
            this.expandParentMenus(menuItem);

            // 收起其他一级菜单（不包含当前激活菜单的父级）
            const currentModule = menuLink.closest('.menu-module');
            document.querySelectorAll('.menu-module').forEach(module => {
                if (module !== currentModule) {
                    module.classList.remove('expanded');
                    const moduleSubMenu = module.querySelector('.sub-menu');
                    if (moduleSubMenu) {
                        moduleSubMenu.style.display = 'none';
                    }
                }
            });
        }
    },

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
                break; // 找到最顶层模块后停止
            }
            parent = parent.parentElement;
        }
    }
};

// 初始化菜单切换功能
function initMenuToggle() {
    const toggleBtn = document.querySelector('.toggle-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
    }
}

// 初始化销售趋势图表
function initSalesChart() {
    const chart = echarts.init(document.getElementById('salesChart'));
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销售额',
            type: 'line',
            data: [12000, 15000, 14000, 18000, 16000, 20000, 22000],
            smooth: true,
            lineStyle: {
                color: '#81D8D0'
            },
            itemStyle: {
                color: '#81D8D0'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(129, 216, 208, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(129, 216, 208, 0.1)'
                }])
            }
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 初始化生产计划图表
function initProductionChart() {
    const chart = echarts.init(document.getElementById('productionChart'));
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [{
            name: '生产计划',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 735, name: '已完成', itemStyle: { color: '#81D8D0' } },
                { value: 580, name: '进行中', itemStyle: { color: '#A5E6E1' } },
                { value: 484, name: '未开始', itemStyle: { color: '#C9F0EC' } },
                { value: 300, name: '已延期', itemStyle: { color: '#ff6b6b' } }
            ]
        }]
    };
    
    chart.setOption(option);
    
    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单
    Menu.renderMenu();
    // 初始化销售趋势图表
    initSalesChart();
    // 初始化生产计划图表
    initProductionChart();
    // 初始化菜单切换功能
    initMenuToggle();
}); 