# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import unicode_literals

import os
import re
import unicodedata

from plant import Node
from datetime import datetime
from decimal import Decimal

from oldspeak import settings


def utf8(string):
    result = string
    result = unicodedata.normalize("NFKD", result.decode('utf-8'))
    result = result.encode('utf-8', 'ignore')
    return result


def ascii(string):
    result = string.encode('ascii', 'ignore')
    return result


def slugify(string):
    normalized = unicodedata.normalize("NFKD", string.lower().strip())
    dashed = re.sub(r'\s+', '-', normalized)
    return re.sub(r'[^\w-]+', '', dashed)


def normalize_http_header_name(name):
    parts = [ascii(p).strip().capitalize() for p in name.split('-')]
    return '-'.join(parts)


def now():
    return datetime.utcnow()


def today():
    return now().date()


def empty():
    return None


def prettify_decimal(num):
    return "{0:,.2f}".format(Decimal(num))


def get_upload_node():
    return Node(settings.UPLOAD_PATH)


def sanitize_file_name(name):
    _, name = os.path.split(name)
    title, extension = os.path.splitext(name)
    return "".join([slugify(title), extension])
