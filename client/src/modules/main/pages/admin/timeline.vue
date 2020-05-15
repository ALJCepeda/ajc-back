<template>
  <main class="admin-timeline">
    <div class="row-nw jc-center">
      <timeline-card v-model="entry"></timeline-card>
    </div>
  </main>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from 'vue';
import TimelineCard from "@/modules/timeline/components/TimelineCard.vue";
import {TimelineActions} from "@/modules/timeline/store/actions";
import { withAction } from '@/factories/FormFactory';
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

  /*
  form = withAction({
    imageURL: "https://vuejs.org/images/logo.png",
    labelURL: "https://vuejs.org/",
    label: "Label",
    message: "Timeline Message",
    when: new Date()
  }, {
    storeActions: () => ({
      submit: TimelineActions.UPSERT
    }),
    editable:true,
    editing:true
  });*/
}
</script>
