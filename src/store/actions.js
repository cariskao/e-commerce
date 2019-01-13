const actions = {
  setPopupShow({commit},value){
    commit('setPopupShow',value);
  },
  setPopupComponent({commit},value){
    commit('setPopupComponent',value);
  },
  setPopupData({commit},value){
    commit('setPopupData',value);
  }
};

export default actions;
