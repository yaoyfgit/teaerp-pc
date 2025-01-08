// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    loadSubjects();
});

// 加载科目列表
function loadSubjects(page = 1) {
    // 模拟数据
    const mockData = {
        items: [
            {
                code: '1001',
                name: '库存现金',
                level: 1,
                category: 'assets',
                unit: '元',
                currencies: ['USD', 'EUR'],
                auxiliaryAccounting: [],
                status: 'enabled'
            },
            {
                code: '1002',
                name: '银行存款',
                level: 1,
                category: 'assets',
                unit: '元',
                currencies: ['USD', 'EUR', 'JPY'],
                auxiliaryAccounting: ['bank'],
                status: 'enabled'
            }
        ],
        total: 2
    };

    renderSubjectTable(mockData.items);
    renderPagination(mockData.total, page);
}

// 渲染科目表格
function renderSubjectTable(subjects) {
    const tbody = document.getElementById('subjectTable');
    tbody.innerHTML = subjects.map(subject => `
        <tr>
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${getSubjectLevel(subject.level)}</td>
            <td>${getSubjectCategory(subject.category)}</td>
            <td>${subject.unit}</td>
            <td>${subject.currencies.join(', ')}</td>
            <td>${subject.auxiliaryAccounting.join(', ')}</td>
            <td><span class="status-tag ${subject.status === 'enabled' ? 'status-success' : 'status-error'}">
                ${subject.status === 'enabled' ? '启用' : '禁用'}
            </span></td>
            <td>
                <a href="javascript:void(0)" class="action-link" onclick="editSubject('${subject.code}')">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="toggleSubjectStatus('${subject.code}')">
                    ${subject.status === 'enabled' ? '禁用' : '启用'}
                </a>
                <a href="javascript:void(0)" class="action-link" onclick="deleteSubject('${subject.code}')">删除</a>
            </td>
        </tr>
    `).join('');
}

// 获取科目级别文本
function getSubjectLevel(level) {
    const levels = {
        1: '一级科目',
        2: '二级科目',
        3: '三级科目'
    };
    return levels[level] || '未知';
}

// 获取科目类别文本
function getSubjectCategory(category) {
    const categories = {
        assets: '资产类',
        liabilities: '负债类',
        equity: '权益类',
        cost: '成本类',
        profit: '损益类'
    };
    return categories[category] || '未知';
}

// 显示新增科目弹窗
function showAddSubjectModal() {
    document.getElementById('subjectForm').reset();
    showModal('subjectModal');
}

// 编辑科目
function editSubject(code) {
    // TODO: 根据科目编码获取科目详情
    const subject = {
        code: '1001',
        name: '库存现金',
        level: 1,
        category: 'assets',
        unit: '元',
        currencies: ['USD', 'EUR'],
        auxiliaryAccounting: []
    };
    
    const form = document.getElementById('subjectForm');
    Object.keys(subject).forEach(key => {
        const input = form.elements[key];
        if (input) {
            if (input.type === 'checkbox') {
                const values = subject[key];
                const checkboxes = form.querySelectorAll(`[name="${key}"]`);
                checkboxes.forEach(cb => {
                    cb.checked = values.includes(cb.value);
                });
            } else {
                input.value = subject[key];
            }
        }
    });
    
    showModal('subjectModal');
}

// 切换科目状态
function toggleSubjectStatus(code) {
    // TODO: 调用API切换科目状态
    console.log('切换科目状态:', code);
    loadSubjects();
    showMessage('状态已更新');
}

// 删除科目
function deleteSubject(code) {
    if (confirm('确定要删除该科目吗？')) {
        // TODO: 调用API删除科目
        console.log('删除科目:', code);
        loadSubjects();
        showMessage('科目已删除');
    }
}

// 保存科目
function saveSubject() {
    const form = document.getElementById('subjectForm');
    const formData = new FormData(form);
    const subject = Object.fromEntries(formData.entries());
    
    // 处理多选项
    subject.currencies = Array.from(form.querySelectorAll('[name="currencies"]:checked')).map(cb => cb.value);
    subject.auxiliaryAccounting = Array.from(form.querySelectorAll('[name="auxiliaryAccounting"]:checked')).map(cb => cb.value);
    
    // TODO: 调用API保存科目
    console.log('保存科目:', subject);
    
    hideModal('subjectModal');
    loadSubjects();
    showMessage('科目已保存');
}

// 导入科目
function importSubjects() {
    // TODO: 实现科目导入功能
    console.log('导入科目');
}

// 导出科目
function exportSubjects() {
    // TODO: 实现科目导出功能
    console.log('导出科目');
    showMessage('科目已导出');
}

// 搜索科目
function searchSubjects() {
    loadSubjects(1);
}

// 渲染分页
function renderPagination(total, currentPage) {
    const pageCount = Math.ceil(total / 10);
    const pagination = document.getElementById('pagination');
    
    let html = '';
    
    if (currentPage > 1) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadSubjects(${currentPage - 1})">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" onclick="loadSubjects(${i})">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-separator">...</span>';
        }
    }

    if (currentPage < pageCount) {
        html += `<a href="javascript:void(0)" class="page-btn" onclick="loadSubjects(${currentPage + 1})">&gt;</a>`;
    }

    pagination.innerHTML = html;
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // TODO: 使用统一的消息提示组件
    alert(message);
} 