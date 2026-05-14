const translations = {
  de: {
    title: "🎟️ Pi Ticket Marketplace",
    login: "🔐 Login mit Pi",
    logout: "🚪 Logout",
    createTicketBtn: "➕ Ticket erstellen",
    favorites: "❤️ Favoriten",
    myTickets: "🎫 Meine Verkäufe",
    notLoggedIn: "Bitte zuerst einloggen!",
    category: "Kategorie",
    location: "Liga / Zusatzinfo",
    price: "Preis",
    quantity: "Anzahl / Verfügbarkeit",
    description: "Beschreibung",
    image: "Bild",
    buyBtn: "💸 Jetzt kaufen",
    buyLoginBtn: "🔒 Einloggen zum Kaufen",
    serviceFee: "Service Fee",
    total: "Gesamt",
    soldOut: "Ausverkauft",
    available: "Noch {n} verfügbar",
    selectQty: "Wie viele Tickets möchtest du kaufen?",
    success: "✅ Zahlung erfolgreich",
    cancel: "❌ Zahlung abgebrochen",
    back: "⬅ Zurück",
    removeFav: "❤️ Entfernen",
    noFavs: "Keine Favoriten",
    createTitle: "Ticket erstellen",
    saveBtn: "Ticket speichern",
    uploadError: "Upload Fehler",
    dbError: "Datenbank Fehler"
  },
  en: {
    title: "🎟️ Pi Ticket Marketplace",
    login: "🔐 Login with Pi",
    logout: "🚪 Logout",
    createTicketBtn: "➕ Create Ticket",
    favorites: "❤️ Favorites",
    myTickets: "🎫 My Sales",
    notLoggedIn: "Please login first!",
    category: "Category",
    location: "League / Additional Info",
    price: "Price",
    quantity: "Quantity / Availability",
    description: "Description",
    image: "Image",
    buyBtn: "💸 Buy Now",
    buyLoginBtn: "🔒 Login to Buy",
    serviceFee: "Service Fee",
    total: "Total",
    soldOut: "Sold Out",
    available: "{n} available",
    selectQty: "How many tickets do you want to buy?",
    success: "✅ Payment successful",
    cancel: "❌ Payment cancelled",
    back: "⬅ Back",
    removeFav: "❤️ Remove",
    noFavs: "No favorites",
    createTitle: "Create Ticket",
    saveBtn: "Save Ticket",
    uploadError: "Upload Error",
    dbError: "Database Error"
  }
};

let currentLang = localStorage.getItem("pi_lang") || "de";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("pi_lang", lang);
  applyTranslations();
}

function t(key, replacements = {}) {
  let text = translations[currentLang][key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[currentLang][key];
      } else {
        el.innerHTML = translations[currentLang][key];
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
});
