var debttotal = 0;
var $;

var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

document.getElementById('months').innerHTML = document.getElementById('orMonths').innerHTML

function debtCalculate() {
    debttotal = 0;
    $(".b").each(function() {
      if($(this).is(':visible'))
        debttotal += parseFloat($(this).text().slice(1).replace(/,/g,''));
    });
    $("#totalDebt").val(debttotal);
      document.getElementById('totalDebt').innerHTML = debttotal.toFixed(2);
    
    var sb = document.getElementById('startingBalance').innerHTML;
    var sdb = parseFloat(sb, 10).toFixed(2);
    var po = document.getElementById('totalDebt').innerHTML;
    var tpo = parseFloat(po, 10).toFixed(2);
    var g = +sdb - +tpo;
      document.getElementById('paidOff').innerHTML = g.toFixed(2);
    
    var variance = g / sdb * 100;
      document.getElementById('%paidOff').innerHTML = variance.toFixed(2);
      document.getElementById('chart').style.height = variance + "%";
      document.getElementById('percent').innerHTML = variance.toFixed(2) + " %";
      document.getElementById('chartLine').style.height = (100 - variance) + "%";
}

debtCalculate();

$(document).ready(function(){
 $("#amount").trigger('click');
});

function hidePaidOff() {
    var divs = document.getElementsByTagName('div');
    for(var i = divs.length; i-- ;) {
        var div = divs[i];
        if(div.className === 'response') {
            div.style.display = 'none';
        }
    }
}


function credit() {
  var table, tr, td, i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML === "Credit Card") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}


function studentLoan() {
  var table, tr, td, i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML === "Student Loan") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}


function loan() {
  var table, tr, td, i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML === "Loan") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}


function bill() {
  var table, tr, td, i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML === "Bill") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}

function other() {
  var table, tr, td, i;
  table = document.getElementById("debts");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML === "Other") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  debtCalculate();
}

function showStartingDebt(){
  if(document.getElementById('startingBalance').innerHTML !== "0"){
    document.getElementById('hiddenButton').style.display = "none";
  }
}

showStartingDebt();

document.getElementById("credit").addEventListener("click", credit, false);
document.getElementById("SL").addEventListener("click", studentLoan, false);
document.getElementById("loan").addEventListener("click", loan, false);
document.getElementById("bill").addEventListener("click", bill, false);
document.getElementById("other").addEventListener("click", other, false);