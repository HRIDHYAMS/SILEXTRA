import nltk
import os
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

from flask import Flask, render_template, request
from nltk.parse.corenlp import CoreNLPParser
from nltk.tree import *
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)

# Set up Stanford Parser (using CoreNLPParser)
java_path = "C:\\Program Files\\Java\\jdk-17\\bin\\java.exe"
os.environ['JAVAHOME'] = java_path

# Assuming CoreNLP server is running on port 9000
parser = CoreNLPParser(url="http://localhost:9000")

# Initialize NLTK components
stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    input_string = request.form['input_text']
    
    # Parse input string
    input_string += " "  # Add space at the end to ensure proper parsing
    englishtree = [tree for tree in parser.parse(input_string.split())]
    parsetree = englishtree[0]
    parenttree = ParentedTree.convert(parsetree)
    
    # Initialize set to track unique words
    unique_words = set()
    
    # Extract ISL tree and unique words
    isltree = Tree('ROOT', [])
    for sub in parenttree.subtrees():
        # Extract NP and VP subtrees
        if sub.label() in ["NP", "VP"]:
            isltree.append(sub)
        # Extract single-word subtrees not under NP or VP
        for sub2 in sub.subtrees():
            if len(sub2.leaves()) == 1 and sub2.label() not in ["NP", "VP"]:
                word = sub2.leaves()[0]
                unique_words.add(word)
                isltree.append(sub2)
    
    # Lemmatize the unique words
    lemmatized_words = [lemmatizer.lemmatize(w) for w in unique_words if w not in stop_words]
    
    # Generate ISL sentence
    islsentence = " ".join(lemmatized_words)
    
    return render_template('index.html', input_text=input_string, isl_text=islsentence.strip())

if __name__ == '__main__':
    app.run(debug=True)
