const mutations = {
  setPopupShow(state, value) {
    state.isPopupShow = value;
  },
  setPopupComponent(state, value) {
    state.PopupComponent = value;
  },
  setPopupData(state, value) {
    state.PopupData = value;
  },
  setModalShow(state, value) {
    state.isModalShow = value;
  },
  setModalData(state, value) {
    state.modalData = value;
  },
  setModal(state, value) {
    state.modal = value;
  }
};

export default mutations;
