// 接口公共地址
var DOMAIN = 'http://172.28.9.174/dragonepic';

var API = {
	INDEX:{		// 首页API
		DOWNLOADMSG: DOMAIN + "/common/downloadmsg",		// 获取下载信息
		FEATURE: DOMAIN + "/common/feature",				// 获取
		HEAD: DOMAIN + "/common/head",						// 获取顶部信息
		TAGS: DOMAIN + "/common/tags",						// 获取分类信息
		TURNPLAYING: DOMAIN + "/common/turnplaying",
		VERSION: DOMAIN + "/common/version"				// 获取当前版本
	},
	NEWS:{		// 咨询API
		NEWS: DOMAIN + "/news/page",						// 获取新闻列表
		DETAIL: DOMAIN + "/news/detail"				// 单条新闻详细
	},
	PICTRUE:{	// 图片API 
		PIC: DOMAIN + "/pic/page",						// 获取图片列表
		RECOMMEND: DOMAIN + "/pic/recommend"		// 获取推荐图片
	},
	ROLE:{		// 角色API
		ROLE: DOMAIN + "/role/roles",						// 获取角色列表
		SKILLS: DOMAIN + "/role/skills"				// 获取角色技能列表
	},
	VIDEO:{		// 视频API
		VIDEO: DOMAIN + "/video/page",					// 获取分页视频，视频列表
		DETAIL: DOMAIN + "/video/detail",			// 获取详细视频信息
		RECOMMEND: DOMAIN + "/video/recommend"		// 获取推荐视频
	},
	ACTIVATIONCODE:{
		CODE: DOMAIN + "/code/detail"
	}
}



// 首页请求处理器
var _indexHandler = {
	// 获取下载信息
	getDownLoadMsg:function(s_func,e_func,options){
		options = options || {};  
		$.ajax({
			url:API.INDEX.DOWNLOADMSG,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	// 获取游戏特色图片数据信息
	getFeature:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.INDEX.FEATURE,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	// 获取首页头部信息
	getHead:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.INDEX.HEAD,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	// 获取资讯标签数据接口
	getTags:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.INDEX.TAGS,
			type:'POST',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					// 数据接口没有综合分类，扩充接口API，综合类ID为0
					data.value[data.value.length] = {id:0,name:'综合'}
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	// 获取轮播图信息
	getTurnplaying:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.INDEX.TURNPLAYING,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	// 获取版本信息
	getVersion:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.INDEX.VERSION,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}


// 咨询请求处理器
var _newsHandler = {
	getRemenberId:function(opt){
		var rID = '';
		for(var i in opt){
			rID += (opt[i] + '');
		}
		return rID;
	},
	getNews:function(s_func,e_func,options){
		options = options || {};
		// 提取记忆
		var rid = _newsHandler.getRemenberId(options);
		if(_newsHandler.getNews[rid]){
			s_func(_newsHandler.getNews[rid])
			return false;
		};
		$.ajax({
			url:API.NEWS.NEWS,
			type:'POST',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
					// 记忆存储
					_newsHandler.getNews[rid] = data.value
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	getNewsDetail:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.NEWS.DETAIL,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}


// 图片请求处理器
var _picHandler = {
	getPic:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.PICTRUE.PIC,
			type:'POST',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	getPicRecommend:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.PICTRUE.RECOMMEND,
			type:'POST',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}


// 角色相关请求处理器
var _roleHandler = {
	getRemenberId:function(opt){
		var rID = '';
		for(var i in opt){
			rID += (opt[i] + '');
		}
		return rID;
	},
	getRole:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.ROLE.ROLE,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	getRoleSkills:function(s_func,e_func,options){
		// 记忆码
		var rID = _roleHandler.getRemenberId(options);
		if(_roleHandler.getRoleSkills[rID]){
			// 提取记忆信息
			s_func(_roleHandler.getRoleSkills[rID])
			return false
		}
		options = options || {}; 
		$.ajax({
			url:API.ROLE.SKILLS,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
					// 记忆数据
					_roleHandler.getRoleSkills[rID] = data.value;
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}

// 视频请求处理器
var _videoHandler = {
	getVideo:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.VIDEO.VIDEO,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	getVideoDetail:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.VIDEO.DETAIL,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	},
	getVideoRecommend:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.VIDEO.RECOMMEND,
			type:'POST',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}

// 激活码相关请求处理器
var _activationCodeHandler = {
	getRole:function(s_func,e_func,options){
		options = options || {}; 
		$.ajax({
			url:API.ACTIVATIONCODE.CODE,
			type:'GET',
			dataType:'json',
			data:options,
			success:function(data){
				if(data.state === 1){
					s_func(data.value)
				}else{
					e_func(data.message)
				}
			},
			error:function(data){
				e_func();
			}
		})
	}
}