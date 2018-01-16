$(function(){
	//前段仍然是使用jquery的方式
	var $loginBox = $("#loginBox");
    var $registerBox = $("#registerBox");
	var $userInfo = $("#userInfo");
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
                    console.log(result);
                    if(result.code == 2){
                         alert(result.message);
                         $userInfo.show();
                         $userInfo.find(".username").html(result.userInfo.username);
                         $loginBox.hide();
                    }
                }

        })


    })









})