from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from huggingface_hub import InferenceClient

load_dotenv()
access_token = os.getenv('HF_ACCESS_TOKEN')

app = Flask(__name__)
# Allow all origins for development
CORS(app, resources={r"/*": {"origins": "*"}})

def get_data_from_mistral(search_query=""):
    SYSTEM_PROMPT = """
        You are an assistant that curates trending project posts for a client. Each post should clearly have:
        - A **heading** (project or repository name, e.g., 'asgeirtj/system_prompts_leaks')
        - A **description** (4 sentence or more about what it does or offers)
        - A **link** to the original source (GitHub repo, Hugging Face model/page, or Kaggle dataset).

        Generate a list of recent, popular, or highly rated projects from Hugging Face and GitHub, in this exact format:
        ---
        **heading/project_name**
        description of the project, succinct.
        link: <source-link>
        ---

        If possible, only include posts with actual links to Hugging Face or GitHub. Present the most relevant, trending projects.
        Format your output for display in a web application, emphasizing Markdown clarity and easy link extraction.
    """

    client = InferenceClient(token=access_token)

    user_content = (
        f"Show me just 10 trending project or models from Hugging Face or GitHub "
        f"{'related to ' + search_query if search_query else ''} with a heading, description, and the source link (like the attached format)."
    )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]

    response = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=messages,
        max_tokens=1024,
    )
    # Extract the markdown string content
    return response.choices[0].message.content

def parse_markdown_to_json(raw_markdown):
    """
    Parse markdown LLM output format into JSON array for the frontend.
    """
    results = []
    blocks = raw_markdown.split('---')
    for block in blocks:
        lines = [line.strip() for line in block.strip().split('\n') if line.strip()]
        if not lines:
            continue
        title_line = lines[0]
        if title_line.startswith('**') and title_line.endswith('**'):
            title = title_line.strip('*')
        else:
            title = title_line

        description_lines = []
        url = ""
        for line in lines[1:]:
            if line.lower().startswith('link:'):
                url = line.split('link:', 1)[1].strip(' <>')
            else:
                description_lines.append(line)
        description = ' '.join(description_lines).strip()

        if title and url:
            results.append({
                "id": title,
                "title": title,
                "description": description,
                "url": url,
                "provider": "mistral-llm",
                "thumbnail": ""  # Optional: add placeholder or fill accordingly
            })
    return results

@app.route('/search')
def search():
    q = request.args.get('q', '').strip()
    raw_result = get_data_from_mistral(q)
    json_result = parse_markdown_to_json(raw_result)
    return jsonify(json_result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
