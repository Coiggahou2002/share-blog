
# 推荐阅读的书籍

<div :class="$style.book_grid">
    <Book v-for="book in books" :book="book"/>
</div>

<script setup>
import { ref } from 'vue'
import Book from "../components/Book.vue";

const books = ref([
    {
        title: '深入理解计算机系统',
        author: `[美] Randal E. Bryant / [美] David R. O'Hallaron`,
        cover: 'https://m.media-amazon.com/images/I/51KdSDLrg7L.jpg',
        desc: '本书是一本将计算机软件和硬件理论结合讲述的经典教材，内容涵盖计算机导论、体系结构和处理器设计等多门课程。',
        doubanUrl: 'https://book.douban.com/subject/26941639/',
    },
    {
        title: '网络是怎样连接的',
        author: '[日] 户根勤 ',
        cover: 'https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/note-img/202311271033550.png',
        desc: '本书以探索之旅的形式，从在浏览器中输入网址开始，一路追踪了到显示出网页内容为止的整个过程，以图配文，讲解了网络的全貌，并重点介绍了实际的网络设备和软件是如何工作的。',
        wereadUrl: 'https://weread.qq.com/web/bookDetail/6f932ec05dd9eb6f96f14b9',
    },
])
</script>

<style module lang="scss">
.book_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>