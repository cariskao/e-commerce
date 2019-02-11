<style lang="stylus">
.footer
  height 150px
  background-color #000
  padding 20px
  flex-flow column wrap
  align-items center
  justify-content center
  display flex

  &__content
    color #fff
    line-height 1
    text-align center
    margin 10px

  &__icon
    color white

    a
      cursor pointer
      margin 5px
      border #fff
      color #fff

      &:visited
        color white
</style>
<template>
  <div class="footer">
    <div class="footer__content">
      <p>Thanks for the time to visit!</p>
      <p>Created by Leo</p>
    </div>
    <div class="footer__icon">
      <a href="https://www.linkedin.com/in/leo-chuang/" target="_blank">
        <i class="fab fa-lg fa-linkedin"></i>
      </a>
      <a href="mailto:leo36094@gmail.com" target="_blank">
        <i class="fas fa-lg fa-envelope"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>