<template>
  <div>
    <div class="invisible" v-show="showCard" @click="disappearCard"></div>
    <div class="searchLine">
      <el-input class="search" v-model="input" clearable></el-input>
      <el-button >搜索</el-button>
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

    disappearCard(){
      this.showCard = false;
    },
    handleClick(item){
      console.log(item)
      this.$router.push({path:'/result',query:{keyword:item}})
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
  background-color: antiquewhite;
  z-index: -1;
}
.searchLine{
  margin-left: 30%;
  padding-top: 60px;
  z-index: 10;
}
.search{
  width: 500px;

}
.box{
  border: 1px solid #efefef;
  background-color: white;
  width: 500px;
  margin-left: 30%;
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

}
ul li:hover{
  background-color: #efefef;
  color:blue;
}
</style>