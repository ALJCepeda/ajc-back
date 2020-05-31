<template>
  <main class="address-card">
    <div class="header row-nw">
      <h3>Home</h3>
    </div>

    <div class="message">
      <sinput v-model="address.line1" mode="inline" @submit="onSubmit" style="display:block" />
      <sinput v-model="address.line2" mode="inline" @submit="onSubmit" style="display:block" />
      <sinput v-model="address.city" mode="inline" @submit="onSubmit" />,
      <sinput v-model="address.state" mode="inline" @submit="onSubmit" />
      <sinput v-model="address.zipcode" mode="inline" @submit="onSubmit" style="margin-left:5px;"/>
    </div>
  </main>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import Vue from 'vue';
  import Sinput from "@/global/components/sinput.vue";

  interface Address {
    id?:number;
    label: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipcode: number;
    createdOn?:Date;
    updatedOn?:Date;
  }

  interface PersonalAddress extends Address {
    moveIn: Date;
    moveOut: Date;
  }

  @Component({
    components: {Sinput}
  })
  export default class AddressCard extends Vue {
    address:Address = {
      id: 1,
      label: 'Home',
      line1: '858 Grande Regency Pointe',
      line2: '#104',
      city: 'Orlando',
      state: 'Florida',
      zipcode: 32714
    };

    isEditing = false;

    onSubmit() {
      console.log(this.address.line1);
    }
  }
</script>

<style lang="less">
  @import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
  @import "../../../less/variables.less";

  .address-card {
    margin: 10px;
  }
</style>
