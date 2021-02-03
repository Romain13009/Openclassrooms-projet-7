<template>
  <div >
    <form v- v-bind:key="post.id" class="formComment">
      <textarea
        v-model="dataCreateComment.content"
        :id="post.id"
        class="form-control formContentComment"
        maxlength="150"
        rows="2"
        placeholder="Donnez votre avis ici..."
        @keyup.enter.exact="commentPost"
        @keydown.enter.exact.prevent
      ></textarea>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "CreateComment",
  data() {
    return {
      allPosts: [],
      dataCreateComment: {
        content: null,
        id: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    commentPost() {
      console.log('allo');
      this.dataCreateComment.id = event.target.id;
      if (this.dataCreateComment.content.length > 0) {
        axios
          .post(
            "http://localhost:3000/api/wall/posts/comment",
            this.dataCreateComment,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            if (response) {
              console.log(this.dataCreateComment.content);
              console.log(this.dataCreateComment.content.length);
              window.location.reload();
            }
          })
          .catch(() => {
            alert("ERREUR ! Une erreur est survenue.");
          });
      } else {
        alert(
          "ERREUR ! Echec, assurez vous que votre commentaire ne soit pas vide."
        );
      }
    },
  },
  mounted() {
    this.$store.dispatch("getDataUser");
    axios
      .get("http://localhost:3000/api/wall", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.allPosts = response.data;
        console.log(response.data);
      })
      .catch(() => {
        alert("ERREUR ! Une erreur est survenue.");
      });
  },
};
</script>

<style>
.formComment {
  margin-top: -10px;
}

.formContentComment {
  background: rgba(0, 0, 0, 0.04);
  border: none;
}
</style>