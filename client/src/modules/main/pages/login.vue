<template>
  <main class="login col-center">
    <h3 style="margin-bottom:25px;">Login page</h3>

    <div class="form">
      <label>Username:</label> <sinput v-model="credentials.username" type="text" />
      <label>Password:</label> <sinput v-model="credentials.password" type="text" />

      <div class="buttons">
        <button class="btn btn-primary submit" @click="submit()">Login</button>
        <button class="btn btn-warning reset" @click="cancel()">Cancel</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from "vue-property-decorator";
  import {AppActions} from "@/modules/main/store/actions";

  @Component
  export default class LoginComponent extends Vue {
    credentials:ReqT<ILogin> = {
      username: 'vlegm',
      password: 'Password123'
    };

    submit() {
      AppActions.LOGIN.$dispatch(this.credentials).then(() => {
        this.$router.push({ name:'Admin' });
      }).catch(err => {
        console.error('Need to broadcast error', err);
      });
    }

    cancel() {
      this.$router.push({ name:'Home' });
    }
  }
</script>

<style lang="less" scoped>
  .form {
    max-width:350px;
  }
</style>
