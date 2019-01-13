const mutations = {
  setPopupShow(state, value) {
    state.isPopupShow = value;
  },
  setPopupComponent(state, value) {
    state.PopupComponent = value;
  },
  setPopupData(state, value) {
    state.PopupData = value;
  }
};

export default mutations;
