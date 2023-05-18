import argparse
import webview
import keyring

class TalkApplication:
    IDENTIFIER = "PY_OPEN_TALK"

    @classmethod
    def Start(cls):

        return cls()

    def __init__(self):
        self.key = self.get_key()


    #I dont want this as a @property because I don't want it calling the keyring every time debug looks at the class
    def get_key(self):
        return keyring.get_password(self.IDENTIFIER, "openai_user")

    def set_key(self, api_key):
        return keyring.set_password(self.IDENTIFIER, "openai_user", api_key)

    def has_key(self):
        return self.key is not None


class AppAPI:

    def __init__(self, app):
        self.app = app

    def info(self, msg):
        print("Remote says: ", msg)

    def has_key(self, call_id):
        # call front end via call_id
        pass

    def upate_config(self, config):
        print(f"Remote gave me: {config}")


def main():
    args = argparse.ArgumentParser("OpenAI API talker")

    args.add_argument("--url", type=str, default=None)

    result = args.parse_args()


    api = AppAPI()
    win1 = webview.create_window("PyOpen Talk", url=result.url, js_api=api)
    webview.start(debug=True)



if __name__ == '__main__':
    main()