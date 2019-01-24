<style lang="stylus">
@import '../assets/style/_base.styl'

.card-container
  width 100%
  height 100%
  display flex
  flex-wrap wrap
  justify-content space-evenly

  .el-card, .card
    width 280px
    margin 5px
    border-radius 8px

    &__background
      width 280px
      height 200px
      background no-repeat
      background-size cover
      background-position 50% 50%

    &-info
      margin 10px 0
      padding 0 10px

      &__item
        width 100%
        height 100%
        max-height 30px
        border-bottom 1px solid #e7edf2
        padding 5px 0
        margin-bottom 10px

        p
          text-overflow ellipsis
          overflow hidden
          white-space nowrap

        &__original-price
          color grey
          font-size 16px
          text-decoration line-through

      &__btn
        margin 0
        border-radius 20px

        &__special
          color hsla(0, 87%, 69%, 0.7)
          border-radius 20px
          margin 0
          background-color hsla(0, 87%, 69%, 0.1)
          border-color hsla(0, 87%, 69%, 0.2)

          &:hover
            background-color hsla(0, 87%, 69%, 0.2)
            border-color hsla(0, 87%, 69%, 0.3)
            color hsla(0, 87%, 69%, 0.8)
</style>
<template>
  <div class="card-container">
    <el-card
      class="card"
      v-for="(item,index) in fullValue"
      :key="item.id"
      shadow="hover"
      :body-style="{ padding: '0px' }"
    >
      <div class="card__background" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
      <div class="card-info">
        <div class="form__row card-info__item">
          <span>{{item.title}}</span>
          <el-tag size="medium" type="info">{{item.category}}</el-tag>
        </div>
        <div class="form__row card-info__item">
          <p>{{item.description}}</p>
        </div>
        <div class="form__row card-info__item">
          <h4 class="card-info__item__original-price">原價：${{parseInt(item.price) * 1.8}}</h4>
          <span>售價： ${{item.price}}</span>
        </div>
        <div class="form__row">
          <Button class="card-info__btn" btnName="了解更多" @click.native="openModal(item.id)"/>
          <Button class="card-info__btn__special" btnName="加入購物車"/>
        </div>
      </div>
    </el-card>

    <!-- <Loading :active.sync="isLoading"></Loading> -->
    <!-- <Modal v-if="showModal" v-model="fullValue" @close="showModal = false">

    </Modal>-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/reuse/Button";
import Select from "@/components/reuse/Select";
import Label from "@/components/reuse/Label";
// import Modal from "@/components/Modal";
import TextArea from "@/components/TextArea";
const productApi = `${process.env.VUE_APP_API}api/${
  process.env.VUE_APP_CUSTOM
}/product/`;
const cartApi = `${process.env.VUE_APP_API}api/leochuang/cart`;
export default {
  components: {
    Button,
    Select,
    TextArea,
    Label
  },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showModal: false,
      product: {},
      isLoading: false,
    };
  },
  computed: {
    fullValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["setModalData", "setModal"]),
    openModal(id) {
      this.showModal = true;
      this.isLoading = true;
      this.$http.get(`${productApi}${id}`).then(res => {
        if (res.data.success) {
          const {
            data: { product }
          } = res;
          this.product = this.deepCopy(product);
          this.setModalData(this.product);
          this.setModal("CardModal");
          this.isLoading = false;
        } else {
          alert("請先登入，以利取得資料");
          this.$router.push({ name: "login" });
          this.isLoading = false;
        }
      });
    }
  }
};
</script>