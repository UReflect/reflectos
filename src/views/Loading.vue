<template>
  <div class="loading">
    <loader
      :process="load"
      @loaded="loaded" />
    <h3 v-text="message" />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import { mapGetters } from 'vuex'

export default {
  name: 'LoadingView',
  components: { Loader },
  data: () => ({ message: 'Reflectos is loading...' }),
  computed: mapGetters(['getMirrorJoinedStatus', 'getMirrorBrokerUser', 'getMirrorBrokerPass']),
  methods: {
    load: function () {
      return new Promise((resolve, reject) => {
        if (this.getMirrorJoinedStatus) {
          this.$broker.connect(this.getMirrorBrokerUser, this.getMirrorBrokerPass, false).then(() => {
            this.$broker.reconnectAuto()
            resolve()
          }).catch((err) => {
            reject(err)
          })
        } else {
          reject(new Error('Mirror need initialization'))
        }
      })
    },
    loaded: function ({ status, res, error }) {
      if (status !== 'success') {
        // this.$router.push({ name: 'profiles' })
        this.$router.push({ name: 'setup' })
      } else {
        this.$router.push({ name: 'profiles' })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .loading
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    flex-direction: column

    h3
      color: white
      font-family: 'Roboto', sans-serif
      font-size: 3.5em
      font-weight: 100
</style>
