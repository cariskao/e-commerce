<style lang="stylus">
@import '../../assets/style/_base.styl'
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
      <div class="products-content__table-container">
        <el-table
          class="products-content__table"
          :data="orders"
          @selection-change="handleSelectionChange"
          empty-text="優惠卷尚未建立 >_<"
        >
          <el-table-column label="建立時間" prop="readableDate" sortable></el-table-column>
          <el-table-column label="訂單金額" prop="total" sortable></el-table-column>
          <el-table-column label="付款狀態" prop="readableStatus" sortable></el-table-column>
          <el-table-column class="products__btn-container">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                round
                @click="handleEdit(scope.$index, scope.row)"
              >查看明細</el-button>
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
const orderApi = `${process.env.VUE_APP_API}api/leochuang/admin/orders`;
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
      orders: [],
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
      this.getOrders();
    });
  },
  mounted() {},
  destroyed() {
    this.$root.$off("Popup:refreshPageTableData");
  },
  methods: {
    ...mapActions(["setPopupComponent", "setPopupData"]),
    init() {
      this.getOrders();
    },
    getOrders(page = 1) {
      this.isLoading = true;
      this.$http.get(`${orderApi}?page=${page}`).then(res => {
        if (res.data.success) {
          const {
            data: { orders, pagination }
          } = res;
          this.orders = this.deepCopy(orders);
          this.orders.forEach(item => {
            item.readableStatus = item.is_paid ? '已付款' : '尚未付款'
            item.readableDate = this.renderTimestamp(item.create_at)
          });
          console.log(this.orders)
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
      this.showSidePopup("OrderForm");
    },
    showSidePopup() {
      this.setPopupComponent("OrderForm");
    },
    deleteMessage() {
      this.$message({
        showClose: true,
        message: "已刪除",
        type: "success"
      });
    },
    changePage(pageNumber) {
      this.getOrders(pageNumber);
    },
    handleSelectionChange(val) {
      this.selectedItem = val;
    },
    renderTimestamp(timestamp) {
      const data = new Date(timestamp * 1000);
      const year = data.getFullYear();
      const month = data.getMonth() + 1;
      const date = data.getDate();
      return `${year}/${month}/${date}`;
    }
  }
};
</script>
1548697645