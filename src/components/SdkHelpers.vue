<template>
  <notifications />
</template>

<script>
import { SdkManager } from 'reflectos-sdk'

export default {
  name: 'SdkHelpers',
  mounted: function () {
    SdkManager.init({
      emitNotification: (title, type, text) => {
        this.$notify({
          title,
          type,
          text
        })
      }
    })
  }
}
</script>
