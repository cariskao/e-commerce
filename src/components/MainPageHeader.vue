<style lang="stylus">
.main-header
  &-nav
    display flex
    padding 10px 20px
    align-items center
    justify-content space-between
    background rgba(0, 0, 0, 0.3)
    font-size 20px

    &__item
      margin 5px 10px

      span
        margin-right 20px
        cursor pointer

    &__icon
      flex-basis 70%
      width 20px
      height 20px

      img
        width 100%

  &-excerpt-container
    width 100%

  &-excerpt
    padding-top 18%
    font-size 30px

    h4
      padding-left 6%
      width 450px
      font-weight 600

    &__text
      font-size 16px
      padding-left 6.5%
      margin 20px 0
      width 350px
      line-height 1.2

      strong
        font-weight 600
        font-size 18px
</style>
<template>
  <div class="main-header">
    <div class="main-header-nav">
      <div class="main-header-nav__icon">
        <i class="el-icon-time"></i>
        Side Project
      </div>
      <div class="main-header-nav__item">
        <span @click="redirectPage('home')">Home</span>
        <span @click="redirectPage('home_products')">Products</span>
        <span @click="redirectPage('admin')">Admin</span>
      </div>
    </div>
    <div class="main-header-excerpt-container">
      <slot></slot>
      <template v-if="textContent.title">
        <div class="main-header-excerpt">
          <h4>{{textContent.title}}</h4>
          <p class="main-header-excerpt__text">{{textContent.description}}</p>
        </div>
      </template>
    </div>
    
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    textContent: {
      type: Object,
      default: () => {
        return {
          title: "",
          description: ""
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    redirectPage(pageName) {
      this.$router.push({ name: pageName });
    }
  }
};
</script>