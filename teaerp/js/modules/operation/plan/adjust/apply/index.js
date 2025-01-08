// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    loadTargets();
});

// 初始化表格
function initTable() {
    const table = new Table('adjustTable', {
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
                <button class="button small" onclick="viewAdjustment('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === 'draft' ? `
                    <button class="button small" onclick="editAdjustment('${row.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="button small" onclick="deleteAdjustment('${row.id}')">
                        <i class="fas fa-trash"></i>
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
            status: 'draft'
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

// 加载目标数据
function loadTargets() {
    // 模拟数据
    const targets = [
        { id: 'T001', name: '年度销售总额目标', value: '1000万' },
        { id: 'T002', name: '客户满意度目标', value: '95%' }
    ];

    const select = document.querySelector('select[name="targetId"]');
    targets.forEach(target => {
        const option = document.createElement('option');
        option.value = target.id;
        option.textContent = target.name;
        option.dataset.value = target.value;
        select.appendChild(option);
    });

    // 监听目标选择变化
    select.onchange = function() {
        const selectedOption = this.options[this.selectedIndex];
        document.querySelector('[name="beforeValue"]').value = selectedOption.dataset.value || '';
    };
}

// 查看调整申请
function viewAdjustment(id) {
    // TODO: 显示调整申请详情
    console.log('查看调整申请:', id);
}

// 编辑调整申请
function editAdjustment(id) {
    // TODO: 加载调整申请数据到表单
    console.log('编辑调整申请:', id);
    showModal('adjustModal');
}

// 删除调整申请
function deleteAdjustment(id) {
    if (confirm('确定要删除该调整申请吗？')) {
        // TODO: 调用API删除调整申请
        console.log('删除调整申请:', id);
        Message.show('调整申请已删除', 'success');
    }
}

// 保存调整申请
function saveAdjustment(action) {
    const form = document.getElementById('adjustForm');
    const formData = new FormData(form);
    const data = {
        ...Object.fromEntries(formData.entries()),
        action
    };
    
    // TODO: 调用API保存调整申请
    console.log('保存调整申请:', data);
    
    hideModal('adjustModal');
    Message.show(action === 'draft' ? '已保存草稿' : '已提交审批', 'success');
}

// 搜索调整申请
function searchAdjustments() {
    const type = document.getElementById('searchType').value;
    const status = document.getElementById('searchStatus').value;
    const startDate = document.getElementById('searchStartDate').value;
    const endDate = document.getElementById('searchEndDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { type, status, startDate, endDate });
} 