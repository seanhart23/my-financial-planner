var debttotal = 0;
var $;

//CALCULATE BILL TOTAL

function debtCalculate() {
    debttotal = 0;
    $(".b").each(function() {
      if($(this).is(':visible'))
        debttotal += parseFloat($(this).text());
    });
    $("#totalDebt").val(debttotal);
    document.getElementById('totalDebt').innerHTML = debttotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

debtCalculate();

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

sortTable(0, 'debts');
