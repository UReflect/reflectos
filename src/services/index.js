import Vue from 'vue'
import Api from './Api'
import Broker from './Broker'
import ProfileManager from './ProfileManager'
import Watcher from './Watcher'
import Wifi from './Wifi'
import HttpSpotifyService from './HttpSpotify'
import VueMoment from 'vue-moment'

Vue.use(Api)
Vue.use(Broker)
Vue.use(ProfileManager)
Vue.use(Watcher)
Vue.use(Wifi)
Vue.use(VueMoment)
Vue.use(HttpSpotifyService)
