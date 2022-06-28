
from flask import Flask , render_template
import tensorflow as tf

print(tf.__version__)

import cv2
import os 
import sys
import numpy as np
from datetime import datetime

\
TFLITE_FILE_PATH = "C:/Users/Rafael/Desktop/Hackaton/model.tflite"
test_dir = "C:/Users/Rafael/Desktop/Hackaton/faces-fiq/blur"
labels = ["Image is blurry", "Dark (Turn on the light!)", "Wearing mask", "Looking good", "Not looking", "Rotated picture", "Wearing sunglasses"]


def preprocess_image(image):
  shaped_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
  image_data = cv2.resize(shaped_image, (224, 224))
  image_data = image_data[np.newaxis, ...].astype(np.uint8)
  return image_data

interpreter = tf.lite.Interpreter(TFLITE_FILE_PATH)
interpreter.allocate_tensors() 

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details() 




app = Flask(__name__)

@app.route('/flask', methods=['GET'])
def index():
    image = cv2.imread("C:/Users/Rafael/Desktop/Hackaton/static/assets/images/myImage.JPG")
    input_data = preprocess_image(image)

    t1 = datetime.utcnow()
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()


    output_data = interpreter.get_tensor(output_details[0]['index'])
    print(datetime.utcnow() - t1)

    predictions = np.squeeze(output_data)

    p_scale, p_mean = output_details[0]["quantization"]

    predictions = (predictions - p_mean * 1.0) * p_scale

    max_index = np.argmax(predictions)
    conf = predictions[max_index]
    print (f"{labels[max_index]} - {conf}, inference time: {datetime.utcnow() - t1}")
    photo_problem = labels[max_index]
    number_acertive = conf
    print(photo_problem)

    return render_template("result.html" , problem = photo_problem , acertive = number_acertive)
    

if __name__ == "__main__":
  app.run(port=3000, debug=True,use_reloader=True)
    