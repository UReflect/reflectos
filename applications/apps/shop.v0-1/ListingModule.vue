<template>
  <div>
    <h1>STORE</h1>
    <div 
      v-if="modules !== null" 
      style="display: flex;flex-wrap: wrap;justify-content: space-between">
      <a
        v-for="module in modules.data.data"

        :key="module.id"
        style="cursor:pointer;width: 185px;
            margin: 0 15px 15px;height: 150px;padding: 25px 12.5px;background: rgba(198, 172, 146, 0.8);color: white;text-align: left"
        class="single-module"
        @click.native="switchComponent('singleModule', module.ID)">
        <div style="font-size: 25px;font-weight: bold;line-height: 25px;word-wrap: break-word;text-overflow: ellipsis;white-space: nowrap;overflow: hidden">
          {{ module.title }}
        </div>
        <p
          style="font-size: 14px;
    margin-top: 15px;
    overflow: hidden;
    height: 42px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; ">
          {{ module.description }}
        </p>
        <p>
          <i
            v-for="i in module.rating"
            :key="i"
            class="fas fa-star"/>
          <i
            v-for="i in range(module.rating + 1, 5)"
            :key="i"
            class="far fa-star"/>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ListingModule',
    components: {},
    props: {},

    data() {
      return {
        modules: null
      }
    },
    mounted() {
      const token = "hb2YgWWiTGA6PWrdJDaMBIh2nDmkMs85F6TbPbqIl6yIlQXkGmZ4-AH4t0c464GwW4BBA348u7EvuJfCTB-KEybFLL105nOydDpgZkmQFCO7dxr0vqMbdmKjjYN6klXhKshZxNXhJVfyeeQfACrzUTIU3_Rlm13AgpdWUMgB6wU=";

      const instance = axios.create({
        baseURL: 'https://api.dev.ureflect.io/v1',
        timeout: 1000,
        headers: {'x-access-token': token}
      });
      instance
        .get('/modules')
        .then((response) => {
          this.modules = response
        })
    },
    methods: {
      range: function(min,max){
        var array = [],
          j = 0;
        for(var i = min; i <= max; i++){
          array[j] = i;
          j++;
        }
        return array;
      },
      switchComponent(comp, module_id) {
        this.$emit('switchComp', [comp, module_id]);
      },
      loadModuleView: function () {
      }
    },
  }
</script>

<style scoped>
    @import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');

    h1 {
      color: #c6ac92;
    }

</style>

