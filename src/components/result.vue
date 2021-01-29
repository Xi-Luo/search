<template>
  <div>
    <el-row>
      <div class="invisible"></div>
      <el-col :span="8" :offset="3">
        <el-input class="search" v-model="input" clearable @focus="inputFocus" ></el-input>
      </el-col>
      <el-col :span="1" :offset="0"><el-button type="primary">搜索</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="3">
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
  name: "result",
  watch:{
    input(){
      this.getKeyword();

    }
  },
  data(){
    return{
      showCard:false,
      input:'',
      list:[{keyword:1234}]
    }
  },
  created() {
    this.input = this.$route.query.keyword.keyword
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.invisible{
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
  z-index: -1;
}
.search{
  margin-right: 10px;
  z-index: 9;
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