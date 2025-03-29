import socket
import threading
import time

HOST = "127.0.0.1"
PORT = 65432

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen(1)
print("Serwer czeka na połączenie...")

conn, addr = server.accept()
print(f"Połączono z {addr}")

x = 5


def api(energy: int, power: int, foto: int):

    return ((energy + power + foto, 0), (24, 0))


def sender(set_time):
    while True:
        time.sleep(set_time)  # Czekaj przez określony czas
        response = (
            "Wiadomość co" + str(x) + "sekundy \n"
        )  # Możesz zmienić na inną wiadomość
        print(f"Wysyłam do Javy: {response}")
        conn.sendall(response.encode())  # Wysłać do Javy


def listener():
    while True:
        data = conn.recv(1024).decode()
        if not data:
            break

        print(f"Java: {data}")

        args = data.split(", ")

        Zapotrzebowanie = int(args[0])  # Pierwszy argument
        Moc = int(args[1])  # Drugi argument
        MocFotowoltaiki = int(args[2])  # Trzeci argument

        response = api(Zapotrzebowanie, Moc, MocFotowoltaiki)
        response = str(response) + "\n"

        print(response)

        conn.sendall(response.encode())


# thread1 = threading.Thread(target=sender, args=(x,), daemon=True)
thread2 = threading.Thread(target=listener, daemon=True)

# thread1.start()
thread2.start()

# thread1.join()
thread2.join()

conn.close()
server.close()
