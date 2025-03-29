package org.pagecomunication;

import jakarta.annotation.PostConstruct;
import org.PythonListener;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.Socket;
import java.util.Map;

@Component
public class EnergyCommunicator {

    private final WebClient webClient = WebClient.create("http://localhost:3000");
    private PythonListener pythonListener;

    // Stała wartość - np. dzienne zużycie w jednostkach
    private static final int STANDARD_USAGE = 2137; //Wh

    @PostConstruct
    public void init() {
        try {
            Socket socket = new Socket("localhost", 5000);
            pythonListener = new PythonListener(socket);
            new Thread(pythonListener).start();

            fetchDataAndSendToPython();

        } catch (Exception e) {
            System.err.println("Błąd przy inicjalizacji połączenia z Pythonem:");
            e.printStackTrace();
        }
    }

    public void fetchDataAndSendToPython() {
        Mono<Map> overuseMono = getData("/overuse");
        Mono<Map> batteryMono = getData("/battery");
        Mono<Map> chargerMono = getData("/charger");
        Mono<Map> solarMono = getData("/solar");

        // Pobierz wszystko naraz
        Mono.zip(overuseMono, batteryMono, chargerMono, solarMono)
                .subscribe(tuple -> {
                    Map<String, Integer> overuse = tuple.getT1();
                    Map<String, Integer> battery = tuple.getT2();
                    Map<String, Integer> charger = tuple.getT3();
                    Map<String, Integer> solar = tuple.getT4();

                    int totalOveruse = sumMapValues(overuse);
                    int batteryPercentage = battery.getOrDefault("percentage", 0);
                    int chargerPower = charger.getOrDefault("power", 0);
                    int solarPower = solar.getOrDefault("power", 0);

                    int totalDemand = STANDARD_USAGE + totalOveruse;

                    // Możesz to rozszerzyć na tuple np. (zapotrzebowanie, bateria, ładowarka, solar)
                    String message = String.format("(%d, %d, %d, %d)", totalDemand, batteryPercentage, chargerPower, solarPower);
                    pythonListener.sendMessage(message);

                }, error -> {
                    System.err.println("Błąd pobierania danych: " + error.getMessage());
                });
    }

    private Mono<Map> getData(String uri) {
        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(Map.class);
    }

    private int sumMapValues(Map<String, Integer> map) {
        return map.values().stream().mapToInt(Integer::intValue).sum();
    }
}
