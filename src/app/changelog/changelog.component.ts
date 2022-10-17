import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
  changes = [
    "1.0.35;Linkm zum Apple App Store hinzugefügt",
    "1.0.34;Mehr Links deaktiviert;Startbild kleiner gemacht",
    "1.0.33;Mehr externe Links in den Apps deaktiviert.",
    "1.0.30;Externe Links werden bei iOS and Android Apps nicht mehr angezeigt",
    "1.0.29;Kontakt-Seite als Link hinzugefügt",
    "1.0.28;Version als Button deaktiviert",
    "1.0.27;Punktezähler wurde aktualisiert",
    "1.0.26;Sprachausgabe nun Standardmäßig deaktiviert",
    "1.0.24;Richtige Antwort wird nun immer angezeigt",
    "1.0.23;Punktezähler beim Neustart wiederherstellen",
    "1.0.20;Korrekter Plural für Punkte wird angezeigt;Punkte zählen nach der Antwort nicht mehr weiter;Fehlerbildschirm bei 'keine Fragen mehr' korrigiert.;Anzahl Fragen bei Schwierigkeitswechsel korrigiert.;Antworten werden nun gemischt.",
    "1.0.19;Korrektur kleiner Fehler wie der Anzeige der Fragenummer",
    "1.0.18;Seite 'Über diese App' ausgelagert",
    "1.0.17;Seite 'Changelog' (diese) hinzugefügt",
    "1.0.16;Reihenfolge der Antworten ist jetzt zufällig",
    "1.0.15;Beim Wechsel zu einem höheren Schwierigkeitsgrad kann das Spiel nun auch beendet werden",
    "1.0.14;Footer ist nun immer unten",
    "1.0.13;Nummer der akutellen Frage und Gesamtzahl der Fragen werden nun angezeigt",
    "1.0.12;Korrektur von Rechtschreibfehlern",
    "1.0.11;Bessere Darstellung auf Mobilgeräten",
    "1.0.10;Eingabe des Namens: Feld ist nun besser sichtbar",
    "1.0.9;Korrektur der Datenschutzhinweise",
    "1.0.8;Korrektur der Datenschutzhinweise",
    "1.0.7;Schrift-Dateien sind nun lokal verfügbar",
    "1.0.6;JSON-Dateien korrigiert",
    "1.0.5;Korrektur der Versions-Anzeige",
    "1.0.4;Versionsanzeige eingebaut",
    "1.0.3;Korrektur des Wechsels zu einem höheren Schwierigkeitsgrad",
    "1.0.2;Korrektur der Buttons 'Nochmal Spielen'",
    "1.0.1;Bibelverse werden nun bei jeder Antwort angezeigt",
    "1.0.0;Erster Release",
  ]
  
  changelog:any[] = []
  constructor() {
    for (const change of this.changes) {
      let c = change.split(";");
      this.changelog.push({
        version: c[0],
        changes: c.slice(1)
      })
    }
  }
  ngOnInit(): void {
  }

}
