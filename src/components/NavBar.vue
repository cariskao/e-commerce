<style lang="stylus">
.nav
  width 100%
  height 100%

  &-menu
    width 100%
    height 100%

    &__item
      text-align center
      width 100%

    .el-menu-item.is-active
      color #66cfd2

    &__icon
      margin-right 10px
</style>

<template>
  <div class="nav">
    <el-menu
      class="nav-menu"
      @select="handleSelect"
      :default-active="$route.name"
      :unique-opened="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="fas fa-lg fa-user nav-menu__icon"></i>
          <span>管理列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item,idx) in adminItem"
            class="nav-menu__item"
            :index="item.index"
          >{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>模擬訂單</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item,idx) in basicItem"
            class="nav-menu__item"
            :index="item.index"
          >{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      adminItem: [
        {
          name: "產品管理",
          index: "products"
        },
        {
          name: "訂單管理",
          index: "order"
        },
        {
          name: "優惠卷管理",
          index: "coupon"
        }
      ],
      basicItem: [
        {
          name: "模擬訂單",
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
