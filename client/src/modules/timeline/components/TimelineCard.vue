<template>
  <main class="timeline-card border">
    <div class="header row-nw border-bottom">
      <div class="img row-nw ai-center">
        <a v-if="entry.labelURL && entry.labelURL !== ''" :href="entry.labelURL"  target="_blank">
          <simg :src="entry.imageURL"/>
        </a>

        <simg v-if="!entry.labelURL" :src="entry.imageURL"/>
      </div>

      <div class="content">
        <div class="top">
          <a v-if="entry.labelURL" :href="entry.labelURL" target="_blank">
            {{ entry.label }}
          </a>

          <span v-if="!entry.labelURL">{{ entry.label }}</span>
          <span v-if="entry.type"> shared a {{ entry.type }}</span>

          <span class="edit" v-if="isAuthenticated">
            <span v-if="!isEditing" @click="edit()">
              edit
            </span>

            <span v-if="isEditing"  @click="cancel()">
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

    <div class="form" v-if="isEditing">
      <label v-if="entry.id">ID:</label> <sinput v-if="entry.id" v-model="entry.id" :editable="false" type="text" />
      <label>When:</label> <sinput v-model="entry.when" type="datetime" />
      <label>Image URL:</label> <sinput v-model="entry.imageURL" type="text" />
      <label>Label:</label> <sinput v-model="entry.label" type="text" />
      <label>Message:</label> <sinput v-model="entry.message" type="editor" />

      <button class="btn btn-primary submit" @click="submit()">Submit</button>
      <button class="btn btn-warning reset" @click="reset()">Reset</button>
      <button class="btn btn-danger remove" v-if="entry.id" @click="remove()">Delete</button>
    </div>
  </main>
</template>

<script lang="ts">
import TimelineEntry from "ajc-shared/src/models/TimelineEntry";
import {Component, Emit, Prop, PropSync, Watch} from "vue-property-decorator";
import { mapGetters } from 'vuex';
import Vue from "vue";
import Sinput from "@/global/components/sinput.vue";

@Component({
  components: {Sinput},
  computed: mapGetters(['isAuthenticated'])
})
export default class TimelineCard extends Vue {
  @Prop()
  value:TimelineEntry;

  @Watch('value')
  onValueChanged(newVal) {
    this.entry = { ...newVal };
  }

  entry:TimelineEntry;

  isEditing:boolean = false;

  name:string = "TimelineCard";

  created() {
    this.entry = { ...this.value };
  }

  @Emit('update:value')
  submit() {
    return this.entry;
  }

  @Emit('update:value')
  reset() {
    this.entry = { ...this.value };
    return this.entry;
  }

  remove() {

  }

  cancel() {
    this.isEditing = false;
  }

  edit() {
    this.isEditing = true;
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
