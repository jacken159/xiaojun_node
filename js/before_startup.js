
(() => {
  setInterval(() => {

    xiaojun_db.getItem('mf_data').then((r1) => {
      os.p.f = 'autosave'
      os.p.t = 'mf_data'
      os.p.d = r1;
      load_ajax().then(r => {
        console.log('auto-save done')
      })
    });
  }, 60000)
})()


function checkos() {
  return new Promise((r) => {
    new_link('icon', 'favicon.png');

    let sUsrAg = navigator.userAgent;

    //The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf('Firefox') > -1) {
      os.browser = 'Firefox';
      //"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf('Opera') > -1) {
      os.browser = 'Opera';
    } else if (sUsrAg.indexOf('Trident') > -1) {
      os.browser = 'IE';
      //"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf('Edge') > -1) {
      os.browser = 'Edge';
      //"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      os.browser = 'Chrome';
      //"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf('Safari') > -1) {
      os.browser = 'Safari';
      //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      os.browser = 'unknown';
    }

    if (sUsrAg.indexOf('Android') > -1) {
      os.device = '安卓';
      os.click = 'touchend';
    } else if (sUsrAg.indexOf('iPad') > -1) {
      os.device = 'IPAD';
      os.click = 'touchend';
    } else if (sUsrAg.indexOf('iPhone') > -1) {
      os.device = 'IPHONE';
      os.click = 'touchend';
    } else if (sUsrAg.indexOf('Windows') > -1) {
      os.device = 'pc';
      os.click = 'click';
    } else {
      os.device = '其他';
      os.click = 'click';
    }
    console.log(os.device, '#', os.click)

    try {
      xiaojun_db.getItem('j').then((res) => {
        os.fp = res;

        os.p.fp=res;

        if (os.fp == null) {
          let fp = get_fp();

          os.p.f = 'save_j';
          os.p.d = fp;
          os.p.t = 'fp';
          os.p.fp=fp;
          load_ajax().then(r => {
            console.log(r)
            xiaojun_db.setItem('j', fp);
          })

          //localStorage.setItem("j", os_fp);
        }

      });
      os.page_bottom = os.perpage;
    } catch (error) {
      console.log('os_after' + JSON.stringify(error));
    }




    xiaojun_db.getItem('mf').then((r1) => {
      if (r1 == null) {
        xiaojun_db.setItem('mf', []);
        os.card_data['mf'] = [];
      } else {
        os.card_data['mf'] = r1;
      }
      console.log(os.card_data)

    });


    xiaojun_db.getItem('mf_data').then((r1) => {
      if (r1 == null) {
        xiaojun_db.setItem('mf_data', {});
        os.mf_data['mf_data'] = {};
      } else {
        os.mf_data = r1;
      }

      console.log(os.mf_data);
    });



    r(os.browser);
  });


}

function new_link(type, path) {
  let new_link = document.createElement('link');
  new_link.rel = type;
  new_link.href = path;
  document.getElementsByTagName('head')[0].appendChild(new_link);
}

function new_el(type, id, class_f, text, style, where) {
  let new_el = document.createElement(type);
  new_el.innerHTML = text;
  new_el.id = id;
  new_el.className = class_f;
  new_el.style = style;
  if (where == '' || where == null) {
    document.body.appendChild(new_el);
  } else {
    $('#' + where).append(new_el);
  }
}

