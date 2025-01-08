// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initManualManage();
});

// 初始化产品手册管理
function initManualManage() {
    // 加载品类列表
    loadCategoryOptions();
    // 加载手册列表
    loadManualList();
}

// 加载品类选项
function loadCategoryOptions() {
    // 模拟API调用
    const categories = [
        { id: 1, name: '红茶' },
        { id: 2, name: '绿茶' },
        { id: 3, name: '乌龙茶' }
    ];
    const selects = document.querySelectorAll('[name="category"]');
    const options = '<option value="">请选择品类</option>' + 
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    selects.forEach(select => select.innerHTML = options);
}

// 加载商品选项
function loadProductOptions(categoryId) {
    // 模拟API调用
    const products = [
        { id: 1, name: '大红袍', category: 1 },
        { id: 2, name: '铁观音', category: 3 },
        { id: 3, name: '龙井', category: 2 }
    ];
    const select = document.querySelector('[name="productId"]');
    select.innerHTML = '<option value="">请选择商品</option>' + 
        products.filter(p => !categoryId || p.category == categoryId)
            .map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// 加载手册列表
function loadManualList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                productCode: 'P001',
                productName: '大红袍',
                category: '红茶',
                version: 'v2.0',
                updateTime: '2024-03-01',
                status: 'published'
            },
            {
                id: 2,
                productCode: 'P002',
                productName: '铁观音',
                category: '乌龙茶',
                version: 'v1.5',
                updateTime: '2024-03-01',
                status: 'draft'
            }
        ]
    };
    renderManualList(mockData);
}

// 渲染手册列表
function renderManualList(data) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = data.list.map(manual => `
        <tr>
            <td>${manual.productCode}</td>
            <td>${manual.productName}</td>
            <td>${manual.category}</td>
            <td>${manual.version}</td>
            <td>${manual.updateTime}</td>
            <td><span class="status-tag ${manual.status}">${getStatusName(manual.status)}</span></td>
            <td>
                <a href="javascript:void(0)" onclick="editManual(${manual.id})" class="action-link">编辑</a>
                <a href="javascript:void(0)" onclick="previewManual(${manual.id})" class="action-link">预览</a>
                <a href="javascript:void(0)" onclick="downloadManual(${manual.id})" class="action-link">下载</a>
                ${manual.status === 'published' ? 
                    `<a href="javascript:void(0)" onclick="expireManual(${manual.id})" class="action-link">停用</a>` : 
                    `<a href="javascript:void(0)" onclick="publishManual(${manual.id})" class="action-link">发布</a>`
                }
            </td>
        </tr>
    `).join('');
}

// 显示新建手册弹窗
function showCreateModal() {
    const modal = document.getElementById('manualModal');
    modal.querySelector('h3').textContent = '新建产品手册';
    modal.classList.add('show');
    // 重置表单
    modal.querySelector('form').reset();
    // 清空特性列表
    document.querySelector('.feature-list').innerHTML = `
        <div class="feature-item">
            <input type="text" class="form-control" name="features[]">
            <button type="button" class="button-icon" onclick="removeFeature(this)">
                <i class="icon-close"></i>
            </button>
        </div>
    `;
    // 清空规格参数
    document.querySelector('.spec-table tbody').innerHTML = '';
    // 清空图片预览
    document.querySelector('.image-preview').innerHTML = '';
}

// 添加产品特点
function addFeature() {
    const featureList = document.querySelector('.feature-list');
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    featureItem.innerHTML = `
        <input type="text" class="form-control" name="features[]">
        <button type="button" class="button-icon" onclick="removeFeature(this)">
            <i class="icon-close"></i>
        </button>
    `;
    featureList.appendChild(featureItem);
}

// 移除产品特点
function removeFeature(btn) {
    btn.closest('.feature-item').remove();
}

