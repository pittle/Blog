var blogDetail = new Vue({
    el:'#blog_detail',
    data:{
        title:"",
        content:"",
        ctime:"",
        tags:"",
        views:"",
    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
        if(searchUrlParams == ""){
            return ;
        }
        var bid = -10;
        for(var i = 0;i < searchUrlParams.length;i ++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method:"get",
            url:"/queryBlogById?bid=" + bid
        }).then((resp) => {
            // console.log(resp);
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.views = result.views;
            blogDetail.tags = result.tags;
            blogDetail.ctime = result.ctime;
        }).catch((resp) => {
            console.log(请求失败);
        });
    }
});


var sendComment = new Vue({
    el:"#send_comments",
    data:{
        vcode:"",
        rightCode:"",
    },
    methods:{
        sendClick(){
            //判断验证码码是否正确
            var code = document.getElementById("comment_code").value;
            if(code.toUpperCase() != sendComment.rightCode.toUpperCase()){
                this.changeCode();
                alert("验证码有误");
                return;
            }

            var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
            var bid = -1;
            for(var i = 0;i < searchUrlParams.length;i ++){
                if(searchUrlParams[i].split("=")[0] == "bid"){
                    try{
                        bid = parseInt(searchUrlParams[i].split("=")[1]);
                    }catch (e) {
                        console.log(e);
                    }
                }
            }
            //回复某一条blog
            var reply = document.getElementById("comment_reply").value;
            //回复blog下某一个人
            var replyName = document.getElementById("comment_reply_name").value;
            var name = document.getElementById("comment_name").value;
            var email = document.getElementById("comment_email").value;
            var content = document.getElementById("comment_content").value;
            axios.get("/addComment",{
                params:{
                    bid:bid,
                    parent:reply,
                    username:name,
                    email:email,
                    content:content,
                    parentName:replyName
                }
            }).then((resp) => {
                // console.log(resp);
                alert(resp.data.msg);
                this.changeCode();
            });


        },

        //改变验证码
        changeCode(){
            axios({
                method:"get",
                url:"/queryRandomCode"
            }).then((resp) => {
                // console.log(resp);
                sendComment.vcode = resp.data.data.data;
                sendComment.rightCode = resp.data.data.text;
            });
        }
    },
    created(){
        this.changeCode();
    }
});


var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total:0,
        comments:[
            // {id:"1",name:"pittle",comments:"123",ctime: "123",options:""},
            // {id:"1",name:"pittle",comments:"123",ctime: "123",options:""},
            // {id:"1",name:"pittle",comments:"123",ctime: "123",options:""},
        ],
    },
    methods:{
        reply(commentId,userName){
            console.log(commentId,userName);
            document.getElementById("comment_reply").value = commentId;
            document.getElementById("comment_reply_name").value = userName;
            location.href = "#send_comments";
        }
    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"):"";
        var bid = -1;
        for(var i = 0;i < searchUrlParams.length;i ++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }
        //获取每一条评论
        axios.get("/queryCommentsByBlogId",{
            params:{
                bid:bid
            }
        }).then((resp) => {
            blogComments.comments = resp.data.data;
            for (var i = 0; i < blogComments.comments.length; i ++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        });

       axios.get("/queryCommentsCountByBlogId",{
            params:{
                bid:bid
            }
        }).then((resp) => {
            console.log(resp.data.data[0].count)
           blogComments.total = resp.data.data[0].count;
        });
    }
});