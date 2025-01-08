// MRP示例数据
const mrpMockData = {
    // 监控数据
    monitor: {
        progress: {
            percentage: 75,
            remainingTime: '5分钟',
            performance: {
                cpu: '45%',
                memory: '2.5GB',
                runtime: '15分钟'
            }
        },
        logs: [
            { type: 'info', time: '2023-12-21 10:00:00', message: '开始MRP运算' },
            { type: 'info', time: '2023-12-21 10:00:05', message: '正在收集销售订单需求' },
            { type: 'warning', time: '2023-12-21 10:00:10', message: '订单SO2312001缺少交期信息' },
            { type: 'info', time: '2023-12-21 10:00:15', message: '正在分析库存数据' },
            { type: 'error', time: '2023-12-21 10:00:20', message: '物料M001库存数据异常' }
        ],
        errors: [
            {
                time: '2023-12-21 10:00:20',
                type: '数据异常',
                description: '物料M001库存数据异常',
                impact: '影响该物料的需求计算',
                status: '未处理',
                id: 'ERR001'
            }
        ],
        analysis: {
            demand: {
                products: ['红茶', '绿茶', '乌龙茶', '普洱茶'],
                totalDemand: [1200, 800, 600, 400],
                orderDemand: [1000, 600, 400, 300],
                forecastDemand: [200, 200, 200, 100],
                safetyStock: [100, 80, 60, 40]
            },
            material: {
                materials: ['茶叶原料', '包装盒', '内袋', '标签'],
                demand: [3000, 3000, 3000, 3000],
                stock: [1000, 2000, 1500, 2500],
                incoming: [500, 0, 500, 0],
                shortage: [1500, 1000, 1000, 500]
            }
        }
    },

    // 运算配置
    config: {
        timing: {
            executeTime: '23:00',
            frequency: 'daily',
            range: 30,
            triggerType: 'auto'
        },
        parameters: {
            leadTime: 7,
            safetyStock: 1.2,
            minBatch: 100,
            batchMultiple: 50
        }
    },

    // 运算执行数据
    execute: {
        orderDemand: [
            {
                orderId: 'SO2312001',
                product: '特级碧螺春',
                quantity: 500,
                dueDate: '2024-01-15',
                priority: '高',
                customerLevel: 'A'
            },
            {
                orderId: 'SO2312002',
                product: '大红袍',
                quantity: 300,
                dueDate: '2024-01-20',
                priority: '中',
                customerLevel: 'B'
            }
        ],
        forecastDemand: [
            {
                product: '铁观音',
                quantity: 1000,
                type: '季度预测',
                period: '2024Q1'
            },
            {
                product: '龙井',
                quantity: 800,
                type: '月度预测',
                period: '2024-01'
            }
        ],
        stockCheck: [
            {
                code: 'M001',
                name: '茶叶原料A',
                currentStock: 1000,
                incomingStock: 500,
                safetyStock: 300,
                reservedStock: 200,
                availableStock: 1000
            },
            {
                code: 'M002',
                name: '包装盒B',
                currentStock: 2000,
                incomingStock: 0,
                safetyStock: 500,
                reservedStock: 300,
                availableStock: 1200
            }
        ],
        productionPlan: [
            {
                product: '特级碧螺春',
                quantity: 500,
                startDate: '2024-01-01',
                endDate: '2024-01-10',
                workshop: '精制车间',
                workstation: 'WS001'
            },
            {
                product: '大红袍',
                quantity: 300,
                startDate: '2024-01-05',
                endDate: '2024-01-15',
                workshop: '烘焙车间',
                workstation: 'WS002'
            }
        ],
        purchasePlan: [
            {
                material: '茶叶原料A',
                quantity: 1000,
                supplier: '供应商A',
                leadTime: '7天',
                expectedDate: '2024-01-05'
            },
            {
                material: '包装盒B',
                quantity: 2000,
                supplier: '供应商B',
                leadTime: '5天',
                expectedDate: '2024-01-03'
            }
        ],
        safetyStockDemand: [
            {
                product: '特级碧螺春',
                currentStock: 200,
                minStock: 300,
                maxStock: 1000,
                reorderPoint: 400,
                reorderQty: 500
            },
            {
                product: '大红袍',
                currentStock: 150,
                minStock: 200,
                maxStock: 800,
                reorderPoint: 300,
                reorderQty: 400
            },
            {
                product: '铁观音',
                currentStock: 300,
                minStock: 250,
                maxStock: 1200,
                reorderPoint: 500,
                reorderQty: 600
            }
        ],
        bomTree: [
            {
                id: 'BOM001',
                product: '特级碧螺春',
                quantity: 500,
                children: [
                    {
                        id: 'M001',
                        material: '茶叶原料A',
                        quantity: 550,
                        unit: 'kg',
                        children: []
                    },
                    {
                        id: 'P001',
                        material: '内包装',
                        quantity: 500,
                        unit: '套',
                        children: [
                            {
                                id: 'M002',
                                material: '包装盒',
                                quantity: 500,
                                unit: '个',
                                children: []
                            },
                            {
                                id: 'M003',
                                material: '内袋',
                                quantity: 500,
                                unit: '个',
                                children: []
                            },
                            {
                                id: 'M004',
                                material: '标签',
                                quantity: 500,
                                unit: '张',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 'BOM002',
                product: '大红袍',
                quantity: 300,
                children: [
                    {
                        id: 'M005',
                        material: '茶叶原料B',
                        quantity: 330,
                        unit: 'kg',
                        children: []
                    },
                    {
                        id: 'P002',
                        material: '内包装',
                        quantity: 300,
                        unit: '套',
                        children: [
                            {
                                id: 'M006',
                                material: '包装盒',
                                quantity: 300,
                                unit: '个',
                                children: []
                            },
                            {
                                id: 'M007',
                                material: '内袋',
                                quantity: 300,
                                unit: '个',
                                children: []
                            },
                            {
                                id: 'M008',
                                material: '标签',
                                quantity: 300,
                                unit: '张',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
}; 