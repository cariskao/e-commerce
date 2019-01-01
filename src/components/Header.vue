<style lang="stylus">
.header
  display flex
  justify-content space-between
  padding 10px
  border-bottom 1px solid #e7edf2

.logo-zone
  display inline-flex
  align-items center
  padding 15px

  &-name
    padding-left 10px
    color #66cfd2
    font-size rem(18px)
    font-weight 900

.user-info
  display inline-flex
  align-items center
  padding 0 25px

  &__text
    font-size rem(14px)
    color #66cfd2
    font-weight 600
</style>
<template>
  <div class="header">
    <div class="logo-zone">
      <div class="logo-zone-name">Side Project</div>
    </div>
    <div class="user-info">
      <div class="user-info__text company-name">Leo</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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