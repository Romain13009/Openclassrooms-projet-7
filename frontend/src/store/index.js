import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {
      id:"",
      email:"",
      username:"",
      description:"",
      token:"",
      isAdmin:""
    }
  },
  mutations: {
    saveDataUser(state, [id, email, username, description, isAdmin]) {
      state.user.id = id,
      state.user.email = email,
      state.user.username = username,
      state.user.description = description,
      state.user.token = localStorage.getItem('token'),
      state.user.isAdmin = isAdmin
    }
  },
  actions: {
    getDataUser(context) {
      axios.get("http://localhost:3000/api/auth/users/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response);
          context.commit("saveDataUser", [response.data.id, response.data.email, response.data.username, response.data.description, response.data.isAdmin])
        })
        .catch(error => console.log(error))
      
    }
  },
  modules: {
  }
})
