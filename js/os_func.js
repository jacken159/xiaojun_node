
function encode_array_to_option(array) {
  let o = '';
  for (let i = 0; i < array.length; i++) {
    o += `<option value='${array[i]}'>${array[i]}</option>`;
  }
  return o;
}

function get_fp(times) {
  
    if (times == null) {
      times = 20;
    }
    var res = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < times; i++) {
      res += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

 return res
}

function new_script(path, type) {
  return new Promise((r) => {
    let new_el = document.createElement('script');
    if (type == 'js') {
      new_el.type = 'text/javascript';
    } else if (type == 'module') {
      new_el.type = 'module';
    }
    new_el.src = path;
    document.getElementsByTagName('head')[0].appendChild(new_el);
    new_el.onload = function () {
      r('OK');
    };
  });
}

function recover(d) {
  let j = JSON.parse(d);
  os.mf_data = j.mf_data;
  os.mf = j.mf;

  xiaojun_db.setItem('mf', j.mf);
  xiaojun_db.setItem('mf_data', j.mf_data);

  os.p.f = 'recover'
  os.p.t = 'mf'
  os.p.d = j.mf;
  load_ajax().then(r => {
    console.log(r)
  })

  os.p.f = 'recover'
  os.p.t = 'mf_data'
  os.p.d = j.mf_data;
  load_ajax().then(r => {
    console.log(r)
  })
  

  rebulid_menu_mf(j.mf);
  $('#recover_upload').remove();
  close_afc();
}

function rebulid_menu_mf(array) {
  //let source = os.table_data['wap_get_khms'];
  //if (kh != null) {
  //source = kh;
  //}

  //console.log(source, '#', os.table_data["wap_get_soft"])
  //let a = [];
  //for (let key in source) {
  // for (let j = 0; j < os.table_data['wap_get_soft'].length; j++) {
  //  if (key == os.table_data['wap_get_soft'][j][2]) {
  //   a.push(os.table_data['wap_get_soft'][j]);
  // }
  // }
  // }
  //console.log(a)

  //for (let i = 0; i < a.length; i++) {
  //console.log(a[i][2])
  //new_script("./os/" + a[i][2] + ".js", "JS").then(() => {
  //  eval(a[i][2] + "_func()");
  //});
  //}

  $('#user_mf')
    .empty()
    .append(
      new_card(
        encode_card_array_from_array(os.card_key, array),
        'card',
        'next',
        90
      )
    );
}

/*
function new_os_table(
    where,
    title,
    ss,
    table_cols_len,
    table_head_json,
    tt,
    table_type
) {


    os_table[ss] = JSON.parse(JSON.stringify(os_table_json));
    if (table_head_json != null) {
        os_table[ss].headers = table_head_json;
    } else {
        data.cols_width[ss] = [];
        let a = [];

        for (let i = 0; i < table_cols_len; i++) {
            let h = JSON.parse(JSON.stringify(os_table_header_json));
            if (i == 0) {
                h.t = '序';
                h.width = 55;
                data.cols_width[ss].push(55);
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
                data.cols_width[ss].push(100);
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
    $(`#${ss} .reflush_table_body`).on('scroll', function() {
        let self = $(this);
        $(`#${ss} .reflush_table_header`).scrollLeft(self.scrollLeft());
        reset_editor();
    });
}
*/
function new_table(mf_d) {
  os.clicking = false;
  os.th_over = false;
  os.tr_th_over = false;

  let ss = mf_d.id;
  os.content_focus = ss;
  if (mf_d.table_header.length == 0) {
    afc_func(
      `
		<ul id='new_table_header_area'></ul>
		<input id='new_table_header' type='text' placeholder='录入新字段'/>
		`
    );
    let afc = $('#afc');
    afc
      .on('change', '#new_table_header', function () {
        let self = $(this);
        $('#new_table_header_area').append(
          `<li class='new_header delable'>${self.val()}</li>`
        );
        self.val('').focus();
      })
      .on(os.click, '.delable', function () {
        $(this).remove();
      })
      .on(os.click, '#continue', function () {
        let h = afc.find('.new_header');
        let a = ['', '', '', '', '', ''];

        for (let i = 0; i < h.length; i++) {
          a.push(h.eq(i).text());
        }
        os.mf_data[ss].table_header = a;
        xiaojun_db.setItem('mf_data', os.mf_data);
        reflush_table(os.mf_data[ss]);
        close_afc();
        //$("#" + os.content_focus + "_table_body").empty().append(new_row())
      })
      .on(os.click, '#afc_quote', function () {
        console.log(os);
        let d = '';
        Object.keys(os.mf_data).forEach(function (key) {
          if (
            os.mf_data[key].table_header == null ||
            os.mf_data[key].table_header.length == 0
          ) {
          } else {
            d += `<li key=${key} class='table_h'>${os.mf_data[key].table_header}</li>`;
          }
          //console.log(os.mf_data[key].table_header);
        });

        afl_func(d);
        let afl = $('#afl');
        afl.on(os.click, '.table_h', function () {
          os.mf_data[os.content_focus].table_header =
            os.mf_data[$(this).attr('key')].table_header;
          xiaojun_db.setItem('mf_data', os.mf_data);
          close_afc();
          afl.remove();
          reflush_table(os.mf_data[os.content_focus]);
        });
      });
  }
  $('#nav').find('.button').addClass('hide');
  for (let i = 0; i < os.mf_data[ss].button.length; i++) {
    $('#' + os.mf_data[ss].button[i]).removeClass('hide');
  }
}

