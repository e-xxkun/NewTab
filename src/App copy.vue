<template>
  <div id="app" class="container" :style="{'background-image':'url('+bgImg+')','min-width':'720px','min-height': appHeight+'px'}">
    <div class="search-container">
      <a class="s-engine">
        <ul>
          <li :class="searchEngine.name" id="engines" @click="onSearchEngineClick"></li>
          <ul v-if="engineSelect" :class="{selecting:engineSelect}">
            <li v-for="item in searchEngines" :key="item.name" v-if="searchEngine.name!=item.name" :class="item.name" @click="onSearchEngineSelect(item)"></li>
          </ul>
        </ul>
      </a>
      <input class="s-input" type="text" @keyup.enter="submit" v-model="value">
      <a class="s-submit" @click="submit">
        <span class="el-icon-search"></span>
      </a>
    </div>
    <ul ref="labels" class="labels">
      <ul v-for="(row,y) in labels" :key="row">
        <li v-for="(item,x) in row" :key="item" :style="{'background':'radial-gradient(#ccc, '+ item.color+')'}" @click="checkLabel(x,y,item)">{{item.title}}</li>
      </ul>
    </ul>
    <a :class="['option-b',{'optioning':option.active}]" @click="option.active=true,cover=true">
      <svg id="option" t="1563410738947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2003" width="32" height="32"><path d="M512 362.730667A149.269333 149.269333 0 1 0 661.269333 512 149.44 149.44 0 0 0 512 362.730667z m0 255.893333A106.624 106.624 0 1 1 618.624 512 106.752 106.752 0 0 1 512 618.624z" fill="#444" p-id="2004"></path><path d="M858.090667 554.602667a53.866667 53.866667 0 0 1 0-85.205334 96.448 96.448 0 0 0-71.232-172.010666 53.824 53.824 0 0 1-60.245334-60.245334 96.448 96.448 0 0 0-172.010666-71.253333 55.509333 55.509333 0 0 1-85.205334 0 96.448 96.448 0 0 0-172.010666 71.253333 53.824 53.824 0 0 1-60.245334 60.245334 96.448 96.448 0 0 0-71.253333 172.010666 53.866667 53.866667 0 0 1 0 85.205334 96.448 96.448 0 0 0 71.253333 172.010666 53.824 53.824 0 0 1 60.245334 60.245334 94.336 94.336 0 0 0 58.773333 101.397333A99.605333 99.605333 0 0 0 394.24 896a94.357333 94.357333 0 0 0 75.157333-37.909333 55.509333 55.509333 0 0 1 85.205334 0 96.448 96.448 0 0 0 172.010666-71.253334 53.824 53.824 0 0 1 60.245334-60.224 96.448 96.448 0 0 0 71.253333-172.010666z m-9.258667 96.917333a52.309333 52.309333 0 0 1-56.554667 32.768 96.512 96.512 0 0 0-107.968 107.989333A53.824 53.824 0 0 1 588.352 832a99.413333 99.413333 0 0 0-152.682667 0 53.824 53.824 0 0 1-95.957333-39.744 96.533333 96.533333 0 0 0-95.509333-108.778667 100.885333 100.885333 0 0 0-12.48 0.789334A53.824 53.824 0 0 1 192 588.330667a96.490667 96.490667 0 0 0 0-152.682667 53.824 53.824 0 0 1 39.744-95.957333 96.512 96.512 0 0 0 107.968-107.946667 53.824 53.824 0 0 1 95.978667-39.765333 99.413333 99.413333 0 0 0 152.682666 0 53.824 53.824 0 0 1 95.957334 39.744 96.512 96.512 0 0 0 107.946666 107.968 53.824 53.824 0 0 1 39.765334 95.957333 96.490667 96.490667 0 0 0 0 152.682667 52.053333 52.053333 0 0 1 16.810666 63.189333z" fill="#444" p-id="2005"></path></svg>
    </a>
    <div v-if="cover" id="cover" class="cover">
      <ul v-if="option.active" class="options">
        <el-tooltip content="更换背景" placement="left">
          <li @click="changeBg">
            <svg t="1563416918004" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3951" width="28" height="28"><path d="M179.3 298.6c5.8 0 11.2-2.3 15.3-6.3l94.8-94.8c8.4-8.4 8.4-22.2 0-30.6s-22.2-8.4-30.6 0L164 261.6c-4.1 4.1-6.3 9.5-6.3 15.3 0 5.8 2.3 11.2 6.3 15.3 4.1 4.1 9.5 6.4 15.3 6.4zM179 488.1c5.8 0 11.2-2.3 15.3-6.3l284-284c8.4-8.4 8.4-22.2 0-30.6-8.4-8.4-22.2-8.4-30.6 0l-284 284c-8.4 8.4-8.4 22.2 0 30.6 4.1 4 9.5 6.3 15.3 6.3zM665.3 197.6c8.4-8.4 8.4-22.2 0-30.6-8.4-8.4-22.2-8.4-30.6 0L162.9 638.9c-8.4 8.4-8.4 22.2 0 30.6 4.1 4.1 9.5 6.3 15.3 6.3 5.8 0 11.2-2.3 15.3-6.3l471.8-471.9zM856.1 189.1c0-5.8-2.3-11.2-6.3-15.3-4.1-4.1-9.5-6.3-15.3-6.3-5.8 0-11.2 2.3-15.3 6.3L187.6 805.3c-8.4 8.4-8.4 22.2 0 30.6 4.1 4.1 9.5 6.3 15.3 6.3 5.8 0 11.2-2.3 15.3-6.3l631.6-631.6c4.1-4 6.3-9.4 6.3-15.2zM855.1 356.8c-4.1-4.1-9.5-6.3-15.3-6.3s-11.2 2.3-15.3 6.3L352.6 828.6c-4.1 4.1-6.3 9.5-6.3 15.3s2.3 11.2 6.3 15.3c4.1 4.1 9.5 6.3 15.3 6.3s11.2-2.3 15.3-6.3L855 387.4c8.5-8.4 8.5-22.2 0.1-30.6zM857.5 545.2c-8.4-8.4-22.2-8.4-30.6 0L544.1 828c-4.1 4.1-6.3 9.5-6.3 15.3 0 5.8 2.3 11.2 6.3 15.3 4.1 4.1 9.5 6.3 15.3 6.3s11.2-2.3 15.3-6.3l282.7-282.7c8.5-8.5 8.5-22.2 0.1-30.7zM824.5 736l-92.1 92.1c-8.4 8.4-8.4 22.2 0 30.6 4.1 4.1 9.5 6.3 15.3 6.3s11.2-2.3 15.3-6.3l92.1-92.1c8.4-8.4 8.4-22.2 0-30.6-8.5-8.5-22.2-8.5-30.6 0z" fill="#444" p-id="3952"></path><path d="M867.7 982.2H152.6C91.1 982.2 41 932.1 41 870.6V155.5C41 93.9 91.1 43.9 152.6 43.9h715.1c61.5 0 111.6 50.1 111.6 111.6v715.1c0 61.5-50 111.6-111.6 111.6zM152.6 83.9C113.1 83.9 81 116 81 155.5v715.1c0 39.5 32.1 71.6 71.6 71.6h715.1c39.5 0 71.6-32.1 71.6-71.6V155.5c0-39.5-32.1-71.6-71.6-71.6H152.6z" fill="#444" p-id="3953"></path></svg>
          </li>
        </el-tooltip>
        <el-tooltip content="标签管理" placement="left">
          <li @click="modLabel">
            <svg t="1563417494222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7543" width="28" height="28"><path d="M773.5 959.8c-5.8 0-11.5-1.8-16.4-5.3L512 777.4l-245.1 177c-8.5 6.2-19.8 7-29.1 2.2-9.4-4.8-15.2-14.4-15.2-24.9V92.2c0-15.5 12.5-28 28-28h523c15.5 0 28 12.5 28 28v839.6c0 10.5-5.9 20.1-15.2 24.9-4.2 2.1-8.6 3.1-12.9 3.1zM512 714.9c5.7 0 11.5 1.8 16.4 5.3L745.5 877V120.2h-467v756.9l217.1-156.8c4.9-3.6 10.7-5.4 16.4-5.4z" fill="#444" p-id="7544"></path></svg>
          </li>
        </el-tooltip>
      </ul>
      <div v-if="option.model==1" class="bg">
        <div>
          <el-button size="mini" :type="option.bg.model==1?'primary':''" @click="changeBgModel(1)">默认壁纸</el-button>
          <el-button size="mini" :type="option.bg.model==2?'primary':''" @click="changeBgModel(2)">随机壁纸</el-button>
          <el-button size="mini" :type="option.bg.model==3?'primary':''" @click="changeBgModel(3)">自定义</el-button>
        </div>
        <div class="random" v-if="option.bg.model==2">
          <el-button type="primary" size="mini" @click="randomImg">换一张</el-button>
          <el-button type="primary" size="mini" @click="downImg">下载</el-button>
        </div>
        <i v-if="option.bg.model==3">
          <svg t="1563508967106" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2308" width="32" height="32"><path d="M866.016 476h-318.016V165.984q0-15.008-10.496-25.504T512 129.984q-15.008 0-25.504 10.496t-10.496 25.504v310.016h-312q-14.016 0-24.992 10.496T128 512q0 15.008 11.008 25.504t24.992 10.496h312v312q0 14.016 10.496 24.992T512 896q15.008 0 25.504-11.008t10.496-24.992v-312h318.016q15.008 0 25.504-10.496t10.496-25.504q0-15.008-10.496-25.504t-25.504-10.496z" fill="#bfbfbf" p-id="2309"></path></svg>
          <input type="file" name="file" @change="upload">
        </i>
      </div>
      <div v-if="option.model==2" class="bg">
        <div>
          <el-button size="mini" :type="option.labels.model==1?'primary':''" @click="changeLabel(1)">删除标签</el-button>
          <el-button size="mini" :type="option.labels.model==2?'primary':''" @click="changeLabel(2)">修改标签</el-button>
          <el-button size="mini" :type="option.labels.model==3?'primary':''" @click="changeLabel(3)">添加标签</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getImg, getDownLink} from './request.js'
