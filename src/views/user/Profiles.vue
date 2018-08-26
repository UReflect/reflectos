<template>
  <div id="profiles">
    <v-container grid-list-md>
      <h4 class="title">Choose a profile:</h4>
    </v-container>
    <v-container
      grid-list-md
      text-xs-center>
      <v-layout
        row
        wrap>
        <v-flex>
          <v-card
            dark
            color="primary">
            <v-card-text
              v-for="profile of getProfiles"
              :key="'profile-' + profile.id"
              class="px-0"
              @click="choose(profile)"
              v-text="profile.title" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Profiles',
  computed: mapGetters(['getProfiles']),
  mounted: function () {
    this.pushProfile({
      id: '0',
      title: 'debug',
      modules: []
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
