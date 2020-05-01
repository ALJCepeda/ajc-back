<template>
  <main class="about-overview rowToCol">
    <section class="entries">
      <div class="entry" v-if="jobs[0] && jobs[1]">
        <img :src="jobs[0].logo" />

        <div class="description">
          <header>
            {{ jobs[0].title }} at
            <a :href="jobs[0].href">
              {{ jobs[0].company }}
            </a>
          </header>

          <footer>
            Past:
            <a :href="jobs[1].href">
              {{ jobs[1].company }}
            </a>
          </footer>
        </div>
      </div>

      <div class="entry" v-if="education['college'] && education['highschool']">
        <img :src="education['college'].logo" />

        <div class="description">
          <header>
            Studied at
            <a :href="education['college'].href">
              {{ education["college"].name }}
            </a>
          </header>

          <footer>
            Past:
            <a :href="education['highschool'].href">
              {{ education["highschool"].name }}
            </a>
          </footer>
        </div>
      </div>

      <div class="entry" v-if="homes['first'] && homes['last']">
        <img :src="homes['first'].logo" />

        <div class="description">
          <header>
            Lives in
            <a :href="homes['last'].address.city.href">
              {{ homes["last"].address.city.name }},
              {{ homes["last"].address.city.state }}
            </a>
          </header>

          <footer>
            From
            <a :href="homes['first'].address.city.href">
              {{ homes["first"].address.city.name }},
              {{ homes["first"].address.city.state }}
            </a>
            · Lived in
            <a :href="city.href"> {{ city.name }}, {{ city.state }} </a>
          </footer>
        </div>
      </div>
    </section>

    <section class="info">
      <div class="icon-row row-nw ai-center subtitle-font">
        <i class="material-icons">email</i>

        <span>
          alfredjcepeda@gmail.com
        </span>
      </div>

      <div class="icon-row row-nw ai-center subtitle-font">
        <i class="material-icons">cake</i>

        <span>
          August 30, 1988
        </span>
      </div>
    </section>
  </main>
</template>

<script>
import data from "../../../../services/data";

export default {
  name: "overview",
  data: function() {
    return {
      jobs: [],
      education: {},
      homes: [],
      city: {}
    };
  },
  created: function() {
    this.jobs = data.jobs;
    this.education = data.indexedEducation;
    this.firstHome = data.homes[data.homes.length - 1];
    this.lastHome = data.homes[0];
    this.city = data.indexedCities["Independence, OR"];
  }
};
</script>

<style lang="less" scoped>
@import "../../../../less/variables.less";

.about-overview {
  .entries {
    width: 62%;

    .upToTablet({width: 100%; order: 2});

    .entry {
      header {
        font-size: 1em;
      }

      .description {
        header {
          color: @color-black1;
        }
      }
    }
  }

  .info {
    width: 35%;
    padding: 20px;

    .upToTablet({width: 100%; padding: 0px; padding-left: 10px; order: 1;});
    .icon-row {
      margin-bottom: 10px;
    }
  }
}
</style>
