<template>
  <main class="about border">
    <header class="title">
      <div class="content">
        <i class="material-icons">&#xE7FD;</i> Admin
        <i class="material-icons hide-downto-tablet"
          style="margin-left:10px;cursor:pointer;"
          @click="showNav()">
          &#xE896;
        </i>
      </div>
    </header>

    <section class="row-nw">
      <nav class="side-nav">
        <router-link to="/admin/timeline">Timeline</router-link>
        <router-link to="/admin/address">Address</router-link>
      </nav>

      <div class="side-nav-content">
        <timeline-panel v-if="$route.params.section === 'timeline'"></timeline-panel>
        <address-panel v-if="$route.params.section === 'address'"></address-panel>
      </div>
    </section>
  </main>
</template>

<script>
import $ from "jquery";
import timelinePanel from "./timeline";
import addressPanel from "./address";

export default {
  name: "admin",
  components: { timelinePanel, addressPanel },
  data: function() {
    return {
      isTablet: false,
      navShowing: true,
      message: "Hello"
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
  },
  created() {
    const $window = $(window);
    let first = false;
    const checkWidth = () => {
      const width = $window.width();
      if (width <= 767) {
        this.$data.isTablet = true;
        if (!first) {
          first = true;
          $("#about-nav").hide();
          this.$data.navShowing = false;
        }
      } else {
        first = false;
        this.$data.isTablet = false;

        if (this.$data.navShowing === false) {
          $("#about-nav").show();
          this.$data.navShowing = true;
        }
      }
    };

    $window.resize(checkWidth);
    checkWidth();

    setTimeout(() => {
      if ($window.width() <= 767) {
        $("#about-nav").hide();
        this.$data.navShowing = false;
      }
    });

    this.$router.beforeEach((to, from, next) => {
      if (this.$data.isTablet === true) {
        $("#about-nav").animate(
          {
            width: "hide"
          },
          350
        );
        this.$data.navShowing = false;
      }

      next();
    });
  }
};
</script>

<style lang="less" scoped>
.sinput {
  margin-bottom: 15px;
}
</style>
