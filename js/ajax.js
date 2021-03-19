function load_ajax() {
  $("#bar").removeClass('hide');

  return new Promise((r) => {
    console.log('ajax');

    let data_l = ''
    try {
      if (os.p.d.length == null) {
        data_l = 0;
      } else {
        data_l = os.p.d.length;
      }
    } catch (error) {
      data_l = 0;
    }
    os.p.data_len = data_l;
    $.ajax({
      type: 'post',
      url: '/',
      //headers: {  'Access-Control-Allow-Origin': '*' },
      //crossDomain:true,
      contentType: 'application/x-www-form-urlencoded;charset=utf-8',
      data: {
        from: 'from',
        d: JSON.stringify(os.p)
      },

      async: true
    }).done(res => {
      r(res);
    }).always(() => {
      os.p.t = '';
      os.p.f = '';
      os.p.d = '';
      os.load_data_row = '';
      os.load_data_col = '';
      console.log('finish');
      $("#bar").addClass('hide');

      //os_proc_t++;
      //TDS.eq(GA_I).text(parseFloat(data).toFixed(2)).attr("data-text", data);

    });


    /*
        axios.post('https://pbds9.sse.codesandbox.io/', {

            firstName: 'Finn',
            lastName: 'Williams'
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
            */
  });
}
