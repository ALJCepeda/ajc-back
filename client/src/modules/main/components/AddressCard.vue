<template>
  <main class="address-card">
    <div class="header">
      <div class="row-nw ai-center jc-between">
        <h3>{{ address.name }}</h3>

        <span class="edit">
            <span v-if="!isEditing" @click="edit()">
              edit
            </span>

            <span v-if="isEditing" @click="cancel()">
              cancel
            </span>
          </span>
      </div>

      <div>{{ address.line1 }} </div>
      <div v-if="address.line2">{{ address.line2 }}</div>
      <div>{{ address.city }}, {{ address.state }} {{ address.zipcode }}</div>
    </div>

    <div class="form" v-if="isEditing">
      <label>Name:</label> <sinput v-model="address.name" />
      <label>Line1:</label> <sinput v-model="address.line1" />
      <label>Line2:</label> <sinput v-model="address.line2" />
      <label>City:</label> <sinput v-model="address.city" />
      <label>State:</label> <sinput v-model="address.state" />

      <vue-google-autocomplete
        id="map"
        classname="form-control"
        placeholder="Start typing"
        v-on:placechanged="getAddressData"
      >
      </vue-google-autocomplete>

      <div class="buttons">
        <button class="btn btn-primary submit" @click="submit">Submit</button>
        <button class="btn btn-warning reset" @click="reset">Reset</button>
        <button class="btn btn-danger remove" v-if="address.id" @click="remove">Delete</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import Vue from 'vue';
  import Sinput from "@/global/components/sinput.vue";

  interface Address {
    id?:number;
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipcode: number;
    createdOn?:Date;
    updatedOn?:Date;
  }

  @Component({
    components: {Sinput}
  })
  export default class AddressCard extends Vue {
    address:Address = {
      name: 'Home',
      line1: '858 Grande Regency Pointe',
      line2: '#104',
      city: 'Orlando',
      state: 'Florida',
      zipcode: 32714
    };

    isEditing = false;

    submit() {
      console.log(this.address.line1);
    }

    reset() {

    }

    remove() {

    }

    edit() {
      this.isEditing = true;
    }

    cancel() {
      this.isEditing = false;
    }

    getAddressData() {
      debugger;
    }
  }
</script>

<style lang="less">
  @import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
  @import "../../../less/variables.less";

  .address-card {
    margin: 10px;
  }

  .form {
    margin: 25px 0;
  }
</style>
