var total = 0;
var debttotal = 0;
var $;

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

document.getElementById("one").addEventListener("click", first, false);
document.getElementById("two").addEventListener("click", second, false);
document.getElementById("full").addEventListener("click", full, false);
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
      document.getElementById("remaining").innerHTML = value;
});

$('#one, #two, #three, #full, #balance, #bills, #status').bind('keydown keyup click change', function (event, previousText) {
      var income = document.getElementById("accountBalance").innerHTML;
      var bills = document.getElementById("totalBill").innerHTML;
      var value = +income - +bills;
      document.getElementById("remaining").innerHTML = value.toFixed(2);
});

//DELETE ROW FROM DROPDOWN

function deleteRow(btndel) {
    if (typeof(btndel) == "object") {
        if(confirm('Are you sure you want to delete this row?')){
          $(btndel).closest("tr").remove();
          billCalculate();
        } else {
          return false;
        }
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