export default {
  name: "App",
  data() {
    return {
      value: '',
      searchEngine:{name:'baidu',url:'https://www.baidu.com/s?wd='},
      engineSelect:false,
      option:{
        active:false,
        model:0,
        bg:{
          model:1  //defult:1 random:2 custom:3
        },
        labels:{
          model:0  //delete:1 modifty:2 add:3
        }
      },
      cover:false,
      appHeight:0,

      labels:[[]],
      labelwidth:140,
      bgImg:'',
      bg_def:'./static/img/bg.jpg',
      searchEngines: [
        {name:'baidu',url:'https://www.baidu.com/s?wd='},
        {name:'google',url:'https://www.google.com/search?&q='},
        {name:'bing',url:'https://cn.bing.com/search?q='},
        {name:'zhihu',url:'https://www.zhihu.com/search?q='},
        {name:'aol',url:'https://search.aol.com/aol/search?q='}
      ],
      colors:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    };
  },
  mounted(){
    document.addEventListener("click",this.clickListener);
    try{
      var engine=JSON.parse(localStorage.getItem('search-engine'))
      if(engine&&engine.name&&engine.url)
        this.searchEngine=engine
    }catch(e){
      console.log(e)
    }
    var model=localStorage.getItem('bg-model')
    if(model)
      this.option.bg.model=model
    if(this.option.bg.model==3){
      var backgdImage=localStorage.getItem('bg-ca')
      if(backgdImage)
        this.bgImg=backgdImage
      else
        this.bgImg=this.bg_def
    }else if(this.option.bg.model==2){
        this.randomImg()
    }else{
      this.bgImg=this.bg_def
    }
    var labs=[]
    for(var i=0;i<20;i++){
      labs[i]={title:'博客',url:'https://blog.csdn.net/kunorz/article/details/81044595',color:this.colors[i%11]}
    }
    localStorage.setItem('labels',JSON.stringify(labs))
    var rect=this.$refs["labels"].getClientRects()[0]
    this.labelChange(rect)
    var _this=this
    window.onresize = () => {
      var rect=this.$refs["labels"].getClientRects()[0]
      if(rect.width<this.labelwidth||rect.width>this.labelwidth+70){
        _this.labelChange(rect)
      }
    };
  },
  methods:{
    labelChange(rect){
      var count=parseInt(rect.width/70)
      try{
        var labels=JSON.parse(localStorage.getItem('labels'))
        if(labels&&labels.length>0){
          var _labs=[]
          var row=Math.ceil(labels.length/count)
          for (var i=0;(i-1)*count<labels.length;i++){
            _labs[row-i-1]=labels.splice(0, count)
          }
          this.labels=_labs
          this.labelwidth=70*count+40
          this.appHeight=240+row*70
        }
      }catch(e){
        console.log(e)
      }
    },
    onSearchEngineClick(value){
      this.engineSelect=!this.engineSelect
    },
    onSearchEngineSelect(value){
      this.searchEngine=value
      localStorage.setItem('search-engine',JSON.stringify(value))
    },
    submit(){
      var value=this.value.trim()
      if(value){
        value=encodeURIComponent(value.replace(/ {2,}/g,' ')).replace(/(%20)/g,'+')
        window.location.href=this.searchEngine.url+value
      }
    },
    upload(param){
      var file=param.target.files[0]
      this.setBgImgData(file)
      localStorage.setItem('bg-model',3)
    },
    changeBg(){
      var model=localStorage.getItem('bg-model')
      if(model)
        this.option.bg.model=model
      this.option.model=1
      if(this.option.labels.model!=0){
        this.option.labels.model=0
        this.$refs['labels'].setAttribute('style','z-index:auto')
      }
    },
    changeBgModel(value){
      if(value==1){
        this.bgImg=this.bg_def
        localStorage.removeItem('bg-ca')
      }else if(value==2&&this.option.bg.model!=2)
        this.randomImg()
      this.option.bg.model=value
      value!=3&&localStorage.setItem('bg-model',value)
    },
    changeLabel(value){
      this.option.labels.model=value==this.option.labels.model?0:value
      if(this.option.labels.model==1||this.option.labels.model==2){
        this.$refs['labels'].setAttribute('style','z-index:10')
      }else
        this.$refs['labels'].setAttribute('style','z-index:auto')
    },
    checkLabel(x,y,item){
      if(this.option.labels.model==0){
        window.location.href=item.url
        return
      }
      try{
        var labels=JSON.parse(localStorage.getItem('labels'))
        if(labels&&labels.length>0){
        }
      }catch(e){
        console.log(e)
      }
          
    },
    randomImg(){
      var _this=this
      getImg(url=>{
        _this.bgImg=url
      })
    },
    downImg(){
      var a=document.createElement('a')
      var url=getDownLink()
      a.href=url?url:'#'
      a.click()
      a=null
    },
    setBgImgData(data){
      var _this=this
      var reader = new FileReader();
      reader.onload = function (evt) {
        _this.bgImg = evt.target.result;
        localStorage.removeItem('bg-ca')
        localStorage.setItem('bg-ca',evt.target.result)
        reader=null
      }
      reader.readAsDataURL(data);
    },
    modLabel(){
      this.option.model=2
    },
    clickListener(ev){
      if(ev.target.id!='engines')
        this.engineSelect=false
      if(ev.target.id=='cover'){
        this.option.active=false
        this.cover=false
        this.option.model=0
        this.option.labels.model=0
      }
    }
  },
  beforeDestroy(){
    document.removeEventListener('click',this.clickListener)
  }
};
</script>

