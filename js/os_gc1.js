import { os } from '/js/os_source.js';
function gc() {
  $('#TABLE_LIST').on('click', '.TABLES', function () {
    let THIS = $(this);
    let TABLE_LIST = $('#TABLE_LIST'),
      TABLES = TABLE_LIST.find('.TABLES');
    TABLES.removeClass('BLUE');
    THIS.addClass('BLUE');
    for (let i = 0; i < TABLES.length; i++) {
      let T = TABLES.eq(i).text();
      $('#' + T).addClass('hide');
    }
    $('#' + THIS.text()).removeClass('hide');
  });
  $('.HMGL').on('mousedown', function () {
    content_focus = $(this).attr('id');
  });

  $('body')
    .on(os_click, '.UNFOLD', function () {
      console.log(1);
      let THIS_CONTENT = $('.CONTENT_FOCUS'),
        SS = THIS_CONTENT.attr('id');
      THIS_CONTENT.find('.LESS').toggleClass('hide');
      THIS_CONTENT.find('.MORE').toggleClass('hide');
      $('#' + SS + '_TT').toggleClass('_6');
    })
    .on(os_click, '.card_tt', function () {
      let THIS_CONTENT = $('.CONTENT_FOCUS'),
        SS = THIS_CONTENT.attr('id');
      THIS_CONTENT.find('.MORE').addClass('hide');
      THIS_CONTENT.find('.LESS').removeClass('hide');
      $('#' + SS + '_TT').removeClass('_6');
    });

  /*
            $(document).on("touchstart","#FOR_SCAN0", function (EVENT) {
                if (CAMERA_FLASH == false) {
                    scan.setFlash(true);
                    CAMERA_FLASH = true;
                } else {
                    scan.setFlash(false);
                    CAMERA_FLASH = false;
                }
    
                
            })
            
            .on("touchend", function () {
                let now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            });
            */

  $('body').on('change', 'input', function () {
    $(this).addClass('input_edited');
  });

  $('body')
    .on('touchstart mousedown', '.card_list', function (EVENT) {
      $('.DELETE_ICON').remove();
      let self = $(this),
        this_content = $(this).closest('.os_content'),
        ss = this_content.attr('id');
      this_content.find('.current').removeClass('current');
      let attr = self.closest('.os_content').attr('id');
      if (os_device != 'pc') {
        renew_content_focus(ss);
      }
      self.removeClass('salmon');

      if (os_check == true) {
        self.toggleClass('tr_checked');
      } else {
        self.addClass('current');
        $('.FOR_DELETE').offset({ left: 0 });
        $('.FOR_DELETE').removeClass('FOR_DELETE');
      }
      os_longpress = false;

      timeOutEvent = setTimeout(function () {
        os_longpress = true;
      }, 300);
    })
    .on('touchmove', '.card_list', function (EVENT) {
      let self = $(this);
      let X = EVENT.touches[0].clientX;
      let X_R = X - os_touch_x;
      if (-200 < X_R && X_R < -150) {
        $('.DELETE_ICON').remove();
        self.after(
          `<div class='DELETE_ICON ICON MT10 float_left' style='position:fixed;top:${
            self.offset().top + 10
          }px;right:10px;'></div>`
        );

        self.addClass('FOR_DELETE');
        self.offset({ left: -50 });

        self.find('.DELETE_ICON').offset({ right: 0 });
        os_touch_event = true;
      }
    })
    .on('touchstart', function (EVENT) {
      os_touch_x = EVENT.touches[0].clientX;
      os_touch_y = EVENT.touches[0].clientY;
    })
    .on('touchmove', function (event) {
      //EVENT.preventDefault();
      //EVENT.stopPropagation();
      if (os_draging != true) {
        os_touching = true;
      }

      let Y = event.touches[0].clientY;
      let X = event.touches[0].clientX;
      let ss = $('#' + content_focus).attr('id');

      if (os_touching == true) {
        let X_R = X - os_touch_x,
          Y_R = Y - os_touch_y;
        let ST = $(`#${ss}_content`).scrollTop();
        if (Y_R > 200 && ST == 0 && $('.ALERT').length == 0) {
          /*
                let TT = $(`#${ss}_title`).attr("tit");
                //console.log(TT)
                
                new Promise(r=>{
                    r(eval(ss + `("${TT}",0,${os_perpage})`));

                }).then(()=>{
                    afl_func(`刷新完成`,"",600);
                })
                */
        }

        if (X < 50 && 0 < X_R && X_R < 50) {
          os_touch_x = event.touches[0].clientX;
          $('#side_nav').addClass('side_nav_move');
          $('#wfs').removeClass('hide');
        }
      }
    })
    .on('touchend mouseup', function () {
      os_touch_x = 0;
      os_touching = false;
      OS_TOUCHING_COUNT = 0;
      os_longpress = false;
    })
    .on(os_click, '#wfw', function () {
      reset_editor();
    });

  $('#editor_c')
    .on('touchstart', '.add_icon', function () {
      spiner_fx('+');
    })
    .on('touchstart', '.minus_icon', function () {
      spiner_fx('-');
    })
    .on('touchstart', '.prev_icon', function () {
      let this_card = $('#' + content_focus).find('.current');
      let curr_i = this_card.attr('curr');
      if (curr_i != 1) {
        new_spinner(curr_i - 1);
        this_card.attr('curr', curr_i - 1);
      }
    })
    .on('touchstart', '.LESS', function () {
      let this_card = $('#' + content_focus).find('.current');
      let curr_i = this_card.attr('curr');
      let prev = this_card.prev('.card_list');
      if (prev.length > 0) {
        prev.attr('curr', curr_i);
        $('#' + content_focus)
          .find('.current')
          .removeClass('current');
        prev.addClass('current');
        new_spinner(curr_i);
      }
    })
    .on('touchstart', '.MORE', function () {
      let this_card = $('#' + content_focus).find('.current');
      let curr_i = this_card.attr('curr');
      let next = this_card.next('.card_list');
      if (next.length > 0) {
        next.attr('curr', curr_i);
        $('#' + content_focus)
          .find('.current')
          .removeClass('current');
        next.addClass('current');
        new_spinner(curr_i);
      }
    })
    .on('touchstart', '.next_icon', function () {
      let this_card = $('#' + content_focus).find('.current');
      let curr_i = this_card.attr('curr'),
        len = this_card.attr('len');
      if (curr_i != len) {
        new_spinner(parseFloat(curr_i) + 1);
        this_card.attr('curr', parseFloat(curr_i) + 1);
      }
    })
    .on('touchend', '.spiner', function () {
      if (isNaN($('#editor_c_val').val()) == false) {
        clearTimeout(spiner_timeout);
        if (spiner_touching == true) {
          spiner_touching = false;
          clearInterval(spiner_timeout1);
        }
      }
    })
    .on('change', '#editor_c_val', function () {});

  $(document)
    .on('touchstart', '.dragable', function (event) {
      os_draging = true;
      let self = $(this);
      $('.draging').removeClass('draging');
      self.addClass('draging');
      drag_x = event.pageX - self.offset().left;
      drag_y = event.pageY - self.offset().top;
    })
    .on('touchmove', function (event) {
      if (os_draging == true) {
        os_touching = false;
        let self = $('.draging');
        let t = event.touches[0].clientY - drag_y,
          l = event.touches[0].clientX - drag_x;
        self.css('position', 'fixed');
        self.offset({ top: t, left: l });
      }
    })
    .on('touchend mouseup', function (event) {
      if (os_draging == true) {
        let this_content = $('#' + content_focus),
          ss = this_content.attr('id');
        os_draging = false;
        if (os_device == 'pc') {
          let self = this_content.find('.draging');
          let th = self.closest('th');
          if (th.length > 0) {
            let crs = this_content.find('.col_resize');
            for (let i = 0; i < crs.length; i++) {
              let this_th = crs.eq(i).closest('th');
              crs
                .eq(i)
                .offset({
                  top: this_th.offset().top,
                  left: this_th.offset().left + this_th.width() + 8
                });
            }
            xiaojun_db.setItem('os_cols_width', os_cols_width);
            //this_content.find('.col_resize').css("position", "absolue");
          }
        }

        $('.draging').removeClass('draging');
      }
    })
    .on('mousedown', '.dragable', function (event) {
      //event.preventDefault();
      event.stopPropagation();
      try {
        let ss = $('#' + content_focus).attr('id');
        os_draging = true;
        let self = $(this);
        $('.draging').removeClass('.draging');
        self.addClass('draging');

        drag_x = event.pageX - self.offset().left;
        drag_y = event.pageY - self.offset().top;

        if (os_cols_width[ss] != null) {
          let table_width = 0;
          for (let i = 0; i < os_cols_width[ss].length; i++) {
            table_width += os_cols_width[ss][i];
          }
          $('#' + ss + 'HEADER')
            .find('div')
            .first()
            .width(table_width);
          $('#' + ss + '_table_body_div').width(table_width);
        }
      } catch (error) {
        console.log('dragable' + error);
      }
    })
    .on('mousemove', function (event) {
      if (os_draging == true) {
        let self = $('.draging');
        let t = event.pageY - drag_y,
          l = event.pageX - drag_x;
        //self.css("position", "fixed");
        self.offset({ top: t, left: l });

        if (os_device == 'pc') {
          let this_content = $('#' + content_focus),
            ss = this_content.attr('id');
          let self = $('#' + content_focus).find('.draging');
          if (self.closest('th').length > 0) {
            let th_offset = self.closest('th').offset();
            let index = self.closest('th').index();
            let w = event.pageX - th_offset.left - 9;
            let trs = $('#' + content_focus).find('tr');

            os_cols_width[ss][index] = w;
            for (let i = 0; i < trs.length; i++) {
              let frs = trs.eq(i).find('.for_resize');
              frs.eq(index).width(w);
            }
            let table_width = 0;
            for (let i = 0; i < os_cols_width[ss].length; i++) {
              table_width += os_cols_width[ss][i];
            }
            $('#' + ss + 'HEADER')
              .find('div')
              .first()
              .width(table_width);
            $('#' + ss + '_table_body_div').width(table_width);
          }
        }
      }
    });

  $('body')
    .on('change', '.os_table_tt .per_page', function () {
      let THIS = $(this),
        THIS_CONTENT = THIS.closest('.os_content'),
        SS = THIS_CONTENT.attr('id');
      let per_page = parseFloat(THIS_CONTENT.find('.per_page').val());
      let page_top = THIS_CONTENT.find('.page_top');
      let page_bottom = THIS_CONTENT.find('.page_bottom');
      if (os_table[SS].pages_from == 'J') {
        let totle_rows = parseFloat(THIS_CONTENT.find('.totle_rows').text());
        if (parseFloat(page_bottom.text()) + per_page > totle_rows) {
          if (totle_rows - per_page < 0 || totle_rows - per_page == 0) {
            os_top = 0;
            os_bottom = totle_rows;
          } else {
            os_top = totle_rows - per_page;
            os_bottom = os_top + per_page;
          }
        } else {
          os_top = parseFloat(page_top.text()) + per_page;
          os_bottom = os_top + per_page;
        }
        os_perpage = THIS.val();
        console.log(os_top, os_bottom);
        REFLUSH(SS);
        page_top.text(os_top);
        page_bottom.text(os_bottom);
      } else {
        os_top = parseFloat(page_top.text()) + per_page;
        os_bottom = os_top + per_page;
        page_top.text(os_top);
        page_bottom.text(os_bottom);
        eval(SS + '(' + os_top + ',' + os_bottom + ')');
      }
    })
    .on(os_click, '.os_table_tt .prev_icon', function () {
      let self = $(this),
        this_content = self.closest('.os_content'),
        ss = this_content.attr('id');
      let per_page = parseFloat(this_content.find('.per_page').val());
      let page_top = this_content.find('.page_top');
      let page_bottom = this_content.find('.page_bottom');

      if (parseFloat(page_top.text()) - per_page < 1) {
        os_top = 0;
      } else {
        os_top = parseFloat(page_top.text()) - per_page;
      }
      os_bottom = os_top + per_page;
      if (os_table[ss].pages_from == 'j') {
        reflush_table(ss);
        page_top.text(os_top);
        page_bottom.text(os_bottom);
      } else {
        os_top = parseFloat(page_top.text()) - per_page;
        os_bottom = os_top + per_page;
        page_top.text(os_top);
        page_bottom.text(os_bottom);

        eval(ss + '(' + os_top + ',' + os_bottom + ')');
      }
    })
    .on(os_click, '.os_table_tt .next_icon', function () {
      let self = $(this),
        this_content = self.closest('.os_content'),
        ss = this_content.attr('id');
      let per_page = parseFloat(this_content.find('.per_page').val());
      let page_top = this_content.find('.page_top');
      let page_bottom = this_content.find('.page_bottom');

      if (os_table[ss].pages_from == 'j') {
        let totle_rows = parseFloat(this_content.find('.totle_rows').text());
        if (parseFloat(page_bottom.text()) + per_page > totle_rows) {
          if (totle_rows > per_page) {
            os_top = totle_rows - per_page;
            os_bottom = os_top + per_page;
          } else {
            os_top = 0;
            os_bottom = per_page;
          }
        } else {
          os_top = parseFloat(page_top.text()) + per_page;
          os_bottom = os_top + per_page;
        }

        reflush_table(ss);
        page_top.text(os_top);
        page_bottom.text(os_bottom);
      } else {
        os_top = parseFloat(page_top.text()) + per_page;
        os_bottom = os_top + per_page;
        page_top.text(os_top);
        page_bottom.text(os_bottom);
        eval(ss + '(' + os_top + ',' + os_bottom + ')');
      }
    });

  $('body')
    .on('mouseenter', 'th', function () {
      $(this).find('.filter_icon').removeClass('hide');
    })
    .on('mouseleave', 'th', function () {
      $(this).find('.filter_icon').addClass('hide');
    })
    .on('mouseenter', 'td', function () {
      let index = $(this).index();
      if (os_table[content_focus] != null) {
        if (os_table[content_focus].headers[index] != null) {
          if (os_table[content_focus].headers[index].icon != null) {
            $(this).find('.td_info').removeClass('hide');
          }
        }
      }
    })
    .on('mouseleave', 'td', function () {
      let index = $(this).index();
      if (os_table[content_focus] != null) {
        if (os_table[content_focus].headers[index] != null) {
          if (os_table[content_focus].headers[index].icon != null) {
            $(this).find('.td_info').addClass('hide');
          }
        }
      }
    });
  $('body').on(os_click, '#FS_CANCEL', function () {
    $('#fm_selector').width(0).height(0).offset({ left: -15, top: -15 });
  });
}

