import sys
import os

sys.path.append(os.path.abspath(".."))  # Dodaje folder nadrzędny do ścieżki


from Model.for_api.api import api

args = sys.argv[1:]


if args:
    print(f"Otrzymane argumenty: {', '.join(args)}")
    print(int(args[0]) + int(args[1]) + int(args[2]))

    print(api(200, 50, 10))
else:
    print("Brak argumentów, zwracam domyślną wiadomość.")
