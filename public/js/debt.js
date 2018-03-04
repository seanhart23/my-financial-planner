var debttotal = 0;
var $;

//CALCULATE BILL TOTAL

function debtCalculate() {
    debttotal = 0;
    $(".b").each(function() {
      if($(this).is(':visible'))
        debttotal += parseFloat($(this).text().slice(1).replace(/,/g,''));
    });
    $("#totalDebt").val(debttotal);
    document.getElementById('totalDebt').innerHTML = debttotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

debtCalculate();

function sortTable(table_id, sortColumn){
    var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
    var rowData = tableData.getElementsByTagName('tr');            
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) > Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}

sortTable('debts', 2);

var variance = document.getElementById('startingBalance').innerHTML.replace(/[^0-9\.]+/g, "") - document.getElementById('totalDebt').innerHTML.replace(/[^0-9\.]+/g, "");

document.getElementById('paidOff').innerHTML = variance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
document.getElementById('%paidOff').innerHTML = ((variance / document.getElementById('startingBalance').innerHTML.replace(/[^0-9\.]+/g, "")) * 100).toFixed(0);


