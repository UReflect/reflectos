<template>
  <div id="page-component">
    <div
      v-show="isZoomed"
      id="page-title"
      ref="title">
      <span>{{ getCurrentProfile.title }} Dashboard</span>
    </div>
    <div
      id="widget-container"
      ref="container">
      <div
        v-for="(app, index) of getCurrentProfileEnabledApps"
        v-show="!load"
        :key="'app-' + index"
        :is="app.name"
        :data-module="app.name"
        :data-widget-infos="app.widgetInfos"
        class="widget"/>
      <div
        v-if="getCurrentProfileEnabledApps.length === 0 || load"
        class="messages"
        data-widget-infos="{&quot;posX&quot;: 1, &quot;posY&quot;: 1, &quot;sizeX&quot;: 1, &quot;sizeY&quot;: 1}">
        <h3 v-if="load">Refreshing...</h3>
        <h3 v-else-if="getCurrentProfileEnabledApps.length === 0">No modules enabled. Pinch out to edit</h3>
      </div>
    </div>
    <div
      v-show="isZoomed"
      id="others"
      ref="others">
      <v-layout
        id="lock"
        column
        justify-space-around>
        <v-icon
          class="icon-lock"
          @click="lock">lock
        </v-icon>
      </v-layout>
    </div>
    <div
      v-show="isZoomed"
      ref="addWidget">
      <v-layout
        id="add-widgets"
        justify-space-around>
        <div
          v-for="app of getCurrentProfileDisabledApps"
          :key="'app-disable-' + app.name"
          class="item-container"
        >
          <v-card
            :data-widget-name="app.name"
            :data-widget-infos="app.widgetInfos"
            color="blue-grey darken-2"
            class="widget-item white--text">
            <v-card-title primary-title>
              <div class="headline">
                <v-icon>mdi-application</v-icon>
                {{ app.name }}
              </div>
            </v-card-title>
          </v-card>
        </div>
      </v-layout>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import * as MC from '@drartemi/mcjs'
import { ipcRenderer } from 'electron'

