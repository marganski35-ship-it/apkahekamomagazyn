# Użyty kod i biblioteki

Wszystko na licencjach pozwalających na użycie komercyjne. Pełne teksty są w folderze `licenses/`.

| Co | Skąd | Licencja | Jak użyte |
|---|---|---|---|
| barcode-detector 3.2.4 | github.com/Sec-ant/barcode-detector | MIT | `vendor/barcode-detector.js`, odczyt kodów na iPhonie |
| zxing-wasm 3.1.7 | github.com/Sec-ant/zxing-wasm | MIT | `vendor/zxing_reader.wasm`, silnik dekodowania |
| idb-keyval 6.3.0 | github.com/jakearchibald/idb-keyval | Apache-2.0 | `vendor/idb-keyval.js`, zapis w telefonie |
| SheetJS xlsx 0.18.5 | github.com/SheetJS/sheetjs | Apache-2.0 | `vendor/xlsx.mini.min.js`, pliki Excela |
| georapbox/barcode-scanner | github.com/georapbox/barcode-scanner | MIT, © George Raptis | Wzorzec BarcodeDetector + polyfill (`js/scanner.js`), dźwięk i wibracja (`js/feedback.js`) |
| store-scan-app | github.com/Cvs1178433426/store-scan-app | MIT, © eigger | Układ łańcucha źródeł z pamięcią trafień (`js/lookup.js`) |
| mobile-barcode-inventory | github.com/FolderITDev/mobile-barcode-inventory | MIT, © Folder IT | Zasada „jeden odczyt, potem pauza" (`js/scanner.js`) |
