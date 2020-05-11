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
]]
  </main>
</template>

<script lang="ts">
  import {Component} from "vue-property-decorator";

  interface InlineControl<IResourceType, IKey extends keyof IResourceType = keyof IResourceType> {
    key: IKey,
    type:'text' | 'textarea' | 'date' | 'time' | 'datetime' | 'editor',
    value: IResourceType[IKey],
    readonly?:boolean,
    hideIfEmpty?:boolean
  }

  @Component
  export default class InlineFormComponent<IResourceType> {
    name:string = "sform";
    editing:boolean = false;
    editable:boolean = false;

    data: { [key in keyof IResourceType] : IResourceType[key] };
    controls: InlineControl<IResourceType>[] = [];
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
