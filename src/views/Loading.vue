<template>
  <div class="loading">
    <h1 v-text="message" />
    <loader
      :process="load"
      @loaded="loaded" />
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
        this.$router.push({ name: 'profiles' })
        // this.$router.push({ name: 'setup' })
      } else {
        this.$router.push({ name: 'profiles' })
      }
    }
  }
}
</script>
