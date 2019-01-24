<style lang="stylus">
@import '../../assets/style/_base.styl'

.select
  .el-select
    width 100%

  &[data-is-error=true]
    .el-input--suffix .el-input__inner
      border-color $input-error-color

  &[data-css-style=default]
    .el-input__icon
      line-height 32px

    .el-select .el-input.is-focus .el-input__inner, .el-input__inner:hover, .el-input__inner:focus
      border-color $primary-color

    .el-input--suffix .el-input__inner::placeholder
      color #545556

  &[data-css-style=green]
    .el-input__icon
      line-height 38px
      color #ffffff

    .el-input__inner
      background-color $primary-color
      color #ffffff
      border-radius 0
      height 40px

    .el-select .el-input.is-focus .el-input__inner
      border-color $primary-color

    .el-input--suffix .el-input__inner::placeholder
      color #545556

.el-select-dropdown__item
  font-weight normal

  &.selected
    color $primary-color
</style>
<template>
  <div class="select" :data-css-style="cssStyle" :data-is-error="isError">
    <el-select v-model="fullValue" @change="selectChange" :placeholder="placeholder">
      <el-option
        v-for="(item,index) in selectOptions"
        :key="item[valueKey]"
        :value-key="valueKey"
        :label="item[label]"
        :value="item[valueKey]"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: () => {
        return "";
      }
    },
    valueKey: {
      type: String,
      default: "value"
    },
    label: {
      type: String,
      default: "name"
    },
    selectOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    cssStyle: {
      type: String,
      default: () => {
        return "default";
      }
    },
    isError: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return "請選擇";
      }
    }
  },
  data() {
    return {};
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
    selectChange(value) {
      this.$emit("Select:selectChange", value);
    }
  }
};
</script>