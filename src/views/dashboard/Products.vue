<style lang="stylus">
.products
  width 100%

  &-content
    width 100%

    &__table-container
      width 100%
      height calc(100% - 100px)

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

      &__search
        width 100px

    &__pagination
      display flex
      align-items flex-end
      justify-content center
      text-align center
      height 150px
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
          height="620"
        >
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column label="Category" prop="category" sortable>{{products.category}}</el-table-column>
          <el-table-column label="Product Name" prop="title"></el-table-column>
          <el-table-column label="Cost" prop="origin_price" sortable></el-table-column>
          <el-table-column label="Price" prop="price" sortable></el-table-column>
          <el-table-column label="Active" prop="readableStatus" sortable></el-table-column>
          <el-table-column class="products-content__table__search">
            <template slot="header" width="16%">
              <el-input v-model="search" size="mini" placeholder="輸入關鍵字"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="small"
                type="success"
                icon="el-icon-edit"
                round
                :style="{'margin-right':'25px'}"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                round
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
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
import Button from "@/components/reuse/Button.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Button,
    Pagination
  },
  data() {
    return {
      products: [],
      search: "",
      isLoading: false,
      pagination: {},
      selectedItem: []
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
        .then(() => {
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