// 参数设置模块
document.addEventListener('DOMContentLoaded', function() {
    initParamManage();
});

function initParamManage() {
    loadParamList();
    bindEvents();
}

function loadParamList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                name: '系统名称',
                key: 'sys.name',
                value: 'TeaERP',
                type: 'system',
                builtIn: true,
                createTime: '2024-03-15 10:00:00'
            },
            {
                id: 2,
                name: '库存预警阈值',
                key: 'stock.warning.threshold',
                value: '100',
                type: 'business',
                builtIn: false,
                createTime: '2024-03-15 10:00:00'
            }
        ]
    };

    renderParamList(mockData);
    renderPagination(mockData.total);
}

function renderParamList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(param => `
        <tr>
            <td>${param.name}</td>
            <td>${param.key}</td>
            <td>${param.value}</td>
            <td>
                <span class="param-type ${param.type}">
                    ${getParamTypeName(param.type)}
                </span>
            </td>
            <td>
                <span class="built-in">
                    ${param.builtIn ? '是' : '否'}
                </span>
            </td>
            <td>${param.createTime}</td>
            <td>
                ${param.builtIn ? `
                    <a href="javascript:void(0)" onclick="viewParam(${param.id})" class="action-link">查看</a>
                ` : `
                    <a href="javascript:void(0)" onclick="editParam(${param.id})" class="action-link">编辑</a>
                    <a href="javascript:void(0)" onclick="deleteParam(${param.id})" class="action-link">删除</a>
                `}
            </td>
        </tr>
    `).join('');
}

function getParamTypeName(type) {
    const types = {
        system: '系统参数',
        business: '业务参数'
    };
    return types[type] || type;
}

function handleValueTypeChange(select) {
    const type = select.value;
    const valueInput = document.querySelector('.value-input');
    let html = '';

    switch (type) {
        case 'text':
            html = '<input type="text" class="form-control" name="paramValue">';
            break;
        case 'number':
            html = '<input type="number" class="form-control" name="paramValue">';
            break;
        case 'boolean':
            html = `
                <select class="form-control" name="paramValue">
                    <option value="true">是</option>
                    <option value="false">否</option>
                </select>
            `;
            break;
        case 'json':
            html = '<textarea class="form-control json" name="paramValue" rows="5"></textarea>';
            break;
    }

    valueInput.innerHTML = html;
}

function validateJson(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
}

function submitCreateParam() {
    const formData = {
        name: document.querySelector('[name="paramName"]').value,
        key: document.querySelector('[name="paramKey"]').value,
        type: document.querySelector('[name="paramType"]').value,
        valueType: document.querySelector('[name="valueType"]').value,
        value: document.querySelector('[name="paramValue"]').value,
        required: document.querySelector('[name="required"]').checked,
        pattern: document.querySelector('[name="pattern"]').value,
        message: document.querySelector('[name="message"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.name || !formData.key) {
        alert('请填写必填项');
        return;
    }

    // JSON格式验证
    if (formData.valueType === 'json' && !validateJson(formData.value)) {
        alert('请输入有效的JSON格式');
        return;
    }

    // 发送请求到后端
    console.log('创建参数:', formData);
    alert('参数创建成功');
    hideModal('createParamModal');
    loadParamList();
}

// ... 其他函数 