function new_spinner(index) {
  //
  $('#editor_c').removeClass('hide');
  $('#wfs').removeClass('hide');

  let this_card = $('.CONTENT_FOCUS').find('.current');
  let ss = $('.CONTENT_FOCUS').attr('id');
  let s =
    $('#' + ss + '_content').scrollTop() +
    this_card.offset().top -
    $(`#${ss}_HEADER`).height() -
    $('#NAV').height() -
    6;

  let s_t = s;
  if (s < 0) {
    s_t = 0;
  }
  $('#' + ss + '_content').scrollTop(s_t);

  let cts = this_card.find(`.card_t[n=${index}]`);
  let cts_w = cts.width();
  let cts_t = cts.text();
  if (index > 5) {
    cts_w = 150;
    cts_t = this_card.attr('kt' + index);
  } else if (index == 7) {
  }
  this_card.attr('curr', index);
  let left = (cts_w + 40 + 10) / 2;
  let target_w = (cts_w + 40) / 2;
  if (target_w > 150) {
    target_w = 150;
  }
  let editor_width = this_card.width() / 2 - target_w - 20;
  $('#editor_c')
    .css('top', this_card.offset().top - 50)
    .css('left', editor_width);
  $('#editor_c .add_icon').css('margin-left', left);
  $('#editor_c .minus_icon').css('margin-left', left);

  $('#editor_c_val').css('width', cts_w).addBack().val(cts_t);
}

function spiner_fx(fx) {
  let this_card = $('.CONTENT_FOCUS').find('.current');
  let ss = $('.CONTENT_FOCUS').attr('id');
  let r_index = this_card.attr('tabindex'),
    c_index = this_card.attr('curr');
  let target = this_card.find(`.card_t[n=${c_index}]`);
  let val = $('#editor_c_val').val();
  spiner_touching = false;
  if (isNaN(val) == false) {
    $('#editor_c_val').val(
      eval(parseFloat($('#editor_c_val').val()).toFixed(2) + fx + 1)
    );
    target.text($('#editor_c_val').val()).attr('t', $('#editor_c_val').val());
    console.log(os_card_data[ss]);
    os_card_data[ss][r_index][c_index] = $('#editor_c_val').val();
    if ($.trim(this_card.attr('kt7')).length > 0) {
      let ga =
        parseFloat($('#editor_c_val').val()) *
        parseFloat(this_card.attr('kt7'));
      this_card.attr('kt8', ga.toFixed(2));
      os_card_data[ss][r_index][8] = ga;
    }
    this_card.addClass('tr_edited');

    spiner_timeout = setTimeout(() => {
      spiner_touching = true;
      spiner_timeout1 = setInterval(() => {
        $('#editor_c_val').val(
          eval(parseFloat($('#editor_c_val').val()).toFixed(2) + fx + 1)
        );
        target
          .text(parseFloat($('#editor_c_val').val()).toFixed(2))
          .attr('t', parseFloat($('#editor_c_val').val()).toFixed(2));
        os_card_data[ss][r_index][c_index] = $('#editor_c_val').val();
        if ($.trim(this_card.attr('kt7')).length > 0) {
          let ga =
            parseFloat($('#editor_c_val').val()) *
            parseFloat(this_card.attr('kt7'));
          this_card.attr('kt8', ga.toFixed(2));
          os_card_data[ss][r_index][8] = ga;
        }

        if (spiner_touching == false) {
          clearInterval(spiner_timeout1);
          clearTimeout(spiner_timeout);
        }
      }, 100);
    }, 200);
  }
}

function ALERT_FOR_REPLACE(PD) {
  $('#ALERT_FOR_REPLACE').remove();

  let CONTENT = '';
  CONTENT += "<div id='ALERT_FOR_REPLACE' class='alert_css Z_7 os_content'>";
  CONTENT += "<div class='alert_head float_left OS_MOVEABLE'>";
  CONTENT +=
    "<div class='ML20'>温馨提示：<text class='ALERT_TITLE'></text></div>";
  //ALERT_HEAD END
  CONTENT += '</div>';
  CONTENT += "<div class='alert_body float_left'>";
  if (PD == 'TEXT') {
    CONTENT += "查找列(从0开始数):<input type='text' id='FIND_COLS' /><br />";
    CONTENT += "替换列(从0开始数):<input type='text' id='REPLACE_COLS'/><br />";
    CONTENT +=
      "查找:<input type='text' id='REPLACE_BEFORE'/>绝对查找:<input type='checkbox' id='REPLACE_BEFORE_CHECK' /><br />";
    CONTENT +=
      "替换:<input type='text' id='REPLACE_AFTER'/>绝对替换:<input type='checkbox' id='REPLACE_AFTER_CHECK' checked='checked' />";
  } else if (PD == 'VLOOKUP') {
    CONTENT +=
      "查找列:<input type='text' id='FIND_COLS' />绝对查找:<input type='checkbox' id='FIND_CHECK' checked='checked'/><select id='AFR_TO_SELECTOR'></select><br />";
    CONTENT +=
      "替换列:<input type='text' id='REPLACE_COLS'/>绝对替换:<input type='checkbox' id='REPLACE_CHECK' checked='checked' /><br />";
    CONTENT +=
      "区域列起:<input type='text' id='AREA_START'/><select id='AFR_FROM_SELECTOR'></select><br />";
    CONTENT += "区域列止:<input type='text' id='AREA_END'/><br />";
  }

  //alert_body END
  CONTENT += '</div>';
  CONTENT += "<div class='alert_foot float_left'>";
  CONTENT += "<div class='float_right' style='margin-right:25px;'>";
  CONTENT += "<button id='FIND' class='REPLACE_FIND button_css'>查找</button>";
  CONTENT +=
    "<button id='REPLACE' class='REPLACE_CONTINUE button_css'>替换</button>";
  CONTENT +=
    "<button id='cancel' class='REPLACE_CANCEL button_css'>取消</button>";
  CONTENT += '</div>';
  //ALERT_FOOT END
  CONTENT += '</div>';
  //ALERT END
  CONTENT += '</div>';

  $('body').append(CONTENT);
  $('#FIND_COLS').focus();
  let ALERT = $('#ALERT_FOR_REPLACE');
  ALERT.on(os_click, '#cancel', function () {
    ALERT.remove();
  }).on('keyup', '#REPLACE_BEFORE', function () {
    $('#REPLACE_AFTER').val($(this).val());
  });
}
function frame_for_dc(url) {
  $('#FRAME').remove();
  let frame = `
        <div id='FRAME' class='FRAME' >
            <iframe src='${url}' width='1' height='1' frameborder='0' scrolling='auto'></iframe>
        </div>`;
  $('body').append(frame);
}
function FRAME_FOR_SELECT(WHERE, URL) {
  $('#FRAME').remove();
  let FRAME = `<div id='FRAME' class='FRAME' >
    <iframe src='${URL}' width='850' height='658' frameborder='0' scrolling='auto'></iframe>
    <div id='FRAME' class='' style='position:fixed;top:100px;left:200px'>
    </div>`;
  $('#' + WHERE).append(FRAME);
}

function after_save(ss) {
  //console.log(os_cs.select);
  //console.log(table_histroy)
  if (os_cs.select == 'select') {
    let table_set = [...new Set(table_histroy)];
    if (ss != table_set[table_set.length - 1]) {
      table_set.push(ss);
    }
    table_histroy = table_set;
    content_focus = ss;
    localStorage.setItem('content_focus', ss);
  }
  temp_data.splice(0, temp_data.length);
  /*
    let totle_h = $(window).height(), nav_h = $("#nav").height(), header_h = $("#" + ss + "_header").height() || 0;
    let h = totle_h - nav_h - header_h;
    $(`#${ss}_content`).height(h);
    $(`#${ss}`).offset({ top: $("#nav").height() });
    */

  //renew_content_focus(ss);
  $('body').find('.input_edited').removeClass('input_edited');
  if (os_device == 'pc') {
    $('#bar,#OS_SELECT_ALL,#OS_SELECT_NONE,#wfs,#wfw').addClass('hide');
  } else {
    $('#bar,#OS_PRINT,#OS_SELECT_ALL,#OS_SELECT_NONE,#wfs,#wfw').addClass(
      'hide'
    );
  }
  $('#side_nav').removeClass('side_nav_move');
  $('#proc').addClass('hide');
  os_check = false;
  clicking = false;
  os_touching = true;
  for_save.del = [];
  os_cs = {};
  os_del_id.splice(0, os_del_id.length);

  if (trs_edited_index[ss] != null) {
    trs_edited_index[ss].splice(0, trs_edited_index[ss].length);
  } else {
    trs_edited_index[ss] = [];
  }

  os_row_i.splice(0, os_row_i.length);
  os_col_i.splice(0, os_row_i.length);
  os_cut_i.splice(0, os_cut_i.length);

  try {
    if (data_ver[ss] == null) {
      data_ver[ss] = [];
    }
    data_ver[ss].push(os_table_data[ss].slice());
  } catch (error) {
    console.log('DATAVERITON出错了!!!请与管理员联系' + error);
  }

  reset_editor();
  $('#editor').val('');
}

/* GC-DATA START */

function fm_source(select, from, name) {
  let cs = JSON.stringify(os_cs);
  if (os_cs == '') {
    cs = null;
  }
  $('#bar').removeClass('hide');
  post_func = $.ajax({
    type: 'post',
    url: os_url,
    data: {
      dir: 'xiaojun',
      select: select,
      from: 'wap_select',
      cs: cs,
      fp: os_fp,
      comp: os_comp
    },
    //dataType: 'json',
    async: true
  })
    .done((res) => {
      if (os_table_data[name] == null) {
        os_table_data[name] = [];
      }
      try {
        os_table_data[name] = JSON.parse(res.trim());
      } catch (error) {
        os_table_data[name] = res.trim();
      }
      //os_cs = "";
      $('#bar').addClass('hide');
    })
    .fail((data, status) => {
      afl_func(JSON.stringify(data) + 'FM加载失败~' + status);
      $('#bar').addClass('hide');
    });
}

function encode_sssg(source_array, where) {
  //console.log(source_array)
  $('#os_sssg').removeClass('hide');
  let o = '',
    ssyf = $('#os_ssyf').text(),
    ssyf_next = $('#ssyf_next').text(),
    ssyf_prev = $('#ssyf_prev').text();
  if (source_array.length == 1) {
    //console.log("1")
    o += `<option value='${ssyf}'>${ssyf}</option>`;
  } else {
    //console.log("2")
    console.log(ssyf_prev, source_array[0][0]);
    if (parseFloat(ssyf_prev) > parseFloat(source_array[0][4])) {
      console.log('2.0');
      o += `<option value='${ssyf_prev}'>${ssyf_prev}</option>`;
      for (let i = 0; i < source_array.length; i++) {
        o += `<option value='${source_array[i][4]}'>${source_array[i][4]}</option>`;
      }
    } else if (parseFloat(ssyf) > parseFloat(source_array[0][4])) {
      console.log('2.1');
      o += `<option value='${ssyf}'>${ssyf}</option>`;
      for (let i = 0; i < source_array.length; i++) {
        o += `<option value='${source_array[i][4]}'>${source_array[i][4]}</option>`;
      }
    } else if (parseFloat(ssyf_next) > parseFloat(source_array[0][4])) {
      console.log('2.1');
      o += `<option value='${ssyf_next}'>${ssyf_next}</option>`;
      for (let i = 0; i < source_array.length; i++) {
        o += `<option value='${source_array[i][4]}'>${source_array[i][4]}</option>`;
      }
    } else {
      console.log('2.2');
      for (let i = 0; i < source_array.length; i++) {
        o += `<option value='${source_array[i][4]}'>${source_array[i][4]}</option>`;
      }
    }
  }
  $(`#${where}`).empty().append(o);
}
function encode_array_from_trs(SS, TRS) {
  let ARRAY = [];
  let HEADERS = os_table[SS].headers;
  for (let i = 0; i < TRS.length; i++) {
    let COLS = TRS.eq(i).find('td');
    let A = [];
    for (let j = 0; j < HEADERS.length; j++) {
      if (HEADERS[j] != null) {
        if (COLS.eq(j).attr('data-text') != null) {
          if (j == 0) {
            A.push('');
          } else {
            A.push(COLS.eq(j).attr('data-text'));
          }
        } else {
          A.push('');
        }
      } else {
        A.push('');
      }
    }
    ARRAY.push(A);
  }
  return ARRAY;
}
function encode_option(source, where, attr) {
  let o = '';
  for (let i = 0; i < source.length; i++) {
    o += `<option value='${source[i][attr]}'>${source[i][attr]}</option>`;
  }
  $('#' + where)
    .empty()
    .append(o);
  $('#' + where).removeClass('hide');
}
function ENCODE_TABLE(SS, INDEX, SOURCE, CLASS, COLOR, LEN) {
  let CONTENT = '';
  let TABLE_LEN = 0;
  if ($.trim(LEN).length == 0) {
    TABLE_LEN = SOURCE.length;
  } else {
    TABLE_LEN = LEN;
  }

  return CONTENT;
}
function ENCODE_LI_FROM_TEXT(SOURCE, TYPE) {
  let LI = '';
  let ROWS = SOURCE.split('$$');
  for (let i = 0; i < ROWS.length; i++) {
    let COLS = ROWS[i].split('||');

    if (TYPE == 'DISP') {
      for (let j = 0; j < COLS.length; j++) {
        LI +=
          "<li class='HOVER' t='" +
          COLS[j] +
          "' tabindex='" +
          i +
          "'>" +
          COLS[j] +
          '</li>';
      }
    } else {
      LI +=
        "<li class='HOVER' data-text='" +
        COLS[0] +
        "' tabindex='" +
        i +
        "'>" +
        COLS.toString() +
        '</li>';
    }
  }

  return LI;
}
function ENCODE_LIST_MULTI(SOURCE) {
  var S = $.trim(SOURCE).toString().split('$$');
  var DATA = [];
  for (var i = 0; i < S.length; i++) {
    DATA[i] = [];
    var S1 = S.toString().split('||');
    for (var j = 0; j < S1.length; j++) {
      DATA[i][j] = S1[j];
    }
  }

  return DATA;
}
function ENCODE_CARD_LI_FROM_CTS(CTS, TYPE, DG_INPUT, TITLE) {
  $('#CARD_UL').remove();
  let T = "<ul id='CARD_UL'>";
  for (let i = 0; i < CTS.length; i++) {
    if (TYPE != null && TYPE != '') {
      if (TYPE[i] != '') {
        T += `<li class='${CTS.eq(i).attr('class')}' t='${CTS.eq(i).attr(
          't'
        )}'><input type='${TYPE[i]}' class='AFC_INPUT' value='${CTS.eq(i).attr(
          't'
        )}'/></li>`;
      } else {
        T += `<li class='${CTS.eq(i).attr('class')}' t='${CTS.eq(i).attr(
          't'
        )}'>${CTS.eq(i).attr('t')}</li>`;
      }
    } else {
      T += `<li class='${CTS.eq(i).attr('class')}' t='${CTS.eq(i).attr(
        't'
      )}'>${CTS.eq(i).attr('t')}</li>`;
    }
  }
  if (DG_INPUT == 'DG' || DG_INPUT == 'DG_ALL') {
    let H = 'hide';
    if (DG_INPUT == 'DG_ALL') {
      H = '';
    }
    T += `<li >单价:<input type='number' char='dg' class='AFC_INPUT DG ${H}' /></li>`;
    T += `<li >金额:<input type='number' char='ga' class='AFC_INPUT GA ${H}' /></li>`;
    T += `<li >工号:<input type='text' char='gh' class='AFC_INPUT GH' /></li>`;
    T += `<li >备注:<input type='text' char='bj' class='AFC_INPUT BJ' /></li>`;
  } else if (DG_INPUT == 'VAL') {
    T += `<li>${TITLE}:<input type='text' class='AFC_INPUT VAL'/></li>`;
  }
  T += '</ul>';
  return T;
}

