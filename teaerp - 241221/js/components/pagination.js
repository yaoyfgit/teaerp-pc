// 通用分页组件
class Pagination {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.options = {
      pageSize: 10,
      ...options
    };
  }

  render(total, currentPage, callback) {
    const pageCount = Math.ceil(total / this.options.pageSize);
    let html = '';
    
    if (currentPage > 1) {
      html += `<a href="javascript:void(0)" class="page-btn" data-page="${currentPage - 1}">&lt;</a>`;
    }

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
        html += `<a href="javascript:void(0)" class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        html += '<span class="page-separator">...</span>';
      }
    }

    if (currentPage < pageCount) {
      html += `<a href="javascript:void(0)" class="page-btn" data-page="${currentPage + 1}">&gt;</a>`;
    }

    this.element.innerHTML = html;

    // 绑定点击事件
    this.element.querySelectorAll('.page-btn').forEach(btn => {
      btn.onclick = () => {
        const page = parseInt(btn.dataset.page);
        callback(page);
      };
    });
  }
} 