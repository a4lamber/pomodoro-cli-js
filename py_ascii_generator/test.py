"""
 # @ Author: Your name
 # @ Create Time: 2024-05-20 22:53:09
 # @ Modified by: Your name
 # @ Modified time: 2024-05-20 22:53:44
 # @ Description:
 """

from PIL import Image
import numpy as np
import itertools


# Function to compute grayscale value of a pixel
def grayscale(pixel):
    return 0.3 * pixel[0] + 0.59 * pixel[1] + 0.11 * pixel[2]


# Function to compute contrast
def contrast(d, contrast):
    return ((d - 0.5) * contrast) + 0.5


# Function to generate ASCII characters and colors
def generate_ascii():
    characters = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"]
    colors = ["\033[30m", "\033[37m", "\033[37m"]  # DarkGray, Gray, White
    return [
        "".join((color, char, "\033[0m"))
        for color, char in itertools.product(colors, characters)
    ]


# Function to get pixels from a rectangular region of an image
def get_pixels(image, rect):
    for y in range(rect[1], rect[3]):
        for x in range(rect[0], rect[2]):
            yield image.getpixel((x, y))


# Function to convert image to ASCII art
def image_to_ascii(image_path, width=100):
    img = Image.open(image_path)
    img = img.convert("RGB")
    aspect_ratio = img.width / img.height
    height = int(width / aspect_ratio)

    img = img.resize((width, height))

    ascii_chars = generate_ascii()

    ascii_art = ""
    for y in range(height):
        for x in range(width):
            region = (x, y, x + 1, y + 1)
            region_pixels = get_pixels(img, region)
            region_pixels_list = list(region_pixels)
            average_pixel = sum(grayscale(pixel) for pixel in region_pixels_list) / len(
                region_pixels_list
            )

            luminosity = contrast(average_pixel, 1.5)
            index = min(
                max(int(luminosity * (len(ascii_chars) - 1)), 0), len(ascii_chars) - 1
            )

            ascii_art += ascii_chars[index]
        ascii_art += "\n"
    return ascii_art


# Example usage
if __name__ == "__main__":
    ascii_image = image_to_ascii("gandalf.png", width=200)
    print(ascii_image)
