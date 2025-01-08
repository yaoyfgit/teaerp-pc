// 引入组件
import { Table } from '../../../../../components/table.js';
import { Pagination } from '../../../../../components/pagination.js';
import { Message } from '../../../../../components/message.js';
import { Modal } from '../../../../../components/modal.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initTable();
    loadCustomers();
    loadSalespeople();
    loadTargets();
    loadProducts();
});

// 初始化表格
function initTable() {
    const table = new Table('orderTable', {
        columns: [
            { title: '订单编号', key: 'code' },
            { title: '客户名称', key: 'customerName' },
            { title: '销售员', key: 'salespersonName' },
            { title: '订单日期', key: 'orderDate' },
            { title: '预计交付日期', key: 'deliveryDate' },
            { title: '订单金额', key: 'totalAmount' },
            { title: '订单状态', key: 'status' },
            { title: '操作', key: 'actions', render: (_, row) => `
                <button class="button small" onclick="viewOrder('${row.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${row.status === 'pending' ? `
                    <button class="button small" onclick="editOrder('${row.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="button small" onclick="deleteOrder('${row.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
                <button class="button small" onclick="showTracking('${row.id}')">
                    <i class="fas fa-clipboard-list"></i>
                </button>
            ` }
        ]
    });

    // 模拟数据
    const mockData = [
        {
            id: 'O001',
            code: 'SO202401001',
            customerName: '茶叶公司A',
            salespersonName: '张三',
            orderDate: '2024-01-01',
            deliveryDate: '2024-01-15',
            totalAmount: 50000.00,
            status: 'processing'
        },
        {
            id: 'O002',
            code: 'SO202401002',
            customerName: '茶叶公司B',
            salespersonName: '李四',
            orderDate: '2024-01-02',
            deliveryDate: '2024-01-20',
            totalAmount: 35000.00,
            status: 'pending'
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

// 加载客户数据
function loadCustomers() {
    // 模拟数据
    const customers = [
        { id: 'C001', name: '茶叶公司A' },
        { id: 'C002', name: '茶叶公司B' },
        { id: 'C003', name: '茶叶公司C' }
    ];

    const select = document.querySelector('select[name="customerId"]');
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name;
        select.appendChild(option);
    });
}

// 加载销售员数据
function loadSalespeople() {
    // 模拟数据
    const salespeople = [
        { id: 'S001', name: '张三' },
        { id: 'S002', name: '李四' },
        { id: 'S003', name: '王五' }
    ];

    const selects = document.querySelectorAll('select[name="salespersonId"], #searchSalesperson');
    selects.forEach(select => {
        salespeople.forEach(person => {
            const option = document.createElement('option');
            option.value = person.id;
            option.textContent = person.name;
            select.appendChild(option);
        });
    });
}

// 加载目标数据
function loadTargets() {
    // 模拟数据
    const targets = [
        { id: 'T001', name: '月度销售目标-1月' },
        { id: 'T002', name: '季度销售目标-Q1' }
    ];

    const select = document.querySelector('select[name="targetId"]');
    targets.forEach(target => {
        const option = document.createElement('option');
        option.value = target.id;
        option.textContent = target.name;
        select.appendChild(option);
    });
}

// 加载产品数据
function loadProducts() {
    // 模拟数据
    window.products = [
        { id: 'P001', name: '红茶A', spec: '500g/盒', price: 100.00 },
        { id: 'P002', name: '绿茶B', spec: '250g/盒', price: 80.00 },
        { id: 'P003', name: '乌龙茶C', spec: '100g/盒', price: 120.00 }
    ];
}

// 添加产品行
function addProductRow() {
    const tbody = document.querySelector('#productTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <select class="form-control" name="productId[]" onchange="updateProductRow(this)">
                <option value="">请选择</option>
                ${window.products.map(p => `
                    <option value="${p.id}">${p.name}</option>
                `).join('')}
            </select>
        </td>
        <td class="product-spec"></td>
        <td class="product-price"></td>
        <td>
            <input type="number" class="form-control" name="quantity[]" value="1" min="1" onchange="updateProductRow(this)">
        </td>
        <td class="product-amount"></td>
        <td>
            <button type="button" class="button small danger" onclick="removeProductRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(tr);
}

// 更新产品行
function updateProductRow(element) {
    const tr = element.closest('tr');
    const productId = tr.querySelector('[name="productId[]"]').value;
    const quantity = parseInt(tr.querySelector('[name="quantity[]"]').value) || 0;
    const product = window.products.find(p => p.id === productId);

    if (product) {
        tr.querySelector('.product-spec').textContent = product.spec;
        tr.querySelector('.product-price').textContent = product.price.toFixed(2);
        tr.querySelector('.product-amount').textContent = (product.price * quantity).toFixed(2);
    } else {
        tr.querySelector('.product-spec').textContent = '';
        tr.querySelector('.product-price').textContent = '';
        tr.querySelector('.product-amount').textContent = '';
    }

    updateOrderTotal();
}

// 移除产品行
function removeProductRow(button) {
    button.closest('tr').remove();
    updateOrderTotal();
}

// 更新订单总额
function updateOrderTotal() {
    const amounts = Array.from(document.querySelectorAll('.product-amount'))
        .map(td => parseFloat(td.textContent) || 0);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    document.querySelector('[name="totalAmount"]').value = total.toFixed(2);
}

// 保存订单
function saveOrder() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const data = {
        ...Object.fromEntries(formData.entries()),
        products: Array.from(document.querySelectorAll('#productTable tbody tr')).map(tr => ({
            productId: tr.querySelector('[name="productId[]"]').value,
            quantity: parseInt(tr.querySelector('[name="quantity[]"]').value)
        }))
    };
    
    // TODO: 调用API保存订单
    console.log('保存订单:', data);
    
    hideModal('orderModal');
    Message.show('订单已保存', 'success');
}

// 查看订单
function viewOrder(id) {
    // TODO: 显示订单详情
    console.log('查看订单:', id);
}

// ��辑订单
function editOrder(id) {
    // TODO: 加载订单数据到表单
    console.log('编辑订单:', id);
    showModal('orderModal');
}

// 删除订单
function deleteOrder(id) {
    if (confirm('确定要删除该订单吗？')) {
        // TODO: 调用API删除订单
        console.log('删除订单:', id);
        Message.show('订单已删除', 'success');
    }
}

// 显示跟踪记录
function showTracking(id) {
    // 模拟数据
    const trackingRecords = [
        {
            id: 'TR001',
            content: '订单已确认，开始处理',
            type: 'progress',
            createTime: '2024-01-01 10:00:00',
            creator: '张三'
        },
        {
            id: 'TR002',
            content: '客户要求更改交付日期',
            type: 'adjustment',
            createTime: '2024-01-02 14:30:00',
            creator: '李四'
        }
    ];

    const trackingList = document.getElementById('trackingList');
    trackingList.innerHTML = trackingRecords.map(record => `
        <div class="tracking-item">
            <div class="tracking-header">
                <span class="tracking-type">${record.type}</span>
                <span class="tracking-time">${record.createTime}</span>
                <span class="tracking-creator">${record.creator}</span>
            </div>
            <div class="tracking-content">${record.content}</div>
        </div>
    `).join('');

    showModal('trackingModal');
}

// 添加跟踪记录
function addTracking() {
    const form = document.getElementById('trackingForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // TODO: 调用API保存跟踪记录
    console.log('添加跟踪记录:', data);
    
    form.reset();
    Message.show('跟踪记录已添加', 'success');
}

// 搜索订单
function searchOrders() {
    const code = document.getElementById('searchCode').value;
    const customer = document.getElementById('searchCustomer').value;
    const salesperson = document.getElementById('searchSalesperson').value;
    const status = document.getElementById('searchStatus').value;
    const startDate = document.getElementById('searchStartDate').value;
    const endDate = document.getElementById('searchEndDate').value;
    
    // TODO: 根据条件重新加载数据
    console.log('搜索条件:', { code, customer, salesperson, status, startDate, endDate });
} 