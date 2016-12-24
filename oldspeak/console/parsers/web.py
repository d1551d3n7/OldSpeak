import argparse

parser = argparse.ArgumentParser(
    prog='oldspeak web',
    description='runs the web dashboard')

parser.add_argument(
    '-H', '--host',
    help='the host where the http server should listen',
    default='localhost',
)
parser.add_argument(
    '-p', '--port',
    help='the port where the http server should listen',
    default=19842,
    type=int
)

parser.add_argument(
    '-l', '--loglevel',
    default='INFO',
)
