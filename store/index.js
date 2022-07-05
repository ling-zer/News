// 页面路径：store/index.js
import { createStore } from 'vuex'
import mutations from '@/store/mutation.js'
import actions from '@/store/action.js'
import state from '@/store/state.js'

const store = createStore({
	state,
	mutations,
	actions
})

export default store