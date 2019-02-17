<style lang="stylus">
@import '../../assets/style/_base.styl'

.checkout
  padding 20px

  &-content
    width 100%
    height 100%
    max-width 500px
    margin 0 auto

    &__title
      font-size 20px
      text-align center
      font-weight 600
      margin 20px 0

    p
      padding 10px 0

    &__item
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #8c8c8c
      padding 5px 0
      margin-bottom 10px

    &__label
      padding 5px 0
      width 20%

    &__textarea
      width 100%
      display inline-block
      margin-bottom 20px

    &__btn
      margin 0 auto
      text-align right
.table
  margin-bottom 20px

  &-item
    display flex
    border-bottom 1px solid #8c8c8c
    margin-bottom 20px

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
  <div class="checkout">
    <Loading :active.sync="isLoading"></Loading>
    <div class="checkout-content">
      <div class="checkout-content__title">訂單資訊</div>
      <div class="table">
        <div class="table-item">
          <p class="table-item__product">產品名稱</p>
          <p class="table-item__qty">數量</p>
          <p class="table-item__price">單價</p>
          <p v-if="!order.products.coupon" class="table-item__discount">折扣價</p>
        </div>
        <div v-for="item in products" :key="item.id" class="table-item">
          <p class="table-item__product">{{item.product.title}}</p>
          <p class="table-item__qty">{{item.qty}}</p>
          <p class="table-item__price">{{item.product.price}}</p>
          <p
            v-if="!order.products.coupon"
            class="table-item__discount"
          >{{item.final_total}}</p>
        </div>
        <div class="table-total">
          <p>總計： $ {{order.total}}</p>
        </div>
      </div>
      <div class="checkout-content__title">寄送資訊</div>
      <div class="checkout-content__item">
        <Label class="checkout-content__label" labelName="Email"/>
        <h4>{{order.user.email}}</h4>
      </div>
      <div class="checkout-content__item">
        <Label class="checkout-content__label" labelName="姓名"/>
        <h4>{{order.user.name}}</h4>
      </div>
      <div class="checkout-content__item">
        <Label class="checkout-content__label" labelName="電話"/>
        <h4>{{order.user.tel}}</h4>
      </div>
      <div class="checkout-content__item">
        <Label class="checkout-content__label" labelName="地址"/>
        <h4>{{order.user.address}}</h4>
      </div>
      <div class="checkout-content__item">
        <Label class="checkout-content__label" labelName="訂單狀態"/>
        <h4 v-if="!order.is_paid" :style="{'color':'#F56C6C'}">尚未付款</h4>
        <h4 v-else :style="{'color':'#67C23A'}">付款成功</h4>
      </div>
      <div v-if="!order.is_paid" class="checkout-content__item">
        <Label class="checkout-content__label" labelName="付款方式"/>
        <Select v-model="renderPaymentMethod" :selectOptions="paymentOptions"/>
      </div>
      <div class="checkout-content__textarea">
        <Label class="checkout-content__label" labelName="備註"/>
        <TextArea v-model="textAreaPlaceholder" readonly/>
      </div>
      <div v-if="!order.is_paid" class="checkout-content__btn">
        <Button btnName="確定付款" @click.native.prevent="confirmPayment"/>
      </div>
    </div>
  </div>
</template>

<script>
const orderApi = "https://vue-course-api.hexschool.io/api/leochuang/order";
const payApi = "https://vue-course-api.hexschool.io/api/leochuang/pay";
import { mapActions } from "vuex";
import TextArea from "@/components/TextArea";
import Button from "@/components/reuse/Button";
import Label from "@/components/reuse/Label";
import Select from "@/components/reuse/Select";
export default {
  components: {
    TextArea,
    Button,
    Label,
    Select
  },
  props: {},
  data() {
    return {
      orderId: "",
      isLoading: false,
      order: {
        create_at: "",
        id: "",
        is_paid: "",
        message: "",
        payment_method: "",
        products: [],
        total: "",
        user: {}
      },
      products: [],
      renderPaymentMethod: 0,
      paymentOptions: [
        { value: 0, name: "信用卡" },
        { value: 1, name: "超商付款" },
        { value: 2, name: "貨到付款" }
      ]
    };
  },

  computed: {
    textAreaPlaceholder() {
      if (!this.order.message) {
        return "無";
      } else return this.order.message;
    }
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["setModal"]),
    init() {
      this.orderId = this.$route.params.orderId;
      this.getOrderData();
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
    getOrderData() {
      this.isLoading = true;
      this.$http.get(`${orderApi}/${this.orderId}`).then(res => {
        const {
          data: { order }
        } = res;
        this.order = order;
        const products = this.deepCopy(this.order.products);
        const productsArray = Object.keys(products).map(item => products[item]);
        this.products = productsArray;
        this.isLoading = false;
      });
    },
    confirmPayment() {
      this.isLoading = true;
      const order = this.deepCopy(this.order);
      if (this.renderPaymentMethod === 0) {
        order.payment_method = "信用卡";
      }
      if (this.renderPaymentMethod === 1) {
        order.payment_method = "超商付款";
      }
      if (this.renderPaymentMethod === 2) {
        order.payment_method = "貨到付款";
      }
      this.$http
        .post(`${payApi}/${this.orderId}`, { data: order })
        .then(res => {
          if (res.data.success) {
            this.getOrderData();
            this.isLoading = false;
            this.notifySuccess("付款成功");
          } else {
            this.isLoading = false;
            this.errorMessage("付款失敗");
          }
        });
    }
  }
};
</script>