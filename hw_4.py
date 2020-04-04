from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient("mongodb+srv://user:hj4561@cluster0-ntlov.mongodb.net/test?retryWrites=true&w=majority")
db = client.shop

@app.route('/')
def home():
    return render_template('hw_4.html')

@app.route('/orders', methods = ['post'])
def orders_post():
    name = request.form["name"]
    amount = request.form["amount"]
    address = request.form["address"]
    contact = request.form["contact"]

    db.orders.insert_one({
        "name": name,
        "amount": amount,
        "address": address,
        "contact": contact,
    })
    return jsonify({"msg":"성공적으로 주문되었습니다!", "result":"success"})

@app.route('/orders', methods = ['get'])
def orders_get():
    orders = list(db.orders.find({}, {"_id":0}))
    return jsonify({"result":"success", "orders":orders})

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5000, debug = True)
