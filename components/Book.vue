<template>
  <div class="book" @click="go(book)">
    <div class="book_header"></div>
    <div class="book_content">
      <img class="book_content_cover" :src="book.cover" />
      <div class="book_content_text">
        <div class="book_content_text_title">{{ book.title }}</div>
        <div class="book_content_text_author">{{ book.author }}</div>
      </div>
    </div>
    <div class="book_footer">{{ book.desc }}</div>
  </div>
</template>

<script setup>
const props = defineProps(["book"]);
const go = (book) => {
  if (book.wereadUrl) {
    window.open(book.wereadUrl, "_blank");
  } else if (book.doubanUrl) {
    window.open(book.doubanUrl, "_blank");
  }
};
</script>
<style scoped lang="scss">
.book {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 164px;
  max-width: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &_content {
    background: rgba(244, 245, 247, 0);
    height: 132px;
    padding: 12px;
    display: flex;
    box-sizing: border-box;
    &_cover {
      width: 40px;
      height: 108px;
      /* height: 58px; */
      width: auto;
      height: 100%;
      border-radius: 2px;
    }
    &_text {
      padding: 10px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &_title {
        font-family: "PingFang SC";
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        color: rgba(33, 40, 50, 1);
      }
      &_author {
        margin-top: 4px;
        font-family: "PingFang SC", DIN;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0px;
        text-align: left;
      }
    }
  }
  &_footer {
    background: rgba(244, 245, 247, 1);
    padding: 12px 12px 12px 12px;
    font-size: 12px;
    height: 100%;
  }
}
</style>
