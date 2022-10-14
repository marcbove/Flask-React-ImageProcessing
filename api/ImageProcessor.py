import numpy
from PIL import Image


class ImageProcessor(object):

    def __init__(self, image):
        self._image = image
        self._processed_image = None

    def process_image(self, path=''):
        # Using NumPy, applies an algorithm to flip horizontally an image
        img = Image.open(self.image)
        self.processed_image = Image.fromarray(numpy.fliplr(img))
        self.processed_image.save(path)
        return self.processed_image

    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, value):
        self._image = value

    @property
    def processed_image(self):
        return self._processed_image

    @processed_image.setter
    def processed_image(self, value):
        self._processed_image = value


if __name__ == '__main__':
    pass
