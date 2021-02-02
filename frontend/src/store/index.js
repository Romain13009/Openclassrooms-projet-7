import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {
      id:null,
      email:null,
      username:null,
      description:null,
      avatar: null,
      token:null,
      isAdmin:null
    }
  },
  mutations: {
    saveDataUser(state, [id, email, username, description, avatar, isAdmin]) {
      state.user.id = id,
      state.user.email = email,
      state.user.username = username,
      state.user.description = description,
      state.user.avatar = avatar,
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
          context.commit("saveDataUser", [response.data.id, response.data.email, response.data.username, response.data.description, response.data.avatar, response.data.isAdmin])
        })
        .catch(error => console.log(error))
      
    }
  },
})
