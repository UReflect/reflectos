<template>
  <div id="loader">
    <img
      id="logo"
      src="~@/assets/logo.svg"
      alt="reflectos">
    <span class="loader" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    process: { type: Function, required: true }
  },
  data: () => ({ loading: true }),
  mounted: function () {
    this.load()
  },
  methods: {
    load: function () {
      this.loading = true
      this.process().then((res) => {
        this.loading = false
        this.$emit('loaded', { status: 'success', res })
      }).catch((error) => {
        this.$emit('loaded', { status: 'error', res: null, error })
      })
    }
  }
}
</script>

<style lang="sass">

  #loader
    animation-name: pulse
    animation-duration: 2s
    animation-delay: 2s
    animation-timing-function: ease-in-out
    animation-iteration-count: infinite
    vertical-align: middle

  #logo
    height: auto
    width: 420px
    margin: auto
    animation-duration: 4s
    animation-name: fade
    animation-timing-function: ease-in

  @keyframes pulse
    0%
      opacity: 1
      transform: scale(1)
    30%
      transform: scale(1.1)
    60%, 100%
      transform: scale(1)
</style>
