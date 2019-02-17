<style lang="stylus">
.main-header
  &-nav
    display flex
    padding 10px 20px
    align-items center
    justify-content space-between
    background rgba(0, 0, 0, 0.3)
    font-size 20px
    flex-wrap wrap

    &__item
      margin 5px 10px

      span
        margin-right 20px
        cursor pointer

    &__icon
      flex-grow 1

      img
        width 100%

    &__mobile
      display none

    @media only screen and (max-width: 600px)
      &__item
        display none

      &__mobile
        transition all 1s linear
        cursor pointer
        flex-direction column
        display flex
        width 30%
        text-align right

        &-item
          display inline-block
          width 100%
          margin-top 20px

          li
            border-bottom 1px solid #fff
            text-align center
            padding-bottom 5px
            margin-bottom 20px

  &-excerpt-container
    width 100%

  &-excerpt
    padding-top 18%
    font-size 30px

    h4
      padding-left 6%
      max-width 450px
      font-weight 600

    &__text
      font-size 16px
      padding-left 6.5%
      margin 20px 0
      max-width 350px
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
        <span>Side Project</span>
      </div>
      <div class="main-header-nav__item">
        <span @click="redirectPage('home')">Home</span>
        <span @click="redirectPage('home_products')">Products</span>
        <span @click="redirectPage('admin')">Admin</span>
      </div>
      <div class="main-header-nav__mobile">
        <i class="fas fa-bars" @click.prevent="toggleNav"></i>
      </div>
      <transition name="page">
        <template v-if="exandNav">
          <ul class="main-header-nav__mobile-item">
            <li @click="redirectPage('home')">
              <span>Home</span>
            </li>
            <li @click="redirectPage('home_products')">
              <span>Products</span>
            </li>
            <li @click="redirectPage('admin')">
              <span>Admin</span>
            </li>
          </ul>
        </template>
      </transition>
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
    return {
      exandNav: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    redirectPage(pageName) {
      this.$router.push({ name: pageName });
    },
    toggleNav() {
      this.exandNav = !this.exandNav;
    }
  }
};
</script>