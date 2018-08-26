<template>
  <div
    data-posX="10"
    data-posY="6"
    data-x="9"
    data-y="4"
    class="widget item">
    <div class="player">
      <video-player
        :options="playerOptions"
        class="vjs-custom-skin"
        @ready="playerReadied"/>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default {
  name: 'Live',
  components: {
    videoPlayer
  },
  props: {
    rtsp: String
  },

  data () {
    return {
      playerOptions: {
        // videojs and plugin options
        height: '360',
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }},
        poster: 'http://ureflect.io/wp-content/uploads/2017/10/ureflect_logo_black.png'
      }
    }
  },

  mounted () {
  },
  methods: {
    playerReadied (player) {
      player.tech_.hls.xhr.beforeRequest = function (options) {
        // console.log(options)
        return options
      }
    }
  }
}
</script>

<style>
    .video-js {
        width: 100%;
    }
</style>
