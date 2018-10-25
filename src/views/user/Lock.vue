<template>
  <div class="lock">
    <h1 class="unlock-title">Unlock {{ getCurrentProfile.title }}</h1>
    <v-btn
      flat
      @click="$router.push({ name: 'profiles' })">Go back</v-btn>
    <v-container
      v-if="isLockLoading"
      grid-list-md
      fill-height
      justify-center>
      <h4>Checking code...</h4>
    </v-container>
    <template v-else>
      <v-container
        grid-list-md
        fill-height
        justify-center
        class="lock-container">
        <span v-if="isLockError && code.length === 0">Invalid code, please retry</span>
        <!-- <span class="title">{{ code }}</span> -->
        <span class="input-container">
          <v-icon
            v-for="i in 4"
            :key="'code-pin-' + i"
            :class="{ check: code.length > (i - 1) }"
            large>whatshot</v-icon>
        </span>
        <v-container
          grid-list-md
          text-xs-center
          class="pad">
          <v-layout
            v-for="i in 4"
            :key="'row-' + i"
            row
            wrap>
            <v-flex
              v-for="j in 3"
              :key="'row-' + i + '-col-' + j"
              xs4>
              <v-card
                v-if="((3 * i - 3) + j) !== 10"
                dark
                color="primary"
                class="input"
                @click.native="addInput((3 * i - 3) + j)">
                <v-card-text
                  v-if="((3 * i - 3) + j) <= 9"
                  class="px-0">{{ (3 * i - 3) + j }}</v-card-text>
                <v-card-text
                  v-else-if="((3 * i - 3) + j) === 11"
                  class="px-0">0</v-card-text>
                <v-card-text
                  v-else-if="((3 * i - 3) + j) === 12"
                  class="px-0">&lt;</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Lock',
  data: () => ({
    code: ''
  }),
  computed: mapGetters(['getCurrentProfile', 'isProfileLocked', 'isLockError', 'isLockLoading', 'getMirrorBrokerUser', 'getMirrorBrokerPass']),
  watch: {
    getCurrentProfile: function (profile) {
      if (!profile) {
        this.$router.push({ name: 'profiles' })
      }
    },
    code: function (code) {
      if (code.length === 4) {
        this.unlock()
      }
    },
    isProfileLocked: function (locked) {
      if (!locked) {
        this.$router.push({ name: 'dash' })
      }
    }
  },
  mounted: function () {
    this.lockProfile()
    if (!this.getCurrentProfile) {
      this.$router.push({ name: 'profiles' })
    }
    // this.unlockProfile({ loading: false, error: false, locked: false })
  },
  methods: {
    ...mapMutations(['lockProfile', 'unlockProfile']),
    unlock: function () {
      this.$broker.subscribe(`profiles/${this.getCurrentProfile.id}/verify/status`)
      this.$broker.on(`profiles/${this.getCurrentProfile.id}/verify/status`, this.pinCheck)
      this.unlockProfile({ loading: true, locked: true, error: false })
      this.$broker.publish('pinVerify', `{"type":"PIN_CHECK","data":{"pin":"${this.code}","profileID":${this.getCurrentProfile.id}}}`)
    },
    pinCheck: function (message, packet) {
      console.log('here')
      try {
        let data = JSON.parse(new TextDecoder('utf-8').decode(message))
        this.unlockProfile({ loading: false, locked: !data.success, error: !data.success })
        this.code = ''
      } catch (e) {
        console.log(e)
        this.unlockProfile({ loading: false, locked: true, error: true })
      }
    },
    addInput: function (number) {
      if (number <= 9) {
        this.code = this.code + number.toString()
      } else if (number === 11) {
        this.code = this.code + '0'
      } else if (number === 12) {
        this.code = this.code.slice(0, -1)
      }
    }
  }
}
</script>

<style lang="sass">
body
  font-family: 'Roboto', sans-serif

.unlock-title
  font-weight: 400
  margin-top: 30px
  margin-bottom: 20px
.lock
  height: 100vh
  .lock-container
    flex-direction: column
  .input-container
    border: 1px solid #fff
    border-radius: 4px
    padding: 30px 30px 25px
    i
      margin-left: 10px
      margin-right: 10px
      opacity: 0
      transition: opacity 0.1s ease-in
      &.check
        opacity: 1
      &:first-child
        margin-left: 0px
      &:last-child
        margin-right: 0px
  .pad
    width: 320px
    flex: 0
    .input
      background-color: transparent !important
      font-weight: bold
      border: 1px solid
      border-color: #fff !important
      border-radius: 100px
      width: auto
      margin: auto
      padding: 6px
      font-size: 25px
      transition: all 0.1s ease-in
      &:focus, &:active
        background-color: #fff !important
        color: #000

</style>
