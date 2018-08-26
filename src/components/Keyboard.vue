<template>
  <div>
    <!--****** KEYBOARD *********-->

    <ul class="keyboard">
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">`</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">~</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">1</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">!</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">2</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">@</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">3</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">#</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">4</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">$</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">5</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">%</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">6</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">^</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">7</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">&amp;</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">8</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">*</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">9</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">(</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">0</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">)</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">-</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">_</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">=</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">+</span></li>
      <li
        class="delete lastitem"
        @click="typeLetter($event)">delete</li>
      <li
        class="tab"
        @click="typeLetter($event)">tab</li>
      <li
        class="letter"
        @click="typeLetter($event)">q</li>
      <li
        class="letter"
        @click="typeLetter($event)">w</li>
      <li
        class="letter"
        @click="typeLetter($event)">e</li>
      <li
        class="letter"
        @click="typeLetter($event)">r</li>
      <li
        class="letter"
        @click="typeLetter($event)">t</li>
      <li
        class="letter"
        @click="typeLetter($event)">y</li>
      <li
        class="letter"
        @click="typeLetter($event)">u</li>
      <li
        class="letter"
        @click="typeLetter($event)">i</li>
      <li
        class="letter"
        @click="typeLetter($event)">o</li>
      <li
        class="letter"
        @click="typeLetter($event)">p</li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">[</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">{</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">]</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">}</span></li>
      <li
        class="symbol lastitem"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">\</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">|</span></li>
      <li
        class="capslock"
        @click="capsLock($event)">caps</li>
      <li
        class="letter"
        @click="typeLetter($event)">a</li>
      <li
        class="letter"
        @click="typeLetter($event)">s</li>
      <li
        class="letter"
        @click="typeLetter($event)">d</li>
      <li
        class="letter"
        @click="typeLetter($event)">f</li>
      <li
        class="letter"
        @click="typeLetter($event)">g</li>
      <li
        class="letter"
        @click="typeLetter($event)">h</li>
      <li
        class="letter"
        @click="typeLetter($event)">j</li>
      <li
        class="letter"
        @click="typeLetter($event)">k</li>
      <li
        class="letter"
        @click="typeLetter($event)">l</li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">;</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">:</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">'</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">&quot;</span></li>
      <li class="return lastitem">return</li>
      <li
        class="left-shift"
        @click="shift()">shift</li>
      <li
        class="letter"
        @click="typeLetter($event)">z</li>
      <li
        class="letter"
        @click="typeLetter($event)">x</li>
      <li
        class="letter"
        @click="typeLetter($event)">c</li>
      <li
        class="letter"
        @click="typeLetter($event)">v</li>
      <li
        class="letter"
        @click="typeLetter($event)">b</li>
      <li
        class="letter"
        @click="typeLetter($event)">n</li>
      <li
        class="letter"
        @click="typeLetter($event)">m</li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">,</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">&lt;</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">.</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">&gt;</span></li>
      <li
        class="symbol"
        @click="typeLetter($event)"><span
          :class="{ off: !isCapsLock, on: isCapsLock }">/</span><span
            :class="{ off: isCapsLock, on: !isCapsLock }">?</span></li>
      <li
        class="right-shift lastitem"
        @click="closeKeyboard()">close</li>
      <li
        class="space lastitem"
        @click="typeLetter($event)">&nbsp;</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  components: {
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    input: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      name: '',
      isCapsLock: false,
      isShift: false
    }
  },
  mounted: function () {
    let current = this.$el.getElementsByClassName('keyboard')[0]

    current.style.display = 'none'

    if (document.getElementById(this.input)) {
      document.getElementById(this.input).addEventListener('click', function () {
        let els = document.getElementsByClassName('keyboard');
        [].forEach.call(els, function (el) {
          el.style.display = 'none'
        })
        current.style.display = 'block'
      })
    }

    window.addEventListener('click', (e) => {
      if (!current.contains(e.target) && document.getElementById(this.input) !== e.target) {
        current.style.display = 'none'
      }
    })
  },
  methods: {
    closeKeyboard () {
      let current = this.$el.getElementsByClassName('keyboard')[0]
      current.style.display = 'none'
    },
    shift () {
      this.isShift = !this.isShift
      if (this.isShift) {
        this.isCapsLock = true
        Array.prototype.forEach.call(document.getElementsByClassName('letter'), function (el) {
          el.className += ' uppercase'
        })
      } else {
        this.isCapsLock = false
        Array.prototype.forEach.call(document.getElementsByClassName('letter'), function (el) {
          el.className = 'letter'
        })
      }
    },
    capsLock () {
      if (this.isShift) {
        this.isShift = false
        this.isCapsLock = false
      }
      this.isCapsLock = !this.isCapsLock
      if (this.isCapsLock) {
        Array.prototype.forEach.call(document.getElementsByClassName('letter'), function (el) {
          el.className += ' uppercase'
        })
      } else {
        Array.prototype.forEach.call(document.getElementsByClassName('letter'), function (el) {
          el.className = 'letter'
        })
      }
    },
    typeLetter (event) {
      if (event.target.innerText === 'tab') {
        this.$emit('update:text', this.text + '\t')
      } else if (event.target.innerText === 'delete') {
        this.$emit('update:text', this.text.substring(0, this.text.length - 1))
      } else {
        this.$emit('update:text', this.text + event.target.innerText)
      }

      if (this.isShift) {
        this.isShift = false
        this.isCapsLock = false
        Array.prototype.forEach.call(document.getElementsByClassName('letter'), function (el) {
          el.className = 'letter'
        })
      }
    }
  }
}
</script>

<style>

    /********* KEYBOARD ***********/

    .hide {
        display: none;
    }

    #container {
        margin: 100px auto;
        width: 688px;
    }

    #write {
        margin: 0 0 5px;
        padding: 5px;
        width: 671px;
        height: 200px;
        font: 1em/1.5 Verdana, Sans-Serif;
        background: #fff;
        border: 1px solid #f9f9f9;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
    }

    .keyboard {
        margin: 0;
        padding: 0;
        list-style: none;
        position: fixed;
        width: 100%;
        right: calc(50% - 330px);
        left: calc(50% - 330px);
        bottom: 0;
        z-index: 9999;
    }

    .keyboard li {
        color: black;
        float: left;
        margin: 0 5px 5px 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #fff;
        border: 1px solid #f9f9f9;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
    }

    .capslock, .tab, .left-shift {
        clear: left;
    }

    .keyboard .tab, .keyboard .delete {
        width: 70px;
    }

    .keyboard .capslock {
        width: 80px;
    }

    .keyboard .return {
        width: 77px;
    }

    .keyboard .left-shift {
        width: 95px;
    }

    .keyboard .right-shift {
        width: 109px;
    }

    .lastitem {
        margin-right: 0;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .keyboard .space {
        clear: left;
        width: 660px;
    }

    .on {
        display: none;
    }

    .keyboard li:hover {
        position: relative;
        top: 1px;
        left: 1px;
        border-color: #e5e5e5;
        cursor: pointer;
    }

</style>
