class Message {
  static types = {
    success: {
      icon: 'check-circle',
      color: '#52c41a'
    },
    warning: {
      icon: 'exclamation-circle', 
      color: '#faad14'
    },
    error: {
      icon: 'times-circle',
      color: '#ff4d4f'
    },
    info: {
      icon: 'info-circle',
      color: '#1890ff'
    }
  };

  static show(content, type = 'info', duration = 3000) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    
    const config = this.types[type];
    messageEl.innerHTML = `
      <i class="fas fa-${config.icon}" style="color: ${config.color}"></i>
      <span>${content}</span>
    `;

    document.body.appendChild(messageEl);

    // 动画显示
    setTimeout(() => messageEl.classList.add('show'), 10);

    // 自动关闭
    setTimeout(() => {
      messageEl.classList.remove('show');
      setTimeout(() => messageEl.remove(), 300);
    }, duration);
  }
} 