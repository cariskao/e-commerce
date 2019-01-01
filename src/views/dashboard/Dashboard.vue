<template>
  <div class="dashboard">
    <div class="dashboard__nav">
      <NavBar/>
    </div>
    <div class="dashboard__table">Table data
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="stylus">
.dashboard
  display flex
  width 100%
  height 100vh

  &__nav
    width 15%

  &__table
    padding 15px
</style>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
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
