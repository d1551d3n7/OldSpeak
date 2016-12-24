# -*- coding: utf-8 -*-

import json as simplejson
from datetime import datetime, date, time


def default_json_converter(value):
    date_types = (datetime, date, time)
    if isinstance(value, date_types):
        value = value.isoformat()

    return str(value)


def dumps(data, **kw):
    kw['default'] = default_json_converter
    kw['sort_keys'] = True
    return simplejson.dumps(data, **kw)


def loads(*args, **kw):
    return simplejson.loads(*args, **kw)
