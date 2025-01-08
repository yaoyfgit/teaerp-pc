// 显示新建客户弹窗
function showCreateModal() {
    const modal = document.getElementById('createCustomerModal');
    modal.style.display = 'flex';  // 改为 flex 布局
    document.body.style.overflow = 'hidden';  // 防止背景滚动
}

// 隐藏模态框
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = '';  // 恢复背景滚动
}

// 提交新建客户
function submitCreateCustomer() {
    // 获取表单数据
    const formData = {
        customerName: document.querySelector('[name="customerName"]').value,
        customerType: document.querySelector('[name="customerType"]').value,
        contactPerson: document.querySelector('[name="contactPerson"]').value,
        phone: document.querySelector('[name="phone"]').value,
        customerLevel: document.querySelector('[name="customerLevel"]').value,
        industry: document.querySelector('[name="industry"]').value
    };

    // 表单验证
    if (!formData.customerName) {
        alert('请输入客户名称');
        return;
    }

    // 发送请求到后端
    fetch('/api/customer/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('客户创建成功');
            hideModal('createCustomerModal');
            // 刷新客户列表
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

// 显示新建合同弹窗
function showContractModal() {
    console.log('显示新建合同弹窗');  // 添加调试日志
    const modal = document.getElementById('contractModal');
    if (!modal) {
        console.error('找不到contractModal元素');
        return;
    }
    modal.classList.add('show');
}

// 显示新建服务记录弹窗
function showServiceModal() {
    console.log('显示新建服务记录弹窗');  // 添加调试日志
    const modal = document.getElementById('serviceModal');
    if (!modal) {
        console.error('找不到serviceModal元素');
        return;
    }
    modal.classList.add('show');
}

// 保存客户信息
function saveCustomer() {
    const form = document.querySelector('#createModal form');
    if (!form) return;

    try {
        // TODO: 这里应该调用后端接口保存客户信息
        showToast('保存成功');
        hideModal('createModal');
        // 刷新列表
        location.reload();
    } catch (error) {
        console.error('保存客户信息失败:', error);
        showToast('保存失败，请重试', 'error');
    }
}

// 保存合同信息
function saveContract() {
    const form = document.querySelector('#contractModal form');
    if (!form) return;

    try {
        // TODO: 这里应该调用后端接口保存合同信息
        showToast('保存成功');
        hideModal('contractModal');
        // 刷新列表
        location.reload();
    } catch (error) {
        console.error('保存合同信息失败:', error);
        showToast('保存失败，请重试', 'error');
    }
}

// 保存服务记录
function saveService() {
    const form = document.querySelector('#serviceModal form');
    if (!form) return;

    try {
        // TODO: 这里应该调用后端接口保存服务记录
        showToast('保存成功');
        hideModal('serviceModal');
        // 刷新列表
        location.reload();
    } catch (error) {
        console.error('保存服务记录失败:', error);
        showToast('保存失败，请重试', 'error');
    }
}

// 删除客户
function deleteCustomer(element) {
    if (!confirm('确认删除该客户吗？')) {
        return;
    }
    
    const tr = element.closest('tr');
    try {
        // TODO: 这里应该调用后端接口删除客户
        tr.remove();
        showToast('删除成功');
    } catch (error) {
        console.error('删除客户失败:', error);
        showToast('删除失败，请重试', 'error');
    }
}

// 删除合同
function deleteContract(element) {
    if (!confirm('��认删除该合同吗？')) {
        return;
    }
    
    const tr = element.closest('tr');
    try {
        // TODO: 这里应该调用后端接口删除合同
        tr.remove();
        showToast('删除成功');
    } catch (error) {
        console.error('删除合同失败:', error);
        showToast('删除失败，请重试', 'error');
    }
}

// 删除服务记录
function deleteService(element) {
    if (!confirm('确认删除该服务记录吗？')) {
        return;
    }
    
    const tr = element.closest('tr');
    try {
        // TODO: 这里应该调用后端接口删除服务记录
        tr.remove();
        showToast('删除成功');
    } catch (error) {
        console.error('删除服务记录失败:', error);
        showToast('删除失败，请重试', 'error');
    }
}

// 初始化事件
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化客户管理模块事件');  // 添加调试日志
    
    // 绑定新建按钮事件
    const createBtn = document.querySelector('.action-bar .button');
    if (createBtn) {
        console.log('找到新建按钮');  // 添加调试日志
        const currentPage = window.location.pathname;
        console.log('当前页面:', currentPage);  // 添加调试日志
        
        if (currentPage.includes('info.html')) {
            createBtn.addEventListener('click', showCreateModal);
        } else if (currentPage.includes('contract.html')) {
            createBtn.addEventListener('click', showContractModal);
        } else if (currentPage.includes('service.html')) {
            createBtn.addEventListener('click', showServiceModal);
        }
    } else {
        console.error('未找到新建按钮');
    }
    
    // 绑定搜索按钮事件
    const searchBtn = document.querySelector('.search-bar .button');
    if (searchBtn) {
        searchBtn.onclick = function() {
            const keyword = document.querySelector('.search-bar input').value;
            const status = document.querySelector('.search-bar select')?.value;
            console.log('搜索:', { keyword, status });
        };
    }
}); 

// 其他功能函数...
function importCustomer() {
    alert('导入功能开发中...');
}

function exportCustomer() {
    alert('导出功能开发中...');
}