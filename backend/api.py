from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Data from the backend"}
    print("get_data() function called")
    return jsonify(data)
