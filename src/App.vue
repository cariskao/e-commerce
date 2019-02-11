<style lang="stylus">
#app
  margin 0 auto
  min-height 100vh
  height 100%
  font-family 'Helvetica Neue', Arial, Sans-Serif

  .app
    &-content
      display flex
      height 100%
      min-width 960px
      margin 0 auto
      position relative
      flex-direction column
      box-sizing border-box

    &-table
      height calc(100% - 60px)
      width 100%
      display flex

  .dashboard__popup
    position absolute
    top 0
    right 0
    height 100%
    width 450px
    box-shadow -1px 0 6px 0 rgba(197, 197, 197, 0.5)
    // border 2px solid #ebeef5
    background-color white

  .error
    border 1px solid #F56C6C
</style>
<template>
  <div id="app" class="app">
    <div class="app-content">
      <router-view></router-view>
      <transition name="page" v-if="isPopupShow">
        <BackgroundMask/>
      </transition>
      <transition name="Popup">
        <Popup class="dashboard__popup" v-if="isPopupShow"/>
      </transition>
      <transition name="page">
        <Modal v-if="isModalShow"/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header.vue";
import Popup from "@/components/Popup.vue";
import Modal from "@/components/Modal.vue";
import BackgroundMask from "@/components/reuse/BackgroundMask.vue";
import "./assets/style/app.styl";
export default {
  components: {
    Header,
    Popup,
    Modal,
    BackgroundMask
  },
  props: {},
  data() {
    return {
      isLoading: false
    };
  },
  watch: {
    PopupComponent(newValue) {
      if (newValue) {
        this.setPopupShow(true);
      } else {
        this.setPopupShow(false);
      }
    },
    modal(newValue) {
      if (newValue) {
        this.setModalShow(true);
      } else {
        this.setModalShow(false);
      }
    }
  },
  computed: {
    ...mapGetters(["isPopupShow", "PopupComponent", "isModalShow", "modal"])
  },
  created() {
    // const api = "https://vue-course-api.hexschool.io/api/leochuang/products";
    // // API 伺服器路徑
    // // 申請的 API PATH
    // console.log(process.env.VUE_APP_API);
    // this.$http.get(api).then(res => console.log(res));
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["setPopupShow", "setModalShow"])
  }
};
</script>
