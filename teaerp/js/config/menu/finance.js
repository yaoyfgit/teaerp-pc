// 财务管理模块菜单配置
const financeMenu = {
    key: 'finance',
    title: '财务管理',
    icon: 'finance',
    children: [
        {
            key: 'receivable',
            title: '收款管理',
            icon: 'receivable',
            children: [
                {
                    key: 'advance',
                    title: '预收款管理',
                    path: '/finance/receivable/advance'
                },
                {
                    key: 'collection',
                    title: '收款管理',
                    path: '/finance/receivable/collection'
                },
                {
                    key: 'account-reconciliation',
                    title: '账务核对',
                    path: '/finance/receivable/account-reconciliation'
                },
                {
                    key: 'account-register',
                    title: '账务登记',
                    path: '/finance/receivable/account-register'
                }
            ]
        },
        {
            key: 'payable',
            title: '付款管理',
            icon: 'payable',
            children: [
                {
                    key: 'advance',
                    title: '预付款管理',
                    path: '/finance/payable/advance'
                },
                {
                    key: 'payment',
                    title: '付款管理',
                    path: '/finance/payable/payment'
                },
                {
                    key: 'account-reconciliation',
                    title: '账务核对',
                    path: '/finance/payable/account-reconciliation'
                },
                {
                    key: 'account-register',
                    title: '账务登记',
                    path: '/finance/payable/account-register'
                }
            ]
        },
        {
            key: 'invoice',
            title: '发票管理',
            icon: 'invoice',
            path: '/finance/invoice'
        },
        {
            key: 'expense',
            title: '费用管理',
            icon: 'expense',
            path: '/finance/expense'
        },
        {
            key: 'cost',
            title: '成本管理',
            icon: 'cost',
            children: [
                {
                    key: 'analysis',
                    title: '成本分析',
                    children: [
                        {
                            key: 'product',
                            title: '产品成本分析',
                            path: '/finance/cost/analysis/product'
                        },
                        {
                            key: 'department',
                            title: '部门成本分析',
                            path: '/finance/cost/analysis/department'
                        },
                        {
                            key: 'project',
                            title: '项目成本分析',
                            path: '/finance/cost/analysis/project'
                        }
                    ]
                },
                {
                    key: 'budget',
                    title: '预算管理',
                    path: '/finance/cost/budget'
                },
                {
                    key: 'report',
                    title: '成本报表',
                    children: [
                        {
                            key: 'summary',
                            title: '成本汇总表',
                            path: '/finance/cost/report/summary'
                        },
                        {
                            key: 'variance',
                            title: '成本差异表',
                            path: '/finance/cost/report/variance'
                        },
                        {
                            key: 'trend',
                            title: '成本趋势表',
                            path: '/finance/cost/report/trend'
                        }
                    ]
                }
            ]
        },
        {
            key: 'ledger',
            title: '总账管理',
            icon: 'ledger',
            children: [
                {
                    key: 'voucher-entry',
                    title: '凭证录入',
                    path: '/finance/ledger/voucher-entry'
                },
                {
                    key: 'voucher-audit',
                    title: '凭证审核',
                    path: '/finance/ledger/voucher-audit'
                },
                {
                    key: 'voucher-query',
                    title: '凭证查询',
                    path: '/finance/ledger/voucher-query'
                },
                {
                    key: 'subject-setting',
                    title: '科目设置',
                    path: '/finance/ledger/subject-setting'
                },
                {
                    key: 'subject-balance',
                    title: '科目余额',
                    path: '/finance/ledger/subject-balance'
                },
                {
                    key: 'subject-relation',
                    title: '科目对照',
                    path: '/finance/ledger/subject-relation'
                }
            ]
        },
        {
            key: 'analysis',
            title: '财务分析',
            icon: 'analysis',
            path: '/finance/analysis'
        },
        {
            key: 'warning',
            title: '财务预警',
            icon: 'warning',
            path: '/finance/warning'
        }
    ]
};

export default financeMenu; 