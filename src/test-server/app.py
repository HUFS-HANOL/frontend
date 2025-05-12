from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app) 

@app.route('/generate-poem', methods=['POST'])
def generate_poem():
    data = request.get_json()
    diary = data.get('diary', '')
    
    print(f"받은 일기 내용: {diary}") 
    
    # 테스트를 위해 2초 대기
    time.sleep(2)
    
    response = {
        'poem': f"전달된 내용: {diary}",
        'phrase': f"테스트 응답" 
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8000, debug=True) 