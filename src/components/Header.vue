<style lang="stylus">
.header
  display flex
  justify-content space-between
  align-items center
  padding 10px
  border-bottom 1px solid #e7edf2

.logo-zone
  padding 15px

  &-name
    padding-left 10px
    color #66cfd2
    font-size rem(18px)
    font-weight 900

.user-info
  display flex
  align-items center

  &__text
    font-size rem(14px)
    color #66cfd2
    font-weight 600

  &__btn
    width 30px
    font-size 12px
</style>
<template>
  <div class="header">
    <div class="logo-zone">
      <div class="logo-zone-name">Side Project</div>
    </div>
    <div class="user-info">
      <div class="user-info__text company-name">Leo</div>
      <Button class="user-info__btn" btnName="登出" @click.native.prevent.stop="logout"/>
    </div>
  </div>
</template>
<script>
const logoutApi = `${process.env.VUE_APP_API}logout`;
import Button from "@/components/reuse/Button";
export default {
  components: {
    Button
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$http.post(logoutApi).then(res => {
        this.$router.push({name:'login'});
      });
    }
  }
};
</script>