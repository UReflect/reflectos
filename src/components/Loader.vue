<template>
  <div id="loader">
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
