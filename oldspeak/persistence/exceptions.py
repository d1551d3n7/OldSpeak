# -*- coding: utf-8 -*-

from oldspeak.lib.exceptions import OldSpeakException


class DatabaseException(OldSpeakException):
    pass


class MissingPersonalInfo(DatabaseException):
    pass


class UserSignupError(DatabaseException):
    pass


class MultipleEnginesSpecified(DatabaseException):
    pass


class EngineNotSpecified(DatabaseException):
    pass


class InvalidColumnName(DatabaseException):
    pass


class InvalidQueryModifier(DatabaseException):
    pass


class InvalidModelDeclaration(DatabaseException):
    pass


class RecordNotFound(DatabaseException):
    pass
