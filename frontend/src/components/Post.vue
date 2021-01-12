<template>
    <div id="containerPosts">
            <div class="card border-info mb-3" style="max-width: 26rem;">
            <div class="card-header text-info">Header</div>
            <div class="card-body">
                <p class="card-text">{{post.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Post',
    data(){
        return{};
    },
    computed: {
        ...mapState(["user"])
    },
    props: { 
        post: {
        }
    }
}
</script>

<style scoped>
    #containerPosts{
        display: flex;
        justify-content: center;
    }
</style>