// 引入组件
import { Message } from '../../../../../components/message.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadCategories();
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

    const select = document.querySelector('select[name="categoryId"]');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

// 初始化表单提交
function initFormSubmit() {
    const form = document.getElementById('formulateForm');
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
                    <label>单价</label>
                    <input type="number" class="form-control" name="materials[${index}].price" required>
                </div>
                <div class="form-group">
                    <label>用量</label>
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
                    <label>工时单价</label>
                    <input type="number" class="form-control" name="labors[${index}].price" required>
                </div>
                <div class="form-group">
                    <label>标准工时</label>
                    <input type="number" class="form-control" name="labors[${index}].hours" required>
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
                    <label>分配标准</label>
                    <input type="text" class="form-control" name="manufacturing[${index}].standard" required>
                </div>
                <div class="form-group">
                    <label>分配金额</label>
                    <input type="number" class="form-control" name="manufacturing[${index}].amount" required>
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
    const form = document.getElementById('formulateForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存草稿
    console.log('保存草稿:', data);
    Message.show('草稿已保存', 'success');
}

// 提交表单
function submitForm() {
    const form = document.getElementById('formulateForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API提交审核
    console.log('提交审核:', data);
    Message.show('已提交审核', 'success');
} 