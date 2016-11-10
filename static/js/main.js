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
