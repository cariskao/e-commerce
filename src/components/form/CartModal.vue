<style lang="stylus">
@import '../../assets/style/_base.styl'

.cart-modal
  width 100%
  height 100%
  font-weight normal

  &__header
    border-bottom 1px solid #e7edf2
    padding 10px 0

  &__table
    margin-bottom 10px
    max-width 500px

  &-balance
    display flex

    &__coupon
      width 50%
      display inline-block

      &__label
        width 70%
        font-weight normal
        padding-top 10px

    &__detail
      display flex
      flex-wrap wrap
      flex-direction column
      width 50%
      padding 10px 20px
      font-size 14px

      &__total
        display flex
        justify-content space-between
        margin-bottom 30px

      &__discount
        display flex
        justify-content space-between
        color #67C23A

  &__footer
    margin 10px auto
    text-align center
</style>
<template>
  <div class="cart-modal">
    <h3 class="cart-modal__header form__row modal__item" slot="header">購物車內容</h3>

    <div class="cart-modal__table form__row" slot="body">
      <Loading :active.sync="isLoading"></Loading>
      <el-table
        class="cart-modal__table-content"
        :data="tableData.cart"
        height="400"
        empty-text="購物車是空的 >_<"
      >
        <el-table-column label="商品">
          <template slot-scope="cart">
            <span>{{ cart.row.product.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="數量">
          <template slot-scope="cart">
            <span>{{ cart.row.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="單價">
          <template slot-scope="cart">
            <span>{{ cart.row.product.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合計">
          <template slot-scope="cart">
            <span>{{ cart.row.total }}</span>
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="cart">
            <el-button
              size="small"
              type="danger"
              round
              icon="el-icon-delete"
              @click="handleDelete(cart.$index, cart.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-modal-balance">
      <div class="cart-modal-balance__coupon">
        <Label class="cart-modal-balance__coupon__label" labelName="優惠卷代碼"/>
        <Button colorType="small" @click.native.prevent="useCoupon" btnName="套用"/>
        <Input v-model="code"/>
      </div>
      <div class="cart-modal-balance__detail">
        <div class="cart-modal-balance__detail__total">
          <p>總計</p>
          <p>$ {{tableData.total}}</p>
        </div>
        <div v-if="discount" class="cart-modal-balance__detail__discount">
          <p>折扣後</p>
          <p>$ {{tableData.finalTotal}}</p>
        </div>
      </div>
    </div>
    <!-- Body End -->
    <div class="cart-modal__footer" slot="footer">
      <Button class="modal__btn" btnName="取消" @click.native="cancel"/>
      <Button class="modal__btn" btnName="付款去" @click.native="openPaymentModal"/>
    </div>
  </div>
</template>

<script>
const cartApi = "https://vue-course-api.hexschool.io/api/leochuang/cart";
const deleteCartApi = "https://vue-course-api.hexschool.io/api/leochuang/cart";
const couponApi = "https://vue-course-api.hexschool.io/api/leochuang/coupon";
import { mapGetters, mapActions } from "vuex";
import ModalContent from "@/components/ModalContent";
import TextArea from "@/components/TextArea";
import Button from "@/components/reuse/Button";
import Select from "@/components/reuse/Select";
import Label from "@/components/reuse/Label";
import Input from "@/components/reuse/Input";
export default {
  components: {
    ModalContent,
    TextArea,
    Button,
    Label,
    Select,
    Input
  },
  props: {},
  data() {
    return {
      tableData: {
        cart: [],
        total: "",
        finalTotal: ""
      },
      code: "",
      isLoading: false,
      discount: false
    };
  },

  computed: {
    ...mapGetters(["modalData"])
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
      this.getCartData();
    },
    getCartData() {
      this.isLoading = true;
      this.$http.get(cartApi).then(res => {
        const {
          data: {
            data: { carts, total, final_total }
          }
        } = res;
        this.tableData.cart = carts;
        this.tableData.total = total;
        this.tableData.finalTotal = final_total;
        this.isLoading = false;
      });
    },
    cancel() {
      this.setModal("");
    },
    handleDelete(index, row) {
      this.isLoading = true;
      this.$http
        .delete(`${deleteCartApi}/${row.id}`, {
          data: row
        })
        .then(res => {
          this.init();
          this.$root.$emit("CartModal:refresh");
          this.isLoading = false;
          this.deleteMessage();
        });
    },
    deleteMessage(error = "已刪除") {
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
    useCoupon() {
      this.isLoading = true;
      const coupon = {
        code: this.code
      };
      this.$http
        .post(couponApi, {
          data: coupon
        })
        .then(res => {
          if (res.data.success) {
            this.isLoading = false;
            this.discount = true;
            this.notifySuccess("成功套用");
          } else {
            console.log(res);
            this.isLoading = false;
            this.deleteMessage("找不到優惠券!");
          }
        });
    },
    openPaymentModal() {
      this.setModal("PaymentModal");
    }
  }
};
</script>