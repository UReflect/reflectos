<template>
  <div>
    <div
      v-if="$broker.debug"
      class="broker-dev">
      <span>Status {{ status }}</span>
      <v-btn @click="$broker.setStatus(100)">Change Status</v-btn>
    </div>
    <mc-js />
  </div>
</template>

<script>
import McJs from './McJs'

export default {
  name: 'Dashboard',
  components: { McJs },
  data: () => ({
    status: 0
  }),
  mounted: function () {
    console.log(this.$broker)
    this.$broker.bindStatus = (status) => {
      this.status = status
    }
    this.status = this.$broker.status
  }
}
</script>

<style lang="scss" scoped>
.broker-dev {
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
