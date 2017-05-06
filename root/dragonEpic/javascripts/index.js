$(function(){
	var pageList = 0,		// 记录当前滚动为第几页
		pageListTopArr = [0,680,1400,2300,3160],		// 记录标签对应的scrollTop值
		isJumpPage = true,		// 是否允许翻页滚动
		newsType = [],		// 资讯分类存储
		bigPicArr = [], 	// 游戏特色数据存放
		urlHash = '';		// url的hash值
	
	_indexHandler.getVersion(renderVersion,altWindow)
	_indexHandler.getTurnplaying(renderCarousel,altWindow)
	_indexHandler.getTags(renderNewsType,altWindow,{type:'3'})
	_indexHandler.getFeature(renderFeature,altWindow)
	_picHandler.getPicRecommend(renderPic,altWindow,{amount:'5'})
	_videoHandler.getVideoRecommend(renderVideo,altWindow,{amount:'5'})
	_roleHandler.getRole(renderRole,altWindow)
	newsChange();
	dealNavJump(pageListTopArr);
	showOhide();




	// 处理版本号接口数据
	function renderVersion(data){
		var htmlStr = '当前版本v<span>'+ data.version +'</span><a href="'+ data.src +'">版本详情</a>'	
		$('.index-c_version').html(htmlStr);
	}
	// 渲染轮播图数据
	function renderCarousel(data){
		var htmlStrContent = '',
			htmlStrBtn = '',
			i = 0;
		computedStyle(data.length);
		for(;i<data.length;i++){
			htmlStrContent += '<li><a href="'+(data[i].pageurl || '')+'"><img src="'+(data[i].imgurl || './images/top_bg.png')+'" alt="'+(data[i].tile || '')+'"></a></li>';
			if(i !== 0){
				htmlStrBtn += '<li data-num="'+(data[i].id || '')+'">'+(data[i].title || '小螺号')+'</li>'
			}else{
				htmlStrBtn += '<li class="active" data-num="'+(data[i].id || '')+'">'+(data[i].title || '小螺号')+'</li>'
			}
				
		}
		$('.news-c_cc').html(htmlStrContent);
		$('.news-c_changec').html(htmlStrBtn);
		// 开始轮播
		setTurnplaying();
	}
	// 新闻资讯接口数据渲染
	function renderNews(data){
		var htmlStr = "",
			type = '',
			timer = '',
			i = 0;
		for(;i<data.length;i++){
			type = setNewsTypeName(data[i].tagid)
			var D = new Date(parseInt(data[i].createTime))
			timer = (D.getMonth() + 1) + '/' + D.getDate()
			htmlStr += '<li>'
						+'<em>'+type+'</em>'
						+'<p>'+data[i].title+'</p>'
						+'<span>'+timer+'</span>'
					+'</li>'
		}
		$('.news-c_changet').html(htmlStr);
	}
	// 新闻资讯标签数据渲染
	function renderNewsType(data){
		newsType = data;
		_newsHandler.getNews(renderNews,altWindow,{tag:'0',offSize:'1',pageSize:'8'});
	}
	// 游戏特色数据渲染
	function renderFeature(data){
		var htmlStr = '',
			i = 0;
		for(;i<data.length;i++){
			bigPicArr[bigPicArr.length] = data[i].bigPic;
			if(i !== 0){
				htmlStr += '<li><img src="'+data[i].smallPic+'" alt=""><span></span></li>'

			}else{
				htmlStr += '<li class="active"><img src="'+data[i].smallPic+'" alt=""><span></span></li>';
				$('#feature').css({
					'background-image':'url('+data[i].bigPic+')',
					'background-size':'100%'
				})
			}
		}
		$('.feature-c_list').html(htmlStr)
		featureChange(bigPicArr);
	}

	// 渲染精美壁纸
	function renderPic(data){
		var htmlStr = '',
			i = 1;
		htmlStr = '<li class="big"><img src="'+data[0].smallImg+'" alt="图片"><em class="bpic-btn"></em></li>'
		for(;i<data.length;i++){
			htmlStr += '<li><img src="'+data[i].smallImg+'" alt="图片"></li>'
		}
		$('.show-c_plist').html(htmlStr);
	}

	// 视频渲染
	function renderVideo(data){
		// 数据为空处理
		console.log(data);
		var htmlStr = '',
			i = 1;
		htmlStr = '<li class="big"><img src="'+data[0].imgSrc+'" alt="视频首页"><em class="video-btn"></em></li>'
		for(;i<data.length;i++){
			htmlStr += '<li><img src="'+data[i].imgSrc+'" alt="视频首页"></li>'
		}
		$('.show-c_vlist').html(htmlStr);
	}
	// 渲染角色选择框
	function renderRole(data){
		var humans = data.humans,
			dragons = data.dragons,
			i = 0,
			j = 0,
			humanHtmlStr = '',
			dragonHtmlStr = '';
		
		for(;i<humans.length;i++){
			humanHtmlStr += '<li class="swiper-slide"><img src="'+humans[i].smallImg+'" alt="'+humans[i].roleName+'"></li>'
			if(i === 0){
				humanHtmlStr = '<li class="swiper-slide active"><img src="'+humans[i].smallImg+'" alt="'+humans[i].roleName+'"></li>'
			}
		}
		for(;j<dragons.length;j++){
			dragonHtmlStr += '<li class="swiper-slide"><img src="'+dragons[j].smallImg+'" alt="'+dragons[j].roleName+'"></li>'
		}
		$('.role-c_humans').html(humanHtmlStr);
		$('.role-c_dragons').html(dragonHtmlStr);
		// 初始调用第一个勇者信息
		_roleHandler.getRoleSkills(setSkills,altWindow,{roleId:(humans[0].id)});
		setRoleScroll();
		setRoleManEvent(humans);
		setRoleDragonEvent(dragons);

	}
	
	// 设置资讯标签ID对应的标签类型名
	function setNewsTypeName(num){
		var newsName = '';
		for(var i in newsType){
			if(newsType[i].id === num){
				newsName = newsType[i].name
				break;
			}
		}
		return newsName
	}
	// 轮播
	function setTurnplaying(){
		var count = 0,
			timer = {},
			autoTime = 3000,
			length = 0;
		// 获取轮播按钮数量
		length = $('.news-c_changec li').length;
		// 按钮事件
		console.log(length);
		$('.news-c_changec').on('click','li',function(){
			clearInterval(timer);
			count = $(this).index();
			setTurnplayPicChange(count);
			turnplayPic(autoTime);
		})
		// 自动轮播
		turnplayPic(autoTime);
		function turnplayPic(autoTime){
			timer = setTimeout(function(){
				if(count < length-1){
					count ++;
				}else{
					count = 0
				};
				setTurnplayPicChange(count);
				turnplayPic(autoTime);
			},autoTime)
		}
	}
	// 设置轮播图片切换
	function setTurnplayPicChange(num){
		var pleft = num * 630;
		$('.news-c_cc').css('left',-pleft + 'px')
		setTurnPlayBtnChange(num);
	}
	

	
	// 资讯切换
	function newsChange(){
		$('.news-c_ct').on('click','li span',function(){
			var str = $(this).html(),
				i = 0;
			for(;i<newsType.length;i++){
				if(newsType[i].name === str){
					_newsHandler.getNews(renderNews,altWindow,{tag:newsType[i].id + '',offSize:'1',pageSize:'8'});
					break;
				}
			}
			$(this).parent().addClass('active').siblings().removeClass('active')
		})
	}

	

})

