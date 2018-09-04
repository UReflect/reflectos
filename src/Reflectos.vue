<template>
  <div id="reflectos">
    <sdk-helpers />
    <v-app dark>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { Notification, Calendar, Event, CacheManager } from 'reflectos-sdk'

window['Notification'] = Notification
window['Calendar'] = Calendar
window['Event'] = Event
window['CacheManager'] = CacheManager

export default {
  name: 'Reflectos',
  mounted: function () {
    // create a simple notification
    let notif = new Notification('hello', 'info', 'This is a simple information')
    notif.emit('main-renderer', 1)
    notif.emitAt('main-renderer', 1, '*/5 * * * * *')
  }
}
</script>

<style lang="scss">

  * {
    user-select: none;
  }

  html, body {
    margin: 0;
    padding: 0;
    #app {
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #fefefe;
      background: #000;
      height: 100vh !important;
      width: 100vw !important;
      overflow: hidden;
    }
  }
</style>
