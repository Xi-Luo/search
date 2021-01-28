<template>
  <div class="bg">
    <el-row>
      <el-col :span="8" :offset="7">
        <el-input class="search" v-model="input" clearable @blur="disappearCard"></el-input>
      </el-col>
      <el-col :span="1" :offset="0"><el-button type="primary">搜索</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="7">
        <div v-show="showCard" class="box">
          <ul>
            <li
                v-for="(item, index) in list"
                :key="index"
                @click="handleClick(item)"
            >{{item.keyword}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
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

.search{
  margin-right: 10px;
}
.box{
  border: 1px solid #efefef;
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
}
</style>