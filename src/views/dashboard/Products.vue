<style lang="stylus">
.products
  width 100%

  &-content
    width 100%

    &__table-container
      height calc(100vh - 30vh)
      width 100%

    &__table
      height 100%

      .el-checkbox__inner
        &:hover, &:focus
          border-color #66cfd2

      .el-checkbox__input
        &.is-checked, &.is-indeterminate
          .el-checkbox__inner
            background-color #66cfd2
            border-color #66cfd2

        &.is-focus
          .el-checkbox__inner
            border-color #66cfd2

      &__img
        border-radius 50%

    &__pagination
      text-align center
      height 50px
</style>
<template>
  <div class="products">
    <div class="products-content">
      <Loading :active.sync="isLoading"></Loading>
      <Button btnName="新增產品" @click.native.stop.prevent="showSidePopup"/>
      <Button btnName="刪除已選產品" @click.native.stop.prevent="deleteMultiProducts(selectedItem)"/>
      <div class="products-content__table-container">
        <el-table
          class="products-content__table"
          :data="products.filter(data => !search || data.category.toLowerCase().includes(search.toLowerCase()))"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            label="Category"
            width="170"
            prop="category"
            sortable
          >{{products.category}}</el-table-column>
          <el-table-column label="Product Name" width="170" prop="title"></el-table-column>
          <el-table-column label="Cost" width="90" prop="origin_price" sortable></el-table-column>
          <el-table-column label="Price" width="90" prop="price" sortable></el-table-column>
          <el-table-column label="Active" width="90" prop="readableStatus" sortable></el-table-column>
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

      <Pagination
        class="products-content__pagination"
        v-model="pagination"
        :changePage="changePage"
      />
    </div>
  </div>
</template>

<script>
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/admin/products`;
const deleteApi = `${process.env.VUE_APP_API}api/leochuang/admin/product/`;
import { mapActions } from "vuex";
import CreateProductForm from "@/components/form/CreateProductForm.vue";
import Button from "@/components/reuse/Button.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    CreateProductForm,
    Button,
    Pagination
  },
  data() {
    return {
      products: [],
      search: "",
      isLoading: false,
      pagination: {},
      selectedItem: [],
      showDeleteBtn: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.init();
    this.$root.$on("Popup:refreshPageTableData", () => {
      this.getProducts();
    });
    this.products.forEach(item => {
      item.is_enabled === 1
        ? (item.readableStatus = "Active")
        : (item.readableStatus = "Disabled");
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
          this.products.forEach(item => {
            item.is_enabled === 1
              ? (item.readableStatus = "Active")
              : (item.readableStatus = "Disabled");
          });
          this.pagination = pagination;
          this.isLoading = false;
        } else {
          alert("請先登入，以利取得資料");
          this.$router.push({ name: "login" });
          this.isLoading = false;
        }
      });
    },
    handleEdit(index, rowData) {
      this.setPopupData(rowData);
      this.showSidePopup("CreateProductForm");
    },
    handleDelete(index, row) {
      this.$http
        .delete(`${deleteApi}${row.id}`, {
          data: row
        })
        .then(res => {
          this.init();
          this.deleteMessage();
        });
    },
    showSidePopup() {
      this.setPopupComponent("CreateProductForm");
    },
    deleteMessage() {
      this.$message({
        showClose: true,
        message: "已刪除",
        type: "success"
      });
    },
    changePage(pageNumber) {
      this.getProducts(pageNumber);
    },
    handleSelectionChange(val) {
      this.selectedItem = val;
      if (val.length > 0) {
        this.showDeleteBtn = true;
      } else this.showDeleteBtn = false;
    },
    deleteMultiProducts(selectedItem) {
      if (selectedItem.length > 0) {
        selectedItem.map(item => {
          return this.handleDelete("", item);
        });
      } else
        this.$message({
          message: "請選擇產品進行刪除",
          type: "warning"
        });
    }
  }
};
</script>