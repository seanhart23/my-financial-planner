var total = 0;
var debttotal = 0;
var $;

var n = document.getElementById("color")


var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

//BROWSER CACHE
function savePaycheckAmount(){
  var savedAmount = document.getElementById("balance").value;
  localStorage.setItem("accountBalance", savedAmount);
}

function bankBalance() {
  var balance = localStorage.getItem("accountBalance");
  document.getElementById("balance").value = balance;
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
    td = tr[i].getElementsByTagName("td")[1];
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
    td = tr[i].getElementsByTagName("td")[1];
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
    td = tr[i].getElementsByTagName("td")[1];
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
    td = tr[i].getElementsByTagName("td")[3];
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
    td = tr[i].getElementsByTagName("td")[3];
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
    td = tr[i].getElementsByTagName("td")[3];
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
    td = tr[i].getElementsByTagName("td")[3];
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
    td = tr[i].getElementsByTagName("td")[3];
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

$('#balance').bind('focusout', function (event, previousText) {
    $('#balance').html($(this).val());
    savePaycheckAmount();
});
    
//CALCULATE REMAINING VALUE

$(document).ready(function (event, previousText) {
      var income = document.getElementById("balance").value;
      var bills = document.getElementById("totalBill").innerHTML;
      var value = +income - +bills;
      document.getElementById("remaining").innerHTML = value.toFixed(2);
      if (value < 0){
      document.getElementById("remaining").style.color = "red";
} else if (value >0) {
      document.getElementById("remaining").style.color = "green";
} else {
      document.getElementById("remaining").style.color = "black";
}
});

$('#one, #two, #three, #full, #balance, #bills, #status').bind('keydown keyup click change', function (event, previousText) {
      var income = document.getElementById("balance").value;
      var bills = document.getElementById("totalBill").innerHTML;
      var value = +income - +bills;
      document.getElementById("remaining").innerHTML = value.toFixed(2);
      if (value < 0){
      document.getElementById("remaining").style.color = "red";
} else if (value >0) {
      document.getElementById("remaining").style.color = "green";
} else {
      document.getElementById("remaining").style.color = "black";
}
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

$(document).ready(function(){
 $("#due").trigger('click');
});

function color(table, billType) {
  var table, tr, td, i;
  table = document.getElementById(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[billType];
    if (td) {
      if (td.innerHTML === "Utility") {
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

color('bills', 3)
color('totalsByType', 1)
