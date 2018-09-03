<template>
  <div id="profiles">
    <v-container
      grid-list-md
      justify-content-center
      text-xs-center>
      <v-layout
        align-center
        justify-space-around
        wrap>
        <v-avatar
          v-for="profile of getProfiles"
          :key="'profile-' + profile.id"
          color="teal"
          size="256px"
          @click="choose(profile)">
          <span class="white--text display-4 font-weight-black text-capitalize">{{ profile.title[0] }}</span>
        </v-avatar>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Profiles',
  computed: mapGetters(['getProfiles', 'getMirrorBrokerUser', 'getMirrorBrokerPass']),
  mounted: function () {
    this.$broker.connect('guest', 'guest').then(() => {
      this.pushProfile({
        id: '0',
        title: 'debug',
        modules: []
      })
    })
  },
  methods: {
    ...mapMutations(['selectProfile', 'pushProfile', 'pushProvider']),
    choose: function (profile) {
      this.selectProfile(profile)
      this.$router.push({ name: 'lock' })
    }
  }
}
</script>

<style lang="sass">
  #profiles
    height: 100vh
    display: flex
</style>
