import Vue from 'vue';
import {Prop} from "vue-property-decorator";
import Form from "@/models/Form";

export default class InlineFormComponent<IResourceType extends IEntity> extends Vue {
  @Prop()
  form:Form<IResourceType>;

  submitting:boolean = false;
  removing:boolean = false;

  get isDirty() {
    return this.form.isDirty();
  }

  get entry():IResourceType {
    return this.form.data;
  }

  submit() {
    if(this.form.actions.submit) {
      this.submitting = true;
      this.form.actions.submit(this.form.data).then(() => {
        this.submitting = false;
        this.form.commit();
      });
    }
  }

  remove() {
    if(this.form.actions.remove) {
      this.removing = true;
      this.form.actions.remove(this.form!.data).then(() => {
        this.removing = false;
      });
    }
  }
}
