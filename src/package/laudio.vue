<template>
  <div>
    <audio @timeupdate="updateProgress"
           controls
           autoplay
           ref="audioRef"
           id="myaudio"
           style="display: none">
      <source :src="audioUrl"
              type="audio/mpeg" />
      您的浏览器不支持音频播放
    </audio>
    <div class="audio_right"
         :style="{background:GradientBg}">
      <img class="audio_icon"
           src="../assets/images/Fastrewind.png"
           @click="Fastrewind"
           alt="快退" />
      <span class="advanceRetreat">-{{backSecond}}s</span>
      <img v-if="audioIsPlay"
           @click="playAudio"
           class="audio_icon"
           src="../assets/images/play.png"
           alt="播放" />
      <img v-if="!audioIsPlay"
           @click="playAudio"
           class="audio_icon"
           src="../assets/images/pause.png"
           alt="暂停" />
      <span class="advanceRetreat">+{{forwardSecond}}s</span>
      <img class="audio_icon"
           src="../assets/images/fastForward.png"
           @click="fastForward"
           alt="快进" />
      <el-slider class="slider_box"
                 v-model="currentProgress"
                 :show-tooltip="false"
                 @input="handleProgressChange" />
      <div class="audio_time">
        <span class="audio_current">{{ audioStart }}</span>
        &nbsp;/&nbsp;
        <span class="audio_total">{{ durationTime }}</span>
      </div>
      <div class="volume">
        <div class="volume_progress"
             v-show="audioHuds">
          <el-slider vertical
                     height="100px"
                     class="volume_bar"
                     v-model="audioVolume"
                     :show-tooltip="false"
                     @change="handleAudioVolume" />
          <span class="Volume_Level"> {{ audioVolume}}%</span>
        </div>
        <img class="volume_icon"
             v-if="audioVolume <= 0"
             @click.stop="audioHuds = !audioHuds"
             src="../assets/images/audio_mute.png"
             alt="" />
        <img class="volume_icon"
             v-if="audioVolume > 0"
             @click.stop="audioHuds = !audioHuds"
             src="../assets/images/audio_high.png"
             alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //一定要写组件名
  name: 'l-vue3-audio'
}
</script>
<script setup name='l-vue3-audio'>
import { ref, onMounted, watch, onUnmounted, computed } from "vue";
const props = defineProps({
  audioUrl: String,        //试听的链接
  isPauseTtsAudio: Boolean,    //是否暂停播放试听
  color1: {                //背景颜色
    type: String,
    default: '#9cafe8'
  },
  color2: {                //背景颜色
    type: String,
    default: '#9cebb8'
  },
  backSecond: {
    type: Number,
    default: 3
  },
  forwardSecond: {
    type: Number,
    default: 10
  }
});

const audioIsPlay = ref(true); //音频是否在播放
const audioStart = ref("0:00");
const durationTime = ref("0:00"); //音频的总时长，显示的时间格式
const duration = ref(0); //音频的总时长
const audioVolume = ref(80); //音量的默认值是0.8
const audioHuds = ref(false); //是否显示音量slider
const audioRef = ref(null);
const currentProgress = ref(0);


