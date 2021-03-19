

function new_card(source, card_type, menu_type, card_content_width) {
  //console.log(source)
  let content = '';
  for (let i = 0; i < source.length; i++) {
    let u = {};
    u['I'] = i;

    if (card_content_width == null || card_content_width == 'undefined') {
      card_content_width = 90;
    }

    let card_list_width = 95;
    if (menu_type == 'checkbox' || menu_type == 'DELETE') {
      card_list_width = 86;
    }
    if (card_type == 'card') {
      content += `
            <div class='card_list float_left clear ${source[i].color}' tabindex='${i}' i='${source[i].I}' n='${source[i].n}' s='${source[i].s}' s='${source[i].o}' t='${source[i].text}' dir='${source[i].dir}' idx='${source[i].id}' style='width:${card_content_width}%'>
                <div class='float_left ' style='max-height:40px;max-width:40px;'></div>`;
      content += `
                <div class='card_list_content float_left' style='width:${card_list_width}%'>
                    <div class='float_left CARD_LEFT'>
                        <div  n='0' class='card_i hide card_t 0' t='${source[i].id}'>${source[i].id}</div>
                        <div  n='1' class='card_l_up card_t 1' t='${source[i].l_up}'>${source[i].l_up}</div>
                        <div  n='2' class='card_title card_t 2' t='${source[i].title}'>${source[i].title}</div>
                        <div  n='3' class='card_l_down card_t 3' t='${source[i].l_down}'>${source[i].l_down}</div>
                    </div>
                    <div class='float_right CARD_RIGHT'>
                        <div  n='4' class='card_r_up card_t 4' t='${source[i].r_up}'>${source[i].r_up}</div>`;
      if (menu_type != 'checkbox') {
        content += `<div  n='5' class='card_text card_t 5' t='${source[i].text}'>${source[i].text}</div>`;
      }
      content += `<div  n='6' class='card_r_down card_t 6' t='${source[i].r_down}'>${source[i].r_down}</div>
                    </div>
                </div>`;
    } else if (card_type == 'item') {
      content += new_item(source[i]);
    }

    if (menu_type == 'menu') {
      content += `<div class='CARD_LIST_MENU MENU_SIDE ICON MT10' style='position:absolute;right: 0;'></div>`;
    } else if (menu_type == 'checkbox') {
      let checked = '';
      if (source[i].text == true) {
        checked = 'checked';
      }
      content += `<input type='checkbox' class='card_list_checkbox' style='position:relative;right: 10%;' ${checked} />`;
    } else if (menu_type == 'next') {
      content += `
                <div class='next_icon ICON MT5 ' style='position:relative;left: 93%;'></div>
                <div class='LESS hide'></div>
            `;
    } else if (menu_type == 'DELETE') {
      content += `
                <div class='DELETE_ICON ICON MT10 float_left' style='position:relative;right:0;'></div>
             `;
    } else if (menu_type == 'compare') {
      content += `
                <div class='CARD_LIST_COMPARE float_left' style='width:95%;'>
                    <div><text class='card_compare_title' >${source[i][7]}</text><text class='card_compare_subtitle'>${source[i][8]}</text></div>
                    <div class='float_left MT5' style='width:45%'>
                        <div id='${i}_9' class='CARD_BEFORE card_t 9' t='${source[i][9]}'>${source[i][9]}</div>
                    </div>
                    <div class='right_icon ICON float_left' style='width:23%'></div>
                    <div class='float_left CARD_RIGHT MT5'>
                        <div id='${i}_10' class='CARD_AFTER card_t 10' t='${source[i][10]}'>${source[i][10]}</div>
                    </div>
                </div>
            `;
    } else if (menu_type == 'ul') {
      content += `
                <ul id='card_ul'></ul>
            `;
    }
    content += `</div>`;
    if (menu_type == 'item') {
      content += `
                <div id='card_item${i}' i='${i}' class='clear card_item ${source[i].color}' style='max-height:440px;overflow:auto'></div>
            `;
    }
  }

  return content;
}

function new_item(source) {
  let content = `
        <div n='${source.n}' n='${source.o}' i='${source.I}' idx='${source.id}'  class='card_list_content item item_120 ${source.color} float_left'>
        
            <div  n='0' class=' hide card_t 0' t='${source.id}'>${source.id}</div>
            <div  n='1' class=' card_t 1' t='${source.l_up}'>${source.l_up}</div>
            <div  n='2' class=' card_t 2' t='${source.title}'>${source.title}</div>
            <div  n='3' class=' card_t 3' t='${source.l_down}'>${source.l_down}</div>
        
            <div  n='4' class=' card_t 4' t='${source.r_up}'>${source.r_up}</div>
            <div  n='5' class=' card_t 5' t='${source.text}'>${source.text}</div>
            <div  n='6' class=' card_t 6' t='${source.r_down}'>${source.r_down}</div>
            
    `;
  return content;
}

function encode_card_array_from_array(card_key, card_data) {
  let a = [];
  //console.log(data)
  for (let i = 0; i < card_data.length; i++) {
    let u = {};
    let l = card_data[i].length;
    if (card_data[i].length < card_key.length) {
      l = card_key.length;
    }
    for (let j = 0; j < l; j++) {
      //console.log(data[i])
      if (card_key[j] != null) {
        if (card_data[i][j] == null) {
          u[card_key[j]] = '';
        } else {
          u[card_key[j]] = card_data[i][j];
        }
      } else {
        if (card_data[i][j] == null) {
          u[j] = '';
        } else {
          u[j] = card_data[i][j];
        }
      }
    }
    //console.log(u)
    a.push(u);
  }
  return a;
}
