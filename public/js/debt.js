var debttotal = 0,
    date      = new Date(),
    $;
   
document.getElementById("date").innerHTML   = date.toDateString();
document.getElementById('months').innerHTML = document.getElementById('orMonths').innerHTML;

// CALCULATE DEBT

function debtCalculate() {
  debttotal = 0;
  $(".debtAmount").each(function() {
    if($(this).is(':visible'))
      debttotal += parseFloat($(this).text().slice(1).replace(/,/g,''));
  });
  $("#totalDebt").val(debttotal);
  document.getElementById('totalDebt').innerHTML = debttotal.toFixed(2);
}

//

// CREATE BAR CHART

function buildChart() {
  debtCalculate();
  
  var startingBalance     = document.getElementById('startingBalance').innerHTML,
      startingDebtBalance = parseFloat(startingBalance, 10).toFixed(2),
      currentDebt         = document.getElementById('totalDebt').innerHTML,
      remainingDebt       = parseFloat(currentDebt, 10).toFixed(2),
      paidOff             = +startingDebtBalance - +remainingDebt,
      variance            = paidOff / startingDebtBalance * 100;
      
  document.getElementById('paidOff').innerHTML      = paidOff.toFixed(2);
  document.getElementById('%paidOff').innerHTML     = variance.toFixed(2);
  document.getElementById('percent').innerHTML      = variance.toFixed(2) + " %";
  document.getElementById('chart').style.height     = variance + "%";
  document.getElementById('chartLine').style.height = (100 - variance) + "%";
}

//

// SORT TABLE

function sortTable(debts, sortColumn){
    var tableData = document.getElementById(debts).getElementsByTagName('tbody').item(0),
        rowData   = tableData.getElementsByTagName('tr');            
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) > Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}

//

// TYPE FILTERS

function filterDebts(debtType) {
  var table,
      tr, 
      td, 
      i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    console.log('Ran');
    if (td) {
      if (td.innerHTML === debtType) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}

//

// DISPLAY ADD STARTING DEBT LINK

function showStartingDebt(){
  if(document.getElementById('startingBalance').innerHTML !== "0"){
    document.getElementById('show').style.display = "none";
  }
}

//

// ADD TABLE COLOR 

function color(table, type) {
  var tr, 
      td, 
      i;
  table = document.getElementById(table);
  tr    = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[type];
    if (td) {
      if (td.innerHTML === "Bill") {
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "LawnGreen";
      } else if (td.innerHTML === "Other"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "blue";
      } else if (td.innerHTML === "Credit Card") {
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "red";
      } else if (td.innerHTML === "Student Loan"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Yellow";
      } else if (td.innerHTML === "Loan"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Orange";
      }
    }
  }
}

//

// SORT TABLE BY AMOUNT ON PAGE LOAD

$(document).ready(function(){
  $("#amount").trigger('click');
});

//

buildChart();
sortTable('debts', 4);
color('debts', 2);
showStartingDebt();

document.getElementById("credit").addEventListener("click", filterDebts.bind(null, 'Credit Card'), false);
document.getElementById("SL").addEventListener("click", filterDebts.bind(null, 'Student Loan'), false);
document.getElementById("loan").addEventListener("click", filterDebts.bind(null, 'Loan'), false);
document.getElementById("bill").addEventListener("click", filterDebts.bind(null, 'Bill'), false);
document.getElementById("other").addEventListener("click", filterDebts.bind(null, 'Other'), false);
