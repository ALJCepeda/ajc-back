<template>
  <span class="sinput" v-bind:class="{ row: type === 'editor' }" @dblclick="onDoubleClick" @keyup.enter="onSubmit">
    <span v-if='!isEditing'>{{ val }}</span>

    <input
      :type="type"
      :value="val"
      @input="onInputChange"
      v-if="isEditing && !nonSimpleTypes.includes(type)"
      ref="input"
    />

    <textarea
      :placeholder="placeholder"
      :value="val"
      @input="onInputChange"
      v-if="isEditing && type === 'textarea'"
      ref="input"
    />

    <ckeditor
      v-if="isEditing && type === 'editor'"
      :editor="editor"
      :value="val"
      @input="onInputChange"
      :config="editorConfig"
      class="row"
      ref="input"
    />

    <datetime
      :value="val"
      :type="type"
      @input="onInputChange"
      v-if="isEditing && dateTypes.includes(type)"
      ref="input"
    />
  </span>
</template>

<script lang="ts">
import 'vue-datetime/dist/vue-datetime.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Datetime } from 'vue-datetime';
import {isDate, isString} from 'lodash';
import {Component, Prop, Ref, Watch, PropSync, Emit} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Vue from "vue";

@Component({
    name: 'sinput',
    components: { Datetime },
    computed: mapGetters(['isAuthenticated'])
})
export default class SInput extends Vue {
  @Prop({ type: [String, Number, Boolean, Date] })
  value: string | number | boolean | Date;

  val: string | number | boolean | Date;

  @Prop({ type: String, default: 'text' })
  type: string;

  @Prop({ type: String, default: 'Enter a value' })
  placeholder: string;

  @Prop({ type: String, default: 'static'})
  mode: string;

  @Ref('input')
  element:HTMLInputElement;

  isEditing = false;
  editor = ClassicEditor;
  editorConfig = {};
  specialTypes = ['textarea', 'editor'];
  dateTypes = ['date', 'datetime', 'time'];

  created() {
    this.isEditing = this.mode !== 'inline';
    this.val = isDate(this.value) ? this.value.toISOString() : this.value;
  }

  get nonSimpleTypes(): string[] {
    return this.specialTypes.concat(this.dateTypes);
  }

  @Watch('value')
  onValueChange(newVal) {
    if (this.type !== 'editor' && this.element && this.element.value !== newVal && !isDate(newVal)) {
      this.element.value = newVal;
    }
  }

  onInputChange(event) {
    const value = isString(event) ? event : event.target.value;
    this.val = value;

    if(this.mode === 'static') {
      if(isDate(this.val)) {
        this.$emit('input', new Date(value));
      } else {
        this.$emit('input',value);
      }
    }
  }

  onDoubleClick() {
    if(this.mode === 'inline') {
      this.val = this.value;
      this.isEditing = !this.isEditing;
    }
  }

  onSubmit() {
    if(this.mode === 'inline' && this.isEditing) {
      this.$emit('input', this.val);
      this.$emit('submit');
      this.isEditing = false;
    }
  }
}
</script>

<style lang="less">
.sinput {
  textarea {
    flex: 0.7;
    min-width: 175px;
  }

  input[type="text"] {
    min-width: 175px;
  }

  .vdatetime {
    display: inline-block;
  }

  .ck-editor {
    width: 99.654%;
  }
}
</style>
