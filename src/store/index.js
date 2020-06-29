import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)

const randomId = () => {
  return [Date.now(), Math.floor(Math.random() * 100000)].join('')
}

const store = new Vuex.Store({
  state: {
    // 全部home
    homes: [
      { label: '家', id: '1' }
    ],
    
    // 未分配的物品
    UnassignedGoods: [],
    
    // 未分配的家具
    UnassignedFurnitures: [],
    
    // 全部家具
    allFurnitures: [],
    
    // 全部物品
    allGoods: [],
    
    // 当前同一个home下不同空间
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
  mutations,
  actions,
  getters
})

export default store