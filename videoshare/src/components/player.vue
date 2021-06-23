<template>
    <div class="video-container">
        <h1>DaTube</h1>
        <div class="video_player">
            <video :src="require(`../assets/VIDEOS/${video_src}`)" controls autoplay muted></video>
        </div>
        <div class="content">
            <p class="title">{{title}}</p>
            <p class="views">Views: {{media_numbers[0].views}}</p>
            <font-awesome-icon :icon="['fas', 'thumbs-up']" size="2x" class="like" @click="like(id, user_id)"/>
            <p class="like_text">{{media_numbers[0].likes}}</p>
        </div>
        <div class="input_comments">
            <textarea type="text" v-model="comment" placeholder="Comment..." rows="1" cols="100" required></textarea>
            <font-awesome-icon :icon="['fas', 'paper-plane']" size="2x" class="like" @click="handle_comment(id, user_id)"/>
        </div>
        <div v-for="comment in all_comments" :key="comment" class="comments">
            <p>Username: {{comment.username}}</p><br>
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
            media_numbers: [],
            likes: 0
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
                    this.media_numbers.push({"views": element.views, "likes": element.likes})
                    this.likes = element.likes
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
                this.loadnums(id)
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
        cursor: pointer;
        color: rgb(143, 143, 143);
        transition: 0.7s;
    }
    .like:hover{
        cursor: pointer;
        color: rgb(60, 128, 255);
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
    .content{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 10px;
        align-items: baseline;
    }
    .content > p{
        color: rgb(175, 175, 175);
    }
    .views{
        font-size: 15px;
    }
    .input_comments{
        display: flex;
    }
    .title{
        font-size: 25px;
        margin: 50px;
    }
    video{
        width: 1100px;
        height: 600px;
        background-color: black;
    }
    .video_player{
        display: flex;
        justify-content: left;
        margin-left: 100px;
        height: min-content;
    }
    h1{
        display: flex;
        justify-content: left;
        margin-left: 100px;
    }
    textarea{
        background-color: transparent;
        border: none;
        border-radius: 2px;
        color: rgb(167, 167, 167);
        border-bottom: rgb(175, 175, 175) 1px solid;
        resize: none;
    }
    textarea::placeholder{
        color: rgb(167, 167, 167);
    }
    textarea:focus{
        color: rgb(175, 175, 175);
        outline: none;
        
    }
    .input_comments{
        margin-left: 100px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: baseline;
    }
    .comments > p{
        color: rgb(167, 167, 167);
    }
    .comments{
        display: flex;
        justify-content: flex-start;
        flex-direction: column-reverse;
    }


</style>