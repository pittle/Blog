var blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:[],
    },
    methods:{

    },
    computed:{

    },
    created(){
        axios({
            method:'get',
            url:'/queryAllBlog'
        }).then((resp) => {
            for (var i = 0;i < resp.data.data.length;i ++){
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
            console.log(resp.data.data);
            blogList.blogList = resp.data.data;
        });
    }
});