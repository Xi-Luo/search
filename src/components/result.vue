<template>
  <div>
    <search v-bind:input="input"></search>
    <div class="all-results">
      <div
          class="results"
          v-for="(item,index) in showResults"
          :key="index">
        <div>
          <img :src="item.src" :alt="item.alt" class="image">
        </div>
        <div class="inner-right">
          <div><h3>{{item.title}}</h3></div>
          <div>{{item.text}}</div>
        </div>
      </div>
      <div id="loading" class="loading">
        加载中...
      </div>
    </div>


  </div>
</template>

<script>
import search from "@/components/search";
export default {
  components:{
    search
  },
  name: "result",
  watch:{
    input(){
      this.getKeyword()
      if(this.input){
        this.showCard = true
      }
    }
  },
  data(){
    return{
      showCard:false,
      input:'',
      list:[],
      showResults:[],
      results:[
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'first one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        },
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'second one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        },
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'second one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        },
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'second one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        },
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'second one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        },
        {
          src:'https://p3-tt.byteimg.com/origin/pgc-image/4f950e8fa0c740f28217d8bf32e222ae?from=pc',
          alt:'second one',
          title:'这是标题',
          text:'这是内容，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容'
        }
      ]
    }
  },
  created() {
    this.input = this.$route.query.keyword
    this.showMoreResults()
  },
  mounted(){
    let io = new IntersectionObserver(this.showMoreResults)
    let loading = document.getElementById('loading')
    io.observe(loading)
  },
  methods: {
    async showMoreResults(){
      let that = this
      await new Promise((resolve) => {
        setTimeout(()=>{
          that.showResults = that.showResults.concat(this.results)
          resolve()
        },1000)
        resolve()
      })
      console.log('this.showResults')
    }
  }
}
</script>

<style scoped>
.results{
  width: 600px;
  border-bottom: 1px solid lightgray;
  background-color: white;
  box-sizing: content-box;
  padding: 1rem;
  position: relative;
  z-index: 1;
  display: flex;
}
.all-results{
  width: 600px;
  /*margin-top: 2vh;*/
  margin: 2vh auto;
}
.image{
  width:8rem;
  height: 6rem;
  border-radius: 5px;
}
.inner-right{
  padding: 10px;
}
.loading{
  position: relative;
  z-index: 1;
  text-align: center;
}
</style>