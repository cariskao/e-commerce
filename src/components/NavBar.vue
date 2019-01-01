<template>
  <div class="nav">
    <el-menu :default-active="$route.name" class="nav-menu" @select="handleSelect">
      <el-menu-item
        v-for="(item,idx) in navItem"
        class="nav-menu__item"
        :index="item.index"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="stylus">
.nav
  &-menu
    height 100vh

    &__item
      text-align center
      width 100%
</style>

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
          index: "orders"
        },
        {
          name: "登入",
          index: "login"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleSelect(key, keyPath) {
      // this.$router.push({ name: key });
    }
  }
};
</script>
