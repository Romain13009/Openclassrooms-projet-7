<template>
    <div>
        <NavbarMain />
        <div class="row" id="wallPost">
            <div class="col-4" id="divButtonPost" v-if="user.token!==null">
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
                                <textarea v-model="dataCreatePost.content" class="form-control" id="formContentPost" maxlength="150" rows="3" placeholder="150 caractères maximum"></textarea>
                            </div>
                            <div class="custom-file">
                                <input type="file" @change="onFileSelected" class="custom-file-input" id="formImagePost">
                                <label class="custom-file-label" for="formImagePost">Choisissez une image</label>
                            </div>
                            <button type="submit" @click.prevent="createPost" class="btn btn-info" id="buttonFormCreatePost">Publier</button>
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
                                    <p class="card-text" v-if="post.content!=='null'">{{post.content}}</p>
                                    <img :src="post.image" alt="" class="w-100" v-if="post.image">
                                </div>
                            <div class="card-footer border-info">
                                <div id="footerPost">
                                    <div class="divLike">
                                        <button class="btn btn-outline-light buttonLike" @click.prevent="addLike" type="button" :id="post.id"><i class="fas fa-thumbs-up" :id="post.id"></i></button><p>{{ post.likes }}</p>
                                    </div>          
                                    <div id="footerPostButton" v-if="user.isAdmin==true || user.username==post.username">
                                        <button type="button" @click.prevent="ModifPostId" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModal" :id="post.id" >Modifier</button>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Modifiez votre message ici</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <label for="formContentModif">Écrivez votre texte ici !</label>
                                                        <textarea v-model="dataModifPost.content" class="form-control" id="formContentModif" maxlength="150" rows="3" placeholder="150 caractères maximum"></textarea>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                                        <button type="button" @click.prevent="ModifPost" :id="post.id" class="btn btn-info">Modifier</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" @click.prevent="deletePost" :id="post.id" class="btn btn-outline-danger btn-sm">Supprimer</button>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: 'Wall',
    components: {
        NavbarMain,
    },
    data() {
        return {
            allPosts: [],
            dataCreatePost: {
                content: null,
                image: null
            },
            dataModifPost: {
                content: null,
                id: null
            },
            like: {
                id: null
            }
        } 
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {  
        onFileSelected(event) {
            console.log(event)
            this.dataCreatePost.image = event.target.files[0]
        }, 
        createPost(){
            const fd = new FormData();
            fd.append('image', this.dataCreatePost.image)
            fd.append('content', this.dataCreatePost.content)
            if (fd.get('image') !== null || fd.get('content') !== null){
                if (fd.get('content').length <= 255 ) {
                    axios.post('http://localhost:3000/api/wall/new', fd, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            if (response) {
                                window.location.reload();
                            }
                        })
                        .catch(error => console.log(error))
                }
            } else {
                alert("Echec de la publication")
            }
        },
        deletePost(event){
            if (event.target.id !== null) {
                axios.delete('http://localhost:3000/api/wall/delete', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },          
                    data: {
                        id: event.target.id
                    }
                })
                    .then(response => {
                        if (response) {
                            console.log(response)
                            window.location.reload();
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                console.log('Id incorrect')
            }   
        },
        ModifPostId(event) {
            this.dataModifPost.id = event.target.id
        },
        ModifPost() {
            console.log('Modification du post id = ' + this.dataModifPost.id)
            if (event.target.id !== null) {
                axios.put('http://localhost:3000/api/wall/update', this.dataModifPost,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },          
                })
                    .then(response => {
                        if (response) {
                            console.log(response)
                            window.location.reload();
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                console.log('Id incorrect')
            }  
        },
        addLike(event) {
            if (event.target.id !== null) {
                this.like.id = event.target.id
                axios.post('http://localhost:3000/api/wall/posts/like', this.like,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },      
                })
                    .then(response => {
                        if (response) {
                            console.log(response)
                            window.location.reload();
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                console.log('Id incorrect')
            }   
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

.divLike{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items:center;
}

.divLike > p {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0.5rem;
}

.buttonLike {
    color: rgb(0, 206, 69);
}

</style>
