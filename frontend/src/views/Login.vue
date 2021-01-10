<template>
    <div>
       <NavbarConnexion />
       <main class="main justify-content-center">
            <form class="text-center border border-light p-5 w-25" action="#!">
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
                username: "",
                password: ""
            }
        }
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        loginSend() {
            if (this.dataLogin.email !== null && this.dataLogin.password !== null){
                axios.post("http://localhost:3000/api/auth/users/login", this.dataLogin)
                    .then(response => {
                        console.log(response);
                        localStorage.setItem('token', response.data.token)
                    })
            }
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
}
</style>
