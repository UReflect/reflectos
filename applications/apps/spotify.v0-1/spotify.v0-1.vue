<template>
  <!--HTML goes in here-->
  <div
    id="page"
    class="spotify-module">
    <div
      class="widget"
      data-posX="2"
      data-posY="8"
      data-x="4"
      data-y="2">
      <img
        id="spotify-logo"
        src="~@/assets/Spotify.png">
      <div class="buttonInside">
        <input
          v-model="message"
          class="inputSearch"
          placeholder="Type a song...">
        <button
          id="erase"
          @click="search()">
          <img
            class="iconSearch"
            src="~@/assets/searchicon.png">
        </button>
      </div>

      <ul>
        <li
          v-for="track in tracks_display"
          :key="track.id"
          @click="play(track.uri)">
          {{ track.name }}
        </li>
      </ul>

      <div class="player-controls__buttons">
        <button
          v-if="!shuffleState"
          class="control-button spoticon-shuffle-16"
          title="Activer la lecture aléatoire"
          @click="shuffleTrack(shuffleState)"/>
        <button
          v-if="shuffleState"
          class="control-button spoticon-shuffle-16 control-button--active control-button--active-dot"
          title="Disable shuffle"
          @click="shuffleTrack(shuffleState)"/>
        <button
          class="control-button spoticon-skip-back-16"
          title="Précédent"
          @click="prevTrack()"/>
        <button
          v-if="playBool"
          class="control-button spoticon-pause-16 control-button--circled"
          title="Pause"
          @click="pause()"/>
        <button
          v-if="!playBool"
          class="control-button spoticon-play-16 control-button--circled"
          title="Lecture"
          @click="resume()"/>
        <button
          class="control-button spoticon-skip-forward-16"
          title="Suivant"
          @click="nextTrack()"/>
        <button
          v-if="!repeatState"
          class="control-button spoticon-repeat-16"
          title="Activer la répétition"
          @click="repeatTrack(repeatState)"/>
        <button
          v-if="repeatState"
          class="control-button spoticon-repeat-16 control-button--active control-button--active-dot"
          title="Enable repeat one"
          @click="repeatTrack(repeatState)"/>
      </div>
    </div>
    <div
      id="deviceId"
      data-value=""/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Spotify',
  data () {
    return {
      message: '',
      tracks: {},
      tracks_display: {},
      playBool: false,
      shuffleState: false,
      repeatState: false,
      currentTrack: ''
    }
  },
  mounted: function () {
    let sdkSpotifyConnectScript = document.createElement('script')
    sdkSpotifyConnectScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
    document.head.appendChild(sdkSpotifyConnectScript)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.$httpSpotify.getBearer()
      const player = new Spotify.Player({
        name: 'uReflect',
        getOAuthToken: cb => { cb(token) }
      })

      // Error handling
      player.on('initialization_error', e => { console.error(e) })
      player.on('authentication_error', e => { console.error(e) })
      player.on('account_error', e => { console.error(e) })
      player.on('playback_error', e => { console.error(e) })

      // Playback status updates
      player.on('player_state_changed', state => { console.log(state) })

      // Ready
      player.on('ready', data => {
        let { device_id } = data
        this.$httpSpotify.setDeviceId(device_id)
      })

      // Connect to the player!
      player.connect()
    }
  },

  methods: {
    search: function () {
      console.log('test =' + this.message)
      this.$httpSpotify.search(this.message, 'track').then(res => {
        this.tracks = res.data.tracks.items
        let arr = {}
        let size = Object.keys(this.tracks).length
        for (let i = 0; i < size && i < 4; i++) {
          arr[i] = this.tracks[i]
        }
        this.tracks_display = arr
        this.message = ''
      }).catch(err => {
        console.error(err)
      })
    },

    play: function (uri) {
      let size = Object.keys(this.tracks).length
      let tracks = new Array(0)

      for (let i = 0; i < size; i++) {
        if (this.tracks[i].uri === uri) {
          tracks.unshift(this.tracks[i].uri)
        } else {
          tracks.push(this.tracks[i].uri)
        }
        this.playBool = true
      }
      this.tracks_display = ''
      Vue.prototype.$httpSpotify.play(tracks).then(function () {
      }).catch(err => {
        console.error(err)
      })
    },

    resume: function () {
      Vue.prototype.$httpSpotify.resume().then(() => {
        this.playBool = true
      }).catch(err => {
        console.error(err)
      })
    },

    pause: function () {
      Vue.prototype.$httpSpotify.pause().then(() => {
        this.playBool = false
      }).catch(err => {
        console.error(err)
      })
    },

    prevTrack: function () {
      Vue.prototype.$httpSpotify.prevTrack().then(() => {
        this.playBool = true
      }).catch(err => {
        console.error(err)
      })
    },

    nextTrack: function () {
      Vue.prototype.$httpSpotify.nextTrack().then(() => {
        this.playBool = true
      }).catch(err => {
        console.error(err)
      })
    },

    getCurrentTrack () {
      if (this.message !== '') {
        Vue.prototype.$httpSpotify.getCurrentTrack().then(function () {
        }).catch(err => {
          console.error(err)
        })
      }
    },

    repeatTrack () {
      this.repeatState = !this.repeatState
      Vue.prototype.$httpSpotify.repeatTrack(this.repeatState).then(function () {
      }).catch(err => {
        console.error(err)
      })
    },

    shuffleTrack () {
      this.shuffleState = !this.shuffleState
      Vue.prototype.$httpSpotify.shuffleTrack(this.shuffleState).then(function () {
        console.log(this.shuffleState)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

    /* CSS goes in here */
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

    .spotify-module * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .loader > h3 {
        display: table-cell;
        text-align: center;
        font-size: 23px;
        font-weight: 100;
        color: #fff;
        opacity: 0;
        animation-name: flash;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        vertical-align: middle;
    }

    .spotify-module input[type=text] {
        width: 130px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
    }

    .spotify-module p {
        margin-left: 10px;
        color: white;
    }

    @font-face {
        font-family: glue1-spoticon;
        src: url('~@/assets/spoticon_regular_2.woff2');
    }

    .player-controls__buttons {
        margin-bottom: 12px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
    }

    .control-button {
        background-color: transparent;
        border: none;
        color: hsla(0, 0%, 100%, .6);
        width: 32px;
        min-width: 32px;
        height: 32px;
        position: relative;
    }

    .spoticon-shuffle-16:before {
        content: "\F144";
        font-size: 16px;
    }

    .spoticon-shuffle-16:before {
        content: "\F144";
        font-size: 16px;
    }

    .spoticon-skip-back-16:before {
        content: "\F146";
        font-size: 16px;
    }

    .spoticon-skip-back-16:before {
        content: "\F146";
        font-size: 16px;
    }

    .spoticon-play-16:before {
        content: "\F132";
        font-size: 16px;
    }

    .spoticon-play-16:before {
        content: "\F132";
        font-size: 16px;
    }

    .control-button--circled:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 500px;
        border: 1px solid hsla(0, 0%, 100%, .6);
    }

    .spoticon-skip-forward-16:before {
        content: "\F148";
        font-size: 16px;
    }

    .spoticon-skip-forward-16:before {
        content: "\F148";
        font-size: 16px;
    }

    .spoticon-repeat-16:before {
        content: "\F13E";
        font-size: 16px;
    }

    [class*=" spoticon-"]:before, [class^=spoticon-]:before {
        font-family: glue1-spoticon;
        font-style: normal;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: inherit;
        vertical-align: bottom;
        display: inline-block;
        text-decoration: inherit;
    }

    .spoticon-repeat-16:before {
        content: "\F13E";
        font-size: 16px;
    }

    .spoticon-pause-16:before {
        content: "\F130";
        font-size: 16px;
    }

    [class*=" spoticon-"]:before, [class^=spoticon-]:before {
        font-family: glue1-spoticon;
        font-style: normal;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: inherit;
        vertical-align: bottom;
        display: inline-block;
        text-decoration: inherit;
    }

    .spotify-module .spoticon-pause-16:before {
        content: "\F130";
        font-size: 16px;
    }

    .spotify-module .control-button--active {
        color: #1db954;
    }

    .spotify-module .buttonInside {
        position: relative;
        width: 225px;
        margin-bottom: 10px;
    }

    .spotify-module .inputSearch {
        border-radius: 20px;
        background-color: #FFFFFF;
        font-family: inherit;
        border-style: solid;
        border-width: 1px;
        border-color: #cccccc;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.75);
        display: block;
        font-size: 0.875rem;
        margin: 0 0 1rem 0;
        padding: 0.5rem;
        height: 2.3125rem;
        width: 100%;
    }

    .spotify-module .iconSearch {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        margin-bottom: 3px;
    }

    .player-controls__buttons {
        width: 100%;
        justify-content: space-between;
    }

    .spotify-module #erase {
        position: absolute;
    }

    .spotify-module button {
        border-radius: 50px;
        right: 0px;
        top: 4px;
        border: none;
        height: 30px;
        width: 30px;
        outline: none;
        text-align: center;
        font-weight: bold;
        padding: 2px;
    }

    .spotify-module button:hover {
        cursor: pointer;
    }

    .spotify-module .widget {
        float: left;
    }

    #spotify-logo {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

</style>
