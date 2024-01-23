import os
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element
from flask import Flask
from flask import request
from flask import send_file
import numpy as np

os.chdir(os.curdir + "/src/image_processing")

ET.register_namespace("", "http://www.w3.org/2000/svg")
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")

location_masks = "masks/"
location_backgrounds = "backgrounds/"

default_mask = location_masks + "mask_bone_big.svg"
default_background = location_backgrounds + "background_default.svg"

output = "outputs/output.svg"

namespaces = {"": "http://www.w3.org/2000/svg", "xlink": "http://www.w3.org/1999/xlink"}


class SVGTree:
    def __init__(self, svgfile="", type=""):
        if(svgfile is None):
            svgfile = ""
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
            """
            text {
            font: """
            + str(y / 5)
            + """px bold sans-serif; stroke-linejoin: round;
            text-anchor: middle; fill: white; stroke: black;
            }"""
        )
        self.style.text = self.style.text + STYLE_BORDERED_TEXT
        insert = self.root
        insert.append(
            (
                ET.fromstring(
                    '<text x="50.5%" y="58%" width="20" style="stroke-width: 4.5px; paint-order: stroke;">'
                    + text
                    + "</text>"
                )
            )
        )
        self.tree.write(output)


app = Flask(__name__)


@app.route("/generate")
def generate():
    mask = request.args.get("template")

    svg1 = SVGTree(location_masks + request.args.get("template"), "mask")
    svg2 = SVGTree(location_backgrounds + request.args.get("background"))
    svg1.insert_on_id(svg2, "replace")
    svg1.insert_text(request.args.get("text"))
    return send_file(output)


# svg1 = SVGTree('mask_bone_big.svg')

# svg2 = SVGTree('background_55.svg')

app.run()
