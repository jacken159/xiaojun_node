function H5() {
    try {
        plus.key.addEventListener("backbutton", function () {
            os_back_func();

            //console.log(TABLE_HISTROY)
        });
    } catch (error) {
        console.log("BACK" + JSON.stringify(error))
    }

}


function os_back_func() {
    $("#bar,#wfw").addClass("hide")
    reset_editor();
    enter_direction = 'right';
    //content_focus = localStorage.getItem("content_focus");
    let back = table_histroy[table_histroy.length - 2];

    let a = [];
    for (let i = 0; i < table_histroy.length; i++) {
        a.push(table_histroy[i]);
    }
    if (os_device == "pc") {
        a.push("OS_CANCEL", "swift", content_focus);
    } else {
        a.push("OS_CANCEL", "swift", "os_save", content_focus);
    }

    after_cancel(a, [back, "os_replace"]);

   
    //localStorage.setItem("content_focus", back);
    if(typeof(back)=="object"){
        table_histroy.splice(table_histroy.indexOf(back), table_histroy.length - 1);
        content_focus = back[0];
    }else if(typeof(back)=="string"){
        table_histroy.splice(table_histroy.indexOf(content_focus), table_histroy.length - 1);
        content_focus = back;
    }
    $("#os_last_query").val(back);
    if (table_histroy.length == 1) {
        $("#os_menu").removeClass("hide");
        $("#os_back").addClass("hide");
        //$("#os_save").addClass("hide");
        for_save = {};

        content_focus = table_histroy[0];
    }
    find_type = 'menu';
    os_top = 0;
    os_bottom = os_perpage;
}

function after_cancel(hide, show, type_f) {
    for (let i = 0; i < hide.length; i++) {
        $("#" + hide[i]).addClass("hide");
    }
    for (let i = 0; i < show.length; i++) {
        console.log(show[i])
        if (typeof (show[i]) == "string") {
            $("#" + show[i]).removeClass("hide");
        } else if (typeof (show[i]) == "object") {
            for (let j = 0; j < show[i].length; j++) {
                $("#" + show[i][j]).removeClass("hide");
            }
        }
    }

    $("#OS_TYPE").text(type_f).removeClass("WHEAT");

    $(".td_selected").removeClass("td_selected");
    //$("#os_ttid").val("");

    $("#OS_CHECK").removeClass("BLUE");
    os_check = false;
}