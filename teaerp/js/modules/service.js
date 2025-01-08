// 工单状态枚举
const TicketStatus = {
    PENDING: 'pending',     // 待处理
    PROCESSING: 'processing', // 处理中
    COMPLETED: 'completed',   // 已完成
    CLOSED: 'closed'         // 已关闭
};

// 服务类型枚举
const ServiceType = {
    CONSULT: 'consult',    // 咨询
    COMPLAINT: 'complaint', // 投诉
    REPAIR: 'repair',      // 维修
    RETURN: 'return'       // 退换货
};

// 优先级枚举
const Priority = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

// 显示新建工单弹窗
function showCreateModal() {
    const modal = document.getElementById('createServiceModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // 加载客户列表和受理人列表
    loadCustomerList();
    loadHandlerList();
}

// 加载客户列表
function loadCustomerList() {
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

// 加载受理人列表
function loadHandlerList() {
    fetch('/api/users/service-handlers')
        .then(response => response.json())
        .then(data => {
            const select = document.querySelector('[name="handler"]');
            data.forEach(handler => {
                const option = document.createElement('option');
                option.value = handler.id;
                option.textContent = handler.name;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('加载受理人列表失败:', error);
        });
}

// 提交新建工单
function submitCreateService() {
    // 获取表单数据
    const formData = {
        customerId: document.querySelector('[name="customerId"]').value,
        serviceType: document.querySelector('[name="serviceType"]').value,
        priority: document.querySelector('[name="priority"]').value,
        handler: document.querySelector('[name="handler"]').value,
        description: document.querySelector('[name="description"]').value
    };

    // 表单验证
    if (!formData.customerId) {
        alert('请选择客户');
        return;
    }
    if (!formData.description) {
        alert('请输入问题描述');
        return;
    }

    // 发送请求到后端
    fetch('/api/service/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('工单创建成功');
            hideModal('createServiceModal');
            // 刷新工单列表
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

// 处理附件上传
function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        
        fetch('/api/service/upload-attachments', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('附件上传成功');
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
    // 绑定附件上传事件
    const fileInput = document.querySelector('[name="attachments"]');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}); 