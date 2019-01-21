<style lang="stylus">
.customer-order
  height 100%

  &-content
    width 100%
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
    <div class="customer-order-content">
      <div class="customer-order-content__card">
        <Loading :active.sync="isLoading"></Loading>
        <Card v-model="products"/>
      </div>
      <button id="show-modal" @click="showModal = true">Show Modal</button>
      <!-- <Modal v-if="showModal" @close="showModal = false" >
        <h3 slot="header"> Title </h3>
      </Modal> -->
    </div>
    <Pagination class="customer-order__pagination" v-model="pagination" :changePage="changePage"/>
   
  </div>
</template>
<script>
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination.vue";
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/admin/products`;
export default {
  components: { Card, Pagination, Modal },
  data() {
    return {
      products: [],
      pagination: {},
      
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
          console.log(this.products);
          this.pagination = pagination;
          console.log(this.pagination);
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
    }
  }
};
</script>