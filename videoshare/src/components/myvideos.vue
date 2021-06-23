<template>
    <h1>My Videos</h1>

</template>

<script>
import axios from 'axios'
import store from '../store'
export default {
    data() {
        return {
            user_id: 0,
            my_videos: []
        }
    },
    methods: {
        getmyVideos: function getMyVideos(user_id){
            axios.post("http://localhost:3000/upload", {
                user_id
            }).then((Response) => {
                Response.data.forEach(element => {
                    this.my_videos.push({"thumbnail": element.thumbnail, "video_src": element.path})
                });
            })
        },
    }, 
    beforeMount(){
        this.user_id = store.state.user_id
        this.getmyVideos(this.user_id)
    }
}
</script>

<style>

</style>