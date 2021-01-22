<template>
    <div>
       <NavbarConnexion />
       <main class="main">
            <form class="text-center border border-light w-50">
                <p class="h4 mb-4">IDENTIFICATION</p>
                <input type="email" v-model="dataLogin.email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">
                <input type="password" v-model="dataLogin.password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Mot de passe">
                <button class="btn btn-info btn-block my-1" type="submit" @click.prevent="loginSend">Connexion</button>
            </form>
        </main>
    </div>
</template>

<script>
import NavbarConnexion from '@/components/NavbarConnexion.vue'
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: 'Login',
    components: {
        NavbarConnexion,
    },
    data() {
        return {
            dataLogin: {
                email: null,
                password: null
            }
        }
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        loginSend() {
            if (this.dataLogin.email !== null && this.dataLogin.password !== null){
                localStorage.removeItem('token')
                axios.post("http://localhost:3000/api/auth/users/login", this.dataLogin)
                    .then(response => {
                        console.log(response);
                        localStorage.setItem('token', response.data.token)
                        window.location="/wall"
                    })
                    .catch((error) => {
                                console.log( error + ' Email ou mot de passe incorrect.' )
                                alert('ERREUR ! Email ou mot de passe incorrect.')
                    })
            } else {
                alert('ERREUR ! Veuillez renseigner les champs Email et Mot de passe.')
            }
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    
}

form {
    max-width: 400px;
}

</style>
