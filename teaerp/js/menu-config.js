// 菜单配置
export const menuConfig = {
    purchase: {
        title: '采购管理',
        icon: 'fas fa-shopping-cart',
        items: [
            { title: '采购需求', url: '/projects/ERP/teaerp/pages/purchase/requirement.html' },
            { title: '采购订单', url: '/projects/ERP/teaerp/pages/purchase/order.html' },
            { title: '通知收货', url: '/projects/ERP/teaerp/pages/purchase/receive.html' },
            { title: '通知退货', url: '/projects/ERP/teaerp/pages/purchase/return.html' },
            { title: '采购分析', url: '/projects/ERP/teaerp/pages/purchase/analysis.html' }
        ]
    },
    sale: {
        title: '销售管理',
        icon: 'fas fa-store',
        items: [
            { title: '销售订单', url: '/projects/ERP/teaerp/pages/sale/order.html' },
            { title: '通知发货', url: '/projects/ERP/teaerp/pages/sale/delivery.html' },
            { title: '通知退货', url: '/projects/ERP/teaerp/pages/sale/return.html' },
            { title: '销售分析', url: '/projects/ERP/teaerp/pages/sale/analysis.html' },
            { title: '产品手册', url: '/projects/ERP/teaerp/pages/sale/manual.html' }
        ]
    },
    supplier: {
        title: '供应商管理',
        icon: 'fas fa-truck',
        items: [
            { title: '供应商信息', url: '/projects/ERP/teaerp/pages/supplier/info.html' },
            { title: '供应商合同', url: '/projects/ERP/teaerp/pages/supplier/contract.html' },
            { title: '供应商对账', url: '/projects/ERP/teaerp/pages/supplier/reconciliation.html' },
            { title: '供应商分析', url: '/projects/ERP/teaerp/pages/supplier/analysis.html' }
        ]
    },
    customer: {
        title: '客户管理',
        icon: 'fas fa-users',
        items: [
            { title: '客户列表', url: '/projects/ERP/teaerp/pages/customer/list.html' },
            { title: '客户合同', url: '/projects/ERP/teaerp/pages/customer/contract.html' },
            { title: '客户对账', url: '/projects/ERP/teaerp/pages/customer/reconciliation.html' },
            { title: '客户服务', url: '/projects/ERP/teaerp/pages/customer/service.html' },
            { title: '客户分析', url: '/projects/ERP/teaerp/pages/customer/analysis.html' }
        ]
    },
    stock: {
        title: '库存管理',
        icon: 'fas fa-warehouse',
        items: [
            { title: '入库管理', url: '/projects/ERP/teaerp/pages/stock/inbound.html' },
            { title: '出库管理', url: '/projects/ERP/teaerp/pages/stock/outbound.html' },
            { title: '库存流水', url: '/projects/ERP/teaerp/pages/stock/stock-flow.html' },
            { title: '库存查询', url: '/projects/ERP/teaerp/pages/stock/stock-query.html' },
            { title: '库存盘点', url: '/projects/ERP/teaerp/pages/stock/stock-check.html' },
            { title: '库存预警', url: '/projects/ERP/teaerp/pages/stock/stock-warning.html' },
            { title: '库存调拨', url: '/projects/ERP/teaerp/pages/stock/stock-transfer.html' },
            { title: '库存分析', url: '/projects/ERP/teaerp/pages/stock/stock-analysis.html' }
        ]
    },
    operation: {
        title: '经营计划',
        icon: 'fas fa-chart-line',
        children: [
            {
                title: '目标制定',
                icon: 'fas fa-bullseye',
                path: '/pages/operation/plan/target/index.html'
            },
            {
                title: '目标跟进',
                icon: 'fas fa-tasks',
                path: '/pages/operation/plan/follow/index.html'
            },
            {
                title: '目标调整',
                icon: 'fas fa-sliders-h',
                path: '/pages/operation/plan/adjust/index.html'
            },
            {
                title: '目标分析',
                icon: 'fas fa-chart-bar',
                path: '/pages/operation/plan/analysis/index.html'
            }
        ]
    },
    barcode: {
        title: '条码管理',
        icon: 'fas fa-barcode',
        items: [
            { title: '条码规则', url: '/projects/ERP/teaerp/pages/barcode/rule.html' },
            { title: '条码生成', url: '/projects/ERP/teaerp/pages/barcode/generate.html' },
            { title: '打印模板', url: '/projects/ERP/teaerp/pages/barcode/template.html' },
            { title: '打印记录', url: '/projects/ERP/teaerp/pages/barcode/record.html' }
        ]
    },
    production: {
        title: '生产管理',
        icon: 'fas fa-industry',
        children: [
            {
                title: '生产计划',
                icon: 'fas fa-calendar-alt',
                path: '/pages/production/plan/index.html'
            },
            {
                title: '工单管理',
                icon: 'fas fa-file-alt',
                path: '/pages/production/workorder/index.html'
            },
            {
                title: 'BOM管理',
                icon: 'fas fa-sitemap',
                children: [
                    {
                        title: '物料管理',
                        icon: 'fas fa-boxes',
                        path: '/pages/production/bom/material.html'
                    },
                    {
                        title: 'BOM结构',
                        icon: 'fas fa-project-diagram',
                        path: '/pages/production/bom/structure.html'
                    }
                ]
            },
            {
                title: '生产分析',
                icon: 'fas fa-chart-bar',
                children: [
                    {
                        title: '能耗分析',
                        icon: 'fas fa-bolt',
                        path: '/pages/production/analysis/energy.html'
                    },
                    {
                        title: '成本分析',
                        icon: 'fas fa-dollar-sign',
                        path: '/pages/production/analysis/cost.html'
                    },
                    {
                        title: '产能分析',
                        icon: 'fas fa-industry',
                        path: '/pages/production/analysis/capacity.html'
                    },
                    {
                        title: '效率分析',
                        icon: 'fas fa-tachometer-alt',
                        path: '/pages/production/analysis/efficiency.html'
                    },
                    {
                        title: '质量分析',
                        icon: 'fas fa-check-circle',
                        path: '/pages/production/analysis/quality.html'
                    },
                    {
                        title: '绩效分析',
                        icon: 'fas fa-chart-line',
                        path: '/pages/production/analysis/performance.html'
                    }
                ]
            }
        ]
    },
    finance: {
        id: 'finance',
        title: '财务管理',
        icon: 'fas fa-money-bill-wave',
        children: [
            {
                id: 'ledger',
                title: '总账管理',
                children: [
                    {
                        id: 'account',
                        title: '科目设置',
                        url: '/pages/finance/ledger/account.html'
                    },
                    {
                        id: 'voucher',
                        title: '凭证管理',
                        url: '/pages/finance/ledger/voucher.html'
                    },
                    {
                        id: 'book',
                        title: '账簿查询',
                        url: '/pages/finance/ledger/book.html'
                    }
                ]
            },
            {
                id: 'receivable',
                title: '应收管理',
                children: [
                    {
                        id: 'bill',
                        title: '应收单',
                        url: '/pages/finance/receivable/bill.html'
                    },
                    {
                        id: 'receipt',
                        title: '收款单',
                        url: '/pages/finance/receivable/receipt.html'
                    },
                    {
                        id: 'aging',
                        title: '应收账龄',
                        url: '/pages/finance/receivable/aging.html'
                    }
                ]
            },
            {
                id: 'payable',
                title: '应付管理',
                children: [
                    {
                        id: 'bill',
                        title: '应付单',
                        url: '/pages/finance/payable/bill.html'
                    },
                    {
                        id: 'payment',
                        title: '付款单',
                        url: '/pages/finance/payable/payment.html'
                    },
                    {
                        id: 'aging',
                        title: '应付账龄',
                        url: '/pages/finance/payable/aging.html'
                    }
                ]
            },
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
    },
    system: {
        title: '系统管理',
        icon: 'fas fa-cog',
        items: [
            { title: '用户管理', url: '/projects/ERP/teaerp/pages/system/user.html' },
            { title: '角色管理', url: '/projects/ERP/teaerp/pages/system/role.html' },
            { title: '权限管理', url: '/projects/ERP/teaerp/pages/system/permission.html' },
            { title: '日志管理', url: '/projects/ERP/teaerp/pages/system/log.html' },
            { title: '系统监控', url: '/projects/ERP/teaerp/pages/system/monitor.html' },
            { title: '系统配置', url: '/projects/ERP/teaerp/pages/system/config.html' },
            { title: '系统备份', url: '/projects/ERP/teaerp/pages/system/backup.html' },
            { title: '系统恢复', url: '/projects/ERP/teaerp/pages/system/recovery.html' },
            { title: '系统升级', url: '/projects/ERP/teaerp/pages/system/upgrade.html' },
            { title: '系统维护', url: '/projects/ERP/teaerp/pages/system/maintenance.html' }
        ]
    }
};