<style lang="stylus">
.login-page
  &__wrapper
    width 100%
    height 100%
  &__container
    display flex
    height calc(100vh - 10%)
    align-items center
    margin 0 auto
</style>
<template>
  <div class="login-page__wrapper">
    <div class="login-page__container">
      <router-view></router-view>
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
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

