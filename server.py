import http.server
import socketserver
import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Helper to safely load .env file
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ[k.strip()] = v.strip()

load_env()

PORT = int(os.environ.get("PORT", 3000))
GMAIL_USER = os.environ.get("GMAIL_USER", "guray0449@gmail.com")
GMAIL_APP_PASS = os.environ.get("GMAIL_APP_PASS", "")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/send-email':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', 'İsimsiz')
                visitor_email = data.get('email', 'E-posta Yok')
                message = data.get('message', '')

                if not GMAIL_APP_PASS:
                    raise ValueError("GMAIL_APP_PASS is not configured in environment or .env file.")

                # Compose Email
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f"AFM Portfolyo - Yeni İletişim Mesajı: {name}"
                msg['From'] = f"AFM Portfolio <{GMAIL_USER}>"
                msg['To'] = GMAIL_USER
                msg['Reply-To'] = visitor_email

                html_content = f"""
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <h2 style="color: #1e3a8a; margin-top: 0;">📬 AFM Portfolyo - Yeni İletişim Mesajı</h2>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                        
                        <p><strong>Gönderen Kişi:</strong> {name}</p>
                        <p><strong>E-Posta Adresi:</strong> <a href="mailto:{visitor_email}">{visitor_email}</a></p>
                        <p><strong>Gönderilme Tarihi:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                        
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border-left: 4px solid #4f46e5; margin-top: 16px;">
                            <h4 style="margin: 0 0 8px 0; color: #4f46e5;">Mesaj Detayı:</h4>
                            <p style="margin: 0; white-space: pre-wrap; color: #475569;">{message}</p>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
                        <p style="font-size: 11px; color: #94a3b8; margin: 0;">Bu e-posta AFM Portfolyo web sitenizdeki iletişim formundan otomatik olarak gönderilmiştir.</p>
                    </div>
                </body>
                </html>
                """

                msg.attach(MIMEText(html_content, 'html'))

                # Send via Gmail SMTP
                smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
                smtp_server.starttls()
                smtp_server.login(GMAIL_USER, GMAIL_APP_PASS)
                smtp_server.sendmail(GMAIL_USER, [GMAIL_USER], msg.as_string())
                smtp_server.quit()

                # Send HTTP 200 Response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = json.dumps({"success": True, "message": "Email sent successfully!"})
                self.wfile.write(response.encode('utf-8'))

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = json.dumps({"success": False, "error": str(e)})
                self.wfile.write(response.encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

if __name__ == '__main__':
    class MultiHandler(http.server.SimpleHTTPRequestHandler):
        def do_POST(self):
            if self.path == '/api/send-email':
                CustomHandler.do_POST(self)
            else:
                super().do_POST()

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), MultiHandler) as httpd:
        print(f"AFM Server running at http://localhost:{PORT}")
        httpd.serve_forever()
