
function UrmevFSdquWjKrYYVMJW_func() {
  os.target_func = 'UrmevFSdquWjKrYYVMJW_func';
  let ss = 'UrmevFSdquWjKrYYVMJW';
  os.content_focus = ss;

  new_table(os.mf_data[ss]);
  reflush_table(os.mf_data[ss]);
  os.table_histroy.push(ss);
  if (os.mf_data[ss].content_menu.length == 5) {
    os.mf_data[ss].content_menu.push(
      '',
      '发票统计',
      '导入销项',
      '录入进项',
      '增值税明细'
    );
  }

  $('#' + ss).on(os.click, '#content_menu li', function () {
    let self = $(this);
    let this_tr = $('#' + os.content_focus)
      .find('.td_selected')
      .closest('tr');

    let current = this_tr.find('td').eq(7);
    if (self.text() == '发票统计') {
      console.log(os.content_focus)
      os.fptg = {};
      let mf_t = ss + current.attr('td-t') + $('#os_sssg').val();
      let d = os.mf_data[mf_t];
      if (os.mf_data[mf_t] == null) {
        os.new_table_id = mf_t;
        os.new_table_title = self.text();
        os.new_table_type = 'table';
        os.new_table_button = [
          'os_edit',
          'os_plus',
          'os_reflush',
          'os_print',
          'os_match',
          'os_e',
          'os_sssg',
          'os_save',
        ];
        d = new_mf_data();

      }



      let fl_t = ss + current.attr('td-t') + '分类';
      if (os.mf_data[fl_t] == null) {
        os.new_table_id = fl_t;
        os.new_table_title = fl_t;
        os.new_table_type = 'table';
        let d = new_mf_data();
        d.table_header = ['1', '2', '3', '4', '5', '6', '7', '8'];
      }

      os.mf_data[mf_t].subtitle = current.attr('td-t');
      os.fptg.fl_t = fl_t;
      os.target_id = mf_t;
      mf_body();
      fptg_func();

    } else if (self.text() == '增值税明细') {
      let mf_t = ss + current.attr('td-t') + self.text();
      let d = os.mf_data[mf_t];
      if (os.mf_data[mf_t] == null) {
        os.new_table_id = mf_t;
        os.new_table_title = self.text();
        os.new_table_type = 'table';
        os.new_table_button = [
          'os_edit',
          'os_plus',
          'os_reflush',
          'os_print',
          'os_match',
          'os_e',
          'os_save',
        ];
        d = new_mf_data();
      }

      os.mf_data[mf_t].subtitle = current.attr('td-t');
      mf_body();
      jjs_func(mf_t);
    }
  });

  $("#nav").on(os.click, '#os_e', function () {
    console.log(os.content_focus)
    if (os.mf_data[os.content_focus].t == '发票统计') {
      afl_func(`
        <button class='afl_flwj button_css'>分类汇总</button>
        <button class='afl_cj button_css'>产值</button>
      `);
      let afl = $('#afl');
      afl
        .on(os.click, '.afl_flwj', function () {
          afl.remove();
          afc_func(`
          <label for='flwj_mc_i'>名称列</label><input id='flwj_mc_i' type='text' value='20' /></br>
          <label for='flwj_ga_i'>金额列</label><input id='flwj_ga_i' type='text' value='25' /></br>
          <label for='flwj_sg_i'>税金列</label><input id='flwj_sg_i' type='text' value='27' /></br>
          <label for='flwj_hg_i'>合计列</label><input id='flwj_hg_i' type='text' value='29' /></br>
          <label for='flwj_hwmc_i'>客户名称列</label><input id='flwj_hwmc_i' type='text' value='13' /></br>
          <label for='flwj_kwg_i'>规格列</label><input id='flwj_kwg_i' type='text' value='21' /></br>
          <label for='flwj_sl_i'>数量列</label><input id='flwj_sl_i' type='text' value='23' /></br>
          <label for='flwj_fl_i'>分类列</label><input id='flwj_fl_i' type='text' value='9' /></br>
        
        `);
          let afc = $('#afc');
          afc.on(os.click, '#continue', function () {
            let j = {};
            let ips = afc.find('input');
            for (let i = 0; i < ips.length; i++) {
              j[
                ips.eq(i).attr('id').substring(5, ips.eq(i).attr('id').length)
              ] = ips.eq(i).val();
            }
            table_flwj(j);
          });
        })
        .on(os.click, '.afl_cj', function () {
          console.log(os.mf_data[mf_t])
          let j = { 'mc_i': 20, 'ga_i': 25, 'sg_i': 27, 'hg_i': 29, 'hwmc_i': 13, 'kwg_i': 21, 'sl_i': 23, 'fl_i': 9 };
          table_flwj(j).then(r => {
            $("#afl").remove()

            let mf_t = os.mf_data[os.content_focus].t + os.mf_data[os.content_focus].subtitle + $('#os_sssg').val();
            let d = os.mf_data[mf_t];
            if (os.mf_data[mf_t] == null) {
              os.new_table_title = mf_t;
              os.new_table_type = 'table';
              os.new_table_id = mf_t;
              os.new_table_button = [
                'os_edit',
                'os_plus',
                'os_reflush',
                'os_print',
                'os_match',
                'os_e',
                'os_save'
              ];
              d = new_mf_data();
            }
            os.mf_data[mf_t].subtitle = '产值';
            set_swift('close');
            os.table_histroy.push(mf_t);
            mf_body();
            new_table(os.mf_data[mf_t]);

          });
        });
    }
  })
    .on(os.click, '#os_match', function () {
      if (os.mf_data[os.content_focus].t == '发票统计') {
        let a = os.mf_data[os.content_focus];
        console.log(a)
        let sssg = $('#os_sssg').val();
        let fl_a = os.mf_data[os.fptg.fl_t].table_data;
        let u = [];
        for (let i = 0; i < fl_a.length; i++) {
          for (let j = 0; j < a.table_data.length; j++) {
            a.table_data[j][6] = a.subtitle;
            a.table_data[j][10] = sssg;
            if (a.table_data[j][31] == fl_a[i][6]) {
              a.table_data[j][9] = fl_a[i][7];
            }
            if (a.table_data[j][9] == '') {
              u.push(a.table_data[j][31])
            }
          }

        }
        let u_set = [...new Set(u)];
        let h = os.mf_data[os.fptg.fl_t].table_header;
        for (let i = 0; i < u_set.length; i++) {
          let u1 = [];
          for (let j = 0; j < h.length; j++) {
            u1.push('')
          }
          u1[6] = u_set[i];
        }
        fl_a.push(u_set)

        reflush_table(a);
        xiaojun_db.setItem('mf_data', os.mf_data);
      }
    })
    .on(os.click, '#os_edit', function () {
      if (os.mf_data[os.content_focus].t == '发票统计') {
        let ss = os.content_focus;
        afl_func(`
        <button id='afl_fl' class='button_css'>分类</button>
        <button id='afl_fc' class='button_css'>库存</button>
      `);
        let afl = $('#afl');
        afl.on(os.click, '#afl_fl', function () {
          $("#swift").attr('from', ss)
          let d = os.mf_data[os.fptg.fl_t];
          d.new_table_place = 'swift';
          os.target_id = os.fptg.fl_t;
          //new_table(d)
          mf_body();
          reflush_table(os.mf_data[os.fptg.fl_t]);
          $('#swift').removeClass('hide');
          $('#' + os.content_focus).removeClass('hide');
          afl.remove();
        }).on(os.click, '#afl_fc', function () {
          let mf_t = os.content_focus +
            os.mf_data[os.content_focus].t +
            os.mf_data[os.content_focus].subtitle + $("#os_sssg").val() + '库存';
          let d = os.mf_data[mf_t];
          if (os.mf_data[mf_t] == null) {
            os.new_table_title = mf_t;
            os.new_table_type = 'table';
            os.new_table_id = mf_t;
            d = new_mf_data();
            d.table_header = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
          }
          d.new_table_place = 'swift';
          os.target_id = mf_t;
          //new_table(d)
          mf_body();
          fptg_fc_func(mf_t)
          afl.remove();
        });
      }
    })
}
function fptg_func() {
  os.target_func = 'fptg_func'
  let ss = os.target_id;
  os.content_focus = os.target_id;
  console.log(os.content_focus, '#', os.mf_data[ss]);
  //os.mf_data[ss].table_cs = { i: [10, 6], v: ($('#os_sssg').val() + os.mf_data.fptg.subtitle) }
  mf_body(os.mf_data[ss])
  new_table(os.mf_data[ss]);
  reflush_table(os.mf_data[ss]);
  os.table_histroy.push(ss);
  $('#os_menu').addClass('hide');
  $('#os_back').removeClass('hide');

  $('#' + ss).on({
    'dragover dragenter': function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    drop: function (e) {
      $('#bar').removeClass('hide');
      new Promise((r) => {
        let dataTransfer = e.originalEvent.dataTransfer;
        if (dataTransfer && dataTransfer.files.length) {
          e.preventDefault();
          e.stopPropagation();
          $.each(dataTransfer.files, function (i, file) {
            let reader = new FileReader();
            console.log(file);
            reader.fileName = file.name;
            reader.onload = function (event) {
              var data = new Uint8Array(event.target.result);
              var wb = XLSX.read(data, { type: 'array' }); //array

              // Loop Over Each Sheet
              wb.SheetNames.forEach(function (sheetName) {
                // Obtain The Current Row As CSV
                //var sCSV = XLSX.utils.make_csv(wb.Sheets[sheetName]);

                var excel_data = XLSX.utils.sheet_to_row_object_array(
                  wb.Sheets[sheetName]
                );
                //console.log(excel_data)
                //var excel_data = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
                let a = [];
                let I = 0;
                Object.keys(excel_data).forEach(function (key) {
                  a[I] = [];
                  Object.keys(excel_data[key]).forEach(function (key1) {
                    a[I].push(excel_data[key][key1]);
                  });
                  I++;
                });
                for (let i = 0; i < a.length; i++) {
                  for (let j = 0; j < 11; j++) {
                    a[i].splice(0, 0, '');
                    //a[i].splice(19,0,'');
                  }
                }
                os.mf_data['for_excel'] = a;
                let a1 = [];
                for (let i = 0; i < a.length; i++) {
                  if (a[i][19] == null) {
                    a[i][19] = '';
                  }

                  if (
                    a[i][11].indexOf('资料区间') > -1 ||
                    a[i][11].indexOf('发票类别') > -1 ||
                    a[i][11].indexOf('发票代码') > -1 ||
                    a[i][19].indexOf('小计') > -1 ||
                    a[i][11].indexOf('小计') > -1 ||
                    a[i][11].indexOf('份数') > -1 ||
                    a[i][19].indexOf('详见销货清单') > -1
                  ) {
                  } else {
                    a1.push(a[i]);
                  }
                }
                let a2 = a1.slice();
                for (let i = 0; i < a2.length; i++) {
                  if (a2[i][20] == null) {
                    for (let j = 20; j < 29; j++) {
                      a2[i][j] = a2[i][j - 9];
                      a2[i][j - 9] = '';
                    }
                    //a2[i][20] = a2[i][21];
                  }
                  if (a2[i][25] == null) {
                    for (let j = 28; j > 20; j--) {
                      a2[i][j] = a2[i][j - 4];
                    }
                    a2[i][18] = a2[i][16];
                    a2[i][17] = a2[i][15];
                    a2[i][15] = '';
                    a2[i][16] = '';
                    a2[i][20] = a2[i][21];
                    a2[i][21] = '';
                  }

                  if (a2[i][27] == null) {
                    for (let j = 28; j > 20; j--) {
                      a2[i][j] = a2[i][j - 2];
                    }
                    a2[i][20] = a2[i][21];
                    a2[i][21] = '';
                  }

                  if (a2[i][28] == null || a2[i][28] == '') {
                    for (let j = 28; j > 19; j--) {
                      a2[i][j] = a2[i][j - 1];
                    }
                    //a2[i][20] = a2[i][21];
                    //a2[i][21] = '';
                  }

                  if (a2[i][20] == '') {
                    a2[i][20] = a2[i][21];
                    a2[i][21] = '';
                  }
                  a2[i][31] = a2[i][20] + a2[i][21];
                }

                //console.log(a2);
                r(a2);
              });
            };
            reader.readAsArrayBuffer(file);
          });
        }
      }).then((r) => {
        $('#bar').addClass('hide');
        //wt_hj_fctg_get()

        os.mf_data[ss].table_data = r;
        reflush_table(os.mf_data[ss]);

        xiaojun_db.setItem('mf_data', os.mf_data);
        //console.log(r)
      });
    }
  });
}

