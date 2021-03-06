#!/usr/bin/env python
# -*- coding: utf-8 -*-

from sure import scenario
from oldspeak.persistence import connectors
from oldspeak.persistence.backends.sql import metadata, orm
from oldspeak.http.server import Application
from oldspeak.lib.clients import OldSpeakClient
from oldspeak.lib.networking import get_free_tcp_port


def prepare_server(context):
    host = '127.0.0.1'
    port = get_free_tcp_port()
    app = Application()
    server = app.wsgi(port=port, host=host)
    base_url = 'http://{host}:{port}'.format(**locals())
    context.app = app
    context.server = server
    context.server.start()
    context.client = OldSpeakClient(server.get_url())


def cleanup_server(context):
    context.server.stop()


def prepare_admin_scenario(context):
    context.user = orm.User.using(context.db.alias).create(
        name='Ciaus Vampstar',
        email='cs.thevamp@gmail.com'
    )


def prepare_subscriber_scenario(context):
    context.user = orm.User.using(context.db.alias).create(
        name='John Doe',
        email='johndoe@gmail.com'
    )


class db_connection(object):
    def __init__(self, alias):
        self.alias = alias
        self.engine = connectors.sql.get_pool(alias)
        self.connection = connectors.sql.get_connection(alias)


def prepare_sql(context):
    context.db = db_connection('test')
    metadata.drop_all(bind=context.db.engine)
    metadata.create_all(bind=context.db.engine)


def cleanup_sql(context):
    metadata.drop_all(bind=context.db.engine)


web_scenario = scenario([prepare_sql, prepare_server], [cleanup_server, cleanup_sql])
sql_scenario = scenario(prepare_sql, cleanup_sql)
api_admin_scenario = scenario([prepare_sql, prepare_server, prepare_admin_scenario], [cleanup_server, cleanup_sql])
api_user_scenario = scenario([prepare_sql, prepare_server, prepare_subscriber_scenario], [cleanup_server, cleanup_sql])


def cookies(response):
    return "".join(response.headers.getlist('Set-Cookie'))
