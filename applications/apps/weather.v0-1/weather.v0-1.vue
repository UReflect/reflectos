<template>
  <div
    class="widget"
    data-posX="9"
    data-posY="1"
    data-x="4"
    data-y="4">
    <div id="weather">
      <div id="setting">
        Location:

        <!-- More location ID can be found here http://woeid.rosselliot.co.nz/lookup -->
        <select
          v-model="woeid"
          @change="changeLocation">
          <option
            v-for="city in cities"
            :value="city.woeid">{{ city.name + ", " + city.country }}</option>
        </select>
        <div
          class="btn-add"
          @click="displayKeyboard = !displayKeyboard; displaySubmit = !displaySubmit">
          <span>&#8853;</span>
        </div>
        <form class="myform">
          <input
            v-show="displayKeyboard"
            id="inputCity"
            v-model="cityName"
            class="searchField col-md-6"
            placeholder="City, Country...">
          <button
            v-show="displaySubmit"
            id="submitCity"
            type="button"
            class="col-md-6"
            @click="search()">Add City</button>
        </form>

      </div>

      <div
        v-if="!error"
        id="display">
        <div id="top">
          <div
            v-if="location"
            class="location">{{ location + ", " + countryName }}</div>
            <!--<div class="time">{{ displayDate }}</div>-->
            <!--<div class="status">{{ status }}</div>-->
        </div>

        <div id="left-information">
          <div v-if="location">
            <img
              :src="getThumbnail(status, 64)"
              :alt="status"
              class="thumbnail">
            <div class="temperature">{{ temperature }}</div>
            <div class="unit">°C</div>
          </div>
        </div>

        <div id="forecast">
          <ul>
            <li
              v-for="(f, i) in forecast"
              v-if="i < 4"
              :key="i">
              <div>{{ f.day }}</div>
              <img
                :src="getThumbnail(f.text, 48)"
                :alt="f.text" >
              <b>{{ f.high }}°</b> {{ f.low }}°
            </li>
          </ul>
        </div>
      </div>

      <div v-else="">Location ID error</div>
    </div>
    <keyboard
      :text.sync="cityName"
      :input="'inputCity'" />
  </div>
</template>

<script>
import axios from 'axios'
var parseString = require('xml2js').parseString

export default {
  name: 'Weather',
  data () {
    return {
      woeid: '0982348',
      location: '',
      status: '',
      time: '',
      temperature: '0',
      humidity: '0',
      wind: '0',
      pressure: '0',
      forecast: [],
      error: false,
      latnLong: {},
      displayKeyboard: false,
      displaySubmit: false,
      cityName: '',
      countryName: '',
      newWoeid: '',
      result: document.getElementById('result'),
      cities: [
        {woeid: 28337840, name: 'Los Angeles', country: 'United States'},
        {woeid: 2459115, name: 'New York', country: 'United States'},
        {woeid: 1103816, name: 'Melbourne', country: 'Australia'},
        {woeid: 1225448, name: 'Bangkok', country: 'Thailand'}
      ]
    }
  },
  computed: {
    displayDate () {
      // Slice time
      return this.time.slice(0, 16)
    }
  },

  mounted () {
    this.woeid = 28337840
    this.changeLocation()
  },
  methods: {
    search () {
      console.log(this.cityName)
      var self = this
      if (self.cityName != '') {
        axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22' + self.cityName + '%22&format=xml')
          .then(response => {
            parseString(response.data, function (err, result) {
              self.events = result
              console.log(result)
              self.newWoeid = result.query.results[0].place[0].woeid
              for (let i = 0; i < self.cities.length; i++) {
                if (self.cities[i].name == self.cityName) {
                  self.displayKeyboard = false
                  self.displaySubmit = false
                  return true
                }
              }
              self.cities.push({
                woeid: self.newWoeid,
                name: result.query.results[0].place[0].name,
                country: result.query.results[0].place[0].country[0]._
              })
              self.displayKeyboard = false
              self.displaySubmit = false
              self.cityName = ''
            }).catch(err => {
              console.error(err)
            })
          })
      }
    },
    changeLocation () {
      // Yahoo weather API https://developer.yahoo.com/weather/
      var api =
            'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20' +
            this.woeid +
            "%20and%20u%20%3D%20'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
      var self = this
      console.log('PETIT TEST DES FAMILLE')
      // Call API by Axios https://github.com/mzabriskie/axios
      axios
        .get(api)
        .then(function (response) {
          var channel = response.data.query.results.channel
          if (channel) {
            self.location = channel.location.city
            self.countryName = channel.location.country
            self.time = channel.item.pubDate
            self.status = channel.item.condition.text
            self.temperature = channel.item.condition.temp
            self.forecast = channel.item.forecast
          } else {
            self.error = true
          }
        })
        .catch(function () {
          self.error = true
        })
    },
    getThumbnail (status, size) {
      switch (status.toLowerCase()) {
        case 'hot':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/hot.png'
        case 'sunny':
        case 'mostly sunny':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/sunny.png'
        case 'thunderstorms':
        case 'severe thunderstorms':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/thunderstorms.png'
        case 'scattered thunderstorms':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/rain_s_cloudy.png'
        case 'partly cloudy':
        case 'mostly cloudy':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/partly_cloudy.png'
        case 'cloudy':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/cloudy.png'
        case 'showers':
        case 'scattered showers':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/rain_light.png'
        case 'rain':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/rain.png'
        case 'snow':
        case 'heavy snow':
        case 'snow flurries':
        case 'blowing snow':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/snow.png'
        case 'sleet':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/sleet.png'
        case 'windy':
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/windy.png'
        default:
          return 'https://ssl.gstatic.com/onebox/weather/' + size + '/cloudy.png'
      }
    }
  }
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: arial, sans-serif;
        color: #878787;
    }

    select {
        padding: 5px 10px;
        width: 150px;
        height: 25px;
        font-size: 13px;
        color: #555;
        border: 1px solid #ccc;
    }

    #weather {
        margin: auto;
        max-width: 400px;
        color: white;
    }

    #setting {
        margin: 20px 0;
    }

    #display {
        background-color: clear;
    }

    #top {
        margin-bottom: 20px;
    }

    #top .location {
        font-size: 24px;
        line-height: 1.2;
    }

    #top .time {
        font-size: 16px;
        line-height: 2;
    }

    #top .status {
        font-size: 13px;
        line-height: 1.4
    }

    #left-information {
        color: white;
    }

    #left-information .thumbnail {
        float: left;
        height: 64px;
        width: 64px;
    }

    #left-information .temperature {
        float: left;
        margin-top: -3px;
        padding-left: 10px;
        font-size: 64px;
    }

    #left-information .unit {
        float: left;
        margin-top: 6px;
        font-size: 20px;
    }

    #right-information {
        float: right;
        padding-left: 5px;
        line-height: 22px;
        padding-top: 2px;
        min-width: 43%;
        font-weight: lighter;
    }

    #forecast {
        padding-top: 10px;
        clear: both;
    }

    #forecast ul {
        padding: 0;
        margin: 15px 0 5px 0;
    }

    #forecast ul li {
        display: inline-block;
        height: 90px;
        width: 73px;
        text-align: center;
        line-height: 1;
    }

    select {
        background: white;
        color: black;
        height: 30px;
    }

    .btn-add span {
        color: white;
        font-size: 30px;
    }

    .btn-add {
        color: white;
        font-size: 30px;
        width: 20px;
    }

    #submitCity {
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
        width: 20%;
    }

    .searchField {
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
        width: 50%;
    }
</style>
