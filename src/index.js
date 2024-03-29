import lVue3Audio from './package/laudio.vue' // 引入封装好的组件
export { lVue3Audio } //实现按需引入*
// const coms = [commonsTable] // 将来如果有其它组件,都可以写到这个数组里
const components = [lVue3Audio]
// laudio.name = 'laudio'
// laudio.install = function (Vue) {
//   // 注册组件
//   Vue.component('laudio', laudio)
// }
const install = function (App, options) {
  components.forEach((item) => {
    console.log(item)
    App.component(item.name, item)
  })
}
export default { install } // 批量的引入*