function jjs_func(mf_t) {
  let ss = mf_t;
  os.table_histroy.push(ss);
  $('#os_menu').addClass('hide');
  $('#os_back').removeClass('hide');
  os.mf_data[ss].table_fx = [
    { text: 'f7*f14', key: [7, 14], where: 13, len: 4, direction: 'h' },
    { text: 'f8-f9-f10', key: [8, 9, 10], where: 11, len: 4, direction: 'h' },
    { text: 'f11/f7', key: [11, 7], where: 12, len: 4, direction: 'h' },
    { range: [-1, 0], key: [7], where: 18, len: 4, direction: 'v' }
  ];
  /*
    os.mf_data[ss].table_fx=[
        { "text": "f15/f8", "key": [15, 8], "where": 14, },
        { "text": "f7-f14", "key": [7, 14], "where": 16, },
        { "text": "f9-f15", "key": [9, 15], "where": 17, },
    ]
    */
  new_table(os.mf_data[ss]);
  reflush_table(os.mf_data[ss]);
}

function fptg_fc_func(mf_t) {

  console.log(os.content_focus)
  let from = os.content_focus;
  $("#swift").attr('from', from);
  $("#swift").find('.os_content').css("position", 'relative')
  let ss = mf_t;
  os.content_focus = ss;

  mf_body()
  reflush_table(os.mf_data[mf_t]);
  $('#swift').removeClass('hide');
  $('#' + from).removeClass('hide');


  $('#' + ss).on({
    'dragover dragenter': function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    drop: function (e) {
      $('#bar').removeClass('hide');
      new Promise((r) => {
        let dataTransfer = e.originalEvent.dataTransfer;
        if (dataTransfer && dataTransfer.files.length) {
          e.preventDefault();
          e.stopPropagation();
          $.each(dataTransfer.files, function (i, file) {
            let reader = new FileReader();
            console.log(file);
            reader.fileName = file.name;
            reader.onload = function (event) {
              var data = new Uint8Array(event.target.result);
              var wb = XLSX.read(data, { type: 'array' }); //array

              wb.SheetNames.forEach(function (sheetName) {
                var excel_data = XLSX.utils.sheet_to_row_object_array(
                  wb.Sheets[sheetName]
                );
                //console.log(excel_data)
                //var excel_data = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
                let a = [];
                let I = 0;
                Object.keys(excel_data).forEach(function (key) {
                  a[I] = [];
                  Object.keys(excel_data[key]).forEach(function (key1) {
                    a[I].push(excel_data[key][key1]);
                  });
                  I++;
                });
                for (let i = 0; i < a.length; i++) {
                  a[i].splice(0, 3);
                  for (let j = 0; j < 7; j++) {
                    a[i].splice(0, 0, '');
                  }
                }
                console.log(a)
                r(a);
              });
            };
            reader.readAsArrayBuffer(file);
          });
        }
      }).then((r) => {
        $('#bar').addClass('hide');
        //wt_hj_fctg_get()

        os.mf_data[ss].table_data = r;
        reflush_table(os.mf_data[ss]);

        xiaojun_db.setItem('mf_data', os.mf_data);
        console.log(ss)
        $("#" + ss).css('top', '0')
      });

    }
  });

  $("#swift").on(os.click, "#swift_match", function () {
    let from = $("#swift").attr("from");
    if (os.content_focus.indexOf('库存') > -1) {
      let a = os.mf_data[os.content_focus].table_data;
      let fl_a = os.mf_data[os.fptg.fl_t].table_data;
      let a_set = get_unique_from_table(a, 7, 'asc');
      let empty_a = []
      let h = os.mf_data[os.fptg.fl_t].table_header;
      if (fl_a.length > 0) {
        for (let i = 0; i < fl_a.length; i++) {
          for (let j = 0; j < a.length; j++) {
            if (fl_a[i][6] == a[j][7]) {
              a[j][6] = fl_a[i][7];
            }
            //console.log(a[j][6])
            if ($.trim(a[j][6]) == '') {
              empty_a.push(j)
            }
          }
        }
        //console.log(empty_a)

        let u = []
        for (let i = 0; i < empty_a.length; i++) {
          for (let j = 0; j < h.length; j++) {
            u.push('');
          }
          u[6] = a_set[empty_a[i]];
          fl_a[empty_a[i]].push(u);
        }

      } else {
        for (let i = 0; i < a_set.length; i++) {
          let u = []
          for (let j = 0; j < h.length; j++) {
            u.push('');
          }
          u[6] = a_set[i];
          fl_a.push(u);
        }
      }

      xiaojun_db.setItem('mf_data', os.mf_data);
      reflush_table(os.mf_data[os.content_focus])

    }
  })
}