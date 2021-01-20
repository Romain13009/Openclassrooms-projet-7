<template>
    <div>
        <NavbarMain />
        <div class="row" id="mainProfile">
            <div class="page-content page-container" id="page-content">
                <div class="card cardMain">
                    <div class="card-body text-center">
                        <div> <img src="https://img.icons8.com/bubbles/100/000000/administrator-male.png" class="img-lg rounded-circle mb-4" alt="profile image">
                            <h4>{{ user.username }}</h4>
                        </div>
                        <p class="mt-2 card-text">{{ user.description }}</p>
                        <div class="border-top pt-3">
                            <div class="row">
                                <div class="col-6">
                                    <h6>E-mail:</h6>
                                    <p>{{ user.email }}</p>
                                </div>
                                <div class="col-6">
                                    <h6>Modifiez votre description:</h6>
                                    <!-- Button trigger modal -->
                                    <p>
                                    <button class="btn btn-info buttonModif" type="button" data-toggle="collapse" data-target="#formCreatePost" aria-expanded="false" aria-controls="formCreatePost">
                                        ici        
                                        </button>
                                    </p>
                                    <div class="collapse" id="formCreatePost">
                                        <div class="card card-body cardModifDescription">
                                            <form>
                                                <div class="form-group">
                                                    <label for="formContentPost">Modifiez votre description ici !</label>
                                                    <textarea v-model="dataModif.description" class="form-control" id="formContentPost" maxlength="150" rows="3" placeholder="150 caractères maximum"></textarea>
                                                </div>
                                                <button type="submit" class="btn btn-info" id="buttonFormCreatePost" @click.prevent="modifDescription">Sauvegardez vos modification</button>
                                            </form>
                                        </div>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                        <div class="border-top pt-3" id="blockModif2">
                            <div class="row">
                                <div class="col-12">
                                    <h6>Supprimez votre compte</h6>
                                    <h6>Attention, cette action est irréversible et entraînera une suppression des publications !</h6>
                                    <button type="button" class="btn btn-danger buttonModif" @click.prevent="deleteUser">Ici</button>
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
            dataModif: {
                description: null,
            }
        } 
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        deleteUser() {
            axios.delete('http://localhost:3000/api/auth/users/delete', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(() => {
                localStorage.clear()
                window.location="/signup"
            })
            .catch((error) => {
                console.log(error)
                alert('ERREUR ! Suppression du compte impossible, contactez un administrateur.')
            })
        },
        modifDescription() {
            if (this.dataModif.description == null) {
                this.dataModif.description = ' '
            }
            axios.put('http://localhost:3000/api/auth/users/profile', this.dataModif,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (response) {
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert('ERREUR ! Modification impossible.')
            })
        }   
    },
    mounted() {
        this.$store.dispatch("getDataUser")
    }
}
</script>

<style scoped>
#mainProfile{
    margin-top: 6rem;
    display: flex;
    justify-content: center;
}

.cardMain {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #d2d2dc;
    border-radius: 0;
    width: 80vw;
}

h6 {
    font-size: .9375rem
}

.buttonModif{
    width: 120px;
}

#blockModif2{
    margin-top: 1rem;
}
</style>
