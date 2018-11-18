var debttotal = 0;
var $;

//BROWSER CACHE
function saveTotalDebt(){
  var debtAmount = document.getElementById("balance").value;
  localStorage.setItem("startingBalance", debtAmount);
}

function debtBalance() {
  document.getElementById("balance").value = localStorage.getItem("startingBalance");
}

debtBalance();

//CALCULATE BILL TOTAL

function debtCalculate() {
    debttotal = 0;
    $(".b").each(function() {
      if($(this).is(':visible'))
        debttotal += parseFloat($(this).text().slice(1).replace(/,/g,''));
    });
    $("#totalDebt").val(debttotal);
    document.getElementById('totalDebt').innerHTML = debttotal.toFixed(2);
}

debtCalculate();

function sortTable(debts, sortColumn){
    var tableData = document.getElementById(debts).getElementsByTagName('tbody').item(0);
    var rowData = tableData.getElementsByTagName('tr');            
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) > Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}

sortTable('debts', 2);

function hidePaidOff() {
    var divs = document.getElementsByTagName('div');
    for(var i = divs.length; i-- ;) {
        var div = divs[i];
        if(div.className === 'response') {
            div.style.display = 'none';
        }
    }
}
//UPDATE OVERALL TABLE REALTIME AS BALANCE IS ENTERED

$('#balance').bind('focusout', function (event, previousText) {
    $('#balance').html($(this).val());
    saveTotalDebt();
});

$(document).ready(function (event, previousText) {
      var startingBalance = document.getElementById("balance").value;
      var totalDebt = document.getElementById("totalDebt").innerHTML;
      var paidOff = +startingBalance - +totalDebt;
      document.getElementById("paidOff").innerHTML = paidOff.toFixed(2);
      var variance = paidOff / startingBalance * 100;
      document.getElementById('%paidOff').innerHTML = variance.toFixed(2);
      document.getElementById('chart').style.height = variance + "%";
      document.getElementById('chart').innerHTML = variance.toFixed(2) + " %";
});

$('#balance').bind('keydown keyup click change', function (event, previousText) {
      var startingBalance = document.getElementById("balance").value;
      var totalDebt = document.getElementById("totalDebt").innerHTML;
      var paidOff = +startingBalance - +totalDebt;
      document.getElementById("paidOff").innerHTML = paidOff.toFixed(2)
      var variance = paidOff / startingBalance * 100;
      document.getElementById('%paidOff').innerHTML = variance.toFixed(2);
      document.getElementById('chart').style.height = variance + "%";
      document.getElementById('chart').innerHTML = variance.toFixed(2) + " %";
});



