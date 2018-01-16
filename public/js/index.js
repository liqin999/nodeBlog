$(function(){
	//前段仍然是使用jquery的方式
	var $loginBox = $("#loginBox");
    var $registerBox = $("#registerBox");
	var $userInfo = $("#userInfo");
    var $logoutBtn = $("#logoutBtn");
	//切换到注册页面
	$loginBox.find('a.colMint').on("click",function(){
		$registerBox.show();
		$loginBox.hide();
	});

	//切换到登录页面
    $registerBox.find('a.colMint').on("click",function(){
		$registerBox.hide();
		$loginBox.show();
	});


    //提交注册信息
    $registerBox.find('.registerBtn').on("click",function(){
    	$.ajax({
    		type:'post',
    		url:'/api/user/register',
    		dataType:'json',
    		data:{
    			username: $registerBox.find("[name='username']").val(),
    			password: $registerBox.find("[name='password']").val(),
    			repassword: $registerBox.find("[name='repassword']").val(),
    		},
    		success:function(result){
    			console.log(result);
                 $registerBox.find(".colWarning").html(result.message);
                 if(result.code == 0){
                       alert('注册成功');
                       //注册成功之后，跳转到登录页面
                       window.setTimeout(function () {
                          $registerBox.hide();
                          $loginBox.show();
                       },1000)
                       
                 }
    		}

    	})
    })

    //处理用户的登录
    $loginBox.find('.loginBtn').on("click",function(){
            $.ajax({
                type:'post',
                url:'/api/user/login',
                dataType:'json',
                data:{
                    username: $loginBox.find("[name='username']").val(),
                    password: $loginBox.find("[name='password']").val()
                },
                success:function(result){
                    //显示登录信息
                    $loginBox.find(".colWarning").html(result.message);
                    if(result.code == 2){
                         //登录之后刷选页面，然后服务器记录cookie信息，显示登录后的信息
                        window.location.reload()
                    }
                }

        })


    })

//退出的事件
$logoutBtn.on("click",function(){
      $.ajax({
                type:'get',
                url:'/api/user/loginout',
                dataType:'json',
                success:function(result){
                    if(result.code == 1){
                        window.location.reload()
                    }
                }
            })
})








})