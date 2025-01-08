const menuConfig = {
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
            { title: '客户信息', url: '/projects/ERP/teaerp/pages/customer/info.html' },
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
        title: '经营管理',
        icon: 'fas fa-chart-line',
        items: [
            {
                title: '计划管理',
                items: [
                    { title: '目标制定', url: '/projects/ERP/teaerp/pages/operation/plan/target.html' },
                    { title: '目标跟进', url: '/projects/ERP/teaerp/pages/operation/plan/follow.html' },
                    { title: '目标调整', url: '/projects/ERP/teaerp/pages/operation/plan/adjust.html' },
                    { title: '目标分析', url: '/projects/ERP/teaerp/pages/operation/plan/analysis.html' }
                ]
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
        items: [
            {
                title: 'BOM管理',
                children: [
                    { title: '结构管理', url: '/projects/ERP/teaerp/pages/production/bom/structure.html' },
                    { title: '物料管理', url: '/projects/ERP/teaerp/pages/production/bom/material.html' },
                    { title: '工艺路线', url: '/projects/ERP/teaerp/pages/production/bom/process.html' }
                ]
            },
            {
                title: '生产进度管理',
                children: [
                    { title: '进度计划', url: '/projects/ERP/teaerp/pages/production/progress/plan.html' },
                    { title: '进度监控', url: '/projects/ERP/teaerp/pages/production/progress/monitor.html' },
                    { title: '进度报告', url: '/projects/ERP/teaerp/pages/production/progress/report.html' }
                ]
            },
            {
                title: 'MRP运算管理',
                children: [
                    { title: '运算配置', url: '/projects/ERP/teaerp/pages/production/mrp/config.html' },
                    { title: '运算执行', url: '/projects/ERP/teaerp/pages/production/mrp/execute.html' },
                    { title: '运算监控', url: '/projects/ERP/teaerp/pages/production/mrp/monitor.html' }
                ]
            }
        ]
    },
    finance: {
        title: '财务管理',
        icon: 'fas fa-money-bill-wave',
        items: [
            {
                title: '账簿管理',
                children: [
                    { title: '科目设置', url: '/projects/ERP/teaerp/pages/finance/ledger/subject-setting.html' },
                    { title: '科目关系', url: '/projects/ERP/teaerp/pages/finance/ledger/subject-relation.html' },
                    { title: '科目余额', url: '/projects/ERP/teaerp/pages/finance/ledger/subject-balance.html' },
                    { title: '凭证录入', url: '/projects/ERP/teaerp/pages/finance/ledger/voucher-entry.html' },
                    { title: '凭证审核', url: '/projects/ERP/teaerp/pages/finance/ledger/voucher-audit.html' },
                    { title: '凭证查询', url: '/projects/ERP/teaerp/pages/finance/ledger/voucher-query.html' }
                ]
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