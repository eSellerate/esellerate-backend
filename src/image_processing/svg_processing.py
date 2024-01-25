import os
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element
from flask import Flask
from flask import request
from flask import send_file
import numpy as np
from cairosvg import svg2png
import shutil

os.chdir(os.curdir + "/src/image_processing")

ET.register_namespace("", "http://www.w3.org/2000/svg")
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")

location_masks = "masks/"
location_backgrounds = "backgrounds/"
location_outputs = "outputs/"

default_mask = location_masks + "mask_bone_big.svg"
default_background = location_backgrounds + "background_default.svg"
default_output = "outputs/output.svg"
default_outputpng = "outputs/output.png"

output = default_output
outputpng = default_outputpng

namespaces = {"": "http://www.w3.org/2000/svg", "xlink": "http://www.w3.org/1999/xlink"}


class SVGTree:
    def __init__(self, svgfile="", type=""):
        if svgfile[-4:] != ".svg":
            svgfile = svgfile + ".svg"
        if os.path.isfile(svgfile):
            self.svgfile = svgfile
        else:
            if type == "mask":
                self.svgfile = default_mask
            else:
                self.svgfile = default_background
        self.tree = ET.parse(svgfile)
        self.root = self.tree.getroot()
        self.style = self.tree.find("style", namespaces)
        self.viewBox = np.asarray(self.root.attrib["viewBox"].split(" "), dtype=float)

    def print_from_root(self):
        for child in self.root[1:]:
            print(child.tag)

    def insert_on_id(self, svg2, id):
        insert = self.root.find(".//*[@id='" + id + "']")
        starting_number = 0
        if svg2.style is not None:
            self.style.text = self.style.text + svg2.style.text
            starting_number = starting_number + 1
        for child in svg2.root[starting_number:]:
            insert.append(child)
        self.tree.write(output)

    def insert_text(self, text):
        x = self.viewBox[2]
        y = self.viewBox[3]
        STYLE_BORDERED_TEXT = (
            """.sttext{font: """
            + str(y / 5)
            + """px bold sans-serif; text-anchor: middle; fill: white;
            }"""
            + """.sttextbold{font: """
            + str(y / 5)
            + """px bold sans-serif; stroke-linejoin: round; text-anchor: middle; fill: black; stroke: black;
            }"""
        )
        self.style.text = self.style.text + STYLE_BORDERED_TEXT
        insert = self.root
        insert.append(
            (
                ET.fromstring(
                    '<text class="sttextbold" x="50.5%" y="58%" width="20" style="stroke-width: 4.5px; paint-order: stroke;">'
                    + text
                    + "</text>"
                )
            )
        )
        insert.append(
            (
                ET.fromstring(
                    '<text class="sttext" x="50.5%" y="58%" width="20" style="stroke-width: 4.5px; paint-order: stroke;">'
                    + text
                    + "</text>"
                )
            )
        )
        self.tree.write(output)
        svg2png(url=output, write_to=outputpng, scale=4, dpi=15)


app = Flask(__name__)


@app.route("/generate")
def generate():
    mask = request.args.get("mask")
    if mask is None:
        mask = ""
    background = request.args.get("background")
    if background is None:
        background = ""
    id = request.args.get("id")
    if id is not None:
        output = location_outputs+id+".svg"
        outputpng = location_outputs+id+".png"
    shutil.copyfile(default_output, output)
    shutil.copyfile(default_outputpng, outputpng)
    svg1 = SVGTree(location_masks + mask, "mask")
    svg2 = SVGTree(location_backgrounds + background)
    svg1.insert_on_id(svg2, "replace")
    svg1.insert_text(request.args.get("text"))
    return send_file(outputpng)

@app.route("/generate_no_return")
def generate_no_return():
    mask = request.args.get("mask")
    if mask is None:
        mask = ""
    background = request.args.get("background")
    if background is None:
        background = ""
    id = request.args.get("id")
    if id is not None:
        output = location_outputs+id+".svg"
        outputpng = location_outputs+id+".png"
    shutil.copyfile(default_output, output)
    shutil.copyfile(default_outputpng, outputpng)
    svg1 = SVGTree(location_masks + mask, "mask")
    svg2 = SVGTree(location_backgrounds + background)
    svg1.insert_on_id(svg2, "replace")
    svg1.insert_text(request.args.get("text"))
    return (outputpng, 200)

# svg1 = SVGTree('mask_bone_big.svg')

# svg2 = SVGTree('background_55.svg')

app.run(host='0.0.0.0')