watch(() => props.isPauseTtsAudio, (newVal, oldVal) => {
  if (newVal) {
    console.log(newVal)
    // 如果 isPauseTtsAudio 为 true，试听暂停
    handleCloseMusic();
  }
}, { deep: true, immediate: true });
//动态背景颜色
const GradientBg = computed(() => {
  return `linear-gradient(to left, ${props.color1}, ${props.color2})`
});
// 暂停
function handleCloseMusic () {
  audioRef.value.pause();
  audioIsPlay.value = true;
}
const handleGlobalClick = (event) => {
  if (!event.target.closest('.volume_icon')) {
    console.log('检测到全局点击');
    audioHuds.value = false
  }
};
onMounted(() => {
  calculateDuration();
  document.addEventListener('click', handleGlobalClick);
});
// 获取音频时长
function calculateDuration () {
  var myVid = audioRef.value;
  myVid.loop = false;
  myVid.src = props.audioUrl;
  // 监听音频播放完毕
  myVid.addEventListener(
    "ended",
    function () {
      audioIsPlay.value = true;
      currentProgress.value = 0;
    },
    false
  );
  if (myVid != null) {
    myVid.oncanplay = function () {
      duration.value = myVid.duration; // 计算音频时长
      durationTime.value = transTime(myVid.duration); //换算成时间格式
    };
    myVid.volume = 0.8; // 设置默认音量50%
    // 进入页面默认开始播放
    // audioRef.value.play();
    // audioIsPlay.value = false;
  }
}
// 音频播放时间换算
function transTime (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedMinutes = String(minutes).padStart(2, "0"); //padStart(2,"0") 使用0填充使字符串长度达到2
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
// 播放暂停控制
function playAudio () {
  if (audioRef.value.paused) {
    audioRef.value.play();
    audioIsPlay.value = false;
  } else {
    audioRef.value.pause();
    audioIsPlay.value = true;
  }
}
// 根据当前播放时间，实时更新进度条
function updateProgress (e) {
  var value = e.target.currentTime / e.target.duration;
  if (audioRef.value.play) {
    currentProgress.value = value * 100;
    audioStart.value = transTime(audioRef.value.currentTime);
  }
}
//调整播放进度
const handleProgressChange = (val) => {
  console.log(val);
  if (!val) {
    return;
  }
  let currentTime = duration.value * (val / 100);
  // 更新音频的当前播放时间
  audioRef.value.currentTime = currentTime;
  audioRef.value.pause();
  audioIsPlay.value = true;
};
//调整音量
const handleAudioVolume = (val) => {
  audioRef.value.volume = val / 100;
};
//鼠标移除音量控件
// const handleMouseLeave = () => {
//   audioHuds.value = false
// }
//快退
const Fastrewind = () => {
  //当前时间
  if (audioRef.value.currentTime > props.backSecond) {
    audioRef.value.currentTime = audioRef.value.currentTime - props.backSecond
    audioRef.value.pause();
    audioIsPlay.value = true;
  }
}
//快进
const fastForward = () => {
  if (audioRef.value.duration - audioRef.value.currentTime > props.forwardSecond) {
    audioRef.value.currentTime = audioRef.value.currentTime + 10
    audioRef.value.pause();
    audioIsPlay.value = true;
  }
}
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>


<style lang="scss" scoped>
.audio_right {
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  // background: linear-gradient(to left, #9cafe8 0%, #9cebb8 100%);
  border-radius: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  .slider_box {
    width: 160px;
    height: 4px;
    border-radius: 5px;
    background-color: #f1f1f1;
    flex: 1;
    margin: 0 8px 4px;
  }
  .audio_icon {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
    cursor: pointer;
  }
  .audio_time {
    color: #f1f1f1;
    overflow: hidden;
    font-size: 12px;
    position: absolute;
    bottom: -1px;
    left: 110px;
    .audio_total {
      float: right;
    }
    .audio_current {
      float: left;
    }
  }
}
.volume {
  position: relative;
  .volume_progress {
    width: 32px;
    height: 140px;
    position: absolute;
    top: -146px;
    right: -4px;
  }
  .volume_bar {
    background: #276bf982;
    border-radius: 4px;
  }
  .volume_icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.el-slider__button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider_box,
.volume_bar {
  .el-slider__button {
    width: 8px;
    height: 8px;
    border: none;
  }
  .el-slider__bar {
    background: #00db15;
  }
}
.slider_box {
  .el-slider__button-wrapper {
    width: 8px;
  }
}
.volume_bar {
  .el-slider__runway {
    margin: 0 14px !important;
  }
}
.Volume_Level {
  font-size: 12px;
  text-align: center;
  width: 100%;
  color: #fff;
  position: absolute;
  bottom: 1px;
  display: block;
}
.advanceRetreat {
  font-size: 12px;
  color: #ffffff;
  width: 20px;
  height: 20px;
  margin: 0 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

