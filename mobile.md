# TeaERP 移动端开发规范

## 技术栈
- 框架：Vue 3 + TypeScript
- UI组件库：Vant 4
- 构建工具：Vite
- 状态管理：Pinia
- HTTP请求：Axios

## 项目结构
```
teaerp-mobile/
├── src/
│   ├── api/          # API接口定义
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── store/        # 状态管理
│   ├── utils/        # 工具函数
│   └── views/        # 页面组件
├── package.json
└── vite.config.ts
```

## 样式规范

### 1. 布局规范
- 采用 Flex 布局为主
- 页面基本结构：
  ```html
  <template>
    <div class="page">
      <van-nav-bar title="页面标题" />
      <div class="content">
        <!-- 页面内容 -->
      </div>
      <div class="footer">
        <!-- 底部内容 -->
      </div>
    </div>
  </template>
  ```

### 2. 颜色规范
```css
:root {
  /* 主题色 */
  --primary-color: #1976d2;
  --primary-light: #63a4ff;
  --primary-dark: #004ba0;
  
  /* 文字颜色 */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-disabled: #999999;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-disabled: #cccccc;
  
  /* 边框颜色 */
  --border-color: #e8e8e8;
  
  /* 状态颜色 */
  --success: #43a047;
  --warning: #ef6c00;
  --error: #d32f2f;
  --info: #1976d2;

  /* 状态背景色 */
  --success-bg: #e8f5e9;
  --warning-bg: #fff3e0;
  --error-bg: #ffebee;
  --info-bg: #e3f2fd;
}
```

/* 修改状态样式示例 */
.status.pending {
  background: var(--warning-bg);
  color: var(--warning);
}

.status.completed {
  background: var(--success-bg);
  color: var(--success);
}

.status.overdue {
  background: var(--error-bg);
  color: var(--error);
}

.status.not-started {
  background: var(--info-bg);
  color: var(--info);
}

/* 修改进度条颜色示例 */
.progress-bar {
  background-color: var(--bg-secondary);
}

.progress-bar .progress {
  background-color: var(--primary-color);
}

/* 修改按钮颜色示例 */
.tea-button--primary {
  background: var(--primary-color);
  color: white;
}

.tea-button--primary:active {
  background: var(--primary-dark);
}
```

### 3. 字体规范
```css
:root {
  /* 字体大小 */
  --font-size-xs: 10px;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  
  /* 字体粗细 */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 600;
}
```

### 4. 间距规范
```css
:root {
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
}
```

### 5. 组件样式规范

#### 卡片组件
```css
.tea-card {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: var(--spacing-lg);
  margin: var(--spacing-md);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

#### 列表组件
```css
.tea-list {
  background: var(--bg-primary);
}

.tea-list-item {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}
```

#### 按钮组件
```css
.tea-button {
  height: 40px;
  padding: 0 var(--spacing-lg);
  border-radius: 4px;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
}

.tea-button--primary {
  background: var(--primary-color);
  color: white;
}

.tea-button--small {
  height: 32px;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-sm);
}
```

### 6. 响应式设计
- 使用 rem 作为主要单位
- 基准字体大小设置为 37.5px（与 Vant 保持一致）
- 断点设置：
  ```css
  /* 小屏手机 */
  @media screen and (max-width: 320px) {
    html {
      font-size: 32px;
    }
  }
  
  /* 标准手机 */
  @media screen and (min-width: 321px) and (max-width: 375px) {
    html {
      font-size: 37.5px;
    }
  }
  
  /* 大屏手机 */
  @media screen and (min-width: 376px) {
    html {
      font-size: 42px;
    }
  }
  ```

## 开发规范

### 1. 命名规范
- 文件名：小写字母，多个单词用连字符（-）连接
- 组件名：大驼峰命名
- 变量名：小驼峰命名
- CSS类名：BEM命名规范

### 2. TypeScript 规范
- 使用 interface 而不是 type 定义对象类型
- 明确声明函数参数和返回值类型
- 使用 enum 定义常量枚举值

### 3. Vue 组件规范
- 使用 Composition API
- 使用 `<script setup>` 语法
- 组件属性顺序：name, components, props, emits, setup

### 4. 状态管理规范
- 使用 Pinia 进行状态管理
- 按模块划分 store
- 异步操作使用 actions

### 5. 路由规范
- 按模块划分路由
- 使用路由守卫进行权限控制
- 懒加载非首屏路由

## 示例代码

### 页面示例
```vue
<template>
  <div class="page">
    <van-nav-bar
      title="计划列表"
      left-arrow
      @click-left="onBack"
    />
    
    <div class="content">
      <div class="tea-card">
        <van-row>
          <van-col span="12" v-for="item in statistics" :key="item.id">
            <div class="statistics-item">
              <span class="label">{{ item.label }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="tea-list">
          <div class="tea-list-item" v-for="item in list" :key="item.id">
            <div class="item-header">
              <span class="title">{{ item.title }}</span>
              <span class="status" :class="item.status">{{ item.statusText }}</span>
            </div>
            <div class="item-content">
              <van-progress
                :percentage="item.progress"
                :color="getProgressColor(item.progress)"
              />
            </div>
            <div class="item-footer">
              <span class="date">{{ item.date }}</span>
              <div class="actions">
                <van-button size="small" type="primary" @click="viewDetail(item)">查看</van-button>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    
    <div class="footer">
      <van-button type="primary" block @click="createPlan">新建计划</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

// 统计数据
const statistics = ref([
  { id: 1, label: '已完成', value: '18个' },
  { id: 2, label: '进行中', value: '25个' },
  { id: 3, label: '即将到期', value: '5个' },
  { id: 4, label: '完成率', value: '85%' }
])

// 列表数据
const loading = ref(false)
const finished = ref(false)
const list = ref([])

// 加载数据
const onLoad = async () => {
  try {
    // 模拟加载数据
    const newData = await loadMoreData()
    list.value.push(...newData)
    loading.value = false
    if (list.value.length >= 40) {
      finished.value = true
    }
  } catch (error) {
    showToast('加载失败')
    loading.value = false
  }
}

// 查看详情
const router = useRouter()
const viewDetail = (item: any) => {
  router.push(`/plan/detail/${item.id}`)
}

// 新建计划
const createPlan = () => {
  router.push('/plan/create')
}

// 返回上一页
const onBack = () => {
  router.back()
}

// 获取进度条颜色
const getProgressColor = (progress: number) => {
  if (progress >= 80) return '#43a047'
  if (progress >= 50) return '#1976d2'
  return '#ef6c00'
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-secondary);
}

.content {
  flex: 1;
  overflow-y: auto;
}

.statistics-item {
  padding: var(--spacing-md);
  text-align: center;
}

.statistics-item .label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.statistics-item .value {
  display: block;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-xs);
}

.tea-list-item {
  background: var(--bg-primary);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.item-header .title {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.item-header .status {
  font-size: var(--font-size-sm);
  padding: 2px var(--spacing-sm);
  border-radius: 2px;
}

.item-header .status.pending {
  background: #fff3e0;
  color: #ef6c00;
}

.item-header .status.completed {
  background: #e8f5e9;
  color: #43a047;
}

.item-content {
  margin: var(--spacing-md) 0;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-footer .date {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.footer {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-primary);
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}
</style>
