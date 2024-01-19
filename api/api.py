

# # # # # # # #  THIS IS THE API FILE  # # # # # # # # 





from functions import extract_outside, extract_between, vuba, ouba
from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI

client = OpenAI(api_key='YOUR_API_KEY')


app = Flask(__name__)
CORS(app)




def get_bot_response(prompt, messages):
    response = client.chat.completions.create(model="ft:gpt.....",
    messages=messages,
    temperature=1.12,
    max_tokens=256,
    top_p=0.48,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    bot_response = response.choices[0].message
    return bot_response

    
#create a post request handler
@app.route('/send', methods=['POST'])
def post():
    
    data = request.json

    messages = [
        {"role": "system", "content": vuba},
    ]

    while True:
        user_input = request.json.get('user_input')
        messages.append({"role": "user", "content": user_input})
        bot_response = get_bot_response(user_input, messages)
        
        first_response = extract_outside(bot_response)
        command = extract_between(bot_response)
        command_string = ' '.join(command)
        #messages.append({"role": "user", "content": user_input}) 
        messages.append({"role": "assistant", "content": bot_response})  # Add bot's response to the list of messages
        
        response = {
            'msg': 'Received user input successfully.',
            'user_input': user_input,
            
            'first_response': first_response,
            'command': command_string
        }

        return jsonify(response)


###@app.route('/sendouba', methods=['POST']) for future
    
if __name__ == '__main__':
    app.run(debug=True)


