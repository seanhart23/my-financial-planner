var total = 0

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
        total += +td.innerHTML;
        document.getElementById('totalBill').innerHTML = total;
      } else {
        console.log('Not Working');
      }
    }
    }
  }
}

billCalculate();
function first() {
  var table, tr, td, i;
  table = document.getElementById("bills");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML < 16) {
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
      if (td.innerHTML > 15) {
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

$('#balance').bind('keydown keyup click', function (event, previousText) {
    $('#accountBalance').html($(this).val());
});

$('#one, #two, #three, #full').bind('keydown keyup click', function (event, previousText) {
      var income = document.getElementById("accountBalance").innerHTML
      var bills = document.getElementById("totalBill").innerHTML
      var value = +income - +bills
      document.getElementById("remaining").innerHTML = value
});