<template>
  <div>
    <div
      class="widget"
      data-posX="1"
      data-posY="6"
      data-x="3"
      data-y="2">
      <div
        v-if="analogMode"
        class="clock"
        @click="switchMode()">
        <div class="clock-frame">
          <div class="clock-center"/>
        </div>
        <ul class="digits">
          <li><a>1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a>5</a></li>
          <li><a>6</a></li>
          <li><a>7</a></li>
          <li><a>8</a></li>
          <li><a>9</a></li>
          <li><a>10</a></li>
          <li><a>11</a></li>
          <li><a>12</a></li>
        </ul>
        <div>
          <div
            :style="hourStyle"
            class="clk-hourhand"/>
          <div
            :style="minuteStyle"
            class="clk-minutehand"/>
          <div
            :style="secondStyle"
            class="clk-secondhand"/>
        </div>
      </div>
      <div
        v-if="!analogMode"
        class="clock-numeric"
        @click="switchMode()">
        <span
          v-if="hour > 9"
          class="hour">{{ hour + ' : ' }}</span>
        <span
          v-else
          class="hour">{{ '0' + hour + ' : ' }}</span>
        <span
          v-if="minute > 9"
          class="minute">{{ minute + ' : ' }}</span>
        <span
          v-else
          class="minute">{{ '0' + minute + ' : ' }}</span>
        <span
          v-if="second > 9"
          class="second">{{ second }}</span>
        <span
          v-else
          class="second">{{ '0' + second }}</span>
      </div>
    </div>
    <div
      class="widget"
      data-posX="5"
      data-posY="6"
      data-x="3"
      data-y="1">
      <div class="date">
        <h2>{{ sDay }}, {{ sMonth }} {{ number }}<sup>{{ nieme }}</sup></h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockDate',
  data () {
    return {
      hourStyle: {},
      minuteStyle: {},
      secondStyle: {},
      hour: 0,
      minute: 0,
      second: 0,
      analogMode: true,
      sDay: '',
      sMonth: '',
      number: 0,
      nieme: ''
    }
  },

  mounted () {
    setInterval(this.update, 1000)
  },
  methods: {
    switchMode () {
      this.analogMode = !this.analogMode
    },

    update () {
      let time = new Date(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds()

      this.hour = hour
      this.minute = minute
      this.second = second

      if (hour > 12) {
        hour -= 12
      }

      var hourStyle = {
          transform: 'rotate(' + (hour * 30 + (minute / 2) + 180) + 'deg)'
        },
        minuteStyle = {
          transform: 'rotate(' + (minute * 6 + 180) + 'deg)'
        },
        secondStyle = {
          transform: 'rotate(' + (second * 6 + 180) + 'deg)'
        }
      this.hourStyle = hourStyle
      this.minuteStyle = minuteStyle
      this.secondStyle = secondStyle

      var day = time.getDay()
      var number = time.getDate()
      var month = time.getMonth() + 1

      var sDay, sMonth, nieme = ''

      switch (day) {
        case 1:
          sDay = 'Monday'
          break
        case 2:
          sDay = 'Tuesday'
          break
        case 3:
          sDay = 'Wednesday'
          break
        case 4:
          sDay = 'Thursday'
          break
        case 5:
          sDay = 'Friday'
          break
        case 6:
          sDay = 'Saturday'
          break
        case 0:
          sDay = 'Sunday'
          break
      }

      switch (month) {
        case 1:
          sMonth = 'January'
          break
        case 2:
          sMonth = 'February'
          break
        case 3:
          sMonth = 'March'
          break
        case 4:
          sMonth = 'April'
          break
        case 5:
          sMonth = 'May'
          break
        case 6:
          sMonth = 'June'
          break
        case 7:
          sMonth = 'July'
          break
        case 8:
          sMonth = 'August'
          break
        case 9:
          sMonth = 'September'
          break
        case 10:
          sMonth = 'October'
          break
        case 11:
          sMonth = 'November'
          break
        case 12:
          sMonth = 'December'
          break
      }

      if (number === 1 || number === 21 || number === 31) {
        nieme = 'st'
      } else if (number === 2 || number === 22) {
        nieme = 'nd'
      } else if (number === 3 || number === 23) {
        nieme = 'rd'
      } else {
        nieme = 'th'
      }

      this.sDay = sDay
      this.sMonth = sMonth
      this.nieme = nieme
      this.number = number
    }
  }
}
</script>

