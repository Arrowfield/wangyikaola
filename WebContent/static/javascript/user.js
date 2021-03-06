$.ajax({
	url:"UserMessage",
	type:"get",
	dataType:"json",
	success:function(res){
		//console.log(res);
		if(res.avatar){
			$('.avatar>img').attr("src","upload/"+res.avatar);
			$('.UserAvatar>img').attr("src","upload/"+res.avatar);
		}
	},
});

$('#my_bar>ul>li>a').click(function (e) {
    e.preventDefault();
    $a = $(this);
    $a.next().toggleClass("in")
      .parent()
      .siblings()
      .children("ul")
      .removeClass('in');
  })
  
  $('.avatar').click(function(){
	  $('.InputForAva').click();
  })
  
  let file = "";
  
  function handleChange(){
	  file = $('.InputForAva')[0].files[0];
	  const imgUrl = window.URL.createObjectURL(file);
	  $('.avatar>img').attr("src",imgUrl);
  }
  
  function handleAvatar(){
	 
	  if(file){
		  // console.log(file);
		  var formData = new FormData();
		  formData.append("file",file);
		  $.ajax({
			  url:"UserAvatar",
			  data:formData,
			  type:"POST",
			  dataType:"json",
			  contentType: false,
			  processData:false,
			  success:function(res){
				  if(res.code == 200){
					  getToast("修改成功");
				  }
			  }
		  })
	  }else{
		  // getToast("请选择图片");
		  return;
	  }
  }
  // 获取
  
  var url = location.href.split('?')[1];
  
  if(url.indexOf('everyday') > -1){
	  // alert('激活每日打卡');
	  $('.UserMenu>li:nth-child(3)>ul')
	  .addClass('in')
	  .children('li:last-child')
	  .addClass('in-active');
	  
	  $('#UserRight>div:nth-child(3)').show();
  }else if(url.indexOf('order') > -1){
	  $('.UserMenu>li:nth-child(1)>ul')
	  .addClass('in')
	  .children('li:first-child')
	  .addClass('in-active');
	  
	  $('#UserRight>div:nth-child(1)').show();
	  
	  $.ajax({
		  url:"OrderList",
		  type:"get",
		  dataType:"json",
		  success:function(res){
			  
			  if(res.code == 301){
				  $(".OrderList").css("display","flex");
			  }else{
				  // 有数据
				 
				  
				  var html = "";
				  
				  for(var i=0;i<res.newData.length;i++){
					  
					  var obj = res.newData[i];
					  
					  
					  html += `
						  <tr>
						  	<td class="TooLong" title=${obj.sname}> ${obj.sname} </td>
						  	<td>${obj.sprice}</td>
						  	<td>${obj.num}</td>
						  	<td>暂无</td>
						  	<td>${obj.sum}</td>
						  	<td>${obj.status == 0? "待付款":"已付款"}</td>
						  	<td><a data-toggle="modal" data-target="#myModal" onclick="handleDel(${obj.id},'${obj.sname}')" href="javascript:">删除订单</a></td>
						  </tr>
					  `;
				  }
				  
				  $(html).replaceAll('tbody>tr');
				  
			  }
		  }
	  });
  }else if(url.indexOf('user')>-1){
	  
	  $('.UserMenu>li:last-child>ul')
	  .addClass('in')
	  .children('li:last-child')
	  .addClass('in-active');
	  
	  $('#UserRight>div:nth-child(2)').show();
  }
  
  function handleDel(id,name){
	  // 操作删除
	  console.log(id,name);
	  $(".name").html(name);
	  $('.id').html(id);
	  //
  }
  
  function handleSearch(){
	  // 操作搜索
	  var keyword = $("#input").val();
	  $.ajax({
		  url:"OrderSearch",
		  type:"get",
		  data:{keyword},
		  dataType:"json",
		  success:function(res){
			  
			  if(res.data.length == 0){
				  
				  $('table>tbody>tr').remove();
				  
				  $('.add').show();
				  
			  }else{
				  
				  $('.add').hide();
				  
				  var html = "";
				  
				  for(var i=0;i<res.data.length;i++){
					  
					  var obj = res.data[i];
					  
					  
					  html += `
						  <tr>
						  	<td class="TooLong" title=${obj.sname}> ${obj.sname} </td>
						  	<td>${obj.sprice}</td>
						  	<td>${obj.num}</td>
						  	<td>暂无</td>
						  	<td>${obj.sum}</td>
						  	<td>${obj.status == 0? "待付款":"已付款"}</td>
						  	<td><a data-toggle="modal" data-target="#myModal" onclick="handleDel(${obj.id},'${obj.sname}')" href="javascript:">删除订单</a></td>
						  </tr>
					  `;
				  }
				  
				  $('table>tbody>tr').remove();
				  
				  $('table>tbody').append('<tr></tr>');
				  
				  $(html).replaceAll('tbody>tr');
				  
			  }
		  }
	  })
  }
  
  function handleRelDel(){
	  var id = $('.id').html();
	  $.ajax({
		  url:"OrderDel",
		  type:"get",
		  data:{id},
		  dataType:"json",
		  success:function(res){
			  console.log(res);
			  
			  if(res.code == 200){
				  
				  getToast("删除成功");
				  
				  $('#myModal').click()
				  
				  setTimeout(()=>{
					  
					  window.history.go(0);
					  
				  },1000);
			  }
		  }
	  })
  }
  
  // 获取数据
  $.ajax({
	  url:"DoCard",
	  type:'GET',
	  dataType:"json",
	  success:function(res){
		  // console.log(res);
		  if(res.num > 0){
			  $("#UserNum").html(res.num);
		  }
	  },
	  error:function(err){
		  throw err;
	  }
  });
  
  function handleClick(){
	  // alert(1);
	  var num = $("#UserNum").html();
	  $.ajax({
		  url:"AddCard",
		  data:{num},
		  type:"get",
		  dataType:"json",
		  success:(res)=>{
			  console.log(res);
			  if(res.code == 301){
				  getToast("今日你已经签到，明天再来！");
			  }else{
				  $("#UserNum").html(res.num);
				  getToast("签到成功");
			  }
		  },
		  error:(err)=>{
			  throw err
		  }
	  })
	  
  }
  
  
  
