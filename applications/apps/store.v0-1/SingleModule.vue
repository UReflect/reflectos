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
      <a @click="installModule()" v-if="installed === false">INSTALL MODULE</a>
      <a @click="uninstallModule()" v-if="installed === true">UNINSTALL MODULE</a>
    </div>
  </div>
</template>

<script>
  import * as axios from "axios";
  const electron = window.require("electron");

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
        token: null,
        installed: false
      }
    },
    mounted() {
      axios.post('https://api.dev.ureflect.io/v1/signin', {
        email: 'matthieu@eip.fr',
        password: 'toto42sh'
      }).then((response) => {
        this.getModule(response);
      });

    },
    methods: {
      installModule() {
        electron.ipcRenderer.send('download-module', 'https://s3-eu-west-1.amazonaws.com/modules-dev/78/packages/test+rename+zip.v1-0.zip');
      },
      uninstallModule() {
        this.$watcher.remove(this.module.title.toLowerCase());
      },
      getModule(response) {
        this.token = response.data.data.token

        const instance = axios.create({
          baseURL: 'https://api.dev.ureflect.io/v1',
          timeout: 1000,
          headers: {'x-access-token': this.token}
        });


        instance
          .get('/module/' + this.module_id)
          .then((response) => {
            this.module = response.data.data

              this.$watcher.applications.forEach((app) => {
                if (app.name.toLowerCase() === this.module.title.toLowerCase()) {
                  this.installed = true;
                }
              });
          })
      },
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

