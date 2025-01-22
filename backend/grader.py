import io
import sys

def grade(code):
    
    try:
        with open('scheme.txt', 'r') as file:
            scheme = [line.strip() for line in file.readlines()]
    except Exception as e:
        print(f"An unexpected error has occured: {str(e)}")
    
    grade = 0

    localSpace = {}

    output = io.StringIO()
    sys.stdout = output

    try:
        exec(code, {}, localSpace)
    except Exception as e:
        print(f"Caught an exception: {e}")
        sys.stdout = sys.__stdout__
        return 0
    finally:
        sys.stdout = sys.__stdout__
    
    output = output.getvalue().strip()

    print(output)
    print(localSpace)