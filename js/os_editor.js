/*
import $ from 'jquery';
import { afs_func } from '/js/os_alert';
import { os,xiaojun_db } from '/js/os_source.js';
import {
  set_editor,
  set_mover,
  new_row,
  os_table_data_add_row,
  renew_i,
  get_sum, update_td
} from '/js/os_func.js';
*/
function editor_func(SS) {
  var editor = $('#editor');
  var fm_selector = $('#fm_selector');

  //console.log('1')
  $('body')
    .on('keydown', '#editor', function (event) {
      let current = $('.td_selected');
      let [self, this_tr, index, this_content] = [
        $(this),
        current.closest('tr'),
        current.index(),
        current.closest('.os_content')
      ];
      let this_object = current.closest('.os_bg_object');
      let ss = this_content.attr('id');

      if (event.shiftKey && event.which == 37) {
        //left
        event.preventDefault();
        event.stopPropagation();
        console.log('1');
        if (index == this_tr.find('td:not(.hide)').eq(1).index()) {
          console.log('1.1');
          if (this_tr.prev().length > 0) {
            current.removeClass('td_selected');
            this_tr.prev().find('td:not(.hide)').last().addClass('td_selected');
            set_editor(
              this_tr.prev().find('td:not(.hide)').last(),
              -1,
              -1,
              -1,
              -1
            );
            set_mover(this_tr.prev().find('td:not(.hide)').last(), 8, 8);
          }
        } else {
          console.log('1.2');
          if (current.prev().length > 0) {
            //console.log("1.2.1")
            for (let i = index; i > -1; i--) {
              let I = 0;
              if (
                this_tr
                  .find('td')
                  .eq(i - 1)
                  .hasClass('hide') ||
                this_tr
                  .find('td')
                  .eq(i - 1)
                  .hasClass('disabled')
              ) {
              } else {
                //console.log("1.2.1.1")
                I = i - 1;
                let C = this_tr.find('td').eq(I);
                current.removeClass('td_selected');
                C.addClass('td_selected');
                set_editor(C, -1, -1, -1, -1);
                set_mover(C, 8, 8);

                break;
              }
            }
          }
        }
      } else if (event.which == 13) {
        //enter
        event.preventDefault();
        event.stopPropagation();
        if (os.mf_data[ss].enter_direction == 'down') {
          if (this_tr.next().length > 0) {
            if (this_tr.next().hasClass('tr_input')) {
              os_table_data_add_row(os.mf_data[ss].table_data.length);
              let content = new_row(
                os.mf_data[ss],
                'empty',
                '',
                '',
                'tr_list tr_new tr_edited new_row_from_tr_input',
                os.mf_data[ss].table_data.length - 1
              );
              $('#tr_input').before(content);
              this_content.find('.td_selected').removeClass('td_selected');
              this_content
                .find('.tr_list')
                .last()
                .find('td')
                .eq(index)
                .addClass('td_selected');

              set_editor(this_content.find('.td_selected'), -1, -1, -1, -1);
              set_mover(this_content.find('.td_selected'), 8, 8);
              renew_i(os.mf_data[ss]);
            } else {
              current.removeClass('td_selected');
              this_tr.next().find('td').eq(index).addClass('td_selected');
              set_editor(this_tr.next().find('td').eq(index), -1, -1, -1, -1);
              set_mover(this_tr.next().find('td').eq(index), 8, 8);
            }
          }
        } else if (os.mf_data[ss].enter_direction == 'right') {
          if (this_object.length > 0) {
          } else {
            for (let i = index; i < this_tr.find('td').length; i++) {
              if (i == this_tr.find('td').last().index()) {
                //console.log("2")
                //console.log(PARENT_TR.find("td").length)
                if (this_tr.next().length > 0) {
                  //console.log("3")
                  for (let j = 0; j < this_tr.next().find('td').length; j++) {
                    if (
                      this_tr.next().find('td').eq(j).hasClass('disabled') ||
                      this_tr.next().find('td').eq(j).hasClass('hide')
                    ) {
                    } else {
                      current.removeClass('td_selected');
                      this_tr.next().find('td').eq(j).addClass('td_selected');
                      set_editor(
                        this_tr.next().find('td').eq(j),
                        -1,
                        -1,
                        -1,
                        -1
                      );
                      set_mover(this_tr.next().find('td').eq(j), 8, 8);
                      fm_selector.width(0).height(0);
                      fm_selector.offset({ top: 0, left: 0 });

                      break;
                    }
                  }
                }
              } else {
                //console.log("4")
                if (this_tr.find('td').eq(i + 1).length > 0) {
                  //console.log("5");
                  if (
                    this_tr
                      .find('td')
                      .eq(i + 1)
                      .hasClass('disabled') ||
                    this_tr
                      .find('td')
                      .eq(i + 1)
                      .hasClass('hide')
                  ) {
                  } else {
                    //console.log("6");
                    current.removeClass('td_selected');
                    this_tr
                      .find('td')
                      .eq(i + 1)
                      .addClass('td_selected');
                    set_editor(this_tr.find('td').eq(i + 1), -1, -1, -1, -1);
                    set_mover(this_tr.find('td').eq(i + 1), 8, 8);
                    fm_selector.width(0).height(0);
                    fm_selector.offset({ top: 0, left: 0 });

                    break;
                  }
                }
              }
            }
            return false;
          }
        }
      } else if (event.which == 9) {
        //console.log("1")
        if (this_object.length > 0) {
        } else {
          for (let i = index; i < this_tr.find('td').length; i++) {
            if (i == this_tr.find('td').last().index()) {
              //console.log("2")
              //console.log(PARENT_TR.find("td").length)
              if (this_tr.next().length > 0) {
                //console.log("3")
                for (let j = 0; j < this_tr.next().find('td').length; j++) {
                  if (
                    this_tr.next().find('td').eq(j).hasClass('disabled') ||
                    this_tr.next().find('td').eq(j).hasClass('hide')
                  ) {
                  } else {
                    current.removeClass('td_selected');
                    this_tr.next().find('td').eq(j).addClass('td_selected');
                    set_editor(this_tr.next().find('td').eq(j), -1, -1, -1, -1);
                    set_mover(this_tr.next().find('td').eq(j), 8, 8);
                    fm_selector.width(0).height(0);
                    fm_selector.offset({ top: 0, left: 0 });

                    break;
                  }
                }
              }
            } else {
              //console.log("4")
              if (this_tr.find('td').eq(i + 1).length > 0) {
                //console.log("5");
                if (
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .hasClass('disabled') ||
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .hasClass('hide')
                ) {
                } else {
                  //console.log("6");
                  current.removeClass('td_selected');
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .addClass('td_selected');
                  set_editor(this_tr.find('td').eq(i + 1), -1, -1, -1, -1);
                  set_mover(this_tr.find('td').eq(i + 1), 8, 8);
                  fm_selector.width(0).height(0);
                  fm_selector.offset({ top: 0, left: 0 });

                  break;
                }
              }
            }
          }
          return false;
        }
      } else if (event.which == 27) {
        //esc
        editor.offset({ top: 0, left: 0 });
        editor.width(0).height(0);
        fm_selector.width(0).height(0);
        fm_selector.offset({ top: 0, left: 0 });

        current.focus();
        current.text(os.o_val).attr('td-t', os.o_val);
        os.mf_data[ss].table_data[os.otr_index][os.otd_index] = os.o_val;
      } else if (event.which == 37) {
        //left
        if (self.GETCURSORPOSITION() == 0) {
          //console.log("1")
          if (index == this_tr.find('td:not(.hide)').eq(1).index()) {
            //console.log("1.1")
            if (this_tr.prev().length > 0) {
              current.removeClass('td_selected');
              this_tr
                .prev()
                .find('td:not(.hide)')
                .last()
                .addClass('td_selected');
              set_editor(
                this_tr.prev().find('td:not(.hide)').last(),
                -1,
                -1,
                -1,
                -1
              );
              set_mover(this_tr.prev().find('td:not(.hide)').last(), 8, 8);
            }
          } else {
            //console.log("1.2")
            if (current.prev().length > 0) {
              //console.log("1.2.1")
              for (let i = index; i > -1; i--) {
                let I = 0;
                if (
                  this_tr
                    .find('td')
                    .eq(i - 1)
                    .hasClass('hide') ||
                  this_tr
                    .find('td')
                    .eq(i - 1)
                    .hasClass('disabled')
                ) {
                } else {
                  //console.log("1.2.1.1")
                  I = i - 1;
                  let C = this_tr.find('td').eq(I);
                  current.removeClass('td_selected');
                  C.addClass('td_selected');
                  set_editor(C, -1, -1, -1, -1);
                  set_mover(C, 8, 8);

                  break;
                }
              }
            }
          }
        }
      } else if (event.which == 38) {
        //up
        if (this_tr.prev().length > 0) {
          current.removeClass('td_selected');
          this_tr.prev().find('td').eq(index).addClass('td_selected');
          set_editor(this_tr.prev().find('td').eq(index), -1, -1, -1, -1);
          set_mover(this_tr.prev().find('td').eq(index), 8, 8);
        }
      } else if (event.which == 39) {
        //right
        if (self.GETCURSORPOSITION() == current.text().length) {
          for (let i = index; i < this_tr.find('td').length; i++) {
            if (i == this_tr.find('td').last().index()) {
              if (this_tr.next().length > 0) {
                for (let j = 0; j < this_tr.next().find('td').length; j++) {
                  if (
                    this_tr.next().find('td').eq(j).hasClass('disabled') ||
                    this_tr.next().find('td').eq(j).hasClass('hide')
                  ) {
                  } else {
                    current.removeClass('td_selected');
                    this_tr.next().find('td').eq(j).addClass('td_selected');
                    set_editor(this_tr.next().find('td').eq(j), -1, -1, -1, -1);
                    set_mover(this_tr.next().find('td').eq(j), 8, 8);

                    break;
                  }
                }
              }
            } else {
              if (this_tr.find('td').eq(i + 1).length > 0) {
                if (
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .hasClass('disabled') ||
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .hasClass('hide')
                ) {
                } else {
                  current.removeClass('td_selected');
                  this_tr
                    .find('td')
                    .eq(i + 1)
                    .addClass('td_selected');
                  set_editor(this_tr.find('td').eq(i + 1), -1, -1, -1, -1);
                  set_mover(this_tr.find('td').eq(i + 1), 8, 8);

                  break;
                }
              }
            }
          }
        }
      } else if (event.which == 40) {
        //down
        if (fm_selector.width() > 0) {
          $('#CS_FM_LIST').find('li').first().focus().addClass('FM_SELECT');
        } else {
          //PARENT_TR.next().find("." + $(this).attr("class")).focus();
          if (this_tr.next().length > 0) {
            if (
              this_tr.next().find('td').eq(index).hasClass('disabled') ||
              this_tr.next().find('td').eq(index).hasClass('hide')
            ) {
            } else {
              current.removeClass('td_selected');
              this_tr.next().find('td').eq(index).addClass('td_selected');
              set_editor(this_tr.next().find('td').eq(index), -1, -1, -1, -1);
              set_mover(this_tr.next().find('td').eq(index), 8, 8);
            }
          }
        }
      }
      //RENEW_I();
    })
    .on('keyup', '#editor', function () {
      let this_content = $(`#${os.content_focus}`),
        ss = this_content.attr('id');
      let current = $('.td_selected'),
        self = $(this),
        index = current.index();
      let this_tr = current.closest('.tr_list');

      if (current.find('select').length > 0) {
      } else {
        /*
                    if (os.mf_data[ss].headers[index].fm_selector != null) {
                        if (os_table[ss].headers[index].fm_selector.length > 0) {
                            if (os_table[ss].headers[index].fm_selector[0].type == "date") { } else {
                                $("#datepicker").offset({ top: 0, left: 0 });
                                $("#datepicker").width(0).height(0);
                            }
                        }
                    }
                    */

        current.text(self.val()).attr('td-t', self.val());

        let row_i = this_tr.find('td').first().attr('i');
        console.log('#', row_i, '#', os.otd_index);

        os.mf_data[ss].table_data[row_i][os.otd_index] = self.val();
        xiaojun_db.setItem('mf_data', os.mf_data);

        //update_td(ss, self.val(), row_i, os.otd_index);

        //os.trs_edited_index[ss].push(os.otr_index);
        //trs_edited_index[ss].push(parseFloat(this_content.find('.page_top').text()) + current.closest("tr").index());
      }
    })
    .on('keyup', '#editor', function () {
      //advance

      let this_content = $(`#${os.content_focus}`),
        ss = this_content.attr('id');
      let [current, self, tr_input] = [
        $(`#${os.content_focus}`).find('.td_selected'),
        $(this),
        $('#tr_input')
      ];
      let [this_tr, index] = [current.closest('tr'), current.index()];
      let page_top = parseFloat(this_content.find('.page_top').text());
      let this_tr_index = this_tr.index() + page_top;
      let fx = os.mf_data[ss].table_fx;

      if (fx.length > 0) {
        for (let i = 0; i < fx.length; i++) {
          if (fx[i].direction == 'h') {
            let fx_text = fx[i].text,
              fx_where = fx[i].where;
            for (let j = 0; j < fx[i].key.length; j++) {
              if (fx[i].key[j] == index) {
                fx_text = fx_text.replace('f' + fx[i].key[j], self.val());
              } else {
                fx_text = fx_text.replace(
                  'f' + fx[i].key[j],
                  os.mf_data[ss].table_data[page_top + this_tr_index][
                  fx[i].key[j]
                  ]
                );
              }
            }
            //console.log(fx_text)
            if ($.trim(self.val()) != '') {
              let fx_text_eval = fx_text.toString().replace(/,/g, '');
              let res = eval(fx_text_eval);

              os.mf_data[ss].table_data[page_top + this_tr_index][
                index
              ] = self.val();
              os.mf_data[ss].table_data[page_top + this_tr_index][
                fx_where
              ] = res.toFixed(fx[i].len);
              this_tr
                .find('td')
                .eq(fx_where)
                .text(res.toFixed(fx[i].len))
                .attr('td-t', res.toFixed(fx[i].len));
            }
          } else if (fx[i].direction == 'v') {
          }

          if (os.mf_data[ss].tr_sum == '1') {
            get_sum(os.mf_data[ss]);
          }
        }
      }
    })
    .on('focus', '#editor', function () {
      let [current, self] = [$('.td_selected'), $(this)];
      let this_tr = current.closest('tr');
      let this_content = current.closest('.os_content');
      let page_top = parseFloat(this_content.find('.page_top').text());
      os.otd_index = current.index();

      os.otr_index = page_top + this_tr.index();

      //alert(os.otd_index);alert(os.otr_index) //OK
      os.o_val = self.val();
      let afs = self.attr('afs');
      if (afs != null) {
        if (afs.length > 0) {
          self.addClass('afs_focus');
          let afs_source = JSON.parse(afs);
          if (afs_source.type != null) {
            afs_func(new_card([], 'card', '', 90));
            $('#afs_plus').removeClass('hide');
          } else {
            afs_func(
              new_card(
                encode_card_array_from_array(
                  os_card_key,
                  os_table_data[afs_source.from]
                ),
                'card',
                '',
                90
              )
            );
          }
          //console.log(os_table_data[afs_source.from])

          if (self.closest('div').hasClass('card_tt')) {
            self.closest('div').removeClass('_6');
          }
        }
      }
    })
    .on('change', '#editor', function () {
      let this_content = $(`#${os.content_focus}`),
        ss = this_content.attr('id');
      //console.log(this_content, "#", ss)
      let current = this_content.find('.td_selected'),
        this_tr = current.closest('tr');
      let page_top = parseFloat(this_content.find('.page_top').text());
      let fm_s_check = false;
      let fm_s_d = '';
      /*
  if (os_table[ss].headers[os.otd_index].fm_selector != null) {
      if (os_table[ss].headers[os.otd_index].fm_selector.length > 0) {
          fm_s_d = os_table[ss].headers[os.otd_index].fm_selector[0].data;

          if (os_table[ss].headers[os.otd_index].fm_selector[0].check == "1") {
              fm_s_check = true;

          }
      }

  }
 
  if (fm_s_check == true) {
      if (fm_list[fm_s_d][0].length > 1) {
          for (let i = 0; i < fm_list[fm_s_d].length - 1; i++) {

              if (fm_list[fm_s_d][i][1].indexOf($.trim($(this).val())) == 0) {
                  if (os.otr_index == this_tr.index()) {
                      this_tr.find("td").eq(os.otd_index).removeClass("new_data");
                      this_tr.find("td").eq(os.otd_index).attr("title", "");

                      this_tr.addClass("tr_edited");
                      update_last_data(this_tr);

                  } else {
                      this_tr.prev().find("td").eq(os.otd_index).removeClass("new_data");
                      this_tr.prev().find("td").eq(os.otd_index).attr("title", "");

                      this_tr.prev().addClass("tr_edited");
                      update_last_data(this_tr.prev());
                  }
                  break;
              } else {
                  if (os.otr_index == this_tr.index()) {
                      this_tr.find("td").eq(os.otd_index).addClass("new_data");
                      this_tr.find("td").eq(os.otd_index).attr("title", "双击添加新资料");

                  } else {
                      this_tr.prev().find("td").eq(os.otd_index).addClass("new_data");
                      this_tr.prev().find("td").eq(os.otd_index).attr("title", "双击添加新资料");

                  }
              }
          }
      } else {
          for (let i = 0; i < fm_list[fm_s_d].length; i++) {
              if (fm_list[fm_s_d][i][0].indexOf($.trim($(this).val())) == 0) {
                  if (os.otr_index == this_tr.index()) {
                      this_tr.find("td").eq(os.otd_index).removeClass("new_data");
                      this_tr.find("td").eq(os.otd_index).attr("title", "");

                      this_tr.addClass("tr_edited");
                      update_last_data(this_tr);

                  } else {
                      this_tr.prev().find("td").eq(os.otd_index).removeClass("new_data");
                      this_tr.prev().find("td").eq(os.otd_index).attr("title", "");

                      this_tr.prev().addClass("tr_edited");
                      update_last_data(this_tr.prev());
                  }
              } else {
                  if (os.otr_index == this_tr.index()) {
                      this_tr.find("td").eq(os.otd_index).addClass("new_data");
                      this_tr.find("td").eq(os.otd_index).attr("title", "双击添加新资料");

                  } else {
                      this_tr.prev().find("td").eq(os.otd_index).addClass("new_data");
                      this_tr.prev().find("td").eq(os.otd_index).attr("title", "双击添加新资料");

                  }
              }
          }
      }
  } else {
*/
      this_content.find('.tr_list').eq(os.otr_index).addClass('tr_edited');
      if (os.os_input_type == 'mouse') {
        os.trs_edited_index[ss].push(os.otr_index);
      }

      //  }
    });
}
