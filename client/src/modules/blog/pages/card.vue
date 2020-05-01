<template>
  <main class="blogs-card border">
    <img class="logo" :src="data.imageUrl" />
    <div class="info">
      <div class="title">{{ data.title }}</div>

      <div class="description">{{ data.description }}</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "blog-card",
  props: ["data"]
};
</script>

<style lang="less">
@import "../../../less/variables.less";
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";

.blogs-card {
  .row-nw;
  .ai-center;
  padding-right: 10px;
  width: 425px;
  max-width: 96vw;
  cursor: pointer;

  &:hover {
    background-color: @color-grey3;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .info {
    margin-left: 10px;
    width: 340px;

    .title {
      font-size: 14px;
      font-weight: bold;
      color: @color-blue;
    }

    .description {
      max-height: 50px;
      font-size: 12px;
      color: @color-grey4;
      overflow: hidden;
    }
  }
}
</style>
