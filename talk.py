import argparse
import webview
import keyring
from pathlib import Path
import subprocess
import time

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


def spinup_pnpm():
    ui_dir = Path(__file__).parent / "potui"
    process = subprocess.Popen(["pnpm", "dev", "--port", "8080"], cwd=str(ui_dir))

    status = process.poll()
    if status is not None:
        raise Exception(f"pnpm failed to run {status}")

    time.sleep(2)

    return process



def main():
    args = argparse.ArgumentParser("OpenAI API talker")

    args.add_argument("--url", type=str, default=None)
    args.add_argument("--dev", action="store_true", default=False)

    result = args.parse_args()
    app = TalkApplication()
    api = AppAPI(app)

    worker = None

    if result.dev is True:
        worker = spinup_pnpm()
        win1 = webview.create_window("PyOpen Talk", url="http://127.0.0.1:8080", js_api=api)
    else:
        win1 = webview.create_window("PyOpen Talk", url=result.url, js_api=api)

    webview.start(debug=True)

    if worker is not None:
        worker.kill()
        time.sleep(2)



if __name__ == '__main__':
    main()