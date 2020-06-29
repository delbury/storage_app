export default {
  exchangeOrderMutation(state, { index1, index2, cb }) {
    ;[state.tabList[index1], state.tabList[index2]] = [state.tabList[index2], state.tabList[index1]]
    state.tabList = [...state.tabList]
    
    cb && cb()
  },
  
  // 重新排序
  reOrderMutation(state, { orders, cb }) {
    state.tabList = orders.map(order => state.tabList[order])
    
    cb && cb()
  },
  
  // 刷新
  refreshMutation(state) {
    state.tabList = [...state.tabList]
  },
  
  // 新增
  addNewTabMutation(state, data) {
    if(!data.label) {
      return false
    }
    state.tabList.push({
      label: data.label,
      id: randomId(),
      items: []
    })
  },
  
  // 编辑
  editTabMutation(state, data) {
    const index = state.tabList.findIndex(it => it.id === data.id)
    state.tabList[index].label = data.label
  },
  
  // 删除
  deleteTabMutation(state, ids) {
    state.tabList = state.tabList.filter(it => !ids.includes(it.id))
  }
}