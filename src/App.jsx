import { useState, useEffect, useRef } from "react";

const NAVY = "#0A2540";
const BLUE = "#0B5FA5";
const SKY = "#A8D8F0";
const WHITE = "#FFFFFF";
const GRAY = "#F3F5F7";
const MUTED = "#6B8099";
const TEXT = "#1A2B3C";
const GREEN = "#22C55E";
const RED = "#EF4444";
const PRICE_KG = 800;
const MOMO = ["01 96 28 18 86", "01 61 75 30 77"];
const ADMIN_PWD = "neolav2025";
const ADMIN_EMAILS = ["oloufemikaro@gmail.com", "carecelaourou77@gmail.com"];

const INIT_ORDERS = [
  { id: "NL-001", client: "Adjoavi K.", tel: "97001122", quartier: "Akpakpa", kg: 5, total: 4000, status: "done", date: "10/06/2025", heure: "09:30" },
  { id: "NL-002", client: "Rachid M.", tel: "96552233", quartier: "Cadjehoun", kg: 3, total: 2400, status: "transit", date: "12/06/2025", heure: "14:15" },
  { id: "NL-003", client: "Marie T.", tel: "95778899", quartier: "Sikecodji", kg: 7, total: 5600, status: "pending", date: "14/06/2025", heure: "11:00" },
  { id: "NL-004", client: "Kossi A.", tel: "94112233", quartier: "Godomey", kg: 4, total: 3200, status: "done", date: "15/06/2025", heure: "16:45" },
  { id: "NL-005", client: "Fatouma B.", tel: "90998877", quartier: "Calavi", kg: 6, total: 4800, status: "transit", date: "16/06/2025", heure: "10:20" },
];

const TESTIMONIALS = [
  { name: "Adjoavi K.", quartier: "Akpakpa", rating: 5, text: "Service impeccable ! Mon linge a ete collecte le matin et livre propre et plie le lendemain. Je recommande vivement.", avatar: "AK" },
  { name: "Rachid M.", quartier: "Cadjehoun", rating: 5, text: "Tres pratique pour mon emploi du temps charge. Le paiement par Mobile Money est super simple.", avatar: "RM" },
  { name: "Marie T.", quartier: "Sikecodji", rating: 4, text: "Bon rapport qualite-prix. Le linge sent vraiment bon apres le lavage. Livraison toujours dans les delais.", avatar: "MT" },
  { name: "Kossi A.", quartier: "Godomey", rating: 5, text: "Premiere fois que j'utilise un service comme ca a Cotonou. Tres professionnel, je vais continuer !", avatar: "KA" },
];

const FAQ_ITEMS = [
  { q: "Livrez-vous le dimanche ?", a: "Non, nous travaillons du lundi au samedi de 8h a 18h. Le dimanche nous sommes fermes pour permettre a notre equipe de se reposer." },
  { q: "Comment peser mon linge ?", a: "Pas besoin de balance ! Estimez simplement le volume lors de votre commande, et notre equipe pesera precisement votre linge a la collecte. Le prix final sera ajuste si necessaire." },
  { q: "Que faire si mon linge est abime ?", a: "Nous traitons votre linge avec le plus grand soin. En cas de probleme exceptionnel, contactez-nous immediatement au 01 96 28 18 86 et nous trouverons une solution rapide." },
  { q: "Puis-je payer a la livraison ?", a: "Oui ! En plus du Mobile Money, vous pouvez choisir de payer en especes directement a la collecte ou a la livraison de votre linge." },
  { q: "Quelle est la zone de livraison ?", a: "Nous livrons partout a Cotonou : Akpakpa, Cadjehoun, Sikecodji, Godomey, Calavi, Fidjrosse, Agla, Jericho et plus encore." },
  { q: "Combien de temps pour recuperer mon linge ?", a: "Votre linge est livre propre en 24h a 48h maximum apres la collecte, selon le volume et votre quartier." },
];

