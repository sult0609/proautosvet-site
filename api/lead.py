# api/lead.py
#
# Serverless-функция для Vercel (Python runtime): принимает заявку с сайта
# ProAutosvet (тот же JSON, что шлёт assets/app.js: {name, phone, car, source, page})
# и создаёт сделку + контакт в AmoCRM напрямую через API v4.
#
# КАК ПОДКЛЮЧИТЬ:
# 1. Положите этот файл в папку api/ в корне репозитория сайта на GitHub
#    (рядом с index.html). Vercel сам определит его как Python-функцию
#    по расширению .py и обслужит по адресу /api/lead — второй файл
#    (api/lead.js, если он есть) нужно удалить, иначе будет конфликт
#    на один и тот же адрес /api/lead.
# 2. В AmoCRM: Настройки → Интеграции → Создать интеграцию → «Ключи и
#    доступы» → «Создать долгосрочный токен» (уже сделано — токен и
#    подомен proavtosvet у вас уже есть).
# 3. В Vercel: Project Settings → Environment Variables — добавьте:
#      AMOCRM_SUBDOMAIN = proavtosvet
#      AMOCRM_TOKEN     = <ваш долгосрочный токен>   (вводите прямо в Vercel,
#                                                       никогда не в файл/код)
#      ALLOWED_ORIGIN   = https://proavtosvet-patsha.kz
# 4. В assets/app.js впишите:
#      var LEAD_WEBHOOK_URL = "https://ваш-проект.vercel.app/api/lead";
#
# Написано на чистой стандартной библиотеке Python (без внешних пакетов
# и requirements.txt), чтобы деплой был максимально простым — Vercel сам
# подхватит .py-файл в api/ и запустит его как serverless-функцию.

import json
import os
import time
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler


def _call_amo(url, token, payload, attempt=1):
    """POST payload в AmoCRM с одной короткой повторной попыткой при 429."""
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, body
    except urllib.error.HTTPError as e:
        if e.code == 429 and attempt < 3:
            time.sleep(0.5 * attempt)
            return _call_amo(url, token, payload, attempt + 1)
        return e.code, e.read().decode("utf-8")


class handler(BaseHTTPRequestHandler):
    def _cors_headers(self):
        allowed_origin = os.environ.get("ALLOWED_ORIGIN", "*")
        self.send_header("Access-Control-Allow-Origin", allowed_origin)
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, status, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b""
        try:
            data = json.loads(raw.decode("utf-8")) if raw else {}
        except json.JSONDecodeError:
            return self._json(400, {"error": "Invalid JSON"})

        name = (data.get("name") or "").strip()
        phone = (data.get("phone") or "").strip()
        car = (data.get("car") or "").strip()
        source = (data.get("source") or "").strip()
        page = (data.get("page") or "").strip()
        website = (data.get("website") or "").strip()  # honeypot

        # простая защита от ботов: скрытое поле "website" на форме,
        # которое человек никогда не заполнит, а спам-бот — заполнит
        if website:
            return self._json(200, {"ok": True})

        if not name or not phone:
            return self._json(400, {"error": "Укажите имя и телефон"})

        subdomain = os.environ.get("AMOCRM_SUBDOMAIN")
        token = os.environ.get("AMOCRM_TOKEN")
        if not subdomain or not token:
            print("AMOCRM_SUBDOMAIN / AMOCRM_TOKEN не заданы в переменных окружения")
            return self._json(500, {"error": "Server misconfigured"})

        lead_name = f"Заявка с сайта — {car}" if car else "Заявка с сайта"
        note_lines = []
        if source:
            note_lines.append(f"Источник: {source}")
        if page:
            note_lines.append(f"Страница: {page}")
        note_text = "\n".join(note_lines)

        payload = [{
            "name": lead_name,
            "_embedded": {
                "contacts": [{
                    "name": name,
                    "custom_fields_values": [{
                        "field_code": "PHONE",
                        "values": [{"value": phone, "enum_code": "WORK"}],
                    }],
                }],
            },
        }]

        leads_url = f"https://{subdomain}.amocrm.ru/api/v4/leads/complex"
        status, body = _call_amo(leads_url, token, payload)

        if status not in (200, 201):
            print("AmoCRM error", status, body)
            return self._json(502, {"error": "AmoCRM error"})

        try:
            resp_data = json.loads(body)
            lead_id = resp_data[0]["id"] if resp_data else None
        except (json.JSONDecodeError, KeyError, IndexError):
            lead_id = None

        # примечание с деталями заявки (необязательно, но удобно —
        # источник и страница видны прямо в карточке сделки)
        if lead_id and note_text:
            notes_url = f"https://{subdomain}.amocrm.ru/api/v4/leads/{lead_id}/notes"
            note_payload = [{"note_type": "common", "params": {"text": note_text}}]
            try:
                _call_amo(notes_url, token, note_payload)
            except Exception as e:
                print("note error", e)

        return self._json(200, {"ok": True, "leadId": lead_id})
