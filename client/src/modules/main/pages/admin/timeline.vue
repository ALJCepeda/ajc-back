<template>
  <main class="admin-timeline">
    <div class="row-nw jc-center">
      <timeline-card v-model="entry" @input="entry = { ...$event }"></timeline-card>
    </div>
  </main>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from 'vue';
import TimelineCard from "@/modules/timeline/components/TimelineCard.vue";
import TimelineEntry from "../../../../../../shared/src/models/TimelineEntry";

@Component({
  components: { TimelineCard }
})
export default class TimelineComponent extends Vue {
  name:string = "TimelineComponent";

  entry:TimelineEntry = {
    imageURL: "https://vuejs.org/images/logo.png",
    labelURL: "https://vuejs.org/",
    label: "Label",
    message: "Timeline Message",
    when: new Date()
  };
}
</script>
