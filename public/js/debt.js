var debttotal = 0;
var $;

//BROWSER CACHE
function saveTotalDebt(){
    var debtAmount = document.getElementById("balance").value;
    localStorage.setItem("startingBalance", debtAmount);
}

function saveVariance(){
    var variance = document.getElementById("%paidOff").innerHTML;
    localStorage.setItem("variance", variance);
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


var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

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
      document.getElementById('chartLine').style.height = (100 - variance) + "%";
      saveVariance();
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
      document.getElementById('chartLine').style.height = (100 - variance) + "%";
      saveVariance();
});

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

document.getElementById("credit").addEventListener("click", credit, false);
document.getElementById("SL").addEventListener("click", studentLoan, false);
document.getElementById("loan").addEventListener("click", loan, false);
document.getElementById("bill").addEventListener("click", bill, false);
document.getElementById("other").addEventListener("click", other, false);