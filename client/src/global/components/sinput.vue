<template>
  <main class="sinput">
    <div v-if='!editing'>
      <span>{{ val }}</span>
    </div>

    <div v-if="editing">
      <input
        :type="type"
        :value="val"
        @input="onInputChange"
        v-if="!nonSimpleTypes.includes(type)"
        ref="input"
      />

      <textarea
        :placeholder="placeholder"
        :value="val"
        @input="onInputChange"
        v-if="type === 'textarea'"
        ref="input"
      ></textarea>

      <ckeditor
        v-if="type === 'editor'"
        :editor="editor"
        :value="val"
        @input="onInputChange"
        :config="editorConfig"
        ref="input"
      ></ckeditor>

      <datetime
        :value="valueStr"
        :type="type"
        @input="onInputChange"
        v-if="dateTypes.includes(type)"
        ref="input"
      ></datetime>
    </div>
  </main>
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

  get valueStr(): string {
    return isDate(this.val) ? this.val.toISOString() : this.val;
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

    if(isDate(this.value)) {
      return new Date(value);
    } else {
      return value;
    }
  }
}
</script>

<style lang="less">
.sinput {
  max-width: 100%;

  label {
    width: 20%;
    text-align: right;
    margin-right: 35px;
  }

  textarea {
    flex: 0.7;
    min-width: 175px;
  }

  input[type="text"] {
    min-width: 173px;
  }
}
</style>
