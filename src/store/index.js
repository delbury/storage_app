import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const randomId = () => {
  return [Date.now(), Math.floor(Math.random() * 100000)].join('')
}

const store = new Vuex.Store({
  state: {
    tabList: [
      {
        label: '客厅',
        id: '1',
        items: [
          {
            id: '11',
            title: '厨房顶柜',
            quantity: 3,
            img: '/static/icons/tab-view-select.png'
          },
          {
            id: '12',
            title: '厨房底柜',
            quantity: 0,
            img: '/static/icons/tab-view-select.png'
          },
          {
            id: '13',
            title: '厨房底柜',
            quantity: 0,
            img: '/static/icons/tab-view-select.png'
          },
          {
            id: '14',
            title: '厨房底柜',
            quantity: 0,
            img: '/static/icons/tab-view-select.png'
          },
          // ...Array.from({length: 16}, (v, k) => ({
          //   id: 'id' + k,
          //   title: '柜子',
          //   quantity: 1,
          //   img: '/static/icons/tab-view-select.png'
          // }))
        ],
      },
      { label: '厨房', id: '2', items: [] },
      { label: '卧室', id: '3', items: [] },
    ]
  },
  mutations: {
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
  },
  actions: {},
  getters: {
    tabList(state) {
      return state.tabList
    }
  }
})

export default store