<template>
    <h1>My Videos</h1>
</template>

<script>
import store from '../store'
export default {
    data() {
        return {
            user_id: 0
        }
    },
    beforeMount(){
        this.user_id = store.state.user_id
    }
}
</script>

<style>

</style>