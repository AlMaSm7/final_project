<template>
    <div class="video-container">
        <video :src="require(`../assets/VIDEOS/${video_src}`)" controls autoplay muted></video>
        <p>Title: {{title}}</p>
        <p class="views">Views: {{media_numbers[0].views}}</p>
        <p class="like_text">Likes: {{media_numbers[0].likes}}</p>
        <button class="like" @click="like(id, user_id)"></button>
        <textarea type="text" v-model="comment" placeholder="Comment..." rows="3" cols="100" required></textarea>
        <button type="submit" @click="handle_comment(id, user_id)" class="submit">Submit comment</button>
        <div class="comments" v-for="comment in all_comments" :key="comment">
            <p>Username: {{comment.username}}</p>
            <p>Comment: {{comment.text}}</p>
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
            all_comments: [],
            media_numbers: []
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
                this.getComments(id)
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
                this.all_comments.length = 0
                Response.data.forEach(element => {
                    this.all_comments.push({"text": element.text, "username": element.username, time: element.time})
                })
                console.log(this.all_comments)
            }).catch((err) => {
                console.log(err)
            })
        },
        loadnums: function loadnums(id){
            axios.post('http://localhost:3000/numbers',{id}).then((Response) => {
                console.log(Response.data)
                Response.data.forEach(element => {
                    this.media_numbers.push({"views": element.views, "likes": element.likes, "dislikes": element.dislikes})
                })
                console.log(this.media_numbers)
            }).catch((err) => {
                console.log(err)
            })
        },
        like: function like(id, user_id){
            axios.post('http://localhost:3000/like', {
                id,
                user_id
            }).then((Response) => {
                console.log(Response.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    beforeMount() {
        this.video_src = store.state.video
        this.title = store.state.title
        this.id = store.state.video_id
        this.getComments(this.id)
        axios.get('http://localhost:3000/viewing').then((Response) => {
            console.log(Response)
        }).catch((err) => {
            console.log(err)
        })
        this.loadnums(this.id)
    },
}
</script>

<style>
    .like{
        background: url(../assets/like.png) no-repeat transparent;
        cursor: pointer;
        align-content: center;
        height: 24px;
        width: 24px;
        border: transparent;
    }
    .submit{
        cursor: pointer;
        border-radius: 5px;
        align-content: center;
        height: 25px;
        border: transparent;
        color: rgb(175, 175, 175);
        background-color: rgb(28, 28, 28);
        transition: 0.7s;
    }
    .submit:hover{
        background-color: rgb(67, 142, 15);
        color: whitesmoke;
    }

</style>