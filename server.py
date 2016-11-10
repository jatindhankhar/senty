#from nltk.sentiment.vader import SentimentIntensityAnalyzer
from vaderSentiment.vaderSentiment import sentiment
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__,static_url_path='')


@app.route("/")
def hello():
    return app.send_static_file('index.html')

@app.route('/score',methods=['POST'])
def score():
    phrase =  request.args.get('phrase')
    
    if phrase:
      return jsonify(sentiment(phrase))
    else:
      return jsonify({"error" : "Phrase cannot be empty"})

if __name__ == "__main__":
    app.run()
