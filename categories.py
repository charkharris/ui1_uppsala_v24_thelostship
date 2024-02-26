import re
import json

def read_js_file(js_file_path):
    with open(js_file_path, 'r') as file:
        js_code = file.read()
        # Use regular expression to extract the JavaScript object definition
        match = re.search(r'var\s+DB2\s*=\s*({.*?});', js_code, re.DOTALL)
        if match:
            db2_js_object = match.group(1)
            return db2_js_object
        else:
            print("DB2 object not found in the JavaScript file.")
            return None

def parse_js_object(js_object_str):
    try:
        js_object_dict = json.loads(js_object_str)
        return js_object_dict
    except json.JSONDecodeError as e:
        print("Error parsing JavaScript object:", e)
        return None

def get_unique_categories(js_object):
    unique_categories = set()
    for spirit in js_object["spirits"]:
        unique_categories.add(spirit["varugrupp"])
    return list(unique_categories)

def save_to_file(categories, output_file):
    with open(output_file, 'w') as file:
        for category in categories:
            file.write(category + '\n')

# Example usage:
js_file_path = 'beverages.js'  # Path to your JavaScript file containing DB2 object
output_file = 'unique_categories.txt'  # Output file path
js_object_str = read_js_file(js_file_path)
if js_object_str:
    js_object_dict = parse_js_object(js_object_str)
    if js_object_dict:
        unique_categories = get_unique_categories(js_object_dict)
        save_to_file(unique_categories, output_file)
        print('Unique categories saved to:', output_file)
