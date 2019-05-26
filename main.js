$(document).ready(function()  {

  $.ajax({
    'url': 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
    'method': 'GET',
    'data': {

    },
    'success': function(data) {
      console.log(data);

      var source = $("#entry-template").html();
      var template_function = Handlebars.compile(source);

      var date = '2018-01-01';
      var moment_date = moment(date);

      var min_date = '2018-01-01';
      var max_date = '2018-12-01';

       disegna_mese(moment_date);

      function disegna_mese(current_date) {
        // resetto il contenitore del calendario
        $('.day').html('');
      // leggo quanti giorni ci sono nel mese corrente
      var giorni = moment_date.daysInMonth();

      var mese = moment_date.format('MMMM');
      var month = moment_date.month();
      $('.month').text(mese + ' ' + '2018');


      for (var i = 0; i < giorni; i++) {

        var giorno = {
          'giorni_calendario' : parseInt(i+1)
        };

        var festivita = {
          'giorni_calendario': giorno,
          'giorno_iso': moment_date.format('YYYY-MM-') + (i)
        }

        var html = template_function(giorno);
        $('.day').append(html);
      };
    }

    function format_day(day) {
      if (day < 10) {
        return '0' + day
      }
      return day;
    }

      $('.avanti').click(function() {
        console.log('ciao');
        console.log(moment_date.format('MMMM'));
        if (moment_date.isSameOrAfter(max_date)) {
          alert('mese non possibile');
          $(this).attr('disabled', true);
        } else {
          moment_date.add(1, 'months').format('MMMM');
          disegna_mese(moment_date)
          $(this).attr('disabled', false);
          $('.indietro').attr('disabled', false);
        }
      });

      $('.indietro').click(function() {
        console.log('ciao');
        console.log(moment_date.format('MMMM'));
        if (moment_date.isSameOrBefore(min_date)) {
          alert('mese non possibile');
          $(this).attr('disabled', true);
        } else {
          moment_date.subtract(1, 'months').format('MMMM');
          disegna_mese(moment_date)
          $(this).attr('disabled', false);
          $('.avanti').attr('disabled', false);
        }
      });

    'error': function() {
      alert('si e verificato un errore');
    }
  });
});
