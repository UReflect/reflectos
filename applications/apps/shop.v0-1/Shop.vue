<template>
  <div
    data-posX="1"
    data-posY="1"
    data-x="13"
    data-y="6"
    class="widget item">
    <component
      :is="dynamicComponent"
      v-bind="dynamicProps"
      style="padding: 25px;"
      @switchComp="switchComp"/>
  </div>
</template>

<script>
  import axios from "axios";
  import ListingModule from "./ListingModule.vue";
  import SingleModule from "./SingleModule.vue";

  export default {
    name: 'Shop',
    components: {
      ListingModule,
      SingleModule
    },
    props: {},

    data() {
      return {
        dynamicComponent: 'ListingModule',
        dynamicProps: ''
      }
    },
    mounted() {
    },
    methods: {
      switchComp (comp) {
        this.dynamicComponent = comp[0];
        this.dynamicProps = {'module_id': comp[1]};
        console.log(comp);
      }
    },
  }
</script>

<style scoped>
  .widget {
    border: 1px solid #c6ac92;
    overflow-y: scroll;
  }

</style>

