<style lang="stylus">
.create-product-form
  .upload-img
    padding 10px 0
</style>
<template>
  <div class="create-product-form">
    <PopupHeader>
      <h1>新建產品</h1>
    </PopupHeader>
    <PopupContent>
      <div class="form__row">
        <div class="form__column full">
          <UploadImg ref="upload" v-model="form.image" class="upload-img"/>
        </div>
        <div class="form__column full margin-bottom10px">
          <Label :data-required="true" labelName="產品類型"/>
          <Input v-model="form.category"/>
        </div>

        <div class="form__column full">
          <Label :data-required="true" labelName="產品名稱"/>
          <Input v-model="form.title"/>
        </div>

        <div class="form__column full">
          <Label :data-required="true" labelName="成本價錢"/>
          <Input v-model="form.origin_price"/>
        </div>

        <div class="form__column full">
          <Label :data-required="true" labelName="販售價格"/>
          <Input v-model="form.price"/>
        </div>

        <div class="form__column full">
          <SwitchBtn v-model="form.is_enabled"/>
        </div>
      </div>
    </PopupContent>
    <PopupFooter>
      <Button @click.native.prevent="submit"/>
      <Button btnName="取消"/>
    </PopupFooter>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PopupHeader from "@/components/PopupHeader";
import PopupContent from "@/components/PopupContent.vue";
import PopupFooter from "@/components/PopupFooter.vue";
import UploadImg from "@/components/UploadImg.vue";
import Button from "@/components/reuse/Button.vue";
import Label from "@/components/reuse/Label.vue";
import Input from "@/components/reuse/Input.vue";
import SwitchBtn from "@/components/reuse/SwitchBtn.vue";
export default {
  components: {
    PopupHeader,
    PopupContent,
    PopupFooter,
    UploadImg,
    Button,
    Input,
    Label,
    SwitchBtn
  },
  props: {},
  data() {
    return {
      noAuthority: true,
      form: {
        title: "",
        category: "",
        origin_price: "",
        price: "",
        unit: "",
        image: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: ""
      }
    };
  },

  computed: {
    ...mapGetters(["PopupData"])
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["setPopupComponent"]),
    submit() {
      const url =
        "https://vue-course-api.hexschool.io/api/:api_path/admin/product";
      // this.$refs.upload.upload();
      console.log(this.form);
      this.$http
        .post(url, {
          data: this.form
        })
        .then(res => console.log(res));
    }
  }
};
</script>