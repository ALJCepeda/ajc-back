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
            <span v-if="!viewState.isEditing" @click="edit()">
              edit
            </span>

            <span v-if="viewState.isEditing" @click="cancel()">
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

    <div class="form" v-if="viewState.isEditing">
      <label v-if="entry.id">ID:</label> <sinput v-if="entry.id" v-model="entry.id" :editable="false" type="text" />
      <label>When:</label> <sinput v-model="entry.when" type="datetime" />
      <label>Image URL:</label> <sinput v-model="entry.imageURL" type="text" />
      <label>Label:</label> <sinput v-model="entry.label" type="text" />
      <label>Message:</label> <sinput v-model="entry.message" type="editor" />

      <div class="buttons">
        <button class="btn btn-primary submit" @click="submit()">Submit</button>
        <button class="btn btn-warning reset" @click="reset()">Reset</button>
        <button class="btn btn-danger remove" v-if="entry.id" @click="remove()">Delete</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import TimelineEntry from "ajc-shared/src/models/TimelineEntry";
import {Component, Emit, Prop, PropSync, Watch} from "vue-property-decorator";
import { mapGetters } from 'vuex';
import Vue from "vue";
import Sinput from "@/global/components/sinput.vue";
import {TimelineActions} from "@/modules/timeline/store/actions";
import {RevertObject} from "@/models/RevertObject";

@Component({
  name:'TimelineCard',
  components: {Sinput},
  computed: mapGetters(['isAuthenticated'])
})
export default class TimelineCard extends Vue {
  @Prop()
  value:TimelineEntry;
  state:RevertObject<TimelineEntry>;

  @PropSync('vm', {
    default() {
      return {
        isEditing: false
      }
    }
  })
  viewState;

  get entry():TimelineEntry {
    return this.state.data;
  }

  created() {
    this.state = new RevertObject(this.value);
  }

  @Watch('value')
  onValueChanged(newVal) {
    this.state.commit(newVal);
  }

  @Emit('submitted')
  async submit() {
    await TimelineActions.UPSERT.$dispatch(this.state.data);
    this.state.commit();
    return { vm:this.viewState, entry:this.state.data };
  }

  @Emit('reset')
  reset() {
    this.state.reset();
  }

  @Emit('removed')
  remove() {
    return TimelineActions.DELETE.$dispatch(this.state.data).then(removed => {
      if(removed) {
        return this.state.data;
      }

      return null;
    });
  }

  cancel() {
    this.viewState.isEditing = false;
  }

  edit() {
    this.viewState.isEditing = true;
  }
}
</script>

<style lang="less">
@import "../../../../node_modules/ajc-toolbelt/dist/less/flex.less";
@import "../../../less/variables.less";

.sinput[type="editor"] .value {
  margin-top:40px;
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
    margin: 25px 0;
  }

  .edit {
    float: right;
    color: @color-blue;
    cursor: pointer;
  }
}
</style>
