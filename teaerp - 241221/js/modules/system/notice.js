// 通知公告模块
document.addEventListener('DOMContentLoaded', function() {
    initNoticeManage();
    initRichEditor();
});

function initNoticeManage() {
    loadNoticeList();
    bindEvents();
}

function loadNoticeList(page = 1) {
    // 模拟API调用
    const mockData = {
        total: 100,
        list: [
            {
                id: 1,
                title: '系统升级通知',
                type: 'notice',
                content: '系统将于2024年3月20日进行升级维护...',
                startTime: '2024-03-15 10:00:00',
                endTime: '2024-03-25 10:00:00',
                status: 'published',
                publisher: '系统管理员',
                publishTime: '2024-03-15 10:00:00',
                attachments: [
                    { name: '升级说明.pdf', size: '1.2MB' }
                ]
            }
        ]
    };

    renderNoticeList(mockData);
    renderPagination(mockData.total);
}

function renderNoticeList(data) {
    const container = document.querySelector('.notice-list');
    container.innerHTML = data.list.map(notice => `
        <div class="notice-card">
            <div class="notice-header">
                <h3 class="notice-title">${notice.title}</h3>
                <span class="notice-type ${notice.type}">
                    ${getNoticeTypeName(notice.type)}
                </span>
            </div>
            <div class="notice-meta">
                <span>发布人：${notice.publisher}</span>
                <span>发布时间：${notice.publishTime}</span>
                <span>有效期：${notice.startTime} 至 ${notice.endTime}</span>
            </div>
            <div class="notice-content">
                ${notice.content}
            </div>
            <div class="notice-footer">
                <span class="notice-status ${notice.status}">
                    ${getStatusName(notice.status)}
                </span>
                <div class="notice-actions">
                    ${renderAttachments(notice.attachments)}
                    ${renderActions(notice)}
                </div>
            </div>
        </div>
    `).join('');
}

function getNoticeTypeName(type) {
    const types = {
        notice: '通知',
        announcement: '公告'
    };
    return types[type] || type;
}

function getStatusName(status) {
    const statuses = {
        draft: '草稿',
        published: '已发布',
        expired: '已过期'
    };
    return statuses[status] || status;
}

function renderAttachments(attachments) {
    if (!attachments || attachments.length === 0) return '';
    return `
        <div class="attachments">
            ${attachments.map(file => `
                <a href="javascript:void(0)" onclick="downloadAttachment('${file.name}')" class="attachment-link">
                    <i class="icon-attachment"></i>
                    ${file.name} (${file.size})
                </a>
            `).join('')}
        </div>
    `;
}

function renderActions(notice) {
    if (notice.status === 'draft') {
        return `
            <button class="button" onclick="editNotice(${notice.id})">编辑</button>
            <button class="button" onclick="publishNotice(${notice.id})">发布</button>
            <button class="button secondary" onclick="deleteNotice(${notice.id})">删除</button>
        `;
    }
    return `
        <button class="button" onclick="viewNotice(${notice.id})">查看</button>
    `;
}

function initRichEditor() {
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const command = this.dataset.command;
            if (command === 'createLink') {
                const url = prompt('请输入链接地址：');
                if (url) document.execCommand(command, false, url);
            } else if (command === 'insertImage') {
                const url = prompt('请输入图片地址：');
                if (url) document.execCommand(command, false, url);
            } else {
                document.execCommand(command, false, null);
            }
        });
    });
}

function submitNotice() {
    const formData = {
        title: document.querySelector('[name="title"]').value,
        type: document.querySelector('[name="type"]').value,
        startTime: document.querySelector('[name="startTime"]').value,
        endTime: document.querySelector('[name="endTime"]').value,
        content: document.querySelector('.editor-content').innerHTML,
        attachments: Array.from(document.querySelector('[name="attachments"]').files)
    };

    // 表单验证
    if (!formData.title || !formData.content) {
        alert('请填写必填项');
        return;
    }

    // 发送请求到后端
    console.log('发布公告:', formData);
    alert('公告发布成功');
    hideModal('createNoticeModal');
    loadNoticeList();
}

function saveAsDraft() {
    // 保存草稿逻辑
}

// ... 其他函数 