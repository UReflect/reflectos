<template>
  <div id="page-component">
    <div
      id="setup-wizard"
      ref="setup">
      <div class="mask"/>
      <div class="setup-wizard">

        <!--INITIALIZING-->
        <div
          v-if="states === setupStates.INITIALIZING_MIRROR"
          class="initialization">
          <h3>{{ $t('setup.initializing') }} ...</h3>
        </div>

        <!--JOINCODE-->
        <div
          v-if="states === setupStates.DISPLAYING_JOIN_CODE"
          class="joinCode">
          <h4>{{ $t('setup.joincode') }} :</h4>
          <h3>{{ getMirrorJoinCode }}</h3>
        </div>

        <div class="wifi">
          <!--SEARCHING WIFI-->
          <div
            v-if="states === setupStates.SEARCHING_WIFI"
            class="progress-bar-container">
            <h3>{{ $t('setup.searchingWiFi') }}</h3>
            <!--<v-progress-linear :indeterminate="true"/>-->
          </div>

          <!--LISTING WIFI NETWORKS-->
          <div
            v-if="states === setupStates.LISTING_WIFI_NETWORKS"
            class="wifi-list-container">
            <v-expansion-panel class="wifi-list-table">
              <v-expansion-panel-content
                v-for="(network, i) in wifiNetworks"
                :key="`network-${network.ssid}-${i}`">
                <div slot="header">{{ network.ssid }}</div>
                <v-card>
                  <v-card-text style="display: flex;justify-content: flex-start;align-items: center;">
                    <v-text-field
                      :name="network.ssid"
                      :id="i"
                      v-model="passwordWifi"
                      label="Password"
                    />
                    <v-icon
                      style="padding: 0 50px"
                      @click="connectWifi(network.ssid)">
                      navigate_next
                    </v-icon>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>

          <!--CONNECTING TO WIFI-->
          <div
            v-if="states === setupStates.CONNECTING_TO_WIFI"
            class="connectingWifi">
            <h4>{{ $t('setup.connectingWiFi') }}</h4>
          </div>

          <!--MIRROR JOINED-->
          <div
            v-if="states === setupStates.WAITING_FOR_USER"
            class="askConfigMirror">
            <h4 style="color: white;">{{ $t('setup.waitForUser') }}</h4>
          </div>

          <div
            v-if="states === setupStates.WAITING_FOR_PROFILE"
            class="askConfigMirror">
            <h4 style="color: white;">{{ $t('setup.waitForProfile') }}</h4>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Setup',
  data: () => ({
    mirror: { broker_password: '', broker_user: '', JoinCode: '' },
    wifiNetworks: [],
    passwordWifi: '',
    states: -1,
    setupStates: {
      UNDEFINED: -1,
      SEARCHING_WIFI: 1,
      LISTING_WIFI_NETWORKS: 2,
      CONNECTING_TO_WIFI: 3,
      AUTH_VIEW: 4,
      authenticating: 5,
      INITIALIZING_MIRROR: 6,
      DISPLAYING_JOIN_CODE: 7,
      WAITING_FOR_USER: 8,
      DISPLAY_MIRROR_NAME: 9
    }
  }),
  computed: mapGetters(['getMirrorBrokerUser', 'getMirrorBrokerPass', 'getMirrorJoinCode']),
  mounted: function () {
    this.states = this.setupStates.INITIALIZING_MIRROR
    this.initMirror()
    // this.$wifi.status().then(connected => {
    //   if (connected) {
    //     this.states = this.setupStates.INITIALIZING_MIRROR
    //     this.initMirror()
    //   } else {
    //     this.searchingWifi()
    //   }
    // }).catch(() => {
    //   this.searchingWifi()
    // })
  },
  methods: {
    ...mapActions(['init', 'redirect']),
    initMirror: function () {
      this.init().then(this.connectBroker).catch(() => {
        this.initMirror()
      })
    },
    searchingWifi: function () {
      this.states = this.setupStates.SEARCHING_WIFI
      this.$wifi.scan().then(networks => {
        this.wifiNetworks = networks
        this.states = this.setupStates.LISTING_WIFI_NETWORKS
      })
    },
    connectBroker: function () {
      this.states = this.setupStates.DISPLAYING_JOIN_CODE
      console.log(this.getMirrorBrokerUser, this.getMirrorBrokerPass)
      this.$broker.connect(this.getMirrorBrokerUser, this.getMirrorBrokerPass).then(() => {
      }).catch((err) => {
        console.error(err)
        this.connectBroker()
      })
      this.$broker.onConnect(() => {
        this.$profileManager.resolveMirrorInfos().then(() => {
          this.states = this.setupStates.WAITING_FOR_USER
          this.$profileManager.resolveUserInfos().then(() => {
            this.states = this.setupStates.WAITING_FOR_PROFILE
            this.$router.push({ name: 'dash' })
          }).catch(this.connectBroker)
        }).catch(this.connectBroker)
      })
    },
    connectWifi: function (ssid) {
      this.states = this.setupStates.CONNECTING_TO_WIFI
      this.$wifi.connect(ssid, this.passwordWifi).then(res => {
        console.log(res)
        if (res) {
          this.states = this.setupStates.INITIALIZING_MIRROR
          this.initMirror()
        } else {
          this.searchingWifi()
          this.states = this.setupStates.SEARCHING_WIFI
        }
      }).catch(() => {
        this.wifiNetworks = []
        this.searchingWifi()
        this.states = this.setupStates.SEARCHING_WIFI
      })
    },
    goToDashboard: function () {
      this.redirect().then(() => {
        this.$router.push({ name: 'dash' })
      })
    }
  }
}
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #setup-wizard {
    overflow: hidden;
    background-color: #000;
    height: 100vh;
    width: 100vw;
    transition: background-color 5s ease-in-out;
  }

  #setup-wizard > .mask {
    background: radial-gradient(ellipse at center center, rgba(21, 21, 28, 0) 0%, rgba(21, 21, 28, 1) 65%);
  }

  #setup-wizard > .setup-wizard,
  #setup-wizard > .setup-wizard .joinCode,
  #setup-wizard > .setup-wizard .authentication,
  #setup-wizard > .setup-wizard .initialization,
  #setup-wizard > .setup-wizard .connectingWifi,
  #setup-wizard > .setup-wizard .askConfigMirror {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #setup-wizard > .setup-wizard h3,
  #setup-wizard > .setup-wizard h4 {
    color: white;
    font-weight: 100;
  }

  #setup-wizard > .setup-wizard h3 {
    font-size: 3.5em;
  }

  #setup-wizard > .setup-wizard h4 {
    font-size: 2em;
  }

  .wifi {
    width: 100%;
    height: 100vh;
  }

  .wifi .progress-bar-container,
  .wifi .wifi-list-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .wifi .progress-bar-container .progress-linear {
    width: 50%;
  }

  .wifi .wifi-list-table {
    width: 50%;
    height: 50vh;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: #545354;
    border: 0px none #ffffff;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #605f60;
  }

  ::-webkit-scrollbar-thumb:active {
    background: #000000;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
    border: 0px none #ffffff;
    border-radius: 0px;
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
