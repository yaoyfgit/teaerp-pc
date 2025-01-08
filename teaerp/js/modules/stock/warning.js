// 引入组件
import { Table } from '../../components/table.js';
import { SearchBar } from '../../components/search-bar.js';
import { Pagination } from '../../components/pagination.js';
import { Message } from '../../components/message.js';
import { Modal } from '../../components/modal.js';
import { Chart } from '../../components/chart.js';

// 初始化分页
const pagination = new Pagination('pagination');

// 初始化模态框
const purchaseModal = new Modal('purchaseRequirementModal', {
  onOk: () => {
    submitPurchaseRequirement();
  }
});

// 初始化搜索栏
const searchBar = new SearchBar('searchBar', {
  fields: [
    {
      type: 'input',
      label: '商品名称',
      name: 'productName',
      placeholder: '请输入商品名称'
    },
    {
      type: 'select',
      label: '预警类型',
      name: 'warningType',
      options: [
        { value: 'low', label: '库存不足' },
        { value: 'high', label: '库存积压' }
      ]
    }
  ],
  onSearch: (params) => {
    loadWarningData(1, params);
  }
});

// 初始化表格
const table = new Table('warningTable', {
  columns: [
    { title: '商品编码', key: 'code' },
    { title: '商品名称', key: 'name' },
    { title: '当前库存', key: 'stock' },
    { title: '预警类型', key: 'type' },
    {
      title: '操作',
      key: 'actions',
      render: (_, row) => `
        <button class="button small" onclick="showPurchaseModal('${row.id}')">
          生成采购需求
        </button>
      `
    }
  ]
});

// 初始化图表
const warningChart = new Chart('warningChart', {
  title: '库存预警趋势',
  type: 'line'
});

// 加载数据
async function loadWarningData(page = 1, params = {}) {
  table.setLoading(true);
  try {
    const res = await fetch('/api/stock/warnings?' + new URLSearchParams({
      page,
      ...params
    }));
    const data = await res.json();
    
    table.setData(data.items);
    pagination.render(data.total, page, (newPage) => {
      loadWarningData(newPage, params);
    });
  } catch (err) {
    Message.show('加载数据失败', 'error');
  } finally {
    table.setLoading(false);
  }
}

// 加载图表数据
async function loadChartData() {
  try {
    const res = await fetch('/api/stock/warning-stats');
    const data = await res.json();
    
    warningChart.setData({
      xAxis: data.dates,
      series: [
        {
          name: '库存不足',
          data: data.lowStock,
          options: {
            color: '#ff4d4f'
          }
        },
        {
          name: '库存积压',
          data: data.highStock,
          options: {
            color: '#faad14'
          }
        }
      ]
    });
  } catch (err) {
    Message.show('加载图表数据失败', 'error');
  }
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  warningChart.resize();
});

// 提交采购需求
function submitPurchaseRequirement() {
  // ... 提交逻辑
  
  // 显示成功提示
  Message.show('采购需求已提交', 'success');
  
  // 关闭模态框
  purchaseModal.hide();
} 