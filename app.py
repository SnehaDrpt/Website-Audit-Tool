from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from audit_lib.security import check_security
from audit_lib.performance import check_performance
from audit_lib.seo import check_seo
from audit_lib.accessibility import check_accessibility

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def calculate_threat_level(results):
    issues_count = sum(len(v) for v in results.values())
    if issues_count == 0:
        return "No"
    elif issues_count <= 2:
        return "Low"
    elif issues_count <= 5:
        return "Medium"
    else:
        return "High"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/audit", methods=["POST"])
def audit():
    url = request.form["url"]
    result = {
        'security': check_security(url),
        'performance': check_performance(url),
        'seo': check_seo(url),
        'accessibility': check_accessibility(url)
    }
    result['overall_threat'] = calculate_threat_level(result)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
