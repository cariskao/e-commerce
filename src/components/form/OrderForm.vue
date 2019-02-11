<style lang="stylus">
.order-form
  &__item
    padding 10px 0
    display flex

  .el-date-editor.el-input
    margin-top 5px
    width auto

.table
  margin-bottom 20px

  &-item
    display flex
    border-bottom 1px solid #e7edf2
    margin-bottom 20px
    padding 10px 0

    &__product
      width 40%

    &__qty
      width 20%

    &__price
      width 20%

    &__discount
      width 20%

  &-total
    display flex
    align-items center
    justify-content flex-end
</style>
<template>
  <div class="order-form">
    <Loading :active.sync="isLoading"></Loading>
    <PopupHeader>
      <div>
        <h1>查看訂單</h1>
      </div>
    </PopupHeader>
    <PopupContent>
      <div class="form__row">
        <div class="form__column half">
          <Label labelName="姓名"/>
          <Input readonly v-model="form.user.name"/>
        </div>
        <div class="form__column half">
          <Label labelName="Email"/>
          <Input readonly v-model="form.user.email"/>
        </div>
        <div class="form__column half">
          <Label labelName="電話"/>
          <Input readonly v-model="form.user.tel"/>
        </div>
        <div class="form__column half">
          <Label labelName="付款狀態"/>
          <Input readonly v-model="renderPayment"/>
        </div>
        <div class="form__column full">
          <Label labelName="住址"/>
          <Input readonly v-model="form.user.address"/>
        </div>
        <div class="form__column half">
          <Label labelName="訂單日期"/>
          <el-date-picker readonly v-model="form.create_at * 1000" type="date" placeholder="選擇日期"></el-date-picker>
        </div>

        <div v-if="form.is_paid" class="form__column half">
          <Label labelName="付款時間"/>
          <el-date-picker readonly v-model="form.paid_date * 1000" type="date" placeholder="選擇日期"></el-date-picker>
        </div>

        <div class="form__column full">
          <Label labelName="客戶備註"/>
          <TextArea readonly v-model="form.message"/>
        </div>
      </div>
      <div class="form__column full">
        <Label labelName="購買產品"/>
      </div>
      <div class="table">
        <div class="table-item">
          <p class="table-item__product">產品名稱</p>
          <p class="table-item__qty">數量</p>
          <p class="table-item__price">單價</p>
          <p v-if="!form.products.coupon" class="table-item__discount">折扣價</p>
        </div>
        <div v-for="(item,index) in products" :key="item.id" class="table-item">
          <p class="table-item__product">{{item.product.title}}</p>
          <p class="table-item__qty">{{item.qty}}</p>
          <p class="table-item__price">{{item.product.price}}</p>
          <p v-if="!form.products.coupon" class="table-item__discount">{{item.final_total}}</p>
        </div>
        <div class="table-total">
          <p>總計： $ {{form.total}}</p>
        </div>
      </div>
    </PopupContent>
    <PopupFooter>
      <Button btnName="確認" @click.native.prevent="close"/>
    </PopupFooter>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PopupHeader from "@/components/PopupHeader";
import PopupContent from "@/components/PopupContent";
import PopupFooter from "@/components/PopupFooter";
import TextArea from "@/components/TextArea";
import Button from "@/components/reuse/Button";
import Label from "@/components/reuse/Label";
import Input from "@/components/reuse/Input";
export default {
  components: {
    PopupHeader,
    PopupContent,
    PopupFooter,
    Button,
    Input,
    Label,
    TextArea
  },
  props: {},
  data() {
    return {
      form: {
        create_at: "",
        id: "",
        is_paid: "",
        message: "",
        paid_date: "",
        payment_method: "",
        products: {},
        total: 100,
        user: {},
        num: 1
      },
      isLoading: false,
      products: []
    };
  },

  computed: {
    ...mapGetters(["PopupData"]),
    renderPayment() {
      return this.form.is_paid ? "已付款" : "未付款";
    }
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
        const products = this.deepCopy(this.form.products);
        const productsArray = Object.keys(products).map(item => products[item]);
        this.products = productsArray;
      }
    },
    close() {
      this.setPopupComponent("");
    }
  }
};
</script>