const BOT_RULES = [
  { keys: ["prix", "tarif", "cout", "coute", "combien", "cher"], reply: "Le lavage est a **800 FCFA/kg**. La livraison est **gratuite** partout a Cotonou. Profitez de notre offre de lancement : **-10%** sur les commandes de plus de 10kg ! 🧺" },
  { keys: ["recuperer", "recupere", "recup", "chercher", "venir", "domicile"], reply: "Vous n'avez rien a faire ! Nous venons **collecter votre linge chez vous** et nous vous le **livrons propre a domicile**. Pas besoin de vous deplacer. 🏠" },
  { keys: ["livraison", "livrer", "livree", "delai", "quand", "combien de temps"], reply: "Nous livrons **partout a Cotonou** en **24h a 48h maximum**. La livraison est **entierement gratuite** ! 🚚" },
  { keys: ["payer", "paiement", "paye", "argent", "mobile money", "mtn", "moov", "momo"], reply: "Nous acceptons le **MTN Mobile Money** ou le **paiement en especes a la collecte/livraison**. Numeros MoMo :\n\n📱 **01 96 28 18 86**\n📱 **01 61 75 30 77**\n\nVous pouvez aussi nous contacter sur **WhatsApp** a ces memes numeros ! 💛" },
  { keys: ["whatsapp", "whats app"], reply: "Oui ! Vous pouvez nous contacter sur **WhatsApp** au **01 96 28 18 86** ou **01 61 75 30 77** pour prendre RDV, commander ou payer. 💬" },
  { keys: ["numero", "contact", "appeler", "joindre", "telephone", "appel"], reply: "Vous pouvez nous joindre au :\n\n📞 **01 96 28 18 86**\n📞 **01 61 75 30 77**\n\nDisponibles du lundi au samedi de 8h a 18h, par appel ou WhatsApp. 😊" },
  { keys: ["commander", "commande", "comment commander", "passer commande"], reply: "C'est tres simple ! Cliquez sur le bouton **«Commander»** en haut de la page. Remplissez vos informations et confirmez. On s'occupe du reste ! 📦" },
  { keys: ["rdv", "rendez-vous", "rendez vous", "planifier", "reserver", "creneau"], reply: "Cliquez sur **«RDV»** en haut de la page pour choisir votre date et heure de collecte. Nous venons chez vous au creneau choisi ! 📅" },
  { keys: ["zone", "quartier", "secteur", "akpakpa", "cadjehoun", "godomey", "calavi", "cotonou", "ou livrez"], reply: "Nous livrons dans **tous les quartiers de Cotonou** : Akpakpa, Cadjehoun, Sikecodji, Godomey, Calavi, Fidjrosse, Agla, Jericho et partout ailleurs ! 📍" },
  { keys: ["drap", "draps", "chaussure", "chaussures", "vetement", "vetements", "laver quoi", "quel linge"], reply: "Nous lavons tous types de linge : vetements, draps, serviettes, uniformes. **800 FCFA/kg**, livraison gratuite ! 🧺" },
  { keys: ["horaire", "heure", "quand", "ouvert", "ferme", "disponible", "dimanche"], reply: "Nous sommes disponibles du **lundi au samedi de 8h a 18h**. Le dimanche nous sommes fermes. ⏰" },
  { keys: ["abime", "abimer", "probleme linge", "tache", "endommage"], reply: "Nous traitons votre linge avec le plus grand soin. En cas de probleme exceptionnel, contactez-nous immediatement au **01 96 28 18 86** et nous trouverons une solution rapide. 🙏" },
  { keys: ["peser", "balance", "poids exact"], reply: "Pas besoin de balance ! Estimez le volume lors de la commande, notre equipe pesera precisement a la collecte. ⚖️" },
  { keys: ["especes", "cash", "liquide", "pas en ligne"], reply: "Bien sur ! Vous pouvez payer en **especes directement a la collecte ou a la livraison** si vous preferez ne pas payer en ligne. 💵" },
  { keys: ["marche pas", "fonctionne pas", "probleme", "bug", "erreur", "clique rien", "rien ne"], reply: "Je suis desole pour ce souci ! Essayez de **rafraichir la page** (F5). Si le probleme persiste, appelez-nous au **01 96 28 18 86**. 📞" },
  { keys: ["bonjour", "bonsoir", "salut", "hello", "bjr", "bsr", "coucou"], reply: "Bonjour ! 👋 Je suis l'assistant virtuel de NEOLAV. Comment puis-je vous aider aujourd'hui ?" },
  { keys: ["merci", "super", "ok", "d'accord", "parfait", "genial", "bien"], reply: "Avec plaisir ! 😊 N'hesitez pas si vous avez d'autres questions. Nous sommes la pour vous ! 💧" },
  { keys: ["promo", "reduction", "offre", "remise"], reply: "🎉 Offre de lancement : **-10% de reduction** des 10kg de linge ! Et **-5%** pour moins de 10kg sur votre premiere commande. Profitez-en vite !" },
  { keys: ["kg", "kilogramme", "poids", "combien de kg", "calcul"], reply: "Le prix est de **800 FCFA par kilogramme**. Exemple : 5 kg = 4 000 FCFA, 10 kg = 8 000 FCFA (avec -10% = 7 200 FCFA). 🧺" },
  { keys: ["aide", "help", "information", "info", "question", "savoir"], reply: "Je peux vous aider sur :\n\n💰 **Prix** | 🚚 **Livraison** | 📱 **Paiement** | 📦 **Commander** | 📅 **RDV** | 📞 **Contact**\n\nQue voulez-vous savoir ?" },
];

function getBotReply(msg) {
  const m = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?!.,]/g, "");
  for (const rule of BOT_RULES) {
    for (const key of rule.keys) {
      if (m.includes(key)) return rule.reply;
    }
  }
  return "Je n'ai pas bien compris 🙏. Voici ce que je peux faire :\n\n💰 **Prix** | 🚚 **Livraison** | 📱 **Paiement** | 📦 **Commander** | 📅 **RDV** | 📞 **Contact**\n\nOu appelez-nous au **01 96 28 18 86** / **01 61 75 30 77** !";
}

function sendAdminNotification(type, data) {
  console.log("=== NOTIFICATION ADMIN ===");
  console.log("Type:", type);
  console.log("Destinataires:", ADMIN_EMAILS.join(", "));
  console.log("Donnees:", JSON.stringify(data, null, 2));
  console.log("===========================");
}

