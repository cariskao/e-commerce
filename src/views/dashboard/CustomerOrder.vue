<style lang="stylus">
@import '../../assets/style/_base.styl'

.customer-order
  height 100%
  width 100%
  position relative

  &-cart
    position fixed
    top 80px
    right 2%
    color $primary-color
    align-items center
    cursor pointer
    width 40px
    height 40px
    border-radius 30px
    background #66cfd2
    display inline-block
    animation cart 1s infinite cubic-bezier(0.24, 0.07, 0.74, 0.99)

    .fa-cart-plus
      width 100%
      position relative

      &:before
        position absolute
        top 0
        left 15%
        height 100%
        color #fff

    &__num
      width 20px
      height 20px
      display flex
      align-items center
      justify-content center
      border-radius 50%
      background black
      position absolute
      background-color rgb(255, 171, 0)
      color #fff
      font-size 12px
      right -3px
      top -8px

  &-content
    width 100%
    margin-top 20px
    height calc(100% - 50px)
    overflow auto

    &__card
      width 100%

  &__pagination
    width 100%
    height 50px
    text-align center
</style>
<template>
  <div class="customer-order">
    <div class="customer-order-cart" @click="openCart">
      <i class="fas fa-lg fa-cart-plus"></i>
      <div v-model="cartQty" class="customer-order-cart__num">{{handleCartQty}}</div>
    </div>
    <div class="customer-order-content">
      <div class="customer-order-content__card">
        <Card v-model="products"/>
      </div>
    </div>
    <Pagination class="customer-order__pagination" v-model="pagination" :changePage="changePage"/>
  </div>
</template>
<script>
const cartApi = "https://vue-course-api.hexschool.io/api/leochuang/cart";
import { mapActions, mapGetters } from "vuex";
import Card from "@/components/Card";
import CartModal from "@/components/form/CartModal";
import Pagination from "@/components/Pagination";
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/admin/products`;
export default {
  components: { Card, Pagination, CartModal },
  data() {
    return {
      products: [],
      pagination: {},
      cartQty: ""
    };
  },
  computed: {
    handleCartQty() {
      return this.cartQty > 9 ? "9+" : this.cartQty;
    }
  },
  watch: {
    cartQty(newValue) {
      newValue ? this.getCartData() : this.cartQty;
    }
  },
  created() {
    this.getProducts();
    this.getCartData();
    this.$root.$on("Card:refresh", () => {
      this.getCartData();
    });
    this.$root.$on("CartModal:refresh", () => {
      this.getCartData();
    });
    this.$root.$on("CardModal:refresh", () => {
      this.getCartData();
    });
  },
  mounted() {},
  destroyed() {
    this.$root.$off("Card:refresh");
    this.$root.$off("CartModal:refresh");
    this.$root.$off("CardModal:refresh");
  },
  methods: {
    ...mapActions(["setModal"]),
    getProducts(page = 1) {
      // "https://vue-course-api.hexschool.io/api/leochuang/products";
      // API 伺服器路徑
      // 申請的 API PATH
      this.isLoading = true;
      this.$http.get(`${productApi}?page=${page}`).then(res => {
        if (res.data.success) {
          const {
            data: { products, pagination }
          } = res;
          this.products = this.deepCopy(products);
          this.pagination = pagination;
          this.isLoading = false;
        } else {
          alert("請先登入，以利取得資料");
          this.$router.push({ name: "login" });
          this.isLoading = false;
        }
      });
    },
    getCartData() {
      this.$http
        .get(cartApi)
        .then(res => (this.cartQty = res.data.data.carts.length));
    },
    changePage(pageNumber) {
      this.getProducts(pageNumber);
    },
    showModal() {
      this.setModal("CartModal");
    },
    openCart() {
      this.showModal();
      // this.$router.push({ name: "order" });
    }
  }
};
</script>