function getbbdata(){
    let bbsurl = "https://626c-blog-3g6ct8cde316e368-1306073376.tcb.qcloud.la/json/bber.json"
    
    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
    httpRequest.open('GET', bbsurl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var json = httpRequest.responseText;//获取到json字符串，还需解析
        var obj = eval('(' + json + ')');
        // console.log(obj.data)
        const bbArray = obj.data.map(e => {
        return {
            'date': e.date,
            'content': e.content,
            'from': e.from
        }
        })
        // console.log(fundsArray)
        saveToLocal.set('zhheo-bb', JSON.stringify(bbArray), 5 / (60 * 24))
        const data = saveToLocal.get('zhheo-bb');
        generateBBHtml(JSON.parse(data))
    }
    };
  }
  
  
  var generateBBHtml = array => {
      let result = ''
  
      if (array.length) {
        for (let i = 0; i < array.length; i++) {
          result += `<li class='li-style'>${array[i].content}</li>`;
        }
      } else {
        result += '!{_p("aside.card_funds.zero")}';
      }
      
      let $dom = document.querySelector('#bber-talk #con1');
      $dom.innerHTML = result;
      window.lazyLoadInstance && window.lazyLoadInstance.update();
      window.pjax && window.pjax.refresh($dom);
    }
  
  var bbInit = () => {
  // console.log('运行')
  if (document.querySelector('#bber-talk #con1')) {
      const data = saveToLocal.get('zhheo-bb');
      if (data) {
      generateBBHtml(JSON.parse(data))
      } else {
      getbbdata()
      }
  }
  }
  
  bbInit();
  document.addEventListener('pjax:complete', bbInit);