$(function(){
	var newsType = {
		'7':'新闻',
		'8':'公告',
		'9':'活动',
		'10':'攻略'
	}
	_newsHandler.getNews(renderNewsList,altWindow,{tag:'0',offSize:'13',pageSize:'1'})
	function renderNewsList(data){
		var htmlStr = '',
			i = 0;
		for(;i<data.length;i++){
			htmlStr += '<li><em>'+newsType[data[i].tagid]+'</em><p>'+data[i].title+'</p><span>2017/4/17</span></li>'
		}
		$('.container-c_list').html(htmlStr);
	}
})

// 接口错误提示弹窗
function altWindow(msg){
	msg = msg || '服务器请求失败';
	console.log(msg)
}