function calcDiscount(kg) {
  if (kg >= 10) return 0.10;
  return 0.05;
}

function Logo({ size = 36, color = BLUE }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 5C50 5 15 40 15 65C15 84 30.7 100 50 100C69.3 100 85 84 85 65C85 40 50 5 50 5Z" stroke={color} strokeWidth="6" fill="none" />
      <text x="50" y="78" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="800" fontSize="38" fill={color}>N</text>
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#FBB824" : "#E5E7EB", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

const s = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${GRAY}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, boxShadow: "0 2px 12px rgba(11,95,165,0.07)" },
  navLogo: { display: "flex", alignItems: "center", gap: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, color: BLUE, letterSpacing: 2 },
  navBtn: (solid) => ({ padding: "8px 18px", borderRadius: 8, border: solid ? "none" : `1.5px solid ${BLUE}`, background: solid ? BLUE : "transparent", color: solid ? WHITE : BLUE, fontFamily: "Poppins,sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer" }),
  section: { padding: "80px 24px", maxWidth: 1100, margin: "0 auto" },
  secLabel: { fontSize: 12, fontWeight: 600, color: BLUE, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 },
  secTitle: { fontFamily: "Montserrat,sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: NAVY, marginBottom: 48 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 },
  card: { background: WHITE, border: `1.5px solid ${GRAY}`, borderRadius: 20, padding: "32px 24px", textAlign: "center" },
  cardIcon: { width: 64, height: 64, background: `linear-gradient(135deg,${SKY},${BLUE})`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 },
  overlay: { position: "fixed", inset: 0, background: "rgba(10,37,64,0.6)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: WHITE, borderRadius: 24, padding: 40, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" },
  input: { width: "100%", padding: "12px 16px", border: `1.5px solid ${GRAY}`, borderRadius: 10, fontFamily: "Poppins,sans-serif", fontSize: 14, color: TEXT, outline: "none", boxSizing: "border-box" },
  label: { fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 6, display: "block" },
  submitBtn: { width: "100%", padding: 14, background: BLUE, color: WHITE, border: "none", borderRadius: 12, fontFamily: "Poppins,sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8 },
  closeBtn: { background: GRAY, color: MUTED, border: "none", borderRadius: 10, padding: "10px 20px", fontFamily: "Poppins,sans-serif", fontSize: 14, cursor: "pointer", marginRight: 12 },
  summaryBox: { background: GRAY, borderRadius: 12, padding: 16, margin: "20px 0" },
  momoBox: { background: `linear-gradient(135deg,${SKY},rgba(168,216,240,0.3))`, borderRadius: 12, padding: 20, margin: "16px 0", border: "1px solid rgba(11,95,165,0.2)", textAlign: "center" },
  adminBg: { minHeight: "100vh", background: NAVY, color: WHITE, padding: "80px 24px 40px" },
  kpiCard: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24 },
};

