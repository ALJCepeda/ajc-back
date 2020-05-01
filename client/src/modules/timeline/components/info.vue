<template>
  <main class="timeline-intro border">
    <header>
      <div class="title row-nw ai-center">
        <i class="material-icons" style="margin-right:7px;">&#xE80B;</i>Intro
      </div>
    </header>

    <div class="content">
      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Front End Developer at
          <a href="http://app.flightschedulepro.com/" target="_blank"
            >Nikao Corps</a
          >
        </span>
      </div>
      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Full Stack Developer at
          <a href="https://urbanfort.com/" target="_blank">URBANFORT Corps</a>
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Front End Developer at
          <a href="http://www.littlerocket.io/" target="_blank"
            >Little Rocket</a
          >
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Full Stack Developer at
          <a href="http://www.acappellamedia.com/" target="_blank"
            >Acapella Media</a
          >
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          iOS Developer at
          <a href="http://www.reBaked.com" target="_blank">reBaked</a>
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Front End Developer at
          <a href="http://www.asktrak.com" target="_blank">Trustbuilders</a>
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Full Stack Developer at
          <a href="http://www.bonzicentral.com" target="_blank"
            >Bonzi Sports Software</a
          >
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">work</i>

        <span>
          Full Stack Developer at
          <a href="http://www.numedics.com" target="_blank">Numedics</a>
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">&#xE88A;</i>

        <span>
          Lives in
          <a href="https://goo.gl/maps/NfcWPHEqCuF2" target="_blank"
            >Port St Lucie, FL</a
          >
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">&#xE8B4;</i>

        <span>
          From
          <a href="https://goo.gl/maps/QVckXpQgAPE2" target="_blank"
            >Yorktown Heights, New York</a
          >
        </span>
      </div>

      <div class="icon-row">
        <i class="material-icons">&#xE050;</i>

        <span>
          Pronounces name AL-fred si-PE-dah
        </span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "intro",
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
@import "../../../less/variables.less";

.timeline-intro {
  width: 100%;
  padding: 15px;
  align-self: flex-start;
  background: @color-white;
  margin-right: 20px;

  .upToTablet({margin-right: 0px; margin-bottom: 20px;});

  header {
    padding: 0;
    padding-bottom: 10px;
    background-color: @color-white;
    border-bottom: 1px solid @color-greyHr;

    .title {
      font-weight: normal;
      font-size: 16px;
    }
  }

  .content {
    margin-top: 10px;
    font-size: 13px;
    color: @color-black2;

    .icon-row {
      .row-nw;
      .ai-center;
      .jc-start;
    }
  }
}
</style>
