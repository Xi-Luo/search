<template>
  <div>
    <div class="invisible" v-show="showCard" @click="disappearCard"></div>
    <div class="searchLine">
      <input class="search" v-model="input" clearable>
      <button type="primary" class="btn" @click="clickSearch">搜索</button>
    </div>

    <div v-show="showCard" class="box">
      <ul>
        <li
            v-for="(item, index) in list"
            :key="index"
            @click="handleClick(item)"
        >{{item.keyword}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  watch:{
    input(){
      this.getKeyword();
      if(this.input){
        this.showCard = true
      }
    }
  },
  data(){
    return{
      showCard:false,
      input:'',
      list:[]
    }
  },
  methods:{
    clickSearch(){
      console.log(this.input)
      this.$router.push({path:'/result',query:{keyword:this.input}})
    },
    disappearCard(){
      this.showCard = false;
    },
    handleClick(item){
      console.log(item)
      this.$router.push({path:'/result',query:{keyword:item.keyword}})
    },
    getKeyword(){
      let xmlhttp
      if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      let that = this;
      xmlhttp.onreadystatechange = function (){
        if (xmlhttp.readyState === 4&&xmlhttp.status===200){
          that.list= JSON.parse(xmlhttp.response).data
        }
      }
      xmlhttp.open("Get"," https://so.toutiao.com/2/article/search_sug/?keyword="+this.input, true)
      xmlhttp.send()
    }
  },

}
</script>

<style scoped>
.invisible{
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 0;
}
.searchLine{
  margin-left: 30%;
  padding-top: 60px;
}
.search{
  width: 400px;
  height: 3rem;
  font-size: 1.2rem;
  padding: 0.2rem;
  position: relative;
  z-index: 10;
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
  z-index: 9;
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
  margin-left: 30%;
  position: relative;
  z-index: 9;
}
ul{
  padding:15px;
  text-align: left;
}
ul li{
  list-style: none;
  text-align: left;
  margin-top: 5px;
  cursor: pointer;
}
ul li:hover{
  background-color: #efefef;
  color:blue;
}
</style>