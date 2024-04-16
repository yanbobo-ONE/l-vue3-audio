<!--
 * @Descripttion: 
 * @version: 
 * @Author: liuyanbobo
 * @Date: 2024-03-27 14:20:23
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-04-16 11:25:08
-->

<template>
  <div>
    <l-vue3-audio :audioUrl="ttsAudioUrl"
                  :isPauseTtsAudio="isPauseTtsAudio"
                  :backSecond="backSecond"
                  :forwardSecond="forwardSecond"
                  :isinit="isinit"
                  :color1="color1"
                  :color2="color2">
    </l-vue3-audio>
    <el-button @click="closeAudio">关闭audio</el-button>
  </div>
</template>
<script setup>
// import lVue3Audio from './src/package/laudio.vue'
import { ref } from "vue"
// const ttsAudioUrl = ref('http://music.163.com/song/media/outer/url?id=447925558.mp3')
//引入本地资源
const getAssetsResource = (name) => {
  return new URL(`/src/assets/${name}`, import.meta.url).href
}
const ttsAudioUrl = ref(getAssetsResource('周深-非你所想.wav'))
const isPauseTtsAudio = ref(true)
const forwardSecond = ref()
const backSecond = ref()
const isinit = ref(false)
const color1 = ref()
const color2 = ref()
const closeAudio = () => {
  // isPauseTtsAudio.value = true
  isinit.value = true
}
</script>
<style scoped>
</style>
