import os
import falcon
from PIL import Image




os.chdir(os.curdir+"/src/image_processing")

foreground = Image.open("background_4.png").convert("RGBA")
background = Image.new("RGBA", foreground.size, 255)
mask = Image.open("bone_big_mask.png").convert("RGBA")

im = Image.composite(foreground, mask, mask).save("test.png")
#im = Image.composite(foreground, background, mask).save("test.png")