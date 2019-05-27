$(document).ready(function()  {

  var source = $("#entry-template").html();
  var template_function = Handlebars.compile(source);

  var date = '2018-01-01';
  var moment_date = moment(date);

  var min_date = '2018-01-01';
  var max_date = '2018-12-01';

   disegna_mese(moment_date);
   disegna_festivita(moment_date.month());


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
    var html = template_function(giorno);
    $('.day').append(html);
  };



}

  $('.avanti').click(function() {
    console.log(moment_date.format('MMMM'));
    if (moment_date.isSameOrAfter(max_date)) {
      alert('mese non possibile');
      $(this).attr('disabled', true);
    } else {
      moment_date.add(1, 'months').format('MMMM');
      disegna_mese(moment_date);
      disegna_festivita(moment_date.month());
      $(this).attr('disabled', false);
      $('.indietro').attr('disabled', false);
    }
  });

  $('.indietro').click(function() {
    console.log(moment_date.format('MMMM'));
    if (moment_date.isSameOrBefore(min_date)) {
      alert('mese non possibile');
      $(this).attr('disabled', true);
    } else {
      moment_date.subtract(1, 'months').format('MMMM');
      disegna_mese(moment_date);
      disegna_festivita(moment_date.month());
      $(this).attr('disabled', false);
      $('.avanti').attr('disabled', false);
    }
  });

  function disegna_festivita(mese) {
      $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/holidays',
        'data': {
          'year': '2018',
          'month': mese
        },
        'method': 'GET',
        'success': function(data) {

          var festivita = data.response;
          // console.log(festivita);
          // ciclo le festivita restituite dall'api
          for (var i = 0; i < festivita.length; i++ ) {
            // festivita corrente
          var festa = festivita[i];
          // console.log(festa);
          // recupero  l'item con la data corrispondente alla festivita corrente
          var giorno_festa = $('.day.numero_giorni[data-giorno_iso="'+festa.date+'"]');
          console.log(giorno_festa);
          // aggiungo la classe che fa il testo rosso
          giorno_festa.addClass('festivita');
          // concateno il nome della festivita
          giorno_festa.append(' - ' + festa.name);
        }

      },
      'error': function() {
        alert('si e verificato un errore');
      }
    });
    }
});
