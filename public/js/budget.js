// //=============================
// //BUDGET JS
// //=============================

function filterBudget(section, id) {
   var budgetMonth = document.getElementById("currentMonth").value,
       filter = document.getElementById(section),
       timePeriod = filter.getElementsByClassName("timePeriod"),
       budgetExpense = filter.getElementsByClassName('budget-expense');
   for (var i = 0; i < timePeriod.length; i++) {
      if (timePeriod[i].innerText === budgetMonth){
         budgetExpense[i].style.display = "";
      } else {
         budgetExpense[i].style.display = "none";
      }
   }
}


filterBudget('filter', 'first');
filterBudget('filter1', 'second');
filterBudget('filter2', 'third');
filterBudget('filter3', 'fourth');

document.getElementById("triggerFilter").addEventListener("click", filterBudget.bind(null, 'filter', 'first'), false);
document.getElementById("triggerFilter").addEventListener("click", filterBudget.bind(null, 'filter1', 'second'), false);
document.getElementById("triggerFilter").addEventListener("click", filterBudget.bind(null, 'filter2', 'third'), false);
document.getElementById("triggerFilter").addEventListener("click", filterBudget.bind(null, 'filter3', 'fourth'), false);

// document.getElementById("progress").style.width = document.getElementById('progress-percent').innerText;



function CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}



// var sumPlannedIncome  = 0,
//     sumActualIncome   = 0,
//     sumPlannedExpense = 0,
//     sumActualExpense  = 0,
//     $;

// $('.plannedIncomeTotal').each(function(){
//     sumPlannedIncome += parseFloat($(this).text().slice(1).replace(/,/g,''));
// });

// $('.actualIncomeTotal').each(function(){
//     sumActualIncome += parseFloat($(this).text().slice(1).replace(/,/g,''));
// });

// $('.plannedExpenseTotal').each(function(){
//     sumPlannedExpense += parseFloat($(this).text().slice(1).replace(/,/g,''));
// });

// $('.actualExpenseTotal').each(function(){
//     sumActualExpense += parseFloat($(this).text().slice(1).replace(/,/g,''));
// });

// // document.getElementById('totalPlannedIncome').innerHTML = sumPlannedIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// document.getElementById('totalActualIncome').innerHTML = sumActualIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// document.getElementById('totalPlannedExpense').innerHTML = sumPlannedExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// document.getElementById('totalActualExpense').innerHTML = sumActualExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// document.getElementById('totalPlannedVariance').innerHTML = (sumPlannedIncome - sumPlannedExpense).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// document.getElementById('totalActualVariance').innerHTML = (sumActualIncome - sumActualExpense).toLocaleString('en-US', { style: 'currency', currency: 'USD' });


// //SORT TABLE

// function sortTable(n, name) {
//   var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//   table = document.getElementById(name);
//   switching = true;
//   dir = "asc"; 
//   while (switching) {
//     switching = false;
//     rows = table.getElementsByTagName("TR");
//     for (i = 1; i < (rows.length - 1); i++) {
//       shouldSwitch = false;
//       x = rows[i].getElementsByTagName("TD")[n];
//       y = rows[i + 1].getElementsByTagName("TD")[n];
//       if (dir == "asc") {
//         if (+x.innerHTML > +y.innerHTML) {
//           shouldSwitch= true;
//           break;
//         }
//       } else if (dir == "desc") {
//         if (+x.innerHTML < +y.innerHTML) {
//           shouldSwitch= true;
//           break;
//         }
//       }
//     }
//     if (shouldSwitch) {
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//       switchcount ++; 
//     } else {
//       if (switchcount == 0 && dir == "asc") {
//         dir = "desc";
//         switching = true;
//       }
//     }
//   }
// }

// //DISPLAY EMPTY TABLE MESSAGE

// function UpdateCount(tableID, message, colCount) {
//     var rowCount = $('#' + tableID + ' tr').length;
//     if (rowCount < 3) {
//     document.getElementById(message).innerHTML = "<td colspan='" + colCount +  "' class='emptyMessage'>There is currently no data entered.</td>";
//   } 
// }

// UpdateCount('income', 'emptyMessageIncome', 5);
// UpdateCount('FixedExpense', 'emptyMessageFixedExpense', 6);
// UpdateCount('VariableExpense', 'emptyMessageVariableExpense', 6);
// UpdateCount('Debt', 'emptyMessageDebt', 6);
// UpdateCount('OtherExpense', 'emptyMessageOtherExpense', 6);

