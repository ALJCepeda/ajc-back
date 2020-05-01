<template>
  <main class="about-homes">
    <h5>CURRENT CITY AND HOMETOWN</h5>

    <section class="entries">
      <div class="entry">
        <img :src="moocow" />

        <div class="description">
          <header>
            {{ currentHome.address.city.name }},
            {{ currentHome.address.city.state }}
          </header>

          <footer>Current city since {{ currentHome.fullStart }}</footer>
        </div>
      </div>

      <div class="entry">
        <img :src="moocow" />

        <div class="description">
          <header>{{ hometown.name }}, {{ hometown.state }}</header>

          <footer>
            Hometown
          </footer>
        </div>
      </div>
    </section>

    <h5>OTHER PLACES LIVED</h5>

    <section class="entries">
      <div class="entry" v-for="city in otherCities">
        <img :src="moocow" />

        <div class="description">
          <header>{{ city.name }}, {{ city.state }}</header>

          <footer>Moved on {{ city.fullEnd }}</footer>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { uniq } from "lodash";
import data from "../../../../services/data";

export default {
  name: "homes",
  data: function() {
    return {
      homes: [],
      currentHome: null,
      hometown: null
    };
  },
  created: function() {
    const homes = data.homes.slice();

    this.currentHome = homes.shift();
    this.hometown = data.cities.find(city => city.isHometown);

    const otherCities = homes
      .filter(home => {
        return (
          home.address.city !== this.currentHome.address.city &&
          home.address.city !== this.hometown
        );
      })
      .map(home => {
        const city = home.address.city;
        city.fullEnd = home.fullEnd;
        return city;
      });
    this.otherCities = uniq(otherCities);
  }
};
</script>

<style lang="less" scoped>
@import "../../../../less/variables.less";
@import "../../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
</style>
