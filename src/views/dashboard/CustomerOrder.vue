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
    .fa-cart-plus
      width 100%
      position relative
      
      &:before
        position absolute
        top 0
        left 15%
        height 100%
        color #fff


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
    <div class="customer-order-cart" @click="test">
      <i class="fas fa-lg fa-cart-plus"></i>
    </div>
    <div class="customer-order-content">
      <div class="customer-order-content__card">
        <Loading :active.sync="isLoading"></Loading>
        <Card v-model="products"/>
      </div>
    </div>
    <Pagination class="customer-order__pagination" v-model="pagination" :changePage="changePage"/>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/admin/products`;
export default {
  components: { Card, Pagination },
  data() {
    return {
      products: [],
      pagination: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getProducts();
  },
  mounted() {},
  methods: {
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
    changePage(pageNumber) {
      this.getProducts(pageNumber);
    },
    test(){
      this.$router.push({name:'order'})
    }
  }
};
</script>