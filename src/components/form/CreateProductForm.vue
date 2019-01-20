<style lang="stylus">
.create-product-form
  .upload-img
    padding-top 10px
</style>
<template>
  <div class="create-product-form">
    <Loading :active.sync="isLoading"></Loading>
    <PopupHeader>
      <template v-if="addForm">
        <div>
          <h1>新建產品</h1>
        </div>
      </template>
      <template v-else>
        <div>
          <h1>編輯產品</h1>
        </div>
      </template>
    </PopupHeader>
    <PopupContent>
      <div class="form__row">
        <div class="form__column full">
          <UploadImg
            class="upload-img"
            v-model="form.image"
            :imageUrl="form.imageUrl"
            :url="pictureApi"
          />
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
      <template v-if="addForm">
        <Button @click.native.prevent="submit"/>
        <Button btnName="取消" @click.native.prevent="cancel"/>
      </template>
      <template v-else>
        <Button btnName="儲存" @click.native.prevent="saveForm"/>
        <Button btnName="取消" @click.native.prevent="cancel"/>
      </template>
    </PopupFooter>
  </div>
</template>

<script>
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `${process.env.VUE_APP_API}`;
const productApi = `api/${process.env.VUE_APP_CUSTOM}/admin/product/`;
const pictureApi = `api/${process.env.VUE_APP_CUSTOM}/admin/upload/`;
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
        imageUrl: "",
        id: ""
      },
      addForm: true,
      isLoading: false,
      pictureApi: `${url}${pictureApi}`,
      cacheImg: {}
    };
  },

  computed: {
    ...mapGetters(["PopupData"])
  },
  watch: {},
  created() {
    this.isLoading = true;
    this.init();
    this.$root.$on("UploadImg:imageUrl", imageUrl => {
      this.$set(this.form, "imageUrl", imageUrl);
    });
    this.$root.$on("UploadImg:file", files => {
      this.$set(this, "cacheImg", files);
    });
    this.isLoading = false;
  },
  mounted() {},
  destroyed() {
    this.$root.$off("UploadImg:imageUrl");
    this.$root.$off("UploadImg:file");
  },
  methods: {
    ...mapActions(["setPopupComponent"]),
    init() {
      this.getFormInitial();
    },
    getFormInitial() {
      if (this.PopupData) {
        const form = this.deepCopy(this.PopupData);
        this.form = form;
        this.addForm = false;
      } else {
        this.addForm = true;
      }
    },
    submit() {
      const form = this.deepCopy(this.form);
      form.image = this.cacheImg;
      this.isLoading = true;
      this.$http
        .post(`${url}${productApi}`, {
          data: form
        })
        .then(res => {
          this.isLoading = false;
          this.refreshTableData();
          this.setPopupComponent("");
          this.notifySuccess("新增成功");
        });
    },
    saveForm() {
      // this.isLoading = true;
      const form = this.deepCopy(this.form);
      delete form.image;
      this.$http
        .put(`${url}${productApi}${this.form.id}`, {
          data: form
        })
        .then(res => {
          this.isLoading = false;
          this.refreshTableData();
          this.setPopupComponent("");
          this.notifySuccess("儲存成功");
        });
    },
    cancel() {
      this.setPopupComponent("");
    },
    refreshTableData() {
      this.$root.$emit("Popup:refreshPageTableData");
    },
    notifySuccess(text) {
      this.$message({
        showClose: true,
        message: text,
        type: "success"
      });
    }
  }
};
</script>