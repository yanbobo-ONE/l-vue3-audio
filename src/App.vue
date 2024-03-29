<!--
 * @Descripttion: 
 * @version: 
 * @Author: liuyanbobo
 * @Date: 2024-03-27 14:20:23
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-03-28 17:34:20
-->

<template>
  <div></div>
  <l-vue3-audio :audioUrl="ttsAudioUrl"
                :isPauseTtsAudio="isPauseTtsAudio"
                :backSecond="backSecond"
                :forwardSecond="forwardSecond"
                :color1="color1"
                :color2="color2"></l-vue3-audio>
</template>
<script setup>
import { ref } from "vue"
const ttsAudioUrl = ref('http://music.163.com/song/media/outer/url?id=447925558.mp3')
const isPauseTtsAudio = ref(false)
const forwardSecond = ref()
const backSecond = ref()
const color1 = ref()
const color2 = ref()
</script>
<style scoped>
</style>
