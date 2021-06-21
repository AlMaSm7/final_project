import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user_id: 0,
        username: "",
        watch_video: false,
        video:"",
        title: "", 
        video_id: 0
    },
    plugins: [createPersistedState()],
    mutations: {
        login(state, data){
            console.log(data.username)
            console.log(data.uid)
            state.user_id = data.uid
            state.username = data.username
            console.log(state)
        }, 
        logout(state){
            console.log(state)
            state.user_id = null
            state.username = null
        },
        showVideo(state, data){
            console.log(data.video)
            console.log(data.title)
            console.log(data.watch)
            state.watch_video = data.watch
            state.video = data.video
            state.title = data.title
            state.video_id = data.video_id
            console.log(state)
        }, 
        setNull(state){
            console.log(state)
            state.watch_video = null
            state.video = null
            state.title = null
        },
    }, 
    getters:{
        getVideo: function getVideo(state){
            console.log(state)
            return state.video
        },
        getWatch: function getWatch(state){
            return state.watch_video
        }
    }
})