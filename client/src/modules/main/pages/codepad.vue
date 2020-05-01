<template>
  <div>
    <project-card v-bind:data="eval"></project-card>
  </div>
</template>

<script>
import projectCard from "./../components/project-card.vue";

export default {
  name: "codepad",
  components: { projectCard },
  data: function() {
    return {
      eval: {
        title: "Eval",
        description: "This is a test",
        goto: "http://google.com"
      }
    };
  }
};
</script>

<style lang="less"></style>
