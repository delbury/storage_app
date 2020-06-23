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
            title: '厨房顶柜',
            quantity: 3,
            img: '/static/icons/tab-view-select.png'
          },
          {
            title: '厨房底柜',
            quantity: 0,
            img: '/static/icons/tab-view-select.png'
          }
        ],
      },
      { label: '厨房', id: '2' },
      { label: '卧室', id: '3' }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    tabList(state) {
      return state.tabList
    }
  }
})

export default store