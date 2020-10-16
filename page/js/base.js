var randomTags = new Vue({
    el:'#random_tags',
    data:{
        tags:[]
    },
    computed:{
        randomColor(){
            return function () {
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize(){
            return function () {
                var size = (Math.random() * 20 + 12) + 'px';
                return size;
            }
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length; i ++){
                result.push({text:resp.data.data[i].tag,link:"/?tag="+resp.data.data[i].tag});
            }
            randomTags.tags = result;
        });
    }
});

var newHot = new Vue({
    el:'#new_hot',
    data:{
        titleList:[
            // {title:"这是一个跳转链接",link:"https://www.baidu.com"},
            // {title:"这是一个跳转链接",link:"https://www.baidu.com"},
            // {title:"这是一个跳转链接",link:"https://www.baidu.com"},
            // {title:"这是一个跳转链接",link:"https://www.baidu.com"},
            // {title:"这是一个跳转链接",link:"https://www.baidu.com"}
        ]
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length; i ++){
               var temp = {};
               temp.title = resp.data.data[i].title;
               temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
               result.push(temp)
            }
            newHot.titleList = result;
        });
    }
})

var newComments = new Vue({
    el:'#new_conmments',
    data:{
        commentList:[
            {name:'这是用户名',data:'2020-8-18',comment:'一大串内容'},
            {name:'这是用户名',data:'2020-8-18',comment:'一大串内容'},
            {name:'这是用户名',data:'2020-8-18',comment:'一大串内容'},
            {name:'这是用户名',data:'2020-8-18',comment:'一大串内容'},
            {name:'这是用户名',data:'2020-8-18',comment:'一大串内容'},

        ]
    },
    created(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function (resp) {
            // console.log(resp);
            var result = [];
            for(var i = 0;i < resp.data.data.length; i ++){
                var temp = {};
                temp.name = resp.data.data[i].username;
                temp.comment = resp.data.data[i].comments;
                temp.data = resp.data.data[i].ctime;
                result.push(temp)
            }
            newComments.commentList = result;
            // console.log(result);
        });
    }
})