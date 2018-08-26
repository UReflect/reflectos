import axios from 'axios'
// import { WatcherService } from './Watcher'

export class HttpSpotifyService {
  constructor () {
    console.log('[Service][HTTPSPOTIFY] Created')
    this.url = 'https://api.spotify.com/v1'
    this.token = ''
    this.deviceId = ''
    this.bearer = ''
    this.getToken().then(res => {
      this.token = res.data['access_token']
    })
  }

  getProvider (providerID) {
    axios.get('http://api.dev.ureflect.io/v1/provider/' + providerID, { headers: {'x-access-token': 'suEQYW25q77S6aosP5NNtVYFNPHKbaRwtF5HAmT1bb5Ng7ImqkwnyL0uB-gGqvYYzmXzPII4I_CSiJP1TA_5DloI9lSd3FY7_GUorNl-vFqAMUMXhtsS9-8roVOVji5LMl0FQyGoFdjw3KcZAA9F8skZkTGJVINCFUUC8V_ICeY='} }).then(response => {
      console.log('RESPONSE PROVIDER: ' + response)
      return response
    }).catch(err => {
      console.error(err)
    })
  }

  setDeviceId (id) {
    this.deviceId = id
  }

  setBearer (b) {
    this.bearer = b
  }

  getBearer () {
    return this.bearer
  }

  getDevices () {
    console.log(this.token)
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
    return HTTP.get('/me/player/devices')
  }

  getToken () {
    return axios.get('http://localhost:3000/spotify/token')
  }

  search (query, type) {
    return this.query(this.url + '/search?' + this.encode({q: query, type: type}))
  }

  play (uri) {
    console.log(uri)
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.put('/me/player/play' + '?device_id=' + this.deviceId, {
      uris: uri
    })
  }

  resume () {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.put('/me/player/play' + '?device_id=' + this.deviceId)
  }

  pause () {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.put('/me/player/pause' + '?device_id=' + this.deviceId)
  }

  prevTrack () {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.post('/me/player/previous' + '?device_id=' + this.deviceId)
  }

  nextTrack () {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.post('/me/player/next' + '?device_id=' + this.deviceId)
  }

  repeatTrack (state) {
    console.log(state)
    var repeatState
    if (state === false) {
      repeatState = 'off'
    } else {
      repeatState = 'track'
    }
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.put('/me/player/repeat?state=' + repeatState)
  }

  shuffleTrack (state) {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.bearer
      }
    })
    return HTTP.put('/me/player/shuffle?state=' + state)
  }

  encode (params) {
    var str = ''
    for (var key in params) {
      if (str !== '') {
        str += '&'
      }
      str += key + '=' + encodeURIComponent(params[key])
    }
    return str
  }

  // send (url, data) {
  //   const HTTP = axios.create({
  //     baseURL: this.url,
  //     headers: {
  //       'Authorization': 'Bearer ' + this.token
  //     }
  //   })
  //   return HTTP.post(url, data).then(res => res)
  // }

  query (url, data) {
    const HTTP = axios.create({
      baseURL: this.url,
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
    return data ? HTTP.get(url, data) : HTTP.get(url)
  }
}

const HttpSpotify = {
  install (Vue) {
    const httpSpotify = new HttpSpotifyService()
    Vue.prototype.$httpSpotify = httpSpotify
    Vue.httpSpotify = httpSpotify
  }
}

export default HttpSpotify
