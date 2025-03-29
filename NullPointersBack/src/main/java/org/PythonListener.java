package org;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class PythonListener implements Runnable {


    private BufferedReader reader;
    private PrintWriter writer;
    private boolean isConnected;

    public PythonListener(Socket socket) throws IOException {
        this.reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.writer = new PrintWriter(socket.getOutputStream(), true);
        this.isConnected = true;  // Początkowo połączenie jest aktywne

        System.out.println("Połączono z serwerem Python!");
    }

    @Override
    public void run() {
        while (true) {
            try {

                // Odbiór odpowiedzi od Pythona
                String response = reader.readLine();
                if (response != null) {
                    System.out.println("Python: " + response);  // Wyświetl odpowiedź Pythona
                }

            } catch (IOException e) {

                System.out.println("Błąd w odbieraniu wiadomości od Pythona.");
                e.printStackTrace();
                break;  // Zakończenie pętli w przypadku błędu
            }
        }
    }

    public void sendMessage(String message) {
        if (isConnected) {
            writer.println(message);  // Wysłać wiadomość do Pythona
            System.out.println("Java: " + message);  // Wyświetl wysłaną wiadomość w konsoli
        }

    }

}
