<template>
    <div class="user_container">
        <div v-for="info in infos" :key="info">
            <h1>{{info.username}}</h1>
            <p>{{info.firstname}}</p>
            <p>{{info.lastname}}</p>
            <p>{{info.email}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from "../store";

export default {
    data() {
        return {
            infos: [],
            user_id: store.state.user_id
        }
    },
    methods: {
        
    },
    created() {
        const { user_id } = this;
        axios.post("http://localhost:3000/users", {
            user_id
        }).then((Response) => {
            console.log(Response.data)
            Response.data.forEach(element => {
                console.log(element)
            this.infos.push(
                {"username": store.state.username, "firstname": element.firstname, "lastname": element.lastname, "email": element.email},
            )
            });
        }).catch((err) => {
            console.log(err)
        })
    },
}
</script>