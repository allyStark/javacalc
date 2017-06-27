//button is pressed
var calculation = "0";
var equalPressed = false;
var reg = /[/+*.]{2}|[/*+]-{2}|\.-|-[/*+]|-{2}/;
var hasPoint = false;

$(".calcButton").on("click", function() {

  //check if the calculator is only displaying 0, if it is, get rid of it!
  if (calculation === "0" || equalPressed && $(this).hasClass("num")) {
    calculation = "";
    equalPressed = false;
  }
  //check if the input is a number, operator or other
  if ($(this).hasClass("num")) {
    calculation += this.innerHTML;
    equalPressed = false;

  } else if ($(this).hasClass("operator")) {

    if (!reg.test(calculation + this.innerHTML)) {

      calculation += this.innerHTML;

    } else {

      calculation = calculation;

    }

    equalPressed = false;
    hasPoint = false;

  } else if ($(this).hasClass("equals")) {

    calculation = eval(calculation);
    equalPressed = true;
    hasPoint = false;

  } else if ($(this).hasClass("cancelAll")) {

    calculation = "0";
    equalPressed = false;
    hasPoint = false;

  } else if ($(this).hasClass("cancelOne") && calculation !== undefined) {

    var endChar = calculation.charAt(calculation.length - 1);
    //if the char is . then set hasPoint to false
    if (endChar == ".") {

      calculation = calculation.slice(0, -1);
      hasPoint = false;

    } else if (endChar === "+" || endChar === "/" || endChar === "*" || endChar === "-") {

      calculation = calculation.slice(0, -1);
      endChar = calculation.lastIndexOf(".");

        //check if decimal point exists in previous number
        if (endChar < calculation.lastIndexOf("+") || endChar < calculation.lastIndexOf("/") ||
          endChar < calculation.lastIndexOf("-") || endChar < calculation.lastIndexOf("*")) {

          hasPoint = false;

        } else if (endChar !== -1) {

          hasPoint = true;

        }

    } else {

      calculation = calculation.slice(0, -1);

    }
    //if equals pressed is true, don't allow removal
    if (calculation === "" || equalPressed) {

      calculation = "0";
      equalPressed = false;

    }

  } else if ($(this).hasClass("point") && hasPoint === false && !equalPressed) {

    calculation += this.innerHTML;
    hasPoint = true;

  } else if ($(this).hasClass("brac") && !equalPressed){
    
    calculation += this.innerHTML;
    
  }

  $("p").html(calculation);

});