<template>
  <main class="sform">
    <div>
      <div class="sform-control row-w" v-for="control in controls">
        <label>{{ control.label }}:</label>

        <sinput
          :key="control.key"
          :name="control.key"
          :type="control.type"
          v-model="form.data[control.key]"
          :editable="!control.readonly"
        ></sinput>
      </div>

      <div v-if="form.controls.length === 0">No controls from form to render!</div>
    </div>

    <div class="row-nw jc-center action-btns">
      <button class="btn btn-primary submit" @click="submit()" :disabled="!isDirty">Submit</button>
      <button class="btn btn-warning" @click="form.reset()" :disabled="!isDirty">Reset</button>
      <button class="btn btn-danger remove" v-if="entry.id" @click="remove()">Delete</button>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";
import {RevertObject} from "@/models/RevertObject";

@Component
export default class FormComponent<IResourceType extends object> extends Vue {
  @Prop()
  options:SFormOptions<IResourceType> = {};

  @Prop()
  editing:boolean = false;

  name:string = "sform";
  id:number | undefined;
  submitting:boolean = false;
  removing:boolean = false;
  actions:{ [type:string]:(payload:IResourceType) => Promise<any> } = {};
  state: RevertObject<IResourceType>;
  controls: SFormControls<IResourceType>[] = [];

  created() {
    Object.assign(this, this.options);
  }

  isDirty():boolean {
    return this.state.isDirty();
  }

  submit() {
    if(this.actions.submit) {
      this.submitting = true;
      this.actions.submit(this.state.data).then(() => {
        this.submitting = false;
        this.state.commit();
      });
    }
  }

  remove() {
    if(this.actions.remove) {
      this.removing = true;
      this.actions.remove(this.state.data).then(() => {
        this.removing = false;
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .sform {
    label {
      width: 20%;
      text-align: right;
      margin-right: 35px;
    }

    .sform-control {
      margin-bottom: 15px;
    }

    .action-btns {
      margin-top: 40px;
      margin-bottom: 20px;
    }

    .submit.btn {
      margin-right: 30px;
    }

    .remove.btn {
      margin-left: 30px;
    }
  }
</style>