function reflush_table(mf_d) {
  let ss = mf_d.id;

  let total_width = 0;
  let headers = mf_d.table_header;
  for (let i = 0; i < headers.length; i++) {
    if (mf_d.cols_width[i] == null) {
      total_width += 60;
    } else {
      total_width += parseFloat(mf_d.cols_width[i]);
    }
  }
  let filter = '';

  if (mf_d.table_filter == '1') {
    filter += `<div class='filter_icon filter_size'></div>`;
  }
  let col_resize = `<div class='col_resize dragable cant_select'></div>`;

  if (mf_d.table_add_cols.length > 0) {
    for (let i = 0; i < mf_d.table_add_cols.length; i++) {
      total_width += parseFloat(mf_d.table_add_cols[i].width);
    }
  }

  let table_header = '';
  table_header += `
        <div style='width:${total_width}px;overflow:hidden'>
            <table class='cant_select'  >
                <thead class='table_tt'>
                    <tr>`;
  for (let i = 0; i < headers.length; i++) {
    let th_width = mf_d.cols_width[i];
    if (mf_d.cols_width[i] == null) {
      th_width = 60;
    }
    if (i == 0) {
      table_header += `<th title='${i}' style='width:${th_width}px;' class='for_resize ${mf_d.cols_hide[i]} /*${headers[i].disa}*/ ${mf_d.cols_color[i]}' ><div class='os_th' >序</div><div style='position: relative;top:-17px;height:100%'>${filter}${col_resize}</div></th>`;
    } else {
      table_header += `<th title='${i}' style='width:${th_width}px;'  class='for_resize  ${mf_d.cols_hide[i]}' ><div class='os_th' >${headers[i]}</div><div  style='position: relative;top:-17px;'>${filter}${col_resize}</div></th>`;
    }
  }
  if (mf_d.table_add_cols.length > 0) {
    let a = mf_d.table_add_cols.add_cols;
    for (let i = 0; i < a.length; i++) {
      table_header += `<th style='width:${a[i].width}px;' class='for_resize ${a[i].class}' ><div class='os_th' >${a[i].text}</div><div style='position: relative;top:-17px;height:100%'>${filter}${col_resize}</div></th>`;
    }
  }
  table_header += `
                    </tr>
                </thead>
            </table>
        </div>`;

  $('#' + ss + '_table_header')
    .empty()
    .append(table_header);

  let table_body = '';
  table_body += `
        <div id='${ss}_table_body_div' class='' style='width:${total_width}px;'>
            <table id='${ss}_table_body_table' class=' table_ms cant_select' >
                <tbody id='table_data' class='table_data FFF'>`;

  let page_top = os.page_top,
    page_bottom = os.page_bottom;
  //console.log(os.page_top, '#', os.page_bottom)
  let table_a = [];
  if (mf_d.table_cs != null) {
    table_a = table_query(mf_d, [], 0);
  } else {
    table_a = mf_d.table_data;
  }

  if (table_a.length > 0) {
    
    for (let i = os.page_top; i < os.page_bottom; i++) {
      //console.log(os_table_data[ss][i])
      if (table_a[i] != null) {
        table_body += new_row(mf_d, '', i, '', ' tr_list');
      }
      //console.log(2)
    }
  }

  if (mf_d.add_rows > 0) {
    for (let i = 0; i < os_table[ss].add_rows; i++) {
      table_body += new_row(mf_d, 'empty', '', '', 'tr_list tr_edited tr_new');
      os_table_data_add_row(os_table_data[ss].length);
    }
  }

  if (mf_d.tr_input == '1') {
    table_body += new_row(mf_d, 'empty', '', 'tr_input', 'tr_input');
  }

  if (mf_d.tr_sum == '1') {
    table_body += new_row(mf_d, 'empty', '', ss + 'tr_sum', 'tr_sum');
  }

  table_body += `
                </tbody>
            </table>
        </div>
    </div>`;

  //console.log(table_body)
  $('#' + ss + '_table_body')
    .empty()
    .append(table_body);

  let data_len = table_a.length;
  let nav_content = '';
  if (mf_d.nav_bottom == '1') {
    let l = 0;
    if (table_a[0] != null) {
      l = table_a[0].length;
    }
    let len = l + mf_d.table_add_cols.length;
    nav_content += `
            <tr id='${ss}tr_nav_bottom' class='tr_nav_bottom' >
            <td colspan='${len}' class='disabled'>
                <div class='float_left'>
                    <div class='float_left' >每页显示<input type='text' class='per_page' value='${os.perpage}' style='width:10em;' />行</div>
                    <div class='HOVER float_left' title='上一页'><div class='prev_icon ICON'></div></div>
                    <div class='HOVER float_left' title='下一页'><div class='next_icon ICON float_left'></div></div>
                    <div class='float_left'>第<text class='page_top'>${os.page_top}</text>行</div>
                    <div class='float_left'>到<text class='page_bottom'>${os.page_bottom}</text>行</div>
                    <div class='float_left'>共<text class='totle_rows'>${data_len}</text>行</div>
                </div>
                <div class='float_left'>
                    <div class='float_left'>求和:<text class='FX_SUM'></text></div>
                    <div class='float_left'>平均:<text class='FX_AVG'></text></div>
                    <div class='float_left'>计数:<text class='FX_COUNT'></text></div>
                </div>
            </td>
        </tr>`;
  }
  $('#' + ss + '_table_nav')
    .empty()
    .append(nav_content);

  $('#' + ss + '_STATUS').remove();

  if ((mf_d.status = '1')) {
    $('#' + ss + '_content').append(
      `
            <div id='${ss}_status' class='os_table_tt' >
                <tr></tr>
            </div>
            `
    );
  }

  if (mf_d.tr_sum == '1') {
    get_sum(mf_d);
  }

  $('#' + ss)
    .find('.page_top')
    .text(page_top);
  $('#' + ss)
    .find('.page_bottom')
    .text(page_bottom);

  //os.page_top = page_top;
  let totle_h = $(window).height();
  if (
    $('#' + ss)
      .parent()
      .hasClass('swift')
  ) {
    totle_h = $(window).height() * 0.8;
  }
  let nav_h = $('#nav').height(),
    table_nav_h = $('#' + ss + '_table_nav').height() + 10,
    header_h = $('#' + ss + '_table_header').height();
  if (table_nav_h == 10) {
    table_nav_h = 50;
  }
  if (header_h == 0) {
    header_h = 40;
  }
  //console.log(nav_h, "#", table_nav_h, "#", header_h)
  let h = totle_h - nav_h - table_nav_h - header_h;
  $('#' + ss + '_content').height(h);
  $('#' + ss).offset({
    top: nav_h
  });

  renew_i(mf_d);
}

