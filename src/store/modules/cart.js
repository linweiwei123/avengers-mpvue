import { INCREMENT } from "../mutation-types";
import { ASYNC_INCREMENT } from "../action-types";

export default {
  state: {
    count: 0
  },
  mutations: {
    [INCREMENT] (state) {
      state.count++
    }
  },
  actions: {
    [ASYNC_INCREMENT] (context){
      setTimeout(() => {
        context.commit('increment')
      }, 1000)
    }
  }
}
