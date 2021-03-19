
localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'myApp',
  version: 1.0,
  //size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'key_value' // Should be alphanumeric, with underscores.
  //description : 'some description'
});

var xiaojun_db = localforage.createInstance({
  name: 'xiaojun_db'
});

//xiaojun_db.setItem("j","e895b3885e9463e112422d91a8714a55");

let date = new Date();
let d_s = date.toISOString().split('T');
let d = d_s[0];
let date_s = d.split('-');

let ssyf = date_s[0] + date_s[1];
let this_date = new Date(date.getFullYear(), date.getMonth(), 1);
let this_d = this_date.toISOString().split('T');
let this_d_s = this_d[0].split('-');

let date_next = '';
if (date.getMonth() == 11) {
  date_next = new Date(date.getFullYear() + 1, 0, 1);
} else {
  date_next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
}
let d_s_next = date_next.toISOString().split('T');

let date_next_s = d_s_next[0].split('-');
let ssyf_next = date_next_s[0] + date_next_s[1];

let date_prev = '';
if (date.getMonth() == 1) {
  date_prev = new Date(date.getFullYear() - 1, 12, 1);
} else {
  date_prev = new Date(date.getFullYear(), date.getMonth(), 1);
}
let d_s_prev = date_prev.toISOString().split('T');

let date_prev_s = d_s_prev[0].split('-');
let ssyf_prev = date_prev_s[0] + date_prev_s[1];
let last_month = date_prev_s[0] + '-' + date_prev_s[1];
var os = {
  device: '',
  browser: '',
  fp: null,
  date: date,
  year: date.getFullYear(),
  lastyear: date.getFullYear() - 1,
  lastmonth: last_month,
  lastday: this_d_s[2],
  ssyf: ssyf,
  ssyf_next: ssyf_next,
  ssyf_prev: ssyf_prev,
  sssg_option: [],

  loading_func: 0,
  max_td_len: 200,
  page_top: 0,
  page_bottom: 0,
  perpage: 500,
  content_focus: '',

  click: '',
  check: false,
  clicking: false,
  th_over: false,
  tr_th_over: false,
  mover_over: false,
  getting_area: false,
  shift_press: false,
  shiftend: false,
  filtering: false,

  filter_backup_data: [],

  draging: false,
  drag_x: '',
  drag_y: '',

  find_type: 'menu',
  input_type: 'keyboard',

  mf_data: [],
  mf_type: ['table', 'card'],

  p:{},
  OS_LAST_DATA: [],
  trs_edited_index: [],
  trs_color: [],
  table_data: [],
  temp_data: [],
  cols_width: [],
  otd_index: '',
  otr_index: '',
  o_val: '',
  row_i: [],
  col_i: [],
  cut_i: [],
  del_id: [],
  resize_status: '',
  fm_selector_status: '',
  for_save: {},
  table_histroy: [],

  load_data: [],

  card_data: [],
  card_key: [
    'I',
    'id',
    'n',
    'color',
    'o',
    'status',
    'l_up',
    'title',
    'l_down',
    'r_up',
    'text',
    'r_down'
  ],
  fx: {
    包含: 'LIKE',
    等于: '=',
    不等于: '!=',
    '>': '>',
    '<': '<'
  },
  gwhai: {
    并且: 'AND',
    '': '',
    或者: 'OR'
  }
};
var loading_func = 0;

var post_func;

var data_ver = [];

var os_weekday = {
  '1': '星期日',
  '2': '星期一',
  '3': '星期二',
  '4': '星期三',
  '5': '星期四',
  '6': '星期五',
  '7': '星期六'
};

var os_sort = 'text';

var fm_list = [];
var os_touch_x = 0,
  os_touch_y = 0,
  os_touching = false;

var CAMERA_FLASH = false;

var hot_color = [
  [
    '#004D40',
    '#00695C',
    '#00796B',
    '#00897B',
    '#009688',
    '#26A69A',
    '#4DB6AC',
    '#80CBC4',
    '#B2DFDB',
    '#E0F2F1'
  ],
  [
    '#311B92',
    '#4527A0',
    '#512DA8',
    '#5E35B1',
    '#673AB7',
    '#7E57C2',
    '#9575CD',
    '#B39DDB',
    '#D1C4E9',
    '#EDE7F6'
  ],
  [
    '#FF6F00',
    '#FF8F00',
    '#FFA000',
    '#FFB300',
    '#FFC107',
    '#FFCA28',
    '#FFD54F',
    '#FFE082',
    '#FFECB3',
    '#FFF8E1'
  ],
  [
    '#3E2723',
    '#4E342E',
    '#5D4037',
    '#6D4C41',
    '#795548',
    '#8D6E63',
    '#A1887F',
    '#BCAAA4',
    '#D7CCC8',
    '#EFEBE9'
  ]
];
var os_user = '',
  os_kh = [],
  os_khms = '',
  os_comp = '';

let kyunhan_json = [
  {
    l_up: '权限',
    title: '新建',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'n',
    text: false
  }, //NEW
  {
    l_up: '权限',
    title: '浏览',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'v',
    text: false
  }, //VIEW
  {
    l_up: '权限',
    title: '修改',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'e',
    text: false
  }, //EDIT
  {
    l_up: '权限',
    title: '打印',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'p',
    text: false
  }, //PRINT
  {
    l_up: '权限',
    title: '复制',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'c',
    text: false
  }, //COPY
  {
    l_up: '权限',
    title: '删除',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'd',
    text: false
  }, //DELETE
  {
    l_up: '权限',
    title: '管理',
    l_down: '',
    r_up: '',
    r_down: '',
    n: 'm',
    text: false
  } //MANAGE
];

var os_show = [],
  os_hide = [];
var os_dir = 'xiaojun';

var LY_TABLE = [];
var after_back = {
  SHOW_PLUS: [],
  SHOW_SAVE: [],
  HIDE_EDIT: [],
  empty_pd: []
};
var card_o = [];

/*


var TGGS="";



var STARTUP_CONUT = 0;
var FM_LIST_INDEX = [];






var USEDTIME = 0;

var CONTENT_H = 0;







var [RESIZE_START_LEFT, RESIZE_START_TOP] = [0, 0];
var [RESIZE_START_WIDTH, RESIZE_START_HEIGHT] = [0, 0];
var [RESIZE_START_POINT_LEFT, RESIZE_START_POINT_TOP] = [0, 0];

//SFD_LY_SELECT("SFD_LY_SELECT", "");


//datarowamount = "";

var DRAGING_ID="",DRAG_FROM="",DRAG_TO="";

var FM_LIST = [], FM_LIST_2 = {},FM_LIST_3=[];
	databefore = [],



var DATAVERSION = [];


var OS_CHART_DATA=[];
*/