function new_row(
  data,
  new_row_type,
  row_strat_index,
  tr_id,
  tr_class,
  new_row_i
) {
  //console.log(new_row_type)
  let headers = data.table_header;
  //console.log(headers)
  //console.log(os_table[ss])
  let tr_content = '';
  tr_content += `<tr id='${tr_id}' class='${tr_class}' >`;
  if (new_row_type == 'add') {
    let I = row_strat_index + 1;
    let cols = td_data.split('||');
    for (let i = 0; i < cols.length; i++) {
      tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]}  ' style='width:${data.cols_width[ss][j]}px;' tabindex='i' td-t='${cols[i]}'>${cols[i]}</td>`;
    }
  } else if (new_row_type == '') {
    //console.log(row_strat_index)
    let row_I = row_strat_index + 1;
    for (let j = 0; j < headers.length; j++) {
      let td_width = data.cols_width[j];
      if (data.cols_width[j] == null) {
        td_width = 60;
      }
      if (data.table_data[row_strat_index][j] != null) {
        //console.log(1.1)
        let disp_td_t = '';
        let cols_d = data.table_data[row_strat_index][j];
        if (cols_d.length > data.td_len) {
          disp_td_t = cols_d.substring(0, data.td_len) + '...';
        } else {
          disp_td_t = cols_d;
        }
        let icon = '';
        if (data.table_icon == '1') {
          icon = `<div class='td_info HOVER hide' title='明细' ><div class='info_icon icon_20 '></div></div>`;
        }

        if (j == 0) {
          if (new_row_type == 'NO_ID') {
            tr_content += `<td class='for_resize os_tr_th CS_I break_css TD_I_COLOR disabled ' style='width:${td_width}px;' I='${cols_d}' idx='${data.table_data[row_strat_index][1]}' td-t=''  >${row_I}</td>`;
          } else {
            tr_content += `<td class='for_resize os_tr_th CS_I break_css TD_I_COLOR disabled ' style='width:${td_width}px;' I='${cols_d}' idx='${data.table_data[row_strat_index][1]}' td-t='${cols_d}'  >${row_I}</td>`;
          }
        } else if (data.cols_format[j] == 'not0') {
          let t = '';
          if (cols_d != '0') {
            t = cols_d;
          }
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${t}'>${t}${icon}</td>`;
        } else if (data.cols_format[j] == 'currency') {
          let fm_num = format_num(parseFloat(cols_d).toFixed(2));
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${cols_d}'>${fm_num}${icon}</td>`;
        } else if (data.cols_format[j] == 'num') {
          let num = parseFloat(cols_d).toFixed(2);
          if (isNaN(parseFloat(cols_d))) {
            num = '';
          }
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}    ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${cols_d}'>${num}${icon}</td>`;
        } else if (data.cols_format[j] == 'date') {
          let date = cols_d.split(' ')[0].replace(/\//g, '-');
          let d = '';
          if (date != '1900-1-1') {
            d = date;
          }
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}    ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${d}'>${d}${icon}</td>`;
        } else if (data.cols_format == 'selector') {
          let d = data.cols_selector;
          let index = parseFloat(cols_d) - 1;
          let d_t = d[index] || '';
          let select = `<select class='OS_TABLE_SELECTOR'>`;
          select += `<option value='${cols_d}'>${d_t}</option>`;
          for (let i = 0; i < d.length; i++) {
            let I = i + 1;
            select += `<option value='${I}'>${d[i]}</option>`;
          }
          select += `</select>`;
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}    ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${cols_d}'>${select}${icon}</td>`;
        } else if (
          $.trim(cols_d) == '1900/01/01' ||
          $.trim(cols_d) == '1900-01-01' ||
          $.trim(cols_d) == '9998/12/31 0:00:00'
        ) {
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}    ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t=''>${icon}</td>`;
        } else if (data.cols_afs.length > 0) {
          let afs = '';
          if (headers[j].afs != null) {
            afs = 'afs=' + headers[j].afs;
          }

          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}    ${data.cols_color[j][j]} ' style='width:${td_width}px;' tabindex='0' ${afs}  td-t='${cols_d}'>${disp_td_t}${icon}</td>`;
        } else {
          //console.log('else')
          tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t='${cols_d}'>${disp_td_t}</td>`;
        }
      } else {
        //console.log(1.2)
        tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t=''></td>`;
      }
    }
  } else if (new_row_type == 'empty') {
    //console.log(1.2)
    for (let j = 0; j < headers.length; j++) {
      let td_width = data.cols_width[j];
      if (data.cols_width[j] == null) {
        td_width = 60;
      }
      if ((tr_class == 'tr_input') & (j == 0)) {
        tr_content += `<td class='break_css for_resize os_tr_th ${data.cols_hide[j]}   ${data.cols_color[j]} disable TD_I_COLOR' style='width:${td_width}px;' tabindex='0' td-t=''>录入</td>`;
      } else if ((tr_class == 'tr_sum') & (j == 0)) {
        tr_content += `<td class='break_css for_resize os_tr_th ${data.cols_hide[j]}   ${data.cols_color[j]} disable TD_I_COLOR' style='width:${td_width}px;' tabindex='0' td-t=''>小计</td>`;
      } else if (j == 0) {
        tr_content += `<td class='break_css for_resize os_tr_th ${data.cols_hide[j]
          }   ${data.cols_color[j]
          } disable TD_I_COLOR' style='width:${td_width}px;' i='${new_row_i}' tabindex='0' idx='${data.table_data.length - 1
          }' td-t=''></td>`;
      } else {
        tr_content += `<td class='break_css for_resize ${data.cols_hide[j]}   ${data.cols_color[j]} ' style='width:${td_width}px;' tabindex='0' td-t=''></td>`;
      }
    }
  }
  /*
        if (os_table[ss].add_cols.length > 0) {
            let add_c = os_table[ss].add_cols;
            for (let j = 0; j < add_c.length; j++) {
                if (add_c[j].type == 'button') {
                    tr_content +=
                        `<td style='width:${add_c[j].width}px;' class='break_css for_resize ${add_c[j].class}'  tabindex='0' >${add_c[j].data}</td>`;
                } else if (add_c[j].type == 'text') {
                    tr_content +=
                        `<td style='width:${add_c[j].width}px;' class='break_css for_resize ${add_c[j].class}'  tabindex='0' td-t='${add_c[j].text}'>${add_c[j].text}</td>`;
                }
            }
        }
    */
  tr_content += '</tr>';

  return tr_content;
}

