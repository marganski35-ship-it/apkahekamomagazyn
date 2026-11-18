// Ustawienia apki. Po uruchomieniu n8n wklej tu adresy webhooków.
// Puste adresy = tryb bez sieci: apka pamięta własne produkty, resztę wpisujesz ręcznie.
window.SPIS_CONFIG = {
  // Webhook wyszukiwania: GET <adres>?ean=5901234123457
  // Odpowiedź: { found, name, brand, model, source, candidates: [{ name, brand, model }] }
  lookupUrl: '',

  // Webhook zdjęć (wersja 2): POST multipart z polami sku, pallet, file. Odpowiedź: { url }
  photoUploadUrl: '',

  // Prosty klucz doklejany do adresu jako ?key=..., żeby webhook nie był otwarty dla każdego.
  // Musi być taki sam jak w węźle „Sprawdź zapytanie" w n8n.
  apiKey: '',

  // Po ilu milisekundach uznać wyszukiwanie za nieudane i pozwolić wpisać nazwę ręcznie.
  lookupTimeoutMs: 6000,

  // Ten sam kod odczytany ponownie w tym czasie jest ignorowany (przypadkowy podwójny skan).
  duplicateReadWindowMs: 2000
};
