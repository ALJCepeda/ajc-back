<template>
  <main class="blogs-list border">
    <header class="title">
      <div class="content"><i class="material-icons">&#xE02F;</i>Blog</div>
    </header>

    <section class="list row-w jc-between" v-if="entries.length > 0">
      <blog-card
        v-for="entry in entries"
        :key="entry.id"
        v-bind:data="entry"
        @click.native="clickedBlog(entry)"
      ></blog-card>
    </section>

    <section
      class="row-nw ai-center jc-center"
      v-if="entries.length === 0"
      style="height:150px;"
    >
      <span>No blogs at the moment, please check again later</span>
    </section>
  </main>
</template>

<script>
import blogCard from "./card.vue";

export default {
  name: "blogs-list",
  components: { blogCard },
  data: () => ({
    page: 1,
    entries: [],
    fetchingEntries: false
  }),
  methods: {
    clickedBlog(blog) {
      this.$router.push(`/blogs/${blog.primary_uri}`);
    },
    fetchEntries() {
      this.fetchingEntries = true;
      this.$store.dispatch("blogs/entriesByPage", this.page).then(entries => {
        this.entries = Array.from(entries.values());
        this.fetchingEntries = false;
      });
    }
  },
  created() {
    this.fetchEntries();
  }
};
</script>

<style lang="less" scoped>
@import "../../../less/variables.less";
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";

.blogs-list {
  .list {
    padding: 20px 40px;

    .upToTablet({padding: 20px 0px;});
  }
}
</style>
