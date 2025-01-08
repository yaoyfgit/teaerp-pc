// 显示新建盘点弹窗
function showCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// 显示盘点操作弹窗
function startCheck(element) {
    console.log('开始盘点...'); // 添加调试日志
    
    try {
        const tr = element.closest('tr');
        if (!tr) {
            console.error('找不到对应的表格行');
            return;
        }

        // 更新状态显示
        const statusCell = tr.querySelector('td:nth-child(7)');
        if (statusCell) {
            statusCell.innerHTML = '<span class="status processing">盘点中</span>';
        }

        // 更新操作按钮
        const actionCell = tr.querySelector('td:last-child');
        if (actionCell) {
            actionCell.innerHTML = `
                <a href="javascript:void(0)" class="action-link" onclick="showCheckDetail(this)">查看</a>
                <a href="javascript:void(0)" class="action-link" onclick="editCheck(this)">编辑</a>
                <a href="javascript:void(0)" class="action-link" onclick="submitCheck(this)">提交</a>
            `;
        }

        // 打开盘点操作弹窗
        const modal = document.getElementById('checkModal');
        if (!modal) {
            console.error('找不到盘点操作弹窗');
            return;
        }

        // 设置盘点信息
        const checkNo = tr.cells[0].textContent;
        const warehouse = tr.cells[1].textContent;

        const checkNoSpan = modal.querySelector('.info-item:first-child span');
        const warehouseSpan = modal.querySelector('.info-item:last-child span');

        if (checkNoSpan) checkNoSpan.textContent = checkNo;
        if (warehouseSpan) warehouseSpan.textContent = warehouse;

        // 加载盘点明细数据
        const tbody = modal.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td>大红袍</td>
                    <td>特级</td>
                    <td>A-01-01</td>
                    <td>20240301</td>
                    <td>100</td>
                    <td><input type="number" class="form-control" onchange="updateDiff(this)"></td>
                    <td>0</td>
                    <td><input type="text" class="form-control"></td>
                </tr>
            `;
        }

        // 显示弹窗
        modal.classList.add('show');
        showToast('已开始盘点');

    } catch (error) {
        console.error('开始盘点失败:', error);
        showToast('开始盘点失败，请重试', 'error');
    }
}

// 加载盘点明细数据
async function loadCheckItems(checkNo) {
    try {
        // 模拟数据
        const items = [
            {
                productName: '大红袍',
                specification: '特级',
                location: 'A-01-01',
                batch: '20240301',
                systemQty: 100,
                actualQty: '',
                difference: 0,
                remark: ''
            }
        ];
        
        // 填充明细表格
        const tbody = document.querySelector('#checkModal tbody');
        if (tbody) {
            tbody.innerHTML = items.map(item => `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.specification}</td>
                    <td>${item.location}</td>
                    <td>${item.batch}</td>
                    <td>${item.systemQty}</td>
                    <td><input type="number" class="form-control" value="${item.actualQty}" onchange="updateDiff(this)"></td>
                    <td>${item.difference}</td>
                    <td><input type="text" class="form-control" value="${item.remark}"></td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('加载盘点明细失败:', error);
        showToast('加载明细失败，请重试', 'error');
    }
}

// 更新差异数量
function updateDiff(input) {
    try {
        const tr = input.closest('tr');
        if (!tr) return;

        const systemQty = parseFloat(tr.cells[4].textContent) || 0;
        const actualQty = parseFloat(input.value) || 0;
        const difference = actualQty - systemQty;
        
        const diffCell = tr.cells[6];
        if (diffCell) {
            diffCell.textContent = difference;
            diffCell.className = ''; // 清除现有样式
            if (difference < 0) {
                diffCell.classList.add('text-danger');
            } else if (difference > 0) {
                diffCell.classList.add('text-warning');
            }
        }
    } catch (error) {
        console.error('更新差异数量失败:', error);
    }
}

// 保存草稿
function saveDraft() {
    try {
        // TODO: 这里应该调用后端接口保存草稿
        showToast('保存成功');
        hideModal('checkModal');
    } catch (error) {
        console.error('保存草稿失败:', error);
        showToast('保存失败，请重试', 'error');
    }
}

// 提交盘点
function submitCheck() {
    if (!confirm('确认提交盘点结果吗？提交后将无法修改。')) {
        return;
    }
    
    try {
        // TODO: 这里应该调用后端接口提交盘点结果
        showToast('提交成功');
        hideModal('checkModal');
        location.reload(); // 刷新页面
    } catch (error) {
        console.error('提交盘点失败:', error);
        showToast('提交失败，请重试', 'error');
    }
}

