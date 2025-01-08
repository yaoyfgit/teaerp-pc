// 引入组件
import { Table } from '../../../../components/table.js';
import { Pagination } from '../../../../components/pagination.js';
import { Message } from '../../../../components/message.js';
import { Modal } from '../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    initFormEvents();
});

// 初始化表格
function initTable() {
    const table = new Table('budgetTable', {
        columns: [
            { title: '预算编号', key: 'code' },
            { title: '预算类型', key: 'type' },
            { title: '预算对象', key: 'targetName' },
            { title: '预算期间', key: 'period' },
            { title: '预算金额', key: 'amount' },
            { title: '已使用', key: 'used' },
            { title: '剩余金额', key: 'remaining' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewBudget('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === 'draft' ? `
                    <button class="button small" onclick="editBudget('${row.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="button small" onclick="deleteBudget('${row.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'B001',
            code: 'BUD202403001',
            type: '部门预算',
            targetName: '生产部',
            period: '2024-03',
            amount: 150000.00,
            used: 45800.00,
            remaining: 104200.00,
            status: 'approved'
        },
        {
            id: 'B002',
            code: 'BUD202403002',
            type: '项目预算',
            targetName: '新品研发项目',
            period: '2024-03',
            amount: 280000.00,
            used: 128900.00,
            remaining: 151100.00,
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

// 初始化表单事件
function initFormEvents() {
    // 监听预算类型变化
    const typeSelect = document.querySelector('select[name="type"]');
    typeSelect.onchange = function() {
        loadTargets(this.value);
    };
}

// 加载预算对象
function loadTargets(type) {
    const targetSelect = document.querySelector('select[name="targetId"]');
    targetSelect.innerHTML = '<option value="">请选择</option>';

    // 模拟数据
    let targets = [];
    switch(type) {
        case 'department':
            targets = [
                { id: 'D001', name: '生产部' },
                { id: 'D002', name: '销售部' },
                { id: 'D003', name: '研发部' }
            ];
            break;
        case 'project':
            targets = [
                { id: 'P001', name: '新品研发项目' },
                { id: 'P002', name: '产能扩建项目' }
            ];
            break;
        case 'product':
            targets = [
                { id: 'PR001', name: '红茶' },
                { id: 'PR002', name: '绿茶' },
                { id: 'PR003', name: '乌龙茶' }
            ];
            break;
    }

    targets.forEach(target => {
        const option = document.createElement('option');
        option.value = target.id;
        option.textContent = target.name;
        targetSelect.appendChild(option);
    });
}

// 添加预算明细项
function addItem() {
    const itemsContainer = document.getElementById('budgetItems');
    const newItem = document.createElement('div');
    newItem.className = 'budget-item';
    newItem.innerHTML = `
        <select class="form-control" name="itemType[]">
            <option value="material">材料费用</option>
            <option value="labor">人工费用</option>
            <option value="manufacturing">制造费用</option>
            <option value="other">其他费用</option>
        </select>
        <input type="number" class="form-control" name="itemAmount[]" placeholder="金额">
        <input type="text" class="form-control" name="itemRemark[]" placeholder="备注">
        <button type="button" class="button small" onclick="removeItem(this)">
            <i class="fas fa-minus"></i>
        </button>
    `;
    itemsContainer.appendChild(newItem);
}

// 移除预算明细项
function removeItem(btn) {
    const item = btn.parentElement;
    item.remove();
}

// 保存预算
function saveBudget() {
    const form = document.getElementById('budgetForm');
    const formData = new FormData(form);
    const data = {
        ...Object.fromEntries(formData.entries()),
        items: []
    };

    // 处理明细项
    const types = formData.getAll('itemType[]');
    const amounts = formData.getAll('itemAmount[]');
    const remarks = formData.getAll('itemRemark[]');
    types.forEach((type, index) => {
        data.items.push({
            type,
            amount: amounts[index],
            remark: remarks[index]
        });
    });

    // TODO: 调用API保存预算
    console.log('保存预算:', data);
    
    hideModal('budgetModal');
    Message.show('预算已保存', 'success');
}

// 提交审批
function submitBudget() {
    // TODO: 调用API提交审批
    console.log('提交审批');
    
    hideModal('budgetModal');
    Message.show('预算已提交审批', 'success');
}

// 查看预算
function viewBudget(id) {
    // TODO: 显示预算详情
    console.log('查看预算:', id);
}

// 编辑预算
function editBudget(id) {
    // TODO: 加载预算数据到表单
    console.log('编辑预算:', id);
    showModal('budgetModal');
}

// 删除预算
function deleteBudget(id) {
    if (confirm('确定要删除该预算吗？')) {
        // TODO: 调用API删除预算
        console.log('删除预算:', id);
        Message.show('预算已删除', 'success');
    }
}

// 搜索预算
function searchBudgets() {
    const type = document.getElementById('searchType').value;
    const status = document.getElementById('searchStatus').value;
    const period = document.getElementById('searchPeriod').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { type, status, period });
} 