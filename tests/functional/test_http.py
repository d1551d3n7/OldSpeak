# -*- coding: utf-8 -*-
from tests.functional.scenarios import web_scenario


@web_scenario
def test_(context):
    ("GET / should return 200 OK")

    response = context.client.get('/')

    response.status_code.should.equal(200)
