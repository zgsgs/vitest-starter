<script setup>
import { onMounted, ref } from "vue";

const postList = ref([]);
const commentList = ref([]);

onMounted(() => {
  fetchPostList();
});

const fetchPostList = () => {
  fetch("http://localhost:4430/posts")
    .then((res) => res.json())
    .then((list) => {
      postList.value = list;
    });
};

const fetchCommentList = () => {
  fetch("http://localhost:4430/comments")
    .then((res) => res.json())
    .then((list) => {
      commentList.value = list;
    });
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>文章列表</div>
  <div class="post-item" v-for="item in postList" :key="item.id">
    {{ item.title }}
  </div>
  <hr />
  <button class="load-comment-button" @click="fetchCommentList">加载评论</button>
  <div class="comment-item" v-for="item in commentList" :key="item.id">
    {{ item.content }}
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
