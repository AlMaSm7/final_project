<template>
    <div class="video-container">
        <video :src="require(`../assets/VIDEOS/${video_src}`)" controls autoplay muted></video>
        <p>{{title}}</p>
        <button class="like"></button>
        <textarea type="text" v-model="comment" placeholder="Comment..." rows="4" cols="50"></textarea>
        <button type="submit" @click="handle_comment(id, user_id)">Submit comment</button>
        <div class="comments" v-for="comment in all_comments" :key="comment">
            <p>{{comment.username}}</p>
            <p>{{comment.text}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
export default {
    data() {
        return {
            video_src: "",
            title:"",
            id: 0,
            user_id: store.state.user_id,
            all_comments: []
        }
    },
    methods:{
        handle_comment: function handle_comment(id, user_id){
            const {comment} = this;
            axios.post('http://localhost:3000/comment', {
                id,
                user_id,
                comment
            }).then((res) => {
                console.log(res.data)
                this.loadnewComment(id)
            }).catch((err) => {
                console.log(err)
            })
        },
        getComments: function getComments(id){
            axios.post('http://localhost:3000/getComments', {
                id
            }).then((Response) => {
                console.log(Response.data)
                console.log(this.all_comments)
                Response.data.forEach(element => {
                    this.all_comments.push({"text": element.text, "username": element.username, time: element.time})
                })
                console.log(this.all_comments)
            }).catch((err) => {
                console.log(err)
            })
        },
        loadnewComment: function loadnewComment(id){
            axios.post('http://localhost:3000/getComments', {id}).then((Response) => {
                this.all_comments.length = 0
                Response.data.forEach(element => {
                    this.all_comments.push({"text": element.text, "username": element.username, time: element.time})
                })
                console.log(this.all_comments)
            }).catch((err) => {
                console.log(err)
            })
        }, 

    },
    created() {
        this.video_src = store.state.video
        this.title = store.state.title
        this.id = store.state.video_id
        this.getComments(this.id)
    },
}
</script>

<style>
    .like{
        background-image: url(../assets/like.png) no-repeat;
    }
</style>