import { ADD_KEEP_ALIVE, REMOVE_KEEP_ALIVE } from "../mutation-types";

const viewalive = {
  state: {
    keepAlives: [],
  },
  mutations: {
    // 添加组件为keepAlive
    [ADD_KEEP_ALIVE]: function(state,compName){
      if(state.keepAlives.indexOf(compName)==-1){
        state.keepAlives.push(compName)
      }
    },
    // 组件从keepAlive中移除
    [REMOVE_KEEP_ALIVE]: function(state,compName){
      if(state.keepAlives.indexOf(compName)>=0){
        state.keepAlives.splice(compName,1)
      }
    }
  },
  getters: {
    currentKeepAlives: state => {
      return state.keepAlives
    }
  }
};

export default viewalive;
