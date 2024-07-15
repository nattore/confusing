#!/bin/env python

import sys
import re

def convert_single_line_table(single_line_table, num_columns):
    # Split the single line table into rows based on double pipes (||)
    rows = single_line_table.strip('|').split('||')
    
    # Define the regex pattern to extract the columns
    column_pattern = r'\|\s*(.*?)\s*' * num_columns + r'\|'
    
    # Prepare the replacement pattern
    replacement = '|' + ' | '.join([f'\\{i+1}' for i in range(num_columns)]) + ' |\n'
    
    # Initialize the multi-line table
    multi_line_table = ''
    
    # Convert each row
    for row in rows:
        multi_line_table += re.sub(column_pattern, replacement, f'|{row}|')
    
    return multi_line_table.strip()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python convert_table.py <number_of_columns>")
        sys.exit(1)

    num_columns = int(sys.argv[1])

    # Read the single-line table from stdin
    single_line_table = sys.stdin.read().strip()

    # Convert and print the multi-line table
    multi_line_table = convert_single_line_table(single_line_table, num_columns)
    print(multi_line_table)
