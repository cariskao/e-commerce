<style lang="stylus">
.upload-img
  width 100%
  display flex
  flex-direction column

  &__file
    width 100px
    height 100px
    border-radius 100%
    align-self center
    background no-repeat center center
    background-size cover

  &__btn
    align-self center
    border-radius 50%
    width 100px
    height 100px
    outline none

    &:active
      border-style none

    &:hover
      background-color rgb(209, 209, 209)
</style>
<template>
  <div class="upload-img">
    <div
      v-if="fullValue"
      class="upload-img__file"
      :style="{backgroundImage: `url(${fullValue})`}"
      @click="upload"
    ></div>
    <button v-else class="upload-img__btn" @click="upload">圖片預覽</button>
    <input class="input" ref="fileInput" type="file" @change="fileSelected">
  </div>
</template>



<script>
import Input from "@/components/reuse/Input.vue";
export default {
  components: { Input },
  props: {
    value: {
      type: [Array, String],
      default: []
    }
  },
  data() {
    return {
      img: ""
    };
  },
  watch: {
    // fullValue(newValue){
    //   console.log(newValue)
    //   if(this.fullValue === ''){
    //     this.img = ''
    //   }else this.img = newValue
    // }
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
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    fileSelected(e) {
      const files = e.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", this.imgLoaded);
      fileReader.readAsDataURL(files[0]);
    },
    imgLoaded(e) {
      // this.fullValue = "";
      this.fullValue = e.target.result;
    },
    upload() {
      this.$refs.fileInput.click();
    }
  }
};
</script>
