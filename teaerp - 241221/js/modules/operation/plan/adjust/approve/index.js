// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
});

// 初始化表格
function initTable() {
    const table = new Table('approvalTable', {
        columns: [
            { title: '申请编号', key: 'code' },
            { title: '目标类型', key: 'targetType' },
            { title: '目标名称', key: 'targetName' },
            { title: '调整类型', key: 'adjustType' },
            { title: '调整前', key: 'beforeValue' },
            { title: '调整后', key: 'afterValue' },
            { title: '申请人', key: 'applicant' },
            { title: '申请时间', key: 'applyTime' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewApproval('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === 'pending' ? `
                    <button class="button small success" onclick="showApprovalModal('${row.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'A001',
            code: 'ADJ202401001',
            targetType: '公司目标',
            targetName: '年度销售总额目标',
            adjustType: '目标值调整',
            beforeValue: '1000万',
            afterValue: '800万',
            applicant: '张三',
            applyTime: '2024-01-15',
            status: 'pending'
        },
        {
            id: 'A002',
            code: 'ADJ202401002',
            targetType: '部门目标',
            targetName: '客户满意度目标',
            adjustType: '时间调整',
            beforeValue: '2024-12-31',
            afterValue: '2025-03-31',
            applicant: '李四',
            applyTime: '2024-01-16',
            status: 'approved'
        }
    ];
    table.setData(mockData);

    // 初始化分页
    const pagination = new Pagination('pagination', {
        pageSize: 10,
        total: 100,
        onChange: (page) => {
            // TODO: 加载对应页的数据
            console.log('切换到第', page, '页');
        }
    });
}

// 查看审批详情
function viewApproval(id) {
    // TODO: 显示审批详情
    console.log('查看审批:', id);
}

// 显示审批弹窗
function showApprovalModal(id) {
    // 模拟数据
    const approval = {
        id: 'A001',
        code: 'ADJ202401001',
        applicant: '张三',
        applyTime: '2024-01-15 10:00:00',
        targetType: '公司目标',
        targetName: '年度销售总额目标',
        adjustType: '目标值调整',
        beforeValue: '1000万',
        afterValue: '800万',
        reason: '由于市场环境变化，需要调整销售目标',
        files: [
            { name: '市场分析报告.pdf', url: '#' },
            { name: '调整方案.docx', url: '#' }
        ]
    };

    // 填充数据
    document.getElementById('approvalCode').textContent = approval.code;
    document.getElementById('approvalApplicant').textContent = approval.applicant;
    document.getElementById('approvalTime').textContent = approval.applyTime;
    document.getElementById('approvalTargetType').textContent = approval.targetType;
    document.getElementById('approvalTargetName').textContent = approval.targetName;
    document.getElementById('approvalAdjustType').textContent = approval.adjustType;
    document.getElementById('approvalBeforeValue').textContent = approval.beforeValue;
    document.getElementById('approvalAfterValue').textContent = approval.afterValue;
    document.getElementById('approvalReason').textContent = approval.reason;
    document.getElementById('approvalFiles').innerHTML = approval.files.map(file => `
        <a href="${file.url}" target="_blank">${file.name}</a>
    `).join('<br>');

    showModal('approvalModal');
}

// 处理审批
function handleApproval(action) {
    const form = document.getElementById('approvalForm');
    const formData = new FormData(form);
    const data = {
        ...Object.fromEntries(formData.entries()),
        action
    };
    
    // TODO: 调用API处理审批
    console.log('处理审批:', data);
    
    hideModal('approvalModal');
    Message.show(action === 'approve' ? '审批已通过' : '审批已驳回', 'success');
}

// 搜索审批
function searchApprovals() {
    const type = document.getElementById('searchType').value;
    const applicant = document.getElementById('searchApplicant').value;
    const status = document.getElementById('searchStatus').value;
    const startDate = document.getElementById('searchStartDate').value;
    const endDate = document.getElementById('searchEndDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { type, applicant, status, startDate, endDate });
} 