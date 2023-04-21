<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { copyText } from '@/utils'

const postList: Ref<ApiUser.Posts[]> = ref([])
const commentList: Ref<ApiUser.Comments[]> = ref([])

// const fetchPostList = () => {
//   fetch('http://localhost:4430/posts')
//     .then(res => res.json())
//     .then((list) => {
//       postList.value = list
//     })
// }

const fetchCommentList = () => {
  fetch('http://localhost:4430/comments')
    .then(res => res.json())
    .then((list) => {
      commentList.value = list
    })
}

onMounted(() => {
  // fetchPostList()
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>Vite + Vue + TS</div>
  <div>文章列表</div>
  <div v-for="item in postList" :key="item.id" class="post-item">
    {{ item.title }}
  </div>
  <hr>
  <button class="load-comment-button" @click="fetchCommentList">
    加载评论
  </button>
  <div v-for="item in commentList" :key="item.id" class="comment-item">
    {{ item.content }}
  </div>
  <button class="copy" @click="copyText('拷贝一段文本')">
    拷贝
  </button>
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
