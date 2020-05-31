<template>
  <span class="sinput" v-bind:class="{ row: type === 'editor' }">
    <span v-if='!editing'>{{ val }}</span>

    <input
      :type="type"
      :value="val"
      @input="onInputChange"
      v-if="editing && !nonSimpleTypes.includes(type)"
      ref="input"
    />

    <textarea
      :placeholder="placeholder"
      :value="val"
      @input="onInputChange"
      v-if="editing && type === 'textarea'"
      ref="input"
    ></textarea>

    <ckeditor
      v-if="editing && type === 'editor'"
      :editor="editor"
      :value="val"
      @input="onInputChange"
      :config="editorConfig"
      class="row"
      ref="input"
    ></ckeditor>

    <datetime
      :value="valueStr"
      :type="type"
      @input="onInputChange"
      v-if="editing && dateTypes.includes(type)"
      ref="input"
    ></datetime>
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
  @PropSync('value',{
    type: [String, Number, Boolean, Date]
  })
  val: string | number | boolean | Date;

  @Prop({
    type: String,
    default: 'text'
  })
  type: string;

  @Prop({
    type: String,
    default: 'Enter a value'
  })
  placeholder: string;

  @Prop({
    type: Boolean,
    default: true
  })
  editing: boolean;

  @Ref('input')
  element:HTMLInputElement;

  editor = ClassicEditor;
  editorConfig = {};
  specialTypes = ['textarea', 'editor'];
  dateTypes = ['date', 'datetime', 'time'];

  get valueStr(): string | number | boolean {
    if(isDate(this.val)) {
      return this.val.toISOString();
    }

    return this.val;
  }

  get nonSimpleTypes(): string[] {
    return this.specialTypes.concat(this.dateTypes);
  }

  @Watch('value')
  onValueChange(newVal) {
    if (this.type !== 'editor' && this.element.value !== newVal && !isDate(newVal)) {
      this.element.value = newVal;
    }
  }

  @Emit('input')
  onInputChange(event) {
    const value = isString(event) ? event : event.target.value;

    if(isDate(this.val)) {
      return new Date(value);
    } else {
      return value;
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
