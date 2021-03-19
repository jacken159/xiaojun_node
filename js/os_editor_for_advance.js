function editor_for_advance() {
    let editor = $("#editor");
    let fm_selector = $("#fm_selector");
    editor.on("keydown", function (EVENT) {
        let [CURRENT, tr_input] = [$(".td_selected"), $("#tr_input")];
        let [THIS, PARENT_TR, INDEX, THIS_CONTENT] = [$(this), CURRENT.closest("tr"), CURRENT.index(), CURRENT.closest(".os_content")];
        let SS = THIS_CONTENT.attr("id");
        let HEADERS = os_table[SS].headers;

        if (PARENT_TR.hasClass("tr_input")) {
            os_table_data_add_row(PARENT_TR.index())
            let CONTENT = new_row("new", SS, "", "", "", "tr_list tr_new tr_edited");
            tr_input.before(CONTENT);
            THIS_CONTENT.find(".td_selected").removeClass("td_selected");
            THIS_CONTENT.find(".tr_list").last().find("td").eq(INDEX).addClass("td_selected");
            set_editor(THIS_CONTENT.find(".td_selected"), -1, -1, -1, -1);
            set_mover(THIS_CONTENT.find(".td_selected"), 8, 8);
            renew_i();
        }
        if (os_table[SS].add_rows > 0) {
            let [CONTENT, TRS] = ["", THIS_CONTENT.find(".tr_list")];
            let AMOUNT = TRS.length - THIS_CONTENT.find(".selected_tr").index();
            if (AMOUNT < 9) {
                for (let i = AMOUNT; i < os_table[SS].add_rows; i++) {
                    CONTENT += new_row("new", SS, "", "", "", "tr_list tr_edited");
                    os_table_data_add_row(os_table_data[SS].length + i);
                }
                tr_input.before(CONTENT);
            }
            renew_i();
        }
        let TRS = THIS_CONTENT.find(".tr_edited");
        update_last_data(TRS);
    }).on("keyup", function () {
        let [current, self, tr_input] = [$(`#${content_focus}`).find(".td_selected"), $(this), $("#tr_input")];
        let [this_tr, index, this_content] = [current.closest("tr"), current.index(), current.closest(".os_content")];
        let page_top = parseFloat(this_content.find(".page_top").text());
        let ss = this_content.attr("id");
        let this_tr_index = this_tr.index() + page_top;
        let fm_s = [];
        if (os_table[ss].headers[index].fm_selector != null) {
            fm_s = os_table[ss].headers[index].fm_selector;
        }
        let fx = [];
        if (os_table[ss].headers[index].fx != null) {
            fx = os_table[ss].headers[index].fx;
        }
        if (self.val() == "..") {
            //alert(THIS_TR.html())
            if (this_tr.hasClass("tr_input")) {
                os_table_data_add_row(this_tr.index());
                let content = new_row("new", ss, "", "", "", "tr_list tr_new tr_edited");
                tr_input.before(content);
                tr_input.find("td").eq(index).text("").attr("data-text", "");
                this_content.find(".td_selected").removeClass("td_selected");
                this_content.find(".tr_list").last().find("td").eq(index).addClass("td_selected");
                set_editor(this_content.find(".td_selected"), -1, -1, -1, -1);
                set_mover(this_content.find(".td_selected"), 8, 8);
                renew_i();

            } else {
                //alert(THIS_TR.html())
                let val = $.trim(this_tr.prev().find("td").eq(index).attr("data-text"));
                self.val(val);
                current.text(val);
                current.attr("data-text", val);
                os_table_data[ss][this_tr_index + page_top][index] = val;
                //trs_edited_index[ss].push(this_tr_index);
            }
        }

        if (fm_s.length > 0) {
            set_fm_selector(current, 300, 300, -150, 12);
            let t = self.val();

            if (fm_s[0].type == "list") {
                encode_fm_list(ss, fm_s[0].data, fm_s[0].where.length, fm_s[0].disp.length, t);

            } else if (fm_s[0].type == "sql_list") {
                let LEN = 0;
                if (fm_s[0].LEN != null) {
                    LEN = fm_s[0].LEN;
                }
                if (self.val().length > LEN) {
                    post_func.abort();
                    $("#afl").remove();
                    $("#editor").focus();
                    $("#os_index").val(this_tr.index() + "||" + index);
                    encode_fm_list_sql(ss, "FM_LIST_SELECT", fm_s[0].data, t, fm_s[0].where, fm_s[0].disp);

                }

            }





        } else {
            if (fm_selector.width() > 0) {
                fm_selector.width(0).height(0);
                fm_selector.offset({ top: 0, left: 0 });

            }
        }



        if (fx.length > 0) {

            for (let i = 0; i < fx.length; i++) {
                let fx_text = fx[i].text, fx_where = fx[i].where;
                for (let j = 0; j < fx[i].key.length; j++) {
                    if (fx[i].key[j] == index) {
                        fx_text = fx_text.replace("f" + fx[i].key[j], self.val());
                    } else {
                        
                        fx_text = fx_text.replace("f" + fx[i].key[j], os_table_data[ss][page_top + this_tr_index][fx[i].key[j]]);
                    }
                }
                //console.log(fx_text)
                if ($.trim(self.val()) != "") {
                    let fx_text_eval = fx_text.toString().replace(/,/g, "");
                    let res = eval(fx_text_eval);

                    os_table_data[ss][page_top + this_tr_index][index] = self.val();
                    os_table_data[ss][page_top + this_tr_index][fx_where] = res.toFixed(2);
                    this_tr.find("td").eq(fx_where).text(res.toFixed(2)).attr("data-text", res.toFixed(2));
                }


                if (os_table[ss].tr_sum == "1") {
                    get_sum(content_focus);

                }

            }

        }
        if (os_table[ss].tr_sum == "1") {
            get_sum(content_focus);

        }
        if (os_table[ss].status != null) {
            if (os_table[ss].headers[index].check != null) {
                if (os_table[ss].headers[index].check.length > 0) {
                    let check = os_table[ss].headers[index].check;
                    let check_data = check[0];
                    //console.log(CHECK_DATA)
                    for (let i = 0; i < fm_list[check_data].length; i++) {
                        let check_t = fm_list[check_data][i][0];
                        let new_val = fm_list[check_data][i][check[2]];
                        if (check_t == $.trim(this_tr.find("td").eq(check[1]).attr("data-text"))) {
                            //console.log(CHECK_T,"#",NEW_VAL)
                            if (parseFloat(self.val()) > parseFloat(new_val)) {
                                if (parseFloat(new_val) > 0) {
                                    self.val("").val(new_val)
                                    current.text(new_val).attr("data-text", new_val);

                                } else {
                                    self.val("").val(0)
                                    current.text(0).attr("data-text", 0);
                                }
                            }
                        }
                    }

                }
            }
        }


    }).on("focus", function () {
        let current = $(".td_selected"), index = current.index();
        //console.log(INDEX)
        let this_content = current.closest(".os_content"), ss = this_content.attr("id"), this_object = current.closest(".os_bg_object");
        if (this_object.length > 0) { } else {
            if (os_table[ss].headers[index].fm_selector != null) {
                if (os_table[ss].headers[index].fm_selector.length > 0) {
                    let fm_s = os_table[ss].headers[index].fm_selector;
                    if (fm_s[0].type == "DATE") {
                        set_datepicker(current, -2, -2, 0, 0);
                    } else if (fm_s[0].type == "LIST" || fm_s[0].type == "SQL_LIST") {
                        set_fm_selector(current, 300, 300, -150, 12);
                    }
                }
            }
        }

    }).on('paste', function (EVENT) {

        os_table_paste();

    });


    let datepicker = $("#datepicker");
    datepicker.on("change", function () {
        let CURRENT = $("body").find(".td_selected"), THIS = $(this);
        CURRENT.text(THIS.val()).attr("data-text", THIS.val());
        let [THIS_TR, INDEX, THIS_CONTENT] = [CURRENT.closest("tr"), CURRENT.index(), CURRENT.closest(".os_content")];

        let SS = THIS_CONTENT.attr("id");


        for (let i = INDEX; i < THIS_TR.find("td").length; i++) {
            if (i == THIS_TR.find("td").last().index()) {
                //console.log("2")
                //console.log(THIS_TR.find("td").length)
                if (THIS_TR.next().length > 0) {
                    //console.log("3")
                    for (let j = 0; j < THIS_TR.next().find("td").length; j++) {
                        if (THIS_TR.next().find("td").eq(j).hasClass("disabled") || THIS_TR.next().find("td").eq(j).hasClass("hide")) { }
                        else {
                            THIS_CONTENT.find(".td_selected").removeClass("td_selected");
                            THIS_TR.next().find("td").eq(j).addClass("td_selected");
                            set_editor(THIS_TR.next().find("td").eq(j), -1, -1, -1, -1);
                            set_mover(THIS_TR.next().find("td").eq(j), 8, 8);
                            fm_selector.width(0).height(0);
                            fm_selector.offset({ top: 0, left: 0 });

                            $("#datepicker").offset({ top: 0, left: 0 });
                            $("#datepicker").width(0).height(0);

                            break;
                        }
                    }
                }

            } else {
                //console.log("4")
                if (THIS_TR.find("td").eq(i + 1).length > 0) {
                    //console.log("5");
                    if (THIS_TR.find("td").eq(i + 1).hasClass("disabled") || THIS_TR.find("td").eq(i + 1).hasClass("hide")) { }
                    else {
                        //console.log("6");

                        THIS_CONTENT.find(".td_selected").removeClass("td_selected");
                        THIS_TR.find("td").eq(i + 1).addClass("td_selected");
                        set_editor(THIS_TR.find("td").eq(i + 1), -1, -1, -1, -1);
                        set_mover(THIS_TR.find("td").eq(i + 1), 8, 8);
                        fm_selector.width(0).height(0);
                        fm_selector.offset({ top: 0, left: 0 });

                        $("#datepicker").offset({ top: 0, left: 0 });
                        $("#datepicker").width(0).height(0);

                        break;
                    }
                }

            }



        }
    }).on("keydown", function (EVENT) {
        let CURRENT = $("body").find(".td_selected");
        let [THIS, THIS_TR, INDEX, THIS_CONTENT] = [$(this), CURRENT.closest("tr"), CURRENT.index(), CURRENT.closest(".os_content")];
        let THIS_OBJECT = CURRENT.closest(".os_bg_object");

        let SS = THIS_CONTENT.attr("id");

        /*
                if (EVENT.which == 13) {
                    for (let i = INDEX; i < THIS_TR.find("td").length; i++) {
                        if (i == THIS_TR.find("td").last().index()) {
                            //console.log("2")
                            //console.log(THIS_TR.find("td").length)
                            if (THIS_TR.next().length > 0) {
                                //console.log("3")
                                for (let j = 0; j < THIS_TR.next().find("td").length; j++) {
                                    if (THIS_TR.next().find("td").eq(j).hasClass("disabled") || THIS_TR.next().find("td").eq(j).hasClass("hide")) { }
                                    else {
                                        CURRENT.removeClass("td_selected");
                                        THIS_TR.next().find("td").eq(j).addClass("td_selected");
                                        SET_EDITOR(THIS_TR.next().find("td").eq(j), -1, -1, -1, -1);
                                        SET_MOVER(THIS_TR.next().find("td").eq(j), 8, 8);
                                        fm_selector.width(0).height(0);
                                        fm_selector.offset({ top: 0, left: 0 });
        
                                        $("#datepicker").offset({ top: 0, left: 0 });
                                        $("#datepicker").width(0).height(0);
        
                                        break;
                                    }
                                }
                            }
        
                        } else {
                            //console.log("4")
                            if (THIS_TR.find("td").eq(i + 1).length > 0) {
                                //console.log("5");
                                if (THIS_TR.find("td").eq(i + 1).hasClass("disabled") || THIS_TR.find("td").eq(i + 1).hasClass("hide")) { }
                                else {
                                    //console.log("6");
                                    CURRENT.removeClass("td_selected");
                                    THIS_TR.find("td").eq(i + 1).addClass("td_selected");
                                    SET_EDITOR(THIS_TR.find("td").eq(i + 1), -1, -1, -1, -1);
                                    SET_MOVER(THIS_TR.find("td").eq(i + 1), 8, 8);
                                    fm_selector.width(0).height(0);
                                    fm_selector.offset({ top: 0, left: 0 });
        
                                    $("#datepicker").offset({ top: 0, left: 0 });
                                    $("#datepicker").width(0).height(0);
        
                                    break;
                                }
                            }
        
                        }
        
        
        
                    }
        
        
                    return false;
                }
        
        */
    });
}