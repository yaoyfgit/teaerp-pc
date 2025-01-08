# TeaERP UI规范文档

## 1. 面包屑导航
- 使用 `.breadcrumb` 类
- 结构：图标 + 文字 + 分隔符(fas fa-angle-right)
- 每个层级包含：图标 + 文字 + 分隔符(最后一级无分隔符)
- 图标使用 FontAwesome 5
- 示例：
```html
<div class="breadcrumb">
    <i class="fas fa-home"></i>
    <span>首页</span>
    <i class="fas fa-angle-right"></i>
    <i class="fas fa-industry"></i>
    <span>生产管理</span>
</div>
```

## 2. 工具栏
- 使用 `.standard-toolbar` 类
- 查询区域和操作区域用分隔线隔开
- 分隔线使用 `.toolbar-divider` 类
- 分隔线样式：1px solid #eee，左右margin为16px
- 示例：
```html
<div class="standard-toolbar">
    <div class="toolbar-left">
        <select class="standard-select">...</select>
        <button class="standard-button">查询</button>
        <div class="toolbar-divider"></div>
        <button class="standard-button primary">新增</button>
    </div>
</div>
```

## 3. 按钮样式
- 基础类：`.standard-button`
- 主要按钮：`.standard-button.primary`
- 危险按钮：`.standard-button.danger`
- 按钮内图标和文字间距：8px
- 示例：
```html
<button class="standard-button primary">
    <i class="fas fa-plus"></i> 新增
</button>
```

## 4. 表格样式
- 使用 `.standard-table` 类
- 操作列固定宽度：120px
- 表头使用浅灰色背景
- 行hover效果
- 示例：
```html
<table class="standard-table">
    <thead>
        <tr>
            <th>名称</th>
            <th width="120">操作</th>
        </tr>
    </thead>
</table>
```

## 5. 状态标签
- 使用 `.status-badge` 类
- 不同状态对应不同样式：
  - 信息：`.info` (蓝色)
  - 警告：`.warning` (橙色)
  - 成功：`.success` (绿色)
  - 危险：`.danger` (红色)
- 示例：
```html
<span class="status-badge info">进行中</span>
```

## 6. 进度条
- 使用 `.progress-bar` 类
- 进度显示：`.progress` 类
- 文字显示在右侧
- 示例：
```html
<div class="progress-bar">
    <div class="progress" style="width: 85%"></div>
    <span class="progress-text">85%</span>
</div>
```

## 7. 表单样式
- 使用 `.standard-form` 类
- 输入框：`.standard-input`
- 下拉框：`.standard-select`
- 文本域：`.standard-textarea`
- 示例：
```html
<form class="standard-form">
    <div class="form-group">
        <label>名称</label>
        <input type="text" class="standard-input">
    </div>
</form>
```

