# -*- coding: utf-8 -*-
import traceback


class OldSpeakException(Exception):

    def to_dict(self):
        exc_type = type(self)
        return {
            'module': bytes(exc_type.__module__),
            'name': bytes(exc_type.__name__),
            'traceback': traceback.format_exc(self),
        }
