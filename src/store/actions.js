export default {
  // 重新排序
  reorderAction({ commit }, params) {
    commit('reorderMutation', params)
  },
  
  // 新增
  addNewTabAction({ commit }, params ) {
    commit('addNewTabMutation', params)
  },
  
  // 编辑
  editTabAction({ commit }, params) {
    commit('editTabMutation', params)
  },
  
  // 删除
  deleteTabAction({ commit }, params) {
    commit('deleteTabMutation', params)
  }
}