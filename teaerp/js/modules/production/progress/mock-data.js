// 示例数据
const mockData = {
    // 监控页面数据
    monitor: {
        overview: {
            totalPlans: 12,
            inProgress: 5,
            delayed: 2,
            completed: 5
        },
        warningList: [
            {
                planId: 'P202312001',
                planName: '2023年第四季度红茶生产计划',
                planType: '季度计划',
                originalEndDate: '2023-12-31',
                expectedEndDate: '2024-01-15',
                delayDays: 15,
                status: '延期中',
            },
            {
                planId: 'P202312002',
                planName: '特级碧螺春12月生产计划',
                planType: '月度计划',
                originalEndDate: '2023-12-25',
                expectedEndDate: '2023-12-30',
                delayDays: 5,
                status: '延期中',
            }
        ],
        progressData: {
            dates: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07'],
            planned: [30, 60, 90, 120, 150, 180, 210],
            actual: [28, 55, 85, 110, 140, 165, 190]
        }
    },

    // 计划页面数据
    plans: [
        {
            planId: 'P202312001',
            planName: '2023年第四季度红茶生产计划',
            planType: '季度计划',
            startDate: '2023-10-01',
            endDate: '2023-12-31',
            progress: 85,
            status: '进行中'
        },
        {
            planId: 'P202312002',
            planName: '特级碧螺春12月生产计划',
            planType: '月度计划',
            startDate: '2023-12-01',
            endDate: '2023-12-25',
            progress: 60,
            status: '延期中'
        },
        {
            planId: 'P202312003',
            planName: '铁观音第51周生产计划',
            planType: '周计划',
            startDate: '2023-12-18',
            endDate: '2023-12-24',
            progress: 100,
            status: '已完成'
        },
        {
            planId: 'P202312004',
            planName: '大红袍12月生产计划',
            planType: '月度计划',
            startDate: '2023-12-01',
            endDate: '2023-12-31',
            progress: 75,
            status: '进行中'
        },
        {
            planId: 'P202312005',
            planName: '普洱茶第52周生产计划',
            planType: '周计划',
            startDate: '2023-12-25',
            endDate: '2023-12-31',
            progress: 0,
            status: '未开始'
        }
    ],

    // 报告页面数据
    reports: [
        {
            reportId: 'R202312001',
            reportType: '日报',
            reportDate: '2023-12-20',
            completion: '完成铁观音生产500kg，包装300kg',
            issueCount: 1,
            creator: '张三',
            createTime: '2023-12-20 17:30:00'
        },
        {
            reportId: 'R202312002',
            reportType: '周报',
            reportDate: '2023-12-17',
            completion: '本周完成红茶生产2000kg，包装1800kg',
            issueCount: 0,
            creator: '李四',
            createTime: '2023-12-17 18:00:00'
        },
        {
            reportId: 'R202312003',
            reportType: '月报',
            reportDate: '2023-11-30',
            completion: '11月份共完成各类茶叶生产8000kg，包装7500kg',
            issueCount: 2,
            creator: '王五',
            createTime: '2023-11-30 23:30:00'
        },
        {
            reportId: 'R202312004',
            reportType: '日报',
            reportDate: '2023-12-21',
            completion: '完成大红袍生产300kg，包装200kg',
            issueCount: 0,
            creator: '张三',
            createTime: '2023-12-21 17:00:00'
        },
        {
            reportId: 'R202312005',
            reportType: '周报',
            reportDate: '2023-12-24',
            completion: '本周完成碧螺春生产1500kg，包装1200kg',
            issueCount: 1,
            creator: '李四',
            createTime: '2023-12-24 18:30:00'
        }
    ]
}; 