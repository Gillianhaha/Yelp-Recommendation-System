from flask import Flask, request, jsonify
from recommendation import Recommendation

app = Flask(__name__)

recommender = Recommendation()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/get_recommendation", methods=["GET"])
def get_recommendation():
    args = request.args
    external_user_id = args.get("external_customer_id")
    if not external_user_id:
        return []

    print("recommending restaurant for customer " + external_user_id)
    res = jsonify(data=recommender.restaurant_predictions(external_user_id))
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res
    # return recommender.predict_restaurant_mock(external_user_id)


