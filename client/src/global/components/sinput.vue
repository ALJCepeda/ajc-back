<template>
  <main class="sinput">
    <div v-if='!editable'>
      <span
        v-if="!editable"
      >{{ value }}</span>
    </div>

    <div v-if="editable">
      <input
        :type="type"
        :value="value"
        @input="emitValue"
        v-if="!nonSimpleTypes.includes(type)"
        ref="input"
      />

      <textarea
        :placeholder="placeholder"
        :value="value"
        @input="emitValue"
        v-if="type === 'textarea'"
        ref="input"
      ></textarea>

      <ckeditor
        v-if="type === 'editor'"
        :editor="editor"
        :value="value"
        @input="emitValue"
        :config="editorConfig"
        ref="input"
      ></ckeditor>

      <datetime
        :value="valueStr"
        :type="type"
        @input="emitValue"
        v-if="dateTypes.includes(type)"
        ref="input"
      ></datetime>
    </div>
  </main>
</template>

<script>
import 'vue-datetime/dist/vue-datetime.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Datetime } from 'vue-datetime';
import {isDate, isString} from 'lodash';

export default {
  name: "sinput",
  components: {
    Datetime
  },
  props: {
    value: [String, Number, Boolean, Date],
    type: String,
    placeholder: {
      type: String,
      default: "Enter a value"
    },
    editable: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      specialTypes: ['textarea', 'editor'],
      dateTypes: ['date', 'datetime', 'time'],
      valueStr: isDate(this.value) ? this.value.toISOString() : this.value
    }
  },

  computed: {
    nonSimpleTypes() {
      return this.specialTypes.concat(this.dateTypes);
    }
  },

  watch: {
    value: function(newVal) {
      if (this.$refs.input.value !== newVal && !isDate(newVal)) {
        this.$refs.input.value = newVal;
      }
    }
  },

  methods: {
    emitValue(event) {
      const value = isString(event) ? event : event.target.value;

      if(isDate(this.value)) {
        this.$emit("input", new Date(value) );
      } else {
        this.$emit("input", value);
      }
    }
  }
};
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
