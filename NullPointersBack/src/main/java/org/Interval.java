package org;

public class Interval {
    public int start_hour, start_minute, stop_hour, stop_minute;

    public void parseInterval(String input) {
        // Usunięcie nawiasów z początku i końca
        input = input.substring(1, input.length() - 1);

        // Podział na dwie pary: "(0, 0)" i "(24, 0)"
        String[] pairs = input.split("\\), \\(");

        // Parsowanie pierwszej pary
        String[] pair1 = pairs[0].substring(1).split(", ");  // "(0, 0)" -> ["0", "0"]
        start_hour = Integer.parseInt(pair1[0]);
        start_minute = Integer.parseInt(pair1[1]);

        // Parsowanie drugiej pary
        String[] pair2 = pairs[1].substring(0, pairs[1].length() - 1).split(", ");  // "(24, 0)" -> ["24", "0"]
        stop_hour = Integer.parseInt(pair2[0]);
        stop_minute = Integer.parseInt(pair2[1]);

    }


    public void printInterval() {
        System.out.println("Start: " + start_hour + ":" + start_minute);
        System.out.println("Stop: " + stop_hour + ":" + stop_minute);
    }


}
