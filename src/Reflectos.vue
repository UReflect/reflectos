<template>
  <div id="reflectos">
    <v-app dark>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')

export default {
  name: 'Reflectos',
  mounted: function () {
    ipcRenderer.on('pinchInTB', (event, props) => {
      console.log('need to simulate pinchIn')
    })
    ipcRenderer.on('pinchOutTB', (event, props) => {
      console.log('need to simulate pinchOut')
    })
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
