var total = 0;
var $;

billCalculate();

//DELETE ROW FROM DROPDOWN

function deleteRow(btndel) {
    if (typeof(btndel) == "object") {
        if(confirm('Are you sure you want to delete this row?')){
          $(btndel).closest("tr").remove();
        } else {
          return false;
        }
    } else {
        return false;
    }
    billCalculate();
}

$('select').on("change",function(){
      if($(this).val()=="remove"){
        deleteRow(this);
      } else {
        return false;
      }
      billCalculate();
});

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

//UPDATE OVERALL TABLE REALTIME AS BALANCE IS ENTERED

$('#balance').bind('keydown keyup click', function (event, previousText) {
    $('#accountBalance').html($(this).val());
});

//CALCULATE BILL TOTAL

function billCalculate(){
var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  total = 0;
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
      if(tr[i].style.display !== "none"){
        if (td) {
          if (td.innerHTML) {
            total += +document.getElementsByTagName('span')[i].innerHTML;
            document.getElementById('totalBill').innerHTML = total.toFixed(2);
          } else {
            console.log('Not Working');
          }
        }
  }
}
}

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