// 添加规格参数
function addSpec() {
    const tbody = document.querySelector('.spec-table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="form-control" name="specNames[]"></td>
        <td><input type="text" class="form-control" name="specValues[]"></td>
        <td>
            <button type="button" class="button-icon" onclick="removeSpec(this)">
                <i class="icon-close"></i>
            </button>
        </td>
    `;
    tbody.appendChild(tr);
}

// 移除规格参数
function removeSpec(btn) {
    btn.closest('tr').remove();
}

// 保存为草稿
function saveAsDraft() {
    submitManual('draft');
}

// 提交手册
function submitManual(status = 'published') {
    const form = document.querySelector('#manualModal .form');
    const formData = new FormData(form);

    // 收集阶梯价格
    const ladderPrices = Array.from(form.querySelectorAll('.ladder-price-table tbody tr')).map(tr => ({
        startQuantity: tr.querySelector('[name="startQuantity[]"]').value,
        endQuantity: tr.querySelector('[name="endQuantity[]"]').value,
        unitPrice: tr.querySelector('[name="unitPrice[]"]').value,
        effectiveDate: tr.querySelector('[name="effectiveDate[]"]').value,
        expiryDate: tr.querySelector('[name="expiryDate[]"]').value
    }));
    formData.append('ladderPrices', JSON.stringify(ladderPrices));

    // 收集客户等级价格
    const levelPrices = Array.from(form.querySelectorAll('.level-price-table tbody tr')).map(tr => ({
        customerLevel: tr.querySelector('[name="customerLevel[]"]').value,
        discount: tr.querySelector('[name="discount[]"]').value,
        minPrice: tr.querySelector('[name="minPrice[]"]').value
    }));
    formData.append('levelPrices', JSON.stringify(levelPrices));

    // 收集促销价格
    const promotionPrices = Array.from(form.querySelectorAll('.promotion-price-table tbody tr')).map(tr => ({
        promotionName: tr.querySelector('[name="promotionName[]"]').value,
        startDate: tr.querySelector('[name="startDate[]"]').value,
        endDate: tr.querySelector('[name="endDate[]"]').value,
        promotionPrice: tr.querySelector('[name="promotionPrice[]"]').value,
        limitQuantity: tr.querySelector('[name="limitQuantity[]"]').value
    }));
    formData.append('promotionPrices', JSON.stringify(promotionPrices));

    // 获取产品特点
    const features = Array.from(form.querySelectorAll('[name="features[]"]'))
        .map(input => input.value)
        .filter(value => value.trim());
    formData.append('features', JSON.stringify(features));

    // 获取规格参数
    const specs = Array.from(form.querySelectorAll('.spec-table tbody tr'))
        .map(tr => ({
            name: tr.querySelector('[name="specNames[]"]').value,
            value: tr.querySelector('[name="specValues[]"]').value
        }))
        .filter(spec => spec.name.trim() && spec.value.trim());
    formData.append('specs', JSON.stringify(specs));

    // TODO: 发送请求到后端
    console.log('提交手册:', Object.fromEntries(formData));
    alert('保存成功');
    hideModal('manualModal');
    loadManualList();
}

// 编辑手册
function editManual(id) {
    const modal = document.getElementById('manualModal');
    modal.querySelector('h3').textContent = '编辑产品手册';
    modal.classList.add('show');
    // TODO: 加载手册详情
    loadManualDetail(id);
}

// 预览手册
function previewManual(id) {
    // TODO: 实现手册预览功能
    console.log('预览手册:', id);
}

// 下载手册
function downloadManual(id) {
    // TODO: 实现手册下载功能
    console.log('下载手册:', id);
}

// 批量下载
function batchDownload() {
    // TODO: 实现批量下载功能
    console.log('批量下载手册');
}

// 发布手册
function publishManual(id) {
    if (confirm('确定要发布该手册吗？')) {
        // TODO: 调用后端API发布手册
        console.log('发布手册:', id);
        alert('手册已发布');
        loadManualList();
    }
}

// 停用手册
function expireManual(id) {
    if (confirm('确定要停用该手册吗？')) {
        // TODO: 调用后端API停用手册
        console.log('停用手册:', id);
        alert('手册已停用');
        loadManualList();
    }
}

// 获取状态名称
function getStatusName(status) {
    const statuses = {
        draft: '草稿',
        published: '已发布',
        expired: '已停用'
    };
    return statuses[status] || status;
}

// 绑定事件
document.addEventListener('DOMContentLoaded', function() {
    // 品类选择联动商品
    document.querySelector('[name="category"]').addEventListener('change', function() {
        loadProductOptions(this.value);
    });

    // 图片上传预览
    document.querySelector('.image-uploader input').addEventListener('change', function(e) {
        const preview = document.querySelector('.image-preview');
        preview.innerHTML = '';
        
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const div = document.createElement('div');
                div.className = 'image-preview-item';
                div.innerHTML = `
                    <img src="${e.target.result}">
                    <button type="button" class="remove-btn" onclick="this.closest('.image-preview-item').remove()">
                        <i class="icon-close"></i>
                    </button>
                `;
                preview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });

    // 图片拖拽上传
    document.querySelectorAll('.image-uploader').forEach(uploader => {
        uploader.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        uploader.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });

        uploader.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            const input = this.querySelector('input[type="file"]');
            if (input.multiple) {
                handleMultipleFiles(files, this);
            } else {
                handleSingleFile(files[0], this);
            }
        });

        // 点击上传
        const input = uploader.querySelector('input[type="file"]');
        input.addEventListener('change', function(e) {
            if (this.multiple) {
                handleMultipleFiles(this.files, uploader);
            } else {
                handleSingleFile(this.files[0], uploader);
            }
        });
    });
});

// 处理单个文件上传
function handleSingleFile(file, uploader) {
    if (!file) return;
    const preview = uploader.querySelector('.image-preview');
    const reader = new FileReader();
    reader.onload = function(e) {
        preview.innerHTML = `
            <div class="image-preview-item">
                <img src="${e.target.result}">
                <button type="button" class="remove-btn" onclick="clearPreview(this)">
                    <i class="icon-close"></i>
                </button>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// 处理多个文件上传
function handleMultipleFiles(files, uploader) {
    const preview = uploader.querySelector('.image-preview');
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'image-preview-item';
            div.innerHTML = `
                <img src="${e.target.result}">
                <button type="button" class="remove-btn" onclick="this.closest('.image-preview-item').remove()">
                    <i class="icon-close"></i>
                </button>
            `;
            preview.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}

// 清除预览图
function clearPreview(btn) {
    const previewItem = btn.closest('.image-preview-item');
    const uploader = previewItem.closest('.image-uploader');
    const input = uploader.querySelector('input[type="file"]');
    input.value = '';
    previewItem.remove();
}

// 添加阶梯价格
function addLadderPrice() {
    const tbody = document.querySelector('.ladder-price-table tbody');
    const addRow = tbody.querySelector('.add-row');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="number" class="form-control" name="startQuantity[]" min="0" required></td>
        <td><input type="number" class="form-control" name="endQuantity[]" min="0" required></td>
        <td><input type="number" class="form-control" name="unitPrice[]" min="0" step="0.01" required></td>
        <td><input type="date" class="form-control" name="effectiveDate[]" required></td>
        <td><input type="date" class="form-control" name="expiryDate[]"></td>
        <td class="action-column">
            <button type="button" class="button-icon delete-btn" onclick="removeTableRow(this)" title="删除">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    `;
    tbody.insertBefore(tr, addRow);
}

// 添加客户等级价格
function addLevelPrice() {
    const tbody = document.querySelector('.level-price-table tbody');
    const addRow = tbody.querySelector('.add-row');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>
            <select class="form-control" name="customerLevel[]" required>
                <option value="">请选择等级</option>
                <option value="A">A级客户</option>
                <option value="B">B级客户</option>
                <option value="C">C级客户</option>
            </select>
        </td>
        <td><input type="number" class="form-control" name="discount[]" min="0" max="100" required></td>
        <td><input type="number" class="form-control" name="minPrice[]" min="0" step="0.01" required></td>
        <td class="action-column">
            <button type="button" class="button-icon delete-btn" onclick="removeTableRow(this)" title="删除">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    `;
    tbody.insertBefore(tr, addRow);
}

// 添加促销价格
function addPromotionPrice() {
    const tbody = document.querySelector('.promotion-price-table tbody');
    const addRow = tbody.querySelector('.add-row');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="form-control" name="promotionName[]" required></td>
        <td><input type="date" class="form-control" name="startDate[]" required></td>
        <td><input type="date" class="form-control" name="endDate[]" required></td>
        <td><input type="number" class="form-control" name="promotionPrice[]" min="0" step="0.01" required></td>
        <td><input type="number" class="form-control" name="limitQuantity[]" min="0"></td>
        <td class="action-column">
            <button type="button" class="button-icon delete-btn" onclick="removeTableRow(this)" title="删除">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    `;
    tbody.insertBefore(tr, addRow);
}

// 通用的删除行函数
function removeTableRow(btn) {
    const tr = btn.closest('tr');
    tr.classList.add('fade-out');
    setTimeout(() => tr.remove(), 300);
}

// 切换发布步骤
function switchStep(stepId) {
    // 更新步骤状态
    document.querySelectorAll('.step-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-step="${stepId}"]`).classList.add('active');

    // 更新右侧内容
    const details = document.querySelector('.step-details');
    const stepTitles = {
        prepare: '准备阶段',
        implement: '实施阶段',
        verify: '验证阶段',
        complete: '完成发布'
    };

    // 更新标题
    details.querySelector('.step-details-title').textContent = stepTitles[stepId];

    // 更新表单内容
    const formContent = getStepFormContent(stepId);
    details.innerHTML = formContent;
}

// 获取步骤表单内容
function getStepFormContent(stepId) {
    const contents = {
        prepare: `
            <div class="step-details-header">
                <h5 class="step-details-title">准备阶段</h5>
                <span class="step-details-status">进行中</span>
            </div>
            <div class="step-form-group">
                <label>计划发布日期</label>
                <input type="date" class="form-control" name="publishDate" required>
            </div>
            <div class="step-form-group">
                <label>发布类型</label>
                <select class="form-control" name="publishType" required>
                    <option value="new">新品发布</option>
                    <option value="update">版本更新</option>
                    <option value="revision">修订发布</option>
                </select>
            </div>
            <div class="step-form-group">
                <label>准备工作</label>
                <textarea class="form-control" name="prepareSteps" rows="3" 
                    placeholder="请描述发布前的准备工作，如：资料审核、样品确认等"></textarea>
            </div>
        `,
        implement: `
            <div class="step-details-header">
                <h5 class="step-details-title">实施阶段</h5>
                <span class="step-details-status">待开始</span>
            </div>
            <div class="step-form-group">
                <label>实施计划</label>
                <textarea class="form-control" name="implementSteps" rows="3"
                    placeholder="请描述具体的实施步骤和时间安排"></textarea>
            </div>
            <div class="step-form-group">
                <label>注意事项</label>
                <textarea class="form-control" name="implementNotes" rows="3"
                    placeholder="请描述实施过程中需要注意的事项"></textarea>
            </div>
        `,
        verify: `
            <div class="step-details-header">
                <h5 class="step-details-title">验证阶段</h5>
                <span class="step-details-status">待开始</span>
            </div>
            <div class="step-form-group">
                <label>验证方案</label>
                <textarea class="form-control" name="verifySteps" rows="3"
                    placeholder="请描述发布后的验证方式和标准"></textarea>
            </div>
            <div class="step-form-group">
                <label>验证结果</label>
                <textarea class="form-control" name="verifyResults" rows="3"
                    placeholder="请记录验证结果"></textarea>
            </div>
        `,
        complete: `
            <div class="step-details-header">
                <h5 class="step-details-title">完成发布</h5>
                <span class="step-details-status">待完成</span>
            </div>
            <div class="step-form-group">
                <label>发布总结</label>
                <textarea class="form-control" name="publishSummary" rows="3"
                    placeholder="请总结本次发布的情况"></textarea>
            </div>
            <div class="step-form-group">
                <label>回滚预案</label>
                <textarea class="form-control" name="rollbackPlan" rows="3"
                    placeholder="请描述发布失败时的回滚方案"></textarea>
            </div>
        `
    };

    return contents[stepId] || '';
}
 