function renew_i(data) {
  if (data.table_data.length > 0) {
    let ss = data.id;
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
      //data.table_data[tr_index][0] = tr_index;
    }
  }
}

function get_sum(mf_d, type) {
  let ss = mf_d.id;
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
            a[i][j] = a[i - 1][j] + parseFloat(tds.eq(j).attr('td-t'));
          } else {
            a[i][j] += parseFloat(tds.eq(j).attr('td-t'));
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
              .attr('td-t', a[i][l].toFixed(2));
          }
        }
      }
      // console.log(A);
      /*
                  if (isNaN(parseFloat(TRS.eq(j).find("td").eq(i).attr("td-t")))) {
                      RES += 0
                  } else {
                      RES += parseFloat(TRS.eq(j).find("td").eq(i).attr("td-t"));
                  }
                  */
    }
  } else {
    let fx = mf_d.table_fx;
    for (let i = 0; i < fx.length; i++) {
      if (fx[i] == 'sum') {
        let res = 0;
        for (let j = 0; j < trs.length; j++) {
          if (isNaN(parseFloat(trs.eq(j).find('td').eq(i).attr('td-t')))) {
            res += 0;
          } else {
            res += parseFloat(trs.eq(j).find('td').eq(i).attr('td-t'));
          }
        }
        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(res.toFixed(2))
          .attr('td-t', res);
      } else if (fx[i] == 'avg') {
        let res = 0;
        for (let j = 0; j < trs.length; j++) {
          if (isNaN(parseFloat(trs.eq(j).find('td').eq(i).attr('td-t')))) {
            res += 0;
          } else {
            res += parseFloat(trs.eq(j).find('td').eq(i).attr('td-t'));
          }
        }
        let avg_r = res / trs.length;
        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(avg_r)
          .attr('td-t', avg_r);
      } else if (fx[i] == 'count') {
        let res = [];
        for (let j = 0; j < trs.length; j++) {
          res.push($.trim(trs.eq(j).find('td').eq(i).attr('td-t')));
        }
        let res_set = [...new Set(res)];

        $('#' + ss + 'tr_sum')
          .find('td')
          .eq(i)
          .text(res_set.length)
          .attr('td-t', res_set.length);
      }
    }
  }
}

function renew_content_focus(ss) {
  //xiaojun_db.setItem("content_focus", ss);
  os.content_focus = ss;
}
function reset_editor() {
  $('#editor,#mover,#fm_selector,#datepicker').offset({
    top: -15,
    left: -15
  });
  $('#editor,#fm_selector,#datepicker').width(0).height(0);
}

function set_mover(self, _xx, _yy) {
  let mover = $('#mover');
  let offset = self.offset();
  let w = self.width(),
    h = self.height();
  let xx = offset.left + w + _xx,
    yy = offset.top + h + _yy;

  mover.offset({
    top: yy,
    left: xx
  });
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
  editor.offset({
    top: YY,
    left: XX
  });
  editor.width(W).height(H);
  editor.val($.trim(self.attr('td-t')));
  editor.focus().select();
}

