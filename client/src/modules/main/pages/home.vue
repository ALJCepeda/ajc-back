<template>
  <div class="timeline">
    <timeline-intro class="intro"></timeline-intro>

    <div class="cards">
      <timeline-card
        v-for="(entry, index) in entries"
        :key="entry.id"
        v-model="entries[index]"
        style="margin-bottom:15px;"
        @removed="removed"
        @submitted="submitted"
      ></timeline-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TimelineIntro from "@/modules/timeline/components/info.vue";
import TimelineCard from "@/modules/timeline/components/TimelineCard.vue";
import {TimelineActions} from "@/modules/timeline/store/actions";
import {Component} from "vue-property-decorator";
import TimelineEntry from 'ajc-shared/dist/models/TimelineEntry';

@Component({
  name:'HomeComponent',
  components: { TimelineIntro, TimelineCard }
})
export default class HomeComponent extends Vue {
  page:number = 1;
  entries:TimelineEntry[] = [];
  fetchingEntries:boolean = false;

  async created() {
    this.fetchingEntries = true;
    this.entries = await TimelineActions.LOAD.$dispatch({
      limit: 10,
      page: this.page
    });
    this.fetchingEntries = false;
  }

  removed(removedEntry) {
    this.entries = this.entries.filter(entry => entry !== removedEntry);
  }

  submitted(result) {
    result.vm.isEditing = false;
  }
}
</script>

<style lang="less" scoped>
@import "../../../../node_modules/ajc-toolbelt/dist/less/resources/mixins.less";
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
@import "../../../less/variables.less";

.timeline {
  .row-w;
  .jc-between;

  .upTo(923px, {> * {margin: 0 auto;}});
}

.intro {
  width: 320px;
  box-sizing: content-box;
  margin-bottom: 20px;
}

.cards {
  max-width: 550px;
  min-width: 320px;
}
</style>
