# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import unicode_literals

import json as pyjson

from datetime import date
from datetime import time
from datetime import datetime

from .functions import utf8


def json_converter(value):
    date_types = (datetime, date, time)
    if isinstance(value, date_types):
        value = value.isoformat()

    return utf8(value)


class json(object):

    @staticmethod
    def dumps(data, **kw):
        kw['default'] = json_converter
        kw['sort_keys'] = True
        return pyjson.dumps(data, **kw)

    @staticmethod
    def loads(*args, **kw):
        return pyjson.loads(*args, **kw)
