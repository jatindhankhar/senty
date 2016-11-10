from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)
sid = SentimentIntensityAnalyzer()

@app.route("/")
def hello():
    return "Hello World"

@app.route('/score')
def score():
    phrase =  request.args.get('phrase')
    if phrase:
      return jsonify(sid.polarity_scores(phrase))
    else:
      return jsonify({"error" : "Phrase cannot be empty"})

if __name__ == "__main__":
    app.run()
