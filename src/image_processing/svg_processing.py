import os
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element
from flask import Flask
from flask import request
from flask import send_file

os.chdir(os.curdir+"/src/image_processing")

ET.register_namespace('', "http://www.w3.org/2000/svg")
ET.register_namespace('xlink', "http://www.w3.org/1999/xlink")

namespaces = {
    '': 'http://www.w3.org/2000/svg',
    'xlink': 'http://www.w3.org/1999/xlink'
    }

class SVGTree:
    def __init__(self, svgfile):
        self.svgfile = svgfile
        self.tree = ET.parse(svgfile)
        self.root = self.tree.getroot()
        self.style = self.tree.find('style', namespaces)

    def print_from_root(self):
        for child in self.root[1:]:
            print(child.tag)
    
    def insert_on_id(self, svg2, id):
        insert = self.root.find(".//*[@id='"+id+"']")
        starting_number = 0
        if(svg2.style):
            self.style.text = self.style.text + svg2.style.text
            starting_number = starting_number + 1
        for child in svg2.root[starting_number:]:
            insert.append(child)
        self.tree.write("output.svg")

    def insert_text(self, text):
        insert = self.root
        textcss = '.name-text {font-size:  18px; paint-order: stroke; stroke: #000000; stroke-width: 1px; stroke-linecap: butt; stroke-linejoin: miter; font-weight: 800}'
        self.style.text = self.style.text + textcss
        insert.append((ET.fromstring('<text x="50" y="50" style="stroke-width: 12px; paint-order: stroke;">'+text+'</text>')))
        self.tree.write("output.svg")

app = Flask(__name__)

@app.route('/generate')
def generate():
    svg1 = SVGTree(request.args.get('template'))
    svg2 = SVGTree(request.args.get('background'))
    svg1.insert_on_id(svg2, "replace")
    svg1.insert_text("Rocko")
    return send_file('output.svg')

#svg1 = SVGTree('mask_bone_big.svg')

#svg2 = SVGTree('background_55.svg')

app.run()