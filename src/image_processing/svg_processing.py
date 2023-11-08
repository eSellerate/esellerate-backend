import os
import xml.etree.ElementTree as ET

os.chdir(os.curdir+"/src/image_processing")

tree = ET.parse('red.svg')
root = tree.getroot()
for child in root:
    print(child.tag, child.attrib)