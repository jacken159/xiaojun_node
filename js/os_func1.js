function wap_get_soft() {
    return new Promise(r => {
        let jd = ["dir", "mc", "input_type"];
        os_cs = { "n": "n", "table": "[WT].[dbo].[we_soft]", "jd": jd, "jd_len": jd.length };
        load_ajax("select", "wap_select").then(() => {
            before_load(os_hide, os_show);
            r(os_table_data["wap_get_soft"] = os_table_data["wap_select"]);
        })
    })


}


function renew_content_focus(ss) {
    localStorage.setItem("content_focus", ss);
    content_focus = ss;
}

function renew_fm_source() {
    let jd = ["dwmc"];
    os_cs = { "distinct": "distinct", "table": "[WT].[dbo].[os_hwjl]", "jd": jd, "jd_len": jd.length, "pd": " _tg=N'Y' ", "order": " order by dwmc asc" };
    fm_source("fm_list", "get_distinct", "fptg_dwmc");
    jd = ["sssg"];
    os_cs = { "distinct": "distinct", "table": "[WT].[dbo].[os_fp]", "jd": jd, "jd_len": jd.length, "order": " order by sssg desc" };
    fm_source("fm_list", "get_distinct", "fptg_sssg");
    jd = ["ss_mc"];
    os_cs = { "distinct": "distinct", "table": "[WT].[dbo].[os_fp]", "jd": jd, "jd_len": jd.length, "order": "  order by ss_mc asc" };
    fm_source("fm_list", "get_distinct", "fptg_ss_mc");
    jd = ["hwmc"];
    os_cs = { "distinct": "distinct", "table": "[WT].[dbo].[os_fp]", "jd": jd, "jd_len": jd.length, "order": "  order by hwmc asc" };
    fm_source("fm_list", "get_distinct", "fptg_hwmc");
    jd = ["UNIT_NAME"];
    os_cs = { "id": "UNIT_ID", "table": "UNIT", "jd": jd, "jd_len": jd.length, "order": "  order by UNIT_NAME asc" };
    fm_source("fm_list", "get_distinct", "wt_dw");
    jd = ["DOC_NAME", "DOC_CODE", "CATEGORY", "SEQUENCE_DIGIT", "DOC_ID", "STOCK_ACTION", "PRINT_LAYOUT1_REPORT_TYPEKEY", "STOCK_ACTION"];
    os_cs = { "table": "DOC", "jd": jd, "jd_len": jd.length, "pd": " ApproveStatus='Y' ", "order": "  ORDER BY DOC_NAME asc" };
    fm_source("fm_list", "get_distinct", "wt_doc_list");
    jd = ["WAREHOUSE_CODE", "WAREHOUSE_NAME"];
    os_cs = { "distinct": "distinct", "table": "WAREHOUSE", "jd": jd, "jd_len": jd.length, "order": "  order by WAREHOUSE_NAME asc" };
    fm_source("fm_list", "get_distinct", "wt_wh");
    jd = ["left(convert(nvarchar,yk,120),10)as yk"];
    os_cs = { "distinct": "distinct", "table": "[WT].[dbo].[ta_cm_wlygj]", "jd": jd, "jd_len": jd.length, "order": "  order by yk desc" };
    fm_source("fm_list", "get_distinct", "ta_ssyk");
    jd = ["hwmc", "lhy+tel as lhy", "dj"];
    os_cs = { "table": "[WT].[dbo].[ta_cm_hwjl]", "jd": jd, "jd_len": jd.length, "order": "  order by hwmc asc" };
    fm_source("fm_list", "get_distinct", "ta_hwmc");
    //fm_source("get_distinct", "FP_SS_LIST", { "PD": "_SS#FP" });
}

