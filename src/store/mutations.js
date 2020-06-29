export default {
  exchangeOrderMutation(state, { index1, index2, cb }) {
    ;[state.spaceList[index1], state.spaceList[index2]] = [state.spaceList[index2], state.spaceList[index1]]
    state.spaceList = [...state.spaceList]
    
    cb && cb()
  },
  
  // 重新排序
  reOrderMutation(state, { orders, cb }) {
    state.spaceList = orders.map(order => state.spaceList[order])
    
    cb && cb()
  },
  
  // 刷新
  refreshMutation(state) {
    state.spaceList = [...state.spaceList]
  },
  
  // 新增
  addNewTabMutation(state, data) {
    if(!data.label) {
      return false
    }
    state.spaceList.push({
      label: data.label,
      id: randomId(),
      items: []
    })
  },
  
  // 编辑
  editTabMutation(state, data) {
    const index = state.spaceList.findIndex(it => it.id === data.id)
    state.spaceList[index].label = data.label
  },
  
  // 删除
  deleteTabMutation(state, ids) {
    state.spaceList = state.spaceList.filter(it => !ids.includes(it.id))
  }
}