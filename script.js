var count = 1

function price_in_words(price) {

    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
      dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
      tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
      handle_tens = function(dgt, prevDgt) {
        return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
      },
      handle_utlc = function(dgt, nxtDgt, denom) {
        return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      };
  
    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
      }
      str = words.reverse().join("")
    } else str = "";
    return str
  
}

  $('body').on('click','.removeRow',function(e){
    $(this).closest('tr').remove();
    e.preventDefault();
    calculate();
  });

function  addItem(){
    calculate()
    let newRow = `<tr><th scope="row" contenteditable>${count} <a class="control removeRow" href="#">.</a></th>
    <td class="item" contenteditable>Item</td>
    <td contenteditable>0000</td>
    <td class="amount" contenteditable>0</td>
    <td class="unit" contenteditable>KGS</td>
    <td class="rate" contenteditable>0</td>
    <td class="sum">0</td></tr>`;
    $('.tab-main').append(newRow);
}

$('body').on('click','.addItem',function(e){
    addItem();
});

$('body').on('keyup','td',function(){
    
    calculate();
  });

function calculate(){
    var total_price = 0,
      total_tax = 0;

    var TAX_RATE = $("#gstPer").val();  
    console.log('CALCULATING - Tax Rate:'+TAX_RATE);
    count = 1
    $('.tab-main tr').each( function(){
        count = count + 1 
        var row = $(this),
            rate   = row.find('.rate').text(),
            amount = row.find('.amount').text();
            
        console.log(rate,amount)
        var sum = rate * amount;
        // var tax = ((sum / (TAX_RATE+100) ) * TAX_RATE);
        var tax = ((sum * TAX_RATE)/100);    
        
        total_price =  sum + total_price;
        // total_tax =  tax;
        total_tax = total_tax + tax;
        
        row.find('.sum').text( sum.toFixed(2) );
        // row.find('.tax').text( tax.toFixed(2) );   
    });
    $('.cgst').text(TAX_RATE);
    $('.sgst').text(TAX_RATE);
    $('.sub-price').text(total_price.toFixed(2));
    $('.sgst-price').text(total_tax.toFixed(2));
    $('.cgst-price').text(total_tax.toFixed(2));
    $('.netTotal').text((total_tax+total_tax+total_price).toFixed(2));
    if(count > 10){
        alert("You are crossing Count Limit of 10 !")
        return false
    }
    let totalData = price_in_words(parseInt(total_tax+total_tax+total_price));
    $('.totalText').text("Rupees "+totalData+" Only");
    
}

function preparePrint(){

    // $(".control .removeRow").addClass("d-none");
    $(".removeRow").css({"display":"none !important"});
    $(".addItem").addClass("d-none");
    window.print()
}

function showAddBtn(){
    $(".control .removeRow").css({"display":"block"});
    $(".addItem").removeClass("d-none");
}