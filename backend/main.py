import json
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  


# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Firestore listener for a specific collection or document
def firestore_student_report_listener():
    # Listen to a Firestore collection (e.g., "your-collection")
    print('Setting up student noise listener to firestore')
    student_noise_reports_ref = db.collection("student_noise_reports").order_by("timestamp", direction=firestore.Query.DESCENDING)
    
    # Firestore callback
    def on_snapshot_student_report(docs, changes, read_time):
        return_list = []
        for doc in docs:
            return_list.append(doc.to_dict())
        print("Report List updated!")
        socketio.emit("update_student_reports", return_list)
    # Attach the listener
    student_noise_reports_ref.on_snapshot(on_snapshot_student_report)

def firestore_device_noise_listener():
    # Firestore callback
    def on_snapshot_device_noise(docs, changes, read_time, device_no=1):
        return_list = [doc.to_dict() for doc in docs[-20:]]
        print(f"Device {device_no} updated!", return_list)
        socketio.emit(f"update_device_noise_{device_no}", return_list)

    device_noise_ref = db.collection("device_noise_1").order_by("timestamp", direction=firestore.Query.DESCENDING)

    # Attach the listener
    device_noise_ref.on_snapshot(lambda docs, changes, read_time: on_snapshot_device_noise(docs, changes, read_time, 1))

    device_noise_ref = db.collection("device_noise_2").order_by("timestamp", direction=firestore.Query.DESCENDING)

    # Attach the listener
    device_noise_ref.on_snapshot(lambda docs, changes, read_time: on_snapshot_device_noise(docs, changes, read_time, 2))

    
    device_noise_ref = db.collection("device_noise_3").order_by("timestamp", direction=firestore.Query.DESCENDING)

    # Attach the listener
    device_noise_ref.on_snapshot(lambda docs, changes, read_time: on_snapshot_device_noise(docs, changes, read_time, 3))

@app.route('/api/check_status')
def check_status():
    return f"RocQuieter's backend is alive and well as of {datetime.now()}", 200

# Device noise endpoint


@app.route('/api/device_noise', methods=['POST'])
def device_noise():
    data = request.json
    if not data or 'decibel' not in data or 'device_id' not in data:
        return jsonify({"error": "Invalid data. Required fields: decibel, device_id"}), 400

    device_id = data['device_id']
    noise_reading = {
        "decibel": data['decibel'],
        "timestamp": int(datetime.now().timestamp() * 1000)
    }

    try:
        db.collection(f'device_noise_{device_id}').add(noise_reading)
        return jsonify({"message": "Device noise uploaded successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Student noise report endpoint


@app.route('/api/student_report', methods=['POST'])
def student_report():
    data = request.json
    if not data or 'noise_level' not in data or 'student_id' not in data or 'location' not in data or 'notes' not in data:
        return jsonify({"error": "Invalid data. Required fields: noise_level, student_id, location, notes"}), 400

    if data['noise_level'] not in range(1, 6):
        return jsonify({"error": "Noise level must be between 1 and 5"}), 400

    noise_report = {
        "student_id": data['student_id'],
        "noise_level": data['noise_level'],
        "location": data['location'],
        "notes": data['notes'],
        "timestamp": int(datetime.now().timestamp() * 1000)
    }

    try:
        db.collection('student_noise_reports').add(noise_report)
        return jsonify({"message": "Student noise report uploaded successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/student_report', methods=['GET'])
def get_reports():
    try:
        # Access the Firestore collection
        collection_ref = db.collection('student_noise_reports')
        docs = collection_ref.order_by(
            'timestamp', direction=firestore.Query.DESCENDING).stream()

        # Convert documents to a list of dictionaries
        reports = [{**doc.to_dict(), 'id': doc.id} for doc in docs]

        return jsonify(reports), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('message')
def handle_message(data):
    print(f"Received message: {data}")
    # emit('response', {'data': 'Message received!'})

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    # Start the Firestore listener when the server starts
    firestore_student_report_listener()
    firestore_device_noise_listener()
    # app.run(host="0.0.0.0", debug=True)
    socketio.run(app, host='0.0.0.0', debug=True)

