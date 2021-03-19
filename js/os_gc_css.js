import $ from 'jquery';
import {
	os
} from '/js/os_source';
function del_from_css(){
	$("body").on(os.click,".delable",function(){
		console.log("123")
		$(this).remove();
	})
}