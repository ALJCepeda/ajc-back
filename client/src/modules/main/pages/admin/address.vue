<template>
  <main class="admin-address row-w">
    <address-card></address-card>
    <address-card></address-card>
    <address-card></address-card>
    <address-card></address-card>
  </main>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";
  import Vue from 'vue';
  import AddressCard from "@/modules/main/components/AddressCard.vue";

  @Component({
    components: { AddressCard }
  })
  export default class AdminAddressComponent extends Vue {
    name:string = "AdminAddressComponent";
  }
</script>