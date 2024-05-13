from flask import Flask, request, jsonify
import joblib
import math
from textblob import TextBlob
from flask_cors import CORS
app = Flask(__name__)

CORS(app, resources={
    r"/getPrice": {"origins": "http://localhost:3000"},
    r"/getReview": {"origins": "http://localhost:3000"}
})
model = joblib.load('DynamicPricingFinal.joblib')
reviewModel= joblib.load('reviews.joblib')

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/getPrice", methods=['POST'])
def getPrice():
    response = request.get_json()
    print(response)
    service = response['service']
    if service == 'App':
        service = 0
    elif service == 'Docs':
        service = 2
    elif service == 'PPT':
        service = 5
    elif service == 'Website':
        service = 6
    elif service == 'Backend':
        service = 1
    elif service == 'Frontend':
        service = 4
    elif service == 'Figma':
        service = 3
    pages = response['no_of_pages']
    deadline = response['days']
    print(service, pages, deadline)
    price = model.predict([[service, pages, deadline]])
    return jsonify({'price': math.ceil(price[0])})

@app.route("/getReviews", methods=['POST'])
def getReviews():
    response = request.get_json()
    print(response)
    review = response['review']
    sentiment = reviewModel.predict([review])
    return jsonify({'sentiment': sentiment})
















































































































































































@app.route("/getReview", methods=['POST'])
def getReview():
    response = request.get_json()
    print(response)

    review = response['review']
    # sentiment = reviewModel.predict([review])
    text=TextBlob(review)

    return jsonify({'sentiment':text.sentiment})


if __name__ == "__main__":
    app.run(debug=True)
