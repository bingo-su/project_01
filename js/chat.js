(function(){
  // 把自己发送的文字渲染到页面
  $('.footer .input_sub').on('click',function(){ 
    let text = $('.input_txt').val().trim()
     if(text){
       $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>')
       resetui();
       getMsg(text);
      }
    $('.input_txt').val('');
  })
  // 从服务器拿到返回数据并渲染到页面
  function getMsg(text){
    $.ajax({
      method:'get',
      url:'http://www.liulongbin.top:3006/api/robot',
      data:{
        spoken:text
      },
      success:function(res){
        // 返回成功则渲染页面
        if(res.message === 'success'){
          $('.talk_list').append(`
          <li class="left_word">
            <img src="img/person01.png" />
            <span>${res.data.info.text}</span>
          </li>
          `);
          resetui();
          getVoice(res.data.info.text);
        }else{
          elart('获取失败');
        }
      }
    })
  }
  // 从服务器拿到 返回数据转化的语音src
  function getVoice(text){
    $.ajax({
      method:'get',
      url:'http://www.liulongbin.top:3006/api/synthesize',
      data:{
        text:text
      },
      success:function(res){
        if(res.status === 200){
          $('.left_word_voice').attr('src',res.voiceUrl);
        }
      }
    })
  }
  // 绑定keyup事件
  $('.footer .input_txt').on('keyup',function(e){
    if(e.key === 'Enter'){
      $('.footer .input_sub').trigger('click');
    }
  })
})();