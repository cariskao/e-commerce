<style lang="stylus">
.upload-img
  width 100%
  display flex
  flex-direction column
  font-size 12px

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

  &__upload
    margin-top 10px

    .button[data-color-type='default']
      border-radius 20px
      margin 0

    span
      padding 0 5px

  .errorText
    color #ea0000

  .successText
    color #67C23A
</style>
<template>
  <div class="upload-img">
    <div
      v-if="fullValue"
      class="upload-img__file"
      :style="{backgroundImage: `url(${fullValue})`}"
      @click="previewImg"
    ></div>
    <div
      class="upload-img__file"
      v-else-if="imageUrl"
      :style="{backgroundImage: `url(${imageUrl})`}"
      @click="previewImg"
    ></div>
    <button v-else class="upload-img__btn" @click="previewImg">圖片預覽</button>
    <input
      class="input"
      ref="fileInput"
      type="file"
      accept="image/gif, image/jpeg, image/png"
      @change="fileSelected"
    >
    <div class="upload-img__upload">
      <Button btnName="點選上傳圖片" @click.native="uploadImg"/>
      <div v-if="status.fileUploading" class="el-icon-loading"></div>
      <span class="errorText" v-if="errorText">容量限制在 1MB 以下。</span>
      <span class="successText" v-if="successText">檔案已上傳，請按下方儲存</span>
    </div>
  </div>
</template>



<script>
import Input from "@/components/reuse/Input.vue";
import Button from "@/components/reuse/Button.vue";
export default {
  components: { Input, Button },
  props: {
    value: {
      type: [Object, String, File],
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorText: false,
      successText: false,
      limitedSize: Number(1 * 1024 * 1024),
      files: "",
      status: {
        fileUploading: false
      }
    };
  },
  watch: {},
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
      this.files = e.target.files[0];
      const files = this.files;
      this.$root.$emit("UploadImg:file", files);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", this.imgLoaded);
      fileReader.readAsDataURL(this.files);
    },
    imgLoaded(e) {
      this.fullValue = e.target.result;
    },
    previewImg() {
      this.$refs.fileInput.click();
    },
    uploadImg() {
      if (!this.files) {
        this.errorMessage("請先新增圖片");
        return;
      }
      const formData = new FormData();
      formData.append("file-to-upload", this.files);
      this.status.fileUploading = true;

      if (this.files.size > this.limitedSize) {
        this.errorText = true;
        this.status.fileUploading = false;
        // 判斷檔案大小
      } else {
        this.errorText = false;
        this.$http
          .post(this.url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            if (res.data.success) {
              this.status.fileUploading = false;
              const imageUrl = res.data.imageUrl;
              this.$root.$emit("UploadImg:imageUrl", imageUrl);
              this.successText = true;
            } else {
              this.errorText = true;
              this.status.fileUploading = false;
            }
          });
      }
    },
    errorMessage(text) {
      this.$message({
        showClose: true,
        message: text,
        type: "error"
      });
    }
  }
};
</script>
