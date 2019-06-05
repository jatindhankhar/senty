const vader = require('vader-sentiment');

$(document).ready(
    function () {    
        $('#inputlg').on('input', handleInput);
        $("#tar").submit(function(event) {
            event.preventDefault();
        });
        $('#inputlg').submit(function(event) {
            event.preventDefault();
        });
    }
);
function handleInput(evt) {
    var input = evt.currentTarget.value;
    $('#result').show();
    var intensity = vader.SentimentIntensityAnalyzer.polarity_scores(input);
    console.log(intensity);

    console.log(intensity["pos"]);
    $('#sentence').text(JSON.stringify(intensity));
    $('#pos').text((intensity["pos"] * 100).toFixed(2) + " %")
    $('#pos-prog').css('width', (intensity["pos"] * 100) + '%').attr('aria-valuenow', (intensity["pos"] * 100));
    $('#neg').text((intensity["neg"] * 100).toFixed(2) + " %")
    $('#neg-prog').css('width', (intensity["neg"] * 100) + '%').attr('aria-valuenow', (intensity["neg"]) * 100);
    $('#neu').text((intensity["neu"] * 100).toFixed(2) + " %")
    $('#neu-prog').css('width', (intensity["neu"] * 100) + '%').attr('aria-valuenow', (intensity["neu"] * 100));
    var score = intensity["compound"];
    var compound = $('#compound');
    console.log(compound);
    if (score > 0.5) {
        compound.text("Overall Positive");
        $('#pos-box').addClass('animated bounce slow');
    }
    else if (score < 0.5 && score > 0.1) {
        compound.text("Score: Somewhat Positive");
        $('#pos-box').addClass('animated bounce slow');
    }
    else if (score < 0.1 && score > -0.1) {
        compound.text("Score: Neutral");
        $('#neu-box').addClass('animated bounce slow');
    }
    else if (score < -0.1 && score > -0.5) {
        compound.text("Score : Somewhat Negative");
        $('#neg-box').addClass('animated bounce slow');
    }
    else if (score < 0.5) {
        compound.text("Score: Negative");
        $('#neg-box').addClass('animated bounce slow');
    }
    else {
        // Do nothing
    }
   
}