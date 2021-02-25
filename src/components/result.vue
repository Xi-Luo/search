<template>
  <div>
    <div class="invisible" @click="disappearCard"></div>
    <input class="search" v-model="input" clearable @focus="inputFocus" >
    <button class="btn" type="primary">搜索</button>
    <div v-show="showCard" class="box">
      <ul>
        <li
            v-for="(item, index) in list"
            :key="index"
            @click="handleClick(item)"
        >{{item.keyword}}</li>
      </ul>
    </div>
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
export default {
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
    disappearCard(){
      this.showCard = false
    },
    inputFocus(){
      if(this.input){
        this.showCard = true
      }
    },
    handleClick(item) {
      console.log(item)
    },
    getKeyword() {
      let xmlhttp
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      let that = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          console.log('this is watch input', JSON.parse(xmlhttp.response).data)
          that.list = JSON.parse(xmlhttp.response).data
        }
      }
      xmlhttp.open("Get", " https://so.toutiao.com/2/article/search_sug/?keyword=" + this.input, true)
      xmlhttp.send()
    },
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
.invisible{
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 0;
  background-color: #efefef;
}
.search{
  margin-left: 10vw;
  width: 400px;
  height: 3rem;
  font-size: 1.3rem;
  padding: 0.2rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  border: 2px solid lightgray;
  border-radius: 4px 0 0 4px;
}
input{
  outline: none;
}
.search:focus{
  border: 2px solid cornflowerblue;
}
.btn{
  position: relative;
  width: 4rem;
  height: 3rem;
  font-size: 1.2rem;
  z-index: 1;
  background-color: cornflowerblue;
  color: white;
  border-radius: 0 4px 4px 0px;
  border-width: 0px;
  cursor: pointer;
  vertical-align: top;
}
.box{
  border: 1px solid #efefef;
  background-color: white;
  width: 400px;
  margin-left: 10vw;
  position: absolute;
  z-index: 2;

}
ul{
  padding:15px;
}
ul li{
  list-style: none;
  text-align: left;
  margin-top: 5px;

}
ul li:hover{
  background-color: #efefef;
  color:blue;
  cursor: pointer;
}
.results{
  width: 600px;
  border-bottom: 1px solid lightgray;
  background-color: white;
  margin-left: 10vw;
  box-sizing: content-box;
  padding: 1rem;
  position: relative;
  z-index: 1;
  display: flex;
}
.all-results{
  width: 600px;
  margin-top: 2vh;
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