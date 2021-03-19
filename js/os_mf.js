/*
import $ from 'jquery';
import { saveAs } from 'file-saver';
import { os } from '/js/os_source';
import { afc_func, afl_func, close_afc } from './os_alert';
import { xiaojun_db } from './os_source';
import { new_el } from './os_after';
import {
  get_fp,
  encode_array_to_option,
  recover,
  rebulid_menu_mf,
  mf_editor,
  reset_editor
} from './os_func';
import * as hmgl from '/os/os_hmgl';
import { load_ajax } from './ajax';
*/
function mf_func() {
  $('#side_nav')
    .on(os.click, '#new_mf', function () {
      let o = encode_array_to_option(os.mf_type);
      afc_func(
        `<input id='new_mf_input' type='text' placeholder='输入新模块' />
        <select id='new_mf_select'>${o}</select>`
      );
      $('#afc').on(os.click, '#continue', function () {
        (() => {
          return new Promise(r => {
            r(get_fp())
          })
        })().then(r => {
          let input = $('#new_mf_input').val();
          let select = $('#new_mf_select').val();
          if (input.length == 0) {
            afl_func('请录入名称');
          } else {
            let a = os.card_data['mf'];
            console.log(os.card_data['mf']);
            let u = [];
            for (let i = 0; i < os.card_key.length; i++) {
              u.push('');
            }
            u[0] = a.length;
            u[1] = r;
            u[2] = select;
            u[10] = input;
            a.push(u);
            xiaojun_db.setItem('mf', a);
            rebulid_menu_mf(a);
            close_afc();
          }
        });
      });
    })
    .on(os.click, '.menu_side', function () {
      console.log(os.card_data['mf']);
      mf_editor(os.card_data['mf'], 'mf');
    })
    .on(os.click, '.card_list', function () {
      let self = $(this);
      let ss = self.attr('idx');
      os.content_focus = ss;
      os.new_table_title = self.attr('t');
      os.new_table_type = self.attr('n');
      os.new_table_id = ss;
      os.target_id = ss;
      let d = new_mf_data();
      mf_body();
      eval(`${d.id}_func()`);

      $('#side_nav').removeClass('side_nav_move');
      $('#wfs').addClass('hide');
    })
    .on(os.click, '.download_icon', function () {
      afc_func(
        `<button id='side_backup'>备份</button><button id='side_recover'>恢复</button><button id='side_edit'>编辑</button>`
      );
      let afc = $('#afc');
      afc
        .on(os.click, '#side_backup', function () {
          xiaojun_db.getItem('mf').then((r) => {
            xiaojun_db.getItem('mf_data').then((r1) => {
              let j = {};
              let t = '';
              let j2 = {};
              Object.keys(r1).forEach(function (key) {
                j2[key] = r1[key];
                t += `"${key}":${JSON.stringify(r1[key])},`;
              });
              j['mf'] = r;
              j['mf_data'] = j2;

              //var blob = new Blob([/*"\uFEFF" +*/ JSON.stringify(j)], {
              var blob = new Blob([JSON.stringify(j)], {
                type: 'text/plain;charset=utf-8'
              });
              saveAs(blob, 'backup');
              //alert('backup');
            });
          });
        })
        .on(os.click, '#side_recover', function () {
          let t = '';
          t += `
					<div id='recover_drop' style='height: 100%;width: 100%;'>
					<input type="file" id="file_selector"  multiple>
					</br>拖放或点击上传恢复文件
					</div>
					`;
          $('#recover_upload').remove();
          new_el(
            'div',
            'recover_upload',
            '',
            t,
            'height: 90%;width: 90%;background-color: azure;position: absolute;left: 5%;top: 5%;z-index: 4;text-align: center;'
          );
          $('#recover_upload')
            .on('change', '#file_selector', function (e) {
              const fileList = event.target.files;
              console.log(fileList);
              console.log(e.target.result);
              var fr = new FileReader();
              fr.onload = function () {
                recover(fr.result);
              };

              fr.readAsText(this.files[0]);
            })
            .on('dragover', '#recover_drop', function (e) {
              e.stopPropagation();
              e.preventDefault();
            });
          var holder = document.getElementById('recover_drop');
          holder.ondrop = function (e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0],
              reader = new FileReader();
            reader.onload = function (event) {
              recover(event.target.result);
            };
            reader.readAsText(file);
          };

          console.log('recover');
        })
        .on(os.click, '#side_edit', function () {
          xiaojun_db.getItem('mf_data').then((r) => {
            let li = '';
            let a = [];
            Object.keys(r).forEach(function (key) {
              a.push(key);
            });
            Object.keys(r).forEach(function (key) {
              li += `<ul k='${key}' class='delable'>${key}`;
              for (let i = 0; i < a.length; i++) {
                if (key == a[i]) {
                  li += `
										<li>${JSON.stringify(r[key])}</li>
										`;
                }
              }
              li += `</ul>`;
            });
            afc_func(li);
            let afc = $('#afc');
            afc
              .on(os.click, '#continue', function () {
                close_afc();
                console.log('edit');
              })
              .on(os.click, 'ul.delable', function () {
                let self = $(this);
                let c = confirm('是否删除?');
                if (c == true) {
                  delete os.mf_data[self.attr('k')];
                  xiaojun_db.setItem('mf_data', os.mf_data);
                  self.remove();
                }
              });
          });
        });
    });

  $('body').on(os.click, '.os_content .menu_side', function () {
    let ss = $(this).closest('.os_content').attr('id');
    mf_editor(os.mf_data[ss], 'table_header');
    if ($("#swift").attr('class').indexOf('hide') == -1) {
      $("#afc").css('z-index', 6);
    }
  });
}

