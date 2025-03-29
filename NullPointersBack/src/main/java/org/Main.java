package org;

import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) throws IOException {


        Scanner scanner = new Scanner(System.in);


        Interval interval = new Interval();

        // Prosimy użytkownika o wpisanie wiadomości
        System.out.print("Wpisz wiadomość: ");

        try {
            Socket socket = new Socket("127.0.0.1", 65432);  // Połączenie z serwerem
            PythonListener listener = new PythonListener(socket, interval);
            Thread listenerThread = new Thread(listener);  // Uruchomienie wątku nasłuchującego
            listenerThread.start();


            String message = scanner.nextLine();// Wczytanie całej linii tekstu
            listener.sendMessage(message);


        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}