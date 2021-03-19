
function fm_selector_func() {
    let fm_selector = $("#fm_selector");
    let datepicker = $("#datepicker");
    fm_selector.on("keydown", "li.FM_LIST", function (EVENT) {
        let [THIS, CONTAINER] = [$(this), $(".CONTENT_FOCUS").find(".td_selected")];
        let [INDEX, THIS_TR, THIS_CONTENT] = [CONTAINER.index(), CONTAINER.closest("tr"), CONTAINER.closest(".os_content")], SS = THIS_CONTENT.attr("id");
        //var I = parseInt((SELECTOR_KEY.indexOf(INDEX.toString())));
        let editor = $("#editor");
        let THIS_INPUT = $(".inputfocus");

        switch (EVENT.which) {
            case 8:
                if (editor.offset().left > 0) {
                    editor.focus();

                } else {
                    THIS_INPUT.focus();
                }
                return false;

            case 13:
                if ($("#editor").offset().left > 0) {
                    let FM_S = os_table[SS].headers[INDEX].fm_selector;
                    let TDS = THIS_TR.find("td");
                    for (let j = 0; j < FM_S[0].WHERE.length; j++) {
                        TDS.eq(FM_S[0].WHERE[j]).addClass("OS_PD");
                        TDS.eq(FM_S[0].WHERE[j]).text(THIS.attr("data-" + j)).attr("data-text", THIS.attr("data-" + j));
                    }
                    //FC_YA_CHECK(INDEX, $.trim(CONTAINER.attr("data-text")));
                    THIS_TR.find("td").first().attr("li-index", THIS.attr("data-i"));
                    if (CONTAINER.next().length > 0) {
                        if (CONTAINER.next().hasClass("disabled")) {
                            reset_editor();
                            
                        } else if (CONTAINER.next().hasClass("hide")) {
                            reset_editor();
                        } else {
                            set_editor(CONTAINER.next(), -1, -1, -1, -1);
                            set_mover(CONTAINER.next(), 8, 8);
                            CONTAINER.removeClass("td_selected");
                            CONTAINER.next().addClass("td_selected");

                            THIS_TR.addClass("tr_edited");
                        }
                    } else {
                        reset_editor();
                        
                    }
                    update_last_data(THIS_TR);
                } else {
                    THIS_INPUT.val(THIS.text());
                    reset_editor();
                    if (THIS_INPUT.closest("div").next().find("input").length > 0) {
                        THIS_INPUT.closest("div").next().find("input").focus()

                    }
                }



            case 27:
                if (editor.offset().left > 0) {
                    editor.focus();

                } else {
                    THIS_INPUT.focus();
                }
                return false;
            case 37:

                if (CONTAINER.prev().length > 0) {
                    if (CONTAINER.prev().hasClass("disabled")) { } else if (CONTAINER.prev().hasClass("hide")) { } else {
                        set_editor(CONTAINER.prev(), -1, -1, -1, -1);
                        set_mover(CONTAINER.prev(), 8, 8);
                        CONTAINER.removeClass("td_selected");
                        CONTAINER.prev().addClass("td_selected");
                        CONTAINER.removeClass("current");
                        CONTAINER.prev().addClass("current");
                    }

                }
                fm_selector.width(0).height(0);
                fm_selector.offset({ top: 0, left: 0 });

                break;
            case 38:
                if (THIS.prev().length > 0) {
                    THIS.prev().focus().addClass("FM_SELECT").siblings().removeClass("FM_SELECT");

                }
                return false;
            case 39:

                if (CONTAINER.next().length > 0) {
                    if (CONTAINER.next().hasClass("disabled")) { } else if (CONTAINER.next().hasClass("hide")) { } else {
                        set_editor(CONTAINER.next(), -1, -1, -1, -1);
                        set_mover(CONTAINER.next(), 8, 8);
                        CONTAINER.removeClass("td_selected");
                        CONTAINER.next().addClass("td_selected");
                        CONTAINER.removeClass("current");
                        CONTAINER.next().addClass("current");
                    }


                }
                fm_selector.width(0).height(0);
                fm_selector.offset({ top: 0, left: 0 });

                break;
            case 40:
                if (THIS.next().length > 0) {

                    THIS.next().focus().addClass("FM_SELECT").siblings().removeClass("FM_SELECT");
                }
                return false;
            //default: break;
        }



    }).on('touchstart', 'li.FM_LIST', function (EVENT) {
       
        let THIS = $(this), CONTAINER = $("body").find(".td_selected"), INDEX = CONTAINER.index();
        let THIS_CONTENT = CONTAINER.closest(".os_content"), SS = THIS_CONTENT.attr("id");
        let THIS_TR = CONTAINER.closest("tr");
        let TDS = THIS_TR.find("td");
        let THIS_INPUT = $(".inputfocus");
        OS_TOUCHING_COUNT=0;
        TOUCHING(()=>{
            if ($("#editor").offset().left > 0) {
                if (os_table[SS].headers[INDEX].fm_selector[0] != null) {
                    let FM_S = os_table[SS].headers[INDEX].fm_selector;
                    for (let j = 0; j < FM_S[0].WHERE.length; j++) {
                        TDS.eq(FM_S[0].WHERE[j]).text(THIS.attr("data-" + j)).attr("data-text", THIS.attr("data-" + j));
                    }
                    //FC_YA_CHECK(INDEX, $.trim(CONTAINER.attr("data-text")));
                    THIS_TR.find("td").first().attr("li-index", THIS.attr("data-i"));
                    
                    update_last_data(THIS_TR);
                    if (CONTAINER.next().length > 0) {
                        let INDEX_NEXT = CONTAINER.next().index();
                        if (CONTAINER.next().hasClass("disabled") || CONTAINER.next().hasClass("hide")) { } else {
                            let FM_S_NEXT = os_table[SS].headers[INDEX_NEXT].fm_selector;
                            if (FM_S_NEXT.length > 0) {
                                if (FM_S_NEXT[0].TYPE == "DATE") {
                                    set_datepicker(CONTAINER.next(), -2, -2, 0, 0);
                                    reset_editor();
    
                                } else if (FM_S_NEXT[0].TYPE == "LIST") {
                                    set_fm_selector(CONTAINER, 300, 300, -200, 2);
    
                                    set_editor(CONTAINER.next(), -1, -1, -1, -1);
                                    set_mover(CONTAINER.next(), 8, 8);
    
                                }
                            } else {
                                
                                set_editor(CONTAINER.next(), -1, -1, -1, -1);
                                set_mover(CONTAINER.next(), 8, 8);
                                $("#fm_selector,#datepicker").offset({ top: 0, left: 0 });
                                $("#fm_selector,#datepicker").width(0).height(0);
                            }
                            //THIS_CONTENT.find(".td_selected").removeClass("td_selected");
                            CONTAINER.removeClass("td_selected");
                            CONTAINER.next().addClass("td_selected");
    
                            THIS_TR.addClass("tr_edited");
                        }
                    } else {
                        reset_editor();
                    }
                }
            } else {
                THIS_INPUT.val(THIS.text());
                reset_editor();
            }
        },">",2,EVENT.touches.length)
        


    }).on('touchstart', '.card_list', function (EVENT) {
       
        let THIS = $(this), CONTAINER = $("body").find(".td_selected"), INDEX = CONTAINER.index();
        let THIS_CONTENT = CONTAINER.closest(".os_content"), SS = THIS_CONTENT.attr("id");
        let THIS_TR = CONTAINER.closest("tr");
        let TDS = THIS_TR.find("td");
        let THIS_INPUT = $(".inputfocus");
        OS_TOUCHING_COUNT=0;
        TOUCHING(()=>{
            if ($("#editor").offset().left > 0) {
                if (os_table[SS].headers[INDEX].fm_selector[0] != null) {
                    let FM_S = os_table[SS].headers[INDEX].fm_selector;
                    for (let j = 0; j < FM_S[0].WHERE.length; j++) {
                        TDS.eq(FM_S[0].WHERE[j]).text(THIS.attr("data-" + j)).attr("data-text", THIS.attr("data-" + j));
                    }
                    //FC_YA_CHECK(INDEX, $.trim(CONTAINER.attr("data-text")));
                    THIS_TR.find("td").first().attr("li-index", THIS.attr("data-i"));
                    
                    update_last_data(THIS_TR);
                    if (CONTAINER.next().length > 0) {
                        let INDEX_NEXT = CONTAINER.next().index();
                        if (CONTAINER.next().hasClass("disabled") || CONTAINER.next().hasClass("hide")) { } else {
                            let FM_S_NEXT = os_table[SS].headers[INDEX_NEXT].fm_selector;
                            if (FM_S_NEXT.length > 0) {
                                if (FM_S_NEXT[0].TYPE == "DATE") {
                                    set_datepicker(CONTAINER.next(), -2, -2, 0, 0);
                                    reset_editor();
    
                                } else if (FM_S_NEXT[0].TYPE == "LIST") {
                                    set_fm_selector(CONTAINER, 300, 300, -200, 2);
    
                                    set_editor(CONTAINER.next(), -1, -1, -1, -1);
                                    set_mover(CONTAINER.next(), 8, 8);
    
                                }
                            } else {
                                
                                set_editor(CONTAINER.next(), -1, -1, -1, -1);
                                set_mover(CONTAINER.next(), 8, 8);
                                $("#fm_selector,#datepicker").offset({ top: 0, left: 0 });
                                $("#fm_selector,#datepicker").width(0).height(0);
                            }
                            //THIS_CONTENT.find(".td_selected").removeClass("td_selected");
                            CONTAINER.removeClass("td_selected");
                            CONTAINER.next().addClass("td_selected");
    
                            THIS_TR.addClass("tr_edited");
                        }
                    } else {
                        reset_editor();
                    }
                }
            } else {
                THIS_INPUT.val(THIS.find(".card_title").text());
                reset_editor();
            }
        },">",1,EVENT.touches.length)
        


    });

    datepicker.on("change", function () {
        let CONTAINER = $(".CONTENT_FOCUS").find(".td_selected");
        let THIS_TR = CONTAINER.closest("tr");
        THIS_TR.addClass("tr_edited");
        update_last_data(THIS_TR);
    });
}

