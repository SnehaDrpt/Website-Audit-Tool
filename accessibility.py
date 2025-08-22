import requests
from bs4 import BeautifulSoup

def check_accessibility(url):
    findings = []
    try:
        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, "html.parser")
        imgs = soup.find_all("img")
        for img in imgs:
            if not img.get("alt"):
                findings.append("Image without alt attribute found.")
                break
        if not soup.find(attrs={"role": True}):
            findings.append("No ARIA roles detected for accessibility.")
    except Exception as e:
        findings.append(f"Site unreachable: {e}")
    return findings