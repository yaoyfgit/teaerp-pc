// 字典管理模块
document.addEventListener('DOMContentLoaded', function() {
    initDictManage();
});

function initDictManage() {
    loadDictList();
    bindEvents();
}

function loadDictList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                name: '性别',
                code: 'sex',
                type: 'string',
                orderNum: 1,
                status: 1,
                createTime: '2024-03-15 10:00:00'
            },
            {
                id: 2,
                name: '状态',
                code: 'status',
                type: 'number',
                orderNum: 2,
                status: 1,
                createTime: '2024-03-15 10:00:00'
            }
        ]
    };

    renderDictList(mockData);
    renderPagination(mockData.total);
}

function renderDictList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(dict => `
        <tr>
            <td>${dict.name}</td>
            <td>${dict.code}</td>
            <td>
                <span class="dict-type ${dict.type}">
                    ${getDictTypeName(dict.type)}
                </span>
            </td>
            <td>${dict.orderNum}</td>
            <td>
                <span class="status ${dict.status ? 'active' : 'inactive'}">
                    ${dict.status ? '启用' : '禁用'}
                </span>
            </td>
            <td>${dict.createTime}</td>
            <td>
                <a href="javascript:void(0)" onclick="editDict(${dict.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="viewDictItems(${dict.id})" class="action-link">字典项</a>
                <a href="javascript:void(0)" onclick="toggleDictStatus(${dict.id}, ${!dict.status})" class="action-link">
                    ${dict.status ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" onclick="deleteDict(${dict.id})" class="action-link">删除</a>
            </td>
        </tr>
    `).join('');
}

function getDictTypeName(type) {
    const types = {
        string: '字符串',
        number: '数字',
        boolean: '布尔值'
    };
    return types[type] || type;
}

function addDictItem() {
    const list = document.querySelector('.dict-item-list');
    const itemId = Date.now();
    const html = `
        <div class="dict-item" data-id="${itemId}">
            <input type="text" class="form-control" name="label" placeholder="标签">
            <input type="text" class="form-control" name="value" placeholder="值">
            <input type="number" class="form-control" name="orderNum" value="0">
            <select class="form-control" name="status">
                <option value="1">启用</option>
                <option value="0">禁用</option>
            </select>
            <div class="dict-item-action">
                <a href="javascript:void(0)" onclick="removeDictItem(${itemId})" class="action-link">删除</a>
            </div>
        </div>
    `;
    list.insertAdjacentHTML('beforeend', html);
}

function removeDictItem(itemId) {
    const item = document.querySelector(`.dict-item[data-id="${itemId}"]`);
    item.remove();
}

function submitCreateDict() {
    const formData = {
        name: document.querySelector('[name="dictName"]').value,
        code: document.querySelector('[name="dictCode"]').value,
        type: document.querySelector('[name="dictType"]').value,
        orderNum: document.querySelector('[name="orderNum"]').value,
        remarks: document.querySelector('[name="remarks"]').value,
        items: []
    };

    // 收集字典项数据
    document.querySelectorAll('.dict-item').forEach(item => {
        formData.items.push({
            label: item.querySelector('[name="label"]').value,
            value: item.querySelector('[name="value"]').value,
            orderNum: item.querySelector('[name="orderNum"]').value,
            status: item.querySelector('[name="status"]').value
        });
    });

    // 表单验证
    if (!formData.name || !formData.code) {
        alert('请填写必填项');
        return;
    }

    if (formData.items.length === 0) {
        alert('请添加至少一个字典项');
        return;
    }

    // 发送请求到后端
    console.log('创建字典:', formData);
    alert('字典创建成功');
    hideModal('createDictModal');
    loadDictList();
}

// ... 其他函数 