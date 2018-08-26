<template>
  <div
    class="widget"
    data-posX="12"
    data-posY="12"
    data-x="7"
    data-y="5">
    <div id="feedRss">
      <ul>
        <li>
          <div
            v-for="(track, index) in articleTitle"
            class="articles">
            <img
              :src="singleImage[index]"
              class="image col-md-6">
            <div class="title col-md-6">
              {{ track }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var parseString = require('xml2js').parseString

export default {
  name: 'FeedRss',

  data () {
    return {
      arrayTitles: {},
      articleTitle: {},
      imgArticle: {},
      singleImage: {}
    }
  },
  mounted () {
    this.getXML()
    this.reloadXml()
  },

  methods: {

    getXML () {
      var self = this
      axios.get('http://www.leparisien.fr/une/rss.xml#xtor=RSS-1481423633')
        .then(response => {
          parseString(response.data, function (err, result) {
            self.events = result
            self.arrayTitles = result.rss.channel[0].item

            var arr = {}
            var img = {}
            var j = 0
            for (let i = 0; i < 20; i++ && j++) {
              arr[i] = self.arrayTitles[i].title[0]
              img[j] = self.arrayTitles[j].enclosure[0].$.url
            }
            self.articleTitle = arr
            self.singleImage = img
            console.log(self.arrayTitles)
            console.log(self.singleImage)
          })
        })
    },

    reloadXml () {
      var self = this
      setInterval(function () {
        self.getXML()
      }, 10000)
    }
  }
}
</script>

<style>
    #feedRss {
        Overflow-y: scroll;
        height: 100%;
    }

    .articles {
        color: white;
        font-size: 17px;
        display: flex;
        align-items:center;
        margin-bottom: 20px;

    }

    .image {
        display: inline;
        width: 200px;
        height: auto;
    }
</style>
