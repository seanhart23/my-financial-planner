var debttotal = 0;
var $;

//BROWSER CACHE
function saveTotalDebt(){
  var debtAmount = document.getElementById("startingBalance").innerHTML;
  localStorage.setItem("startingBalance", debtAmount);
}

document.getElementById("save").addEventListener("click", saveTotalDebt, false);

function debtBalance() {
  document.getElementById("startingBalance").innerHTML = localStorage.getItem("startingBalance");
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
    document.getElementById('totalDebt').innerHTML = debttotal;
}

debtCalculate();

function sortTable(table_id, sortColumn){
    var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
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

//UPDATE OVERALL TABLE REALTIME AS BALANCE IS ENTERED

$('#balance').bind('keydown keyup click', function (event, previousText) {
    $('#startingBalance').html($(this).val());
});

$(document).ready(function (event, previousText) {
      var startingBalance = document.getElementById("startingBalance").innerHTML;
      var totalDebt = document.getElementById("totalDebt").innerHTML;
      var paidOff = +startingBalance - +totalDebt;
      document.getElementById("paidOff").innerHTML = paidOff.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});

$('#balance').bind('keydown keyup click change', function (event, previousText) {
      var startingBalance = document.getElementById("startingBalance").innerHTML;
      var totalDebt = document.getElementById("totalDebt").innerHTML;
      var paidOff = +startingBalance - +totalDebt;
      document.getElementById("paidOff").innerHTML = paidOff.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      var variance = document.getElementById('paidOff').innerHTML / document.getElementById("totalDebt").innerHTML;
      document.getElementById('%paidOff').innerHTML = variance.toFixed(2) * 100;
});





