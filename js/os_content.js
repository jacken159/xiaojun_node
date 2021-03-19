/*
import $ from 'jquery';

import {
    get_unique_from_table ,
    reset_editor,
    set_mover,
    os_table_mover,
    set_editor,
    renew_i,
    status_auto_fx,
    os_table_data_add_row,
    new_row,
    get_sum,
    os_table_copy,
    os_table_paste,
    reflush_table,
    set_swift
} from '/js/os_func.js';
import { os, xiaojun_db } from '/js/os_source.js';
import { mf_body } from '/js/os_mf.js';
import * as hmgl from '/os/os_hmgl';
import { load_ajax } from './ajax';
*/
function os_content_func() {
    let [editor, mover, fm_selector] = [
        $('#editor'),
        $('#mover'),
        $('#fm_selector')
    ];
    //let SS=os_content.attr("id");

    //console.log(SS)
    $('body')
        .on('mousedown', 'td', function (event) {
            let self = $(this);
            let [this_content, this_tr] = [
                self.closest('.os_content'),
                self.closest('tr')
            ];
            os.content_focus = this_content.attr('id');
            let ss = os.content_focus;

            let this_content_offset = this_content.offset();

            let page_top = parseFloat(this_content.find('.page_top').text());

            $('#content_menu,#contentmenu_filter').remove();

            reset_editor();
            if (os.input_type == 'mouse') {
                if ($('#editor').val().length > 0) {
                    let td = this_content.find('.td_selected');
                    let tr = td.closest('tr');
                    this_content
                        .find('.tr_list')
                        .eq(os.otr_index)
                        .find('td')
                        .eq(os.otd_index)
                        .text($('#editor').val())
                        .attr('data-text', $('#editor').val());
                    try {
                        os.mf_data[ss][page_top + os.otr_index][os.otd_index] = $(
                            '#editor'
                        ).val();
                    } catch (error) {
                        console.log(error);
                    }
                    $('#editor').val('');
                    os.trs_edited_index[ss].push(page_top + os.otr_index);
                }
            }

            os.row_i.push(this_tr.index());
            os.col_i.push(self.index());

            os.resize_status = 0;
            os.fm_selector_status = '';

            $('.inputfocus').removeClass('inputfocus');
            /*
            if (EVENT.shiftKey && EVENT.originalEvent.wheelDelta / 120 > 0) {
              console.log("SHIFT")
            }
            else 
            */
            if (event.which == 1) {
                set_mover(self, 8, 8);
                self.focus();
                os.clicking = true;

                $('.td_selected').removeClass('td_selected');
                $('.for_mover').removeClass('for_mover');
                $('.selected').removeClass('selected');
                $('.selected_tr').removeClass('selected_tr');
                this_content.find('.salmon').removeClass('salmon');

                if (
                    self.hasClass('disabled') ||
                    self.hasClass('hide') ||
                    self.hasClass('os_tr_th')
                ) { } else {
                    os.tr_th_over = false;
                    self.focus().addClass('td_selected');
                }
            } else if (event.which == 3) {
                let [xx, yy] = [event.pageX + 20, event.pageY - 70];
                mover.offset({ top: 0, left: 0 });

                if (this_tr.hasClass('tr_input')) { } else {
                    let content = "<li class='HEAD'>请选择</li>";
                    for (let i = 0; i < os.mf_data[ss].content_menu.length; i++) {
                        content += `<li class='HOVER'>${os.mf_data[ss].content_menu[i]}</li>`;
                    }

                    this_content.append(
                        `<ul id='content_menu' style='top:${yy - this_content_offset.top
                        }px;left:${xx - this_content_offset.left}px;'>${content}</ul>`
                    );
                    if (yy + $('#content_menu').height() > window.innerHeight) {
                        $('#content_menu').offset({
                            top: yy - $('#content_menu').height()
                        });
                    }
                }
                if (self.hasClass('td_selected')) { } else {
                    this_content.find('.td_selected').removeClass('td_selected');
                    self.addClass('td_selected');
                    this_content.find('.selected_tr').removeClass('selected_tr');
                    this_tr.addClass('selected_tr');
                    os.row_i.push(this_tr.index());
                    os.col_i.push(self.index());
                }
                console.log(os.row_i, os.col_i);
                /*
    if (THIS.hasClass("current")) { } else {
      if ($(this).find(".editor").length > 0) { } else {
        THIS_CONTENT.find(".current").removeClass("current");
        THIS_CONTENT.find(".selected_tr").removeClass("selected_tr");
        THIS.addClass("current");
        THIS_TR.addClass("selected_tr");
 
      }
 
    }
    */
            }
        })
        .on('mouseover', 'td', function (EVENT) {
            let self = $(this);
            let [this_content, this_tr] = [
                self.closest('.os_content'),
                self.closest('tr')
            ],
                ss = this_content.attr('id');
            let page_top = parseFloat(this_content.find('.page_top').text());
            if (os.tr_th_over == true) {
                this_tr.find('td').addClass('td_selected');
            } else if (os.mover_over == true) {
                if (this_tr.hasClass('tr_input')) {
                    os_table_data_add_row(page_top + this_tr.index());
                    let CONTENT = new_row(
                        'new',
                        ss,
                        '',
                        '',
                        '',
                        'tr_list tr_new tr_edited'
                    );
                    $('#tr_input').before(CONTENT);
                    //$("#" + SS + "TABLE").scrollTop($("#" + SS + "_table_body_div").height())
                } else {
                    this_tr.addClass('mover_tr');
                    self.addClass('td_selected');
                }
            } else {
                let this_tr = self.closest('tr');
                if (os.clicking == true) {
                    this_content.find('td_selected').removeClass('td_selected');
                    for (let i = os.row_i[0]; i <= this_tr.index(); i++) {
                        for (let j = os.col_i[0]; j <= self.index(); j++) {
                            this_content
                                .find('.tr_list')
                                .eq(i)
                                .find('td')
                                .eq(j)
                                .addClass('td_selected');
                        }
                    }
                    //self.addClass("td_selected");
                }
            }
        })
        .on('mouseup', 'td', function (event) {
            console.log('mouse');
            let self = $(this);
            let index = self.index(),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id'),
                this_tr = self.closest('tr');
            if (event.which == 1) {
                let trs = this_content.find('.tr_list');
                os.row_i.push(this_tr.index());
                os.col_i.push(self.index());

                os.row_i.sort(function (a, b) {
                    return a - b;
                });
                os.col_i.sort(function (a, b) {
                    return a - b;
                });

                if (os.shift_press == true) {
                    os.shift_press = false;
                    os.clicking = false;
                    let trs = this_content.find('.tr_list');

                    //console.log(ROW_I, COL_I)
                    for (let i = os.row_i[0]; i <= os.row_i[os.row_i.length - 1]; i++) {
                        for (let j = os.col_i[0]; j <= os.col_i[os.col_i.length - 1]; j++) {
                            trs.eq(i).find('td').eq(j).addClass('td_selected');
                        }
                        trs.eq(i).addClass('selected_tr');
                    }
                    os.row_i.splice(0, os.row_i.length);
                    os.col_i.splice(0, os.col_i.length);
                } else if (self.hasClass('os_tr_th')) {
                    os.tr_th_over = false;
                    os.clicking = false;
                    trs.last().find('.td_selected').first().focus();
                } else {
                    if (os.clicking == true || os.mover_over == true) {
                        if (os.tr_th_over == true) {
                            os.tr_th_over = false;
                            os.clicking = false;
                            trs.last().find('.td_selected').first().focus();
                        } else {
                            os.clicking = false;
                            this_content.find('.td_selected').removeClass('td_selected');
                            if (this_tr.hasClass('tr_input')) {
                                self.addClass('td_selected');
                            } else {
                                for (
                                    let i = os.row_i[0]; i <= os.row_i[os.row_i.length - 1]; i++
                                ) {
                                    for (
                                        let j = os.col_i[0]; j <= os.col_i[os.col_i.length - 1]; j++
                                    ) {
                                        trs.eq(i).find('td').eq(j).addClass('td_selected');
                                    }
                                    trs.eq(i).addClass('selected_tr');
                                }
                            }
                        }

                        if (os.mover_over == true) {
                            os.mover_over = false;
                            os.clicking = false;

                            let tds = this_content
                                .find('.selected_tr')
                                .last()
                                .find('.for_mover');
                            for (let i = 0; i < tds.length; i++) {
                                if (tds.eq(i).not('.disabled')) {
                                    set_mover(tds.eq(i), 8, 8);
                                    tds.eq(tds.length - 1).focus;
                                }
                            }
                            //let TRS1 = os_content.find(".tr_list");
                            //let DATA = ENCODE_DATA_FROM_TABLE(TRS1);

                            os_table_mover();
                            this_content.find('.for_mover').removeClass('for_mover');
                            this_content.find('.mover_tr').removeClass('mover_tr');
                            this_content.find('.td_selected').removeClass('td_selected');
                        }

                        if (os.check == true) {
                            if (this_tr.hasClass('tr_list')) {
                                let trs = this_content.find('.tr_list');

                                if (this_tr.hasClass('tr_checked')) {
                                    this_tr.removeClass('tr_checked');
                                } else {
                                    for (
                                        let i = os.row_i[0]; i <= os.row_i[os.row_i.length - 1]; i++
                                    ) {
                                        trs.eq(i).addClass('tr_checked');
                                    }
                                }
                            }
                        }

                        if (os.getting_area == true) {
                            os.clicking = false;
                            let tds = this_content
                                .find('td.td_selected')
                                .first()
                                .closest('tr')
                                .find('td.td_selected');
                            let t = '';
                            for (let i = 0; i < tds.length; i++) {
                                t += tds.eq(i).index() + '/t';
                            }
                            $('.for_get_area').val(t);
                            os.getting_area = false;
                        }
                    } else if (os.th_over == true) {
                        os.th_over = false;
                        let trs = this_content.find('.tr_list');
                        for (let i = 0; i < trs.length; i++) {
                            trs.eq(i).find('td').eq(index).addClass('td_selected');
                        }
                        this_content.find('.td_selected').first().focus();
                    }

                    let tds = this_content
                        .find('.selected_tr')
                        .last()
                        .find('.td_selected');
                    for (let i = 0; i < tds.length; i++) {
                        if (tds.eq(i).hasClass('disabled') || tds.eq(i).hasClass('hide')) { } else {
                            set_mover(tds.eq(i), 8, 8);
                            tds.eq(i).focus;
                        }
                    }
                }
                status_auto_fx();
                os.row_i.splice(0, os.row_i.length);
                os.col_i.splice(0, os.col_i.length);
            } else if (event.which == 3) {
                os.shift_press = false;
                os.clicking = false;
                os.getting_area = false;
                os.th_over = false;
                os.mover_over = false;
                os.row_i.splice(0, os.row_i.length);
                os.col_i.splice(0, os.col_i.length);
            }
        })
        .on('dblclick', '.td_selected', function () {
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id'),
                this_tr = self.closest('tr'),
                index = self.index();
            console.log('tr_input');
            let page_top = parseFloat(this_content.find('.page_top').text());
            if (self.closest('.os_bg_object').length > 0) {
                set_editor(self, -1, -1, -1, -1);
                editor.val(self.find('.OS_BG_TEXTAREA').val());
                editor.focus().select();
            } else if (self.hasClass('new_data')) { } else if (self.find('select').length > 0) { } else if (os.mf_data[ss].editor == 1) {
                if (self.hasClass('disabled')) { } else {
                    if (this_tr.hasClass('tr_input')) {
                        os_table_data_add_row(os.mf_data[ss].table_data.length);

                        os.trs_edited_index[ss].push(os.mf_data[ss].table_data.length - 1);
                        let tr_input = this_content.find('.tr_input');
                        let content = new_row(
                            os.mf_data[ss],
                            'empty',
                            '',
                            '',
                            'tr_list tr_new tr_edited new_row_from_tr_input',
                            os.mf_data[ss].table_data.length - 1
                        );
                        tr_input.before(content);
                        this_content.find('.td_selected').removeClass('td_selected');
                        this_content
                            .find('.tr_input')
                            .prev()
                            .find('td')
                            .eq(index)
                            .addClass('td_selected');
                        set_editor(this_content.find('.td_selected'), -1, -1, -1, -1);
                        set_mover(this_content.find('.td_selected').prev(), 8, 8);
                        renew_i(os.mf_data[ss]);
                    } else {
                        set_editor(self, -1, -1, -1, -1);
                        editor.val(self.attr('data-text'));
                        editor.focus().select();
                    }
                }
            }
        })
        .on('focus', 'input', function () {
            let self = $(this);
            $('.inputfocus').removeClass('inputfocus');
            self.addClass('inputfocus');
            let attr = self.closest('.os_content').attr('id');
            if (attr == 'afc' || attr == 'afl' || attr == 'afs' || attr == null) { } else {
                os.content_focus = self.closest('.os_content').attr('id');
            }
            if (self.attr('afs') != null) {
                self.addClass('afs_focus');
                let afs_source = JSON.parse(self.attr('afs'));
                //console.log(os_table_data[afs_source.from])
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

                if (self.closest('div').hasClass('card_tt')) {
                    self.closest('div').removeClass('_6');
                }
            } else if (self.hasClass('FOR_DISP')) {
                let FROM = self.attr('from'),
                    PD = self.attr('pd'),
                    PATH = self.attr('path');
                set_fm_selector(self, 20, 0, 320, 300);
                if ($.trim(self.val()).length > 0) {
                    load_table_ajax(
                        PATH,
                        FROM, {
                        PD: PD + " ='" + self.val() + "'"
                    },
                        '',
                        'TEXT'
                    );
                    post_func.done(() => {
                        $('#FM_SELECTOR_CONTENT')
                            .empty()
                            .append(ENCODE_LI_FROM_TEXT(os_data, 'DISP'));
                        try {
                            plus.key.hideSoftKeybord();
                        } catch (error) {
                            console.log('HIDEKEY' + JSON.stringify(error));
                        }
                    });
                } else {
                    $('#FM_SELECTOR_CONTENT').empty();
                    try {
                        plus.key.hideSoftKeybord();
                    } catch (error) {
                        console.log(JSON.stringify(error));
                    }
                }
            } else {
                reset_editor();
            }
        })
        .on('focus', 'input.get_area', function () {
            let self = $(this);
            self.addClass('for_get_area');
            os.getting_area = true;
            set_fm_selector(self, 20, 0, 60, 60);
            $('#wfw').addClass('hide');
            $('#FM_SELECTOR_CONTENT').empty().append('点击选择查找的列');
        })
        .on('keyup', 'input.for_fm_list', function () {
            let THIS = $(this);
            let SS = $('.CONTENT_FOCUS').attr('id');
            let D = THIS.attr('fm-data'),
                W = THIS.attr('fm-where'),
                DISP = THIS.attr('fm-disp'),
                KEY = THIS.attr('fm-key');
            encode_fm_list(SS, D, W, DISP, THIS.val(), KEY, 'CARD');
        })
        .on('change', 'input.tt', function () {
            let a = os_table_data[os.content_focus];
            console.log(a);
            for (let i = 0; i < a.length; i++) {
                trs_edited_index[os.content_focus].push(a[i][0]);
            }
        })
        .on('keydown', 'input.FOR_SELECTOR', function (EVENT) {
            switch (EVENT.which) {
                case 40:
                    if ($('#fm_selector').width() > 0) {
                        $('#CS_FM_LIST').find('li').first().focus().addClass('FM_SELECT');
                    }
            }
        })
        .on('mousedown', '.os_th', function (EVENT) {
            os.th_over = true;
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let [INDEX, TRS] = [
                self.closest('th').index(),
                this_content.find('.tr_list')
            ];
            this_content.find('.td_selected').removeClass('td_selected');
            this_content.find('.selected').removeClass('selected');
            reset_editor();
            for (let i = 0; i < TRS.length; i++) {
                TRS.eq(i).find('td').eq(INDEX).addClass('td_selected');
                TRS.eq(i).addClass('selected_tr');
            }
        })
        .on('mouseover', 'th', function (EVENT) {
            let THIS = $(this),
                THIS_CONTENT = THIS.closest('.os_content');
            let [INDEX, TRS] = [THIS.index(), THIS_CONTENT.find('.tr_list')];
            if (os.th_over == true) {
                for (let i = 0; i < TRS.length; i++) {
                    TRS.eq(i).find('td').eq(INDEX).addClass('td_selected');
                }
            }
        })
        .on('mouseup', 'th', function (EVENT) {
            let THIS = $(this),
                THIS_CONTENT = THIS.closest('.os_content');
            os.th_over = false;
            THIS_CONTENT.find('.td_selected').first().focus();
            status_auto_fx();
        })
        .on('mousedown', '.os_tr_th', function (event) {
            let self = $(this),
                this_content = self.closest('.os_content');
            let this_tr = self.closest('tr');
            this_content.find('.td_selected').removeClass('td_selected');
            reset_editor();

            if (event.which == 1) {
                os.tr_th_over = true;
                this_tr.find('td').addClass('td_selected');
            }
        })
        .on('mouseup', '.os_tr_th', function () {
            $('#' + os.content_focus)
                .find('.td_selected')
                .eq(4)
                .focus();
            //$(this).focus();
        })
        .on('contextmenu', function () {
            return false;
        })
        .on('keydown', '.td_selected', function (event) {
            let self = $(this);
            let [this_tr, index] = [self.closest('tr'), self.index()];
            let this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let f_td = this_content.find('.td_selected').first();
            let f_tr = f_td.closest('tr');
            let l_td = this_content.find('.td_selected').last();
            let l_tr = l_td.closest('tr');
            let trs = this_content.find('.tr_list');
            let page_top = parseFloat(this_content.find('.page_top').text());
            //shiftKey//shiftLeft//ctrlKey//ctrlLeft

            if (event.shiftKey && event.which == 9) {
                //SHIFT+TAB
                event.stopPropagation();
                event.preventDefault();
                $('.td_selected').removeClass('td_selected');
                if (index == this_tr.find('td:not(.hide)').eq(1).index()) {
                    //console.log("1.1")
                    if (this_tr.prev().length > 0) {
                        self.removeClass('td_selected');
                        this_tr
                            .prev()
                            .find('td:not(.hide)')
                            .last()
                            .addClass('td_selected')
                            .focus();
                        set_mover(this_tr.prev().find('td:not(.hide)').last(), 8, 8);
                    }
                } else {
                    //console.log("1.2")
                    if (self.prev().length > 0) {
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
                            ) { } else {
                                //console.log("1.2.1.1")
                                I = i - 1;
                                let prev_td = this_tr.find('td').eq(I);
                                self.removeClass('td_selected');
                                prev_td.addClass('td_selected').focus();

                                set_mover(prev_td, 8, 8);
                                break;
                            }
                        }
                    }
                }
            } else if (event.shiftKey && event.which == 35) {
                //SHIFT+END
                os.shiftend = true;
                console.log(os.shiftend);
            } else if (event.shiftKey && event.which == 37) {
                //SHIFT+left
                //$(".td_selected").removeClass("td_selected");
                if (index == this_tr.find('td:not(.hide)').eq(1).index()) {
                    //console.log("1.1")
                    if (this_tr.prev().length > 0) {
                        this_tr
                            .prev()
                            .find('td:not(.hide)')
                            .last()
                            .addClass('td_selected')
                            .focus();
                    }
                } else {
                    //console.log("1.2")
                    if (self.prev().length > 0) {
                        //console.log("1.2.1")
                        //console.log(F_TR.index(),L_TR.index())
                        for (let j = f_tr.index(); j <= l_tr.index(); j++) {
                            //console.log(F_TD.index(),L_TD.index())
                            for (let k = f_td.index(); k <= l_td.index(); k++) {
                                trs
                                    .eq(j)
                                    .find('td')
                                    .eq(k - 1)
                                    .addClass('td_selected');
                                break;
                            }
                        }
                        $('.td_selected').first().focus();
                    }
                }
            } else if (event.shiftKey && event.which == 38) {
                //shift+up
                //console.log("UP")
                if (this_tr.prev().length > 0) {
                    //console.log(F,L)
                    for (let i = f_td.index(); i <= l_td.index(); i++) {
                        this_tr.prev().find('td').eq(i).addClass('td_selected');
                    }
                    $('.td_selected').first().focus();
                }
            } else if (event.shiftKey && event.which == 39) {
                //shift+right
                console.log(os.shiftend);
                if (os.shiftend == true) {
                    os.shiftend = false;
                    for (let i = index; i < this_tr.find('td').length; i++) {
                        this_tr.find('td').eq(i).addClass('td_selected');
                    }
                    this_tr.find('td:not(.hide)').last().focus();
                } else {
                    for (let i = index; i < this_tr.find('td').length; i++) {
                        if (i == this_tr.find('td').last().index()) {
                            //console.log(1)
                            if (this_tr.next().length > 0) {
                                for (let j = 0; j < this_tr.next().find('td').length; j++) {
                                    if (
                                        this_tr.next().find('td').eq(j).hasClass('disabled') ||
                                        this_tr.next().find('td').eq(j).hasClass('hide')
                                    ) { } else {
                                        this_tr
                                            .next()
                                            .find('td')
                                            .eq(j)
                                            .addClass('td_selected')
                                            .focus();
                                        set_mover(this_tr.next().find('td').eq(j), 8, 8);
                                        break;
                                    }
                                }
                            }
                        } else {
                            //console.log(2)
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
                                ) { } else {
                                    //console.log("1.2.1")
                                    //console.log(F_TR.index(),L_TR.index())
                                    for (let j = f_tr.index(); j <= l_tr.index(); j++) {
                                        //console.log(F_TD.index(),L_TD.index())
                                        for (let k = f_td.index(); k <= l_td.index(); k++) {
                                            trs
                                                .eq(j)
                                                .find('td')
                                                .eq(k + 1)
                                                .addClass('td_selected');
                                        }
                                    }
                                    this_tr
                                        .find('td')
                                        .eq(l_td.index() + 1)
                                        .focus();

                                    break;
                                }
                            }
                        }
                    }
                }
            } else if (event.shiftKey && event.which == 40) {
                //SHIFT+DOWN
                if (this_tr.next().length > 0) {
                    if (this_tr.next().hasClass('tr_sum')) { } else {
                        for (let i = f_td.index(); i <= l_td.index(); i++) {
                            this_tr.next().find('td').eq(i).addClass('td_selected');
                        }
                        $('.td_selected:not(.hide)').last().focus();
                    }
                }
            } else if (event.ctrlKey && event.which == 65) {
                //CTRL+A
                this_content.find('.tr_list').find('td').addClass('td_selected');
                this_content.find('.tr_list').addClass('selected_tr');
                return false;
            } else if (event.ctrlKey && event.which == 67) {
                //CTRL+C
                if (os.mf_data[ss].copy == '1') {
                    console.log('CRTL+C');
                    os_table_copy();
                    /*
                        navigator.clipboard.writeText('Text to be copied')
                          .then(() => {
                            console.log('Text copied to clipboard');
                          })
                          .catch(err => {
                            // This can happen if the user denies clipboard permissions:
                            console.error('Could not copy text: ', err);
                          });
                          */
                }
            } else if (event.ctrlKey && event.which == 83) {
                //CTRL+S
            } else if (event.ctrlKey && event.which == 86) {
                //CTRL+V
                if (os.mf_data[ss].paste == '1') {
                    os_table_paste();
                    /*
                        SET_EDITOR(CURRENT, -1, -1, -1, -1);
                        $("#editor").focus();
                        //console.log("P")
                        */
                }
            } else if (event.ctrlKey && event.which == 88) {
                //CTRL+X
            } else if (event.ctrlKey && event.which == 90) {
                //CTRL+Z
            } else if (event.ctrlKey) { } else if (event.shiftKey) {
                os.shift_press = true;
                os.row_i.push(this_tr.index());
                os.col_i.push(self.index());
            } else if (event.which == 18) {
                //ALT
            } else if (event.which == 35) {
                //END
                event.preventDefault();
                event.stopPropagation();
                this_content.find('.td_selected').removeClass('td_selected');
                this_tr.find('td:not(.hide)').last().addClass('td_selected').focus();
            } else if (event.which == 36) {
                //HOME
                event.preventDefault();
                event.stopPropagation();
                this_content.find('.td_selected').removeClass('td_selected');
                this_tr.find('td:not(.hide)').eq(1).addClass('td_selected').focus();
            } else if (event.which == 46) {
                //DEL
                this_content.find('.td_selected').text('').attr('data-text', '');
                let trs = this_content.find('.selected_tr');

                for (let i = 0; i < trs.length; i++) {
                    let tds = trs.eq(i).find('.td_selected');
                    for (let j = 0; j < tds.length; j++) {
                        os.mf_data[ss].table_data[page_top + trs.eq(i).index()][tds.eq(j).index()] =
                            '';
                        xiaojun_db.setItem('mf_data', os.mf_data);
                        /*
                        os.load_type = 'update';
                        os.load_table = ss;
                        os.load_data = self.val();
                        os.load_data_row = page_top + trs.eq(i).index();
                        os.load_data_col = tds.eq(j).index();
                        load_ajax().then(r => {
                            xiaojun_db.setItem('mf_data', os.mf_data);

                        });
                        */
                    }
                    //os.trs_edited_index[ss].push(page_top + trs.eq(i).index());
                }

                this_content.find('.selected_tr').addClass('tr_edited');
            } else if (event.which == 113) {
                //F2
                if (os.mf_data[ss].editor == 1) {
                    set_editor(self, -1, -1, -1, -1);
                    set_mover(self, 8, 8);
                }
            } else if (event.which == 116) { } else if (event.which == 8) {
                //back
                return false;
            } else if (
                [
                    65,
                    66,
                    67,
                    68,
                    69,
                    70,
                    71,
                    72,
                    73,
                    74,
                    75,
                    76,
                    77,
                    78,
                    79,
                    80,
                    81,
                    82,
                    83,
                    84,
                    85,
                    86,
                    87,
                    88,
                    89,
                    90
                ].indexOf(event.which) >= 0
            ) {
                //26
                event.preventDefault();
                event.stopPropagation();
            } else if (event.which == 9) {
                event.preventDefault();
                event.stopPropagation();

                $('.td_selected').removeClass('td_selected');
                for (let i = index; i < this_tr.find('td').length; i++) {
                    if (i == this_tr.find('td').last().index()) {
                        if (this_tr.next().length > 0) {
                            for (let j = 0; j < this_tr.next().find('td').length; j++) {
                                if (
                                    this_tr.next().find('td').eq(j).hasClass('disabled') ||
                                    this_tr.next().find('td').eq(j).hasClass('hide')
                                ) { } else {
                                    self.removeClass('td_selected');
                                    this_tr
                                        .next()
                                        .find('td')
                                        .eq(j)
                                        .addClass('td_selected')
                                        .focus();

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
                            ) { } else {
                                self.removeClass('td_selected');
                                this_tr
                                    .find('td')
                                    .eq(i + 1)
                                    .addClass('td_selected')
                                    .focus();

                                set_mover(this_tr.find('td').eq(i + 1), 8, 8);
                                break;
                            }
                        }
                    }
                }

                return false;
            } else if (event.which == 13) {
                if (os.mf_data[ss].enter_direction == 'down') {
                    if (index == this_tr.find('td').last().index()) {
                        console.log(1);
                        if (this_tr.next().length > 0) {
                            self.removeClass('td_selected');
                            this_tr
                                .next()
                                .find('td:not(".hide")')
                                .eq(1)
                                .addClass('td_selected')
                                .focus();

                            set_mover(this_tr.next().find('td').eq(2), 8, 8);
                        }
                    } else {
                        if (this_tr.next().length > 0) {
                            self.removeClass('td_selected');
                            this_tr
                                .next()
                                .find('td')
                                .eq(self.index())
                                .addClass('td_selected')
                                .focus();

                            set_mover(this_tr.next().find('td').eq(self.index()), 8, 8);
                        }
                    }
                    return false;
                } else if (os.mf_data[ss].enter_direction == 'right') {
                    $('.td_selected').removeClass('td_selected');
                    for (let i = index; i < this_tr.find('td').length; i++) {
                        if (i == this_tr.find('td').last().index()) {
                            if (this_tr.next().length > 0) {
                                for (let j = 0; j < this_tr.next().find('td').length; j++) {
                                    if (
                                        this_tr.next().find('td').eq(j).hasClass('disabled') ||
                                        this_tr.next().find('td').eq(j).hasClass('hide')
                                    ) { } else {
                                        self.removeClass('td_selected');
                                        this_tr
                                            .next()
                                            .find('td')
                                            .eq(j)
                                            .addClass('td_selected')
                                            .focus();

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
                                ) { } else {
                                    self.removeClass('td_selected');
                                    this_tr
                                        .find('td')
                                        .eq(i + 1)
                                        .addClass('td_selected')
                                        .focus();

                                    set_mover(this_tr.find('td').eq(i + 1), 8, 8);
                                    break;
                                }
                            }
                        }
                    }
                }
            } else if (event.which == 27) {
                this_content.find('.cut_tr').removeClass('cut_tr');
            } else if (event.which == 37) {
                //left
                $('.td_selected').removeClass('td_selected');
                if (index == this_tr.find('td:not(.hide)').eq(1).index()) {
                    //console.log("1.1")
                    if (this_tr.prev().length > 0) {
                        self.removeClass('td_selected');
                        this_tr
                            .prev()
                            .find('td:not(.hide)')
                            .last()
                            .addClass('td_selected')
                            .focus();

                        set_mover(self, 8, 8);
                    }
                } else {
                    //console.log("1.2")
                    if (self.prev().length > 0) {
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
                            ) { } else {
                                //console.log("1.2.1.1")
                                I = i - 1;
                                let prev_td = this_tr.find('td').eq(I);
                                self.removeClass('td_selected');
                                prev_td.addClass('td_selected').focus();

                                set_mover(self, 8, 8);
                                break;
                            }
                        }
                    }
                }
            } else if (event.which == 38) {
                //up
                if (this_tr.prev().length > 0) {
                    $('.td_selected').removeClass('td_selected');
                    self.removeClass('td_selected');
                    this_tr.prev().find('td').eq(index).addClass('td_selected').focus();

                    set_mover(this_tr.prev().find('td').eq(index), 8, 8);
                }
            } else if (event.which == 39) {
                //right
                for (let i = index; i < this_tr.find('td').length; i++) {
                    if (i == this_tr.find('td').last().index()) {
                        $('.td_selected').removeClass('td_selected');
                        if (this_tr.next().length > 0) {
                            for (let j = 0; j < this_tr.next().find('td').length; j++) {
                                if (
                                    this_tr.next().find('td').eq(j).hasClass('disabled') ||
                                    this_tr.next().find('td').eq(j).hasClass('hide')
                                ) { } else {
                                    self.removeClass('td_selected');
                                    this_tr
                                        .next()
                                        .find('td')
                                        .eq(j)
                                        .addClass('td_selected')
                                        .focus();

                                    set_mover(this_tr.next().find('td').eq(j), 8, 8);
                                    break;
                                }
                            }
                        }
                    } else {
                        $('.td_selected').removeClass('td_selected');
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
                            ) { } else {
                                self.removeClass('td_selected');
                                this_tr
                                    .find('td')
                                    .eq(i + 1)
                                    .addClass('td_selected')
                                    .focus();

                                set_mover(this_tr.find('td').eq(i + 1), 8, 8);
                                break;
                            }
                        }
                    }
                }
            } else if (event.which == 40) {
                //down
                if (this_tr.next().length > 0) {
                    if (
                        this_tr.next().hasClass('tr_sum') ||
                        this_tr.next().hasClass('tr_input')
                    ) { } else {
                        $('.td_selected').removeClass('td_selected');
                        self.removeClass('td_selected');
                        this_tr.next().find('td').eq(index).addClass('td_selected').focus();
                        set_mover(this_tr.next().find('td').eq(index), 8, 8);
                    }
                }
            } else if (this_tr.hasClass('tr_input')) {
                os_table_data_add_row(page_top + this_tr.index());
                let tr_input = this_content.find('.tr_input');
                let content = new_row(
                    os.mf_data[ss],
                    'empty',
                    '',
                    '',
                    'tr_list tr_new tr_edited new_row_from_tr_input',
                    os.mf_data[ss].table_data.length - 1
                );
                tr_input.before(content);
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

                if (os.mf_data[ss].editor == '1') {
                    console.log(123);
                    if (self.hasClass('disable')) { } else {
                        set_editor(self, -1, -1, -1, -1);
                        set_mover(self, 8, 8);
                    }
                }
            }
        })
        .on('keyup', '.td_selected', function () {
            let self = $(this),
                index = self.index();
            //fc_ya_check(index, $.trim(self.attr('data-text')));
            os.shift_press = false;
            os.row_i.splice(0, os.row_i.length);
            os.col_i.splice(0, os.col_i.length);
        })
        .on('click', '.filter_icon', function (event) {
            let [xx, yy] = [event.pageX + 20, event.pageY - 70];
            let self = $(this),
                this_content = $(`#${os.content_focus}`),
                ss = this_content.attr('id');
            $('#contentmenu_filter').remove();
            this_content.find('.selected_th').removeClass('selected_th');
            self.closest('th').addClass('selected_th');
            let [menu, menu_val] = [
                ['升序', '降序'],
                ['asc', 'desc']
            ];
            let content = `<li style='list-style-type:none;background-color: #4db6ac;margin-left: -40px;padding:5px;'>请选择</li>`;
            for (let i = 0; i < menu.length; i++) {
                content += `<li class='HOVER ${menu_val[i]}' style='list-style-type:none;border-bottom: 2px solid #009688;margin-left: -40px;padding:5px;'>${menu[i]}</li>`;
            }
            this_content.append(
                `<ul id='contentmenu_filter'class='' style='background-color: white;border: 2px solid #4db6ac;top:${yy}px;position:fixed;left:${xx}px;height: auto;min-width: 50px;'>${content}</ul>`
            );

            $('#contentmenu_filter').append(
                `
                <div>
                    <input id='filter_search' style='margin-left: -40px;' type='text' placeholder='搜索' />
                </div>
                <div style='overflow-y:scroll;max-height:240px;'>
                    <ul  id='contentmenu_ul'>
                        <li style='list-style-type:none;margin-left: -40px;padding:5px;' id='filter_all'>全选</li>
                    </ul>
                </div>
                <div>
                    <button id='filter_continue'>确定</button>
                    <button id='filter_cancel'>取消</button>
                </div>
                `
            );

            let index = self.closest('th').index();
            let a_set = get_unique_from_table(os.mf_data[ss].table_data, index, 'asc');

            let li = '';
            for (let i = 0; i < a_set.length; i++) {
                li += `<li style='' class='filter_list li_css'>${a_set[i]}</li>`;
            }
            li += `<li style='' class='filter_list li_css'>空白</li>`;
            $('#contentmenu_ul').append(li);
        })
        .on('click', '.filter_list', function () {
            $(this).toggleClass('selected');
        })
        .on('click', '#contentmenu_filter .asc', function () {
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');

            let th_index = this_content.find('.selected_th').attr('title');
            let a = os.mf_data[ss].table_data.sort(function (a, b) {
                console.log(a[th_index], '#', b[th_index])
                let a_sort = a[th_index];
                if (a[th_index] == null) {
                    a_sort = '';
                }
                let b_sort = b[th_index];
                if (b[th_index] == null) {
                    b_sort = '';
                }
                return a_sort.localeCompare(b_sort, 'zh-Hans-TW', {
                    numeric: true
                });
            });
            for (let i = 0; i < os.mf_data[ss].table_data.length; i++) {
                os.mf_data[ss].table_data[i][0] = i;
            }
            reflush_table(os.mf_data[ss]);
            xiaojun_db.setItem('mf_data', os.mf_data);
            $('#contentmenu_filter').remove();
        })
        .on('click', '#contentmenu_filter .desc', function () {
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let th_index = this_content.find('.selected_th').attr('title');
            let a = os.mf_data[ss].table_data.sort(function (a, b) {
                let a_sort = a[th_index];
                if (a[th_index] == null) {
                    a_sort = '';
                }
                let b_sort = b[th_index];
                if (b[th_index] == null) {
                    b_sort = '';
                }
                return b_sort.localeCompare(a_sort, 'zh-Hans-TW', {
                    numeric: true
                });
            });
            for (let i = 0; i < os.mf_data[ss].table_data.length; i++) {
                os.mf_data[ss].table_data[i][0] = i;
            }
            reflush_table(os.mf_data[ss]);
            xiaojun_db.setItem('mf_data', os.mf_data);
            $('#contentmenu_filter').remove();
        })
        .on('click', '#filter_all', function () {
            $('#contentmenu_ul').find('.filter_list').addClass('selected');
            $(this).addClass('NONE').removeClass('ALL');
        })
        .on('click', '#filter_all.NONE', function () {
            $('#contentmenu_ul').find('.filter_list').removeClass('selected');
            $(this).addClass('ALL').removeClass('NONE');
        })
        .on('click', '#filter_continue', function () {
            os.filtering = true;
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let th_index = this_content.find('.selected_th').index();
            let selected_li = $('#contentmenu_ul').find('.selected');

            os.filter_backup_data = os.mf_data[ss].table_data.slice();
            os.temp_data[ss] = { ...os.mf_data[ss] };

            let a = [];
            for (let i = 0; i < selected_li.length; i++) {
                let li_t = selected_li.eq(i).text();

                for (let j = 0; j < os.temp_data[ss].table_data.length; j++) {
                    if (li_t == '空白') {
                        if (os.temp_data[ss].table_data[j][th_index].length == 0) {
                            a.push(os.temp_data[ss].table_data[j]);
                        }
                    } else {
                        if (os.temp_data[ss].table_data[j][th_index].indexOf(li_t) == 0) {
                            a.push(os.temp_data[ss].table_data[j]);
                        }
                    }
                }
            }
            os.temp_data[ss].table_data = a
            console.log(os.temp_data)
            //mf_body(os.temp_data[ss]);
            reflush_table(os.temp_data[ss]);
            $('#contentmenu_filter').remove();
        })
        .on('click', '#filter_cancel', function () {
            $('#contentmenu_filter').remove();
        })
        .on('keyup', '#filter_search', function () {
            let filter = $('#contentmenu_filter');
            let LIS = filter.find('.filter_list');
            LIS.removeClass('hide');
            LIS.removeClass('filter');
            for (let i = 0; i < LIS.length; i++) {
                if ($.trim(LIS.eq(i).text()).indexOf($(this).val()) > -1) {
                    LIS.eq(i).addClass('filter');
                }
            }
            filter.find('.filter_list:not(.filter)').addClass('hide');
        })

        .on('click', '#content_menu li', function () {
            //console.log("#")
            let self = $(this),
                this_content = self.closest('.os_content'),
                container = this_content.find('.td_selected');
            let [this_tr, index, ss] = [
                container.closest('tr'),
                container.index(),
                this_content.attr('id')
            ];
            let page_top = parseFloat($('.page_top').text()) || 0;
            if (self.text() == '插入') {
                if ($.trim($('#os_search').val()).length > 0) {
                    afl_func('筛选过程中不可以插入');
                } else {
                    if (this_content.find('.cut_tr').length > 0) {
                        if (this_tr.hasClass('cut_tr')) {
                            alert('请在已选择的区域外进行插入');
                        } else {
                            //datacut2 = THIS_TR.index();
                            os.cut_i.push(this_tr.index());
                            this_content.find('.cut_tr').addClass('tr_edited');
                            this_content.find('.cut_tr').addClass('tr_cuted');
                            this_tr.before(this_content.find('.cut_tr'));
                            this_content.find('.selected').removeClass('selected');
                            renew_i(ss);
                            this_content.find('.cut_tr').removeClass('cut_tr');
                        }
                    } else {
                        let trs = this_content.find('.selected_tr');
                        let content = '';
                        for (let i = 0; i < trs.length; i++) {
                            os_table_data_add_row(page_top + trs.eq(i).index(), 'insert');
                            content += new_row(
                                os.mf_data[ss],
                                'empty',
                                i,
                                '',
                                'tr_new tr_list tr_edited tr_insert'
                            );
                        }
                        trs.first().before(content);

                        for (
                            let i = trs.first().index(); i < this_content.find('.tr_list').length; i++
                        ) {
                            this_content.find('.tr_list').eq(i).addClass('tr_edited');
                        }
                        let trs1 = this_content.find('.tr_edited');
                        for (let i = 0; i < trs1.length; i++) {
                            os.trs_edited_index[os.content_focus].push(
                                page_top + trs1.eq(i).index()
                            );
                        }
                        renew_i(os.mf_data[ss]);
                    }
                    let trs = this_content.find('.tr_list');
                    os.cut_i.sort(function (a, b) {
                        return a - b;
                    });
                    for (let i = os.cut_i[0]; i <= os.cut_i[os.cut_i.length - 1]; i++) {
                        trs.eq(i).addClass('tr_edited');
                    }

                    /*
                    let trs1 = $('#' + ss).find('.tr_edited');
                    for (let i = 0; i < trs1.length; i++) {
                      update_last_data(trs1.eq(i));
                    }
                    */
                }
            } else if (self.text() == '删除') {
                let trs_selected = this_content.find('.selected_tr');
                let first = trs_selected.first().index() + page_top;

                for (
                    let i = this_tr.last().index(); i < this_content.find('.tr_list').length; i++
                ) {
                    this_content.find('.tr_list').eq(i).addClass('tr_edited');
                }
                /*
                for_save.del = [];
                for (let i = 0; i < trs_selected.length; i++) {
                  for_save.del.push(os.mf_data[ss].table_data[page_top + trs_selected.eq(i).index()][1]);
                }
                */
                os.mf_data[ss].table_data.splice(page_top + trs_selected.index(), trs_selected.length);

                for (let i = 0; i < os.mf_data[ss].table_data.length; i++) {
                    os.mf_data[ss].table_data[i][0] = i;
                }
                xiaojun_db.setItem('mf_data', os.mf_data);
                /*
                os.load_type = 'delete';
                os.load_table = ss;
                os.load_data = "";
                os.load_data_row = page_top + trs_selected.index();
                os.load_data_len = trs_selected.length;
                load_ajax().then(r=>{
                    os.mf_data[ss].table_data.splice(page_top + trs_selected.index(), trs_selected.length);

                    for (let i = 0; i < os.mf_data[ss].table_data.length; i++) {
                        os.mf_data[ss].table_data[i][0] = i;
                    }
                    xiaojun_db.setItem('mf_data', os.mf_data);
                });
                */

                //let trs = this_content.find('.tr_edited');

                //os.trs_edited_index[ss].splice(0, os.trs_edited_index[ss].length);
                //for (let i = 0; i < trs.length; i++) {
                //          os.trs_edited_index[ss].push(page_top + trs.eq(i).index());
                //      }
                if (this_tr.hasClass('tr_sum')) {
                    console.log(1);
                } else {
                    if (this_tr.next().hasClass('tr_input')) {
                        this_tr.remove();
                    } else {
                        this_tr.next().find('td').eq(index).addClass('td_selected').focus();
                        this_tr.remove();
                    }
                }
                if (os.mf_data[ss].tr_sum == '1') {
                    get_sum(os.mf_data[os.content_focus]);
                }
                renew_i(os.mf_data[ss]);
            } else if (self.text() == '复制') {
                if (os.mf_data[ss].copy == '1') {
                    os_table_copy();
                }
            } else if (self.text() == '粘贴') {
                if (os.mf_data[ss].paste == '1') {
                    os_table_paste();
                    //console.log($("#FORCOPY").val())
                }
            } else if (self.text() == '复制(连标题)') {
                if (os.mf_data[ss].copy == '1') {
                    os_table_copy('title');
                }
            }
            $('#content_menu').remove();

            //let TRS = THIS_CONTENT.find(".tr_list");
            //let DATA = ENCODE_DATA_FROM_TABLE(TRS);

            let TRS1 = this_content.find('.tr_edited');
            //UPDATE_LAST_DATA(TRS1);
        })
        .on('change', '.os_table_content .per_page', function () {
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
                        os.page_top = 0;
                        os.page_bottom = totle_rows;
                    } else {
                        os.page_top = totle_rows - per_page;
                        os.page_bottom = os.page_top + per_page;
                    }
                } else {
                    os.page_top = parseFloat(page_top.text()) + per_page;
                    os.page_bottom = os.page_top + per_page;
                }
                os_perpage = THIS.val();
                console.log(os.page_top, os.page_bottom);
                REFLUSH(SS);
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
            } else {
                os.page_top = parseFloat(page_top.text()) + per_page;
                os.page_bottom = os.page_top + per_page;
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
                eval(`hmgl.${os.content_focus}_func()`);
            }
        })
        .on(os.click, '.os_table_content .prev_icon', function () {
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let per_page = parseFloat(this_content.find('.per_page').val());
            let page_top = this_content.find('.page_top');
            let page_bottom = this_content.find('.page_bottom');

            if (parseFloat(page_top.text()) - per_page < 1) {
                os.page_top = 0;
            } else {
                os.page_top = parseFloat(page_top.text()) - per_page;
            }
            os.page_bottom = os.page_top + per_page;

            console.log(os.page_top, '#1', os.page_bottom);
            if (os.mf_data[ss].pages_from == 'j') {
                reflush_table(os.mf_data[ss]);
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
                //eval(`hmgl.${os.content_focus}_func()`);
            } else {
                os.page_top = parseFloat(page_top.text()) - per_page;
                os.page_bottom = os.page_top + per_page;
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
            }
        })
        .on(os.click, '.os_table_content .next_icon', function () {
            let self = $(this),
                this_content = self.closest('.os_content'),
                ss = this_content.attr('id');
            let per_page = parseFloat(this_content.find('.per_page').val());
            let page_top = this_content.find('.page_top');
            let page_bottom = this_content.find('.page_bottom');

            if (os.mf_data[ss].pages_from == 'j') {
                let totle_rows = parseFloat(this_content.find('.totle_rows').text());
                if (parseFloat(page_bottom.text()) + per_page > totle_rows) {
                    if (totle_rows > per_page) {
                        os.page_top = totle_rows - per_page;
                        os.page_bottom = os.page_top + per_page;
                    } else {
                        os.page_top = 0;
                        os.page_bottom = per_page;
                    }
                } else {
                    os.page_top = parseFloat(page_top.text()) + per_page;
                    os.page_bottom = os.page_top + per_page;
                }
                console.log(os.page_top, '#1', os.page_bottom);
                reflush_table(os.mf_data[ss]);
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
                //eval(`hmgl.${os.content_focus}_func()`);
            } else {
                os.page_top = parseFloat(page_top.text()) + per_page;
                os.page_bottom = os.page_top + per_page;
                page_top.text(os.page_top);
                page_bottom.text(os.page_bottom);
            }
        })
        .on(os.click, '#os_back', function () {
            $('#bar,#wfw').addClass('hide');
            $('.os_content').addClass('hide');
            let back = os.table_histroy[os.table_histroy.length - 2];
            if (typeof back == 'object') {
                os.table_histroy.splice(
                    os.table_histroy.indexOf(back),
                    os.table_histroy.length - 1
                );
                os.content_focus = back[0];
                $('#' + back[0]).removeClass('hide');
            } else if (typeof back == 'string') {
                os.table_histroy.splice(
                    os.table_histroy.indexOf(os.content_focus),
                    os.table_histroy.length - 1
                );
                os.content_focus = back;
                $('#' + back).removeClass('hide');
            }
            if (os.table_histroy.length == 1) {
                $('#os_menu').removeClass('hide');
                $('#os_back').addClass('hide');
                //$("#os_save").addClass("hide");
                os.for_save = {};

                os.content_focus = os.table_histroy[0];
            }
            os.page_top = 0;
            os.page_bottom = os.perpage;

            $('#os_buttons').find('.button').addClass('hide');
            for (let i = 0; i < os.mf_data[os.content_focus].button.length; i++) {
                $('#' + os.mf_data[os.content_focus].button[i]).removeClass('hide');
            }
        })
        .on(os.click, '#swift_cancel', function () {
            $('.swift_focus').removeClass('swift_focus');
            set_swift('close');
            os.content_focus = $('#swift').attr('from');
            os.target_id = os.content_focus;
        }).on(os.click, '#swift_left', function () {
            //alert(1)
            $("#swift").css('left', 0);
        });

    $(document)
        .on('keydown', function (event) {
            console.log(event.which);
            if (event.which == 123) {
                return false;
            }
        })
        .on('touchend mouseup', function (event) {
            if (os.draging == true) {
                let this_content = $('#' + os.content_focus),
                    ss = this_content.attr('id');
                os.draging = false;
                if (os.device == 'pc') {
                    let self = this_content.find('.draging');
                    let th = self.closest('th');
                    if (th.length > 0) {
                        let crs = this_content.find('.col_resize');
                        for (let i = 0; i < crs.length; i++) {
                            let this_th = crs.eq(i).closest('th');
                            crs.eq(i).offset({
                                top: this_th.offset().top,
                                left: this_th.offset().left + this_th.width() + 8
                            });
                        }
                        xiaojun_db.setItem('mf_data', os.mf_data);
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
                let ss = $('#' + os.content_focus).attr('id');
                os.draging = true;
                let self = $(this);
                $('.draging').removeClass('.draging');
                self.addClass('draging');

                os.drag_x = event.pageX - self.offset().left;
                os.drag_y = event.pageY - self.offset().top;

                if (self.hasClass(col_resize)) {
                    if (os.mf_data[ss].cols_width.length > 0) {
                        let table_width = 0;
                        for (let i = 0; i < os.mf_data[ss].cols_width.length; i++) {
                            table_width += os.mf_data[ss].cols_width[i];
                        }
                        $('#' + ss + 'HEADER')
                            .find('div')
                            .first()
                            .width(table_width);
                        $('#' + ss + '_table_body_div').width(table_width);
                    }
                }

            } catch (error) {
                console.log('dragable' + error);
            }
        })
        .on('mousemove', function (event) {
            if (os.draging == true) {
                let self = $('.draging');
                let top = event.pageY - os.drag_y,
                    left = event.pageX - os.drag_x;
                //self.css("position", "fixed");
                self.offset({ top: top, left: left });

                if (os.device == 'pc') {
                    let this_content = $('#' + os.content_focus),
                        ss = this_content.attr('id');
                    let self = this_content.find('.draging');
                    if (self.closest('th').length > 0) {
                        let th_offset = self.closest('th').offset();
                        let index = self.closest('th').index();
                        let w = event.pageX - th_offset.left - 9;
                        let trs = this_content.find('tr');

                        os.mf_data[ss].cols_width[index] = w;
                        for (let i = 0; i < trs.length; i++) {
                            let frs = trs.eq(i).find('.for_resize');
                            frs.eq(index).width(w);
                        }
                        let table_width = 0;
                        for (let i = 0; i < os.mf_data[ss].cols_width.length; i++) {
                            table_width += os.mf_data[ss].cols_width[i];
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

}