import re

def extract_between(input_object):
    if isinstance(input_object, str):
        input_string = input_object
    elif hasattr(input_object, 'content'):
        input_string = input_object.content
    elif hasattr(input_object, 'text'):
        input_string = input_object.text
    else:
        return []  # Return an empty list if the object doesn't contain any string representation

    pattern = r'\$\$(.*?)\$\$'
    matches = re.findall(pattern, input_string)
    return matches


def extract_outside(input_object):
    if isinstance(input_object, str):
        input_string = input_object
    elif hasattr(input_object, 'content'):
        input_string = input_object.content
    elif hasattr(input_object, 'text'):
        input_string = input_object.text
    else:
        return []  # Return an empty list if the object doesn't contain any string representation

    pattern = r'\$\$(.*?)\$\$'
    matches = re.split(pattern, input_string)
    outside_content = []
    inside = False
    
    for match in matches:
        if inside:
            inside = False
        else:
            outside_content.append(match)
            inside = True
    
    return outside_content



