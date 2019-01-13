import Vue from "vue";
Vue.mixin({
  methods: {
    deepCopy(value) {
      const deepDataToString = JSON.stringify(value);
      const deepData = JSON.parse(deepDataToString);
      return deepData;
    }
  }
});
