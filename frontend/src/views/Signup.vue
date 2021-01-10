<template>
    <div>
        <NavbarConnexion />
        <main class="main justify-content-center">
            <form class="text-center border border-light p-5 w-25" id="formulaire">
                <p class="h4 mb-4">INSCRIPTION</p>
                <input type="Name" v-model="dataSignup.username" id="defaultSignupFormName" class="form-control mb-4" placeholder="Username (12 caractères maximum)" required>
                <input type="email" v-model="dataSignup.email" id="defaultSignupFormEmail" class="form-control mb-4" placeholder="E-mail" required>
                <input type="password" v-model="dataSignup.password" id="defaultSignupFormPassword" class="form-control mb-4" placeholder="Mot de passe" required>
                <input type="text" v-model="dataSignup.description" id="defaultSignupFormDescription" class="form-control mb-4" placeholder="Description (optionnelle)">
                <button class="btn btn-info btn-block my-1" type="submit" @click.prevent="signupSend" >Inscription</button>
            </form>
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import NavbarConnexion from '@/components/NavbarConnexion.vue'

export default {
    name: 'Signup',
    components: {
        NavbarConnexion,
    },
    data(){
        return {
            dataSignup: {
                username:"",
                email:"",
                password:"",
                description:""
            },
            dataLogin: {
                email: "",
                password: ""
            }
        };
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        signupSend() {
            const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

            if ( this.dataSignup.username !== undefined && this.dataSignup.email !== undefined && this.dataSignup.password !== undefined) {
                if ( this.dataSignup.username.length <= 13 && this.dataSignup.username.length >= 3) {
                    if(this.dataSignup.email.match(regexEmail) && this.dataSignup.password.match(regexPassword)) {
                        axios.post('http://localhost:3000/api/auth/users/signup', this.dataSignup)
                            .then(() => {
                                var dataLogin = {
                                    email: null,
                                    password: null,
                                }
                                dataLogin.email = this.dataSignup.email
                                dataLogin.password = this.dataSignup.password
                                localStorage.removeItem('token')
                                axios.post('http://localhost:3000/api/auth/users/login', dataLogin)
                                    .then(response => {
                                        console.log(response);
                                        localStorage.setItem('token', response.data.token)
                                        window.location="/wall"
                                    })
                                    .catch(error => console.log( error ))
                            })
                            .catch(error => console.log( error ))
                    } else {
                        alert("Echec d'inscription, assurez vous que votre mail ou que votre mot de passe soit valide (au moins une majuscule, une minucule, un nombre et 8 caractères)");
                    }
                } else {
                    alert("Echec d'inscription, votre username doit faire entre 4 et 12 caractères");
                }
            } else {
                alert("Echec d'inscription, veuillez renseigner les champs email, username et password");
            }

            

            

            /*var dataSignup = {
                username: null,
                email: null,
                password: null,
                description: null
            }

            var username = document.getElementById("defaultSignupFormName").value;
            var email = document.getElementById("defaultSignupFormEmail").value;
            var password = document.getElementById("defaultSignupFormPassword").value;
            var description = document.getElementById("defaultSignupFormDescription").value;

            const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

            if ( username == null &&  email == null && password == null) {
                return status(401).json({ error: 'Email, username ou password manquant' });
            }

            if ( username.length >= 13 || username.length <= 3) {
                return status(401).json({ error: 'Username doit faire entre 4 et 12 caractères' });
            }

            if(email.match(regexEmail) && password.match(regexPassword)) {
                dataSignup = {
                    username: username,
                    email: email,
                    password: password,
                    description: description
                }
                axios.post('http://localhost:3000/api/auth/users/signup', dataSignup)
                    .then(() => {
                        var dataLogin = {
                            email: null,
                            password: null,
                        }
                        
                        dataLogin = {
                            email: email,
                            password: password
                        }
                        axios.post('http://localhost:3000/api/auth/users/login', dataLogin)
                            .then(response => console.log(response))
                            .catch(error => console.log( error ))
                    })
                    .catch(error => console.log( error ))
            } else {
                alert("Echec d'inscription")
            }*/
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