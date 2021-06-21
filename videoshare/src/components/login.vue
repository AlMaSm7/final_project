<template>
    <div>
        <input type="text" placeholder="Username..." v-model="username"/>
        <input type="password" placeholder="Password..." v-model="password"/>
        <button @click="login()" type="submit" value="submit">Submit</button>
    </div>
</template>
<script>
import axios from 'axios';
import Vue from "vue";
import { bus } from "../main.js";
import store from '../store.js';
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: ""
        }
    },

    
    methods: {
        login: async function login() {
            const { username, password } = this;
            axios
            .post("http://localhost:3000/login", {
                username,
                password
            })
            .then((Response) => {
                //console.log(Response);
                console.log("no error");
                Vue.$cookies.set(
                    username,
                    "97410df8-c866-11eb-b8bc-0242ac130003",
                    "1d"
                )
                console.log(Response.data)
                let uid = Response.data[0].user_id
                let uname = Response.data[0].username
                console.log(uid)
                store.commit('login', { username: uname, uid: uid })
                console.log(store.state)
                bus.$emit("cookieset", username)
            })
            .catch((error) => {
                console.log(error);
            })
        }   
    }
}
</script>
