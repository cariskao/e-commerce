<style lang="stylus">
.nav
  &-menu
    height 100%

    &__item
      text-align center
      width 100%

    .el-menu-item.is-active
      color #66cfd2
</style>

<template>
  <div class="nav">
    <el-menu class="nav-menu" @select="handleSelect" :default-active="$route.name" :unique-opened=true>
      <el-menu-item
        v-for="(item,idx) in navItem"
        class="nav-menu__item"
        :index="item.index"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      navItem: [
        {
          name: "產品管理",
          index: "products"
        },
        {
          name: "訂單管理",
          index: "order"
        },
        {
          name: "客戶訂單",
          index: "customer_order"
        },
        {
          name: "登入",
          index: "login"
        }
      ],
      activeIndex: "products"
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ name: key });
    }
  }
};
</script>
