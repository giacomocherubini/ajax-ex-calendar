$(document).ready(function()  {

  var date = '2018-01-01';

  var moment_date = moment(date);
  var month = moment_date.month();
  console.log(month);
  var mese = moment_date.format('MMMM');
  console.log(mese);
  var giorni = moment_date.daysInMonth();

  console.log(giorni);

  var source = $("#entry-template").html();
  var template_function = Handlebars.compile(source);

  for (var i = 0; i < giorni; i++) {

    var giorno = {
      'giorni' : parseInt(i+1)
    };
    var html = template_function(giorno);
    $('.day').append(html);
  }

  var scritta_mese = {
    titolo: mese
  };

  var html2 = template_function(scritta_mese);
  $('.month').append(html2);


  // $('.avanti').click(function()
  //  if (month < 12 ){
  //   month = moment_date.month(+1);
  // });


});
