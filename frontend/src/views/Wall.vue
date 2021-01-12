<template>
    <div>
        <NavbarMain />
        <!--<Post v-for="post in allPosts" v-bind:key="post.id" @infosPost="setInfos" />-->
        <div class="row" id="wallPost">
            <div class="col-4" id="divButtonPost">
                <p>
                   <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#formCreatePost" aria-expanded="false" aria-controls="formCreatePost">
                    Que voulez-vous dire, {{ user.username }} ?          
                    </button>
                </p>
                <div class="collapse" id="formCreatePost">
                    <div class="card card-body">
                        <form>
                            <div class="form-group">
                                <label for="formContentPost">Écrivez votre texte ici !</label>
                                <textarea class="form-control" id="formContentPost" rows="3"></textarea>
                            </div>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="formImagePost">
                                <label class="custom-file-label" for="formImagePost">Choose file</label>
                            </div>
                            <button type="submit" class="btn btn-info" id="buttonFormCreatePost">Publier</button>
                        </form>
                    </div>
                </div>
            </div>        
            <div class="col-8"> 
                <div v-for="post in allPosts" v-bind:key="post.id">
                    <div id="containerPosts">
                        <div class="card border-info mb-3" style="width: 26rem;">
                            <div class="card-header text-info">
                                <div id="headerPost">
                                    <p>{{ post.username }}</p>
                                    <p>le {{ post.createdAt.split('T')[0] }} à {{ post.createdAt.split("T").pop().split(".000Z")[0] }}</p>
                                </div>
                            </div>
                                <div class="card-body">
                                    <p class="card-text">{{post.content}}</p>
                                </div>
                            <div class="card-footer border-info">
                                <div id="footerPost">
                                    <p id="pFooter">j'aime: {{ post.likes }}</p>
                                    <div id="footerPostButton" v-if="user.isAdmin==true || user.username==post.username">
                                        <button type="button" class="btn btn-outline-info btn-sm">Modifier</button>
                                        <button type="button" class="btn btn-outline-danger btn-sm">Supprimer</button>
                                    </div>             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>    
        </div>
    </div>
</template>

<script>
import NavbarMain from '@/components/NavbarMain.vue'
//import Post from '@/components/Post.vue'
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: 'Wall',
    components: {
        NavbarMain,
        //Post,
    },
    data() {
        return {
            post:{
                id:"",
                content:"",
                image:""
            },
            allPosts: [] 
        } 
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {   
        setInfos(payload) {
            this.post = payload.post;
        } 
    },
    mounted() {
        this.$store.dispatch("getDataUser")
        axios.get("http://localhost:3000/api/wall", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
          console.log(response.data);
          this.allPosts = response.data
        })
        .catch(error => console.log(error))
    }
}
</script>

<style scoped>
#wallPost{
    margin-top: 6rem;
    display: flex;
    flex-direction: row;
}

#containerPosts{
    display: flex;
    justify-content: left;
    
}

#headerPost{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 1.5rem;
}

#footerPost{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 1.5rem;
}

#footerPostButton{
    width: 10rem;
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#pFooter{
    margin-top: auto;
    margin-bottom: auto;
}

#buttonPost{
    height: 3rem;
}

#divButtonPost{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items:center;
}

#formCreatePost{
    width: 25rem;
}

#buttonFormCreatePost{
    margin-top: 1rem;
}
</style>
