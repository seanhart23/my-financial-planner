var total = 0,
    date = new Date(),
    $;

document.getElementById("date").innerHTML = date.toDateString();

// SORT TABLE

function sortTable(bills, sortColumn){
    var tableData = document.getElementById(bills).getElementsByTagName('tbody').item(0),
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

// SORT TABLE BY DUE DATE ON PAGE LOAD

$(document).ready(function(){
 $("#due").trigger('click');
});

//

// CALCULATE BILL TOTAL

function billCalculate() {
    total = 0;
    $(".a").each(function() {
      if($(this).is(':visible'))
        total += parseFloat($(this).text().slice(1).replace(/,/g,''));
    });
    $("#totalBill").val(total);
    document.getElementById('totalBill').innerHTML = total.toFixed(2);
}

//

// COUNT OF TABLE ROWS

function UpdateCount() {
    var t = $('#bills').find('tbody tr #payee').length;
    if (t < 1) {
    document.getElementById('emptyMessageBills').innerHTML = "<td colspan='7' class='emptyMessage'>There is currently no data entered.</td>";
  } 
}

//

//CALCULATE BILLS FOR EACH PART OF THE MONTH BASED ON BUTTON GROUP

function dateRange(dateNumber1, dateNumber2) {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML > dateNumber1 && td.innerHTML < dateNumber2) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

//

// FILTER BILLS

function filterBills(billType) {
  var table,
      tr, 
      td, 
      i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      if (td.innerHTML === billType) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

//

// CHANGE DATE RANGE

document.getElementById("one").addEventListener("click", dateRange.bind(null, 0, 15), false);
document.getElementById("two").addEventListener("click", dateRange.bind(null, 14, 32), false);
document.getElementById("full").addEventListener("click", dateRange.bind(null, 0, 32), false);

//

// CHANGE REMAINING FONT COLOR BASED ON BALANCE

$('#one, #two, #three, #full, #balance, #bills, #status').bind('click', function (event, previousText) {
    var remaining = document.getElementById("accountBalance").innerHTML - document.getElementById('totalBill').innerHTML;
    document.getElementById('remaining').innerHTML = remaining.toFixed(2);
    
    if (remaining < 0){
      document.getElementById("remaining").style.color = "red";
    } else if (remaining >0) {
      document.getElementById("remaining").style.color = "green";
    } else {
      document.getElementById("remaining").style.color = "black";
  }
});

//

// DISPLAY ADD STARTING BALANCE LINK

function showStartingBalance(){
  if(document.getElementById('accountBalance').innerHTML !== "0"){
    document.getElementById('hiddenButton').style.display = "none";
  }
}

//

//DELETE ROW FROM DROPDOWN

function deleteRow(btndel) {
    if (typeof(btndel) == "object") {
          $(btndel).closest("tr").remove();
          billCalculate();
    } else {
        return false;
    }
}

$('select').on("change",function(){
      if($(this).val()=="remove"){
        deleteRow(this);
      } else {
        return false;
      }
});

//

// ADD TABLE COLOR 

function color(table, billType) {
  var tr, 
      td, 
      i;
      
  table = document.getElementById(table);
  tr    = table.getElementsByTagName("tr");
  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[billType];
    if (td) {
      if (td.innerHTML === "Utility") {
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "LawnGreen";
      } else if (td.innerHTML === "Other"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Deeppink";
      } else if (td.innerHTML === "Credit Card") {
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "red";
      } else if (td.innerHTML === "Student Loan"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Yellow";
      } else if (td.innerHTML === "Loan"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Orange";
      } else if (td.innerHTML === "Membership"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Purple";
      } else if (td.innerHTML === "Household"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "Blue";
      } else if (td.innerHTML === "One Time"){
        tr[i].getElementsByTagName("td")[0].style.backgroundColor = "MidnightBlue";
      }
    }
  }
}

//

billCalculate();
UpdateCount();
sortTable('bills', 1);
color('bills', 3);
color('totalsByType', 1);
showStartingBalance();


document.getElementById("credit").addEventListener("click", filterBills.bind(null, 'Credit Card'), false);
document.getElementById("studentLoan").addEventListener("click", filterBills.bind(null, 'Student Loan'), false);
document.getElementById("loan").addEventListener("click", filterBills.bind(null, 'Loan'), false);
document.getElementById("utility").addEventListener("click", filterBills.bind(null, 'Utility'), false);
document.getElementById("household").addEventListener("click", filterBills.bind(null, 'Household'), false);
document.getElementById("membership").addEventListener("click", filterBills.bind(null, 'Membership'), false);
document.getElementById("onetime").addEventListener("click", filterBills.bind(null, 'One Time'), false);
document.getElementById("other").addEventListener("click", filterBills.bind(null, 'Other'), false);