// 删除盘点
function deleteCheck(element) {
    if (!confirm('确认删除该盘点单吗？')) {
        return;
    }
    
    const tr = element.closest('tr');
    try {
        // TODO: 这里应该调用后端接口删除盘点单
        tr.remove();
        showToast('删除成功');
    } catch (error) {
        console.error('删除盘点单失败:', error);
        showToast('删除失败，请重试', 'error');
    }
}

// 初始化事件
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，初始化事件...'); // 添加调试日志
    
    // 绑定新建按钮事件
    const createBtn = document.querySelector('.action-bar .button');
    if (createBtn) {
        createBtn.onclick = showCreateModal;
    }
    
    // 绑定搜索按钮事件
    const searchBtn = document.querySelector('.search-bar .button');
    if (searchBtn) {
        searchBtn.onclick = function() {
            const keyword = document.querySelector('.search-bar input').value;
            const status = document.querySelector('.search-bar select').value;
            console.log('搜索:', { keyword, status });
        };
    }
});

// 从新建盘点弹窗创建盘点单
function createAndStartCheck() {
    const form = document.querySelector('#createModal form');
    if (!form) {
        console.error('找不到表单');
        return;
    }
    
    // 获取表单数据
    const warehouse = form.querySelector('select[name="warehouse"]').value;
    const range = form.querySelector('select[name="range"]').value;
    const remark = form.querySelector('textarea[name="remark"]').value;
    
    if (!warehouse) {
        showToast('请选择盘点仓库', 'error');
        return;
    }
    
    try {
        // 生成盘点单号
        const checkNo = generateCheckNo();
        const warehouseText = form.querySelector('select[name="warehouse"] option:checked').text;
        
        // 创建新行并添加到表格
        const tableBody = document.querySelector('.data-table tbody');
        if (tableBody) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${checkNo}</td>
                <td>${warehouseText}</td>
                <td>${form.querySelector('select[name="range"] option:checked').text}</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td></td>
                <td>张三</td>
                <td><span class="status draft">草稿</span></td>
                <td>
                    <a href="javascript:void(0)" class="action-link" onclick="showCheckDetail(this)">查看</a>
                    <a href="javascript:void(0)" class="action-link" onclick="startCheck(this)">开始盘点</a>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteCheck(this)">删除</a>
                </td>
            `;
            tableBody.appendChild(newRow);
            
            // 关闭新建弹窗
            hideModal('createModal');
            
            // 直接调用startCheck函数，传入新行中的链接元素
            const startBtn = newRow.querySelector('.action-link[onclick*="startCheck"]');
            if (startBtn) {
                startCheck(startBtn);
            }
            
            showToast('创建成功');
        }
    } catch (error) {
        console.error('创建盘点单失败:', error);
        showToast('创建失败，请重试', 'error');
    }
}

// 生成盘点单号
function generateCheckNo() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SC${year}${month}${day}${random}`;
}

// 显示盘点明细
function showCheckDetail(element) {
    const tr = element.closest('tr');
    const checkNo = tr.cells[0].textContent;
    const modal = document.getElementById('checkDetailModal');
    
    if (!modal) {
        console.error('找不到盘点明细弹窗');
        return;
    }
    
    // 设置盘点单号
    const title = modal.querySelector('.modal-header h3');
    if (title) {
        title.textContent = `盘点明细 - ${checkNo}`;
    }
    
    // 加载明细数据
    loadCheckDetailData(checkNo);
    
    // 显示弹窗
    modal.classList.add('show');
}

// 加载盘点明细数据
async function loadCheckDetailData(checkNo) {
    try {
        // 模拟数据
        const detailData = [
            {
                productCode: 'P001',
                productName: '铁观音',
                specification: '特级',
                unit: '斤',
                systemQty: 100,
                actualQty: 98,
                difference: -2,
                remark: '货架A1'
            }
        ];
        
        // 填充明细表格
        const tbody = document.querySelector('#checkDetailModal tbody');
        if (tbody) {
            tbody.innerHTML = detailData.map(item => `
                <tr>
                    <td>${item.productCode}</td>
                    <td>${item.productName}</td>
                    <td>${item.specification}</td>
                    <td>${item.unit}</td>
                    <td>${item.systemQty}</td>
                    <td>${item.actualQty}</td>
                    <td>${item.difference}</td>
                    <td>${item.remark}</td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('加载盘点明细数据失败:', error);
        showToast('加载明细失败，请重试', 'error');
    }
} 