#!/usr/bin/env python3
import http.server
import os

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self._strip_conditional_headers()
        super().do_GET()

    def do_HEAD(self):
        self._strip_conditional_headers()
        super().do_HEAD()

    def _strip_conditional_headers(self):
        for key in ('if-modified-since', 'if-none-match', 'if-range'):
            if key in self.headers:
                del self.headers[key]

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

os.chdir('zokontrol-site')
server = http.server.HTTPServer(('0.0.0.0', 5000), NoCacheHandler)
print('Serving on port 5000 with no-cache headers (304 blocked)...')
server.serve_forever()