export default function App() {
  const [view, setView] = useState("home");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [showOrder, setShowOrder] = useState(false);
  const [showRdv, setShowRdv] = useState(false);
  const [showRdvSuccess, setShowRdvSuccess] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatBubble, setChatBubble] = useState(true);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [order, setOrder] = useState({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "", paiementType: "momo" });
  const [rdv, setRdv] = useState({ nom: "", tel: "", quartier: "", adresse: "", date: "", heure: "" });
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Bonjour ! 👋 Je suis l'assistant virtuel de NEOLAV. Comment puis-je vous aider ?" }]);
  const [chatIn, setChatIn] = useState("");
  const [typing, setTyping] = useState(false);
  const [exportRange, setExportRange] = useState("jour");
  const msgEnd = useRef(null);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => {
    const t = setTimeout(() => setChatBubble(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const discount = calcDiscount(order.kg);
  const subtotal = order.kg * PRICE_KG;
  const discountAmount = Math.round(subtotal * discount);
  const total = subtotal - discountAmount;

  function sendMsg(txt) {
    const m = txt || chatIn;
    if (!m.trim()) return;
    setMsgs(p => [...p, { from: "user", text: m }]);
    setChatIn("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { from: "bot", text: getBotReply(m) }]);
    }, 900);
  }

  function validateOrder() {
    if (!order.nom || !order.tel || !order.quartier || !order.date) { alert("Veuillez remplir tous les champs obligatoires *"); return; }
    setOrderStep(2);
  }

  function submitOrder() {
    const now = new Date();
    const n = {
      id: `NL-00${orders.length + 1}`,
      client: order.nom, tel: order.tel, quartier: order.quartier,
      kg: order.kg, total, status: "pending",
      date: now.toLocaleDateString("fr-FR"), heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };
    setOrders(p => [n, ...p]);
    sendAdminNotification("NOUVELLE COMMANDE", { ...order, total, id: n.id });
    setOrderStep(3);
  }

  function validateRdv() {
    if (!rdv.nom || !rdv.tel || !rdv.quartier || !rdv.date || !rdv.heure) { alert("Veuillez remplir tous les champs *"); return; }
    sendAdminNotification("NOUVEAU RDV", rdv);
    setShowRdv(false);
    setShowRdvSuccess(true);
  }

  function resetOrder() { setShowOrder(false); setOrderStep(1); setOrder({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "", paiementType: "momo" }); }

  function renderText(t) { return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>"); }

  function exportCSV() {
    const headers = ["ID", "Client", "Telephone", "Quartier", "Kg", "Total (FCFA)", "Date", "Heure", "Statut"];
    const rows = orders.map(o => [o.id, o.client, o.tel || "", o.quartier, o.kg, o.total, o.date, o.heure || "", o.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neolav_commandes_${exportRange}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const tCA = orders.reduce((s, o) => s + o.total, 0);
  const tKg = orders.reduce((s, o) => s + o.kg, 0);
  const done = orders.filter(o => o.status === "done").length;
  const visibleTestimonials = TESTIMONIALS.filter(t => t.rating >= 4);

  if (view === "admin" && !adminAuth) return (
    <div style={{ minHeight: "100vh", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Poppins,sans-serif" }}>
      <div style={{ ...s.modal, maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}><Logo size={48} /></div>
        <h2 style={{ textAlign: "center", fontFamily: "Montserrat,sans-serif", color: NAVY, marginBottom: 4 }}>Espace Admin</h2>
        <p style={{ textAlign: "center", color: MUTED, fontSize: 14, marginBottom: 24 }}>Acces reserve — NEOLAV</p>
        <label style={s.label}>Mot de passe</label>
        <input style={s.input} type="password" value={adminPwd} onChange={e => setAdminPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (adminPwd === ADMIN_PWD ? (setAdminAuth(true), setPwdErr(false)) : setPwdErr(true))}
          placeholder="Entrez le mot de passe" />
        {pwdErr && <p style={{ color: RED, fontSize: 13, marginTop: 6 }}>Mot de passe incorrect</p>}
        <button style={s.submitBtn} onClick={() => adminPwd === ADMIN_PWD ? (setAdminAuth(true), setPwdErr(false)) : setPwdErr(true)}>Acceder au tableau de bord</button>
        <button style={{ ...s.closeBtn, width: "100%", marginTop: 10, marginRight: 0 }} onClick={() => setView("home")}>Retour au site</button>
      </div>
    </div>
  );

  if (view === "admin" && adminAuth) {
    const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const weekData = [3, 5, 2, 7, 4, 6, 1];
    const maxWeek = Math.max(...weekData);

    return (
      <div style={{ ...s.adminBg, fontFamily: "Poppins,sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Logo size={40} color={SKY} />
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: WHITE, letterSpacing: 2 }}>NEOLAV</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Tableau de bord administrateur</div>
              </div>
            </div>
            <button style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}
              onClick={() => { setView("home"); setAdminAuth(false); setAdminPwd(""); }}>Retour au site</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {[["dashboard", "Dashboard"], ["commandes", "Commandes"], ["idees", "Idees"]].map(([t, l]) => (
              <button key={t} onClick={() => setAdminTab(t)}
                style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 500, background: adminTab === t ? BLUE : "rgba(255,255,255,0.06)", color: adminTab === t ? WHITE : "rgba(255,255,255,0.5)" }}>{l}</button>
            ))}
          </div>

          {adminTab === "dashboard" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 24 }}>
                {[[tCA.toLocaleString() + " FCFA", "Chiffre d'affaires", "En croissance", SKY], [orders.length, "Commandes totales", done + " livrees", GREEN], [tKg + " kg", "Kg traites", "Moy. " + (tKg / orders.length).toFixed(1) + " kg/cmd", "#FBB824"], [Math.round(tCA / orders.length).toLocaleString(), "Revenu moyen", "FCFA/commande", WHITE]].map(([v, l, sub, c]) => (
                  <div key={l} style={s.kpiCard}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{l}</div>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 12, color: GREEN, marginTop: 4 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Statut des commandes</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {[["En attente", orders.filter(o => o.status === "pending").length, "#FBB824"], ["En livraison", orders.filter(o => o.status === "transit").length, SKY], ["Livrees", done, GREEN]].map(([l, v, c]) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 24px", flex: 1, minWidth: 120, textAlign: "center" }}>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24 }}>
                <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Evolution de la semaine</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 160, padding: "0 8px" }}>
                  {weekDays.map((d, i) => (
                    <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: "100%", maxWidth: 40, height: `${(weekData[i] / maxWeek) * 120}px`, background: `linear-gradient(180deg, ${SKY}, ${BLUE})`, borderRadius: "8px 8px 0 0", transition: "height 0.3s" }} />
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{d}</div>
                      <div style={{ fontSize: 11, color: SKY, fontWeight: 600 }}>{weekData[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Nombre de commandes par jour cette semaine</div>
              </div>
            </>
          )}

          {adminTab === "commandes" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 700 }}>Toutes les commandes</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <select value={exportRange} onChange={e => setExportRange(e.target.value)}
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: WHITE, padding: "8px 12px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                    <option value="jour">Par jour</option>
                    <option value="mois">Par mois</option>
                    <option value="annee">Par annee</option>
                  </select>
                  <button onClick={exportCSV} style={{ background: BLUE, color: WHITE, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Exporter CSV</button>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden" }}>
                  <thead>
                    <tr>{["ID", "Client", "Telephone", "Quartier", "Kg", "Total", "Date", "Heure", "Statut", "Action"].map(h => (
                      <th key={h} style={{ background: "rgba(255,255,255,0.08)", padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)" }}>{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td style={{ padding: "12px 16px", color: SKY, fontWeight: 600, fontSize: 13 }}>{o.id}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>{o.client}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: SKY }}>{o.tel || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>{o.quartier}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>{o.kg} kg</td>
                        <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13 }}>{o.total.toLocaleString()} FCFA</td>
                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{o.date}</td>
                        <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{o.heure || "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: o.status === "pending" ? "rgba(251,184,36,0.15)" : o.status === "transit" ? "rgba(168,216,240,0.15)" : "rgba(34,197,94,0.15)", color: o.status === "pending" ? "#FBB824" : o.status === "transit" ? SKY : GREEN }}>
                            {o.status === "pending" ? "En attente" : o.status === "transit" ? "En livraison" : "Livre"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <select style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: WHITE, padding: "4px 8px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                            value={o.status} onChange={e => setOrders(p => p.map(x => x.id === o.id ? { ...x, status: e.target.value } : x))}>
                            <option value="pending">En attente</option>
                            <option value="transit">En livraison</option>
                            <option value="done">Livre</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {adminTab === "idees" && (
            <>
              <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Propositions d'amelioration</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
                {[["Programme fidelite", "Offrir 1 kg gratuit apres 10 kg laves."], ["Notifications WhatsApp", "Message automatique a chaque etape."], ["Avis clients", "Systeme de notation apres livraison."], ["Service Express 12h", "Option premium a 1200 FCFA/kg."], ["Rapport hebdomadaire", "Resume automatique chaque lundi."], ["Parrainage", "500 FCFA de reduction par filleul."]].map(([t, d]) => (
                  <div key={t} style={{ background: "rgba(168,216,240,0.06)", border: "1px solid rgba(168,216,240,0.15)", borderRadius: 14, padding: "16px 18px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: SKY, marginBottom: 6 }}>{t}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Poppins,sans-serif", color: TEXT }}>
      <nav style={s.nav}>
        <div style={s.navLogo}><Logo size={32} /><span>NEOLAV</span></div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={s.navBtn(false)} onClick={() => setShowRdv(true)}>RDV</button>
          <button style={s.navBtn(true)} onClick={() => { setShowOrder(true); setOrderStep(1); }}>Commander</button>
          <button style={{ ...s.navBtn(false), fontSize: 12 }} onClick={() => setView("admin")}>Admin</button>
        </div>
      </nav>

      {/* HERO avec image */}
      <section style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 55%, ${BLUE} 100%)`, paddingTop: 64, display: "flex", alignItems: "stretch", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 480px", padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "rgba(168,216,240,0.2)", border: "1px solid rgba(168,216,240,0.4)", color: SKY, padding: "6px 18px", borderRadius: 20, fontSize: 13, marginBottom: 24, letterSpacing: 1, width: "fit-content" }}>Service laverie a domicile — Cotonou</div>
            <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: WHITE, lineHeight: 1.15, marginBottom: 20 }}>Votre linge, <span style={{ color: SKY }}>notre signature</span> de perfection.</h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>Collecte a domicile · Lavage professionnel · Livraison en 24h/48h partout a Cotonou. Zero effort, linge impeccable.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
              <button style={s.btnPrimary || { background: WHITE, color: BLUE, padding: "14px 32px", borderRadius: 12, border: "none", fontWeight: 600, fontSize: 16, cursor: "pointer" }} onClick={() => { setShowOrder(true); setOrderStep(1); }}>Commander maintenant</button>
              <button style={{ background: "transparent", color: WHITE, padding: "14px 32px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.4)", fontFamily: "Poppins,sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" }} onClick={() => setShowRdv(true)}>Prendre un RDV</button>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              {[["24h", "Delai de livraison"], ["800F", "Par kilogramme"], ["100%", "Livraison gratuite"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 800, color: WHITE }}>{n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 480px", position: "relative", minHeight: 400 }}>
            <img src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=80" alt="Service laverie NEOLAV" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${BLUE} 0%, rgba(11,95,165,0.3) 25%, transparent 50%)` }} />
          </div>
        </div>
      </section>

      {/* BANNIERE PROMO */}
      <div style={{ background: `linear-gradient(90deg, #FBB824, #F4A223)`, padding: "16px 24px", textAlign: "center" }}>
        <p style={{ color: NAVY, fontWeight: 600, fontSize: 14, margin: 0 }}>
          🎉 <strong>Premiere commande :</strong> confiez-nous votre linge en gros et profitez de <strong>10% de reduction</strong> immediate ! (5% pour moins de 10 kg)
        </p>
      </div>

      {/* SERVICES */}
      <div style={{ background: WHITE, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Nos services</div>
          <div style={s.secTitle}>Simple, rapide, efficace.</div>
          <div style={s.grid}>
            {[["🧺", "Lavage Standard", "Lavage soigne avec collecte et livraison a domicile.", "800 FCFA", "/kg"], ["🚚", "Livraison Gratuite", "Nous venons chercher et ramenons votre linge propre.", "Gratuite", ""], ["⚡", "Service Express", "Votre linge collecte et livre en 24h chrono garanti.", "24h", " maxi"], ["🏠", "Collecte Domicile", "Planifiez votre collecte a l'heure qui vous convient.", "Flexible", ""]].map(([icon, name, desc, price, unit]) => (
              <div key={name} style={s.card}>
                <div style={s.cardIcon}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: NAVY, marginBottom: 8 }}>{name}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, marginBottom: 16 }}>{desc}</div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 800, color: BLUE }}>{price}<span style={{ fontSize: 13, color: MUTED, fontWeight: 400 }}>{unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GALERIE IMAGES */}
      <div style={{ background: GRAY, padding: "60px 0" }}>
        <div style={s.section}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {[
              "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500&q=80",
              "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&q=80",
              "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&q=80",
            ].map((url, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", height: 220 }}>
                <img src={url} alt="Linge propre NEOLAV" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <div style={{ background: WHITE, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Comment ca marche</div>
          <div style={s.secTitle}>4 etapes, c'est tout.</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[["1", "Commandez", "Remplissez le formulaire en 2 minutes"], ["2", "Collecte", "Nous venons chercher votre linge"], ["3", "Lavage", "Lavage professionnel soigne"], ["4", "Livraison", "Linge propre livre en 24h/48h"]].map(([n, t, d]) => (
              <div key={n} style={{ textAlign: "center", maxWidth: 200 }}>
                <div style={{ width: 52, height: 52, background: BLUE, color: WHITE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, margin: "0 auto 16px" }}>{n}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEMOIGNAGES */}
      <div style={{ background: GRAY, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Avis clients</div>
          <div style={s.secTitle}>Ce que disent nos clients.</div>
          <div style={s.grid}>
            {visibleTestimonials.map(t => (
              <div key={t.name} style={{ ...s.card, textAlign: "left" }}>
                <StarRating rating={t.rating} />
                <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, margin: "16px 0" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${SKY},${BLUE})`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: NAVY }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{t.quartier}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: WHITE, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Questions frequentes</div>
          <div style={s.secTitle}>Tout ce que vous devez savoir.</div>
          <div style={{ maxWidth: 700 }}>
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} item={item} />)}
          </div>
        </div>
      </div>

      {/* PAIEMENT */}
      <div style={{ background: GRAY, padding: "80px 0" }}>
        <div style={{ ...s.section, textAlign: "center" }}>
          <div style={s.secLabel}>Paiement</div>
          <div style={s.secTitle}>Mobile Money, simple et securise.</div>
          <div style={{ ...s.momoBox, maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💛</div>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: BLUE, marginBottom: 8 }}>MTN Mobile Money</div>
            <p style={{ color: MUTED, marginBottom: 20, fontSize: 14 }}>Payez facilement apres la collecte de votre linge</p>
            {MOMO.map(n => <div key={n} style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 6, letterSpacing: 2 }}>{n}</div>)}
            <p style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>Nom du beneficiaire : NEOLAV</p>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(11,95,165,0.15)" }}>
              <p style={{ fontSize: 13, color: BLUE, fontWeight: 600, margin: 0 }}>💬 Vous pouvez aussi nous contacter via WhatsApp sur ces memes numeros pour prise de RDV, commande et paiement !</p>
            </div>
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Vous preferez ne pas payer en ligne ? Vous pouvez aussi <strong style={{ color: NAVY }}>payer en especes a la collecte ou a la livraison</strong>.</p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "32px 24px", fontSize: 13 }}>
        <div style={{ marginBottom: 8 }}><strong style={{ color: WHITE }}>NEOLAV</strong> — Votre linge, notre signature de perfection.</div>
        <div>Cotonou, Benin &nbsp;·&nbsp; 01 96 28 18 86 / 01 61 75 30 77 &nbsp;·&nbsp; Livraison gratuite partout a Cotonou</div>
        <div style={{ marginTop: 12, fontSize: 11, opacity: .5 }}>2025 NEOLAV. Tous droits reserves.</div>
      </footer>

      {showOrder && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && resetOrder()}>
          <div style={s.modal}>
            {orderStep === 1 && (
              <>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Passer une commande</h2>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>Remplissez vos informations pour la collecte</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Nom complet *</label><input style={s.input} value={order.nom} onChange={e => setOrder({ ...order, nom: e.target.value })} placeholder="Ex: Adjoavi Kokou" /></div>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Telephone *</label><input style={s.input} value={order.tel} onChange={e => setOrder({ ...order, tel: e.target.value })} placeholder="Ex: 97 00 00 00" /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Quartier *</label><input style={s.input} value={order.quartier} onChange={e => setOrder({ ...order, quartier: e.target.value })} placeholder="Ex: Akpakpa" /></div>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Date de collecte *</label><input style={s.input} type="date" value={order.date} onChange={e => setOrder({ ...order, date: e.target.value })} /></div>
                </div>
                <div style={{ marginBottom: 16 }}><label style={s.label}>Adresse precise</label><input style={s.input} value={order.adresse} onChange={e => setOrder({ ...order, adresse: e.target.value })} placeholder="Ex: Rue du marche" /></div>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Poids estime : <strong style={{ color: BLUE }}>{order.kg} kg</strong></label>
                  <input type="range" min={1} max={30} value={order.kg} onChange={e => setOrder({ ...order, kg: Number(e.target.value) })} style={{ width: "100%", accentColor: BLUE }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: MUTED, marginTop: 4 }}><span>1 kg</span><span>30 kg</span></div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Mode de paiement *</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setOrder({ ...order, paiementType: "momo" })} style={{ flex: 1, padding: 12, borderRadius: 10, border: order.paiementType === "momo" ? `2px solid ${BLUE}` : `1.5px solid ${GRAY}`, background: order.paiementType === "momo" ? "rgba(11,95,165,0.05)" : WHITE, cursor: "pointer", fontSize: 13, fontWeight: 600, color: order.paiementType === "momo" ? BLUE : MUTED }}>💛 Mobile Money</button>
                    <button onClick={() => setOrder({ ...order, paiementType: "especes" })} style={{ flex: 1, padding: 12, borderRadius: 10, border: order.paiementType === "especes" ? `2px solid ${BLUE}` : `1.5px solid ${GRAY}`, background: order.paiementType === "especes" ? "rgba(11,95,165,0.05)" : WHITE, cursor: "pointer", fontSize: 13, fontWeight: 600, color: order.paiementType === "especes" ? BLUE : MUTED }}>💵 Especes</button>
                  </div>
                </div>
                <div style={s.summaryBox}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}><span>Lavage ({order.kg} kg x 800 FCFA)</span><span>{subtotal.toLocaleString()} FCFA</span></div>
                  {discountAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0", color: "#D97706" }}><span>Reduction (-{Math.round(discount * 100)}%)</span><span>-{discountAmount.toLocaleString()} FCFA</span></div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}><span>Livraison</span><span style={{ color: GREEN }}>Gratuite</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, color: BLUE, borderTop: "1px solid rgba(11,95,165,0.15)", marginTop: 8, paddingTop: 8 }}><span>Total a payer</span><span>{total.toLocaleString()} FCFA</span></div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button style={s.closeBtn} onClick={resetOrder}>Annuler</button>
                  <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={validateOrder}>Continuer</button>
                </div>
              </>
            )}
            {orderStep === 2 && order.paiementType === "momo" && (
              <>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Paiement Mobile Money</h2>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 20 }}>Envoyez le montant sur l'un de ces numeros MTN MoMo</p>
                <div style={{ ...s.summaryBox, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>Montant a envoyer</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 36, fontWeight: 800, color: BLUE }}>{total.toLocaleString()} FCFA</div>
                </div>
                <div style={s.momoBox}>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>Numeros MTN Mobile Money NEOLAV</div>
                  {MOMO.map(n => <div key={n} style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: NAVY, letterSpacing: 2, marginBottom: 4 }}>{n}</div>)}
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>Indiquez votre nom en reference du paiement</div>
                </div>
                <div style={{ marginBottom: 16 }}><label style={s.label}>Reference de transaction MoMo</label><input style={s.input} value={order.ref} onChange={e => setOrder({ ...order, ref: e.target.value })} placeholder="Ex: TXN123456789" /></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={s.closeBtn} onClick={() => setOrderStep(1)}>Retour</button>
                  <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={submitOrder}>Confirmer la commande</button>
                </div>
              </>
            )}
            {orderStep === 2 && order.paiementType === "especes" && (
              <>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Paiement en especes</h2>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 20 }}>Vous paierez directement a la collecte ou a la livraison</p>
                <div style={{ ...s.summaryBox, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>Montant a preparer</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 36, fontWeight: 800, color: BLUE }}>{total.toLocaleString()} FCFA</div>
                </div>
                <div style={{ background: "#FFF8E1", borderRadius: 12, padding: 16, marginBottom: 16, border: "1px solid #FBB82433" }}>
                  <p style={{ fontSize: 13, color: "#854F0B", margin: 0 }}>💵 Notre agent collectera le paiement en especes lors de la collecte ou de la livraison de votre linge, selon votre preference.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={s.closeBtn} onClick={() => setOrderStep(1)}>Retour</button>
                  <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={submitOrder}>Confirmer la commande</button>
                </div>
              </>
            )}
            {orderStep === 3 && (
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Commande confirmee !</h2>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>Merci <strong>{order.nom}</strong> ! Votre commande a bien ete recue.<br />Nous viendrons collecter votre linge le <strong>{order.date}</strong> a <strong>{order.quartier}</strong>.<br />Livraison en <strong>24h a 48h maximum</strong>.</p>
                <div style={{ ...s.momoBox, marginTop: 20 }}>
                  <div style={{ fontSize: 13, color: MUTED }}>{order.paiementType === "momo" ? <>Votre paiement de <strong style={{ color: BLUE }}>{total.toLocaleString()} FCFA</strong> est en cours de verification.</> : <>Vous paierez <strong style={{ color: BLUE }}>{total.toLocaleString()} FCFA</strong> en especes a la collecte/livraison.</>}</div>
                </div>
                <button style={s.submitBtn} onClick={resetOrder}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showRdv && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowRdv(false)}>
          <div style={s.modal}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Prendre un RDV</h2>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>Planifiez votre collecte a l'heure qui vous convient</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Nom complet *</label><input style={s.input} value={rdv.nom} onChange={e => setRdv({ ...rdv, nom: e.target.value })} placeholder="Votre nom" /></div>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Telephone *</label><input style={s.input} value={rdv.tel} onChange={e => setRdv({ ...rdv, tel: e.target.value })} placeholder="Votre numero" /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Quartier *</label><input style={s.input} value={rdv.quartier} onChange={e => setRdv({ ...rdv, quartier: e.target.value })} placeholder="Ex: Cadjehoun" /></div>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Adresse</label><input style={s.input} value={rdv.adresse} onChange={e => setRdv({ ...rdv, adresse: e.target.value })} placeholder="Adresse precise" /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Date *</label><input style={s.input} type="date" value={rdv.date} onChange={e => setRdv({ ...rdv, date: e.target.value })} /></div>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Heure *</label>
                <select style={s.input} value={rdv.heure} onChange={e => setRdv({ ...rdv, heure: e.target.value })}>
                  <option value="">Choisir</option>
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={s.closeBtn} onClick={() => setShowRdv(false)}>Annuler</button>
              <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={validateRdv}>Confirmer le RDV</button>
            </div>
          </div>
        </div>
      )}

      {showRdvSuccess && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowRdvSuccess(false)}>
          <div style={{ ...s.modal, maxWidth: 420, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📅</div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>RDV confirme !</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>Merci <strong>{rdv.nom}</strong> ! Votre RDV est planifie le <strong>{rdv.date}</strong> a <strong>{rdv.heure}</strong> — Quartier <strong>{rdv.quartier}</strong>.<br />Notre equipe vous contactera pour confirmer.</p>
            <button style={s.submitBtn} onClick={() => { setShowRdvSuccess(false); setRdv({ nom: "", tel: "", quartier: "", adresse: "", date: "", heure: "" }); }}>Fermer</button>
          </div>
        </div>
      )}

      {chatOpen && (
        <div style={{ position: "fixed", bottom: 100, right: 28, zIndex: 300, width: 340, maxHeight: 500, background: WHITE, borderRadius: 20, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", overflow: "hidden", border: `1px solid ${GRAY}` }}>
          <div style={{ background: `linear-gradient(135deg,${BLUE},${NAVY})`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💧</div>
            <div><div style={{ fontWeight: 600, fontSize: 14, color: WHITE }}>Assistant NEOLAV</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>En ligne</div></div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: WHITE }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", padding: "10px 13px", borderRadius: 12, fontSize: 13, lineHeight: 1.6, background: m.from === "bot" ? GRAY : BLUE, color: m.from === "bot" ? TEXT : WHITE, alignSelf: m.from === "bot" ? "flex-start" : "flex-end", borderBottomLeftRadius: m.from === "bot" ? 3 : 12, borderBottomRightRadius: m.from === "user" ? 3 : 12 }}
                dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
            ))}
            {typing && <div style={{ maxWidth: "85%", padding: "10px 13px", borderRadius: 12, fontSize: 13, background: GRAY, alignSelf: "flex-start", borderBottomLeftRadius: 3, color: MUTED }}>En train d'ecrire...</div>}
            <div ref={msgEnd} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "4px 14px 10px", background: WHITE }}>
            {["Prix", "Livraison", "Paiement", "RDV", "Contact"].map(c => (
              <button key={c} onClick={() => sendMsg(c)} style={{ background: "rgba(11,95,165,0.08)", color: BLUE, border: "1px solid rgba(11,95,165,0.2)", borderRadius: 20, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderTop: `1px solid ${GRAY}`, background: WHITE }}>
            <input style={{ flex: 1, border: `1.5px solid ${GRAY}`, borderRadius: 8, padding: "8px 12px", fontFamily: "Poppins,sans-serif", fontSize: 13, outline: "none" }}
              value={chatIn} onChange={e => setChatIn(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Posez votre question..." />
            <button onClick={() => sendMsg()} style={{ background: BLUE, color: WHITE, border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 14 }}>➤</button>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 300, display: "flex", alignItems: "center", gap: 10 }}>
        {chatBubble && !chatOpen && (
          <div onClick={() => { setChatOpen(true); setChatBubble(false); }} style={{ background: WHITE, padding: "10px 16px", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", fontSize: 13, color: TEXT, cursor: "pointer", maxWidth: 200, animation: "fadeIn 0.3s" }}>
            👋 Une question ? Je suis la pour vous aider !
          </div>
        )}
        <button style={{ width: 60, height: 60, background: BLUE, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(11,95,165,0.4)", fontSize: 24, flexShrink: 0 }}
          onClick={() => { setChatOpen(!chatOpen); setChatBubble(false); }}>
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${GRAY}`, padding: "16px 0" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: NAVY }}>{item.q}</span>
        <span style={{ fontSize: 18, color: BLUE, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
      </div>
      {open && <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginTop: 12 }}>{item.a}</p>}
    </div>
  );
}
