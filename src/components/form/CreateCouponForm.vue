<style lang="stylus">
.create-coupon-form
  .upload-img
    padding-top 10px

  .el-textarea__inner
    margin-top 5px

    &:focus, &:active, &.is-focus
      outline none
      border-color #66cfd2

    &:hover
      border-color #66cfd2
  .el-date-editor.el-input
    margin-top 5px
    .el-input__inner
      &:hover, &:focus
        border-color #66cfd2
    .el-input__icon
      color #66cfd2
</style>
<template>
  <div class="create-coupon-form">
    <Loading :active.sync="isLoading"></Loading>
    <PopupHeader>
      <template v-if="addForm">
        <div>
          <h1>新建優惠卷</h1>
        </div>
      </template>
      <template v-else>
        <div>
          <h1>編輯優惠卷</h1>
        </div>
      </template>
    </PopupHeader>
    <PopupContent>
      <div class="form__row">
        <div class="form__column full margin-bottom10px">
          <Label :data-required="true" labelName="優惠卷名稱"/>
          <Input v-model="form.title"/>
        </div>

        <div class="form__column full">
          <Label :data-required="true" labelName="有效期限"/>
          <el-date-picker v-model="form.due_date" type="date" placeholder="選擇日期"></el-date-picker>
        </div>
        <div class="form__column full">
          <Label :data-required="true" labelName="折扣 (%)"/>
          <Input v-model="form.percent"/>
        </div>
        <div class="form__column full">
          <Label :data-required="true" labelName="優惠卷代碼"/>
          <Input v-model="form.code"/>
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
const url = `${process.env.VUE_APP_API}`;
const couponApi = "api/leochuang/admin/coupon/";
import { mapGetters, mapActions } from "vuex";
import PopupHeader from "@/components/PopupHeader";
import PopupContent from "@/components/PopupContent";
import PopupFooter from "@/components/PopupFooter";
import Button from "@/components/reuse/Button";
import Label from "@/components/reuse/Label";
import Input from "@/components/reuse/Input";
import SwitchBtn from "@/components/reuse/SwitchBtn";
export default {
  components: {
    PopupHeader,
    PopupContent,
    PopupFooter,
    Button,
    Input,
    Label,
    SwitchBtn
  },
  props: {},
  data() {
    return {
      form: {
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: "",
        code: ""
      },
      addForm: true,
      isLoading: false
    };
  },

  computed: {
    ...mapGetters(["PopupData"])
  },
  watch: {},
  created() {
    this.getFormInitial();
  },
  mounted() {},
  destroyed() {},
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
      this.isLoading = true;
      this.$http
        .post(`${url}${couponApi}`, {
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
      this.isLoading = true;
      const form = this.deepCopy(this.form);
      delete form.image;
      this.$http
        .put(`${url}${couponApi}${this.form.id}`, {
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
      this.$root.$emit("Coupon:refreshPageTableData");
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