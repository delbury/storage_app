import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // 当前的home
    currentHome: { label: '豪宅', id: '1' },
    
    // 全部home
    homeList: [
      { label: '豪宅很贵很大很高啥都有名字又长', id: '1' },
      { label: '别墅', id: '2' }
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
    spaceList: [
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
    ],
    
    // 自定义的分类
    customSortsList: [
      {
        pid: null,
        id: '1',
        label: '电子产品',
        children: [
          {
            pid: '1',
            id: '11',
            label: '笔记本',
            tags: ['电脑', '笔记本', 'PC', '计算机']
          }
        ]
      }
    ],
    
    // 默认的分类
    // defaultSortsList: []
  },
  mutations,
  actions,
  getters
})

export default store