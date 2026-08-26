# backend/app.py
#
# Обычное Python-приложение (Flask), не привязанное к Vercel — можно
# задеплоить куда угодно: свой VPS, Render, Railway, PythonAnywhere и т.д.
# Хранит секреты в файле .env (см. .env.example рядом).
#
# ЗАПУСК ЛОКАЛЬНО (для теста):
#   pip install -r requirements.txt
#   cp .env.example .env         # и впишите туда реальный токен
#   python app.py
#   -> сервер поднимется на http://localhost:5000/api/lead
#
# ЗАПУСК В ПРОДЕ (на сервере):
#   gunicorn -w 2 -b 0.0.0.0:5000 app:app
#
# ВАЖНО: файл .env никогда не должен попадать в git/GitHub — добавьте
# его в .gitignore (см. .gitignore рядом). Реальный токен вписывается
# только в .env на самом сервере, не в этот файл и не в код.

import os
import logging

from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

AMOCRM_SUBDOMAIN = os.environ.get("AMOCRM_SUBDOMAIN")
AMOCRM_TOKEN = os.environ.get("AMOCRM_TOKEN")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.route("/api/lead", methods=["OPTIONS"])
def lead_options():
    return "", 204


@app.route("/api/lead", methods=["POST"])
def lead():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    car = (data.get("car") or "").strip()
    source = (data.get("source") or "").strip()
    page = (data.get("page") or "").strip()
    website = (data.get("website") or "").strip()  # honeypot от ботов

    if website:
        return jsonify(ok=True), 200

    if not name or not phone:
        return jsonify(error="Укажите имя и телефон"), 400

    if not AMOCRM_SUBDOMAIN or not AMOCRM_TOKEN:
        app.logger.error("AMOCRM_SUBDOMAIN / AMOCRM_TOKEN не заданы в .env")
        return jsonify(error="Server misconfigured"), 500

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

    headers = {
        "Authorization": f"Bearer {AMOCRM_TOKEN}",
        "Content-Type": "application/json",
    }
    leads_url = f"https://{AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex"

    try:
        r = requests.post(leads_url, json=payload, headers=headers, timeout=10)
    except requests.RequestException as e:
        app.logger.error("AmoCRM request failed: %s", e)
        return jsonify(error="AmoCRM unreachable"), 502

    if r.status_code not in (200, 201):
        app.logger.error("AmoCRM error %s: %s", r.status_code, r.text)
        return jsonify(error="AmoCRM error"), 502

    lead_id = None
    try:
        resp_json = r.json()
        lead_id = resp_json[0]["id"]
    except Exception:
        pass

    # необязательное примечание с источником/страницей — видно прямо в сделке
    if lead_id and note_text:
        notes_url = f"https://{AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/{lead_id}/notes"
        note_payload = [{"note_type": "common", "params": {"text": note_text}}]
        try:
            requests.post(notes_url, json=note_payload, headers=headers, timeout=10)
        except requests.RequestException as e:
            app.logger.error("note error: %s", e)

    return jsonify(ok=True, leadId=lead_id), 200


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(ok=True, configured=bool(AMOCRM_SUBDOMAIN and AMOCRM_TOKEN)), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
