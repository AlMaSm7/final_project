<template>
    <div class="user_container">
        
            <h1>{{infos[0].username}}</h1>
            <p>{{infos[0].firstname}}</p>
            <p>{{infos[0].lastname}}</p>
            <p>{{info[0].email}}</p>
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
    beforeMount() {
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