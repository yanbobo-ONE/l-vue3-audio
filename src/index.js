/*
 * @Descripttion:
 * @version:
 * @Author: liuyanbobo
 * @Date: 2024-03-29 10:17:11
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-03-29 14:29:07
 */
import lVue3Audio from './package/laudio.vue' // 引入封装好的组件
export { lVue3Audio } //实现按需引入*
const components = [lVue3Audio] // 将来如果有其它组件,都可以写到这个数组里
const install = function (App, options) {
  components.forEach((item) => {
    console.log(item)
    App.component(item.name, item)
  })
}
export default { install } // 批量的引入*
