$(document).ready(
    function() {
      $("#tar").show();
      $("#result").hide();
        $("#tar").submit(function(event) {
            event.preventDefault();

            var settings = {
                "async": true,
                "url": "/score?phrase=" + encodeURI($("#inputlg").val()),
                "method": "POST",
                "success": function(responseData) {
                    console.log(responseData);
                    $('#tar').hide();
                    console.log(responseData["pos"]);
                    $('#sentence').text($("#inputlg").val() );
                    $('#pos').text((responseData["pos"] * 100).toFixed(2) + " %")
                    $('#pos-prog').css('width', (responseData["pos"]*100)+'%').attr('aria-valuenow', (responseData["pos"]*100));
                    $('#neg').text((responseData["neg"] * 100).toFixed(2) + " %")
                    $('#neg-prog').css('width', (responseData["neg"]*100)+'%').attr('aria-valuenow', (responseData["neg"])*100);
                    $('#neu').text((responseData["neu"] * 100).toFixed(2) + " %")
                    $('#neu-prog').css('width', (responseData["neu"]*100)+'%').attr('aria-valuenow', (responseData["neu"]*100));
                    var score = responseData["compound"];
                    var compound = $('#compound');
                    console.log(compound) ;
                    if(score>0.5)
                    {
                      compound.text("Overall Positive");
                      $('#pos-box').addClass('animated bounce slow');
                    }
                    else if(score < 0.5 && score > 0.1)
                    {
                      compound.text("Score: Somewhat Positive");
                      $('#pos-box').addClass('animated bounce slow');
                    }
                    else if(score < 0.1 && score > -0.1)
                    {
                      compound.text("Score: Neutral");
                      $('#neu-box').addClass('animated bounce slow');
                    }
                    else if(score < -0.1 && score > -0.5){
                      compound.text("Score : Somewhat Negative");
                      $('#neg-box').addClass('animated bounce slow');
                    }
                    else if(score < 0.5){
                      compound.text("Score: Negative");
                      $('#neg-box').addClass('animated bounce slow');
                    }
                    else {
                      // Do nothing
                    }
                    $('#result').show();

                }
            }

            var request = $.ajax(settings);
            request.error(function() {
                alert("Something went wrong :(");
            })

        });

        $("#again").click(
            function() {
                $("#tar").show();
                $("#result").hide();
            }
        );
    }
);
