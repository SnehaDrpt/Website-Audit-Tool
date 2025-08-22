import requests

def check_security(url):
    findings = []
    if not url.startswith("https://"):
        findings.append("Site does not use HTTPS.")
    try:
        resp = requests.get(url, timeout=5)
        html = resp.text
        if "alert(" in html:
            findings.append("Potential XSS vulnerability - suspicious scripts found.")
        if "SELECT " in html or "INSERT INTO" in html:
            findings.append("Potential SQL injection risk - exposed SQL keywords.")
    except Exception as e:
        findings.append(f"Site unreachable: {e}")
    return findings