module.exports = {
    id: 'finance',
    title: '财务管理',
    icon: 'fas fa-money-bill-wave',
    children: [
        {
            id: 'cost',
            title: '成本管理',
            children: [
                {
                    id: 'cost-accounting',
                    title: '成本核算',
                    url: '/pages/finance/cost/cost-accounting.html'
                },
                {
                    id: 'cost-analysis',
                    title: '成本分析',
                    url: '/pages/finance/cost/cost-analysis.html'
                },
                {
                    id: 'cost-report',
                    title: '成本报表',
                    url: '/pages/finance/cost/cost-report.html'
                },
                {
                    id: 'cost-adjustment',
                    title: '成本调整',
                    url: '/pages/finance/cost/cost-adjustment.html'
                }
            ]
        },
        {
            id: 'invoice',
            title: '发票管理',
            children: [
                {
                    id: 'invoice-management',
                    title: '发票管理',
                    url: '/pages/finance/invoice/index.html'
                },
                {
                    id: 'invoice-statistics',
                    title: '发票统计',
                    url: '/pages/finance/invoice/statistics.html'
                }
            ]
        },
        {
            id: 'expense',
            title: '费用管理',
            children: [
                {
                    id: 'expense-management',
                    title: '费用管理',
                    url: '/pages/finance/expense/index.html'
                },
                {
                    id: 'expense-statistics',
                    title: '费用统计',
                    url: '/pages/finance/expense/statistics.html'
                }
            ]
        },
        {
            id: 'analysis',
            title: '财务分析',
            url: '/pages/finance/analysis/index.html'
        }
    ]
}; 