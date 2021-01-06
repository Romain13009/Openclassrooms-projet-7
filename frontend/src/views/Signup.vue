<template>
    <div>
        <NavbarConnexion />
        <main class="main justify-content-center">
            <form class="text-center border border-light p-5 w-25" action="#!" id="formulaire">
                <p class="h4 mb-4">INSCRIPTION</p>
                <input type="Name" id="defaultSignupFormName" class="form-control mb-4" placeholder="Username (12 caractères maximum)" required>
                <input type="email" id="defaultSignupFormEmail" class="form-control mb-4" placeholder="E-mail" required>
                <input type="password" id="defaultSignupFormPassword" class="form-control mb-4" placeholder="Mot de passe" required>
                <input type="text" id="defaultSignupFormDescription" class="form-control mb-4" placeholder="Description (optionnelle)">
                <button @click= "signupSend" class="btn btn-info btn-block my-1" type="submit">Inscription</button>
            </form>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarConnexion from '@/components/NavbarConnexion.vue'

export default {
    name: 'Signup',
    components: {
        NavbarConnexion,
    },
    methods: {
        signupSend() {
            var dataSignup = {
                username: null,
                email: null,
                password: null,
                description: null
            }

            var dataUsername = document.getElementById("defaultSignupFormName").value;
            var dataEmail = document.getElementById("defaultSignupFormEmail").value;
            var dataPassword = document.getElementById("defaultSignupFormPassword").value;
            var dataDescription = document.getElementById("defaultSignupFormDescription").value;

            const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/;
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

            if ( dataUsername == null &&  dataEmail == null && dataPassword == null) {
                return status(401).json({ error: 'Email, username ou password manquant' });
            }

            if ( dataUsername.length >= 13 || dataUsername.length <= 3) {
                return status(401).json({ error: 'Username doit faire entre 4 et 12 caractères' });
            }

            if(dataEmail.match(regexEmail) && dataPassword.match(regexPassword)) {
                dataSignup = {
                    username: dataUsername,
                    email: dataEmail,
                    password: dataPassword,
                    description: dataDescription
                }

                axios.post('http://localhost:3000/api/auth/users/signup', dataSignup)
                    .then(response => console.log(response))
                    .catch(error => console.log( error))
            } else {
                alert("Echec d'inscription")
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