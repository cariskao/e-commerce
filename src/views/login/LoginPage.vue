<style lang="stylus">
.login-page
  &__wrapper
    width 100%
    height 100%

  &__container
    display flex
    height calc(100vh - 10%)
    align-items center
    justify-content center
    margin 0 auto

.login
  display flex
  align-items center
  width 100%
  &__form
    margin 0 auto
    background #ecf0f1
    width 350px
    border-radius 5px
    box-shadow 3px 3px 10px #333
    padding 20px

    &__item
      margin-bottom 20px

    &__button
      width 100%
      text-align center
      margin 0 auto

      button
        padding 15px 25px
        font-size 18px
        border-radius 4px

        &:focus, &:active
          outline none
          border-color $primary-color

        &:hover
          border-color #66cfd2
</style>
<template>
  <div class="login-page__wrapper">
    <div class="login-page__container">
      <div class="login">
        <form class="login__form form_row" @submit.prevent="signIn">
          <div class="login__form__item form__column full">
            <Label labelName="帳號"/>
          </div>
          <div class="login__form__item form__column full">
            <Input v-model="login.username" type="text" placeholder="請輸入帳號"/>
          </div>

          <div class="login__form__item form__column full">
            <Label labelName="密碼"/>
          </div>
          <div class="login__form__item form__column full">
            <Input v-model="login.password" type="password" placeholder="請輸入密碼"/>
          </div>

          <div class="login__form__button">
            <button @submit.prevent="signIn">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Label from "@/components/reuse/Label.vue";
import Input from "@/components/reuse/Input.vue";
export default {
  components: {
    Label,
    Input
  },
  props: {},
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    // this.signIn();
  },
  mounted() {},
  destroyed() {},
  methods: {
    signIn() {
      const api = "https://vue-course-api.hexschool.io/admin/signin";
      this.$http.post(api, this.login).then(res => {
        if (res.data.success) {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

