//=============================
//BUDGET JS
//=============================

var sumPlannedIncome  = 0,
    sumActualIncome   = 0,
    sumPlannedExpense = 0,
    sumActualExpense  = 0,
    $;

$('.plannedIncomeTotal').each(function(){
    sumPlannedIncome += parseFloat($(this).text().slice(1).replace(/,/g,''));
});

$('.actualIncomeTotal').each(function(){
    sumActualIncome += parseFloat($(this).text().slice(1).replace(/,/g,''));
});

$('.plannedExpenseTotal').each(function(){
    sumPlannedExpense += parseFloat($(this).text().slice(1).replace(/,/g,''));
});

$('.actualExpenseTotal').each(function(){
    sumActualExpense += parseFloat($(this).text().slice(1).replace(/,/g,''));
});

document.getElementById('totalPlannedIncome').innerHTML = sumPlannedIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualIncome').innerHTML = sumActualIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalPlannedExpense').innerHTML = sumPlannedExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualExpense').innerHTML = sumActualExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalPlannedVariance').innerHTML = (sumPlannedIncome - sumPlannedExpense).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('totalActualVariance').innerHTML = (sumActualIncome - sumActualExpense).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function sortTable(n, name) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(name);
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (+x.innerHTML > +y.innerHTML) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (+x.innerHTML < +y.innerHTML) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

sortTable(0, 'FixedExpense');
sortTable(0, 'VariableExpense');
sortTable(0, 'Debt');
sortTable(0, 'OtherExpense');

var x = document.getElementById("income").rows.length;
var y = document.getElementById("FixedExpense").rows.length;
var z = document.getElementById("VariableExpense").rows.length;
var w = document.getElementById("Debt").rows.length;
var t = document.getElementById("OtherExpense").rows.length;

function emptyTable5(a, n){
  if (a < 3) {
    document.getElementById(n).innerHTML = "<td colspan='5' class='emptyMessage'>There is currently no data entered.</td>";
  } 
}

function emptyTable6(a, n){
  if (a < 3) {
    document.getElementById(n).innerHTML = "<td colspan='6' class='emptyMessage'>There is currently no data entered.</td>";
  } 
}

emptyTable5(x, 'emptyMessageIncome');
emptyTable6(y, 'emptyMessageFixedExpense');
emptyTable6(z, 'emptyMessageVariableExpense');
emptyTable6(w, 'emptyMessageDebt');
emptyTable6(t, 'emptyMessageOtherExpense');