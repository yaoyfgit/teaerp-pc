// 合同状态枚举
const ContractStatus = {
    DRAFT: 'draft',      // 草稿
    ACTIVE: 'active',    // 生效中
    EXPIRED: 'expired',  // 已到期
    TERMINATED: 'terminated' // 已终止
};

// 合同类型枚举
const ContractType = {
    SALES: '1',      // 销售合同
    FRAMEWORK: '2',  // 框架协议
    SUPPLEMENT: '3'  // 补充协议
};

// 表单验证规则
const validationRules = {
    name: {
        required: true,
        message: '请输入合同名称'
    },
    customer: {
        required: true,
        message: '请选择客户'
    },
    amount: {
        required: true,
        min: 0,
        message: '请输入正确的合同金额'
    },
    signDate: {
        required: true,
        message: '请选择签订日期'
    },
    effectiveDate: {
        required: true,
        message: '请选择生效日期'
    },
    expiryDate: {
        required: true,
        message: '请选择到期日期'
    }
};

// 验证合同表单
function validateContractForm(formData) {
    const errors = [];
    
    // 基本字段验证
    for (const [field, rule] of Object.entries(validationRules)) {
        const value = formData.get(field);
        
        if (rule.required && !value) {
            errors.push(rule.message);
            continue;
        }
        
        if (rule.min !== undefined && value && Number(value) < rule.min) {
            errors.push(rule.message);
        }
    }
    
    // 日期逻辑验证
    const signDate = new Date(formData.get('signDate'));
    const effectiveDate = new Date(formData.get('effectiveDate'));
    const expiryDate = new Date(formData.get('expiryDate'));
    
    if (effectiveDate < signDate) {
        errors.push('生效日期不能早于签订日期');
    }
    
    if (expiryDate <= effectiveDate) {
        errors.push('到期日期必须晚于生效日期');
    }
    
    return errors;
}

// 显示新建合同弹窗
function showCreateModal() {
    const modal = document.getElementById('createContractModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // 加载客户列表
    loadCustomerList();
}

// 加载客户列表
function loadCustomerList() {
    // 这里应该调用后端API获取客户列表
    fetch('/api/customers')
        .then(response => response.json())
        .then(data => {
            const select = document.querySelector('[name="customerId"]');
            data.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;
                option.textContent = customer.name;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('加载客户列表失败:', error);
        });
}

// 提交新建合同
function submitCreateContract() {
    // 获取表单数据
    const formData = {
        contractName: document.querySelector('[name="contractName"]').value,
        contractType: document.querySelector('[name="contractType"]').value,
        customerId: document.querySelector('[name="customerId"]').value,
        amount: document.querySelector('[name="amount"]').value,
        signDate: document.querySelector('[name="signDate"]').value,
        startDate: document.querySelector('[name="startDate"]').value,
        endDate: document.querySelector('[name="endDate"]').value,
        remarks: document.querySelector('[name="remarks"]').value
    };

    // 表单验证
    if (!formData.contractName) {
        alert('请输入合同名称');
        return;
    }
    if (!formData.customerId) {
        alert('请选择客户');
        return;
    }

    // 发送请求到后端
    fetch('/api/contract/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('合同创建成功');
            hideModal('createContractModal');
            // 刷新合同列表
            location.reload();
        } else {
            alert('创建失败：' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('系统错误，请稍后重试');
    });
}

// 处理文件上传
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/api/contract/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('文件上传成功');
            } else {
                alert('上传失败：' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('系统错误，请稍后重试');
        });
    }
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 绑定文件上传事件
    const fileInput = document.querySelector('[name="contractFile"]');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}); 