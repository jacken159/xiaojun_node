
function afl_func(content, title, time) {
  $('#afl_focus').removeClass('afl_focus');
  $('#afl').remove();
  let tit = '';
  if (title != null) {
    tit = title;
  }
  let w = 90,
    l = 5;
  if (os.device == 'pc') {
    (w = 60), (l = 20);
  }
  let alert_content = `
    <div id='afl' class='alert_css Z_7 cant_select' style='width:${w}%;left:${l}%;'>
        <div class='alert_head float_left'>
            <div class='ML20 float_left'>温馨提示：<text class='ALERT_TITLE'>${tit}</text></div>
        </div>
        <div class='alert_body float_left'>
            <ul id='FFD_HWMC_UL ALERT_UL' class='ALERT_UL'>${content}</ul>
        </div>
        <div class='alert_foot float_left'>
            <div class='float_right' style='margin-right:25px;'>
                <button id='continue' class='button_css'>确定</button>
            </div>
        </div>
    </div>`;
  $('body').append(alert_content);
  if (time != null) {
    setTimeout(() => {
      $('#afl').remove();
    }, time);
  }
  $('#continue').focus();
  let afl_f = $('#afl');
  afl_f
    .on(os.click, '#continue', function (event) {
      event.preventDefault();
      afl_f.remove();
    })
    .on(os.click, '#AFL_DS', function () {
      $('#OS_SELECT_ALL').removeClass('hide');
      $('#' + os.content_focus)
        .find('.current')
        .removeClass('current')
        .addClass('tr_checked');
      os.check = true;
      afl_f.remove();
    })
    .on(os.click, '#AFL_DS_CANCEL', function () {
      $('#OS_SELECT_ALL,#OS_SELECT_NONE,#OS_PRINT').addClass('hide');
      $('#' + os.content_focus)
        .find('.tr_checked')
        .removeClass('tr_checked');
      os.check = false;
      afl_f.remove();
    });
}

function afc_func(content, title, WHERE) {
  $('#afc').remove();
  let T = '';
  if (title != null) {
    T = title;
  }
  let w = 90,
    l = 5;
  if (os.device == 'pc') {
    (w = 60), (l = 20);
  }
  let alert = `
    <div id='afc' class='alert_css os_content  cant_select dragable' style='width:${w}%;left:${l}%;'>
        <div class='alert_head float_left'>
            <div class='ML20 float_left'>温馨提示：<text class='ALERT_TITLE '>${T}</text></div>
            <div class='camera_icon ICON float_left  ML10' style='clear:left'></div>
            <div class='PREV prev_icon ICON float_left  ML10'></div>
            <div class='next_icon next_icon ICON float_left  ML10'></div>
            <div class='afc_replace replace_icon ICON float_left ML10'></div>
            <div id='afc_quote' class='HOVER float_left button' title='引用'><div class='quote_icon ICON '></div></div>
            <div id='afc_del' class=' delete_icon ICON float_left ML10'></div>
        </div>
        <div id='afc_content' class='alert_body float_left'>${content}</div>
        <div class='alert_foot float_left'>
            <div class='float_right' style='margin-right:25px;'>
                <button id='continue' class='button_css'>确定</button>
                <button id='cancel' class='button_css'>取消</button>
            </div>
        </div>
    </div>`;
  $('body').append(alert);
  let afc = $('#afc');
  $('#wfw').removeClass('hide');
  afc.find('#continue').focus();
  afc
    .on(os.click, '#cancel', function () {
      afc.remove();
      $('#wfw').addClass('hide');
    })
    .on(os.click, '.afc_replace', function () {
      if (os.device == 'pc') {
        let ss = $('#' + os.content_focus).attr('id');
        afc.remove();
        afc_func(
          `
                <label for='afc0'>列(多列用"/t"分开)</label><input type='text' id='afc0' class='get_area' /><br>
                <label for='afc1'>查找</label><input type='text' id='afc1'  /><br>
                <label for='afc2'>替换</label><input type='text' id='afc2'  /><br>
            `,
          '替换'
        );
        $('#wfw').addClass('hide');
        let afc1 = $('#alert_for_confirm');
        afc1.on(os.click, '#continue', function () {
          let s = $.trim($('#afc0').val()).split('/t');
          let trs = $('#' + os.content_focus).find('.tr_list');
          for (let i = 0; i < s.length - 1; i++) {
            for (let j = 0; j < os.table_data[ss].length; j++) {
              let t = os.table_data[ss][j][s[i]];

              os.table_data[ss][j][s[i]] = t.replace(
                $('#afc1').val(),
                $('#afc2').val()
              );
            }
            for (let k = 0; k < trs.length; k++) {
              let tds = trs.eq(k).find('td');
              let t = tds
                .eq(s[i])
                .text()
                .replace($('#afc1').val(), $('#afc2').val());
              tds.eq(s).text(t).attr('data-text', t);
            }
          }
        });
      }
    });
}

