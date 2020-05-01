<template>
  <main class="sform">
    <div>
      <sinput
        v-for="control in controls"
        :key="control.key"
        :name="control.key"
        :label="control.label"
        :type="control.type"
        v-model="form.data[control.key]"
        :editable="!control.readonly"
      ></sinput>
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
import {Component} from "vue-property-decorator";
import AbstractFormComponent from "@/abstract/AbstractFormComponent";

@Component
export default class FormComponent<IResourceType> extends AbstractFormComponent<IResourceType> {
  name:string = "sform";

  get controls() {
    return this.form.controls.filter(control => {
      if(!!control.hideIfEmpty) {
        return !!this.form.data[control.key];
      }

      return true;
    });
  }
}
</script>

<style lang="less" scoped>
  .sform {
    .sinput {
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
