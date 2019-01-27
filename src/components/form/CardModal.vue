<style lang="stylus">
@import '../../assets/style/_base.styl'

.card-modal
  width 100%

  .modal
    &__background
      width 500px
      height 300px
      background no-repeat center center
      background-size contain

      img
        width 100%

    &__label
      font-weight normal
      padding 5px

    &__item
      width 100%
      height 100%
      max-height 30px
      border-bottom 1px solid #e7edf2
      padding 5px 0
      margin-bottom 10px

      &__original-price
        color grey
        font-size 16px
        text-decoration line-through

      p
        text-overflow ellipsis
        overflow hidden
        white-space nowrap

    &__select
      width 100%
      margin-bottom 10px

    &__btn
      margin 0
      border-radius 20px
</style>
<template>
  <div v-if="form" class="card-modal">
    <Loading :active.sync="isLoading"></Loading>
    <h3 class="form__row modal__item" slot="header">{{form.title}}</h3>
    <div class="form__row" slot="body">
      <div class="modal__background" :style="{backgroundImage:`url(${form.imageUrl})`}"></div>
      <div class="form__column full">
        <Label class="modal__label" labelName="產品敘述"/>
        <TextArea :readonly="true" :rowHeight="3" v-model="form.description"/>
      </div>

      <div class="form__row modal__item">
        <h4 class="modal__item__original-price">原價：${{parseInt(form.price) * 1.8}}</h4>
        <p>特價： ${{form.price}}</p>
      </div>
      <Select
        v-model="form.num"
        placeholder="請選擇數量"
        :selectOptions="selectOptions"
        class="form__row modal__select"
      ></Select>
    </div>
    <div class="form__row" slot="footer">
      <Button
        class="modal__btn"
        colorType="special"
        @click.native="addToCart(form.id, form.num)"
        btnName="加入購物車"
      />
      <Button class="modal__btn" btnName="確認" @click.native="cancel"/>
    </div>
  </div>
</template>

<script>
const cartApi = "https://vue-course-api.hexschool.io/api/leochuang/cart";
import { mapGetters, mapActions } from "vuex";
import ModalContent from "@/components/ModalContent";
import TextArea from "@/components/TextArea";
import Button from "@/components/reuse/Button";
import Select from "@/components/reuse/Select";
import Label from "@/components/reuse/Label";
export default {
  components: {
    ModalContent,
    TextArea,
    Button,
    Label,
    Select
  },
  props: {},
  data() {
    return {
      form: {
        title: "",
        imageUrl: "",
        description: "",
        price: "",
        num: "",
        id: ""
      },
      selectOptions: [
        { name: "數量1", value: 1 },
        { name: "數量2", value: 2 },
        { name: "數量3", value: 3 },
        { name: "數量4", value: 4 },
        { name: "數量5", value: 5 },
        { name: "數量6", value: 6 },
        { name: "數量7", value: 7 },
        { name: "數量8", value: 8 },
        { name: "數量9", value: 9 }
      ],
      isLoading: false
    };
  },

  computed: {
    ...mapGetters(["modalData"])
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(["setModal"]),
    init() {
      this.getFormInitial();
    },
    getFormInitial() {
      this.isLoading = true;
      this.form = this.deepCopy(this.modalData);
      this.isLoading = false;
    },
    addToCart(id, qty) {
      this.isLoading = true;
      this.$http.post(cartApi, { data: { product_id: id, qty } }).then(res => {
        this.showModal = false;
        this.$root.$emit("CardModal:refresh")
        this.isLoading = false;
        this.notifySuccess("成功加入購物車");
      });
    },
    notifySuccess(text) {
      this.$message({
        showClose: true,
        message: text,
        type: "success"
      });
    },
    cancel() {
      this.setModal("");
    }
  }
};
</script>