<template>
  <main class="about-info">
    <h5>CONTACT INFORMATION</h5>

    <section class="entries">
      <div class="entry">
        <div class="left">Address</div>
        <div class="right">
          <div>
            {{ currentHome.address.number }} {{ currentHome.address.street }}
          </div>
          <div>
            {{ currentHome.address.city.name }},
            {{ currentHome.address.city.shortState }},
            {{ currentHome.address.city.country }} {{ currentHome.address.zip }}
          </div>
        </div>
      </div>

      <div class="entry">
        <div class="left">Email</div>
        <div class="right">{{ email }}</div>
      </div>
    </section>

    <h5>BASIC INFORMATION</h5>
    <section class="entries">
      <div class="entry">
        <div class="left">Birth Date</div>
        <div class="right">{{ birthdate }}</div>
      </div>

      <div class="entry">
        <div class="left">Birth Year</div>
        <div class="right">{{ birthyear }}</div>
      </div>

      <div class="entry">
        <div class="left">Gender</div>
        <div class="right">{{ gender }}</div>
      </div>
    </section>
  </main>
</template>

<script>
import data from "../../../../services/data";

export default {
  name: "info",
  data: function() {
    return {
      gender: data.general.gender,
      phone: data.general.phone,
      email: data.general.email,
      currentHome: data.homes[0],
      birthdate: data.general.birthdate.format("MMMM Do"),
      birthyear: data.general.birthdate.format("YYYY")
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../../../less/variables.less";
@import "../../../../../node_modules/ajc-toolbelt/dist/less/flex.less";

.entry {
  .left {
    width: 30%;
  }
}
</style>
