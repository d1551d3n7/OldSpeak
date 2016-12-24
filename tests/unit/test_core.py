# -*- coding: utf-8 -*-
import logging
from oldspeak.core import get_logger


def test_get_logger():
    logger = get_logger('test')
    logger.should.be.a(logging.Logger)
