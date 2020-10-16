var everyDay = new Vue({
    el:'#every_day',
    data:{
        content:'asdasasfasf'
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created(){
    //    请求数据,给content赋值
        axios({
            method:'get',
            url:'/queryEveryDay',
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content
        }).catch(function (reps) {
                console.log('请求失败');
        })
    },
    mounted(){

    }
});


var articleList = new Vue({
      el:'#article_list',
      data:{
          page:1,
          pageSize:3,
          count:100,
          pageNumList:[],
          articleList:[
              // {
              //     title:'在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
              //     content:"有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。 另有小伙伴求助于我一个这样的问题， 说在使用http://协议外加443端口访问时， nginx会报错提示： “400 Bad Request The plain HTTP request was sent to HTTPS port” 这个错误是指请求错误，http协议的请求被发送到了https的端口。 在Nginx中，不能在一个端口同时处理http和https请求。 按正常浏览来说也不可能会...",
              //     data:"2018-01-01",
              //     views:"101",
              //     tags:"bad request error_page nginx",
              //     id: "1",
              //     link:""
              // }
          ]
      },
      computed:{
            getPage(){
                return function (page,pageSize) {
                    var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
                    var tag = "";
                    for(var i = 0;i < searchUrlParams.length;i ++){
                        if(searchUrlParams[i].split("=")[0] == "tag"){
                            try{
                                tag = searchUrlParams[i].split("=")[1];
                            }catch (e) {
                                console.log(e);
                            }
                        }
                    }

                    //查询标签tag为空(不是查询情况)
                    if(tag == ""){
                        axios({
                            method:"get",
                            url:"/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                        }).then((resp) => {
                            // console.log(resp);
                            var list = [];
                            var result = resp.data.data;
                            for(var i = 0; i < result.length; i ++){
                                var temp = {};
                                temp = {...result[i]};
                                temp.link = "/blog_detail.html?bid=" + result[i].id;
                                list.push(temp);
                            }
                            this.articleList = list;
                            this.page = page;
                        }).catch(function (resp) {
                            console.log("请求错误");
                        });
                        axios({
                            method:"get",
                            url:"/queryBlogCount"
                        }).then(function (resp) {
                            articleList.count = resp.data.data[0].count;
                            articleList.generatePageTool;
                        });
                    }else{
                        axios({
                            method:"get",
                            url:"/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag,
                        }).then((resp) => {
                            // console.log(resp);
                            var list = [];
                            var result = resp.data.data;
                            for(var i = 0; i < result.length; i ++){
                                var temp = {};
                                temp = {...result[i]};
                                temp.link = "/blog_detail.html?bid=" + result[i].id;
                                list.push(temp);
                            }
                            this.articleList = list;
                            this.page = page;
                        }).catch(function (resp) {
                            console.log("请求错误");
                        });
                        axios({
                            method:"get",
                            url:"/queryByTagCount?tag=" + tag
                        }).then(function (resp) {
                            articleList.count = resp.data.data[0].count;
                            articleList.generatePageTool;
                        });
                    }
                }
            },

            generatePageTool () {
                var nowPage = this.page;
                var pageSize = this.pageSize;
                var totalCount = this.count;
                var result = [];
                result.push({text:"<<",page:1});
                if(nowPage > 2){
                    result.push({text:nowPage - 2,page:nowPage -  2});
                }
                if(nowPage > 1){
                    result.push({text:nowPage - 1,page:nowPage - 1});
                }
                result.push({text:nowPage,page:nowPage});
                if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                    result.push({text:nowPage + 1,page:nowPage + 1});
                }
                //总数加上最大的余数除以每页条数  = 总共的页数
                if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                    result.push({text:nowPage + 2,page:nowPage + 2});
                }
                result.push({text:">>",page:parseInt((totalCount + pageSize - 1) / pageSize)});
                this.pageNumList = result;
                return result;
            },

          jumpTo(){
                return function (page) {
                    this.getPage(page,this.pageSize);
                }
          }
      },
      created(){
          this.getPage(this.page,this.pageSize);
      }

});
