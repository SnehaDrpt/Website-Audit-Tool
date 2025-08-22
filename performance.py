import requests
import time

def check_performance(url):
    findings = []
    try:
        start = time.time()
        resp = requests.get(url)
        duration = time.time() - start
        if duration > 3:
            findings.append(f"Page load time is slow: {duration:.2f}s")
        else:
            findings.append(f"Page load time: {duration:.2f}s")
        size_kb = len(resp.content) / 1024
        if size_kb > 500:
            findings.append(f"Large page size: {size_kb:.2f}KB.")
    except Exception as e:
        findings.append(f"Site unreachable: {e}")
    return findings