<template>
  <div class="products">
    <div class="products-content">
      <Button btnName="新增產品" @click.native.stop.prevent="showSidePopup">Create Product</Button>
      <el-table
        class="products-content__table"
        :data="products.filter(data => !search || data.category.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column label="Category" prop="category" sortable></el-table-column>
        <el-table-column label="Product Name" prop="title"></el-table-column>
        <el-table-column label="Cost" prop="origin_price" sortable></el-table-column>
        <el-table-column label="Price" prop="price" sortable></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="輸入關鍵字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="stylus">
.products
  width 100%

  &-content
    width 100%

    &__table
      &__img
        border-radius 50%
</style>
<script>
import { mapActions } from "vuex";
import CreateProductForm from "@/components/form/CreateProductForm.vue";
import Button from "@/components/reuse/Button.vue";
export default {
  components: {
    CreateProductForm,
    Button
  },
  data() {
    return {
      products: [],
      search: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPopupComponent", "setPopupData"]),
    init() {
      this.getProducts();
    },
    getProducts() {
      const api = "https://vue-course-api.hexschool.io/api/leochuang/products";
      // API 伺服器路徑
      // 申請的 API PATH
      console.log(process.env.VUE_APP_API);
      this.$http.get(api).then(res => {
        const {
          data: { products }
        } = res;
        this.products = products;
      });
    },
    handleEdit(index, row) {
      const { category } = row;

      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    showSidePopup() {
      console.log("CreateProductForm");
      this.setPopupComponent("CreateProductForm");
    }
  }
};
</script>