function reflush_table(ss) {
    let page_top = os_top, page_bottom = os_bottom;
    let total_width = 0;
    let headers = os_table[ss].headers;
    for (let i = 0; i < headers.length; i++) {
        if (os_cols_width[ss][i] == null) {
            total_width += parseFloat(headers[i].width);
        } else {
            total_width += parseFloat(os_cols_width[ss][i]);

        }
    }

    let filter = "";

    if (os_table[ss].filter == "1") {
        filter += `<div class='filter_icon filter_size hide'></div>`;
    }
    let col_resize = `<div class='col_resize dragable cant_select'></div>`;

    if (os_table[ss].add_cols.length > 0) {

        for (let i = 0; i < os_table[ss].add_cols.length; i++) {
            total_width += parseFloat(os_table[ss].add_cols[i].width);
        }
    }


    let table_header = "";
    table_header += `
        <div style='width:${total_width}px;overflow:hidden'>
            <table class='cant_select'  >
                <thead class='table_tt'>
                    <tr>`;
    for (let i = 0; i < headers.length; i++) {
        let th_width = os_cols_width[ss][i];
        if (os_cols_width[ss][i] == null) {
            th_width = headers[i].width;
        }
        if (headers[i].t == "序") {
            table_header += `<th title='${i}' style='width:${th_width}px;'  class='for_resize' ><div class='OS_TH' >${headers[i].t}</div><div  style='position: relative;top:-17px;'>${col_resize}</div></th>`;

        } else {
            table_header += `<th title='${i}' style='width:${th_width}px;' class='for_resize ${headers[i].hide} ${headers[i].disa} ${headers[i].color}' ><div class='OS_TH' >${headers[i].t}</div><div style='position: relative;top:-17px;height:100%'>${filter}${col_resize}</div></th>`;
        }
    }
    if (os_table[ss].add_cols.length > 0) {
        let a = os_table[ss].add_cols;
        for (let i = 0; i < a.length; i++) {
            table_header += `<th style='width:${a[i].width}px;' class='for_resize ${a[i].class}' ><div class='OS_TH' >${a[i].text}</div><div style='position: relative;top:-17px;height:100%'>${filter}${col_resize}</div></th>`;
        }
    }
    table_header += `
                    </tr>
                </thead>
            </table>
        </div>`;

    $("#" + ss + "_table_header").empty().append(table_header);



    let table_body = "";
    table_body += `
        <div id='${ss}_table_body_div' class='' style='width:${total_width}px;'>
            <table id='${ss}_table_body_table' class=' table_ms cant_select' >
                <tbody id='table_data' class='table_data FFF'>`;
    let data_len = os_table_data[ss].length;


    for (let i = os_top; i < os_bottom; i++) {
        //console.log(i)
        if (os_table_data[ss][i] != null) {
            //console.log(os_table_data[ss][i])
            table_body += new_row("", ss, os_table_data[ss][i], i, "", " tr_list");


        }
        //console.log(2)

    }


    if (os_table[ss].add_rows > 0) {
        for (let i = 0; i < os_table[ss].add_rows; i++) {
            table_body += new_row("new", ss, "", "", "", "tr_list tr_edited tr_new");
            os_table_data_add_row(os_table_data[ss].length)
        }
    }


    if (os_table[ss].tr_input == "1") {
        table_body += new_row("new", ss, "", "", "tr_input", "tr_input");
    }

    if (os_table[ss].tr_sum == "1") {
        table_body += new_row("new", ss, "", "", ss + "tr_sum", "tr_sum");
    }

    table_body += `
                </tbody>
            </table>
        </div>
    </div>`;

    //console.log(table_body)
    $("#" + ss + "_table_body").empty().append(table_body);


    let nav_content = "";
    if (os_table[ss].nav_bottom == "1") {
        let l = 0;
        if (os_table_data[ss][0] != null) {
            l = os_table_data[ss][0].length;
        }
        let len = l + os_table[ss].add_cols.length;
        nav_content += `
            <tr id='${ss}tr_nav_bottom' class='tr_nav_bottom' >
            <td colspan='${len}' class='disabled'>
                <div class='float_left'>
                    <div class='float_left' >每页显示<input type='text' class='per_page' value='${os_perpage}' style='width:10em;' />行</div>
                    <div class='HOVER float_left' title='上一页'><div class='prev_icon ICON'></div></div>
                    <div class='HOVER float_left' title='下一页'><div class='next_icon ICON float_left'></div></div>
                    <div class='float_left'>第<text class='page_top'>${os_top}</text>行</div>
                    <div class='float_left'>到<text class='page_bottom'>${os_bottom}</text>行</div>
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
    $("#" + ss + "_table_nav").empty().append(nav_content);


    $("#" + ss + "_STATUS").remove();

    if (os_table[ss].status != null) {
        if (os_table[ss].status == "1") {
            $("#" + ss + "_content").append(`
            <div id='${ss}_status' class='os_table_tt' >
                <tr></tr>
            </div>
            `);
        }


    }

    if (os_table[ss].tr_sum == "1") {
        get_sum(ss);
    }

    if (os_table[ss].pages_from == "j") { } else {
        $("#" + ss).find(".page_top").text(page_top);
        $("#" + ss).find(".page_bottom").text(page_bottom);
    }
    os_page_top = page_top;
    let totle_h = $(window).height();
    if ($("#" + ss).parent().hasClass("swift")) {
        totle_h = $(window).height() * 0.8;
    }
    let nav_h = $("#nav").height(), table_nav_h = $("#" + ss + "_table_nav").height() + 10, header_h = $("#" + ss + "_table_header").height();
    if (table_nav_h == 10) {
        table_nav_h = 50;
    }
    if (header_h == 0) {
        header_h = 40;
    }
    //console.log(nav_h, "#", table_nav_h, "#", header_h)
    let h = totle_h - nav_h - table_nav_h - header_h;
    $("#" + ss + "_content").height(h);
    $("#" + ss).offset({ top: nav_h });

    renew_i(ss);




}



function mover_func() {
    let mover = $("#mover");
    mover.on("dblclick", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let this_content = $(`#${content_focus}`);
        let current = this_content.find(".td_selected");
        let this_tr = current.closest("tr"), this_tr_index = this_tr.index();
        let trs = this_content.find(".tr_list");
        let page_top = parseFloat(this_content.find(".page_top").text());
        for (let i = this_tr_index; i < trs.length; i++) {
            for (let j = 0; j < current.length; j++) {
                let val = current.eq(j).attr("data-text");
                trs.eq(i).find("td").eq(current.eq(j).index()).text(val).attr("data-text", val);
                trs_edited_index[ss].push(page_top + i);
                update_last_data(trs.eq(i))
            }
        }
        os_mover_over = false; clicking = false;


    }).on("mousedown", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if ($(".td_selected").closest(".os_bg_object").length > 0) {
            os_resize_status = 1;

        } else {
            let this_content = $(`#${content_focus}`), ss = this_content.attr("id");
            if (os_table[ss].mover == "1") {
                this_content.find(".td_selected").addClass("selected for_mover");
                this_content.find(".selected_tr").addClass("mover_tr");

                os_mover_over = true;
                let first = this_content.find(".for_mover").first();
                os_row_i.push(first.closest("tr").index());
                os_col_i.push(first.index());
            }
        }

    });
}