<style>
    /* CSS goes in here */
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }

    .clock {
        width: calc(100vw / 12);
        height: calc(100vh / 6);
    }

    .clock-frame {
        width: calc(100vw / 12);
        border: 0.2em solid white;
        border-radius: 100%;
    }

    .clock-frame:before {
        content: "";
        display: block;
        padding-top: 100%;
    }

    .clock-center {
        z-index: 2;
        position: absolute;
        top: calc(100vw / 12 * 64 / 140);
        left: calc(100vw / 12 * 64 / 140);
        width: calc(100vw / 12 * 10 / 140);
        height: calc(100vw / 12 * 10 / 140);
        border-radius: calc(100vw / 12 * 5 / 140);
        background: white;
    }

    .clock .digits {
        font-family: 'Roboto', sans-serif;
        position: absolute;
        top: calc(100vw / 12 * 15 / 140);
        left: calc(100vw / 12 * 15 / 140);
        width: calc(100vw / 12 * 110 / 140);
        margin: 0;
        padding: 0;
    }

    .clock .digits:before {
        content: "";
        display: block;
        padding-top: 100%;
    }

    .clock .digits li {
        display: block;
        position: absolute;
        width: calc(100vw / 12 * 18 / 140);
        height: calc(100vw / 12 * 18 / 140);
        margin: 0;
        padding: 0;
        border-radius: 9px;
        text-align: center;
        font-family: Roboto Regular;
        font-size: 14px;
        line-height: 18px;
    }

    .clock .digits li a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color .4s;
    }

    .clock .digits li:nth-child(1) {
        top: 7%;
        right: 25%;
        margin-top: -9px;
        margin-right: -9px;
    }

    .clock .digits li:nth-child(2) {
        top: 25%;
        right: 7%;
        margin-top: -9px;
        margin-right: -9px;
    }

    .clock .digits li:nth-child(3) {
        top: 50%;
        right: 0;
        margin-top: -9px;
        margin-right: -9px;
    }

    .clock .digits li:nth-child(4) {
        right: 7%;
        bottom: 25%;
        margin-right: -9px;
        margin-bottom: -9px;
    }

    .clock .digits li:nth-child(5) {
        right: 25%;
        bottom: 7%;
        margin-right: -9px;
        margin-bottom: -9px;
    }

    .clock .digits li:nth-child(6) {
        bottom: 0;
        left: 50%;
        margin-bottom: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(7) {
        bottom: 7%;
        left: 25%;
        margin-bottom: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(8) {
        bottom: 25%;
        left: 7%;
        margin-bottom: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(9) {
        top: 50%;
        left: 0;
        margin-top: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(10) {
        top: 25%;
        left: 7%;
        margin-top: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(11) {
        top: 7%;
        left: 25%;
        margin-top: -9px;
        margin-left: -9px;
    }

    .clock .digits li:nth-child(12) {
        top: 0%;
        left: 50%;
        margin-top: -9px;
        margin-left: -9px;
    }

    .clk-hourhand {
        left: calc(100vw / 12 * 68 / 140);
        width: calc(100vw / 12 * 4 / 140);
        height: calc(100vw / 12 * 25 / 140);
        background: rgba(255, 255, 255, 0.8);
    }

    .clk-minutehand {
        left: calc(100vw / 12 * 68 / 140);
        width: calc(100vw / 12 * 4 / 140);
        height: calc(100vw / 12 * 42 / 140);
        background: rgba(255, 255, 255, 0.8);
    }

    .clk-secondhand {
        left: calc(100vw / 12 * 69 / 140);
        width: calc(100vw / 12 * 2 / 140);
        height: calc(100vw / 12 * 42 / 140);
        background: red;
    }

    .clk-hourhand,
    .clk-minutehand,
    .clk-secondhand {
        position: absolute;
        top: calc(100vw / 12 * 70 / 140);
        -moz-transform-origin: top center;
        -ms-transform-origin: top center;
        -o-transform-origin: top center;
        -webkit-transform-origin: top center;
        transform-origin: top center;
    }

    .clock-numeric, .date {
        font-size: 3em;
        color: white;
    }

    .widget {
        float: left;
    }

    #widget-container {
        transition: all 1s;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background-color: rgba(21, 21, 28, 1);
    }
</style>
