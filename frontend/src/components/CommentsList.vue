<template>
  <div>
    <button
      class="buttonShowHide"
      :id="post"
      v-bind="post"
      @click.prevent="showAllComments(post)"
      v-if="isDisplay == false"
      aria-label="Affichez plus de commentaires"
    >
      Afficher tous les commentaires
    </button>
    <Comment
      v-if="isDisplay == false"
      :post="post"
      :user="user"
      :isAdmin="isAdmin"
    />
    <div v-if="isDisplay == true">
      <button
        class="buttonShowHide"
        :id="post"
        v-bind="post"
        @click.prevent="hideAllComments(post)"
        aria-label="Affichez moins de commentaires"
      >
        Montrer moins de commentaires
      </button>
      <AllComment :post="post" :user="user" :isAdmin="isAdmin" />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import AllComment from "@/components/AllComment.vue";

export default {
  name: "CommentsList",
  components: {
    Comment,
    AllComment,
  },
  data() {
    return {
      isDisplay: false,
    };
  },
  props: ["post", "user", "isAdmin"],
  methods: {
    showAllComments() {
      this.isDisplay = true;
    },
    hideAllComments() {
      this.isDisplay = false;
    },
  },
};
</script>

<style scoped>
.buttonShowHide {
  border: none;
  background: none;
  font-size: 0.8rem;
  color: rgb(151, 151, 151);
}
.buttonShowHide:hover {
  border-bottom: 1px solid rgb(151, 151, 151);
}

.buttonShowHide:focus {
  border: none;
  outline: none;
}
</style>
