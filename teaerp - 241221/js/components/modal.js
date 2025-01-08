class Modal {
  constructor(id, options = {}) {
    this.element = document.getElementById(id);
    this.options = {
      onOk: null,
      onCancel: null,
      ...options
    };
    
    this.init();
  }

  init() {
    // 绑定关闭按钮
    const closeBtn = this.element.querySelector('.close-btn');
    if(closeBtn) {
      closeBtn.onclick = () => this.hide();
    }

    // 绑定取消按钮
    const cancelBtn = this.element.querySelector('.button.secondary');
    if(cancelBtn) {
      cancelBtn.onclick = () => {
        this.options.onCancel?.();
        this.hide();
      };
    }

    // 绑定确定按钮
    const okBtn = this.element.querySelector('.button:not(.secondary)');
    if(okBtn) {
      okBtn.onclick = () => {
        this.options.onOk?.();
      };
    }
  }

  show() {
    this.element.style.display = 'flex';
  }

  hide() {
    this.element.style.display = 'none';
  }
} 