function status_auto_fx() {
  let this_content = $(`#${os.content_focus}`),
    ss = this_content.attr('id');
  let trs = this_content.find('.selected_tr'),
    tds1 = this_content.find('.td_selected');
  let count = [],
    res = 0;
  for (let i = 0; i < trs.length; i++) {
    let tds = trs.eq(i).find('.td_selected');
    for (let j = 0; j < tds.length; j++) {
      if ($.trim(tds.eq(j).attr('td-t')).length > 0) {
        let TDS_S = tds.eq(j).attr('td-t').split('/') || '',
          TDS_S1 = tds.eq(j).attr('td-t').split('-') || '';
        res += 0;
        if (TDS_S.length > 2 || TDS_S1.length > 2) {
          res += 0;
          count.push(j);
        } else if (isNaN(tds.eq(j).attr('td-t'))) {
          res += 0;
          count.push(j);
        } else {
          count.push(j);
          res += parseFloat(tds.eq(j).attr('td-t'));
        }
      } else if ($.trim(tds.eq(j).attr('td-t')).length == 0) {
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

function os_table_mover() {
  let this_content = $('#' + os.content_focus);
  let current = this_content.find('.td_selected');
  let for_mover_td = this_content.find('.for_mover');

  current.focus();
  $('#editor').offset({
    top: 0,
    left: 0
  });
  $('#editor').width(0).height(0);
  if (for_mover_td.length == 1) {
    let val = for_mover_td.attr('td-t');
    this_content.find('.td_selected').text(val).attr('td-t', val);
    this_content.find('.selected_tr').addClass('tr_edited');
    for (let i = os.row_i[0]; i <= os.row_i[os.row_i.length - 1]; i++) {
      for (let j = os.col_i[0]; j <= os.col_i[os.col_i.length - 1]; j++) {
        os.mf_data[os.content_focus].table_data[i][j] = val;
      }
      os.trs_edited_index[os.content_focus].push(
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
 
                    THIS_CONTENT.find(".selected_tr").eq(i).find("td").eq(INDEX + j).text(X_COL[j]).attr("td-t", X_COL[j]);
 
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
 
                    THIS_CONTENT.find(".selected_tr").eq(i).find("td").eq(INDEX + j).text(X_COL[j]).attr("td-t", X_COL[j]);
                }
                THIS_CONTENT.find(".selected_tr").eq(i).addClass("tr_edited");
            }
        }
    }
    */
}

function os_table_data_add_row(start_index, insert_type_string) {
  let ss = os.content_focus;
  //console.log(start_index, '#', ss, '#', os)
  let headers = os.mf_data[ss].table_header;
  let a = [];
  for (let i = 0; i < headers.length; i++) {
    a.push('');
  }

  if (insert_type_string == 'insert') {
    a[1] = start_index;
  } else {
    a[1] = os.mf_data[ss].table_data.length;
  }
  os.mf_data[ss].table_data.splice(start_index, 0, a);


  //after insert
  let insert_a = [];
  let insert_i = 0;
  if (insert_type_string == 'insert') {
    os.mf_data[ss].table_data[start_index][0] = start_index;
    insert_a = os.mf_data[ss].table_data[start_index];
    insert_i = start_index;
  } else {
    os.mf_data[ss].table_data[os.mf_data[ss].table_data.length - 1][0] =
      os.mf_data[ss].table_data.length - 1;
    insert_a = os.mf_data[ss].table_data[os.mf_data[ss].table_data.length - 1];
    insert_i = os.mf_data[ss].table_data.length - 1;
  }

  os.mf_data[ss].last_id++;
  xiaojun_db.setItem('mf_data', os.mf_data);
  /*
  os.load_type = 'insert';
  os.load_table = ss;
  os.load_data = insert_a;
  os.load_data_row = insert_i;
  load_ajax().then(r => {
    xiaojun_db.setItem('mf_data', os.mf_data);

  });
  */
}

function mf_editor(data, edit_from) {
  let a = [];
  let t = '';
  if (edit_from == 'mf') {
    a = data;
    for (let i = 0; i < a.length; i++) {
      t += `<div class='mf_list ' style='height:40px;'><input I='${a[i][0]}' idx='${a[i][1]}' id='mf${i}' type='text' value='${a[i][10]}' /><button class='mf_d'>删除</button><div class='less_icon ICON float_left'></div><div class='more_icon ICON float_left'></div></div>`;
    }
  } else if (edit_from == 'table_header') {
    a = data.table_header;
    for (let i = 0; i < a.length; i++) {
      let check = '';
      if (data.cols_hide[i] == 'hide') {
        check = `checked='checked'`;
      }
      let h = '';
      if (i < 6) {
        h = 'hide';
      }
      t += `<div class='mf_list ${h}' style='height:40px;'><input I='${i}' id='mf${i}' class='new_header' type='text' value='${a[i]}' /><button  I='${i}' class='mf_d'>删除</button><div I='${i}'  class='less_icon ICON float_left'></div><div I='${i}'  class='more_icon ICON float_left'></div><label for='cb${i}'>隐藏</label><input type='checkbox' id='cb${i}' class='cb' ${check}/></div>`;
    }
    t += `<input id='new_table_header' type='text' placeholder='录入新字段'/>`;
  }

  afc_func(t);
  let afc = $('#afc');
  afc
    .on('change', '#new_table_header', function () {
      let self = $(this);
      let ips = afc.find('.new_header');
      self.before(`
			<div class='mf_list ' style='height:40px;'><input I='${ips.length
        }' id='mf${ips.length}' class='new_header' type='text' value='${self.val()}' /><button  I='${ips.length}' class='mf_d'>删除</button><div I='${ips.length}' class='less_icon ICON float_left'></div><div I='${ips.length}' class='more_icon ICON float_left'></div><label for='cb${ips.length}'>隐藏</label><input type='checkbox' id='cb${ips.length}' class='cb' /></div>
		`);
      self.val('').focus();
    })
    .on(os.click, '#continue', function () {
      let divs = afc.find('.input_edited').closest('div');
      let cbs = afc.find('.cb');
      if (afc.find('.input_edited').length > 0) {
        if (edit_from == 'mf') {
          for (let i = 0; i < a.length; i++) {
            a[i][0] = i;
            a[i][11] = $('#mf' + i).val();
          }
          os.mf = a;
          rebulid_menu_mf(a);
          xiaojun_db.setItem('mf', a);
          /*
          os.load_type = 'update_side_menu_header';
          os.load_data = a;
          load_ajax().then(r => {
            os.mf = a;
            rebulid_menu_mf(a);
            xiaojun_db.setItem('mf', a);

          })
          */
        } else if (edit_from == 'table_header') {
          let ips = afc.find('.new_header');
          for (let i = 0; i < ips.length; i++) {
            a[i] = ips.eq(i).val();
          }
          let cb = [];
          for (let i = 0; i < cbs.length; i++) {
            let h = '';
            if (cbs.eq(i).prop('checked') == true) {
              h = 'hide';
            }
            cb.push(h);
          }
          os.mf_data[data.id].table_header = a;
          os.mf_data[data.id].cols_hide = cb;

          //update_table(data.id,true);


        }

        afl_func('save', '', 700);
      } else {
        afl_func('save', '', 700);
      }
      close_afc();
    })
    .on(os.click, '.mf_d', function () {
      let this_div = $(this).closest('div');
      if (edit_from == 'mf') {
        a.splice(this_div.index(), 1);
        os.mf = a;
        xiaojun_db.setItem('mf', a);
        rebulid_menu_mf(a);
        this_div.remove();
      } else {
        a.splice(this_div.index(), 1);

        let col_i = $(this).attr('i');
        let a1 = os.mf_data[os.content_focus].table_data;
        for (let i = 0; i < a1.length; i++) {
          a1[i].splice(col_i, 1);
        }

        os.mf_data[os.content_focus].table_data = a1;
        xiaojun_db.setItem('mf_data', os.mf_data);
        reflush_table(os.mf_data[os.content_focus]);
        this_div.remove();
      }
    })
    .on(os.click, '.more_icon', function () {
      let this_div = $(this).closest('.mf_list');
      let this_index = this_div.index();
      if (this_div.prev().length > 0) {
        if (this_div.prev().hasClass('hide')) {
        } else {
          let prev_div = this_div.prev();
          let prev_index = prev_div.index();
          this_div.prev().before(this_div);
          if (edit_from == 'mf') {
            a[this_index][0] = prev_index;
            a[prev_index][0] = this_index;

            a.sort();
            xiaojun_db.setItem('mf', a);
            os.mf = a;
            rebulid_menu_mf(a);
          } else if (edit_from == 'table_header') {
            let this_h = a[this_index],
              prev_h = a[prev_index];
            a[this_index] = prev_h;
            a[prev_index] = this_h;

            let a1 = os.mf_data[os.content_focus].table_data;
            for (let i = 0; i < a1.length; i++) {
              let prev_t = a1[i][prev_index],
                this_t = a1[i][this_index];
              a1[i][prev_index] = this_t;
              a1[i][this_index] = prev_t;
            }
            os.mf_data[os.content_focus].table_data = a1;
           // update_table(os.content_focus,true);
          }
        }
      }
    })
    .on(os.click, '.less_icon', function () {
      let this_div = $(this).closest('.mf_list');
      let this_index = this_div.index();
      if (this_div.next().length > 0) {
        if (this_div.next().hasClass('hide')) {
        } else {
          let prev_div = this_div.next();
          let prev_index = prev_div.index();
          this_div.next().after(this_div);
          if (edit_from == 'mf') {
            a[this_index][0] = prev_index;
            a[prev_index][0] = this_index;

            a.sort();
            xiaojun_db.setItem('mf', a);
            os.mf = a;
            rebulid_menu_mf(a);
          }
        }
      }
    })
    .on('change', 'input[type=checkbox]', function () {
      let cbs = afc.find('.cb');

      let cb = [];
      for (let i = 0; i < cbs.length; i++) {
        let h = '';
        if (cbs.eq(i).prop('checked') == true) {
          h = 'hide';
        }
        cb.push(h);
      }
      os.mf_data[data.id].cols_hide = cb;
      xiaojun_db.setItem('mf_data', os.mf_data);
      reflush_table(os.mf_data[data.id]);
      console.log('box');
    })
    .on(os.click, '#afc_del', function () {
      console.log(123);
      os.mf_data[os.content_focus].table_header = [];
      new_table(os.mf_data[os.content_focus]);
    });
}

function os_table_copy(type) {
  return new Promise((r) => {
    let current = $('.td_selected'),
      this_content = current.closest('.os_content');
    this_content.find('.for_copy').removeClass('for_copy');
    let page_top = parseFloat(this_content.find('.page_top').text());
    let tds_selected = this_content.find('.td_selected');
    os.row_i.push(tds_selected.first().closest('tr').index());
    os.col_i.push(tds_selected.first().index());
    os.row_i.push(tds_selected.last().closest('tr').index());
    os.col_i.push(tds_selected.last().index());

    os.row_i.sort(function (a, b) {
      return a - b;
    });
    os.col_i.sort(function (a, b) {
      return a - b;
    });
    console.log(os.row_i, '#', os.col_i);
    //dataxamount = ROW_I[ROW_I.length - 1] - ROW_I[0] + 1;
    let trs = this_content.find('.tr_list');
    let copyed_text = '';
    if (type == 'title') {
      let t = '';
      for (let j = os.col_i[0]; j <= os.col_i[os.col_i.length - 1]; j++) {
        t += this_content.find('.os_th').eq(j).text() + '\t';
      }
      copyed_text = copyed_text + t.substring(0, t.length - 1) + '\n';
    }
    for (let i = os.row_i[0]; i <= os.row_i[os.row_i.length - 1]; i++) {
      let t = '';
      for (let j = os.col_i[0]; j <= os.col_i[os.col_i.length - 1]; j++) {
        t += os.mf_data[os.content_focus].table_data[page_top + i][j] + '\t';
        //Y += $.trim(trs.eq(i).find('td').eq(j).attr('data-text')) + '\t';
        //trs.eq(i).find("td").eq(j).addClass("selected");
        trs.eq(i).find('td').eq(j).addClass('for_copy');
      }

      copyed_text = copyed_text + t.substring(0, t.length - 1) + '\n';
    }

    let text = copyed_text.substring(0, copyed_text.length - 1);
    if (os.browser == 'Chrome' || os.browser == 'Firefox') {
      //var clipboard = nw.Clipboard.get();
      //clipboard.set('I love NW.js :)', 'text');

      r(
        navigator.clipboard
          .writeText(text)
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
      top: trs.eq(os.row_i[0]).find('td').eq(os.col_i[0]).index()
    });

    current.focus();
    this_content.find('.td_selected').removeClass('td_selected');

    os.row_i.splice(0, os.row_i.length);
    os.col_i.splice(0, os.col_i.length);
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
  let this_content = $(`#${os.content_focus}`),
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
            let datarows_I = tds_tr.index() + i;
            //console.log(R,TRS.length,DATAROWS.length,DATAROWS[i])
            let data_cols = datarows[i].split('\t');
            if (datarows_I >= trs.length) {
              if (os.mf_data[ss].tr_input == '1') {
                //console.log("1=>1=>1")
                let content = new_row(
                  os.mf_data[ss],
                  'empty',
                  '',
                  '',
                  'tr_list tr_edited'
                );
                if (trs.length == 0) {
                  this_content.find('#tr_input').before(content);
                } else {
                  this_content.find('.tr_list').last().after(content);
                }
                os_table_data_add_row(datarows_I + 1);
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
                      .attr('td-t', $.trim(data_cols[j]));
                    os.mf_data[ss].table_data[
                      os.mf_data[ss].table_data.length - 1
                    ][index + j] = data_cols[j].trim();

                    //		os.trs_edited_index[ss].push(os.mf_data[ss].table_data.length - 1);
                  }
                }
              }
            } else if (datarows_I < trs.length) {
              trs.eq(datarows_I).addClass('tr_edited');
              for (let j = 0; j < data_cols.length; j++) {
                let cs_td = trs
                  .eq(datarows_I)
                  .find('td')
                  .eq(index + j);
                if (cs_td.hasClass('disabled')) {
                } else if (cs_td.hasClass('hide')) {
                } else {
                  cs_td
                    .text($.trim(data_cols[j]))
                    .attr('td-t', $.trim(data_cols[j]));
                  os.mf_data[ss].table_data[page_top + datarows_I][
                    index + j
                  ] = data_cols[j].trim();
                  //	os.trs_edited_index[ss].push(page_top + datarows_I);
                }
              }
            }
          }
        } else {
          console.log('1=>2');
          let data_cols = datarows[0].split('\t');
          if (tds_tr.hasClass('tr_input')) {
            console.log('1=>1=>1');
            let content = new_row(
              os.mf_data[ss],
              'empty',
              '',
              '',
              'tr_list tr_edited'
            );
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
                  .attr('td-t', $.trim(data_cols[j]));
                os.mf_data[ss].table_data[os.mf_data[ss].table_data.length - 1][
                  index + j
                ] = data_cols[j].trim();
                //os.trs_edited_index[ss].push(os.mf_data[ss].table_data.length - 1);
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
                  .attr('td-t', $.trim(data_cols[j]));
                os.mf_data[ss].table_data[page_top + tds_tr.index()][
                  index + j
                ] = data_cols[j].trim();
                //	os.trs_edited_index[ss].push(page_top + tds_tr.index());
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
          .text($.trim(tds_for_copy.attr('td-t')))
          .attr('td-t', $.trim(tds_for_copy.attr('td-t')));
        for (let i = 0; i < trs.length; i++) {
          let tds = trs.eq(i).find('.td_selected');
          for (let j = 0; j < tds.length; j++) {
            os.mf_data[ss].table_data[page_top + trs.eq(i).index()][
              tds.eq(j).index()
            ] = tds.eq(j).attr('t-td');
          }
          //	os.trs_edited_index[ss].push(page_top + trs.eq(i).index());
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
                .text($.trim(tds_for_copy.eq(j).attr('td-t')))
                .attr('td-t', $.trim(tds_for_copy.eq(j).attr('td-t')));
            }
            trs.eq(i).addClass('tr_edited');
          }
        } else if (tds_for_copy_tr.length > 1) {
          //console.log("3=>2")
        }
      } else {
        console.log('4');
        tds_selected.text($.trim(data)).attr('td-t', $.trim(data));
        this_tr.addClass('tr_edited');
      }

      //update_table(ss,false)
      xiaojun_db.setItem('mf_data', os.mf_data);
      let trs1 = this_content.find('.tr_edited');

      $('.selected:not(.hide)').focus();
      renew_i(os.mf_data[os.content_focus]);

      $('#fm_selector').width(0).height(0);
      $('#fm_selector').offset({ top: 0, left: 0 });
    })
    .catch((err) => {
      console.error('粘贴失败', err);
    });
}

