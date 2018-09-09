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
        :data-widget-infos="JSON.stringify(app.widgetInfos)"
        class="widget"/>
      <div
        v-if="getCurrentProfileEnabledApps.length === 0 || load"
        class="messages widget"
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
            color="blue-grey darken-2"
            class="widget-item white--text">
            <v-card-title primary-title>
              <div class="headline">
                <v-icon>mdi-application</v-icon>
                {{ app.name }}
              </div>
              <div>Description of this app</div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                dark
                @click="enable(app.name)"
                v-text="'Enable'"/>
            </v-card-actions>
          </v-card>
        </div>
      </v-layout>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import * as MC from '@drartemi/mcjs'
import { ipcRenderer } from 'electron'

export default {
  name: 'McJs',
  data: () => ({
    self: null,
    load: false,
    isZoomed: false,
    deleteMode: false,
    zoomarg: true,
    list: [],
    curWidget: { curWidget: null }
  }),
  computed: {
    ...mapGetters(['getCurrentProfile']),
    getCurrentProfileDisabledApps: function () {
      return this.$watcher.applications.slice().reduce((apps, app) => {
        if (this.getCurrentProfile.modules && this.getCurrentProfile.modules.findIndex(m => m.name === app.name) === -1) {
          apps.push({
            name: app.name,
            realName: app.data['name']
          })
        }
        return apps
      }, [])
    },
    getCurrentProfileEnabledApps: function () {
      return this.$watcher.applications.slice().reduce((apps, app) => {
        if (this.getCurrentProfile.modules && this.getCurrentProfile.modules.findIndex(m => m.name === app.name) !== -1) {
          apps.push({
            name: app.name,
            widgetInfos: app.data['widget-info']
          })
        }
        return apps
      }, [])
    }
  },
  mounted: function () {
    this.$watcher.onApplication(() => {
      this.load = true
      setTimeout(() => {
        this.load = false
        this.$nextTick().then(this.init)
      }, 1000)
    })
  },
  methods: {
    ...mapMutations(['enableCurrentProfileApp', 'disableCurrentProfileApp', 'lockProfile']),
    enable: function (name) {
      this.enableCurrentProfileApp(name)
      // this.load = true
      // setTimeout(() => {
      //   this.load = false
      //   this.$nextTick().then(this.init)
      // }, 150)
    },
    disable: function (name) {
      this.disableCurrentProfileApp(name)
      // this.load = true
      // setTimeout(() => {
      //   this.load = false
      //   this.$nextTick().then(this.init)
      // }, 150)
    },
    init: function () {
      this.self = new MC.MC('widget-container', '.widget', [19, 10], false, true)
      //   this.self.on('click', event => {
      //     if (this.deleteMode) {
      //       let module = event.path.find(e => e.dataset.module)
      //       // console.log('module = ', module)
      //       this.disable(module.dataset.module)
      //     }
      //     // console.log('Simple click !!', event)
      //   }).on('dblclick', event => {
      //     // console.log('Double click !!')
      //     this.zoom(this.zoomarg)
      //     this.zoomarg = !this.zoomarg
      //   }).on('pinch', (event, type) => {
      //     if (type === 'in') {
      //       this.zoom()
      //       // console.log('Pinch in !')
      //     } else {
      //       this.zoom(false)
      //       // console.log('Pinch out !')
      //     }
      //   }).on('slide', (event, type) => {
      //     switch (type) {
      //       case 'left':
      //         // console.log('Slide left !')
      //         break
      //       case 'right':
      //         // console.log('Slide Right !')
      //         break
      //     }
      //   })
      ipcRenderer.on('pinchInTB', () => {
        this.zoom()
        this.setWidgets()

        document.addEventListener('mousemove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })
        document.addEventListener('touchmove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })

        document.addEventListener('mouseup', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
        document.addEventListener('touchend', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
      })
      ipcRenderer.on('pinchOutTB', () => {
        this.zoom(false)
        this.setWidgets()

        document.addEventListener('mousemove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })
        document.addEventListener('touchmove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })

        document.addEventListener('mouseup', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
        document.addEventListener('touchend', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
      })
      this.self.onPinch((event, type) => {
        if (type === 'in') {
          this.zoom()
          // console.log('Pinch in !')
        } else {
          this.zoom(false)
          // console.log('Pinch out !')
        }

        this.setWidgets()

        document.addEventListener('mousemove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })
        document.addEventListener('touchmove', (e) => { MC.onTouchMove(e, this.curWidget.curWidget) })

        document.addEventListener('mouseup', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
        document.addEventListener('touchend', (e) => { MC.onTouchEnd(e, this.curWidget.curWidget, this.endDrag) })
      })
    },
    setWidgets: function () {
      // this.enableCurrentProfileApp(name)
      this.list = []
      document.querySelectorAll('.widget-item').forEach((el) => {
        let newEl = el.cloneNode(true)
        el.parentNode.replaceChild(newEl, el)
        this.list.push(new MC.MCWidget(newEl, true, this.curWidget))
      })
    },
    endDrag: function (e, widget) {
      let contx = this.$refs.container.getBoundingClientRect().left
      let conty = this.$refs.container.getBoundingClientRect().top
      let contw = this.$refs.container.getBoundingClientRect().width
      let conth = this.$refs.container.getBoundingClientRect().height

      let pageX = e.touches ? widget.prevx : e.pageX
      let pageY = e.touches ? widget.prevy : e.pageY

      if (pageX > contx && pageX < contx + contw &&
        pageY > conty && pageY < conty + conth) {
        // TODO: Add real module here

        console.warn(widget)
        console.warn(widget.el)
        console.warn(widget.el.dataset.widgetName)
        console.warn(window)
        console.warn(window[widget.el.dataset.widgetName])

        const ComponentClass = Vue.extend(window[widget.el.dataset.widgetName])
        const instance = new ComponentClass()
        instance.$mount() // pass nothing

        console.warn(instance)
        console.warn(instance.$el)
        console.warn(instance.$el.classList)
        console.warn('--------------------')

        instance.$el.classList.add('widget')

        let app = this.$watcher.applications.find(obj => {
          return obj.name === widget.el.dataset.widgetName
        })

        instance.$el.setAttribute('data-widget-infos', JSON.stringify(app.data['widget-info']))

        this.$refs.container.appendChild(instance.$el)
        // instance.$options.methods.changeLocation()

        // this.list.push(instance)

        this.enable(widget.el.dataset.widgetName)
        // widget.el.parentNode.removeChild(widget.el)

        this.self.setWidgets()

        // this.setWidgets()

        // let node = document.createElement('div')
        // var nodeStr = `<div class="widget" data-widgetInfos='{\"posX\": 2, \"posY\": 2, \"sizeX\": 3, \"sizeY\": 3, \"resizable\": true}'><div :is="${widget.el.dataset.widgetName}"></div></div>`
        // node.innerHTML = nodeStr
        // this.$refs.container.appendChild(node.firstChild)
        // this.enable(widget.el.dataset.widgetName)
        // this.self.setWidgets()
      }

      widget.el.parentNode.removeChild(widget.el)
      this.setWidgets()

      this.curWidget.curWidget = null
    },
    zoom: function (inside = true) {
      // console.log('is zooming ahah')
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

</style>
