<template>
  <main class="address-card">
    <div class="header row-nw">
      <h3>Home</h3>
    </div>

    <div class="message">
      <sinput>858 Grand Regency Pointe</sinput>
      <div>#104</div>
      <div>Altamonte Springs, FL 32714</div>
    </div>
  </main>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import AbstractFormComponent from "@/abstract/AbstractFormComponent";

  interface Address {
    id?:number;
    label: string;
    address1: string;
    address2: string;
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

  const example = {
    id: 1,
    label: 'Home',
    address1: '858 Grande Regency Pointe',
    address2: '#104',
    city: 'Orlando',
    state: 'Florida',
    zipcode: 32714
  };

  @Component
  export default class AddressCard extends AbstractFormComponent<Address> {
    created() {
      this.form.commit(example);

      this.form.controls = [
        { key:'id', type:'text', readonly:true, hideIfEmpty:true },
        { key:'label', type:'datetime' },
        { key:'address1', type:'text' },
        { key:'address2', type:'text' },
        { key:'city', type:'text' },
        { key:'state', type:'editor' },
        { key:'zipcode', type:'text'}
      ];
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
