// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCategories();
    initTable();
    initFormSubmit();
});

// 加载产品类别
function loadCategories() {
    // 模拟数据
    const categories = [
        { id: 'C001', name: '红茶' },
        { id: 'C002', name: '绿茶' },
        { id: 'C003', name: '乌龙茶' }
    ];

    const selects = document.querySelectorAll('select[name="categoryId"], #searchCategory');
    selects.forEach(select => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// 初始化表格
function initTable() {
    const table = new Table('collectTable', {
        columns: [
            { title: '采集日期', key: 'collectDate' },
            { title: '产品类别', key: 'categoryName' },
            { title: '生产批次', key: 'batchNo' },
            { title: '材料成本', key: 'materialCost' },
            { title: '人工成本', key: 'laborCost' },
            { title: '制造费用', key: 'manufacturingCost' },
            { title: '采集人员', key: 'collector' },
            { title: '状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewDetail('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === '草稿' ? `
                    <button class="button small" onclick="editRecord('${row.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="button small danger" onclick="deleteRecord('${row.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'R001',
            collectDate: '2024-03-15',
            categoryName: '红茶',
            batchNo: 'B20240315001',
            materialCost: 12500.00,
            laborCost: 3600.00,
            manufacturingCost: 2800.00,
            collector: '张三',
            status: '已提交'
        },
        {
            id: 'R002',
            collectDate: '2024-03-15',
            categoryName: '绿茶',
            batchNo: 'B20240315002',
            materialCost: 9800.00,
            laborCost: 2900.00,
            manufacturingCost: 2100.00,
            collector: '李四',
            status: '草稿'
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

// 初始化表单提交
function initFormSubmit() {
    const form = document.getElementById('collectForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        submitForm();
    };
}

// 添加材料成本项
function addMaterialItem() {
    const container = document.getElementById('materialCosts');
    const items = container.querySelectorAll('.cost-item');
    const index = items.length;
    
    const itemHtml = `
        <div class="cost-item">
            <div class="form-row">
                <div class="form-group">
                    <label>材料名称</label>
                    <input type="text" class="form-control" name="materials[${index}].name" required>
                </div>
                <div class="form-group">
                    <label>实际单价</label>
                    <input type="number" class="form-control" name="materials[${index}].price" required>
                </div>
                <div class="form-group">
                    <label>实际用量</label>
                    <input type="number" class="form-control" name="materials[${index}].quantity" required>
                </div>
                <div class="form-group">
                    <label>单位</label>
                    <input type="text" class="form-control" name="materials[${index}].unit" required>
                </div>
                <button type="button" class="button danger" onclick="removeCostItem(this)">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHtml);
}

// 添加人工成本项
function addLaborItem() {
    const container = document.getElementById('laborCosts');
    const items = container.querySelectorAll('.cost-item');
    const index = items.length;
    
    const itemHtml = `
        <div class="cost-item">
            <div class="form-row">
                <div class="form-group">
                    <label>工序名称</label>
                    <input type="text" class="form-control" name="labors[${index}].name" required>
                </div>
                <div class="form-group">
                    <label>实际工时</label>
                    <input type="number" class="form-control" name="labors[${index}].hours" required>
                </div>
                <div class="form-group">
                    <label>工时单价</label>
                    <input type="number" class="form-control" name="labors[${index}].price" required>
                </div>
                <button type="button" class="button danger" onclick="removeCostItem(this)">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHtml);
}

// 添加制造费用项
function addManufacturingItem() {
    const container = document.getElementById('manufacturingCosts');
    const items = container.querySelectorAll('.cost-item');
    const index = items.length;
    
    const itemHtml = `
        <div class="cost-item">
            <div class="form-row">
                <div class="form-group">
                    <label>费用项目</label>
                    <input type="text" class="form-control" name="manufacturing[${index}].name" required>
                </div>
                <div class="form-group">
                    <label>实际金额</label>
                    <input type="number" class="form-control" name="manufacturing[${index}].amount" required>
                </div>
                <div class="form-group">
                    <label>分配依据</label>
                    <input type="text" class="form-control" name="manufacturing[${index}].basis" required>
                </div>
                <button type="button" class="button danger" onclick="removeCostItem(this)">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHtml);
}

// 移除成本项
function removeCostItem(button) {
    const item = button.closest('.cost-item');
    item.remove();
}

// 保存草稿
function saveDraft() {
    const form = document.getElementById('collectForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存草稿
    console.log('保存草稿:', data);
    Message.show('草稿已保存', 'success');
}

// 提交表单
function submitForm() {
    const form = document.getElementById('collectForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API提交数据
    console.log('提交数据:', data);
    Message.show('数据已提交', 'success');
    form.reset();
}

// 搜索记录
function searchRecords() {
    const category = document.getElementById('searchCategory').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { category, startDate, endDate });
}

// 查看详情
function viewDetail(id) {
    // TODO: 显示采集记录详情
    console.log('查看详情:', id);
}

// 编辑记录
function editRecord(id) {
    // TODO: 加载记录数据到表单
    console.log('编辑记录:', id);
}

// 删除记录
function deleteRecord(id) {
    if (confirm('确定要删除该记录吗？')) {
        // TODO: 调用API删除记录
        console.log('删除记录:', id);
        Message.show('记录已删除', 'success');
    }
} 