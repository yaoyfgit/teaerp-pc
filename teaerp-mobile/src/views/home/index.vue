<?xml version="1.0" encoding="UTF-8"?>
<template>
  <div class="page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="TeaERP"
      fixed
      placeholder
    >
      <template #right>
        <van-icon name="bell" size="18" badge="2" @click="onMessageClick" />
      </template>
    </van-nav-bar>

    <!-- 页面内容 -->
    <div class="content">
      <!-- 数据概览 -->
      <div class="overview-card">
        <van-swipe :autoplay="3000" indicator-color="var(--primary-color)">
          <van-swipe-item v-for="item in overviewData" :key="item.id">
            <div class="overview-item">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="trend" :class="item.trend">
                <van-icon :name="item.trend === 'up' ? 'arrow-up' : 'arrow-down'" />
                <span>{{ item.percentage }}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 快捷功能 -->
      <div class="quick-actions">
        <van-grid :column-num="4" :border="false" :gutter="10">
          <van-grid-item v-for="action in quickActions" :key="action.id" :to="action.path">
            <div class="grid-item-content">
              <div class="icon-wrapper" :style="{ background: action.bgColor }">
                <van-icon :name="action.icon" :color="action.iconColor" size="24" />
              </div>
              <span>{{ action.name }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 待办事项 -->
      <div class="todo-section">
        <div class="section-header">
          <span class="title">待办事项</span>
          <van-button size="small" type="primary" plain @click="viewAllTodos">查看全部</van-button>
        </div>
        <div class="todo-list">
          <van-cell-group inset>
            <van-cell v-for="todo in todoList" :key="todo.id" :title="todo.title" :label="todo.time" center>
              <template #right-icon>
                <van-tag :type="todo.tagType" size="medium">{{ todo.status }}</van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>

      <!-- 最近计划 -->
      <div class="plan-section">
        <div class="section-header">
          <span class="title">最近计划</span>
          <van-button size="small" type="primary" plain @click="viewAllPlans">查看全部</van-button>
        </div>
        <div class="plan-list">
          <van-cell-group inset>
            <van-cell v-for="plan in recentPlans" :key="plan.id">
              <template #title>
                <div class="plan-item">
                  <div class="plan-info">
                    <div class="plan-name">{{ plan.name }}</div>
                    <div class="plan-progress">
                      <van-progress 
                        :percentage="plan.progress" 
                        :color="getProgressColor(plan.progress)"
                        :track-color="'var(--bg-secondary)'"
                      />
                    </div>
                  </div>
                  <van-tag :type="plan.status === '进行中' ? 'primary' : 'success'">
                    {{ plan.status }}
                  </van-tag>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/plan" icon="chart-trending-o">计划</van-tabbar-item>
      <van-tabbar-item to="/message" icon="chat-o" badge="2">消息</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref(0)

// 概览数据
const overviewData = ref([
  { id: 1, title: '本月销售额', value: '￥128,960', trend: 'up', percentage: '12.3%' },
  { id: 2, title: '本月订单数', value: '1,286', trend: 'up', percentage: '8.2%' },
  { id: 3, title: '计划完成率', value: '86.5%', trend: 'down', percentage: '3.1%' }
])

// 快捷功能
const quickActions = ref([
  { id: 1, name: '计划制定', icon: 'todo-list-o', path: '/plan/create', bgColor: '#e3f2fd', iconColor: '#1976d2' },
  { id: 2, name: '计划跟进', icon: 'chart-trending-o', path: '/plan/follow', bgColor: '#e8f5e9', iconColor: '#43a047' },
  { id: 3, name: '计划调整', icon: 'edit', path: '/plan/adjust', bgColor: '#fff3e0', iconColor: '#ef6c00' },
  { id: 4, name: '计划分析', icon: 'bar-chart-o', path: '/plan/analysis', bgColor: '#f3e5f5', iconColor: '#8e24aa' }
])

// 待办事项
const todoList = ref([
  { id: 1, title: '审批销售计划', time: '今天 14:30', status: '待处理', tagType: 'warning' },
  { id: 2, title: '更新月度计划进度', time: '今天 16:00', status: '进行中', tagType: 'primary' },
  { id: 3, title: '提交季度计划报告', time: '明天 10:00', status: '待处理', tagType: 'warning' }
])

// 最近计划
const recentPlans = ref([
  { id: 1, name: '2024年Q1销售目标', progress: 75, status: '进行中' },
  { id: 2, name: '生产部Q1成本控制', progress: 90, status: '已完成' },
  { id: 3, name: '市场部推广计划', progress: 45, status: '进行中' }
])

// 获取进度条颜色
const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'var(--success)'
  if (progress >= 50) return 'var(--primary-color)'
  return 'var(--warning)'
}

// 查看全部待办
const viewAllTodos = () => {
  router.push('/todo')
}

// 查看全部计划
const viewAllPlans = () => {
  router.push('/plan')
}

// 查看消息
const onMessageClick = () => {
  router.push('/message')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg-secondary);
  padding-bottom: 50px;
}

.content {
  padding: var(--spacing-md);
}

/* 数据概览卡片 */
.overview-card {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.overview-item {
  padding: var(--spacing-lg) var(--spacing-md);
  text-align: center;
}

.overview-item .title {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.overview-item .value {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
}

.overview-item .trend {
  font-size: var(--font-size-sm);
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.overview-item .trend.up {
  color: var(--success);
}

.overview-item .trend.down {
  color: var(--error);
}

/* 快捷功能 */
.quick-actions {
  margin-bottom: var(--spacing-lg);
}

.grid-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xs);
}

/* 待办事项和计划列表 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding: 0 var(--spacing-sm);
}

.section-header .title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.todo-section,
.plan-section {
  margin-bottom: var(--spacing-lg);
}

.plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
}

.plan-info {
  flex: 1;
}

.plan-name {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.plan-progress {
  width: 100%;
}

/* 自定义 Vant 组件样式 */
:deep(.van-grid-item__content) {
  padding: var(--spacing-md) !important;
}

:deep(.van-cell-group--inset) {
  margin: 0;
}

:deep(.van-tag--medium) {
  padding: 0 var(--spacing-sm);
}
</style> 