function table_flwj(json_d) {
  return new Promise(res => {
    // mc_i, ga_i, sg_i, hg_i, hwmc_i, kwg_i, sl_i, fl_i
    $('#swift').attr('from', os.content_focus);
    $("#swift").addClass("swift_focus");
    let a = os.mf_data[os.content_focus].table_data.slice();
    let u = [];
    for (let i = 0; i < a.length; i++) {
      if (
        ['小计', '（详见销货清单）', '(详见销货清单)'].indexOf(
          a[i][json_d.mc_i].trim()
        ) == -1
      ) {
        u.push(a[i]);
      }
    }

    os.mf_data[os.content_focus].table_data = u;
    let a1 = os.mf_data[os.content_focus].table_data.slice();
    for (let i = 0; i < a1.length; i++) {
      let fx_val =
        parseFloat(a1[i][json_d.ga_i]) + parseFloat(a1[i][json_d.sg_i]);
      a1[i][json_d.hg_i] = fx_val;
      if (i != 0) {
        for (let j = 0; j < a1[i].length; j++) {
          if ([18, 19, json_d.kwg_i, 29, 30].indexOf(j) > -1) {
          } else {
            if (a1[i][j] == null) {
              a1[i][j] = '';
            }
            if (a1[i][j].length == 0) {
              a1[i][j] = a1[i - 1][j];
            }
          }
        }
      }
    }
    let a2 = [];
    for (let i = 0; i < a1.length; i++) {
      if (a1[i][28] == '填开作废') {
      } else {
        a2.push(a1[i]);
      }
    }
    os.mf_data[os.content_focus].table_data = a2;
    reflush_table(os.mf_data[os.content_focus]);
    /*
      os.trs_edited_index[os.content_focus].splice(0, os.trs_edited_index[os.content_focus].length);
      for (let i = 0; i < os.mf_data[os.content_focus].table_data.length; i++) {
          os.trs_edited_index[os.content_focus].push(i);
      }
      */

    let fl_a = [];
    for (let i = 0; i < os.mf_data[os.content_focus].table_data.length; i++) {
      fl_a.push(os.mf_data[os.content_focus].table_data[i][json_d.fl_i]);
    }
    let fl_set = [...new Set(fl_a)];
    fl_set.sort(function (a, b) {
      return a.localeCompare(b, 'zh-Hans-TW');
    });

    for (let k = 0; k < fl_set.length; k++) {
      let dwmc_a = [],
        mc_a = [];
      for (let i = 0; i < os.mf_data[os.content_focus].table_data.length; i++) {
        if (
          os.mf_data[os.content_focus].table_data[i][json_d.fl_i] == fl_set[k]
        ) {
          dwmc_a.push(os.mf_data[os.content_focus].table_data[i][json_d.hwmc_i]);
          let kwg = '';
          if (json_d.kwg_i != '') {
            kwg = os.mf_data[os.content_focus].table_data[i][json_d.kwg_i];
          }
          mc_a.push(
            os.mf_data[os.content_focus].table_data[i][json_d.mc_i] + kwg
          );
        }
      }

      let dwmc_set = [...new Set(dwmc_a)];
      dwmc_set.sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hans-TW');
      });
      let mc_set = [...new Set(mc_a)];
      mc_set.sort(function (a, b) {
        return a.localeCompare(b, 'zh-Hans-TW');
      });

      $('#' + fl_set[k] + 'dwmc').remove();
      $('#' + fl_set[k] + 'mc').remove();

      os.new_table_title = fl_set[k] + '客户';
      os.new_table_type = 'table';
      os.new_table_id=fl_set[k] + 'dwmc';
      let d2 = new_mf_data();
      d2.new_table_place = 'swift';
      d2.table_header = ['1', '2', '3', '4', '5', '6', '7', '8'];
      os.target_id=fl_set[k] + 'dwmc';
      mf_body();

      os.new_table_title = fl_set[k] + '分类';
      os.new_table_type = 'table';
      os.new_table_id=fl_set[k] + 'mc';
      let d3 = new_mf_data();
      d3.table_header = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      d3.new_table_place = 'swift';
      os.target_id=fl_set[k] + 'mc';
      mf_body(d3);

      //new_os_table("swift", fl_set[k] + "客户", fl_set[k] + "dwmc", 6);
      //os_table[fl_set[k] + "dwmc"].tr_sum = "1";

      //new_os_table("swift", fl_set[k] + "分类", fl_set[k] + "mc", 9);
      //os_table[fl_set[k] + "mc"].tr_sum = "1";

      let dwmc_d = [];
      for (let i = 0; i < dwmc_set.length; i++) {
        let dwmc_hsga = 0;
        for (let j = 0; j < os.mf_data[os.content_focus].table_data.length; j++) {
          if (
            os.mf_data[os.content_focus].table_data[j][json_d.hwmc_i] ==
            dwmc_set[i] &&
            os.mf_data[os.content_focus].table_data[j][json_d.fl_i] == fl_set[k]
          ) {
            dwmc_hsga += parseFloat(
              os.mf_data[os.content_focus].table_data[j][json_d.hg_i]
            );
          }
        }
        dwmc_d.push([i, '', '', '', '', '', dwmc_set[i], dwmc_hsga.toFixed(2)]);
      }
      //console.log(dwmc_d)
      os.mf_data[fl_set[k] + 'dwmc'].table_data = dwmc_d;
      reflush_table(os.mf_data[fl_set[k] + 'dwmc']);
      get_sum(os.mf_data[fl_set[k] + 'dwmc'], 'all');
      let d1 = '';
      let mc_d = [];
      for (let i = 0; i < mc_set.length; i++) {
        let mc_sl = 0,
          mc_ga = 0,
          mc_sg = 0;
        for (let j = 0; j < os.mf_data[os.content_focus].table_data.length; j++) {
          let kwg = '';
          if (json_d.kwg_i != '') {
            kwg = os.mf_data[os.content_focus].table_data[j][json_d.kwg_i];
          }
          let tds_mc =
            os.mf_data[os.content_focus].table_data[j][json_d.mc_i] + kwg;
          if (
            tds_mc == mc_set[i] &&
            os.mf_data[os.content_focus].table_data[j][json_d.fl_i] == fl_set[k]
          ) {
            mc_sl += parseFloat(
              os.mf_data[os.content_focus].table_data[j][json_d.sl_i]
            );
            mc_ga += parseFloat(
              os.mf_data[os.content_focus].table_data[j][json_d.ga_i]
            );
            mc_sg += parseFloat(
              os.mf_data[os.content_focus].table_data[j][json_d.sg_i]
            );
          }
        }
        mc_d.push([
          i,
          '',
          '',
          '',
          '',
          '',
          mc_set[i],
          mc_sl.toFixed(4),
          mc_ga.toFixed(2),
          mc_sg.toFixed(2),
          ''
        ]);
      }
      //let mc_data = d1.substring(0, d1.length - 2);
      os.mf_data[fl_set[k] + 'mc'].table_data = mc_d;
      res(reflush_table(os.mf_data[fl_set[k] + 'mc']));
      get_sum(os.mf_data[fl_set[k] + 'mc'], 'all');
      $('#swift').removeClass('hide');

      $('#' + fl_set[k] + 'dwmc').css('position', 'relative');
      $('#' + fl_set[k] + 'mc').css('position', 'relative');
      $('#' + fl_set[k] + 'dwmc').removeClass('hide');
      $('#' + fl_set[k] + 'mc').removeClass('hide');
      $('#' + os.content_focus).removeClass('hide');
    }
  })

}

