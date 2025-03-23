from flask_login import UserMixin
import logging

class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data.get('_id', ''))
        self.email = user_data.get('email')
        self.first_name = user_data.get('first_name')
        self.last_name = user_data.get('last_name')
        self.account_type = user_data.get('account_type', 'candidate')
        if not self.account_type:
            logging.error("Account type is missing for user: %s", self.email)
            self.account_type = 'candidate'
        self.has_cv = 'cv_pdf' in user_data
        self._user_data = user_data

    def to_dict(self):
        return {
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'account_type': self.account_type,
            'has_cv': self.has_cv
        }