export default {
  name: 'McJs',
  data: () => ({
    self: { widgets: [] },
    load: false,
    isZoomed: false,
    deleteMode: false,
    zoomarg: true,
    list: [],
    curWidget: { curWidget: null }
  }),
  computed: {
    ...mapGetters(['getCurrentProfile', 'getApplications', 'getMirrorBrokerUser', 'getMirrorBrokerPass', 'getModuleInfosByName']),
    getCurrentProfileDisabledApps: function () {
      return this.getApplications.slice().reduce((apps, app) => {
        if (this.getCurrentProfile.modules && this.getCurrentProfile.modules.findIndex(m => m.name === app.name) === -1) {
          apps.push({
            name: app.name,
            widgetInfos: JSON.stringify(app.data['widget-info']),
            realName: app.data['name']
          })
        }
        return apps
      }, [])
    },
    getCurrentProfileEnabledApps: function () {
      return this.getApplications.slice().reduce((apps, app) => {
        let mIdx = this.getCurrentProfile.modules.findIndex(m => m.name === app.name)
        if (this.getCurrentProfile.modules && mIdx !== -1) {
          // let mapp = { ...this.getCurrentProfile.modules[mIdx] }
          apps.push({
            name: this.getCurrentProfile.modules[mIdx].name,
            widgetInfos: this.getCurrentProfile.modules[mIdx].widgetInfos
          })
        }
        return apps
      }, [])
    }
  },
  watch: {
    getApplications: function (newValue) {
      this.load = true
      setTimeout(() => {
        this.load = false
        this.$nextTick().then(this.init)
      }, 1000)
    },
    self: function (old, newValue) {
      console.log(newValue)
    }
  },
  mounted: function () {
    this.$broker.connect(this.getMirrorBrokerUser, this.getMirrorBrokerPass).then(() => {
      this.$profileManager.listenProfileInstalls(this.getCurrentProfile)
    })
    this.init()
    // this.$watcher.onApplication(() => {
    // })
  },
  methods: {
    ...mapMutations(['enableCurrentProfileApp', 'disableCurrentProfileApp', 'lockProfile', 'changeModuleInfos']),
    enable: function (name, widgetInfos) {
      // console.log(name, widgetInfos)
      this.enableCurrentProfileApp({ name, widgetInfos })
      this.$nextTick().then(() => {
        this.self.setWidgets()
        this.self.widgets.forEach((widget) => {
          this.changeModuleInfos({ name: widget.el.dataset.module, widgetInfos: widget.el.dataset.widgetInfos })
        })
      })
    },
    disable: function (widget) {
      let name = widget.el.dataset.module
      console.log('disabling module name', name)
      this.disableCurrentProfileApp(name)
      this.$nextTick().then(() => {
        this.self.setWidgets()
        this.setWidgets()
        this.self.editModeOn()
      })
    },
    listener: function (event, type) {
      this.zoom(type === 'in')
      this.setWidgets()
      document.addEventListener('mousemove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })
      document.addEventListener('touchmove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })
      document.addEventListener('mouseup', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
      document.addEventListener('touchend', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
    },
    onWidgetMoveEnd: function (e, widget) {
      if (widget.el && widget.el.dataset.widgetInfos && widget.el.dataset.module && widget.el.dataset.widgetInfos !== this.getModuleInfosByName(widget.el.dataset.module)) {
        this.changeModuleInfos({ name: widget.el.dataset.module, widgetInfos: widget.el.dataset.widgetInfos })
      }
    },
    init: function () {
      // let widgets = document.getElementsByClassName('widget')
      // console.log(widgets)
      // this.disableCurrentProfileApp(widgets[0].getAttribute('data-module'))
      this.self = new MC.MC('widget-container', '.widget', [19, 10], false, true, false, null, this.onWidgetMoveEnd)
      this.self.trashFunc = this.disable

      this.self.widgets.forEach((widget) => {
        this.changeModuleInfos({ name: widget.el.dataset.module, widgetInfos: widget.el.dataset.widgetInfos })
      })

      ipcRenderer.on('pinchInTB', () => { this.listener(null, 'in') })
      ipcRenderer.on('pinchOutTB', () => { this.listener(null, 'out') })
      this.self.onPinch(this.listener)
    },
    setWidgets: function () {
      this.list = []
      document.querySelectorAll('.widget-item').forEach((el) => {
        let newEl = el.cloneNode(true)
        el.parentNode.replaceChild(newEl, el)
        this.list.push(new MC.MCWidget(newEl, true, this.curWidget))
      })
    },
    endDrag: function (e, widget) {
      var container = this.$refs.container

      let contx = container.getBoundingClientRect().left
      let conty = container.getBoundingClientRect().top
      let contw = container.getBoundingClientRect().width
      let conth = container.getBoundingClientRect().height

      let pageX = e.touches ? widget.prevx : e.pageX
      let pageY = e.touches ? widget.prevy : e.pageY

      if (pageX > contx && pageX < contx + contw &&
        pageY > conty && pageY < conty + conth) {
        let scaledPageX = pageX - ((container.offsetWidth - container.getBoundingClientRect().width) / 2)
        let scaledPageY = pageY - ((container.offsetHeight - container.getBoundingClientRect().height) / 2)

        let newPosX = Math.min(18, Math.max(0, Math.round(scaledPageX / (contw / 19)) - 1))
        let newPosY = Math.min(9, Math.max(0, Math.round(scaledPageY / (conth / 10)) - 1))

        let wgtInfos = JSON.parse(widget.el.dataset.widgetInfos)

        wgtInfos.posX = newPosX
        wgtInfos.posY = newPosY

        wgtInfos = JSON.stringify(wgtInfos)

        this.enable(widget.el.dataset.widgetName, wgtInfos)
      }

      widget.el.parentNode.removeChild(widget.el)
      this.setWidgets()

      this.curWidget.curWidget = null
    },
    zoom: function (inside = true) {
      var container = this.$refs.container
      var elemWidgets = this.$refs.addWidget
      var elemTitle = this.$refs.title
      var elemOthers = this.$refs.others

      if (!container || !elemWidgets || !elemTitle || !elemOthers) {
        return
      }

      this.isZoomed = inside

      container.style.border = inside ? '1px solid #FFF' : 'none'
      container.style.transform = inside ? 'scale(0.75)' : 'scale(1.0)'

      elemWidgets.style.transition = inside ? 'all 5s' : 'all 1s'
      elemWidgets.style.opacity = inside ? '1' : '0'

      elemTitle.style.transition = inside ? 'all 5s' : 'all 1s'
      elemTitle.style.opacity = inside ? '1' : '0'

      elemOthers.style.transition = inside ? 'all 5s' : 'all 1s'
      elemOthers.style.opacity = inside ? '1' : '0'
    },
    lock: function () {
      this.lockProfile()
      this.$router.push({ name: 'profiles' })
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

  body {
    font-family: 'Roboto', sans-serif;
    background-color: black;
    color: white;
  }

  .messages.widget {
    width: 100vw !important;
    height: 75vh !important;
  }

  .widget {
    overflow: hidden;
  }

  #widget-container {
    transition: all 1s;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  #add-widgets {
    position: absolute;
    margin-right: auto;
    margin-left: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 800px;
  }

  #page-title {
    position: absolute;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    right: 0;
    left: 0;
    top: 0;
    color: white;
    font-size: 52px;
    font-weight: 100;
  }

  #users {
    position: absolute;
    margin-bottom: auto;
    margin-top: auto;
    margin-left: 25px;
    opacity: 0;
    bottom: 0;
    left: 0;
    top: 0;
    height: 500px;
  }

  #others {
    position: absolute;
    margin-bottom: auto;
    margin-top: auto;
    margin-right: 25px;
    right: 0;
    top: 0;
    bottom: 0;
    height: 400px;
  }

  #item1 {
    background-image: url('~@/assets/goku.gif');
    background-size: 100% 100%;
  }

  #item2 {
    background-image: url('~@/assets/wut.gif');
    background-size: 100% 100%;
  }

  #item3 {
    background: url('~@/assets/wow.gif');
    background-size: 100% 100%;
  }

  #item4 {
    background: url('~@/assets/snoop.gif');
    background-size: 100% 100%;
  }

  #item5 {
    background-color: #E65100;
  }

  .demo-item {
    margin: 15px;
  }

  .circled {
    border: 1px solid #FFF;
    border-radius: 50px;
  }

  .align-horizontal {
    float: left;
  }

  .user {
    text-align: center;
    margin-bottom: 50px;
  }

  .user img {
    display: block;
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
  }

  .user span {
    display: block;
    font-size: 18px;
    color: white;
    font-weight: 100;
  }

  #lock > .icon-delete, #lock > .icon-lock {
    font-size: 40px;
  }

  .icon-delete {
    margin-top: 20px;
  }

  #widget-container > .messages {
    display: flex;
    /*width: 100vw !important;*/
    /*height: 80vh !important;*/
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*left: 0!important;*/
  }

  #widget-container > .messages h3 {
    color: white;
    font-weight: 100;
  }

  #widget-container > .messages h3 {
    font-size: 3.5em;
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #6b6b6b;
    border: 0 none white;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #616161;
  }

  ::-webkit-scrollbar-thumb:active {
    background: #1b1b1b;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
    border: 0 none white;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track:hover {
    background: #000000;
  }

  ::-webkit-scrollbar-track:active {
    background: #000000;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>