function get_dg(from, ss, date, bh_i, sl_i, dg_i, ga_i, wh_i) {

    return new Promise((r, reject) => {
        let a = os_table_data[ss];
        $("#proc").removeClass("hide");
        $("#proc").val(0);
        let proc_val = $("#proc").val();
        $("#bar").removeClass("hide");
        $("#proc").attr("max", a.length);
        let I = 0;
        for (let i = 0; i < a.length; i++) {
            $("#bar").removeClass("hide");
            os_cs.date = date;
            os_cs.bh = a[i][bh_i];
            os_cs.wh = a[i][wh_i];
            load_ajax("fm_list", from).then(() => {
                if (os_table_data[from].length > 0) {
                    if (os_table_data[from][0][0] == "") {
                        a[i][ga_i] = "";
                    } else {
                        let dg = os_table_data[from][0][0]
                        if (a[i][3] != "") {
                            dg = os_table_data[from][0][0] / parseFloat(a[i][3]);
                        }
                        a[i][dg_i] = dg;
                        if (typeof (sl_i) == "number") {
                            let ga = parseFloat(a[i][sl_i]) * parseFloat(a[i][dg_i]);
                            a[i][ga_i] = ga.toFixed(2);
                        } else if (typeof (sl_i) == "object") {
                            for (let j = 0; j < sl_i.length; j++) {
                                let ga = parseFloat(a[i][sl_i[j]]) * parseFloat(a[i][dg_i]);
                                a[i][ga_i[j]] = ga.toFixed(2);
                            }
                        }
                    }

                }

                I++
                proc_val++
                $("#proc").val(proc_val);
                if (I == a.length) {
                    os_table_data["ss"] = a;

                    $("#bar").addClass("hide");

                    r(reflush_table(ss));
                    content_focus = ss;
                }
            });

        }
    });

}