function ENCODE_DATA_FROM_TABLE(TRS, COLS_START, COLS_END) {
  let [COLS, ROWS] = ['', ''];
  for (let i = 0; i < TRS.length; i++) {
    let TDS = TRS.eq(i).find('td');
    let C = '';
    let [COLS_S, COLS_E] = ['', ''];
    if ($.trim(COLS_START) > 0) {
      COLS_S = COLS_START;
    } else {
      COLS_S = 0;
    }
    if ($.trim(COLS_END) > 0) {
      COLS_E = COLS_END;
    } else {
      COLS_E = TDS.length;
    }
    for (let j = COLS_S; j < COLS_E; j++) {
      C += $.trim(TDS.eq(j).attr('data-text')) + '||';
    }
    COLS += C.substring(0, C.length - 2) + '$$';
  }
  ROWS += COLS.substring(0, COLS.length - 2);
  return ROWS;
}
function ENCODE_DATA_FROM_BG(DATA) {
  let UPDATE = [];
  for (let i = 0; i < DATA['INDEX'].length; i++) {
    let U = {};
    let [OFFSET, SIZE] = ['', ''];
    if (DATA['OFFSET'].length > 0) {
      for (let j = 0; j < DATA['OFFSET'][i].length; j++) {
        OFFSET += DATA['OFFSET'][i][j] + ',';
        SIZE += DATA['SIZE'][i][j] + ',';
      }
      let O = OFFSET.substring(0, OFFSET.length - 1);
      let S = SIZE.substring(0, OFFSET.length - 1);
      U[['OFFSET']] = O;
      U[['SIZE']] = S;
    }

    U[['INDEX']] = DATA['INDEX'][i];
    U[['LY']] = DATA['LY'][i];
    U[['DATA']] = DATA['DATA'][i];
    UPDATE.push(U);
  }

  return UPDATE;
}

function ENCODE_DATA_FROM_ARRAY(ARRAY) {
  let ROWS = '',
    COLS = '';
  for (let i = 0; i < ARRAY.length; i++) {
    let T = '';
    for (let j = 0; j < ARRAY[i].length; j++) {
      T += $.trim(ARRAY[i][j]) + '||';
    }
    COLS += T.substring(0, T.length - 2) + '$$';
  }
  ROWS += COLS.substring(0, COLS.length - 2);
  return ROWS;
}
function ENCODE_ARRAY(TEXT, TYPE) {
  let ARRAY = [];
  let T = '';
  let S = TEXT.split(',');
  for (let i = 0; i < S.length; i++) {
    if (TYPE == 'TEXT') {
      ARRAY.push('' + $.trim(S[i]) + '');
    } else if (TYPE == 'NUM') {
      ARRAY.push(parseFloat(S[i]));
    } else if (TYPE == '+') {
      T += $.trim(S[i]);
    }
  }
  if (TYPE == 'TEXT' || TYPE == 'NUM') {
    return ARRAY;
  } else if (TYPE == '+') {
    return TEXT;
  }
}