function afs_func(content) {
  $('#afs').remove();
  let w = 90,
    l = 5;
  if (os.device == 'pc') {
    (w = 60), (l = 20);
  }
  let alert = `
    <div id='afs' class='alert_css Z_7 os_content cant_select' style='width:${w}%;left:${l}%;'>
        <div class='alert_head float_left'>
            <div class='float_left'>
                <div class='ML20 float_left'>快速查找：<input type='text' id='afs_search' /></div>
                <div id='afs_plus' class='HOVER hide float_left' title='添加'><div class='replace_icon ICON'></div>
            </div>
            <div id='afs_select_all' class='HOVER float_left clear' title='全选'><div class='select_all_icon ICON '></div></div>
            <div id='afs_select_none' class='HOVER float_left hide' title='全否'><div class='select_none_icon ICON '></div></div>
            <div id='afs_not_zero' class='HOVER float_left ' title='不显示0'><div class='not_zero_icon ICON '></div></div>
            <div id='afs_zero' class='HOVER float_left hide' title='显示0'><div class='zero_icon ICON '></div></div>
        </div>
        <div id='afs_content' class='alert_body float_left'>${content}</div>
        <div class='alert_foot float_left'>
            <div class='float_right' style='margin-right:25px;'>
                <button id='continue' class='button_css'>确定</button>
                <button id='cancel' class='button_css'>取消</button>
            </div>
        </div>
    </div>`;
  $('body').append(alert);
  let afs = $('#afs');
  $('#afs_search').focus();
  let source = JSON.parse($('.afs_focus').attr('afs'));
  let where, attr;
  console.log(source);
  if (source.where != null) {
    where = source.where.split(',');
    attr = source.attr.split(',');
  }
  let id = $('.afs_focus').attr('id');
  let page_top = parseFloat(
    $('#' + os.content_focus)
      .find('.page_top')
      .text()
  );
  afs
    .on(os.click, '#cancel', function () {
      os.check = false;
      afs.remove();
      $('#editor').attr('afs', '');
    })
    .on('dblclick', '.current', function (event) {
      console.log(id.substring(0, 2));
      if (id.substring(0, 3) == 'afc') {
        for (let i = 0; i < where.length; i++) {
          let val =
            os.table_data[source.from][
              $('#afs_content').find('.current').attr('i')
            ][attr[i]];
          $('#afc' + where[i]).val(val);
          $('#afc' + where[i]).attr(
            'source_i',
            $('#afs_content').find('.current').attr('i')
          );
          $('#afc' + where[i]).attr('attr_i', attr[i]);
        }
      } else {
        for (let i = 0; i < where.length; i++) {
          let val =
            os.table_data[source.from][
              $('#afs_content').find('.current').attr('i')
            ][attr[i]];
          $('#' + os.content_focus + '_tt' + where[i]).val(val);
          $('#' + os.content_focus + '_tt' + where[i]).attr(
            'source_i',
            $('#afs_content').find('.current').attr('i')
          );
          $('#' + os.content_focus + '_tt' + where[i]).attr('attr_i', attr[i]);
        }
      }

      afs.remove();
    })
    .on('keydown', '.current', function (event) {
      let self = $(this);

      let this_content = $('.afs_focus').closest('.os_content');
      if (event.which == 39 || event.which == 40) {
        if (self.next().length > 0) {
          let next = self.next();
          $('.current').removeClass('current');
          next.addClass('current').focus();
        }
      } else if (event.which == 38 || event.which == 37) {
        if (self.prev().length > 0) {
          let prev = self.prev();
          $('.current').removeClass('current');
          prev.addClass('current').focus();
        }
      } else if (event.which == 13) {
        if (id == 'editor') {
          for (let i = 0; i < where.length; i++) {
            let val = os.table_data[source.from][self.attr('i')][attr[i]];
            $('#' + os.content_focus)
              .find('.td_selected')
              .closest('tr')
              .find('td')
              .eq(where[i])
              .text(val)
              .attr('data-text', val);
            os.table_data[os.content_focus][
              page_top +
                $('#' + os.content_focus)
                  .find('.td_selected')
                  .closest('tr')
                  .index()
            ][where[i]] = val;
          }
          $('#editor').attr('afs', '');
          os.trs_edited_index[os.content_focus].push(
            page_top +
              $('#' + os.content_focus)
                .find('.selected_tr')
                .index()
          );
        } else if (id.substring(0, 3) == 'afc') {
          for (let i = 0; i < where.length; i++) {
            let val =
              os.table_data[source.from][
                $('#afs_content').find('.current').attr('i')
              ][attr[i]];
            $('#afc' + where[i]).val(val);
            $('#afc' + where[i]).attr(
              'source_i',
              $('#afs_content').find('.current').attr('i')
            );
            $('#afc' + where[i]).attr('attr_i', attr[i]);
          }
        } else {
          for (let i = 0; i < where.length; i++) {
            let val =
              os.table_data[source.from][
                $('#afs_content').find('.current').attr('i')
              ][attr[i]];
            console.log('#' + os.content_focus + '_tt' + where[i], '#', val);

            $('#' + os.content_focus + '_tt' + where[i]).val(val);
            $('#' + os.content_focus + '_tt' + where[i]).attr(
              'attr_i',
              attr[i]
            );
          }
        }
        afs.remove();
      }
    })
    .on('keydown', '#afs_search', function (event) {
      if (event.which == 40) {
        $('.current').removeClass('current');
        $('#afs_content')
          .find('.card_list')
          .first()
          .addClass('current')
          .focus();
      }
    })
    .on(os.click, '#continue', function () {
      if ($('#afs').find('.current').length > 0) {
        if (id == 'editor') {
          for (let i = 0; i < where.length; i++) {
            let val =
              os.table_data[source.from][
                $('#afs_content').find('.current').attr('i')
              ][attr[i]];
            $('#' + os.content_focus)
              .find('.td_selected')
              .closest('tr')
              .find('td')
              .eq(where[i])
              .text(val)
              .attr('data-text', val);
            os.table_data[os.content_focus][
              page_top +
                $('#' + os.content_focus)
                  .find('.td_selected')
                  .closest('tr')
                  .index()
            ][where[i]] = val;
          }
          $('#editor').attr('afs', '');
          os.trs_edited_index[os.content_focus].push(
            page_top +
              $('#' + os.content_focus)
                .find('.selected_tr')
                .index()
          );
        } else if (id.substring(0, 3) == 'afc') {
          for (let i = 0; i < where.length; i++) {
            let val =
              os.table_data[source.from][
                $('#afs_content').find('.current').attr('i')
              ][attr[i]];
            $('#afc' + where[i]).val(val);
            $('#afc' + where[i]).attr(
              'source_i',
              $('#afs_content').find('.current').attr('i')
            );
            $('#afc' + where[i]).attr('attr_i', attr[i]);
          }
        } else {
          for (let i = 0; i < where.length; i++) {
            let val =
              os.table_data[source.from][
                $('#afs_content').find('.current').attr('i')
              ][attr[i]];
            $('#' + os.content_focus + '_tt' + where[i]).val(val);
            $('#' + os.content_focus + '_tt' + where[i]).attr(
              'source_i',
              $('#afs_content').find('.current').attr('i')
            );
            $('#' + os.content_focus + '_tt' + where[i]).attr(
              'attr_i',
              attr[i]
            );
          }
          //$(".afs_focus").val(os.table_data[source.from][$("#afs_content").find(".current").attr("i")][attr]);
        }
      } else {
        $('.afs_focus').val($('#afs_search').val());
      }

      afs.remove();
    })

    .on('keyup', '#afs_search', function (event) {
      let self = $(this);
      if (source.type == 'sql') {
      } else {
        let a = os.table_data[source.from].slice();
        let u = [];
        for (let i = 0; i < a.length; i++) {
          if (a[i].toString().indexOf(self.val()) > -1) {
            u.push(a[i]);
          }
        }
        $('#afs_content')
          .empty()
          .append(
            new_card(
              encode_card_array_from_array(os.card_key, u),
              'card',
              '',
              90
            )
          );
      }
    })
    .on('change', '#afs_search', function () {
      let self = $(this);

      let a = os.table_data[source.from].slice();
      let u = [];
      for (let i = 0; i < a.length; i++) {
        if (a[i].toString().indexOf(self.val()) > -1) {
          u.push(a[i]);
        }
      }
      $('#afs_content')
        .empty()
        .append(
          new_card(encode_card_array_from_array(os.card_key, u), 'card', '', 90)
        );
    })

    .on(os.click, '#afs_select_all', function () {
      $('#afs_select_all').toggleClass('hide');
      $('#afs_select_none').toggleClass('hide');
      afs.find('.card_list').addClass('tr_checked');
      os.check = true;
    })
    .on(os.click, '#afs_select_none', function () {
      os.check = true;
      $('#afs_select_all').toggleClass('hide');
      $('#afs_select_none').toggleClass('hide');
      afs.find('.card_list').removeClass('tr_checked');
    })
    .on(os.click, '#afs_not_zero', function () {
      $('#afs_zero').toggleClass('hide');
      $('#afs_not_zero').toggleClass('hide');
      let cts = afs.find('.card_text');
      for (let i = 0; i < cts.length; i++) {
        if (cts.eq(i).text() == '0.00') {
          cts.eq(i).closest('.card_list').addClass('hide');
        }
      }
    })
    .on(os.click, '#afs_zero', function () {
      $('#afs_zero').toggleClass('hide');
      $('#afs_not_zero').toggleClass('hide');
      let cts = afs.find('.card_text');
      for (let i = 0; i < cts.length; i++) {
        if (cts.eq(i).text() == '0.00') {
          cts.eq(i).closest('.card_list').removeClass('hide');
        }
      }
    });
}

function close_afc() {
  $('#afc').remove();
  $('#wfw').addClass('hide');
}