<style>
.labels{
  padding: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.labels ul{
  height: 70px;
}
.labels li{
  height: 60px;
  width: 50px;
  padding: 0 5px 0 5px;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  user-select:none;
  display: inline-block;
  margin: 5px;
  border-radius: 40px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 1px 6px 2px  #888888;
  opacity: 0.5;
}
.labels li:hover{
  box-shadow: 0 1px 10px 4px  #ddd;
  opacity: 1;
}
.container{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size:cover;
}
.search-container {
  height: 46px;
  width: 700px;
  margin: 120px auto 0 auto;
  background-color: #fff;
  border-radius: 6px;
  opacity:0.5;
  /*border: 1px solid #c0c4cc;*/
  box-shadow: 0 1px 6px 0px  #88888888;
}
.search-container:hover{
  opacity: 1;
}
.s-input {
  height: 44px;
  width: 598px;
  font-size: 16px;
  padding: 1px 6px 1px 0;
  border: none;
  border-right: none;
  border-left: none;
  float: left;
}
.s-input:focus {
  outline: none;
}
.s-engine {
  height: 46px;
  width: 46px;
  float: left;
  cursor: pointer;
}
.s-engine li{
  height: 46px;
  background-repeat: no-repeat;
  background-position:center;
}
.s-submit {
  height: 46px;
  width: 50px;
  text-align: center;
  line-height: 46px;
  display: block;
  float: left;
  color: #333;
  border-radius: 0 6px 6px 0;
  font-size: 18px !important;
  cursor: pointer;
}
.s-submit:hover {
  background-color: #c0c4cc;
  color: #fff;
}
.selecting{
  /*border: 1px solid #c0c4cc;*/
  border-radius: 6px;
  margin-top: 4px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0px  #88888888;
}
.selecting li:hover{
  background-color: #eee;
  border-radius: 6px;
}
.cover{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.options{
  position: absolute;
  top: 56px;
  right: 8px;
}
.options li{
  width: 40px;
  height: 34px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
  text-align: center;
  padding-top: 6px;
  box-shadow: 0 1px 6px 0px  #88888888;
}
.options li:hover{
  background-color: #cfcfcf;
}
.option-b{
  position: absolute;
  top: 8px;
  right: 8px;
  display: block;
  width: 40px;
  height: 36px;
  text-align: center;
  padding-top: 4px;
  opacity: 0.5;
}
.option-b:hover{
  background-color: #eeeeee44;
  border-radius: 6px;
  opacity: 1;
}
.optioning{
  background-color: #fff!important;
  border-radius: 6px;
  box-shadow: 0 1px 6px 0px  #88888888;
  opacity: 1;
}
.bg{
  position: absolute;
  top: 8px;
  right: 56px;
  min-height: 126px;
  min-width: 60px;
  border-radius: 6px;
  padding: 10px 10px 0 10px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0px  #88888888;
}
.bg div{
  float: right;
}
.bg .el-button{
  display: block;
  margin-bottom: 12px;
  margin-left: 0px!important;
  width: 80px;
  height: 30px;
}
.bg i{
  position: relative;
  float: left;
  margin-right: 10px;
  height: 116px;
  width: 116px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  text-align: center;
  line-height: 136px;
}
.bg i:hover{
  border-color: #409eff;
}
.bg i input{
  position: absolute;
  left: 0;
  top: 0;
  width: 116px;
  bottom: 0;
  opacity: 0;
}
.random{
  margin-right: 10px;
}
.baidu{
  background-image: url(./assets/baidu.png)
}
.google{
  background-image: url(./assets/google.png)
}
.bing{
  background-image: url(./assets/bing.png)
}
.zhihu{
  background-image: url(./assets/zhihu.png)
}
.aol{
  background-image: url(./assets/aol.png)
}
ul{
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