function mf_body() {
  let for_mf = '';
  let ss = os.target_id;
  let mf_d = os.mf_data[ss];
  if (mf_d.table_type == 'table') {
    let subtitle = mf_d.subtitle;
    if (mf_d.subtitle == null) {
      subtitle = '';
    }
    for_mf += `
		<div id='${mf_d.id}_header' class='content_header float_left'>
			<div id='${mf_d.id}_CRTL' class='_100'>
				<div class='float_left'>
					<text id='${mf_d.id}_title' class='head_title'>${mf_d.t}</text>
					<text id='${mf_d.id}_subtitle' class='head_subtitle'>${subtitle}</text>
					<text id='${mf_d.id}_status' class='head_status'></text>
					<div class='menu_side ICON' style='float:right'></div>
				</div>
				<div title='展开' class="MORE UNFOLD ICON hide float_right"></div>
				<div title='收藏' class="LESS UNFOLD ICON hide float_right"></div>
				<div id='${mf_d.id}table_toggle_on' class='HOVER hide float_left' title='切换'><span class='float_left'>切换</span><div class='toggle_on_icon icon_20 clear ML5'></div></div>
				<div id='${mf_d.id}table_toggle_off' class='HOVER float_left hide' title='切换'><span class='float_left'>切换</span><div class='toggle_off_icon icon_20 clear ML5'></div></div>
			</div>
			<div id="${mf_d.id}_tt" class='content_header_tt'>${mf_d.table_tt}</div>
		</div>
		<div id='${mf_d.id}_tree' class='tree_view overflow_94 float_left' style='${mf_d.tree_setting}'></div>
		<div id='${mf_d.id}_content' class='os_table_content float_left' style='${mf_d.table_setting}' >
			<div id='${mf_d.id}_table_chart' class='' style=''></div>
			<div id='${mf_d.id}_table_header' class='os_table_tt reflush_table_header' style='overflow-x:hidden;'></div>
			<div id='${mf_d.id}_table_body' class='table_ms overflow_94 reflush_table_body _100' style='overflow-x:auto' ></div>
			<div id='${mf_d.id}_table_nav' class='os_table_tt' style='overflow-x:hidden;'></div>
		</div>
	  `;
  } else if (mf_d.type === 'card') {
    console.log(2);
  }

  $('#' + mf_d.id).remove();
  new_el(
    'section',
    mf_d.id,
    `${mf_d.id} HMGL os_content os_content_css hide ${mf_d.tree_class} `,
    for_mf,
    `height:86%;width:100%;position: absolute;top: 40px; `,
    mf_d.new_table_place
  );
  $('.os_content').addClass('hide');
  $('#' + mf_d.id).removeClass('hide');

  $(`#${mf_d.id} .reflush_table_body`).on('scroll', function () {
    let self = $(this);
    $(`#${mf_d.id} .reflush_table_header`).scrollLeft(self.scrollLeft());
    reset_editor();
  });
}

function new_mf_data() {
  let d = os.mf_data[os.new_table_id];

  if (d == null) {
    d = {};
    d['t'] = os.new_table_title;
    d['subtitle'] = os.new_table_subtitle;
    d['id'] = os.new_table_id;
    d['table_type'] = os.new_table_type;
    if (os.new_table_type == 'tree') {
      d.tree_setting = 'position: relative; width: 19%; min-width: 190px;';
      d.table_setting = 'position: relative; width: 80%;';
      d.tree_class = 'tree_view';
    } else {
      d['tree_setting'] = '';
      d['table_setting'] = '';
    }
    d['td_len'] = 200;
    d['table_data'] = [];
    d['table_tt'] = '';
    d['table_header'] = [];
    d['row_type'] = '';
    d['cols_width'] = [];
    d['cols_hide'] = ['', 'hide', 'hide', 'hide', 'hide', 'hide'];
    d['cols_color'] = [];
    d['cols_format'] = [];
    d['cols_selector'] = [];
    d['table_filter'] = '1';
    d['table_add_cols'] = [];
    d['table_icon'] = '1';
    d['table_afs'] = [];
    d['table_fx'] = [];
    d['add_rows'] = '';
    d['cols_afs'] = '';

    d['nav_bottom'] = '1';
    d['status'] = '1';

    d['editor'] = '1';
    d['tr_input'] = '1';
    d['tr_sum'] = '1';
    d['copy'] = '1';
    d['paste'] = '1';
    d['print'] = '1';
    d['download'] = '1';
    d['pages_from'] = 'j';

    d['last_id'] = 0;

    d['enter_direction'] = 'down'; //down or right
    d['content_menu'] = ['插入', '复制', '复制(连标题)', '粘贴', '删除'];
    if (os.new_table_button == null || os.new_table_button.length == 0) {
      d['button'] = ['os_reflush', 'os_save'];
    } else {
      d['button'] = os.new_table_button;
    }

    /*
    os.load_type = 'new'
    os.load_table = new_mf_name
    os.load_data = d;
    load_ajax();
    */

    os.mf_data[os.new_table_id] = d;
    xiaojun_db.setItem('mf_data', os.mf_data);

    os.new_table_id = '';
    os.new_table_button = [];
    os.new_table_title = '';
    os.new_table_subtitle = '';
    os.new_table_type = '';
    os.trs_edited_index[os.new_table_id] = [];
  }

  return d;
}