function new_nav() {
  let nav = `
    <div id="os_menu" class="MENU_ICON float_left ICON" style="background-color:#FFF;"></div>
    <div id="os_back" class="prev_icon float_left ICON hide" style="background-color:#FFF;"></div>
    <div id='NAV_FLUSH' class='flush_icon ICON hide' style='position:absolute;top:0;right:0'></div>
    <div id="TOOLSBAR" class="TOOLSBAR float_left">
        <div>
            <text id='OS_TITLE' class='OS_TITLE UNDERLINE B float_left' style="margin:10px 0"></text>
        </div>
        <div>
            <p id='OS_TYPE' class='OS_TYPE UNDERLINE B float_left' style="margin:10px 0"></p>
        </div>
       
        <div id="OS_SSLY" class="hide">
            <text id="OS_SSLY_TEXT"></text><select id='OS_SSLY_SELECTOR'></select>
        </div>
        <div id='OS_QUICK_TT' class='MT10'><input type='text' id='os_quick' placeholder='快速查找' style='color:white'/></div>
    </div>
    <div id='table_temp' class='hide'></div>
    <div id='os_buttons' class="float_left">
        <div class='float_left'><text class="hide button">所属时间</text><select id='os_sssg' class="hide button"></select></div>
        <div id='os_edit' class='HOVER hide button' title='编辑'><span class='float_left'>编辑</span><div class='EDIT icon_20 clear ML5'></div> </div>
        <div id='os_plus' class='HOVER hide button' title='添加'><span class='float_left'>新增</span><div class='PLUS icon_20 clear ML5'></div> </div>
        <div id='os_reflush' class='HOVER hide button' title='刷新'><span class='float_left'>刷新</span><div class='flush_icon icon_20 clear ML5'></div></div>
        <div id='OS_UNDO' class='HOVER hide button' title='撒消'><div class='UNDO ICON'></div></div>
        <div id='os_quote' class='HOVER hide button' title='引用'><div class='quote_icon ICON '></div></div>
        <div id='os_print' class='HOVER hide button' title='打印'><span class='float_left'>打印</span><div class='PRINT icon_20 clear ML5 '></div></div>
        <div id='os_replace' class='HOVER hide button' title='查找'><span class='float_left'>查找</span><div class='replace_icon icon_20 clear ML5 '></div></div>
        <div id='os_save' class='HOVER hide button' title='保存'><span class='float_left'>保存</span><div class='save_icon icon_20 clear ML5 '></div></div>
        <div id='os_match' class='HOVER hide button' title='获取'><span class='float_left'>获取</span><div class='MATCH_ICON icon_20 clear ML5 '></div></div>
        <div id='os_download' class='HOVER hide button' title='下载'><span class='float_left'>下载</span><div class='DOWNLOAD icon_20 clear ML5 '></div></div>
        <div id='OS_CHECK' class='HOVER hide button' title='核对'><div class='CHECK ICON '></div></div>
        <div id='OS_SELECT_ALL' class='HOVER hide button' title='全选'><div class='select_all_icon ICON '></div></div>
        <div id='OS_SELECT_NONE' class='HOVER hide button' title='全否'><div class='select_none_icon ICON '></div></div>
        <div id='OS_CHECK' class='HOVER hide button' title='核对'><div class='CHECK ICON '></div></div>
        <div id='os_e' class='HOVER hide button' title='汇总'><span class='float_left'>汇总</span><div class='E_ICON icon_20 clear ML5 '></div></div>
        <div id='os_display' class='HOVER hide button' title='显示'><span class='float_left'>显示</span><div class='display_icon icon_20 clear ML5 '></div></div>
        <div id='OS_CANCEL' class='HOVER hide RED button' title='关闭/返回'><div class='cancel ICON '></div></div>
    </div>
    <textarea id="FORCOPY" style="height:0px;width: 0px;"></textarea>
    <canvas id="FOR_RESIZE" width="0" height="0" class="hide"></canvas>
    <div id='copyed_border' class='hide' style='position:fixed'></div>

    
    <div id='os_temp' class="hide"></div>
    <div id="wfs" class='warning hide'></div>
    
`;
  new_el('section', 'nav', 'nav ', nav);
  let side_nav = `
        
  <div id='user_detail' class='_100 float_left' >
      <img id='user_url' src='./img/xiaojun.png' style='width:12em;height:6em'></img>
      
      <div ><label>欢迎，</label><text id='nickname' class=''></text></div>
      <div id="os_org"></div>
      <div id="os_comp"></div>
      
  </div>
  <div id='login_form' class=' float_left hide'>
      <button id='os_login' class='button_css 'style='margin:5px' >登录</button>
      <button id='os_register' class='button_css 'style='margin:5px' >注册</button>
  </div>
  <div id='logon_detail' class='float_left' style='border-bottom: 1px solid #eaeaea;width:96%;padding: 2% 0 2% 2%;'>
      
      <div style='position:absolute;top:0;right:80px;font-size:0.8em'>v1.5.12.${$('script').length
    } beta</div>
      <div class='menu_side ICON' style='position:absolute;top:90px;left:90%'></div>
      <div class='flush_icon ICON' style='position:absolute;top:0;left:0'></div>
      <div class='download_icon ICON' style='position:absolute;top:0;left:45px'></div>
      <div class='quote_icon ICON ' style='position:absolute;top:0;left:90px' title='引用'></div>
      <div class='camera_icon ICON' style='position:absolute;top:0;right:0'></div>
  </div>
  <div id='user_mf' class='_100 float_left' style='overflow-x: hidden;max-height:75%'></div>
  <button id='new_mf' class='_100 button_css' style='margin:0'>+</button>
`;

  let w = 90;
  console.log(os.device);
  if (os.device === 'pc') {
    w = 30;
  }
  new_el(
    'section',
    'side_nav',
    'side_nav',
    side_nav,
    `width:${w}%;min-width: 240px;`
  );

  let for_scan = `
                <button id='FOR_SCAN0' class='button_css'>闪光灯</button>
                <div id='SCAN_BODY' style='height: 100%;width: 100%;position: fixed;top: 0;'></div>
            `;
  new_el(
    'section',
    'for_scan',
    'hide',
    for_scan,
    'z-index:5;position:fixed;bottom:0;text-align: center;'
  );

  let for_video = `
                <button id='video0' class='button_css'>闪光灯</button>
                <video id='preview' style='height: 50%;width: 80%;position: fixed;top: 20%;left: 10%;'></video>
                <span class='sm-redline' ></span>
            `;
  new_el(
    'section',
    'video_tt',
    'hide',
    for_video,
    'z-index:5;position:fixed;bottom:0;text-align: center;'
  );

  let for_swift = `
        <div id='swift_button' class='_100'  style='position: sticky;top: 0;z-index:1'>
          <div id="swift_left" class="prev_icon ICON button" style=""></div>
          <div id='swift_cancel' class='cancel ICON button ' style='float:right'></div>
          <div id='swift_save' class='button' style=''><span class='float_left'>保存</span><div  class="save_icon icon_20 float_right clear MR5"></div></div>
          <div id='swift_match' class='button' style=''><span class='float_left'>获取</span><div class="MATCH_ICON icon_20 float_right clear MR5"></div></div>
          <div id='swift_download' class='button' style=''><span class='float_left'>下载</span><div class="DOWNLOAD icon_20 float_right clear MR5"></div></div>
        </div>
        <div id="swift_content" ></div>
       
      
    `;
  new_el('section', 'swift', 'swift hide ', for_swift, '');

  let kt = `<div id="wfw" class='warning hide'></div>
    <div id="bar" class="hide" >
        <div class='process'></div>
    </div>
    <progress id='proc' class="hide" value="0" max="100" style='position:fixed;top:0px;right:0;width:50%;    z-index: 2;'></progress>
    <div id='mover' draggable="false"></div>
    <textarea id="editor" style='position:fixed;top:-15px;left:-15px;height:0px;width: 0px;padding:5px;border: 2px solid #009688;overflow: hidden;z-index:6;'></textarea>
    <div id='fm_selector' class='fm_selector' style='position:absolute;left:-15px;top:-15px;height:0px;width:0px;padding:5px;z-index:6'>
        <div id='FS_CANCEL' class='cancel ICON' style='position:absolute;right:0;top:0;'></div>
        <ul id='CS_FM_LIST' class='CSS_FM_LIST'></ul>
        <div id='FM_SELECTOR_CONTENT'></div>
    </div>
    <span id='editor_c' class='dragable hide cant_select' style='position:fixed;top:0px;left:0px;z-index:4;'>
        <span class='float_left'>
            <div class='add_icon ICON spiner'  style='margin-left:0px'></div>
            <div class='prev_icon ICON clear'></div><div ><label for='editor_c_val'></label><input id='editor_c_val' class='MT10' type='text' style='width:0;margin-top:10px;max-width:200px;' value=''  /></div><div class='next_icon ICON' style='max-width:200px'></div>
            <div class='minus_icon ICON spiner clear' style='margin-left:0px'></div>
        </span>
        <span class='float_left'>
            <div class='LESS ICON  clear' style='float:left'></div>
            <div class=' ICON clear' style='float:left'></div>
            <div class='MORE ICON  clear' style='float:left'></div>
        </span>
    </span>
    `;
  new_el('div', '', '', kt);
  let bottom_nav = `
  <div id="powerby">Design By Gitkwan</div>
`;

  new_el('section', 'BOTTOM_NAV', 'BOTTOM_NAV', bottom_nav);
  $('#bar').addClass('hide');
}
