<template>
    <div>
        <NavbarMain />
        <PostOne />
    </div>
</template>

<script>
import NavbarMain from '@/components/NavbarMain.vue'
import PostOne from '@/components/PostOne.vue'
//import axios from "axios";
import { mapState } from "vuex";

export default {
    name: 'Wall',
    components: {
        NavbarMain,
        PostOne,
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        
        
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
}
</style>
