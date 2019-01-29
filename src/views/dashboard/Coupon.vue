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

      &__search
        width 100px

    &__pagination
      text-align center
      height 50px
</style>
<template>
  <div class="products">
    <div class="products-content">
      <Loading :active.sync="isLoading"></Loading>
      <Button btnName="新增優惠卷" @click.native.stop.prevent="showSidePopup"/>
      <Button btnName="刪除優惠卷" @click.native.stop.prevent="deleteMultiProducts(selectedItem)"/>
      <div class="products-content__table-container">
        <el-table
          class="products-content__table"
          :data="coupons"
          @selection-change="handleSelectionChange"
          empty-text="優惠卷尚未建立 >_<"
        >
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column label="Title" prop="title" sortable>{{coupons.title}}</el-table-column>
          <el-table-column label="Active" prop="readableStatus" sortable></el-table-column>
          <el-table-column label="Due date" prop="readableDate" sortable></el-table-column>
          <el-table-column class="products-content__table__search">
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
const couponApi = `${process.env.VUE_APP_API}api/leochuang/admin/coupons`;
const deleteCoupon = `${process.env.VUE_APP_API}api/leochuang/admin/coupon/`;
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
      coupons: [],
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
    this.$root.$on("Coupon:refreshPageTableData", () => {
      this.getCoupons();
    });
    this.coupons.forEach(item => {
      item.is_enabled === 1
        ? (item.readableStatus = "Active")
        : (item.readableStatus = "Disabled");
      item.due_date
        ? (item.readableDate = this.renderTimestamp(item.due_date))
        : (item.readableDate = "無期限");
    });
  },
  mounted() {},
  destroyed() {
    this.$root.$off("Coupon:refreshPageTableData");
  },
  methods: {
    ...mapActions(["setPopupComponent", "setPopupData"]),
    init() {
      this.getCoupons();
    },
    getCoupons(page = 1) {
      this.isLoading = true;
      this.$http.get(`${couponApi}?page=${page}`).then(res => {
        if (res.data.success) {
          const {
            data: { coupons, pagination }
          } = res;
          this.coupons = this.deepCopy(coupons);
          this.coupons.forEach(item => {
            item.is_enabled === 1
              ? (item.readableStatus = "Active")
              : (item.readableStatus = "Disabled");
            item.due_date
              ? (item.readableDate = this.renderTimestamp(item.due_date))
              : (item.readableDate = "無期限");
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
      this.showSidePopup("CreateCouponForm");
    },
    handleDelete(index, row) {
      this.$http
        .delete(`${deleteCoupon}${row.id}`, {
          data: row
        })
        .then(res => {
          this.init();
          this.deleteMessage();
        });
    },
    showSidePopup() {
      this.setPopupComponent("CreateCouponForm");
    },
    deleteMessage() {
      this.$message({
        showClose: true,
        message: "已刪除",
        type: "success"
      });
    },
    changePage(pageNumber) {
      this.getCoupons(pageNumber);
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
    },
    renderTimestamp(timestamp) {
      const data = new Date(timestamp);
      const year = data.getFullYear();
      const month = data.getMonth() + 1;
      const date = data.getDate();
      return `${year}/${month}/${date}`;
    }
  }
};
</script>