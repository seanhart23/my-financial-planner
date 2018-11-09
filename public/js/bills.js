var total = 0;
var debttotal = 0;
var $;

//BROWSER CACHE
function savePaycheckAmount(){
  var savedAmount = document.getElementById("accountBalance").innerHTML;
  localStorage.setItem("accountBalance", savedAmount);
}

document.getElementById("save").addEventListener("click", savePaycheckAmount, false);

function bankBalance() {
  document.getElementById("accountBalance").innerHTML = localStorage.getItem("accountBalanc");
}

bankBalance();

//CALCULATE BILL TOTAL

function billCalculate() {
    total = 0;
    $(".a").each(function() {
      if($(this).is(':visible'))
        total += parseFloat($(this).text().slice(1).replace(/,/g,''));
    });
    $("#totalBill").val(total);
    document.getElementById('totalBill').innerHTML = total.toFixed(2);
}

billCalculate();

//COUNT OF TABLE ROWS

function UpdateCount() {
    var t = $('#bills').find('tbody tr #payee').length;
    if (t < 1) {
    document.getElementById('emptyMessageBills').innerHTML = "<td colspan='7' class='emptyMessage'>There is currently no data entered.</td>";
  } 
}

UpdateCount()

//CALCULATE BILLS FOR EACH PART OF THE MONTH BASED ON BUTTON GROUP

function first() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML < 15) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

function second() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML > 14) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

function full() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

function credit() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML === "Credit Card") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}


function studentLoan() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML === "Student Loan") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}


function loan() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML === "Loan") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}


function utility() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML === "Utility") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

function other() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML === "Other") {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  billCalculate();
}

document.getElementById("one").addEventListener("click", first, false);
document.getElementById("two").addEventListener("click", second, false);
document.getElementById("full").addEventListener("click", full, false);
document.getElementById("credit").addEventListener("click", credit, false);
document.getElementById("studentLoan").addEventListener("click", studentLoan, false);
document.getElementById("loan").addEventListener("click", loan, false);
document.getElementById("utility").addEventListener("click", utility, false);
document.getElementById("other").addEventListener("click", other, false);
// document.getElementById("billCalculate").addEventListener("click", billCalculate, false);
  
//UPDATE OVERALL TABLE REALTIME AS BALANCE IS ENTERED

$('#balance').bind('keydown keyup click', function (event, previousText) {
    $('#accountBalance').html($(this).val());
});
    
//CALCULATE REMAINING VALUE

$(document).ready(function (event, previousText) {
      var income = document.getElementById("accountBalance").innerHTML;
      var bills = document.getElementById("totalBill").innerHTML;
      var value = +income - +bills;
      document.getElementById("remaining").innerHTML = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});

$('#one, #two, #three, #full, #balance, #bills, #status').bind('keydown keyup click change', function (event, previousText) {
      var income = document.getElementById("accountBalance").innerHTML;
      var bills = document.getElementById("totalBill").innerHTML;
      var value = +income - +bills;
      document.getElementById("remaining").innerHTML = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});

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

//SORT THE TABLE
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

sortTable(0, 'bills');


