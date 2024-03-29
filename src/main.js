/*
 * @Descripttion:
 * @version:
 * @Author: liuyanbobo
 * @Date: 2024-03-27 14:20:23
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-03-28 17:23:16
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import lVue3Audio from './index.js'
const app = createApp(App)
app.use(lVue3Audio)
app.use(ElementPlus, {
  locale: locale,
})
app.mount('#app')
