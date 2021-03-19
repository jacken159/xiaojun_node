
/*
import { checkos, new_nav, new_link } from '/js/os_after.js';
import { nav } from '/js/os_nav.js';
import { mf_func } from '/js/os_mf.js';
import { input_func } from '/js/os_input.js';
import { os } from '/js/os_source.js';
import { os_content_func } from '/js/os_content.js';
import { editor_func } from '/js/os_editor.js';
*/

console.log('index ready')
$(() => {
  checkos().then((r) => {
    console.log(os.perpage, r, os.fp);



    os_content_func();
    input_func();
    editor_func();
    new_nav();
    setTimeout(() => {
      nav();
      mf_func();
      if (os.mf_data.sssg == null || os.mf_data.sssg.length == 0) {
        os.mf_data.sssg = [];
        os.mf_data.sssg.push(os.ssyf);
        os.sssg_option = os.mf_data.sssg;
      }
      if (os.mf_data.sssg[0] < os.ssyf) {
        os.mf_data.sssg.splice(0, 0, os.ssyf);
      }
      let o = '';
      for (let i = 0; i < os.mf_data.sssg.length; i++) {
        o += `<option value='${os.mf_data.sssg[i]}'>${os.mf_data.sssg[i]}</option>`;
      }
      $('#os_sssg').empty().append(o);
      
    }, 500);


  });
});
