// 打印模板管理
document.addEventListener('DOMContentLoaded', function() {
    initTemplateManage();
});

// 初始化模板管理
function initTemplateManage() {
    // 加载模板列表
    loadTemplateList();
    // 绑定事件
    bindEvents();
}

// 加载模板列表
function loadTemplateList() {
    // 模拟API调用
    const templates = [
        {
            id: 1,
            name: '商品标签模板',
            type: 'product',
            paperSize: 'label-small',
            dpi: 300,
            createTime: '2024-03-20 10:00:00',
            creator: '张三',
            status: 'active'
        },
        {
            id: 2,
            name: '库位标签模板',
            type: 'location',
            paperSize: 'label-medium',
            dpi: 203,
            createTime: '2024-03-20 11:00:00',
            creator: '李四',
            status: 'active'
        }
    ];
    
    renderTemplateList(templates);
}

// 渲染模板列表
function renderTemplateList(templates) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = templates.map(template => `
        <tr>
            <td>${template.name}</td>
            <td>${getTemplateTypeName(template.type)}</td>
            <td>${getPaperSizeName(template.paperSize)}</td>
            <td>${template.dpi} DPI</td>
            <td>${template.createTime}</td>
            <td>${template.creator}</td>
            <td><span class="status ${template.status}">${getStatusName(template.status)}</span></td>
            <td>
                <button class="button-link" onclick="editTemplate(${template.id})">编辑</button>
                <button class="button-link" onclick="previewTemplate(${template.id})">预览</button>
                <button class="button-link" onclick="deleteTemplate(${template.id})">删除</button>
            </td>
        </tr>
    `).join('');
}

// 绑定事件
function bindEvents() {
    // 搜索按钮点击事件
    document.querySelector('.search-bar .button').addEventListener('click', function() {
        const type = document.querySelector('[name="templateType"]').value;
        searchTemplates(type);
    });

    // 纸张规格变化事件
    document.querySelector('[name="paperSize"]')?.addEventListener('change', handlePaperSizeChange);
}

// 显示模板设计器
function showTemplateDesigner(templateId = null) {
    const modal = document.getElementById('templateDesignerModal');
    modal.style.display = 'flex';
    
    // 重置画布
    resetCanvas();
    
    if (templateId) {
        // 加载模板数据
        loadTemplateData(templateId);
    }
    
    // 初始化设计器事件
    initDesignerEvents();
}

// 重置画布
function resetCanvas() {
    const canvas = document.getElementById('templateCanvas');
    canvas.innerHTML = '';
    canvas.style.width = '100mm';
    canvas.style.height = '100mm';
    canvas.style.background = 'white';
    canvas.style.position = 'relative';
    canvas.style.margin = '0 auto';
    canvas.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
}

// 初始化设计器事件
function initDesignerEvents() {
    // 监听画布点击事件
    document.getElementById('templateCanvas').addEventListener('click', function(e) {
        if (e.target === this) {
            // 点击空白区域，显示模板属性
            showTemplateProperties();
        }
    });
}

// 添加条码元素
function addBarcodeElement() {
    const element = createDesignElement('barcode', {
        type: '1d',
        format: 'code128',
        width: 100,
        height: 40,
        text: '示例条码'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
    showElementProperties(element);
}

// ���加文字元素
function addTextElement() {
    const element = createDesignElement('text', {
        text: '示例文字',
        fontSize: 12,
        fontFamily: 'Arial'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
    showElementProperties(element);
}

// 添加图片元素
function addImageElement() {
    const element = createDesignElement('image', {
        src: '',
        width: 50,
        height: 50
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
    showElementProperties(element);
}

// 添加线条元素
function addLineElement() {
    const element = createDesignElement('line', {
        length: 100,
        thickness: 1,
        direction: 'horizontal'
    });
    document.getElementById('templateCanvas').appendChild(element);
    makeElementDraggable(element);
    showElementProperties(element);
}

// 创建设计元素
function createDesignElement(type, props) {
    const element = document.createElement('div');
    element.className = `design-element ${type}-element`;
    element.dataset.type = type;
    element.dataset.props = JSON.stringify(props);
    
    // 根据类型设置元素内容
    switch(type) {
        case 'barcode':
            element.innerHTML = `<div class="barcode-preview">${props.text}</div>`;
            break;
        case 'text':
            element.innerHTML = props.text;
            break;
        case 'image':
            element.innerHTML = '<div class="image-placeholder">图片</div>';
            break;
        case 'line':
            element.className += props.direction === 'horizontal' ? ' horizontal' : ' vertical';
            break;
    }
    
    return element;
}

// 使元素可拖拽
function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // 显示元素属性
        showElementProperties(element);
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 显示元素属性
function showElementProperties(element) {
    const panel = document.querySelector('.element-properties');
    const type = element.dataset.type;
    const props = JSON.parse(element.dataset.props);
    
    panel.style.display = 'block';
    panel.innerHTML = getElementPropertiesHtml(type, props);
    
    // 绑定属性变化事件
    bindPropertyChangeEvents(element);
}

// 获取元素属性HTML
function getElementPropertiesHtml(type, props) {
    switch(type) {
        case 'barcode':
            return getBarcodePropertiesHtml(props);
        case 'text':
            return getTextPropertiesHtml(props);
        case 'image':
            return getImagePropertiesHtml(props);
        case 'line':
            return getLinePropertiesHtml(props);
        default:
            return '';
    }
}

// 保存模板
function saveTemplate() {
    const formData = new FormData(document.querySelector('#templateDesignerModal form'));
    const templateData = {
        name: formData.get('templateName'),
        paperSize: formData.get('paperSize'),
        width: formData.get('width'),
        height: formData.get('height'),
        dpi: formData.get('dpi'),
        speed: formData.get('speed'),
        temperature: formData.get('temperature'),
        orientation: formData.get('orientation'),
        elements: getTemplateElements()
    };
    
    if (!validateTemplateData(templateData)) return;
    
    // 调用后端API保存模板
    console.log('保存模板:', templateData);
    alert('模板保存成功');
    hideModal('templateDesignerModal');
    loadTemplateList(); // 刷新列表
}

// 获取模板元素数据
function getTemplateElements() {
    return Array.from(document.querySelectorAll('#templateCanvas .design-element'))
        .map(element => ({
            type: element.dataset.type,
            props: JSON.parse(element.dataset.props),
            position: {
                left: element.style.left,
                top: element.style.top
            }
        }));
}

// 验证模板数据
function validateTemplateData(data) {
    if (!data.name) {
        alert('请输入模板名称');
        return false;
    }
    if (data.paperSize === 'custom' && (!data.width || !data.height)) {
        alert('请输入自定义纸张尺寸');
        return false;
    }
    if (data.elements.length === 0) {
        alert('请添加至少一个元素');
        return false;
    }
    return true;
} 