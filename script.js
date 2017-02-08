$(document).ready(function(){

  $("#red").slider({
    range: "max",
    min: 0,
    max: 255,
    value: 125,
    slide: function(event, ui) {
      update_color();
    },
    change: function(event, ui) {
      update_color();
      getColorName();
    }
    });

  $("#green").slider({
    range: "max",
    min: 0,
    max: 255,
    value: 125,
    slide: function(event, ui) {
      update_color();
    },
    change: function(event, ui) {
      update_color();
      getColorName();
    }
    });

  $("#blue").slider({
    range: "max",
    min: 0,
    max: 255,
    value: 125,
    slide: function(event, ui) {
      update_color();
    },
    change: function(event, ui) {
      update_color();
      getColorName();
    }
  });

  $("#red").slider("option","value",Math.floor(Math.random()*255));
  $("#green").slider("option","value",Math.floor(Math.random()*255));
  $("#blue").slider("option","value",Math.floor(Math.random()*255));

  function update_color()
  {
    var red = $("#red").slider( "option", "value" );
    var green = $("#green").slider( "option", "value" );
    var blue = $("#blue").slider( "option", "value" );

    var color = "rgb("+ red + "," + green + "," + blue + ")";

    $('#pCircle').css({ fill: color });
    $("#display").text("Color value: " + color + "\n\r" + "Hex Value: #" + rgbToHex(red,green,blue));
    return;
  }

  

  update_color();
  function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
  function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
    }


  var c=document.getElementById("colorPicker");
  var ctx=c.getContext("2d");
  var img= new Image;
  
  img.src = "hex_color.gif";
  img.onload = function() {
    ctx.drawImage(img,c.width/2 - img.width/2, c.height/2 - img.height/2);
  };
  
  function getMousePos(canvas, evt) {
    var rect = c.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  c.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(c, evt);
    data = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    var red = data[0];
    var green = data[1];
    var blue = data[2];
    if(red == 0 && blue == 0 && green == 0)
    {
      return;
    }
    $("#red").slider("option","value",red);
    $("#green").slider("option","value",green);
    $("#blue").slider("option","value",blue);
    update_color();
  }, false);

  function getColorName() 
  {
    var red = $("#red").slider( "option", "value" );
    var green = $("#green").slider( "option", "value" );
    var blue = $("#blue").slider( "option", "value" );

    var color = "rgb("+ red + "," + green + "," + blue + ")";
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.thecolorapi.com/id?rgb=" + color +"%2Fcallback%3Djsonp",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "3e50cf52-cae6-1a9e-2383-fa934680e217"
      }
    }

    $.ajax(settings).done(function (response) {
      $("#name").text("Color Name: " + response.name.value);
    });
  }

  getColorName();

});
