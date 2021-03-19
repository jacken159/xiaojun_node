/*
import $ from 'jquery';
import { load_ajax } from './ajax';
import { rebulid_menu_mf, reflush_table, mf_body } from '/js/os_func';
import { afl_func, afc_func, close_afc } from '/js/os_alert';
import { os, xiaojun_db } from '/js/os_source.js';
import { fptg_fc_func } from '/os/os_hmgl.js'
import * as hmgl from '/os/os_hmgl';
*/
function nav() {
  $('#nav')
    .on('click', '#os_menu', function () {
      $('#side_nav').addClass('side_nav_move');
      $('#wfs').removeClass('hide');
      let a = os.card_data['mf'];
      console.log(a);
      rebulid_menu_mf(a);
    })
    .on('click', '#os_replace', function () {
      if (os.find_type === 'menu') {
        //new_os_replace();
      }
    })

    .on('click', '#os_back', function () {
      //os_back_func();
    })
    .on('click', '#OS_SELECT_ALL', function () {
      $('.CONTENT_FOCUS')
        .find('.card_list')
        .not('.hide')
        .addClass('tr_checked');
      $('#OS_SELECT_ALL').addClass('hide');
      $('#OS_SELECT_NONE').removeClass('hide');
    })
    .on('click', '#OS_SELECT_NONE', function () {
      $('.CONTENT_FOCUS').find('.tr_checked').removeClass('tr_checked');
      $('#OS_SELECT_ALL').removeClass('hide');
      $('#OS_SELECT_NONE').addClass('hide');
    })
    .on(os.click, '#os_reflush', function () {
      if (os.filtering == true) {
        os.filtering = false;
        xiaojun_db.getItem('mf_data').then((r) => {
          os.mf_data = r;
        });
      } else {
        console.log(os.content_focus, '#', $("#os_sssg").val())
        reflush_table(os.mf_data[os.content_focus]);
        /*
        os.load_type = 'select';
        os.load_table = os.content_focus;
        load_ajax().then(r => {
          os.mf_data[os.content_focus] = r;
          reflush_table(os.mf_data[os.content_focus]);
        })
        */
      }
      //eval(`hmgl.${os.content_focus}_func()`);
    })
    .on('change', '#os_sssg', function () {

      if (os.filtering == true) {
        os.filtering = false;
        xiaojun_db.getItem('mf_data').then((r) => {
          os.mf_data = r;
        });
      } else {
        console.log(os.target_func, '#', os.content_focus, '#', $("#os_sssg").val())
        if (isNaN(parseFloat(os.target_id.substring(os.target_id.length - 6)))) { } else {
          os.target_id = os.target_id.substring(0, os.target_id.length - 6) + $("#os_sssg").val();
        }
        console.log(`${os.target_func}(os.mf_data[os.target_id])`)
        //new_table(os.mf_data[os.content_focus]);
        eval(`${os.target_func}()`);
      }
      //eval(`hmgl.${os.content_focus}_func()`);
    })
    .on(os.click, '#OS_CHECK', function () {
      //afl("<button id='AFL_START_CHECK' class='button_css'>开始核对</button>按核对顺序排序,锁定已核对数据")
      if (os.check == true) {
        $('body').find('.tr_checked').removeClass('tr_checked');
        os.check = false;
        $(this).removeClass('BLUE');
      } else {
        os.check = true;
        $(this).addClass('BLUE');
      }
    })
    .on('keyup', '#os_quick', function (event) {
      let self = $(this);
      let cards = $('#' + os.content_focus).find('.card_list');

      if (cards.length > 0) {
        cards.addClass('hide');
        for (let i = 0; i < cards.length; i++) {
          if (cards.eq(i).find('.card_t').text().indexOf(self.val()) > -1) {
            cards.eq(i).removeClass('hide');
          }
        }
      } else {
        let a = os.temp_data[os.content_focus].slice();
        let u = [];
        for (let i = 0; i < a.length; i++) {
          if (a[i].toString().indexOf(self.val()) > -1) {
            u.push(a[i]);
          }
        }
        os.os_table_data[os.content_focus] = u;
        //reflush_table(content_focus);
      }
    })
    .on('focus', '#os_quick', function () {
      os.temp_data[os.content_focus] = os.os_table_data[
        os.content_focus
      ].slice();
    });

  $('body').on(os.click, '#wfs', function () {
    $('#side_nav').removeClass('side_nav_move');
    $('#wfs').addClass('hide');
  });
}
