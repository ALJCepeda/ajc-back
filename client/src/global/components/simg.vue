<template>
  <img :src="(src !== '' && src) || noImage" />
</template>

<script>
export default {
  name: "simg",
  props: ["src"],
  data: function() {
    return {
      noImage: require("../../assets/images/no-image.svg")
    };
  }
};
</script>

<style lang="less"></style>
