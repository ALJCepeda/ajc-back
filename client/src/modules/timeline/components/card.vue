<template>
  <main class="timeline-card border">
    <div class="header row-nw border-bottom">
      <div class="img row-nw ai-center">
        <a v-if="entry.labelURL && entry.labelURL !== ''"
          :href="entry.labelURL"
          target="_blank">
          <simg :src="entry.imageURL"></simg>
        </a>

        <simg v-if="!entry.labelURL" :src="entry.imageURL"></simg>
      </div>

      <div class="content">
        <div class="top">
          <a v-if="entry.labelURL"
            :href="entry.labelURL"
            target="_blank">
            {{ entry.label }}
          </a>

          <span v-if="!entry.labelURL">{{ entry.label }}</span>
          <span v-if="entry.type"> shared a {{ entry.type }}</span>

          <span class="edit" v-if="isAuthenticated">
            <span v-if="form.editable && !form.editing" @click="form.editing = true">
              edit
            </span>

            <span v-if="form.editable && form.editing"  @click="form.cancel()">
              cancel
            </span>
          </span>
        </div>

        <div class="bottom">
          {{ entry.when | FromNow }}
        </div>
      </div>
    </div>

    <div class="message border-bottom" v-html="entry.message"></div>

    <sform class="form" v-if="form && form.editable && form.editing" :form="form"></sform>
  </main>
</template>

<script lang="ts">
import TimelineEntry from "ajc-shared/src/models/TimelineEntry";
import {Component} from "vue-property-decorator";
import AbstractFormComponent from "@/abstract/AbstractFormComponent";
import { mapGetters } from 'vuex';

@Component({
  computed: mapGetters(['isAuthenticated'])
})
export default class TimelineCard extends AbstractFormComponent<TimelineEntry> {
  name:string = "TimelineCard";

  created() {
    if(this.form.controls.length === 0) {
      this.form.controls = [
        { key:'id', label:'ID', type:'text', readonly:true, hideIfEmpty:true },
        { key:'when', label:'When', type:'datetime' },
        { key:'imageURL', label:'Image URL', type:'text' },
        { key:'label', label:'Label', type:'text' },
        { key:'labelURL', label:'Label Link', type:'text' },
        { key:'message', label:'Message', type:'editor' }
      ];
    }
  }
}
</script>

<style lang="less">
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
@import "../../../less/variables.less";

.sinput[name="message"] .value {
  margin-top:15px;
  width:100%
}

.timeline-card {
  .ck-editor {
    width: 100%
  }

  width: 100%;
  background: @color-white;
  color: black;
  max-width: 550px;
  min-width: 320px;

  .header {
    padding: 10px;

    .img {
      width: 10%;

      img {
        width: 100%;
        height: auto;
      }
    }

    .content {
      width: 90%;
      height: 100%;
      padding: 6px;

      .bottom {
        color: #90949c;
        font-size: 12px;
      }
    }
  }

  .message {
    min-height: 90px;
    padding: 10px;

    p {
      margin-top: 0;
      margin-bottom: 10px;
    }
  }

  .form {
    padding-top: 15px;
  }

  .edit {
    float: right;
    color: @color-blue;
    cursor: pointer;
  }
}
</style>
