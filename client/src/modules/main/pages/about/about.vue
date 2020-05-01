<template>
  <main class="about border">
    <header class="title">
      <div class="content">
        <i class="material-icons">&#xE7FD;</i>About
        <i
          class="material-icons hide-downto-tablet"
          style="margin-left:10px;cursor:pointer;"
          @click="showNav()"
          >&#xE896;</i
        >
      </div>
    </header>

    <section class="row-nw">
      <nav class="side-nav">
        <router-link to="/about/overview">Overview</router-link>
        <router-link to="/about/work">Work and Education</router-link>
        <router-link to="/about/homes">Places You've Lived</router-link>
        <router-link to="/about/info">Contact and Basic Info</router-link>
        <!--<router-link to='/about/family'>Family and Relationships</router-link>
        <router-link to='/about/details'>Details About You</router-link>
        <router-link to='/about/events'>Life Events</router-link>-->
      </nav>

      <div class="side-nav-content">
        <overview v-if="$route.params.section === 'overview'"></overview>
        <work v-if="$route.params.section === 'work'"></work>
        <homes v-if="$route.params.section === 'homes'"></homes>
        <info v-if="$route.params.section === 'info'"></info>
      </div>
    </section>
  </main>
</template>

<script>
import $ from "jquery";
import overview from "./overview.vue";
import work from "./work.vue";
import homes from "./homes.vue";
import info from "./info.vue";

export default {
  name: "about",
  components: { overview, work, homes, info },
  data: function() {
    return {
      isTablet: false,
      navShowing: true
    };
  },
  props: [],
  methods: {
    showNav: function() {
      $("#about-nav").animate(
        {
          width: "toggle"
        },
        350
      );

      this.$data.navShowing = !this.$data.navShowing;
    }
  }
};
</script>
