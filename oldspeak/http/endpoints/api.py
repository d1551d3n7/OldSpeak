# -*- coding: utf-8 -*-
from uuid import uuid4
from oldspeak.http.core import ServerComponent
from oldspeak.http.core import json_response

api = ServerComponent('api', prefix='/api')


@api.post('/markdown/page')
def api_create_markdown_page():
    return json_response({
        'uuid': uuid4().hex
    })


@api.put('/markdown/page/<uuid>')
def api_edit_markdown_page(uuid):
    return json_response({
        'uuid': uuid
    })


@api.delete('/markdown/page/<uuid>')
def api_delete_markdown_page(uuid):
    return json_response({
        'uuid': uuid
    })


@api.get('/markdown/page/<uuid>')
def api_get_markdown_page(uuid):
    return json_response({
        'uuid': uuid
    })


@api.get('/markdown/pages')
def api_list_markdown_pages(uuid):
    return json_response({
        'uuid': uuid
    })
