# -*- coding: utf-8 -*-
import socket


def get_free_tcp_port():
    """returns a TCP port that can be used for listen in the host.
    """
    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp.bind(('', 0))
    host, port = tcp.getsockname()
    tcp.close()
    return port
