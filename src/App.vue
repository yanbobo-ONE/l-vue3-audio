<!--
 * @Descripttion: 
 * @version: 
 * @Author: liuyanbobo
 * @Date: 2024-03-27 14:20:23
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-03-29 17:35:07
-->

<template>
  <l-vue3-audio :audioUrl="ttsAudioUrl"
                :isPauseTtsAudio="isPauseTtsAudio"
                :backSecond="backSecond"
                :forwardSecond="forwardSecond"
                :color1="color1"
                :color2="color2">
  </l-vue3-audio>
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
console.log(ttsAudioUrl.value)
const isPauseTtsAudio = ref(false)
const forwardSecond = ref()
const backSecond = ref()
const color1 = ref()
const color2 = ref()
</script>
<style scoped>
</style>
