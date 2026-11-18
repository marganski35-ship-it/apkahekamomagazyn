# Spis palet

Apka do spisywania towaru z palet na iPhonie: skan EAN aparatem, wyszukanie produktu,
numer magazynowy na każdą pozycję, eksport do Excela. Działa w przeglądarce i da się ją
dodać do ekranu początkowego jak zwykłą aplikację.

## Co działa w tej wersji

- Wybór palety (np. P01), apka pamięta ostatnią.
- Skan EAN aparatem, wpisanie ręczne albo skaner ręczny podpięty jak klawiatura.
- Wyszukiwanie: najpierw własna pamięć produktów, potem webhook n8n z katalogiem Allegro.
- Poprawienie nazwy, marki i modelu przed zapisem. Produkt bez kodu wpisujesz ręcznie.
- Numery magazynowe P01-001, P01-002... Numer nie wraca do puli po usunięciu pozycji.
- Powtórzony EAN: zwiększ ilość, zapisz osobną sztukę albo anuluj. Tryb „seria" dodaje +1 bez pytania.
- Stany: A, A-, B, niekompletny, uszkodzony, do sprawdzenia, na części. Przy niekompletnym
  i uszkodzonym uwagi są obowiązkowe.
- Zdjęcia przy pozycji, zapisywane w telefonie. Wysyłka na Dysk Google wymaga drugiego webhooka (wersja 2).
- Eksport XLSX i CSV z wyborem kolumn i podsumowaniem. EAN zapisany jako tekst, zera z przodu zostają.
- Cofnięcie ostatniego skanu.
- Dane zostają w pamięci przeglądarki na danym telefonie. Eksportuj spis po każdej palecie.

## Uruchomienie

### 1. Hosting (aparat wymaga https)

Najprościej GitHub Pages:

1. Utwórz repozytorium na GitHubie i wgraj do niego zawartość tego folderu.
2. Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`.
3. Po minucie apka jest pod `https://<login>.github.io/<repozytorium>/`.

Na iPhonie otwórz ten adres w Safari → Udostępnij → „Do ekranu początkowego".

Test na komputerze: `npm start`, potem http://localhost:8080 (aparat działa na localhost bez https).

### 2. n8n: wyszukiwanie w Allegro

1. W n8n: Workflows → Import from File → `n8n/ean-lookup.workflow.json`.
2. Credentials → New → **OAuth2 API**:
   - Grant Type: Authorization Code
   - Authorization URL: `https://allegro.pl/auth/oauth/authorize`
   - Access Token URL: `https://allegro.pl/auth/oauth/token`
   - Client ID i Client Secret: z aplikacji zarejestrowanej na `apps.developer.allegro.pl`
   - Authentication: Header
   - Skopiuj „OAuth Redirect URL" z n8n i wklej go jako adres przekierowania w aplikacji Allegro.
   - Kliknij „Connect my account" i zaloguj się firmowym kontem Allegro.
3. W węźle „Allegro: katalog produktów" wybierz to połączenie.
4. W węźle „Sprawdź zapytanie" zmień `ZMIEN-MNIE` na własny klucz.
5. Włącz workflow (Active) i skopiuj **Production URL** z węzła Webhook.

### 3. Połączenie apki z n8n

W pliku `config.js`:

```js
lookupUrl: 'https://twoj-n8n/webhook/ean-lookup',
apiKey: 'ten-sam-klucz-co-w-n8n',
```

Po zmianie plików podnieś numer `VERSION` w `sw.js`, żeby telefony pobrały nową wersję.

Szybki test webhooka w przeglądarce:
`https://twoj-n8n/webhook/ean-lookup?ean=5901234123457&key=twoj-klucz`

## Gdy coś nie działa

- **Aparat się nie włącza:** adres musi zaczynać się od https, a Safari musi mieć zgodę na aparat.
- **Apka pisze „nie znaleziono", a webhook w przeglądarce działa:** to CORS. W węźle Webhook,
  w Options → Allowed Origins (CORS), wpisz adres apki albo `*`.
- **Allegro odpowiada 401:** połączenie OAuth wygasło, kliknij ponownie „Connect my account".
- **Kilka produktów na jeden EAN:** apka pokazuje do 5 dopasowań do wyboru.

## Struktura

```
index.html, css/app.css      wygląd
config.js                    adresy webhooków i klucz
js/core.js                   logika spisu (palety, SKU, duplikaty, CSV)
js/app.js                    ekran i okna
js/scanner.js                skan aparatem
js/lookup.js                 łańcuch źródeł danych
js/export.js                 XLSX i CSV
js/store.js                  zapis w telefonie
sw.js, manifest.webmanifest  instalacja na ekranie początkowym
n8n/                         workflow do importu
tests/                       testy: npm test
vendor/, licenses/           gotowe biblioteki i ich licencje
```

## Czego jeszcze nie ma

- Wysyłki zdjęć na Dysk Google i linków do nich w Excelu (apka ma już na to miejsce w `config.js`).
- GS1 jako drugiego źródła.
- Wspólnej bazy między telefonami: każdy telefon ma własny spis.
- Automatycznej ceny i etykiet do druku.

Workflow n8n nie był testowany na żywym koncie Allegro, bo wymaga waszego logowania.