function get_unique_from_table(table_d, cs_i, sort_type) {
  let a = [];
  if (table_d.length > 0) {
    for (let i = 0; i < table_d.length; i++) {
      a.push(table_d[i][cs_i]);
    }
  }
  let a_set = [...new Set(a)];
  if (sort_type == 'asc') {
    a_set.sort(function (a, b) {
      return a.localeCompare(b, 'zh-Hans-TW', {
        numeric: true
      });
    });
  } else if (sort_type == 'desc') {
    a_set.sort(function (a, b) {
      return b.localeCompare(a, 'zh-Hans-TW', {
        numeric: true
      });
    });
  }
  /*
    let a = os_table_data[ss].sort(function (a, b) {
        return a[th_index].localeCompare(b[th_index], 'zh-Hans-TW', {
          numeric: true
        });
      });
      */
  return a_set;
}
/*
function table_query(mf_d) {
    console.log(mf_d.table_cs.i, '#', mf_d.table_cs.v)

    let u = [];
    for (let j = 0; j < mf_d.table_data.length; j++) {
        let t = ''
        for (let i = 0; i < mf_d.table_cs.i.length; i++) {
            t += mf_d.table_data[j][mf_d.table_cs.i[i]]
        }
        if (t == mf_d.table_cs.v) {
            u.push(mf_d.table_data[j]);
        }

    }

    return u
}

function table_query(mf_d, u, i) {
    console.log(mf_d)
    if (i == mf_d.table_cs.length) {
        return u;
    } else {
        console.log(mf_d.table_cs[i][0], '#', mf_d.table_cs[i][1], '#', mf_d.table_cs[i][2])
        if (mf_d.table_cs[i][2] == 'or') {
            for (let j = 0; j < mf_d.table_data.length; j++) {

                if (mf_d.table_data[j][mf_d.table_cs[i][0]] == mf_d.table_cs[i][1]) {
                    u.push(mf_d.table_data[j])
                }
            }
        } else {
            if (u.length > 0) {
                let a = u.slice();
                let u1 = [];
                for (let j = 0; j < a.length; j++) {

                    if (a[j][mf_d.table_cs[i][0]] == mf_d.table_cs[i][1]) {
                        u1.push(a[j])
                    }
                }
                u = u1;
            } else {
                for (let j = 0; j < mf_d.table_data.length; j++) {

                    if (mf_d.table_data[j][mf_d.table_cs[i][0]] == mf_d.table_cs[i][1]) {
                        u.push(mf_d.table_data[j])
                    }
                }
            }
        }
        return table_query(mf_d, u, i + 1);
    }
}
*/

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
    swift.removeClass('swift_move');
    swift.find('.hmgl').addClass('hide');
    $('#wfw').addClass('hide');
  }
}

function update_td(table_name, update_data, row_i, col_i) {
  os.load_type = 'update';
  os.load_table = table_name;
  os.load_data = update_data;
  os.load_data_row = row_i;
  os.load_data_col = col_i;
  load_ajax();
}

function update_table(mf_name,reflush) {
  os.load_type = 'update_table';
  os.load_table = mf_name;
  os.load_data = os.mf_data[mf_name];
  load_ajax().then(r => {
    xiaojun_db.setItem('mf_data', os.mf_data);
    if(reflush==true){
      reflush_table(os.mf_data[mf_name]);
    }

  });
}