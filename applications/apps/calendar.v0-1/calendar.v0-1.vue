<template>
  <div class="widget item">
    <div style="display: flex;height: 100%">
      <datepicker
        :highlighted="highlighted"
        v-model="datePick"
        :value="datePick"
        :inline="true"
        @input="selectDate" />
      <div id="container-right">
        <b-btn
          v-b-modal="'addEvent'"
          class="btn-primary">Add an event for {{ moment(datePick).format('MMM Do YYYY') }}</b-btn>
        <div id="container-events">
          <div
            v-for="event in calendar.getDayEvents(new Date(moment(datePick).format('MM[/]DD[/]YYYY')))"
            :key="event.id"
            class="single-event"
            style="color:white">
            <span>{{ event.name }} {{ event.place ? 'at ' + event.place : '' }}</span>
            <button
              style="float:right;background: transparent;color: white;"
              @click="deleteEvent(event)">X</button>
            <hr>
            <span>{{ event.description }}</span>
          </div>
          <!--<input id="email"-->
          <!--v-model="email"-->
          <!--label="Email"-->
          <!--required>-->
          <!--<keyboard :text.sync="email" :input="'email'"></keyboard>-->
          <!--<input-->
          <!--v-model="password"-->
          <!--:type="'password'"-->
          <!--id="password"-->
          <!--label="password"-->
          <!--data-vv-name="password"-->
          <!--required>-->
          <keyboard
            :text.sync="password"
            :input="'password'" />
        </div>
      </div>
    </div>
    <b-modal
      id="addEvent"
      ref="addEvent"
      size="lg"
      title="Add a new event">
      <b-form @submit="addEvent">
        <b-form-group
          label="Event title :"
          label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter title" />
        </b-form-group>
        <b-form-group
          label="Place :"
          label-for="place">
          <b-form-input
            id="place"
            v-model="form.place"
            type="text"
            placeholder="Enter place" />
        </b-form-group>
        <b-form-group
          label="Description :"
          label-for="desc">
          <b-form-input
            id="desc"
            v-model="form.desc"
            type="text"
            placeholder="Enter description" />
        </b-form-group>
        <b-button
          type="submit"
          variant="primary">Submit</b-button>
      </b-form>
      <footer slot="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="hideModal">Cancel</button>
      </footer>
    </b-modal>
    <keyboard
      :text.sync="form.name"
      :input="'name'" />
    <keyboard
      :text.sync="form.place"
      :input="'place'" />
    <keyboard
      :text.sync="form.desc"
      :input="'desc'" />
  </div>
</template>

<script>
import { Calendar, Event } from 'reflectos-sdk'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'Calendar',
  components: { Datepicker },
  data: () => ({
    calendar: new Calendar(),
    moment: moment,
    showModal: false,
    datePick: new Date(),
    highlighted: { dates: [] },
    events: [],
    form: {
      name: '',
      place: '',
      desc: '',
      date: null
    },
    email: 'email1',
    password: 'password2',
    stateEmail: false,
    statePassword: false
  }),
  methods: {
    hideModal: function () {
      this.$refs.addEvent.hide()
    },
    addEvent: function (evt) {
      evt.preventDefault()
      this.calendar.addEvent(new Event(this.form.name, new Date(this.datePick), this.form.place, this.form.desc))

      this.highlighted['dates'].push(new Date(this.datePick))
      this.form.name = ''
      this.form.place = ''
      this.form.desc = ''
      this.$refs.addEvent.hide()
      document.getElementById('addEvent').click()
    },
    selectDate: function () {
      let d = new Date(moment(this.datePick).format('MM[/]DD[/]YYYY'))

      this.events = this.calendar.getDayEvents(d)
    },
    deleteEvent: function (event) {
      this.calendar.removeEvent(event)
    }
  }
}
</script>

<style>

    .vdp-datepicker {
        display: inline-block;
        float: left;
    }

    .single-event {
        border: 1px solid #eee;
        margin-bottom: 10px;
        padding: 10px;
        margin-top: 10px;
        font-size: 12px;
    }

    .vdp-datepicker__calendar {
        height: 100%;
        background: transparent!important;
        color: white;
    }

    .vdp-datepicker__calendar header .next:after {
        border-left: 10px solid white!important;
    }

    .vdp-datepicker__calendar header .prev:after {
        border-right: 10px solid white!important;;
    }

    #container-events hr {
        border-top: 1px solid white!important;;
    }

    .vdp-datepicker__calendar .cell.highlighted {
        background: yellow!important;
        color: black!important;
    }

    .vdp-datepicker__calendar .cell.selected {
        background: #4bd!important;
    }

    #container-right {
        background: transparent;
        border-top:1px solid white;
        border-bottom:1px solid white;
        border-right:1px solid white;
        width:100%;
        padding:0 20px;
        max-height:100%;overflow-y: scroll;
    }
</style>
