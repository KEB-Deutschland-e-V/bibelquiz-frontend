# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## TODO

- welcome nicer -> icons, links

- neue Frage einbauen (xlsx)

- countdown entfernen

- Schwierigkeitsgrade: leicht 10 punkte max, mittel 20, schwer 30
- Neuer Grad: Gemischt (zufall)
- Immer Schwierigkeitsgrad anzeigen
- Highscore-Liste über alle. Schwierigkeit anzeigen
- Wenn keine Frage mehr in Grad -> eins höher
- Bei Schwer: Ende: Du hast alle Fragen beantwortet

- Lied Lars für Highscores und Start
- Gitarre-Only für Spiel
- Sounds finden (Start, Countdown, Klick auf Frage)
- Spiel Start: Das Spiel wird gestartet wie wäre hier so ne Art Fanfare? Trompetenmäßiger Einzug des Königs…so in der Art?
- Countdown: Während des Countdowns Countdown würde ich wegnehmen
- Frage Los: Zu Beginn einer Frage würde ich keinen extra Sound -einfach die Hintergrundmusik….
- Frage Falsch: gibt es da einen Sound der nicht ganz sooo "hart" klingt? :)
- Game Over: Wenn die Leben verbraucht sind kein Sound - gleich punkte anzeigen und Frage Eintrag zur Highscore
- Hintergrund-Musik Start: Läuft auf der Startseite und in den Highscores	Lied: die Bibel die ist Gottes Wort
- Hintergrund-Musik Spiel: Läuft während des SpielsLied: die Bibel die ist Gottes Wort - als Karaoke-Version - ohne Gesang…

- bei highscores müsste es auch einen button geben "nochmal spielen" - sehe ich jetzt nicht…

- game over wird ja nur ganz kurz angezeigt, würde ich ganz weglassen und einfach springen zum Punktestand und der Möglichkeit sich einzutragen…  alternativ:Spielende für Gameover

- TTS erstmal raus

- next question: from automatic to a button

- add question.bible to auswertung

- save questions in localstorage
- save difficulties in localstorage
- https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event
- if online, check a hash and try to reload them if needed
- if offline:
  - disable highscores
  - disable posting Stats and highscores

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
