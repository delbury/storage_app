import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

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
      { label: '厨房111', id: '4', items: [] },
      { label: '卧室222', id: '5', items: [] },
      { label: '厨房333', id: '6', items: [] },
      { label: '卧室444', id: '7', items: [] },
      { label: '厨房555', id: '8', items: [] },
      { label: '卧室666', id: '9', items: [] },
      { label: '厨房777', id: '11', items: [] },
      { label: '卧室888', id: '12', items: [] },
      { label: '厨房555', id: '13', items: [] },
      { label: '卧室666', id: '14', items: [] },
      { label: '1厨房777', id: '15', items: [] },
      { label: '2卧室888', id: '16', items: [] },
      { label: '3厨房777', id: '22', items: [] },
      { label: '4卧室888', id: '23', items: [] },
      { label: '5厨房555', id: '24', items: [] },
      { label: '6卧室666', id: '25', items: [] },
      { label: '7厨房777', id: '26', items: [] },
      { label: '8卧室888', id: '27', items: [] }
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
      console.log('this is refresh')
      state.tabList = [...state.tabList]
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