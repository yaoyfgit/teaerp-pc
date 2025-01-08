import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/plan',
    name: 'Plan',
    component: () => import('../views/plan/index.vue'),
    meta: {
      title: '计划'
    }
  },
  {
    path: '/plan/create',
    name: 'PlanCreate',
    component: () => import('../views/plan/create.vue'),
    meta: {
      title: '新建计划'
    }
  },
  {
    path: '/plan/follow',
    name: 'PlanFollow',
    component: () => import('../views/plan/follow.vue'),
    meta: {
      title: '计划跟进'
    }
  },
  {
    path: '/plan/adjust',
    name: 'PlanAdjust',
    component: () => import('../views/plan/adjust.vue'),
    meta: {
      title: '计划调整'
    }
  },
  {
    path: '/plan/analysis',
    name: 'PlanAnalysis',
    component: () => import('../views/plan/analysis.vue'),
    meta: {
      title: '计划分析'
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/index.vue'),
    meta: {
      title: '消息'
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine/index.vue'),
    meta: {
      title: '我的'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = `${to.meta.title} - TeaERP`
  next()
})

export default router 