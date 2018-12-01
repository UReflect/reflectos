<template>
  <div>
    <div
      v-if="$broker.debug"
      :class="{ show: bar }"
      class="broker-dev">
      <span>Broker status: {{ status === 200 ? 'OK' : 'KO' }}</span>
      <div class="actions">
        <v-select
          :items="notifs"
          label="Notify"
          @change="emitTestNotif" />
        <v-btn @click="$broker.tryConnect(status === 200)">{{ status === 200 ? 'Disconnect' : 'Connect' }}</v-btn>
      </div>
      <div
        class="switch"
        @click="bar = !bar">
        <i :class="`fa fa-${bar ? 'times' : 'plus'}`" />
      </div>
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
    status: 0,
    bar: false,
    notifs: ['error', 'info', 'warn', 'success']
  }),
  mounted: function () {
    console.log(this.$broker)
    this.$broker.bindStatus = (status) => {
      this.status = status
    }
    this.status = this.$broker.status
  },
  methods: {
    emitTestNotif: function (value) {
      this.$notify({ title: 'sample notification', type: value })
    }
  }
}
</script>

<style lang="scss" scoped>
.broker-dev {
  position: absolute;
  margin: 0;
  padding: 0 2rem;
  z-index: 99999;
  bottom: -72px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  width: 100%;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.25);
  transition: all .2s ease-in;
  &.show {
    bottom: 0;
  }
  .switch {
    background-color: rgba(255, 255, 255, .25);
    position: absolute;
    right: 20px;
    top: -40px;
    border-radius: .25rem .25rem 0 0;
    height: 40px;
    width: 40px;
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-content: center;
  }

  .actions {
    display: inline-flex;
    align-items: center;
    padding: 1rem;
  }
}
</style>