// 导航跳转处理
function dealNavJump(pArr){
	//  hash值判断跳转
	setScrollTop(pArr);
	var count = 0;
	$('.nav-one').on('click','li',function(){
		count = $(this).index();
		scrollPage(200,pArr[count]);
		// $('body').scrollTop(pArr[count])
	});
	$('.nav-two').on('click','li',function(){
		count = $(this).index() + 3;
		scrollPage(200,pArr[count]);
	})
}

// 游戏特色标签切换
function featureChange(bigPicArr){
	var count = 0;
	$('.feature-c_list').on('click','li',function(){
		count = $(this).index();
		$(this).addClass('active').siblings().removeClass('active')
		$('#feature').css({
			'background-image':'url('+bigPicArr[parseInt(count)]+')'
		})
	})
};

// 处理侧导航显隐藏
function showOhide(){
	$(document).on('scroll',function(){
		if($(document).scrollTop() > 600){
			$('#slide-nav').show();
		}else{
			$('#slide-nav').hide();
		}
	})
	mouseOnSlideBar();
}

// 侧导航滑入
function mouseOnSlideBar(){
	$('#slide-nav ul').on('mouseover','li',function(){
		$(this).addClass('active')
	})
	$('#slide-nav ul').on('mouseout','li',function(){
		$(this).removeClass('active')
	})
}

// 接口错误提示弹窗
function altWindow(msg){
	msg = msg || '服务器请求失败';
	console.log(msg)
}

