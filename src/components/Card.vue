<style lang="stylus">
.card-container
  width 100%
  height 100%
  display flex
  flex-wrap wrap
  justify-content center

  .el-card, .card
    width 280px
    margin 5px
    border-radius 8px

    &__img
      width 280px
      height 200px
      background no-repeat center center
      background-size cover

    &-info
      padding 10px

      &__item
        width 100%
        height 100%
        padding 5px
        max-height 30px
        border-bottom 1px solid #e7edf2
        margin-bottom 10px

        p
          text-overflow ellipsis
          overflow hidden
          white-space nowrap

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
      <div class="card__img" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
      <div class="card-info">
        <div class="form__row card-info__item">
          <span>{{item.title}}</span>
          <el-tag size="medium" type="info">{{item.category}}</el-tag>
        </div>
        <div class="form__row card-info__item">
          <p>{{item.description}}</p>
        </div>
        <div class="form__row card-info__item">
          <span>售價： ${{item.price}}</span>
        </div>
        <div class="form__row card-info__item">
          <Button class="card-info__btn" btnName="了解更多" @click.native="openModal"/>
          <Button class="card-info__btn__special" btnName="加入購物車"/>
        </div>
        <Modal v-if="showModal" v-model="fullValue" @close="showModal = false">
          <h3 slot="header">Title</h3>
        </Modal>
      </div>
    </el-card>
  </div>
</template>
<script>
import Button from "@/components/reuse/Button";
import Modal from "@/components/Modal";
export default {
  components: { Button, Modal },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showModal: false
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
  created() {
  },
  mounted() {},
  methods: {
    openModal() {
      this.showModal = true;
    }
  }
};
</script>