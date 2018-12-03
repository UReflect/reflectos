import Vue from 'vue'
import Api from './Api'
import Broker from './Broker'
import FacialRecognition from './FacialRecognition'
import ProfileManager from './ProfileManager'
import Watcher from './Watcher'
// import Wifi from './Wifi'
import VueMoment from 'vue-moment'

Vue.use(Api)
Vue.use(Broker)
Vue.use(FacialRecognition)
Vue.use(ProfileManager)
Vue.use(Watcher)
// Vue.use(Wifi)
Vue.use(VueMoment)
// Vue.use(HttpSpotifyService)
