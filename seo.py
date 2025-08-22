import requests
from bs4 import BeautifulSoup

def check_seo(url):
    findings = []
    try:
        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, "html.parser")
        if not soup.find("title"):
            findings.append("Missing <title> tag.")
        if not soup.find("meta", attrs={"name": "description"}):
            findings.append("Missing meta description tag.")
        if not soup.find("meta", attrs={"name": "keywords"}):
            findings.append("Missing meta keywords tag.")
        if not soup.find("h1"):
            findings.append("No H1 heading detected.")
    except Exception as e:
        findings.append(f"Site unreachable: {e}")
    return findings