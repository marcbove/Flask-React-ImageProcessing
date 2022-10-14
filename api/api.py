import re
import base64
from flask import Flask, request, jsonify, send_file
from api.ImageProcessor import ImageProcessor

app = Flask(__name__)

img_pro = ImageProcessor


@app.route('/', methods=['POST'])
def upload_image():
    regex = re.compile('data:image/(png|jpg);base64,')
    image = request.form['File']
    path_images = ''

    if image != 'null':
        # If the image received is of type image PNG or JPEG
        if re.match(pattern=regex, string=image):
            # Remove trailing prefix
            image = re.sub(pattern=regex, repl='', string=image)

            # Decoda and save the received image to originalImg.png
            with open(path_images+'originalImg.png', 'wb') as file:
                file.write(base64.b64decode(image))

            img_processor = img_pro(image=path_images+'originalImg.png')      # create an Image Processor w/ the image received
            img_processor.process_image(path=path_images+'processedImg.png')     # process the image and save it to path

            # Recode image to send

            with open(path_images+'processedImg.png', 'rb') as file:
                processed_img_encoded = base64.b64encode(file.read())

            return send_file(path_images+'processedImg.png', mimetype='image/png')
        else:
            return {'response': 'Error: the picture must be of format JPG or PNG'}
    else:
        return ''


if __name__ == '__main__':
    app.run(debug=True)
