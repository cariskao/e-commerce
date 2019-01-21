<style lang="stylus">
.dashboard
  display flex
  width 100%
  height 100%
  flex-direction column

  &__header
    height 60px
    width calc(100% - 20px)
  &-container
    display flex
    width 100%
    height 100%
    overflow auto
  &__nav
    width 15%
    height 100%
  &__table
    overflow auto
    padding 10px
    width 85%
    height calc(100% - 20px)

  &__popup
    width 100%
</style>
<template>
  <div class="dashboard">
    <Header class="dashboard__header"/>
    <div class="dashboard-container">
      <NavBar class="dashboard__nav"/>
      <div class="dashboard__table">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import Products from "@/views/dashboard/Products.vue";
import Order from "@/views/dashboard/Order.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    NavBar,
    Products,
    Order,
    Header
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {
    // const api = "https://vue-course-api.hexschool.io/api/leochuang/products";
    // // API 伺服器路徑
    // // 申請的 API PATH
    // console.log(process.env.VUE_APP_API);
    // this.$http.get(api).then(res => console.log(res));
  },
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
