<template>
  <div style="display: flex;flex-direction: column">
    <div style="text-align: left;margin-bottom: 15px">
      <a
        id="back-store"
        @click="switchComponent('ListingModule')">
        Back to store</a>
    </div>
    <div v-if="module !== null">
      <h1>{{ module.title }}</h1>
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

      <hr>
      <h2>Description</h2>
      <p>{{ module.description }}</p>
    </div>
  </div>
</template>

<script>
  import * as axios from "axios";

  export default {
    name: 'SingleModule',
    components: {
    },
    props: {
      module_id: {
        type: Number,
        required: true
      },
    },

    data() {
      return {
        module: null,
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
        .get('/module/' + this.module_id)
        .then((response) => {
          this.module = response.data.data
        })
    },
    methods: {
      switchComponent(comp) {
        this.$emit('switchComp', [comp]);
      },
      range: function(min,max){
        var array = [],
          j = 0;
        for(var i = min; i <= max; i++){
          array[j] = i;
          j++;
        }
        return array;
      },
    },
  }
</script>

<style scoped>
    p,h1,h2,.fa {
       color: #c6ac92;
    }
    hr {
        border-color: #c6ac92;
    }
    #back-store {
        background: #c6ac92;
        color: white;
        padding: 5px 15px;
        cursor: pointer;
    }
    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 1.5rem;
    }
</style>