function encode_fm_list(SS, DATA, FM_WHERE_LEN, DISP, PD_T, TYPE) {
  if (TYPE == 'LI') {
    if (FM_WHERE_LEN > 1) {
      let LI = '';
      //console.log(FM_LIST_2[DATA])
      if (fm_list[DATA].length > 0 && fm_list[DATA][0] != '') {
        for (let j = 0; j < fm_list[DATA].length; j++) {
          if (fm_list[DATA][j][0].indexOf($.trim(PD_T)) > -1) {
            let D = '';
            for (let k = 0; k < FM_WHERE_LEN; k++) {
              D += `data-${k}='${fm_list[DATA][j][k]}'`;
            }
            let T = '';
            for (let k = 0; k < DISP; k++) {
              T += fm_list[DATA][j][k] + ',';
            }
            LI += `<li data-i='${j}' tabindex='${j}' style='padding:5px;' class='HOVER FM_LIST filter' ${D}>${T}</li>`;
          }
        }
        $('#CS_FM_LIST').empty().append(LI);
      }
    } else {
      let LI = '';
      for (let j = 0; j < fm_list[DATA].length; j++) {
        if (fm_list[DATA][j].indexOf($.trim(PD_T)) > -1) {
          LI += `<li data-i='${j}' tabindex='${j}' style='padding:5px;' class='HOVER FM_LIST filter' data-0='${fm_list[DATA][j]}' >${fm_list[DATA][j]}</li>`;
        }
      }
      $('#CS_FM_LIST').empty().append(LI);
    }
  }
}
function encode_fm_list_sql(SS, FROM, TYPE, PD, WHERE, DISP) {
  load_table_ajax('OS/AJAX/SELECT1', FROM, { PD: PD, TYPE: TYPE }, '', 'TEXT');
  let S = $('#os_index').val().split('||');
  $('#' + SS)
    .find('.tr_list')
    .eq(S[0])
    .find('td')
    .eq(S[1])
    .addClass('td_selected');

  post_func.done((data) => {
    let ROWS = $.trim(data).split('$$');
    if (WHERE.length > 1) {
      let LI = '';
      for (let i = 0; i < ROWS.length; i++) {
        let COLS = ROWS[i].split('||');
        let D = '';
        for (let j = 0; j < WHERE.length; j++) {
          D += `data-${j}='${COLS[j]}'`;
        }
        let T = '';
        for (let j = 0; j < DISP.length; j++) {
          T += COLS[j] + ',';
        }
        LI += `<li data-i='${i}' tabindex='${i}' style='padding:5px;' class='HOVER FM_LIST filter' ${D}>${T}</li>`;
      }
      $('#CS_FM_LIST').empty().append(LI);
    } else {
      let LI = '';
      for (let i = 0; i < ROWS.length; i++) {
        let COLS = ROWS[i].split('||');
        LI += `<li data-i='${i}' tabindex='${i}' style='padding:5px;' class='HOVER FM_LIST filter' data-0='${COLS[i]}' >${COLS[i]}</li>`;
      }
      $('#CS_FM_LIST').empty().append(LI);
    }
    editor.focus();
  });
}
function GET_DATA_FROM_TRS(SS, TRS, KEY_FOR_UPDATE, TYPE) {
  //console.log(TYPE)
  //console.log(TRS)
  let HEADERS = os_table[SS].headers;
  if (TYPE == 'TRS') {
    let UPDATE = [];
    for (let i = 0; i < TRS.length; i++) {
      let U = {};
      for (let j = 0; j < KEY_FOR_UPDATE.length; j++) {
        U[j] = $.trim(TRS[i][j].toString())
          .replace(/&amp;/g, '&')
          .replace(/&#176;/g, '°')
          .replace(/&#178;/g, '²')
          .replace(/&#215;/g, '×')
          .replace(/&#216;/g, 'Ø');
      }
      U['I'] = i;
      UPDATE.push(U);
    }
    return UPDATE;
  } else if (TYPE == 'TEXT') {
    let TRS_EDITED_SET = [...new Set(trs_edited_index[SS])];
    let UPDATE = [];

    for (let i = 0; i < TRS_EDITED_SET.length; i++) {
      let U = {};
      for (let j = 0; j < HEADERS.length; j++) {
        let T = $.trim(TRS[TRS_EDITED_SET[i]][j])
          .replace(/&amp;/g, '&')
          .replace(/&#176;/g, '°')
          .replace(/&#178;/g, '²')
          .replace(/&#215;/g, '×')
          .replace(/&#216;/g, 'Ø');
        U[j] = T;
      }
      U['I'] = TRS_EDITED_SET[i];
      UPDATE.push(U);
    }
    return UPDATE;
  }
}

/* GC-DATA END */

/* GC-FORMAT END */

function format_num(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function FORMAT_NORMOM_NUM(TEXT) {
  let S = TEXT.split(',');
  let T = '';
  for (let i = 0; i < S.length; i++) {
    T += S[i];
  }
  let T1 = '';
  if ($.trim(T).length == 0) {
    return 0;
  } else {
    return T;
  }
}
function FORMAT_VAL(VAL) {
  let V = VAL.replace(/，/g, ',');
  return V;
}

function GET_DATETIME() {
  let dNow = new Date();
  let localdate =
    dNow.getMonth() +
    1 +
    '/' +
    dNow.getDate() +
    '/' +
    dNow.getFullYear() +
    ' ' +
    dNow.getHours() +
    ':' +
    dNow.getMinutes();
  return localdate;
}
function GET_DATE() {
  var d = new Date();
  d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
  let S = d.toISOString().split('T');
  let S1 = S[0].split('-');
  let DATE = S1[0] + '/' + S1[1] + '/' + S1[2];
  return DATE;
}

/* GC-FORMAT END */

function status_auto_fx() {
  let this_content = $(`#${content_focus}`),
    ss = this_content.attr('id');
  let trs = this_content.find('.selected_tr'),
    tds1 = this_content.find('.td_selected');
  let count = [],
    res = 0;
  for (let i = 0; i < trs.length; i++) {
    let tds = trs.eq(i).find('.td_selected');
    for (let j = 0; j < tds.length; j++) {
      if ($.trim(tds.eq(j).attr('data-text')).length > 0) {
        let TDS_S = tds.eq(j).attr('data-text').split('/') || '',
          TDS_S1 = tds.eq(j).attr('data-text').split('-') || '';
        res += 0;
        if (TDS_S.length > 2 || TDS_S1.length > 2) {
          res += 0;
          count.push(j);
        } else if (isNaN(tds.eq(j).attr('data-text'))) {
          res += 0;
          count.push(j);
        } else {
          count.push(j);
          res += parseFloat(tds.eq(j).attr('data-text'));
        }
      } else if ($.trim(tds.eq(j).attr('data-text')).length == 0) {
        res += 0;
        count.push(j);
      }
    }
  }
  let avg = res / tds1.length;
  this_content.find('.FX_SUM').text(res.toFixed(2));
  this_content.find('.FX_AVG').text(avg.toFixed(2));
  this_content.find('.FX_COUNT').text(count.length);
}

/* GC-TABLE START */

function set_fm_selector(THIS, LEFT_F, TOP_F, WIDTH_F, HEIGHT_F) {
  let fm_selector = $('#fm_selector');
  let THIS_CONTENT = THIS.closest('.os_content');
  let THIS_OFFSET = THIS.offset();
  let [THIS_LEFT, THIS_TOP] = [THIS_OFFSET.left, THIS_OFFSET.top];
  let [THIS_WIDTH, THIS_HEIGHT] = [THIS.width(), THIS.height() + TOP_F];
  let THIS_CONTENT_OFFSET = THIS_CONTENT.offset();
  let CONTAINER = $('.CONTENT_FOCUS').find('.td_selected');
  let [C_W, C_H] = [CONTAINER.width(), CONTAINER.height()];

  let BODY_HEIGHT = $('body').height();

  let BODY_WIDTH = $('body').width();
  if (THIS_LEFT + WIDTH_F > BODY_WIDTH) {
    console.log('0');
    if (THIS_TOP + HEIGHT_F > BODY_HEIGHT) {
      console.log('0>1');
      let LEFT = THIS_LEFT - THIS_WIDTH - LEFT_F;
      let TOP = THIS_TOP - THIS_HEIGHT - TOP_F;
      fm_selector.offset({ top: TOP, left: LEFT });
      fm_selector.width(THIS_WIDTH).height(THIS_HEIGHT + TOP_F);
    } else {
      console.log('0>2');
      let LEFT = THIS_LEFT - LEFT_F;
      let WIDTH = THIS_LEFT + WIDTH_F - BODY_WIDTH;

      fm_selector.offset({ top: THIS_TOP + THIS_HEIGHT, left: LEFT });
      fm_selector.width(WIDTH_F - WIDTH - 15 + LEFT_F).height(HEIGHT_F);
    }
  } else {
    console.log('3');
    fm_selector.offset({
      top: THIS_TOP + THIS.height() + THIS.height(),
      left: THIS_LEFT - 5
    });
    fm_selector.width(WIDTH_F).height(HEIGHT_F);
  }
}

function set_editor(self, _w, _h, _xx, _yy) {
  let editor = $('#editor');
  let offset = self.offset();
  let W = self.width() + _w,
    H = self.height() + _h;
  let XX = offset.left + _xx,
    YY = offset.top + _yy;
  let afs = self.attr('afs');
  if (afs != null) {
    editor.attr('afs', afs);
  }

  self.focus();
  editor.offset({ top: YY, left: XX });
  editor.width(W).height(H);
  editor.val($.trim(self.attr('data-text')));
  editor.focus().select();
}
function set_datepicker(THIS, _W, _H, _XX, _YY) {
  var datepicker = $('#datepicker');
  var OFFSET = THIS.offset();
  var W = THIS.width() + _W;
  var H = THIS.height() + _H;
  var XX = OFFSET.left + _XX;
  var YY = OFFSET.top + _YY;

  THIS.focus();
  datepicker.offset({ top: YY, left: XX });
  datepicker.width(W).height(H);
  datepicker.val($.trim(THIS.attr('data-text')));
  datepicker.focus().select();
}
function renew_i(ss) {
  let trs = $('#' + ss).find('.tr_list');
  let page_top = parseFloat(
    $('#' + ss)
      .find('.page_top')
      .text()
  );

  for (let i = 0; i < trs.length; i++) {
    let tr_index = parseFloat(page_top) + i;
    let I = tr_index + 1;
    trs.eq(i).find('td').first().text(I);
    trs.eq(i).attr('tabindex', tr_index);
    os_table_data[ss][tr_index][0] = tr_index;
  }
}
function RENEW_CARD_I(SS, FIRST) {
  let CARDS = $('#' + SS).find('.card_list');
  for (let i = 0; i < CARDS.length; i++) {
    CARDS.eq(i).attr('tabindex', i);
  }
}
function reset_editor() {
  $('#editor,#mover,#fm_selector,#datepicker').offset({ top: -15, left: -15 });
  $('#editor,#fm_selector,#datepicker').width(0).height(0);
}

function set_mover(THIS, _xx, _yy) {
  let mover = $('#mover');
  let offset = THIS.offset();
  let w = THIS.width(),
    h = THIS.height();
  let xx = offset.left + w + _xx,
    yy = offset.top + h + _yy;

  mover.offset({ top: yy, left: xx });
}
function os_table_copy(type) {
  return new Promise((r) => {
    let current = $('body').find('.td_selected'),
      this_content = current.closest('.os_content');
    this_content.find('.for_copy').removeClass('for_copy');
    let tds_selected = this_content.find('.td_selected');
    os_row_i.push(tds_selected.first().closest('tr').index());
    os_col_i.push(tds_selected.first().index());
    os_row_i.push(tds_selected.last().closest('tr').index());
    os_col_i.push(tds_selected.last().index());

    os_row_i.sort(function (a, b) {
      return a - b;
    });
    os_col_i.sort(function (a, b) {
      return a - b;
    });
    console.log(os_row_i, '#', os_col_i);
    //dataxamount = ROW_I[ROW_I.length - 1] - ROW_I[0] + 1;
    let trs = this_content.find('.tr_list');
    let X = '';
    if (type == 'title') {
      let Y = '';
      for (let j = os_col_i[0]; j <= os_col_i[os_col_i.length - 1]; j++) {
        Y += this_content.find('.OS_TH').eq(j).text() + '\t';
      }
      X = X + Y.substring(0, Y.length - 1) + '\n';
    }
    for (let i = os_row_i[0]; i <= os_row_i[os_row_i.length - 1]; i++) {
      let Y = '';
      for (let j = os_col_i[0]; j <= os_col_i[os_col_i.length - 1]; j++) {
        Y += $.trim(trs.eq(i).find('td').eq(j).attr('data-text')) + '\t';
        //trs.eq(i).find("td").eq(j).addClass("selected");
        trs.eq(i).find('td').eq(j).addClass('for_copy');
      }

      X = X + Y.substring(0, Y.length - 1) + '\n';
    }

    let _X = X.substring(0, X.length - 1);
    if (os_browser == 'Chrome' || os_browser == 'Firefox') {
      //var clipboard = nw.Clipboard.get();
      //clipboard.set('I love NW.js :)', 'text');

      r(
        navigator.clipboard
          .writeText(_X)
          .then(() => {
            //navigator.clipboard.readText() //paste
            //console.log('Text copied to clipboard');
          })
          .catch((err) => {
            // This can happen if the user denies clipboard permissions:
            console.error('Could not copy text: ', err);
          })
      );
    }
    $('#copyed_border').offset({
      top: trs.eq(os_row_i[0]).find('td').eq(os_col_i[0]).index()
    });

    current.focus();
    this_content.find('.td_selected').removeClass('td_selected');

    os_row_i.splice(0, os_row_i.length);
    os_col_i.splice(0, os_col_i.length);
    /*
         let isFirefox = typeof InstallTrigger !== 'undefined';
        let isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /=>@cc_on!@<=/false || !!document.documentMode;
        let isEdge = !isIE && !!window.StyleMedia;
        if (isFirefox) {
            //OS_TABLE_COPY(SS)
            console.log(f)
            $("#FORCOPY").empty().val(_X);
    
            let field = document.getElementById("FORCOPY")
            field.focus()
            field.select();
            document.execCommand("Copy");
    
    
        } else if (isChrome || isEdge) {
    
            navigator.clipboard.writeText(_X)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch(err => {
                    // This can happen if the user denies clipboard permissions:
                    console.error('Could not copy text: ', err);
                });
            
            <after CHROME 66 >
            console.log(c)
            let input = document.createElement('textarea');
            input.style.position = "absolute";
            input.style.left = "-1000px";
            input.style.top = "-1000px";
            document.body.appendChild(input);
    
            input.value = _X;
            console.log(input.value)
            input.focus();
            input.select();
            const result = document.execCommand('Copy');
    
            if (result === 'unsuccessful') {
                console.error('Failed to copy text.');
            }
            input.remove();
            
        }
        */
  }).then(() => {
    afl_func('已经复制,可以粘贴', '', 500);
  });
}

function os_table_paste() {
  let this_content = $(`#${content_focus}`),
    ss = this_content.attr('id');
  let page_top = parseFloat(this_content.find('.page_top').text());
  let data = '';
  $('#proc').removeClass('hide');
  $('#proc').val(0);
  navigator.clipboard
    .readText()
    .then((text) => {
      let datarows = $.trim(text).split('\n');
      $('#proc').attr('max', datarows.length);
      let proc_val = $('#proc').val();
      if (datarows.length > 100) {
        $('#wfs').removeClass('hide');
      }
      let tds_selected = this_content.find('td.td_selected');
      let tds_for_copy = this_content.find('.for_copy');
      let trs_selected = this_content.find('.selected_tr');
      let this_tr = this_content.find('.td_selected').closest('tr');

      tds_selected.focus();
      if (tds_selected.length == 1) {
        console.log('1');
        let trs = this_content.find('.tr_list'),
          tds_tr = tds_selected.closest('tr'),
          index = tds_selected.index();

        //console.log(DATAROWS.length)
        if (datarows.length > 1) {
          console.log('1=>1');
          for (let i = 0; i < datarows.length; i++) {
            proc_val++;
            $('#proc').val(proc_val);
            if ($('#proc').val() == datarows.length) {
              $('#proc').addClass('hide');
              $('#wfs').addClass('hide');
            }
            let I = index + i;
            let R = tds_tr.index() + i;
            //console.log(R,TRS.length,DATAROWS.length,DATAROWS[i])
            let data_cols = datarows[i].split('\t');
            if (R >= trs.length) {
              if (os_table[ss].tr_input == '1') {
                //console.log("1=>1=>1")
                let content = new_row(
                  'new',
                  ss,
                  '',
                  '',
                  '',
                  'tr_list tr_edited'
                );
                if (trs.length == 0) {
                  this_content.find('#tr_input').before(content);
                } else {
                  this_content.find('.tr_list').last().after(content);
                }
                os_table_data_add_row(R + 1);
                //$("#tr_input").before(CONTENT);
                for (let j = 0; j < data_cols.length; j++) {
                  let cs_td = this_content
                    .find('.tr_list')
                    .last()
                    .find('td')
                    .eq(index + j);
                  if (cs_td.hasClass('disabled')) {
                  } else if (cs_td.hasClass('hide')) {
                  } else {
                    cs_td
                      .text($.trim(data_cols[j]))
                      .attr('data-text', $.trim(data_cols[j]));
                    os_table_data[ss][os_table_data[ss].length - 1][
                      index + j
                    ] = data_cols[j].trim();
                    trs_edited_index[ss].push(os_table_data[ss].length - 1);
                  }
                }
              }
            } else if (R < trs.length) {
              trs.eq(R).addClass('tr_edited');
              for (let j = 0; j < data_cols.length; j++) {
                let cs_td = trs
                  .eq(R)
                  .find('td')
                  .eq(index + j);
                if (cs_td.hasClass('disabled')) {
                } else if (cs_td.hasClass('hide')) {
                } else {
                  cs_td
                    .text($.trim(data_cols[j]))
                    .attr('data-text', $.trim(data_cols[j]));
                  os_table_data[ss][page_top + R][index + j] = data_cols[
                    j
                  ].trim();
                  trs_edited_index[ss].push(page_top + R);
                }
              }
            }
          }
        } else {
          console.log('1=>2');
          let data_cols = datarows[0].split('\t');
          if (tds_tr.hasClass('tr_input')) {
            console.log('1=>1=>1');
            let content = new_row('new', ss, '', '', '', 'tr_list tr_edited');
            if (trs.length == 0) {
              this_content.find('#tr_input').before(content);
            } else {
              this_content.find('.tr_list').last().after(content);
            }
            os_table_data_add_row(this_content.find('.tr_list').last().index());
            //$("#tr_input").before(CONTENT);
            for (let j = 0; j < data_cols.length; j++) {
              let cs_td = this_content
                .find('.tr_list')
                .last()
                .find('td')
                .eq(index + j);
              if (cs_td.hasClass('disabled')) {
              } else if (cs_td.hasClass('hide')) {
              } else {
                cs_td
                  .text($.trim(data_cols[j]))
                  .attr('data-text', $.trim(data_cols[j]));
                os_table_data[ss][os_table_data[ss].length - 1][
                  index + j
                ] = data_cols[j].trim();
                trs_edited_index[ss].push(os_table_data[ss].length - 1);
              }
            }
          } else {
            console.log('1=>1=>2');
            trs.eq(tds_tr.index()).addClass('tr_edited');
            for (let j = 0; j < data_cols.length; j++) {
              let cs_td = trs
                .eq(tds_tr.index())
                .find('td')
                .eq(index + j);
              if (cs_td.hasClass('disabled')) {
              } else if (cs_td.hasClass('hide')) {
              } else {
                cs_td
                  .text($.trim(data_cols[j]))
                  .attr('data-text', $.trim(data_cols[j]));
                os_table_data[ss][page_top + tds_tr.index()][
                  index + j
                ] = data_cols[j].trim();
                trs_edited_index[ss].push(page_top + tds_tr.index());
              }
            }
          }
          //TDS_SELECTED.text($.trim(DATA)).attr("data-text", $.trim(DATA))
        }
      } else if (tds_for_copy.length == 1) {
        console.log('2');
        let trs = this_content.find('.selected_tr');
        trs.addClass('tr_edited');
        tds_selected
          .text($.trim(tds_for_copy.attr('data-text')))
          .attr('data-text', $.trim(tds_for_copy.attr('data-text')));
        for (let i = 0; i < trs.length; i++) {
          let tds = trs.eq(i).find('.td_selected');
          for (let j = 0; j < tds.length; j++) {
            os_table_data[ss][page_top + trs.eq(i).index()][
              tds.eq(j).index()
            ] = tds.eq(j).attr('data-text');
          }
          trs_edited_index[ss].push(page_top + trs.eq(i).index());
        }
      } else if (tds_for_copy.length > 1) {
        console.log('3');
        let t = [];
        for (let i = 0; i < tds_for_copy.length; i++) {
          t.push(tds_for_copy.eq(i).closest('tr').index());
        }
        let t_set = [...new Set(t)];
        let tds_for_copy_tr = t_set.slice();
        if (tds_for_copy_tr.length == 1) {
          //console.log("3=>1")
          let trs = this_content.find('.selected_tr');
          for (let i = 0; i < trs.length; i++) {
            let index = trs.eq(i).find('.td_selected').index();
            for (let j = 0; j < tds_for_copy.length; j++) {
              trs
                .eq(i)
                .find('td')
                .eq(index + j)
                .text($.trim(tds_for_copy.eq(j).attr('data-text')))
                .attr(
                  'data-text',
                  $.trim(tds_for_copy.eq(j).attr('data-text'))
                );
            }
            trs.eq(i).addClass('tr_edited');
          }
        } else if (tds_for_copy_tr.length > 1) {
          //console.log("3=>2")
        }
      } else {
        console.log('4');
        tds_selected.text($.trim(data)).attr('data-text', $.trim(data));
        this_tr.addClass('tr_edited');
      }

      let trs1 = this_content.find('.tr_edited');

      $('.selected:not(.hide)').focus();
      renew_i(ss);

      $('#fm_selector').width(0).height(0);
      $('#fm_selector').offset({ top: 0, left: 0 });
    })
    .catch((err) => {
      console.error('粘贴失败', err);
    });
}

function os_table_mover() {
  let this_content = $('#' + content_focus);
  let current = this_content.find('.td_selected');
  let for_mover_td = this_content.find('.for_mover');

  current.focus();
  $('#editor').offset({ top: 0, left: 0 });
  $('#editor').width(0).height(0);
  if (for_mover_td.length == 1) {
    let val = for_mover_td.attr('data-text');
    this_content.find('.td_selected').text(val).attr('data-text', val);
    this_content.find('.selected_tr').addClass('tr_edited');
    for (let i = os_row_i[0]; i <= os_row_i[os_row_i.length - 1]; i++) {
      for (let j = os_col_i[0]; j <= os_col_i[os_col_i.length - 1]; j++) {
        os_table_data[content_focus][i][j] = val;
      }
      trs_edited_index[content_focus].push(
        parseFloat($('.page_top').text()) + i
      );
    }
  }

  /*
     else if (MOVER_TD.length > 1 && mover_tr.length == 1) {
        var INDEX = MOVER_TD.first().index();
        var X = mover_tr.first().find(".for_mover");
        var X1 = THIS_CONTENT.find(".selected_tr").first().find(".CURRENT");
        var X2 = parseInt(X1.length / X.length);
        var X3 = X1.length % X.length;
        var X_COL = [];
        for (var i = 0; i < X2; i++) {
            for (var j = 0; j < X.length; j++) {
                X_COL.push(X.eq(j).text());
            }
 
        }
        for (var i = 0; i < X3; i++) {
            X_COL.push(X.eq(i).text());
        }
        for (var i = 0; i < THIS_CONTENT.find(".selected_tr").length; i++) {
            if (THIS_CONTENT.find(".selected_tr").eq(i).hasClass("tr_input")) { } else if (THIS_CONTENT.find(".selected_tr").eq(i).hasClass("tr_sum")) { } else {
                for (var j = 0; j < X_COL.length; j++) {
 
                    THIS_CONTENT.find(".selected_tr").eq(i).find("td").eq(INDEX + j).text(X_COL[j]).attr("data-text", X_COL[j]);
 
                }
                THIS_CONTENT.find(".selected_tr").eq(i).addClass("tr_edited");
            }
        }
    } else if (MOVER_TD.length > 1 && mover_tr.length > 1) {
        var INDEX = MOVER_TD.first().index();
        var X = mover_tr.first().find(".for_mover");
        var X1 = THIS_CONTENT.find(".selected_tr").first().find(".CURRENT");
        var X2 = parseInt(X1.length / X.length);
        var X3 = X1.length % X.length;
        var X_COL = [];
        for (var k = 0; k < mover_tr.length; k++) {
            X_COL[k] = [];
            for (var i = 0; i < X2; i++) {
                for (var j = 0; j < X.length; j++) {
                    X_COL[k].push(mover_tr.eq(k).find(".for_mover").eq(j).text());
                }
 
            }
            for (var i = 0; i < X3; i++) {
                X_COL[k].push(mover_tr.eq(k).find(".for_mover").eq(i).text());
            }
        }
 
        for (var i = 0; i < THIS_CONTENT.find(".selected_tr").length; i++) {
            if (THIS_CONTENT.find(".selected_tr").eq(i).hasClass("tr_input")) { } else if (THIS_CONTENT.find(".selected_tr").eq(i).hasClass("tr_sum")) { } else {
                for (var j = 0; j < X_COL.length; j++) {
 
                    THIS_CONTENT.find(".selected_tr").eq(i).find("td").eq(INDEX + j).text(X_COL[j]).attr("data-text", X_COL[j]);
                }
                THIS_CONTENT.find(".selected_tr").eq(i).addClass("tr_edited");
            }
        }
    }
    */
}

function get_sum(ss, type) {
  let trs = $(`#${ss}`).find('.tr_list');
  if (type == 'all') {
    let a = [];
    for (let i = 0; i < trs.length; i++) {
      if (a[i] == null) {
        a[i] = [];
      }
      let tds = trs.eq(i).find('td');
      for (let j = 0; j < tds.length; j++) {
        if (a[i][j] == null) {
          a[i][j] = 0;
          if (a[i - 1] != null) {
            a[i][j] = a[i - 1][j] + parseFloat(tds.eq(j).attr('data-text'));
          } else {
            a[i][j] += parseFloat(tds.eq(j).attr('data-text'));
          }
        }
      }
      if (i == trs.length - 1) {
        for (let l = 0; l < tds.length; l++) {
          if (isNaN(a[i][l]) == false) {
            $(`#${ss}tr_sum`)
              .find('td')
              .eq(l)
              .text(a[i][l].toFixed(2))
              .attr('data-text', a[i][l].toFixed(2));
          }
        }
      }
      // console.log(A);
      /*
            if (isNaN(parseFloat(TRS.eq(j).find("td").eq(i).attr("data-text")))) {
                RES += 0
            } else {
                RES += parseFloat(TRS.eq(j).find("td").eq(i).attr("data-text"));
            }
            */
    }
  } else {
    let headers = os_table[ss].headers;
    for (let i = 0; i < headers.length; i++) {
      if (headers[i].sum == 'sum') {
        let res = 0;
        for (let j = 0; j < trs.length; j++) {
          if (isNaN(parseFloat(trs.eq(j).find('td').eq(i).attr('data-text')))) {
            res += 0;
          } else {
            res += parseFloat(trs.eq(j).find('td').eq(i).attr('data-text'));
          }
        }
        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(res.toFixed(2))
          .attr('data-text', res);
      } else if (headers[i].sum == 'avg') {
        let res = 0;
        for (let j = 0; j < trs.length; j++) {
          if (isNaN(parseFloat(trs.eq(j).find('td').eq(i).attr('data-text')))) {
            res += 0;
          } else {
            res += parseFloat(trs.eq(j).find('td').eq(i).attr('data-text'));
          }
        }
        let avg_r = res / trs.length;
        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(avg_r)
          .attr('data-text', avg_r);
      } else if (headers[i].sum == 'count') {
        let res = [];
        for (let j = 0; j < trs.length; j++) {
          res.push($.trim(trs.eq(j).find('td').eq(i).attr('data-text')));
        }
        let res_set = [...new Set(res)];

        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(res_set.length)
          .attr('data-text', res_set.length);
      }
    }
  }
}

function GET_KMSL_CARD(FROM, SS, DATE, WH_I, TTID_I, FW_I, SL_I, TYPE) {
  $('#bar').removeClass('hide');
  let I = 0;
  let CARDS = $('#' + SS).find('.card_list');
  if (os_proc_t[SS] == null) {
    os_proc_t[SS] = { S: I, E: CARDS.length };
  }
  for (let i = 0; i < CARDS.length; i++) {
    let FW = '';
    if (FW_I != '') {
      FW = CARDS.eq(i)
        .find('.' + FW_I)
        .text();
    }
    $.ajax({
      type: 'post',
      url: 'OS/SELECT1',
      data: {
        FROM: FROM,
        CS: {
          DATE_F: DATE,
          WH: CARDS.eq(i)
            .find('.' + WH_I)
            .text(),
          TTID: CARDS.eq(i)
            .find('.' + TTID_I)
            .text(),
          FW: FW
        }
      },
      async: true
    }).done((data) => {
      $('#bar,#wfw').addClass('hide');
      let D = parseFloat(data);
      let SL_C = parseFloat(
        CARDS.eq(i)
          .find('.' + SL_I)
          .text()
      );
      I++;
      os_proc_t[SS] = { S: I, E: CARDS.length };
      if (TYPE == 'COMPARE') {
        //console.log(D)
        if (D == '0' || D == '0.00' || D == '' || isNaN(D)) {
          CARDS.eq(i).remove();
        } else {
          //console.log(D,"#",SL_C)
          if (D >= SL_C) {
            CARDS.eq(i)
              .find('.' + SL_I)
              .text(SL_C)
              .attr('t', SL_C);
          } else if (D < SL_C) {
            CARDS.eq(i)
              .find('.' + SL_I)
              .text(D)
              .attr('t', D);
          }
        }
      } else {
        CARDS.eq(i)
          .find('.' + SL_I)
          .text(D)
          .attr('t', D);
      }
    });
  }
}

function set_swift(type, left, top) {
  let swift = $('#swift');
  if (type == 'move') {
    swift.find('.os_content').addClass('hide');
    swift.addClass('swift_move');
    swift.removeClass('hide');
    swift.css('left', `${left}%`).css('top', `${top}%`); //.offset({ left: left, top: top });
    /*
        let h = $("body").height() - top;
        swift.height(h);
        let table=swift.find(".HMGL").not(".hide").first();
        let table_h = h - table.find(".HEADER").height() - table.find(".BOTTOM_NAV").height() - table.find(".OS_HEADER").height();
        swift.find(".HMGL").find(".os_table_content").height(table_h);
        */
  } else if (type == 'close') {
    swift.addClass('hide');
    swift.removeClass('SWIFT_MOVE');
    swift.find('.HMGL').addClass('hide');
  }
}

function new_os_table(
  where,
  title,
  ss,
  table_cols_len,
  table_head_json,
  tt,
  table_type
) {
  //console.log(ss)
  //os_table[ss] = JSON.parse(localStorage.getItem("os_table"));

  os_table[ss] = JSON.parse(JSON.stringify(os_table_json));
  if (table_head_json != null) {
    os_table[ss].headers = table_head_json;
  } else {
    os_cols_width[ss] = [];
    let a = [];

    for (let i = 0; i < table_cols_len; i++) {
      let h = JSON.parse(JSON.stringify(os_table_header_json));
      if (i == 0) {
        h.t = '序';
        h.width = 55;
        os_cols_width[ss].push(55);
      } else if (i == 1) {
        h.t = 'id';
        h.hide = 'hide';
      } else if (i == 2) {
        h.t = 'n';
        h.hide = 'hide';
      } else if (i == 3) {
        h.t = 'color';
        h.hide = 'hide';
      } else {
        h.t = i;
        h.width = 100;
        os_cols_width[ss].push(100);
      }

      a.push(h);
    }
    //console.log(a)

    os_table[ss].headers = a;
  }
  xiaojun_db.getItem('os_cols_width').then((res) => {
    if (res != null) {
      if (res[ss] != null) {
        os_cols_width[ss] = res[ss];
      } else {
        os_cols_width[ss] = [];
        for (let i = 0; i < os_table[ss].headers.length; i++) {
          os_cols_width[ss].push(os_table[ss].headers[i].width);
        }
      }
      xiaojun_db.setItem('os_cols_width', os_cols_width);
    } else {
      os_cols_width[ss] = [];
      for (let i = 0; i < os_table[ss].headers.length; i++) {
        os_cols_width[ss].push(os_table[ss].headers[i].width);
      }
    }
    xiaojun_db.setItem('os_cols_width', os_cols_width);
  });

  if (where == 'body') {
    $('body').append(new_table(title, ss, tt, table_type));
  } else {
    $('#' + where).append(new_table(title, ss, tt, table_type));
  }
  $(`#${ss} .reflush_table_body`).on('scroll', function () {
    let self = $(this);
    $(`#${ss} .reflush_table_header`).scrollLeft(self.scrollLeft());
    reset_editor();
  });
}

function new_table(title, ss, tt_f, table_type) {
  let tt = tt_f;
  if (tt_f == null || tt_f == '') {
    tt = '';
  }
  let tree_setting = '',
    table_setting = '',
    tree_class = '';
  //console.log(table_type)
  if (table_type == 'tree') {
    tree_setting = 'position: relative; width: 19%; min-width: 190px;';
    table_setting = 'position: relative; width: 80%;';
    tree_class = 'tree_view';
  }
  let table = `
    <section id='${ss}' class='HMGL os_content os_content_css ${tree_class}  hide' style='position:absolute;top:40px;'>
        <div id='${ss}_header' class='content_header float_left'>
            <div id='${ss}_CRTL' class='_100'>
                <div class='float_left'>
                    <text id='${ss}_title' class='head_title'>${title}</text>
                    <text id='${ss}_subtitle' class='head_subtitle'></text>
                    <text id='${ss}_status' class='head_status'></text>
                </div>
                <div title='展开' class="MORE UNFOLD ICON hide float_right"></div>
                <div title='收藏' class="LESS UNFOLD ICON hide float_right"></div>
                <div id='${ss}table_toggle_on' class='HOVER hide float_left' title='切换'><span class='float_left'>切换</span><div class='toggle_on_icon icon_20 clear ML5'></div></div>
                <div id='${ss}table_toggle_off' class='HOVER float_left hide' title='切换'><span class='float_left'>切换</span><div class='toggle_off_icon icon_20 clear ML5'></div></div>
            </div>
            <div id="${ss}_tt" class='content_header_tt'>${tt}</div>
        </div>
        <div id='${ss}_tree' class='tree_view overflow_94 float_left' style='${tree_setting}'></div>
        <div id='${ss}_content' class='os_table_content float_left' style='${table_setting}' >
            <div id='${ss}_table_chart' class='' style=''></div>
            <div id='${ss}_table_header' class='os_table_tt reflush_table_header' style='overflow-x:hidden;'></div>
            <div id='${ss}_table_body' class='os_table_tt overflow_94 reflush_table_body' ></div>
            <div id='${ss}_table_nav' class='os_table_tt' style='overflow-x:hidden;'></div>
        </div>
    </section>`;
  return table;
}

function new_row(
  new_row_type,
  ss,
  td_data,
  strat_index,
  tr_id,
  tr_class,
  td_color
) {
  let headers = os_table[ss].headers;
  //console.log(headers)
  //console.log(os_table[ss])
  let tr_content = '';
  tr_content += `<tr id='${tr_id}' class='${tr_class}' >`;
  if (new_row_type == 'new') {
    for (let j = 0; j < headers.length; j++) {
      let cols_d = td_data[j];
      let td_width = os_cols_width[ss][j];
      if (os_cols_width[ss][j] == null) {
        td_width = headers[j].width;
      }
      if (headers[j].t == '序') {
        tr_content += `<td class='os_tr_th CS_I break_css TD_I_COLOR disabled for_resize' style='width:${td_width}px;' data-text='' ></td>`;
      } else if (headers[j].format == 'SELECTOR') {
        let d = headers[j].selector_data;
        let index = parseFloat(cols_d) - 1;
        let d_t = d[index] || '';
        let T = `<select class='OS_TABLE_SELECTOR'>`;
        T += `<option value='${cols_d}'>${d_t}</option>`;
        for (let i = 0; i < d.length; i++) {
          let I = i + 1;
          T += `<option value='${I}'>${d[i]}</option>`;
        }
        T += `</select>`;
        tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color}  ${td_color}' style='width:${td_width}px;' tabindex='0' data-text=''>${T}</td>`;
      } else {
        let afs = '';
        if (headers[j].afs != null) {
          afs = 'afs=' + headers[j].afs;
        }

        tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color}  ${td_color}' ${afs}  style='width:${td_width}px;' tabindex='0' data-text=''></td>`;
      }
    }
  } else if (new_row_type == 'add') {
    let I = strat_index + 1;
    let cols = td_data.split('||');
    for (let i = 0; i < cols.length; i++) {
      tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color}  ${td_color}' style='width:${os_cols_width[ss][j]}px;' tabindex='i' data-text='${cols[i]}'>${cols[i]}</td>`;
    }
  } else {
    let I = strat_index + 1;
    for (let j = 0; j < headers.length; j++) {
      let td_width = os_cols_width[ss][j];
      if (os_cols_width[ss][j] == null) {
        td_width = headers[j].width;
      }
      if (td_data[j] != null) {
        let dis_td_t = '';
        let cols_d = td_data[j];
        if (cols_d.length > headers[j].LEN) {
          dis_td_t = cols_d.substring(0, headers[j].LEN) + '...';
        } else {
          dis_td_t = cols_d;
        }
        let icon = '';
        if (headers[j].icon != null) {
          icon = `<div class='td_info HOVER hide' title='明细' ><div class='info_icon icon_20 '></div></div>`;
        }

        if (headers[j].t == '序') {
          if (new_row_type == 'NO_ID') {
            tr_content += `<td class='for_resize os_tr_th CS_I break_css TD_I_COLOR disabled ' style='width:${td_width}px;' I='${cols_d}' data-text='' >${I}</td>`;
          } else {
            tr_content += `<td class='for_resize os_tr_th CS_I break_css TD_I_COLOR disabled ' style='width:${td_width}px;' I='${cols_d}' data-text='${cols_d}' >${I}</td>`;
          }
        } else if (headers[j].format == 'not0') {
          let t = '';
          if (cols_d != '0') {
            t = cols_d;
          }
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text='${t}'>${t}${icon}</td>`;
        } else if (headers[j].format == 'currency') {
          let fm_num = format_num(parseFloat(cols_d).toFixed(2));
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text='${cols_d}'>${fm_num}${icon}</td>`;
        } else if (headers[j].format == 'num') {
          let num = parseFloat(cols_d).toFixed(2);
          if (isNaN(parseFloat(cols_d))) {
            num = '';
          }
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text='${cols_d}'>${num}${icon}</td>`;
        } else if (headers[j].format == 'date') {
          let date = cols_d.split(' ')[0].replace(/\//g, '-');
          let d = '';
          if (date != '1900-1-1') {
            d = date;
          }
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text='${d}'>${d}${icon}</td>`;
        } else if (headers[j].format == 'selector') {
          let d = headers[j].selector_data;
          let index = parseFloat(cols_d) - 1;
          let d_t = d[index] || '';
          let select = `<select class='OS_TABLE_SELECTOR'>`;
          select += `<option value='${cols_d}'>${d_t}</option>`;
          for (let i = 0; i < d.length; i++) {
            let I = i + 1;
            select += `<option value='${I}'>${d[i]}</option>`;
          }
          select += `</select>`;
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text='${cols_d}'>${select}${icon}</td>`;
        } else if (
          $.trim(cols_d) == '1900/01/01' ||
          $.trim(cols_d) == '1900-01-01' ||
          $.trim(cols_d) == '9998/12/31 0:00:00'
        ) {
          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text=''>${icon}</td>`;
        } else {
          let afs = '';
          if (headers[j].afs != null) {
            afs = 'afs=' + headers[j].afs;
          }

          tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' ${afs}  data-text='${cols_d}'>${dis_td_t}${icon}</td>`;
        }
      } else {
        tr_content += `<td class='break_css for_resize ${headers[j].disa} ${headers[j].hide} ${headers[j].color} ${td_color}' style='width:${td_width}px;' tabindex='0' data-text=''></td>`;
      }
    }
  }
  if (ss.length > 0) {
    if (os_table[ss].add_cols.length > 0) {
      let add_c = os_table[ss].add_cols;
      for (let j = 0; j < add_c.length; j++) {
        if (add_c[j].type == 'button') {
          tr_content += `<td style='width:${add_c[j].width}px;' class='break_css for_resize ${add_c[j].class}'  tabindex='0' >${add_c[j].data}</td>`;
        } else if (add_c[j].type == 'text') {
          tr_content += `<td style='width:${add_c[j].width}px;' class='break_css for_resize ${add_c[j].class}'  tabindex='0' data-text='${add_c[j].text}'>${add_c[j].text}</td>`;
        }
      }
    }
  }
  tr_content += '</tr>';

  return tr_content;
}


function OS_WHEEL(EVENT) {
  /*
    if ($("#os_search").val().length > 0) { } else {
        let SS = $('.CONTENT_FOCUS').attr("id");
        let WHEEL = EVENT.deltaY / 100;
        let TOP = WHEEL + OS_TOP;
        let BOTTOM = WHEEL + 100 + OS_TOP;
        if (TOP < 0) {
            OS_TOP = 0;
        } else {
            OS_TOP = TOP;
            OS_BOTTOM = BOTTOM;
        }
        REFLUSH(SS);
    }
    */
  //console.log(OS_LAST_DATA)
}
/* GC END */

function load_ajax(select, from) {
  return new Promise((reslove) => {
    //console.log($("#os_ss").val())
    let cs = JSON.stringify(os_cs);
    if (os_cs == '') {
      cs = null;
    }
    $('#bar').removeClass('hide');
    post_func = $.ajax({
      type: 'post',
      url: os_url,
      data: {
        dir: os_dir,
        select: select,
        from: from,
        cs: cs,
        fp: os_fp
      },
      //dataType: 'json',
      async: true
    })
      .done((res) => {
        let r = res
          .trim()
          .replace(/[0-9]""/g, '[0-9]"')
          .replace(/ /g, ' ')
          .replace(/\t/g, ' ')
          .replace(/\r/g, '')
          .replace(/\n/g, '')
          .replace(/\\/g, '/')
          .replace(/\"\[\[/g, '[[')
          .replace(/\]\]\"/g, ']]')
          .replace(/\"\{/g, '{')
          .replace(/\}\"/g, '}');
        //console.log(r)
        os_table_data[from] = [];
        try {
          //console.log("1")
          os_table_data[from] = JSON.parse(r.trim());
        } catch (error) {
          //console.log("2")
          //console.log(JSON.parse(r.trim()))
          if (r.trim() == '') {
            //console.log("2=1")
            os_table_data[from] = [];
          } else {
            //console.log("2=2")
            os_table_data[from] = r.trim();
          }
        }
        after_save(from);
        $('#bar').addClass('hide');
        reslove(res);
        //console.log(os_table_data[from])
      })
      .fail((err) => {
        $('#' + from).addClass('hide');
        afl_func(JSON.stringify(err));
        console.error(err);
      });
  });
}
function select(select, from) {
  return new Promise((r) => {
    $(`#${from}_subtitle`).text($('#' + from).attr('ttid'));
    if (os_cs.jd != null) {
      $('#' + from).attr('jd', JSON.stringify(os_cs.jd));
    }
    os_cs.ss = $('#os_ss').val();
    os_cs.ssyf = $('#os_sssg').val();
    os_cs.select = select;
    before_load(os_hide, os_show);
    load_ajax(select, 'wap_select').then((res) => {
      os_table_data[from] = os_table_data['wap_select'].slice();

      reflush_table(from);
      table_histroy.splice(table_histroy.length - 1, 1, from);
      let set = [...new Set(table_histroy)];
      table_histroy = set;
      trs_edited_index[from] = [];
      content_focus = from;
      r(res);
    });
  });
}

function select1(select, from) {
  return new Promise((r) => {
    $(`#${from}_subtitle`).text($('#os_ss').val());
    os_cs.ss = $('#os_ss').val();
    os_cs.ssyf = $('#os_sssg').val();
    os_cs.select = select;
    os_cs.top = os_top;
    os_cs.bottom = os_bottom;

    load_ajax(select, from).then((res) => {
      reflush_table(from);
      table_histroy.splice(table_histroy.length - 1, 1, from);
      let set = [...new Set(table_histroy)];
      table_histroy = set;
      trs_edited_index[from] = [];
      content_focus = from;
      before_load(os_hide, os_show);
      r(res);
      console.log(from);
    });
  });
}

function select2(select, from, where) {
  return new Promise((r) => {
    $(`#${from}_subtitle`).text($('#os_ss').val());
    os_cs.ss = $('#os_ss').val();
    os_cs.ssyf = $('#os_sssg').val();
    os_cs.select = select;
    os_cs.top = os_top;
    os_cs.bottom = os_bottom;

    load_ajax(select, from).then((res) => {
      os_table_data[where] = os_table_data[from].slice();

      reflush_table(where);
      table_histroy.splice(table_histroy.length - 1, 1, where);
      let set = [...new Set(table_histroy)];
      table_histroy = set;
      trs_edited_index[where] = [];
      content_focus = where;
      before_load(os_hide, os_show);
      r(res);
      console.log(os_table_data[where]);
      console.log(from);
    });
  });
}

function drawChart(chart_type, title, chart_data, where) {
  let a = chart_data;
  let u = [];
  for (let i = 0; i < a.length; i++) {
    u[i] = [];
    if (i > 0) {
      for (let j = 4; j < a[i].length; j++) {
        let v = parseFloat(a[i][j]) ? parseFloat(a[i][j]) : 0;

        u[i].push(v);
      }
      u[i].push(u[i][u[i].length - 1]);
    } else {
      for (let j = 0; j < a[i].length; j++) {
        u[i].push(a[i][j]);
      }
    }
  }
  console.log(u);
  let data = google.visualization.arrayToDataTable(u);
  let options = {
    role: 'annotation',
    title: title,
    curveType: 'function',
    //legend: { position: 'bottom' },
    tooltip: { trigger: 'selection' },
    width: 1024,
    height: 500,
    series: {
      0: { color: '#009688' },
      1: { color: '#3F51B5' },
      2: { color: '#FF9800' },
      3: { color: '#795548' },
      4: { color: '#607D8B' },
      5: { color: '#F44336' },
      6: { color: '#F44336' },
      7: { color: '#F44336' },
      8: { color: '#F44336' },
      9: { color: '#F44336' },
      10: { color: '#F44336' }
    }
  };
  let chart;
  if (chart_type == 'LINE') {
    chart = new google.visualization.LineChart(document.getElementById(where));
  } else if (chart_type == 'BAR') {
    chart = new google.visualization.BarChart(document.getElementById(where));
  } else if (chart_type == 'PIE') {
    chart = new google.visualization.PieChart(document.getElementById(where));
  } else if (chart_type == 'COL') {
    chart = new google.visualization.ColumnChart(
      document.getElementById(where)
    );
  }
  console.log(data);
  chart.draw(data, options);
  /*
    if (CHART_TYPE == "COL") {
        let view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: getValueAt.bind(undefined, 1),
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);

        chart.draw(view, options);
    } else {
        chart.draw(data, options);

    }
    */
  google.visualization.events.addListener(chart, 'select', selectHandler);

  function selectHandler() {
    var selection = chart.getSelection();
    var message = '';
    for (var i = 0; i < selection.length; i++) {
      var item = selection[i];
      if (item.row != null && item.column != null) {
        console.log('1');
        var str = data.getFormattedValue(item.row, item.column);
        message +=
          '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
      } else if (item.row != null) {
        console.log('2');
        var str = data.getFormattedValue(item.row, 0);
        message +=
          '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
      } else if (item.column != null) {
        console.log('3');
        var str = data.getFormattedValue(0, item.column);
        message +=
          '{row:none, column:' +
          item.column +
          '}; value (row 0) = ' +
          str +
          '\n';
      }
    }
    if (message == '') {
      console.log('4');
      message = 'nothing';
    }
    //ALERT_FOR_LIST('You selected ' + message);
    let VAL = 0,
      COL = '',
      ROW = '';
    if (chart_data[item.row + 1][item.column] != null) {
      VAL = chart_data[item.row + 1][item.column];
    }
    if (chart_data[0][item.column != null]) {
      COL = chart_data[0][item.column];
    }
    if (chart_data[item.row + 1][0] != null) {
      ROW = chart_data[item.row + 1][0];
    }

    OS_CHART_DATA = [ROW, COL, VAL];
    //console.log(OS_CHART_DATA)
    //console.log(WHERE)
    //console.log(CHART_DATA[item.row + 1][item.column]) //值
    //console.log(CHART_DATA[item.row + 1][0])//行
    //console.log(CHART_DATA[0][item.column]) //抬头
  }

  function getValueAt(column, dataTable, row) {
    return dataTable.getFormattedValue(row, column);
  }
}
function swift(select, from) {
  return new Promise((r) => {
    if (os_cs.jd != null) {
      $('#' + from).attr('jd', JSON.stringify(os_cs.jd));
    }
    $('.swift_focus').removeClass('swift_focus');
    console.log(content_focus);
    //$("#" + content_focus).addClass("swift_focus");

    load_ajax(select, 'wap_select').then((res) => {
      $('#swift').removeClass('hide');
      $('#' + from).removeClass('hide');
      os_table_data[from] = os_table_data['wap_select'];
      reflush_table(from);
      //table_histroy.splice(table_histroy.length - 1, 1, from);
      //let set = [...new Set(table_histroy)];
      //table_histroy = set;
      trs_edited_index[from] = [];
      $('#' + from).css('top', 0);
      r(res);
    });
  });
}

function swift1(select, from) {
  return new Promise((r) => {
    if (os_cs.jd != null) {
      $('#' + content_focus).attr('jd', JSON.stringify(os_cs.jd));
    }
    $('.swift_focus').removeClass('swift_focus');
    //$("#" + content_focus).addClass("swift_focus");

    load_ajax(select, from).then((res) => {
      $('#swift').removeClass('hide');
      $('#' + from).removeClass('hide');
      reflush_table(from);
      //table_histroy.splice(table_histroy.length - 1, 1, from);
      //let set = [...new Set(table_histroy)];
      //table_histroy = set;
      trs_edited_index[from] = [];
      $('#' + from).css('top', 0);
      r(res);
    });
  });
}

function swift_from_data(select, from) {
  return new Promise((r) => {
    console.log(content_focus);
    setTimeout(() => {
      if (os_cs.jd != null) {
        $('#' + content_focus).attr('jd', JSON.stringify(os_cs.jd));
      }
      $('.swift_focus').removeClass('swift_focus');
      $('#' + content_focus).addClass('swift_focus');
      $('#swift').attr('current', from);

      $('#swift').removeClass('hide');
      $('#' + from).removeClass('hide');
      reflush_table(from);

      trs_edited_index[from] = [];
      $('#' + from).css('top', 0);
      r('OK');
    }, 100);
  });
}
function card(select, from, card_icon) {
  return new Promise((r) => {
    $(`#${from}_subtitle`).text($('#os_ss').val());
    os_cs.ss = $('#os_ss').val();
    os_cs.ssyf = $('#os_sssg').val();
    os_cs.select = select;
    os_cs.top = os_top;
    os_cs.bottom = os_bottom;

    load_ajax(select, from).then((res) => {
      $(`#${from}_content`)
        .empty()
        .append(
          new_card(
            encode_card_array_from_array(os_card_key, os_table_data[from]),
            'card',
            card_icon,
            90
          )
        );
      table_histroy.splice(table_histroy.length - 1, 1, from);
      let set = [...new Set(table_histroy)];
      table_histroy = set;
      content_focus = from;
      before_load(os_hide, os_show);
      r(res);
    });
  });
}

function save_ajax(select, from, type) {
  return new Promise((r) => {
    //console.log(table_histroy)
    let trs_set = [...new Set(trs_edited_index[content_focus])];
    //console.log(trs_set)
    if (trs_set.length > 0 || for_save.del.length > 0) {
      let a = [];
      let o = [];
      for (let i = 0; i < trs_set.length; i++) {
        let a1 = os_table_data[content_focus][trs_set[i]];
        if (a1 != null) {
          let u = {};
          for (j = 0; j < a1.length; j++) {
            u[j] = a1[j];
          }
          a.push(u);
          if (type == 'compare') {
            let g = {};
            for (
              let j = 0;
              j < data_ver[content_focus][0][trs_set[i]].length;
              j++
            ) {
              g[j] = data_ver[content_focus][0][trs_set[i]][j];
            }
            o.push(g);
          }
        }
      }

      os_cs.select = select;
      os_cs.ssyf = $('#os_sssg').val();
      os_cs.ss = $('#os_ss').val();
      os_cs.data = a;
      os_cs.len = a.length;
      os_cs.user = $('#nickname').text();
      if (for_save.del != null) {
        os_cs.del = for_save.del;
        os_cs.del_len = for_save.del.length;
      }

      os_cs.o_val = o;
      os_cs.fp = os_fp;

      load_ajax(select, from).then((res) => {
        after_save(content_focus);
        r(res);
      });
    } else {
      afl_func('没有修改', '', 1000);
    }
  });
}
function load_table_ajax(path, from, cs, where, type_f, style, menu_type) {
  let this_content = $('#' + content_focus).attr('id');
  let current = this_content.find('.td_selected'),
    this_tr = current.closest('tr');
  let current_index = current.index() || 0,
    this_tr_index = this_tr.index() || 0;

  $('.td_selected').removeClass('td_selected');
  $('#bar').removeClass('hide');
  if ($.trim(path).length > 0) {
    let ST = $(`#${from}_content`).scrollTop();
    post_func = $.ajax({
      type: 'post',
      url: path,
      data: {
        FROM: from,
        CS: cs
      },
      //dataType: 'json',
      async: true
    })
      .done((data) => {
        os_data = '';
        os_data = $.trim(data);

        $('#OS_TEMP').text(data);
        let ss = from;
        os_table_data[from] = encode_table_array_from_text(os_data);
        os_card_data[from] = encode_table_array_from_text(os_data);
        if (where != '') {
          ss = $('#' + where)
            .closest('.os_content')
            .attr('id');
          os_table_data[ss] = encode_table_array_from_text(os_data);
          os_card_data[ss] = encode_table_array_from_text(os_data);
        }
        if (where != '') {
          //console.log(os_card_data)
          if (style == 'card' || style == 'item') {
            reflush_card(style, os_card_data[ss], where, menu_type);
            after_save(from);
            $('#' + from).removeClass('hide');
          } else {
            if (type_f == 'TEXT') {
              console.log(1);

              REFLUSH(ss);
              after_save(ss);
              $('#' + ss).removeClass('hide');
              APPEND_TABLE_LIST(ss);
            } else if (type_f == 'ENCRYPT') {
              let DATA = $.trim(data);
              localStorage.setItem(from, DATA);
              afl_func('数据已经保存成功');
            } else if (type_f == 'DECRYPT') {
              if ($.trim(from).length > 0) {
                REFLUSH(from);
                after_save(from);
                $('#' + from).removeClass('hide');
                APPEND_TABLE_LIST(from);
              }
            } else {
              REFLUSH(from);
              after_save(from);
              $('#' + from).removeClass('hide');
              APPEND_TABLE_LIST(from);
            }
          }
        }
        $('#os_last_query').val(from);
        $('#bar').addClass('hide');
        $(`#${from}_content`).scrollTop(ST);
      })
      .fail((D) => {
        afl_func(from + '加载失败~' + JSON.stringify(D));
        $('#bar').addClass('hide');
      });
  } else {
    os_data = '';
    os_data = from;
    os_table_data[where] = encode_table_array_from_text(os_data);
    //OS_LAST_DATA[WHERE] = OS_DATA;
    if (style == 'card') {
      reflush_card(where);
    } else {
      REFLUSH(where);
    }
    after_save(where);

    $('#bar').addClass('hide');
    if (current_index > -1) {
      $('.CONTENT_FOCUS')
        .find('.tr_list')
        .eq(this_tr_index)
        .find('td')
        .eq(current_index)
        .focus();
    }
    $('#' + where).removeClass('hide');
    APPEND_TABLE_LIST(where);
  }
}

function WAIT(SS, FUNC, TIME, TYPE, VAL) {
  let TIME_OUT = setInterval(function () {
    if (TYPE == 'TEXT') {
      if (os_proc_t == VAL) {
        window.clearInterval(TIME_OUT);
        FUNC();
      }
    } else if (TYPE == 'COMPARE') {
      if (os_proc[SS] != null) {
        if (os_proc[SS].S == os_proc[SS].E) {
          window.clearInterval(TIME_OUT);
          FUNC();
        }
      }
    }
  }, TIME);
}
function ENCODE_ARRAY_FROM_CARDS(CARDS) {
  let ARRAY = [];
  for (let i = 0; i < CARDS.length; i++) {
    let CTS = CARDS.eq(i).find('.card_t');
    let A = [];
    for (let j = 0; j < CTS.length; j++) {
      A.push(CTS.eq(j).text());
    }
    ARRAY.push(A);
  }
  return ARRAY;
}
function encode_array_from_text(text) {
  let s = text.split('/n');
  let arr = [];
  if (s.length > 1) {
    for (let i = 0; i < s.length; i++) {
      let a = [];
      let c = s.split('/t');
      for (let j = 0; j < c.length; j++) {
        a.push(c[j]);
      }
      arr.push(a);
    }
    return arr;
  } else {
    let c = s[0].split('/t');
    for (let j = 0; j < c.length; j++) {
      arr.push(c[j]);
    }
    return arr;
  }
}
function encode_table_array_from_text(DATA) {
  let ROWS = DATA.split('$$');
  let ARRAY = [];
  for (let i = 0; i < ROWS.length; i++) {
    let COLS = ROWS[i].split('||');
    let A = [];
    for (let j = 0; j < COLS.length; j++) {
      A.push(COLS[j]);
    }
    ARRAY.push(A);
  }
  return ARRAY;
}


function encode_card_data_from_cards(CARDS) {
  let A = [];
  for (let i = 0; i < CARDS.length; i++) {
    let CTS = CARDS.eq(i).find('.card_t');
    let U = {};
    for (let j = 0; j < CTS.length; j++) {
      U[j] = CTS.eq(j).text();
    }
    U['I'] = CARDS.eq(i).attr('tabindex');
    U[7] = CARDS.eq(i).attr('kt7') || '';
    U[8] = CARDS.eq(i).attr('kt8') || '';
    U[9] = CARDS.eq(i).attr('kt9') || '';
    U[10] = CARDS.eq(i).attr('kt10') || '';
    U[11] = CARDS.eq(i).attr('kt11') || '';
    U[12] = CARDS.eq(i).attr('kt12') || '';
    U[13] = CARDS.eq(i).attr('kt13') || '';
    U[14] = CARDS.eq(i).attr('kt14') || '';
    U[15] = CARDS.eq(i).attr('kt15') || '';
    A.push(U);
  }
  return A;
}

function APPEND_TABLE_LIST(WHERE) {
  let TABLE_LIST = $('#TABLE_LIST');
  TABLE_LIST.find('.TABLES').remove();
  let TABLE_HISTROY_SET = [...new Set(table_histroy)];
  let T = '';
  for (let i = 0; i < TABLE_HISTROY_SET.length; i++) {
    T +=
      "<div class='float_left TABLES " +
      TABLE_HISTROY_SET[i] +
      "' style='padding:0px 10px;'>" +
      TABLE_HISTROY_SET[i] +
      '</div>';
  }
  TABLE_LIST.append(T);
  TABLE_LIST.find('.' + WHERE).addClass('BLUE');
}

/*
function save_table(PATH, FROM, CS, KEY_FOR_UPDATE_F, WHERE, TYPE, COMPARE) {
    let THIS_CONTENT = $(".CONTENT_FOCUS");
    let TYPE_ARRAY = TYPE.split("$$");
    let TRS = THIS_CONTENT.find("." + TYPE_ARRAY[1]);
    let COMPARE_ARRAY = COMPARE.split("$$");
    let input_edited = THIS_CONTENT.find(".input_edited");
    console.log("0")
    if ($.trim(WHERE).length > 0) {
        let HEADERS = os_table[WHERE].headers;
        console.log("1")
        if (trs_edited_index[WHERE] != null || os_del_id.length > 0 || TRS.length > 0 || input_edited.length > 0) {
            console.log("1=>1")
            let UPDATE, BEFORE, COMPARE_UPDATE;
            UPDATE = GET_DATA_FROM_TRS(WHERE, os_table_data[WHERE], KEY_FOR_UPDATE_F, TYPE_ARRAY[0]);
            $("#bar,#wfs").removeClass("hide");

            if (COMPARE_ARRAY[0] == "BEFORE") {
                console.log("1=>1=>3")
                let O_TT = $(`#${WHERE}_title`).attr("o_data");
                BEFORE = GET_DATA_FROM_TRS(WHERE, data_ver[WHERE][0], KEY_FOR_UPDATE_F, "TEXT");
                post_func = $.post(PATH, {//"OS/AJAX/H_SAVE"
                    FROM: FROM,
                    T: UPDATE,
                    C: UPDATE.length,
                    O_MS: BEFORE,
                    O_MS_C: BEFORE.length,
                    DEL: os_del_id,
                    DEL_C: os_del_id.length,
                    "O_TT": O_TT,

                    CS: CS,
                    H_L: HEADERS.length,
                    SSYF: $("#os_sssg").val(),
                    TYPE: $("#OS_SSLY_SELECTOR").val(),
                    TTID: $("#os_ttid").val(),
                    ss: $("#os_search_ss").val(),
                });
            } else if (COMPARE_ARRAY[0] == "NONE") {
                console.log("1=>1=>4")
                post_func = $.post(PATH, {//"OS/AJAX/H_SAVE"
                    FROM: FROM,
                    T: UPDATE,
                    C: UPDATE.length,
                    DEL: os_del_id,
                    DEL_C: os_del_id.length,

                    CS: CS,
                    H_L: HEADERS.length,
                    SSYF: $("#os_sssg").val(),
                    TYPE: $("#OS_SSLY_SELECTOR").val(),
                    TTID: $("#os_ttid").val(),
                    ss: $("#os_search_ss").val(),
                });
            } else {
                console.log("1=>1=>5")
                if (COMPARE_ARRAY[2] == "TEXT") {
                    console.log("1=>1=>5=>1")
                    COMPARE_UPDATE = GET_DATA_FROM_TRS(WHERE, os_table_data[COMPARE_ARRAY[0]], os_table[COMPARE_ARRAY[0]].KEY_FOR_UPDATE, COMPARE_ARRAY[2]);

                } else if (COMPARE_ARRAY[2] == "TRS") {
                    console.log("1=>1=>5=>2")
                    let TRS1 = $("#" + COMPARE_ARRAY[0]).find("." + COMPARE_ARRAY[1]);
                    COMPARE_UPDATE = GET_DATA_FROM_TRS(WHERE, TRS1, os_table[COMPARE_ARRAY[0]].KEY_FOR_UPDATE, COMPARE_ARRAY[2]);
                }
                post_func = $.post(PATH, {//"OS/AJAX/H_SAVE"
                    FROM: FROM,
                    T: UPDATE,
                    C: UPDATE.length,
                    T1: COMPARE_UPDATE,
                    T1_C: COMPARE_UPDATE.length,
                    DEL: os_del_id,
                    DEL_C: os_del_id.length,

                    CS: CS,
                    H_L: HEADERS.length,
                    SSYF: $("#os_sssg").val(),
                    TYPE: $("#OS_SSLY_SELECTOR").val(),
                    TTID: $("#os_ttid").val(),
                    ss: $("#os_search_ss").val(),
                });
            }
            post_func.done((data) => {
                afl_func("数据已经保存成功")
                setTimeout(function () { $("#afl").remove() }, 600);
                after_save(WHERE);
                $("#bar,#wfs").addClass("hide");
                reset_editor();

            }).fail((jqXHR, textStatus) => {
                $("#afl").remove();
                afl_func(WHERE + "保存失败~" + JSON.stringify(jqXHR));
                setTimeout(() => {
                    $("#afl").remove();
                }, 1000);
                $("#bar,#wfs").addClass("hide");
            });

        } else {
            console.log("1=>2")
            afl_func("没有数据修改");
        }
    } else {
        if (TYPE_ARRAY[0] == "LOCALSTORAGE") {

            let TRS1 = THIS_CONTENT.find(".tr_list");
            let DATA = ENCODE_DATA_FROM_TABLE(TRS1)
            load_table_ajax("OS/AJAX/ENCRYPT", "LOCALSTORAGE", { "DATA": DATA, "PD": "ENCRYPT" }, CS, "ENCRYPT");

            setTimeout(function () { $("#afl").remove() }, 600);
        } else {

            post_func = $.post(PATH, {
                FROM: FROM,
                CS: CS,
                SSYF: $("#os_sssg").val(),
                TYPE: $("#OS_SSLY_SELECTOR").val(),
                TTID: $("#os_ttid").val(),
                ss: $("#os_search_ss").val(),
            }).done((data) => {
                afl_func("数据已经保存成功");
                setTimeout(function () { $("#afl").remove() }, 600);
                //AFTER_SAVE(WHERE);
                $("#bar,#wfs").addClass("hide");
                reset_editor();


            }).fail((jqXHR, textStatus) => {
                afl_func(WHERE + "保存失败~" + JSON.stringify(jqXHR));
                setTimeout(() => {
                    $("#afl").remove();
                }, 1000);
                $("#bar,#wfs").addClass("hide");
            });
        }

    }

}
*/
function LOAD_MAP() {
  let TRS = $('#JYYMSY_SSDK').find('.tr_list');
  //console.log(TRS.length)

  $.get('/Scripts/mapCanvas/libs/chinamap.json', function (data) {
    MAP = $('#MAP').mapCanvas(data, {
      zoom: 1.3,
      fontFamily: '"Microsoft YaHei"',
      showText: true,
      bubble: function (area) {
        let T = '';
        for (let i = 0; i < TRS.length; i++) {
          let TDS = TRS.eq(i).find('td').eq(1).text();
          let TDS_GA = TRS.eq(i).find('td').eq(2).text();
          let TDS_GA1 = TRS.eq(i).find('td').eq(3).text();
          let TDS_GA2 = TRS.eq(i).find('td').eq(4).text();

          if (TDS.indexOf(area.name) > -1) {
            T =
              area.name +
              '<BR/>前年' +
              TDS_GA +
              '<BR/>去年' +
              TDS_GA1 +
              '<BR/>今年' +
              TDS_GA2;
          }
        }
        return T;
        //return area.name
      }
      /*
           onAreaClick: function (area) {
               $.each(area), function (A) {
                   A.setFillColor();
               }
               var me = this;
               if (!me.data('hilight')) {
                   me.setFillColor('#BCF');
                   me.data('hilight', true);
               }
               else {
                   me.setFillColor();
                   me.data('hilight', false);
               }
           }
            */
    });

    let HOT_COLOR = {
      0: ['#004D40', '#E0F2F1'],
      1: ['#00695C', '#E0F2F1'],
      2: ['#00796B', '#E0F2F1'],
      3: ['#00897B', '#E0F2F1'],
      4: ['#009688', '#E0F2F1'],
      5: ['#26A69A', '#E0F2F1'],
      6: ['#4DB6AC', '#E0F2F1'],
      7: ['#80CBC4', '#E0F2F1'],
      8: ['#B2DFDB', '#E0F2F1'],
      9: ['#E0F2F1', '#E0F2F1'],

      10: ['#33691E', '#E0F2F1'],
      11: ['#558B2F', '#E0F2F1'],
      12: ['#689F38', '#E0F2F1'],
      13: ['#7CB342', '#E0F2F1'],
      14: ['#8BC34A', '#E0F2F1'],
      15: ['#9CCC65', '#E0F2F1'],
      16: ['#AED581', '#E0F2F1'],
      17: ['#C5E1A5', '#E0F2F1'],
      18: ['#DCEDC8', '#E0F2F1'],
      19: ['#F1F8E9', '#E0F2F1']
    };

    $.each($('#MAP').mapCanvas('areas'), function (i, area) {
      for (let i = 0; i < 20; i++) {
        let TDS = TRS.eq(i).find('td').eq(1).text();
        if (TDS.indexOf(area.name) > -1) {
          area.setFillColor(HOT_COLOR[i][0], HOT_COLOR[i][1]);
        }
      }
    });
  });
}

function update_last_data(TRS, TYPE, SS) {
  /*
    if ($.trim(SS).length == 0) {
        SS = $(".CONTENT_FOCUS").attr("id");
    }

    let HEADERS = os_table[SS].headers;
    //console.log(TRS)

    let page_top = parseFloat($(".page_top").text()) || 0;
    for (let i = 0; i < TRS.length; i++) {
        let TR_INDEX = TRS.eq(i).attr("tabindex");
        let DATA_INDEX = page_top + TRS.eq(i).index();

        if ($.trim(TR_INDEX).length > 0) {
            for (let j = 0; j < HEADERS.length; j++) {
                if (os_table_data[SS][TR_INDEX] == null) {
                    os_table_data[SS][TR_INDEX] = [];
                }
                os_table_data[SS][TR_INDEX][j] = TRS.eq(i).find("td").eq(j).attr("data-text");
            }
        } else {
            for (let j = 0; j < HEADERS.length; j++) {
                os_table_data[SS][DATA_INDEX][j] = TRS.eq(i).find("td").eq(j).attr("data-text");
            }
        }

       

        //console.log(TRS_EDITED_INDEX[SS])
    }
    data_ver[SS].push(os_table_data[SS])
    //console.log(OS_LAST_DATA[SS])
    */
}

function fc_ya_check(index, text) {
  let ss = $(`${content_focus}`).attr('id');
  //console.log(os_table[content_focus])
  if (os_table[content_focus].status != null) {
    if (os_table[content_focus].headers[index].check != null) {
      let check_name = os_table[content_focus].headers[index].check;
      for (let i = 0; i < fm_list[check_name].length; i++) {
        if (
          $.trim(fm_list[check_name][i][0]) == text &&
          $.trim(fm_list[check_name][i][0]).length > 0
        ) {
          $('#' + ss + '_status').empty().append(`
                    <tr>
                        <td>库存名称:</td>
                        <td >${fm_list[check_name][i][0]}</td>
                        <td>期末数量:</td>
                        <td >${fm_list[check_name][i][1]}</td>
                    </tr>
                    `);
        }
      }
    }
  }
}

function before_load(hide, show) {
  for (let i = 0; i < hide.length; i++) {
    if (typeof hide[i] == 'string') {
      $('#' + hide[i]).addClass('hide');
    } else if (typeof hide[i] == 'object') {
      for (let j = 0; j < hide[i].length; j++) {
        $('#' + hide[i][j]).addClass('hide');
      }
    }
  }
  for (let j = 0; j < show.length; j++) {
    $('#' + show[j]).removeClass('hide');
  }
}
function HEADER_HIDE(SS, HIDE, SHOW) {
  for (let i = 0; i < HIDE.length; i++) {
    os_table[SS].headers[HIDE[i]].H = 'hide';
  }
  for (let i = 0; i < SHOW.length; i++) {
    os_table[SS].headers[SHOW[i]].H = '';
  }
}

function empty_search_val() {
  $('#os_search_pd').val(''),
    $('#os_search_dh').val(''),
    $('#os_search_mc').val(''),
    $('#os_search_kwg').val(''),
    $('#os_search_bh').val(''),
    $('#os_search_wh').val(''),
    $('#os_search_sl').val(''),
    $('#os_search_jt').val(''),
    $('#os_search_lb').val(''),
    $('#os_search_val').val(''),
    $('#os_renew').val(''),
    $('#os_search_ss').val('');
}

function new_os_replace() {
  let ss = content_focus;
  let fx = `
    <select class='SEARCH_FX'>`;
  Object.keys(os.fx).forEach(function (key) {
    fx += `<option value='${os.fx[key]}'>${key}</option>`;
  });
  fx += `</select>`;

  let gwh = `
    <select class='SEARCH_GWH float_left'>`;
  Object.keys(os.gwhai).forEach(function (key) {
    gwh += `<option value='${os.gwhai[key]}'>${key}</option>`;
  });
  gwh += `</select>`;

  afc_func(
    `
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='SEARCH_'>
                        <div class='FLOAT CLEAR'>品号:${fx} <input type='text' id='AFC0' T='BH' class='LIST MT10'  /></div>
                        <div class='PLUS ICON CLEAR'></div>
                        <div class='cancel ICON'></div>
                        ${gwh}
                    </div>
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>品名:${fx}<input type='text' id='AFC3' T='MC' class='LIST MT10' /></div>
                    <div class='PLUS ICON CLEAR'></div>
                    <div class='cancel ICON'></div>
                    ${gwh}
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>规格:${fx}<input type='text' id='AFC4' T='KWG' class='LIST MT10' /></div>
                    <div class='PLUS ICON CLEAR'></div>
                    <div class='cancel ICON'></div>
                    ${gwh}
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>人员:${fx}<input type='text'  T='yy' class='LIST MT10' /></div>
                    <div class='PLUS ICON CLEAR'></div>
                    <div class='cancel ICON'></div>
                    ${gwh}
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>仓库:${fx}<input type='text'  T='CF' class='LIST MT10' /></div>
                    <div class='PLUS ICON CLEAR'></div>
                    <div class='cancel ICON'></div>
                    ${gwh}
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>单号:${fx}<input type='text' id='AFC2' T='DH' class='LIST MT10'  /></div>
                    <div class='PLUS ICON CLEAR'></div>
                    <div class='cancel ICON'></div>
                    ${gwh}
                </div>
            </div>
            <div class='SEARCH_TT'>
                <div class='SEARCH_LIST'>
                    <div class='FLOAT CLEAR'>数量:${fx}<input type='text' id='AFC6' T='KMSL' class='LIST MT10'  /></div>
                     ${gwh}
                </div>
            </div>
            
            <div class='SEARCH_TT'>
            <div class='SEARCH_LIST'>
                <div class='FLOAT CLEAR'>库位:${fx}<input type='text' id='AFC5' T='FW' class='LIST MT10'  /></div>
                <div class='PLUS ICON CLEAR'></div>
                <div class='cancel ICON'></div>
                ${gwh}
            </div>
        </div>
            `,
    '查找'
  );
  let afc = $('#afc');
  afc.removeClass('dragable');
  afc
    .on('click', '#continue', function () {
      console.log(ss);
      empty_search_val();
      let pd = '';
      let lis = afc.find('.LIST.input_edited[t!=KMSL]');
      if (lis.length > 0) {
        for (let i = 0; i < lis.length; i++) {
          let this_val = $.trim(lis.eq(i).val());
          if (lis.eq(i).attr('T') != 'KMSL') {
            if (this_val != '') {
              let this_list = lis.eq(i).closest('.SEARCH_LIST');
              let this_fx = this_list.find('.SEARCH_FX').val();
              let this_gwh = this_list.find('.SEARCH_GWH').val();
              if (this_gwh != '') {
                if (i == lis.length - 1) {
                  pd += lis.eq(i).attr('T') + ' ' + this_fx + ' ';
                  if (this_fx == 'LIKE') {
                    pd += " '%" + this_val + "%' ";
                  } else {
                    pd += " '" + this_val + "' ";
                  }
                } else {
                  pd += lis.eq(i).attr('T') + ' ' + this_fx + ' ';
                  if (this_fx == 'LIKE') {
                    pd += " '%" + this_val + "%' " + this_gwh + ' ';
                  } else {
                    pd += " '" + this_val + "' " + this_gwh + ' ';
                  }
                }
              } else {
                pd += lis.eq(i).attr('T') + ' ' + this_fx + ' ';
                if (this_fx == 'LIKE') {
                  pd += " '%" + this_val + "%' ";
                } else {
                  pd += " '" + this_val + "' ";
                }
              }
            }
          }
        }
        $('#os_search_pd').val(pd);
        let sl_l = afc.find('.LIST[t=KMSL]');
        if ($.trim(sl_l.val()).length > 0) {
          let sl_list = sl_l.closest('.SEARCH_LIST');
          let sl_t =
            ' AND ' +
            sl_l.attr('t') +
            ' ' +
            sl_list.find('.SEARCH_FX').val() +
            ' ';
          if (sl_list.find('.SEARCH_FX').val() == 'LIKE') {
            sl_t += " '%" + $.trim(sl_l.val()) + "%' ";
          } else {
            sl_t += " '" + $.trim(sl_l.val()) + "' ";
          }
          $('#os_search_sl').val(sl_t);
        }

        if (LY_TABLE.indexOf(ss) > -1) {
          afs_ly('OS/SELECT2', 'GET_ITEM', ss);
        } else if (ss == 'GDLL_LS') {
          afs_ly('OS/SELECT2', 'GDLL_GD_LS', ss);
          let AFS = $('#afs');
          post_func.done(() => {
            GET_KMSL_CARD(
              'GET_KMSL',
              'afs',
              $('#GDLL_LS_TT0').val(),
              'card_r_down',
              'card_l_up',
              '',
              'card_text',
              'COMPARE'
            );
          });
        } else {
          let tit = $(`#${ss}_title`).attr('tit');
          if (os_device != 'pc') {
            eval(ss + `("${tit}",'0',"${os_perpage}")`);
          } else {
            eval(ss + `("${tit}","${os_top}","${os_bottom}")`);
          }
        }

        $('#wfw').addClass('hide');
        afc.remove();
      }
    })
    .on('click', '.PLUS', function () {
      NEW_REPLACE_DIV($(this));
    })
    .on('click', '.cancel', function () {
      let DIVS = $(this).closest('.SEARCH_TT').find('.SEARCH_LIST');
      let THIS_DIV = $(this).closest('.SEARCH_LIST');
      if (DIVS.length > 1) {
        THIS_DIV.remove();
      }
    })
    .on('keydown', 'input', function (EVENT) {
      if (EVENT.which == 107) {
        EVENT.preventDefault();
        EVENT.stopPropagation();
        NEW_REPLACE_DIV($(this));
      } else if (EVENT.which == 13) {
        try {
          plus.key.hideSoftKeybord();
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
    })
    .on('click', '.camera_icon', function () {
      scan_ready('AFC0');
    });

  function NEW_REPLACE_DIV(THIS) {
    let THIS_DIV = THIS.closest('.SEARCH_LIST');
    let THIS_TT = THIS.closest('.SEARCH_TT');
    THIS_TT.find('.SEARCH_LIST').last().after(THIS_DIV.clone());
    THIS_TT.find('.SEARCH_LIST')
      .last()
      .find("input[type='text']")
      .select()
      .focus();
  }
}

function scan_ready(where) {
  try {
    //RENEW_CONTENT_FOCUS("SCAN_BODY")
    $('#video_tt').addClass('hide');
    let body_h = $('body').height();
    $('#for_scan').removeClass('hide');
    $('#SCAN_BODY').height(body_h - $('#FOR_SCAN0').height() - 5);
    let scan = null;
    scan = new plus.barcode.Barcode('SCAN_BODY');
    scan.onmarked = RES;
    scan.start();
    scan.setFlash(true);

    function RES(type, result) {
      after_scan(where, result);
      $('#for_scan').addClass('hide');
      scan.close();
    }
  } catch (error) {
    $('#for_scan').addClass('hide');
    $('#video_tt').removeClass('hide');
    let scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      mirror: false
    });
    scanner.addListener('scan', function (content) {
      after_scan(where, content);
      scanner.stop();
      $('#video_tt').addClass('hide');
    });
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[1]);
          cameras[1].applyConstraints({
            advanced: [{ torch: true }]
          });
        } else {
          console.error('No cameras found.');
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }
}

function after_scan(where, res) {
  let ss = $('.CONTENT_FOCUS').attr('id');
  let pd = res.split(',');
  let afc = $('#afc');

  if ($.trim(pd[0]) == 'CL') {
    afc.remove();
    $('#os_search_pd').val("BH LIKE '%" + pd[1] + "%'");
    if (LY_TABLE.indexOf(ss) > -1) {
      afs_ly('OS/SELECT2', 'GET_ITEM', ss);
    } else {
      $('#video_tt').addClass('hide');
      wt_cf_fccs_wj_H5().then(() => {
        alert('OK1');
      });
    }
  } else if ($.trim(pd[0]) == 'FW') {
    afc.remove();
    $('#os_search_pd').val("FW LIKE '%" + pd[1] + "%'");
    FCCS_WJ_H5('', 0, os_perpage);
  } else if ($.trim(pd[0]) == 'CP_WH') {
    afc.remove();

    $('#os_search_pd').val(
      "TTID = '" +
        pd[1] +
        "' AND WH = '" +
        pd[2] +
        "' AND CGW = '" +
        pd[3] +
        "' AND CPY = '" +
        pd[4] +
        "'"
    );
    CP_MS_H5(0, os_perpage);
  } else {
    console.log($.trim(pd[0]));
    $(`#${where}`).val(res).focus();
  }
}

function new_os_cards(where, title, ss, card_content_width, tt) {
  if (where == 'body') {
    $('body').append(new_card_content(title, ss, tt, card_content_width));
  } else {
    $('#' + where).append(new_card_content(title, ss, tt, card_content_width));
  }
}
/*
TOUCHING=function(FUNC,TOUCH_LEN){
    console.log(TOUCH_LEN)
    if(TOUCH_LEN==1){
        if(TOUCHING==false){

        }
        TAP_TIME_OUT=setTimeout(function(){
            OS_TOUCHING=true;
            FUNC()
        },100);
    }
}
*/
function new_card_content(title, ss, tt_f, card_content_width) {
  $(`#${ss}`).remove();
  let tt = tt_f,
    tt_class = '',
    more_icon_h = '';
  if (tt_f == null) {
    tt = '';
    more_icon_h = 'hide';
  } else {
    tt_class = '_6';
  }
  let height = $('body').height() - $('#nav').height();
  //console.log(ss, "#", card_w)
  let card = `
        <section id='${ss}' class='HMGL os_content hide cant_select _100' style='height:${height}px;position: fixed;top:40px;' >
            <div id='${ss}_header' class='content_header float_left'>
                <div id='${ss}_crtl' class='_100'>
                    <div class='float_left'>
                        <text id='${ss}_title' class='head_title' tt='${title}' >${title}</text>
                        <text id='${ss}_subtitle' class='head_subtitle'></text>
                    </div>
                    <div id='${ss}_search' class='hide MT10'>快速查找:<input type='text' id='os_search' /></div>
                    <div id='${ss}_save' title='保存' class="save_icon ICON hide"></div>
                    <div id='${ss}_quote' title='引用' class="quote_icon ICON hide"></div>
                    <div title='展开' class="MORE UNFOLD ICON ${more_icon_h} float_right"></div>
                    <div title='收藏' class="LESS UNFOLD ICON hide float_right"></div>
                </div>
                <div id="${ss}_tt" class='card_tt ${tt_class}'>${tt}</div>
            </div>
            <div id='${ss}_content' class='float_left _100' style='overflow:auto;height:100%' ></div>
        </section>`;
  return card;
}

function reflush_card(card_type, source, ss, menu_type) {
  $(`#${ss}`)
    .empty()
    .append(
      new_card(
        card_type,
        ss,
        encode_card_array_from_array(os_card_key, source, ss),
        menu_type
      )
    );
  $(`#${ss}_SUB_TITLE`).attr('title', source.length);

  let cards = $(`#${ss}`).find('.card_t');
  for (let i = 0; i < cards.length; i++) {
    if (cards.eq(i).text() == 'undefined') {
      cards.eq(i).text('');
    }
  }

  renew_content_focus(ss);
}

function HIDE_TEXT(TEXT, LEN) {
  let T = '';
  if (TEXT.length > LEN) {
    T = TEXT.substring(0, LEN) + '...';
  } else {
    T = TEXT;
  }
  return T;
}
function ENCODE_TT_FROM_ARRAY(SOURCE, ARRAY) {
  let t = '';
  for (let i = 0; i < ARRAY.length; i++) {
    t += $.trim(SOURCE[ARRAY[i]]) + '#';
  }
  return t;
}

function new_lc() {}
