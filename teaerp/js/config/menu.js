// 菜单配置
const menuConfig = [
    {
        key: 'finance',
        title: '财务管理',
        icon: 'money-bill',
        children: [
            {
                key: 'receipt',
                title: '收款管理',
                icon: 'hand-holding-usd',
                path: '/teaerp/pages/finance/receipt/index.html'
            },
            {
                key: 'payment',
                title: '付款管理',
                icon: 'credit-card',
                path: '/teaerp/pages/finance/payment/index.html'
            },
            {
                key: 'invoice',
                title: '发票管理',
                icon: 'file-invoice',
                path: '/teaerp/pages/finance/invoice/index.html'
            },
            {
                key: 'expense',
                title: '费用管理',
                icon: 'receipt',
                path: '/teaerp/pages/finance/expense/index.html'
            },
            {
                key: 'cost',
                title: '成本管理',
                icon: 'chart-line',
                children: [
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        icon: 'chart-pie',
                        children: [
                            {
                                key: 'product-cost',
                                title: '产品成本分析',
                                path: '/teaerp/pages/finance/cost/analysis/product.html'
                            },
                            {
                                key: 'department-cost',
                                title: '部门成本分析',
                                path: '/teaerp/pages/finance/cost/analysis/department.html'
                            },
                            {
                                key: 'project-cost',
                                title: '项目成本分析',
                                path: '/teaerp/pages/finance/cost/analysis/project.html'
                            }
                        ]
                    },
                    {
                        key: 'budget',
                        title: '预算管理',
                        icon: 'balance-scale',
                        path: '/teaerp/pages/finance/cost/budget/index.html'
                    },
                    {
                        key: 'cost-report',
                        title: '成本报表',
                        icon: 'file-alt',
                        children: [
                            {
                                key: 'cost-summary',
                                title: '成本汇总表',
                                path: '/teaerp/pages/finance/cost/report/summary.html'
                            },
                            {
                                key: 'cost-variance',
                                title: '成本差异表',
                                path: '/teaerp/pages/finance/cost/report/variance.html'
                            },
                            {
                                key: 'cost-trend',
                                title: '成本趋势表',
                                path: '/teaerp/pages/finance/cost/report/trend.html'
                            }
                        ]
                    }
                ]
            },
            {
                key: 'analysis',
                title: '财务分析',
                icon: 'chart-bar',
                path: '/teaerp/pages/finance/analysis/index.html'
            },
            {
                key: 'warning',
                title: '财务预警',
                icon: 'exclamation-triangle',
                path: '/teaerp/pages/finance/warning/index.html'
            }
        ]
    },
    {
        key: 'production',
        title: '生产管理',
        icon: 'industry',
        children: [
            {
                key: 'analysis',
                title: '生产分析',
                icon: 'chart-bar',
                children: [
                    {
                        key: 'energy-analysis',
                        title: '能耗分析',
                        icon: 'bolt',
                        path: '/teaerp/pages/production/analysis/energy.html'
                    },
                    {
                        key: 'cost-analysis',
                        title: '成本分析',
                        icon: 'dollar-sign',
                        path: '/teaerp/pages/production/analysis/cost.html'
                    },
                    {
                        key: 'capacity-analysis',
                        title: '产能分析',
                        icon: 'industry',
                        path: '/teaerp/pages/production/analysis/capacity.html'
                    },
                    {
                        key: 'efficiency-analysis',
                        title: '效率分析',
                        icon: 'tachometer-alt',
                        path: '/teaerp/pages/production/analysis/efficiency.html'
                    },
                    {
                        key: 'quality-analysis',
                        title: '质量分析',
                        icon: 'check-circle',
                        path: '/teaerp/pages/production/analysis/quality.html'
                    },
                    {
                        key: 'performance-analysis',
                        title: '绩效分析',
                        icon: 'chart-line',
                        path: '/teaerp/pages/production/analysis/performance.html'
                    }
                ]
            }
        ]
    }
];

// 导出菜单配置
export default menuConfig; 