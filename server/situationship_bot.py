from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

# Set up the OpenAI client with your API key from the environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    tone = data.get("tone", "neutral")

    prompt = f"""
    You are an emotionally intelligent AI giving advice on modern romantic situationships.
    Your tone should be '{tone}' — keep it appropriate to the tone style.
    The user says: "{message}"
    Respond with thoughtful, relevant advice (no more than 5 sentences).
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a relationship advisor AI."},
            {"role": "user", "content": prompt}
        ]
    )

    reply = response.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
