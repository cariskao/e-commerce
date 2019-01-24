const actions = {
  setPopupShow({ commit }, value) {
    commit("setPopupShow", value);
  },
  setPopupComponent({ commit }, value) {
    commit("setPopupComponent", value);
  },
  setPopupData({ commit }, value) {
    commit("setPopupData", value);
  },
  setModalShow({ commit }, value) {
    commit("setModalShow", value);
  },
  setModalData({ commit }, value) {
    commit("setModalData", value);
  },
  setModal({ commit }, value) {
    commit("setModal", value);
  }
};

export default actions;