function os_table_data_add_row(start_index) {
    let headers = os_table[content_focus].headers;
    let a = [];
    for (let i = 0; i < headers.length; i++) {
        a.push("");
    }

    os_table_data[content_focus].splice(start_index, 0, a);
    os_table_data[content_focus][os_table_data[content_focus].length - 1][0] = os_table_data[content_focus].length - 1;

}



function frame_for_download(ss_or_array, file_name) {
    let t = "";
    let a
    if (typeof (ss_or_array) == "string") {
        a = os_table_data[ss_or_array];
    } else if (typeof (ss_or_array) == "object") {
        a = ss_or_array;
    }

    xiaojun_db.getItem("for_print_header").then(res => {

        let tt = "";
        console.log(res)
        if (res!=null) {
            let h = os_table[ss_or_array].headers;
            for (let i = 0; i < res.length; i++) {
                if (res[i] == true) {
                    tt += h[i].t + "\t";
                }
            }
        }
        t += tt + "\n";

        if (res!=null) {
            for (let i = 0; i < a.length; i++) {
                let td = "";
                for (let j = 0; j < a[i].length; j++) {
                    if (res[j] == true) {
                        if (os_table[ss_or_array].headers[j].format == "sfj") {
                            td += "\uFEFF" + a[i][j] + "\t";
                        } else {
                            td += a[i][j] + "\t";
                        }
                    }
                }
                let tr = td + "\n";
                t += tr;
            }
        } else {
            for (let i = 0; i < a.length; i++) {
                let td = "";
                for (let j = 0; j < a[i].length; j++) {
                    if(os_table[ss_or_array].headers[j]!=null){
                        if (os_table[ss_or_array].headers[j].format == "sfj") {
                            td += "\uFEFF" + a[i][j] + "\t";
                        } else {
                            td += a[i][j] + "\t";
                        }
                    } else {
                        td += a[i][j] + "\t";
                    }
                    
                }
                let tr = td + "\n";
                t += tr;
            }
        }



        var blob = new Blob([/*"\uFEFF" +*/ t], { type: "application/vnd.ms-excel;charset=utf-8" });
        saveAs(blob, file_name);
        xiaojun_db.setItem("for_print_header", null);
    })

}


function replace_jd(data) {
    let t = data.replace("MC", "ITEM.ITEM_NAME").replace("KWG", "ITEM.ITEM_SPECIFICATION").replace("BH", "ITEM.ITEM_CODE").replace("FW", "ITEM_WAREHOUSE.UDF022").replace("CF", "WAREHOUSE.WAREHOUSE_NAME").replace("WH", "WAREHOUSE.WAREHOUSE_NAME").replace("mc", "ITEM.ITEM_NAME").replace("kwg", "ITEM.ITEM_SPECIFICATION").replace("bh", "ITEM.ITEM_CODE").replace("fw", "ITEM_WAREHOUSE.UDF022").replace("cf", "WAREHOUSE.WAREHOUSE_NAME").replace("wh", "WAREHOUSE.WAREHOUSE_NAME").replace("yy", "EMPLOYEE.EMPLOYEE_NAME");
    return t
}

function encode_download_header(ss_f) {
    let ss = content_focus;
    if (ss_f != null) {
        ss = ss_f;
    }
    let h = os_table[ss].headers;
    let t = "";
    for (let i = 0; i < h.length; i++) {
        if (i < 4) {
            t += `<label for='afc${i}' style='top:20px'>${h[i].t}</label><input id='afc${i}' type='checkbox'/><br>`;
        } else {
            t += `<label for='afc${i}' style='top:20px'>${h[i].t}</label><input id='afc${i}' type='checkbox' checked=checked /><br>`;
        }

    }
    return t
}

function afd(ss, download_name) {
    return new Promise(r => {
        console.log(ss)
        afc_func(encode_download_header(ss), "请选择需要下载的列");
        let afc = $("#afc");
        afc.on(os_click, "#continue", function () {
            let cbs = $("#afc").find('input[type=checkbox]');
            let a = os_table_data[ss];
            let u = [];
            let h = [];
            for (let j = 0; j < cbs.length; j++) {
                h.push(cbs.eq(j).prop("checked"));
            }
            xiaojun_db.setItem("for_print_header", h).then(() => {

                r(frame_for_download(ss, download_name + ".xls"));
                console.log(u);
            });




        })
    })

}