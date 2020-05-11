<template>
  <main class="admin-timeline">
    <div class="row-nw jc-center">
      <timeline-card :form="form"></timeline-card>
    </div>
  </main>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from 'vue';
import TimelineCard from "@/modules/timeline/components/TimelineCard.vue";
import {TimelineActions} from "@/modules/timeline/store/actions";
import { withAction } from '@/factories/FormFactory';

@Component({
  components: { TimelineCard }
})
export default class TimelineComponent extends Vue {
  name:string = "TimelineComponent";

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
  });
}
</script>
