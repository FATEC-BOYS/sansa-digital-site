#!/usr/bin/env python3
"""Recover same-origin public site assets into public/. Does not deploy."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
from urllib.request import Request, urlopen
import re
BASE = "https://sansadigital.com.br/"
ROOT = Path("public")
ROOT.mkdir(exist_ok=True)
seen = set()
queue = [BASE, urljoin(BASE, "app.js"), urljoin(BASE, "styles.css"), urljoin(BASE, "robots.txt"), urljoin(BASE, "sitemap.xml")]
class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        for k in ("src","href","poster","data-src"):
            if d.get(k): self.links.append(d[k])
        if d.get("srcset"):
            self.links.extend(part.strip().split()[0] for part in d["srcset"].split(",") if part.strip())
def enqueue(url):
    u=urlparse(urljoin(BASE,url))
    if u.netloc not in ("sansadigital.com.br","www.sansadigital.com.br") or u.scheme!="https": return
    if u.path in ("", "/"): return
    if any(part in ("..", ".") for part in u.path.split("/")): return
    if u.path.startswith("/cdn-cgi/"): return
    queue.append(u._replace(query="",fragment="").geturl())
def recover(url):
    p=urlparse(url)
    path=unquote(p.path)
    if path in ("","/"): path="/index.html"
    dest=ROOT/path.lstrip("/")
    if dest.suffix.lower() not in (".html",".js",".css",".webp",".png",".jpg",".jpeg",".svg",".ico",".gif",".woff",".woff2",".json",".txt",".xml",".avif"): return
    req=Request(url,headers={"User-Agent":"SANSA-site-backup/1.0"})
    with urlopen(req,timeout=25) as r:
        if r.status != 200: return
        content=r.read(12_000_000)
        mime=r.headers.get("Content-Type","")
    if not content: return
    dest.parent.mkdir(parents=True,exist_ok=True)
    dest.write_bytes(content)
    print(f"Saved {dest} ({len(content)} bytes)")
    if "html" in mime or dest.suffix==".html":
        parser=Links();parser.feed(content.decode("utf-8","replace"))
        for link in parser.links: enqueue(link)
    if "css" in mime or dest.suffix==".css":
        for match in re.findall(r"url\(\s*['\"]?([^)'\"]+)",content.decode("utf-8","replace")): enqueue(match)
while queue and len(seen)<150:
    url=queue.pop(0)
    if url in seen: continue
    seen.add(url)
    try: recover(url)
    except Exception as e: print(f"SKIPPED {url}: {e}")
if not (ROOT/"index.html").exists(): raise SystemExit("Could not recover index.html; nothing committed")
print(f"Recovered {sum(1 for p in ROOT.rglob('*') if p.is_file())} files. Review before deploying.")
