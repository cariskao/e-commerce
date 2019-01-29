<style lang="stylus">
@import '../../assets/style/_base.styl'

.payment-modal
  width 100%
  height 100%
  font-weight normal

  &__header
    display flex
    align-items center
    justify-content flex-start
    border-bottom 1px solid #e7edf2
    padding 10px 0

    &-icon
      cursor pointer

  &__body
    margin-top 10px

  &__reminder
    font-size 10px
    color #F56C6C

  &__footer
    margin 10px auto
    text-align center


</style>
<template>
  <div class="payment-modal">
    <div class="payment-modal__header" slot="header">
      <div class="el-icon-caret-left payment-modal__header-icon" @click="back"></div>
      <h3>填寫寄送資訊</h3>
    </div>

    <div class="payment-modal__body" slot="body">
      <Loading :active.sync="isLoading"></Loading>
      <div class="form__row">
        <div class="form__column full">
          <Label data-required labelName="Email"/>
          <Input
            v-model="form.user.email"
            v-validate="'required|email'"
            name="email"
            :class="{'error':errors.has('email')}"
          />
          <span
            v-if="errors.has('email')"
            class="payment-modal__reminder"
          >{{errors.first('email') }}</span>
        </div>
        <div class="form__column full">
          <Label data-required labelName="收件人姓名"/>
          <Input
            v-model="form.user.name"
            v-validate="'required'"
            name="name"
            :class="{'error':errors.has('name')}"
          />
          <span v-if="errors.has('name')" class="payment-modal__reminder">請輸入姓名</span>
        </div>
        <div class="form__column full">
          <Label data-required labelName="收件人電話"/>
          <Input
            v-model="form.user.tel"
            v-validate="'required'"
            name="phone"
            type="number"
            :class="{'error':errors.has('phone')}"
          />
          <span v-if="errors.has('phone')" class="payment-modal__reminder">請輸入電話</span>
        </div>
        <div class="form__column full">
          <Label data-required labelName="收件人地址"/>
          <Input
            v-model="form.user.address"
            v-validate="'required'"
            name="address"
            :class="{'error':errors.has('address')}"
          />
          <span v-if="errors.has('address')" class="payment-modal__reminder">請輸入地址</span>
        </div>
        <div class="form__column full">
          <Label labelName="備註"/>
          <TextArea v-model="form.message" :rowHeight="5"/>
        </div>
      </div>
    </div>
    <!-- Body End -->
    <div class="cart-modal__footer" slot="footer">
      <Button class="modal__btn" btnName="取消" @click.native="cancel"/>
      <Button class="modal__btn" btnName="付款去" @click.native="onSubmit"/>
    </div>
  </div>
</template>

<script>
const paymentApi = "https://vue-course-api.hexschool.io/api/leochuang/order";
import { mapGetters, mapActions } from "vuex";
import ModalContent from "@/components/ModalContent";
import TextArea from "@/components/TextArea";
import Button from "@/components/reuse/Button";
import Label from "@/components/reuse/Label";
import Input from "@/components/reuse/Input";
export default {
  components: {
    ModalContent,
    TextArea,
    Button,
    Label,
    Input
  },
  props: {},
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      isLoading: false
    };
  },

  computed: {
    ...mapGetters(["modalData"])
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["setModal"]),
    onSubmit() {
      this.$validator.validate().then(result => {
        if (result) {
          this.isLoading = true;
          this.$http
            .post(paymentApi, {
              data: this.form
            })
            .then(res => {
              if (res.data.success) {
                this.isLoading = false;
                console.log(res);
                this.$router.push(`/checkout/${res.data.orderId}`);
                this.setModal("");
              } else {
                this.isLoading = false;
                this.errorMessage("傳送失敗，再試一次");
                return;
              }
            });
        } else {
          this.errorMessage("資料不完整");
        }
      });
    },
    cancel() {
      this.setModal("");
    },
    errorMessage(error = "已刪除") {
      this.$message({
        showClose: true,
        message: error,
        type: "error"
      });
    },
    notifySuccess(text) {
      this.$message({
        showClose: true,
        message: text,
        type: "success"
      });
    },
    back() {
      this.setModal("CartModal");
    }
  }
};
</script>