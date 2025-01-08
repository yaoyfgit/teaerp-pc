class Table {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.options = {
      columns: [],
      rowKey: 'id',
      loading: false,
      ...options
    };
    this.data = [];
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  setLoading(loading) {
    this.options.loading = loading;
    this.render();
  }

  render() {
    let html = `
      <table class="data-table">
        <thead>
          <tr>
            ${this.options.columns.map(col => `
              <th>${col.title}</th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    if (this.options.loading) {
      html += `
        <tr>
          <td colspan="${this.options.columns.length}" class="loading">
            <i class="fas fa-spinner fa-spin"></i> 加载中...
          </td>
        </tr>
      `;
    } else if (this.data.length === 0) {
      html += `
        <tr>
          <td colspan="${this.options.columns.length}" class="empty">
            暂无数据
          </td>
        </tr>
      `;
    } else {
      html += this.data.map(row => `
        <tr data-key="${row[this.options.rowKey]}">
          ${this.options.columns.map(col => `
            <td>${col.render ? col.render(row[col.key], row) : row[col.key]}</td>
          `).join('')}
        </tr>
      `).join('');
    }

    html += `
        </tbody>
      </table>
    `;

    this.element.innerHTML = html;
  }
} 