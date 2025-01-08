import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入Vant
import { 
  Button,
  NavBar,
  Icon,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Tag,
  Progress,
  Swipe,
  SwipeItem,
} from 'vant'

// 引入样式
import 'vant/lib/index.css'
import './assets/styles/index.css'

const app = createApp(App)

// 注册Vant组件
const vantComponents = [
  Button,
  NavBar,
  Icon,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Tag,
  Progress,
  Swipe,
  SwipeItem,
]

vantComponents.forEach(component => {
  app.use(component)
})

app.use(createPinia())
app.use(router)

app.mount('#app') 