<template>
  <main class="blogs-view border">
    <iframe id="view" width="100%" height="100%" frameBorder="0"></iframe>
  </main>
</template>

<script>
export default {
  name: "blogs-view",
  methods: {
    updateFrame: function(blog) {
      var iframe = document.getElementById("view");
      var doc = iframe.document;
      if (iframe.contentDocument) {
        doc = iframe.contentDocument;
      } else if (iframe.contentWindow) {
        doc = iframe.contentWindow.document;
      }
      doc.open();
      doc.writeln(blog);
      doc.close();
    }
  },
  created() {
    this.$store
      .dispatch("blogs/content", this.$route.params.id)
      .then(content => {
        this.updateFrame(content);
      });
  }
};
</script>

<style lang="less" scoped>
@import "../../../less/variables.less";
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";

.blogs-view {
  #view {
    height: 100vh;
    background: @color-white;
  }
}
</style>