// 计算轮播样式宽度
function computedStyle(num){
	// 630为轮播图宽度
	var count = 630 * num;
	$('.news-c_cc').css({
		width:count + "px"
	})
}

// 设置按钮切换
function setTurnPlayBtnChange(num){
	$('.news-c_changec li').eq(num).addClass('active').siblings().removeClass('active');
}

// 角色头像滚动
function setRoleScroll(){
	new Swiper('.swiper-container_one',{
		direction:'vertical',
		slidesPerView:'auto',
		scrollbar:'.scroll-bar_one',
		scrollbarHide:false,
		scrollbarDraggable:true ,
		scrollbarSnapOnRelease:true
	})
	new Swiper('.swiper-container_two',{
		direction:'vertical',
		slidesPerView:'auto',
		scrollbar:'.scroll-bar_two',
		scrollbarHide:false,
		scrollbarDraggable:true ,
		scrollbarSnapOnRelease:true
	})
}
// 角色头像事件处理
// 勇者头像
function setRoleManEvent(obj){
	$('.swiper-container_one').on('click','li',function(){
		var opt = obj[$(this).index()];
		$(this).addClass('active').siblings().removeClass('active');
		$('.swiper-container_two li').removeClass('active');

		// 设置名称图片
		$('.role-c_rname img').attr('src',(opt.identificationIcon || './images/role_name_test.png'))
		// 设置角色描述
		$('.role-c_rint').html(opt.intro);
		// 获取技能
		_roleHandler.getRoleSkills(setSkills,altWindow,{roleId:(opt.id + '')})
	})
}

// 恶龙头像
function setRoleDragonEvent(obj){
	$('.swiper-container_two').on('click','li',function(){
		var opt = obj[$(this).index()];
		$(this).addClass('active').siblings().removeClass('active');
		$('.swiper-container_one li').removeClass('active');
		// 设置名称图片
		$('.role-c_rname img').attr('src',(opt.identificationIcon || './images/role_name_test.png'))
		// 设置角色描述
		$('.role-c_rint').html(opt.intro);
		// 获取技能
		_roleHandler.getRoleSkills(setSkills,altWindow,{roleId:(opt.id + '')})
	})
}

// 设置技能
function setSkills(data){
	var skillsHtmlStr = '',
		talentsHtmlStr = '',
		i = 0;
	for(;i<data.length;i++){
		if(data[i].type === 1){
			talentsHtmlStr += '<li data-msg="'+data[i].skillIntro+'">'+data[i].skillName +'</li>';
			continue;
		}
		skillsHtmlStr += '<li data-msg="'+data[i].skillIntro+'">'+data[i].skillName +'</li>'
	}
	$('.role-c_sk').html(skillsHtmlStr).on('click','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.role-c_talent li').removeClass('active');
		setSkillIntro($(this).attr('data-msg'))
	});
	$('.role-c_talent').html(talentsHtmlStr).on('click','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.role-c_sk li').removeClass('active');
		setSkillIntro($(this).attr('data-msg'))
	});
	setSkillIntro($('.role-c_sk li').first().attr('data-msg'));
}

// 设置技能对应的描述
function setSkillIntro(msg){
	$('.role-c_sint').html(msg)
}

// 根据对应的hash值jump跳转到对应的位置
function setScrollTop(arr){
	var count = 0;
	if(getUrlHash('jump')){
		count = parseInt(getUrlHash('jump'))
		console.log(arr[count]);
		$(document).scrollTop(arr[count])
	}
}

// 获取主页hash值
function getUrlHash(str){
	var obj = urlHashToObj();
	return obj[str];
}

// 将url的hash值转换为对象
function urlHashToObj(){
	var hashStr = location.href.split('?')[1],
		obj = {},
		arr = [];
	if(hashStr){
		arr = hashStr.split('&');
		for(var i = 0;i<arr.length;i++){
			var narr = arr[i].split('=');
			obj[narr[0]] = narr[1];
		}
	}
	return obj
}

// 页面滚动
function scrollPage(timer,toTop){
	var step = 50;
	var beginTop = $('body').scrollTop() || $(document).scrollTop();
	var t = timer/step;
	var c = (toTop - beginTop)/step;
	setScrollPageTo(c,t,step);
}
function setScrollPageTo(c,t,count){
	var beginTop = $('body').scrollTop() || $(document).scrollTop();
	var a = beginTop + c;
	setTimeout(function(){
		count --;
		$(document).scrollTop(a);
		$('body').scrollTop(a);
		if(count !== 0){
			setScrollPageTo(c,t,count)
		}
	},t)
}



