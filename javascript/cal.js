
$( document ).ready(function() {
  var firstInputs = "",
      num = "0",
      opr = "",
      historyInput = "";


  //this object holds different operator functions
  var operators = {
    "+": function(a,b){return Number(a)+Number(b)},
    "-": function(a,b){return a-b},
    "x": function(a,b){return a*b},
    "/": function(a,b){return a/b},
    "%": function(a){return a/100},
    "+/-": function(a){ return a * -1}
  };

  //reset fucntion
  function reset(){
    firstInputs = "";
    num = "0";
    opr = "";
  }

  //click function which resets the calculator
  $(".clear").click(function(){
    $(".current").text("0");
    $(".current").css("font-size", "80px");
    reset();
  });

  //click fucntion when a number is clicked its added to a veriable then put in a span
  $(".num").click(function(){
    if(num === "0"){
      num = $(this).text();
      $(".current").text(num);
      historyInput = num +" ";
      numberSize();
    } else {
      num += $(this).text();
      historyInput += num; +" ";
      $(".current").text(num);
      numberSize();
    }
  });

  //click fuction which incerts only one decimal
  $(".decimal").click(function(){
    //if there no decimal then enter a decimal
    if($(".current").text().indexOf(".") < 0){
      num += ".";
      $(".current").text(num);
    }
  });

  //percentracge
  $(".perc").click(function(){
    //if there no decimal then enter a decimal
    if($(".current").text().indexOf(".") < 0){
      num = operators["%"](num);
      $(".current").text(num);
    }
  });

  //click fucntion which toggles the number from positive to negative
  $(".posNeg").click(function(){
    num = operators["+/-"](num);
    $(".current").text(num);
  });

  //click function which applies an selected operator to the calculation
  $(".operators").click(function(){
    if(opr != ""){
      firstInputs = operators[opr](firstInputs, num);
      opr = $(this).text();
      historyInput += opr + " ";
      $(".current").text(firstInputs);
      num = "";

    } else {
      firstInputs = num;;
      opr = $(this).text();
      historyInput += opr + " ";
      num = "";
    }
  });

  //click fuction which executes the calculation
  $(".equal").click(function(){
    history();
    num = operators[opr](firstInputs, num);
    $(".current").text(num);
    reset();
    numberSize();
  });

  //post the full calculation for latter review
  function history(){
    $("ul").append("<li>" + historyInput+ " = " + operators[opr](firstInputs, num) + "  <span><i class='fa fa-trash' aria-hidden='true'></i></span></li>");
    historyInput = "";
  }

  //Click on X to delete Todos
  $("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500,function(){
      $(this).remove();
    });
    event.stopPropagation();
  });

  //click fucntion which displays the history
  $(".hisButton").click(function(){
    if($(".hisButton").hasClass("fa-arrow-down")){
      //change the down arrow to an up arrow
      $(this).removeClass("fa-arrow-down");
      $(this).addClass("fa-arrow-up");
      //change histroy to calculator
      $("#label").text("calculator");
      //make all the histroy results visiable
      $(".history").removeClass("invisible");
      $(".current").hide();
      $(".keyBoard").css("height", "0");

      $(".screen").addClass("fullScreen");
    }else {
      //change up arrow to down arrow
      $(this).removeClass("fa-arrow-up");
      $(this).addClass("fa-arrow-down");
      //change calculator to histroy
      $("#label").text("histroy");
      $(".screen").removeClass("fullScreen");
      $(".keyBoard").css("height", "410px");
      //fade in the original calculator screen
      $(".current").fadeIn();
      ///hide the history with class invisible
      $(".history").addClass("invisible");
    }
  });

  //function that chnages the font size of the numbers in screen
  function numberSize() {
    var screenLength = $(".current").text().length;
    if(screenLength > 10){
      console.log(screenLength);
      var reduce = 80 - (6* (screenLength -10));
      $(".current").css("font-size", reduce.toString() + "px");
    } else{
      $(".current").css("font-size", "80px");
    }
  }

});
