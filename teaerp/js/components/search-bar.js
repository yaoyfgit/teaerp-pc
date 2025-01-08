class SearchBar {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.options = {
      fields: [],
      onSearch: null,
      ...options
    };
    this.render();
    this.bindEvents();
  }

  render() {
    this.element.innerHTML = `
      <div class="search-bar">
        ${this.options.fields.map(field => {
          switch (field.type) {
            case 'input':
              return `
                <div class="search-item">
                  <label>${field.label}</label>
                  <input type="text" 
                    class="form-control" 
                    name="${field.name}"
                    placeholder="${field.placeholder || ''}"
                  >
                </div>
              `;
            case 'select':
              return `
                <div class="search-item">
                  <label>${field.label}</label>
                  <select class="form-control" name="${field.name}">
                    <option value="">${field.placeholder || '请选择'}</option>
                    ${field.options.map(opt => `
                      <option value="${opt.value}">${opt.label}</option>
                    `).join('')}
                  </select>
                </div>
              `;
            case 'date':
              return `
                <div class="search-item">
                  <label>${field.label}</label>
                  <input type="date" 
                    class="form-control" 
                    name="${field.name}"
                  >
                </div>
              `;
          }
        }).join('')}
        <div class="search-actions">
          <button class="button primary" id="searchBtn">
            <i class="fas fa-search"></i> 搜索
          </button>
          <button class="button" id="resetBtn">
            <i class="fas fa-redo"></i> 重置
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const searchBtn = this.element.querySelector('#searchBtn');
    const resetBtn = this.element.querySelector('#resetBtn');

    searchBtn.onclick = () => {
      const formData = new FormData(this.element.querySelector('.search-bar'));
      const params = Object.fromEntries(formData.entries());
      this.options.onSearch?.(params);
    };

    resetBtn.onclick = () => {
      this.element.querySelector('.search-bar').reset();
      this.options.onSearch?.({});
    };
  }
} 