## 8. 卡片样式
- 使用 `.standard-card` 类
- 卡片头部：`.card-header`
- 卡片内容：`.card-body`
- 示例：
```html
<div class="standard-card">
    <div class="card-header">
        <h3>标题</h3>
    </div>
    <div class="card-body">
        内容
    </div>
</div>



1.页面整体布局规范：
  - 采用左侧固定导航 + 右侧内容区的布局方式
  - 右侧内容区包含顶部导航栏、面包屑导航和主要内容区
  - 内容区域使用卡片式布局，统一使用 standard-card 样式
2.间距规范：
- 组件间大间距：16px（margin-bottom: 16px）
   - 组件内小间距：8px（gap: 8px）
   - 内边距：16px（padding: 16px）
   - 分隔线上下间距：16px
3.搜索区域布局规范：
   - 如搜索条件较多，可采用两行布局。查询按钮和操作按钮分组，中间用分隔线分隔。
   - 筛选条件，宽度统一（width: 180px）
   - 操作按钮，使用分隔线分组
   - 按钮高度统一为32px
4.表格布局规范：
   - 表头样式统一，使用浅色背景
   - 单元格内容垂直居中（vertical-align: middle）
   - 操作列固定最小宽度（min-width: 120px）
   - 操作按钮使用小尺寸（btn-xs）并组合显示
5.按钮规范：
   - 主要按钮：
     - 背景色：#8fd4d2（蒂芙尼蓝）
     - 文字颜色：#fff
     - hover状态：背景色变浅 (#a8e0de)
   - 次要按钮：
     - 背景色：#fff
     - 边框色：#d9d9d9
     - 文字颜色：#666
     - hover状态：边框和文字变为主色调
   - 危险操作：
     - 背景色：#f44336
     - 文字颜色：#fff
     - hover状态：背景色变浅
   - 按钮尺寸：
     - 标准按钮：height: 32px, padding: 0 16px
     - 小按钮：height: 24px, padding: 0 8px
   - 按钮组：
     - 间距：8px
     - 组间分隔线：1px solid #eee
     - 分隔线左右间距：16px
   - 图标按钮：
     - 图标右间距：8px
     - 图标大小：14px
6.弹窗规范：
   - 宽度：90%（最大1400px）
   - 高度：85vh
   - 居中显示
   - 背景遮罩：rgba(0, 0, 0, 0.5)
   - 圆角：4px
7.表单控件规范：
   - 统一高度：32px
   - 统一内边距：4px 8px
   - 统一字体大小：14px
8.输入框和选择框规范：
  - 基础样式：
    - 高度：32px
    - 内边距：4px 8px
    - 边框：1px solid #eee
    - 圆角：4px
    - 字体大小：14px
    - 文字颜色：#333
  - 状态样式：
    - hover：边框颜色变为主色调
    - focus：边框颜色为主色调，添加淡色阴影
    - disabled：背景色为#f5f5f5，文字色为#999
  - 占位符文字：
    - 颜色：#999
    - 字体大小：14px
  - 选择框特殊样式：
    - 右侧添加下拉箭头图标
    - 图标大小：16px
    - 图标颜色：#666
    - 右侧内边距：24px（容纳下拉箭头）
  - 选项样式：
    - 内边距：8px
    - 文字颜色：#333
    - hover背景色：#f5f5f5
  - 宽度规范：
    - 默认宽度：180px
    - 最小宽度：120px
    - 最大宽度：200px
  - 组合使用：
    - 间距：8px
    - 对齐方式：底部对齐
    - 允许自动换行
9.分页区域规范：
   - 上方分隔线：1px solid #eee
   - 上下间距：16px
   - 按钮样式：
     - 当前页：使用主色调背景
     - 其他页：使用次要按钮样式
     - 禁用状态：背景色#f5f5f5，文字色#d9d9d9
   - 按钮间距：8px
   - 按钮尺寸：32px
   - 文字居中对齐
10.颜色规范：
    - 主色调：#8fd4d2（蒂芙尼蓝）
    - 主色调-浅色：#a8e0de（用于hover效果）
    - 分割线：#eee
    - 背景色：#fff
    - 文字主色：#333
    - 文字次要色：#666
11.统计卡片规范：
   - 布局：使用flex布局，等宽分布
   - 间距：卡片间距16px，内边距16px
   - 阴影：box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
   - 圆角：4px
   - 图标：
     - 字体大小：24px
     - 与文字间距：12px
   - 文字：
     - 标签：14px，#666
     - 数值：24px，加粗
     - 单位：14px，#666
   - 状态样式：
     - 警告：
       - 左边框：4px solid #ff9800
       - 背景色：#fff8e1
       - 文字和图标颜色：#ff9800
     - 危险：
       - 左边框：4px solid #f44336
       - 背景色：#ffebee
       - 文字和图标颜色：#f44336
     - 信息：
       - 左边框：4px solid #2196f3
       - 背景色：#e3f2fd
       - 文字和图标颜色：#2196f3
     - 成功：
       - 左边框：4px solid #4caf50
       - 背景色：#e8f5e9
       - 文字和图标颜色：#4caf50
   - 布局结构：
     - 图标在左
     - 标签文字居中
     - 数值靠右
   - 交互效果：
     - hover时上移2px
     - hover时阴影加深：0 4px 8px rgba(0, 0, 0, 0.15)
     - 过渡动画：0.3s ease
   - 响应式：默认不换行（nowrap），在小屏幕下可换行