<template>
  <div class="products">
    <div class="products-content">
      <Loading :active.sync="isLoading"></Loading>
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
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/admin/products`;
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
      search: "",
      isLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.init();
    this.$root.$on("Popup:refreshPageTableData", () => {
      this.getProducts();
    });
  },
  mounted() {},
  destroyed() {
    this.$root.$off("Popup:refreshPageTableData");
  },
  methods: {
    ...mapActions(["setPopupComponent", "setPopupData"]),
    init() {
      this.getProducts();
    },
    getProducts() {
      console.log();

      // "https://vue-course-api.hexschool.io/api/leochuang/products";
      // API 伺服器路徑
      // 申請的 API PATH
      // console.log(process.env.VUE_APP_API);
      this.isLoading = true;
      this.$http.get(productApi).then(res => {
        const {
          data: { products }
        } = res;
        this.products = products;
        this.isLoading = false;
      });
    },
    handleEdit(index, rowData) {
      // console.log(index,rowData);
      this.setPopupData(rowData);
      this.showSidePopup("CreateProductForm");
    },
    handleDelete(index, row) {
      console.log(row.id);
      this.$http
        .delete(`${productApi}/${row.id}`, {
          data: row
        })
        .then(res => {
          console.log(res);
          this.init();
        });
    },
    showSidePopup() {
      console.log("CreateProductForm");
      this.setPopupComponent("CreateProductForm");
    }
  }
};
</script>