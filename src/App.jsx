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

const INIT_ORDERS = [
  { id: "NL-001", client: "Adjoavi K.", quartier: "Akpakpa", kg: 5, total: 4000, status: "done", date: "10/06/2025" },
  { id: "NL-002", client: "Rachid M.", quartier: "Cadjehoun", kg: 3, total: 2400, status: "transit", date: "12/06/2025" },
  { id: "NL-003", client: "Marie T.", quartier: "Sikècodji", kg: 7, total: 5600, status: "pending", date: "14/06/2025" },
  { id: "NL-004", client: "Kossi A.", quartier: "Godomey", kg: 4, total: 3200, status: "done", date: "15/06/2025" },
  { id: "NL-005", client: "Fatouma B.", quartier: "Calavi", kg: 6, total: 4800, status: "transit", date: "16/06/2025" },
];

const BOT = {
  "prix": "Le lavage est à **800 FCFA/kg** avec livraison gratuite partout à Cotonou. 🧺",
  "tarif": "Le lavage est à **800 FCFA/kg** avec livraison gratuite partout à Cotonou. 🧺",
  "combien": "Le prix est de **800 FCFA par kilogramme**. La livraison est **gratuite**. 😊",
  "livraison": "Nous livrons **partout à Cotonou** en **24h maximum 48h**. La livraison est **gratuite** ! 🚚",
  "délai": "Votre linge est collecté et retourné propre en **24h maximum 48h**. ⏱",
  "paiement": "Nous acceptons le **MTN Mobile Money**. Les numéros sont : **01 96 28 18 86** et **01 61 75 30 77**. 📱",
  "mobile money": "Envoyez votre paiement sur **01 96 28 18 86** ou **01 61 75 30 77** (MTN MoMo). 💛",
  "mtn": "Notre numéro MTN Mobile Money est **01 96 28 18 86** ou **01 61 75 30 77**. 💛",
  "commande": "Pour passer commande, cliquez sur le bouton **«Commander»** en haut de la page. C'est rapide ! 📦",
  "rdv": "Vous pouvez prendre un RDV de collecte depuis le bouton **«Prendre un RDV»**. Nous venons chez vous ! 🏠",
  "zone": "Nous couvrons **tout Cotonou**. Donnez-nous simplement votre quartier lors de la commande. 📍",
  "service": "Nous proposons le **lavage au kg** avec collecte et livraison à domicile. 800 FCFA/kg, livraison gratuite ! ✨",
  "bonjour": "Bonjour ! 👋 Je suis l'assistant NÉOLAV. Comment puis-je vous aider aujourd'hui ?",
  "salut": "Salut ! 😊 Je suis là pour vous aider. Posez-moi vos questions sur nos services NÉOLAV !",
  "merci": "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions.",
  "heure": "Nous collectons de **8h à 18h** du lundi au samedi. Choisissez votre heure lors de la prise de RDV. ⏰",
  "weekend": "Oui, nous travaillons le **samedi** ! La collecte est disponible de 8h à 14h le samedi. 📅",
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  for (const [k, v] of Object.entries(BOT)) {
    if (m.includes(k)) return v;
  }
  return "Je n'ai pas bien compris 🙏. Vous pouvez me demander : le **prix**, la **livraison**, le **paiement**, ou comment **passer commande**.";
}

function Logo({ size = 36, color = BLUE }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 5C50 5 15 40 15 65C15 84 30.7 100 50 100C69.3 100 85 84 85 65C85 40 50 5 50 5Z"
        stroke={color} strokeWidth="6" fill="none" />
      <text x="50" y="78" textAnchor="middle" fontFamily="Montserrat,sans-serif"
        fontWeight="800" fontSize="38" fill={color}>N</text>
    </svg>
  );
}

const s = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${GRAY}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, boxShadow: "0 2px 12px rgba(11,95,165,0.07)" },
  navLogo: { display: "flex", alignItems: "center", gap: 10, fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, color: BLUE, letterSpacing: 2 },
  navBtn: (solid) => ({ padding: "8px 18px", borderRadius: 8, border: solid ? "none" : `1.5px solid ${BLUE}`, background: solid ? BLUE : "transparent", color: solid ? WHITE : BLUE, fontFamily: "Poppins,sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer" }),
  hero: { minHeight: "100vh", background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 60%, ${SKY} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px", position: "relative", overflow: "hidden" },
  heroContent: { textAlign: "center", zIndex: 1, maxWidth: 680 },
  badge: { display: "inline-block", background: "rgba(168,216,240,0.2)", border: "1px solid rgba(168,216,240,0.4)", color: SKY, padding: "6px 18px", borderRadius: 20, fontSize: 13, marginBottom: 24, letterSpacing: 1 },
  h1: { fontFamily: "Montserrat,sans-serif", fontSize: "clamp(32px,6vw,60px)", fontWeight: 800, color: WHITE, lineHeight: 1.1, marginBottom: 20 },
  heroP: { color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.7, marginBottom: 40 },
  heroCta: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: WHITE, color: BLUE, padding: "14px 32px", borderRadius: 12, border: "none", fontFamily: "Poppins,sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer" },
  btnSecondary: { background: "transparent", color: WHITE, padding: "14px 32px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.4)", fontFamily: "Poppins,sans-serif", fontWeight: 500, fontSize: 16, cursor: "pointer" },
  stats: { display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" },
  statNum: { fontFamily: "Montserrat,sans-serif", fontSize: 32, fontWeight: 800, color: WHITE },
  statLabel: { fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 },
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
  chatFab: { position: "fixed", bottom: 28, right: 28, zIndex: 300, width: 60, height: 60, background: BLUE, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(11,95,165,0.4)", fontSize: 24 },
  chatWindow: { position: "fixed", bottom: 100, right: 28, zIndex: 300, width: 340, maxHeight: 480, background: WHITE, borderRadius: 20, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", overflow: "hidden", border: `1px solid ${GRAY}` },
  adminBg: { minHeight: "100vh", background: NAVY, color: WHITE, padding: "80px 24px 40px" },
  kpiCard: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24 },
};

export default function App() {
  const [view, setView] = useState("home");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [showOrder, setShowOrder] = useState(false);
  const [showRdv, setShowRdv] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [order, setOrder] = useState({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "" });
  const [rdv, setRdv] = useState({ nom: "", tel: "", quartier: "", adresse: "", date: "", heure: "" });
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Bonjour ! 👋 Je suis l'assistant NÉOLAV. Comment puis-je vous aider ?" }]);
  const [chatIn, setChatIn] = useState("");
  const msgEnd = useRef(null);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const total = order.kg * PRICE_KG;

  function sendMsg(txt) {
    const m = txt || chatIn;
    if (!m.trim()) return;
    setMsgs(p => [...p, { from: "user", text: m }]);
    setChatIn("");
    setTimeout(() => setMsgs(p => [...p, { from: "bot", text: getBotReply(m) }]), 700);
  }

  function submitOrder() {
    const n = { id: `NL-00${orders.length + 1}`, client: order.nom, quartier: order.quartier, kg: order.kg, total, status: "pending", date: new Date().toLocaleDateString("fr-FR") };
    setOrders(p => [n, ...p]);
    setOrderStep(3);
  }

  function validateOrder() {
    if (!order.nom || !order.tel || !order.quartier || !order.date) { alert("Veuillez remplir tous les champs obligatoires *"); return; }
    setOrderStep(2);
  }

  function validateRdv() {
    if (!rdv.nom || !rdv.tel || !rdv.quartier || !rdv.date || !rdv.heure) { alert("Veuillez remplir tous les champs *"); return; }
    setShowRdv(false);
    alert(`✅ RDV confirmé pour ${rdv.nom} le ${rdv.date} à ${rdv.heure} — Quartier ${rdv.quartier}. Nous vous contacterons pour confirmer !`);
    setRdv({ nom: "", tel: "", quartier: "", adresse: "", date: "", heure: "" });
  }

  function resetOrder() { setShowOrder(false); setOrderStep(1); setOrder({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "" }); }

  const tCA = orders.reduce((s, o) => s + o.total, 0);
  const tKg = orders.reduce((s, o) => s + o.kg, 0);
  const done = orders.filter(o => o.status === "done").length;

  function renderText(t) {
    return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }

  if (view === "admin" && !adminAuth) return (
    <div style={{ minHeight: "100vh", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Poppins,sans-serif" }}>
      <div style={{ ...s.modal, maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}><Logo size={48} /></div>
        <h2 style={{ textAlign: "center", fontFamily: "Montserrat,sans-serif", color: NAVY, marginBottom: 4 }}>Espace Admin</h2>
        <p style={{ textAlign: "center", color: MUTED, fontSize: 14, marginBottom: 24 }}>Accès réservé — NÉOLAV</p>
        <label style={s.label}>Mot de passe</label>
        <input style={s.input} type="password" value={adminPwd}
          onChange={e => setAdminPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (adminPwd === ADMIN_PWD ? (setAdminAuth(true), setPwdErr(false)) : setPwdErr(true))}
          placeholder="Entrez le mot de passe" />
        {pwdErr && <p style={{ color: RED, fontSize: 13, marginTop: 6 }}>Mot de passe incorrect</p>}
        <button style={s.submitBtn} onClick={() => adminPwd === ADMIN_PWD ? (setAdminAuth(true), setPwdErr(false)) : setPwdErr(true)}>Accéder au tableau de bord</button>
        <button style={{ ...s.closeBtn, width: "100%", marginTop: 10, marginRight: 0 }} onClick={() => setView("home")}>← Retour au site</button>
      </div>
    </div>
  );

  if (view === "admin" && adminAuth) return (
    <div style={{ ...s.adminBg, fontFamily: "Poppins,sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={40} color={SKY} />
            <div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: WHITE, letterSpacing: 2 }}>NÉOLAV</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Tableau de bord administrateur</div>
            </div>
          </div>
          <button style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}
            onClick={() => { setView("home"); setAdminAuth(false); setAdminPwd(""); }}>← Retour au site</button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {[["dashboard", "📊 Dashboard"], ["commandes", "📦 Commandes"], ["idées", "💡 Idées"]].map(([t, l]) => (
            <button key={t} onClick={() => setAdminTab(t)}
              style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 500, background: adminTab === t ? BLUE : "rgba(255,255,255,0.06)", color: adminTab === t ? WHITE : "rgba(255,255,255,0.5)" }}>{l}</button>
          ))}
        </div>

        {adminTab === "dashboard" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 32 }}>
              {[[`${tCA.toLocaleString()} FCFA`, "Chiffre d'affaires", "↑ En croissance", SKY], [orders.length, "Commandes totales", `${done} livrées`, GREEN], [`${tKg} kg`, "Kg traités", `Moy. ${(tKg / orders.length).toFixed(1)} kg/cmd`, "#FBB824"], [Math.round(tCA / orders.length).toLocaleString(), "Revenu moyen", "FCFA/commande", WHITE]].map(([v, l, sub, c]) => (
                <div key={l} style={s.kpiCard}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{l}</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: 12, color: GREEN, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24 }}>
              <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Statut des commandes</p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[["En attente", orders.filter(o => o.status === "pending").length, "#FBB824"], ["En livraison", orders.filter(o => o.status === "transit").length, SKY], ["Livrées", done, GREEN]].map(([l, v, c]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 24px", flex: 1, minWidth: 120, textAlign: "center" }}>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {adminTab === "commandes" && (
          <>
            <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Toutes les commandes</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden" }}>
                <thead>
                  <tr>
                    {["ID", "Client", "Quartier", "Kg", "Total", "Date", "Statut", "Action"].map(h => (
                      <th key={h} style={{ background: "rgba(255,255,255,0.08)", padding: "14px 20px", textAlign: "left", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.5)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ padding: "14px 20px", color: SKY, fontWeight: 600 }}>{o.id}</td>
                      <td style={{ padding: "14px 20px" }}>{o.client}</td>
                      <td style={{ padding: "14px 20px" }}>{o.quartier}</td>
                      <td style={{ padding: "14px 20px" }}>{o.kg} kg</td>
                      <td style={{ padding: "14px 20px", fontWeight: 600 }}>{o.total.toLocaleString()} FCFA</td>
                      <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.5)" }}>{o.date}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: o.status === "pending" ? "rgba(251,184,36,0.15)" : o.status === "transit" ? "rgba(168,216,240,0.15)" : "rgba(34,197,94,0.15)", color: o.status === "pending" ? "#FBB824" : o.status === "transit" ? SKY : GREEN }}>
                          {o.status === "pending" ? "En attente" : o.status === "transit" ? "En livraison" : "Livré ✓"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <select style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: WHITE, padding: "4px 8px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                          value={o.status} onChange={e => setOrders(p => p.map(x => x.id === o.id ? { ...x, status: e.target.value } : x))}>
                          <option value="pending">En attente</option>
                          <option value="transit">En livraison</option>
                          <option value="done">Livré</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {adminTab === "idées" && (
          <>
            <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>💡 Propositions d'amélioration</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
              {[["🎯 Programme fidélité", "Offrir 1 kg gratuit après 10 kg lavés. Augmente la rétention client et incite à commander plus régulièrement."], ["📲 Notifications WhatsApp", "Envoyer un message automatique au client quand son linge est collecté, lavé et livré. Réduit les appels entrants."], ["⭐ Avis clients", "Ajouter un système de notation après livraison. Les bons avis rassurent les nouveaux clients."], ["🚀 Service Express 12h", "Proposer une option Express à 1 200 FCFA/kg pour les clients pressés. Nouvelle source de revenus premium."], ["📊 Rapport hebdomadaire", "Générer chaque lundi un résumé automatique de l'activité de la semaine passée."], ["🎁 Parrainage", "Offrir 500 FCFA de réduction pour chaque client parrainé. Acquisition client à moindre coût."]].map(([t, d]) => (
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

  return (
    <div style={{ fontFamily: "Poppins,sans-serif", color: TEXT }}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo}><Logo size={32} /><span>NÉOLAV</span></div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={s.navBtn(false)} onClick={() => setShowRdv(true)}>📅 RDV</button>
          <button style={s.navBtn(true)} onClick={() => { setShowOrder(true); setOrderStep(1); }}>Commander</button>
          <button style={{ ...s.navBtn(false), fontSize: 12 }} onClick={() => setView("admin")}>Admin</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroContent}>
          <div style={s.badge}>✨ Service laverie à domicile — Cotonou</div>
          <h1 style={s.h1}>Votre linge, <span style={{ color: SKY }}>notre signature</span> de perfection.</h1>
          <p style={s.heroP}>Collecte à domicile · Lavage professionnel · Livraison en 24h/48h partout à Cotonou. Zéro effort, linge impeccable.</p>
          <div style={s.heroCta}>
            <button style={s.btnPrimary} onClick={() => { setShowOrder(true); setOrderStep(1); }}>🧺 Commander maintenant</button>
            <button style={s.btnSecondary} onClick={() => setShowRdv(true)}>📅 Prendre un RDV</button>
          </div>
          <div style={s.stats}>
            {[["24h", "Délai de livraison"], ["800F", "Par kilogramme"], ["100%", "Livraison gratuite"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={s.statNum}>{n}</div>
                <div style={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <div style={{ background: WHITE, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Nos services</div>
          <div style={s.secTitle}>Simple, rapide, efficace.</div>
          <div style={s.grid}>
            {[["🧺", "Lavage Standard", "Lavage soigné avec collecte et livraison à domicile.", "800 FCFA", "/kg"], ["🚚", "Livraison Gratuite", "Nous venons chercher et ramenons votre linge propre et plié.", "Gratuite", ""], ["⚡", "Service Express", "Votre linge collecté et livré en 24h chrono garanti.", "24h", " maxi"], ["🏠", "Collecte Domicile", "Planifiez votre collecte à l'heure qui vous convient.", "Flexible", ""]].map(([icon, name, desc, price, unit]) => (
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

      {/* COMMENT ÇA MARCHE */}
      <div style={{ background: GRAY, padding: "80px 0" }}>
        <div style={s.section}>
          <div style={s.secLabel}>Comment ça marche</div>
          <div style={s.secTitle}>4 étapes, c'est tout.</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[["1", "Commandez", "Remplissez le formulaire en ligne en 2 minutes"], ["2", "Collecte", "Nous venons chercher votre linge à domicile"], ["3", "Lavage", "Lavage professionnel dans nos installations"], ["4", "Livraison", "Linge propre livré chez vous en 24h/48h"]].map(([n, t, d]) => (
              <div key={n} style={{ textAlign: "center", maxWidth: 200 }}>
                <div style={{ width: 52, height: 52, background: BLUE, color: WHITE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, margin: "0 auto 16px" }}>{n}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAIEMENT */}
      <div style={{ background: WHITE, padding: "80px 0" }}>
        <div style={{ ...s.section, textAlign: "center" }}>
          <div style={s.secLabel}>Paiement</div>
          <div style={s.secTitle}>Mobile Money, simple et sécurisé.</div>
          <div style={{ ...s.momoBox, maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💛</div>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: BLUE, marginBottom: 8 }}>MTN Mobile Money</div>
            <p style={{ color: MUTED, marginBottom: 20, fontSize: 14 }}>Payez facilement après la collecte de votre linge</p>
            {MOMO.map(n => <div key={n} style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 6, letterSpacing: 2 }}>{n}</div>)}
            <p style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>Nom du bénéficiaire : NÉOLAV</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "32px 24px", fontSize: 13 }}>
        <div style={{ marginBottom: 8 }}><strong style={{ color: WHITE }}>NÉOLAV</strong> — Votre linge, notre signature de perfection.</div>
        <div>📍 Cotonou, Bénin &nbsp;·&nbsp; 📱 01 96 28 18 86 / 01 61 75 30 77 &nbsp;·&nbsp; Livraison gratuite partout à Cotonou</div>
        <div style={{ marginTop: 12, fontSize: 11, opacity: .5 }}>© 2025 NÉOLAV. Tous droits réservés.</div>
      </footer>

      {/* MODAL COMMANDE */}
      {showOrder && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && resetOrder()}>
          <div style={s.modal}>
            {orderStep === 1 && (
              <>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>🧺 Passer une commande</h2>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>Remplissez vos informations pour la collecte</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Nom complet *</label><input style={s.input} value={order.nom} onChange={e => setOrder({ ...order, nom: e.target.value })} placeholder="Ex: Adjoavi Kokou" /></div>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Téléphone *</label><input style={s.input} value={order.tel} onChange={e => setOrder({ ...order, tel: e.target.value })} placeholder="Ex: 97 00 00 00" /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Quartier *</label><input style={s.input} value={order.quartier} onChange={e => setOrder({ ...order, quartier: e.target.value })} placeholder="Ex: Akpakpa" /></div>
                  <div style={{ marginBottom: 16 }}><label style={s.label}>Date de collecte *</label><input style={s.input} type="date" value={order.date} onChange={e => setOrder({ ...order, date: e.target.value })} /></div>
                </div>
                <div style={{ marginBottom: 16 }}><label style={s.label}>Adresse précise</label><input style={s.input} value={order.adresse} onChange={e => setOrder({ ...order, adresse: e.target.value })} placeholder="Ex: Rue du marché, maison bleue" /></div>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Poids estimé : <strong style={{ color: BLUE }}>{order.kg} kg</strong></label>
                  <input type="range" min={1} max={30} value={order.kg} onChange={e => setOrder({ ...order, kg: Number(e.target.value) })} style={{ width: "100%", accentColor: BLUE }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: MUTED, marginTop: 4 }}><span>1 kg</span><span>30 kg</span></div>
                </div>
                <div style={s.summaryBox}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}><span>Lavage ({order.kg} kg × 800 FCFA)</span><span>{total.toLocaleString()} FCFA</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}><span>Livraison</span><span style={{ color: GREEN }}>Gratuite ✓</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, color: BLUE, borderTop: "1px solid rgba(11,95,165,0.15)", marginTop: 8, paddingTop: 8 }}><span>Total à payer</span><span>{total.toLocaleString()} FCFA</span></div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button style={s.closeBtn} onClick={resetOrder}>Annuler</button>
                  <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={validateOrder}>Continuer →</button>
                </div>
              </>
            )}
            {orderStep === 2 && (
              <>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>💛 Paiement Mobile Money</h2>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 20 }}>Envoyez le montant sur l'un de ces numéros MTN MoMo</p>
                <div style={{ ...s.summaryBox, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>Montant à envoyer</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 36, fontWeight: 800, color: BLUE }}>{total.toLocaleString()} FCFA</div>
                </div>
                <div style={s.momoBox}>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>📱 Numéros MTN Mobile Money NÉOLAV</div>
                  {MOMO.map(n => <div key={n} style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: NAVY, letterSpacing: 2, marginBottom: 4 }}>{n}</div>)}
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>Indiquez votre nom en référence du paiement</div>
                </div>
                <div style={{ marginBottom: 16 }}><label style={s.label}>Référence de transaction MoMo</label><input style={s.input} value={order.ref} onChange={e => setOrder({ ...order, ref: e.target.value })} placeholder="Ex: TXN123456789" /></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={s.closeBtn} onClick={() => setOrderStep(1)}>← Retour</button>
                  <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={submitOrder}>✅ Confirmer la commande</button>
                </div>
              </>
            )}
            {orderStep === 3 && (
              <div style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Commande confirmée !</h2>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
                  Merci <strong>{order.nom}</strong> ! Votre commande a bien été reçue.<br />
                  Nous viendrons collecter votre linge le <strong>{order.date}</strong><br />à <strong>{order.quartier}</strong>. Livraison en <strong>24h à 48h</strong>.
                </p>
                <div style={{ ...s.momoBox, marginTop: 20 }}>
                  <div style={{ fontSize: 13, color: MUTED }}>💛 Votre paiement de <strong style={{ color: BLUE }}>{total.toLocaleString()} FCFA</strong> est en cours de vérification.</div>
                </div>
                <button style={s.submitBtn} onClick={resetOrder}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL RDV */}
      {showRdv && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowRdv(false)}>
          <div style={s.modal}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 4 }}>📅 Prendre un RDV</h2>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 24 }}>Planifiez votre collecte à l'heure qui vous convient</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Nom complet *</label><input style={s.input} value={rdv.nom} onChange={e => setRdv({ ...rdv, nom: e.target.value })} placeholder="Votre nom" /></div>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Téléphone *</label><input style={s.input} value={rdv.tel} onChange={e => setRdv({ ...rdv, tel: e.target.value })} placeholder="Votre numéro" /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Quartier *</label><input style={s.input} value={rdv.quartier} onChange={e => setRdv({ ...rdv, quartier: e.target.value })} placeholder="Ex: Cadjehoun" /></div>
              <div style={{ marginBottom: 16 }}><label style={s.label}>Adresse</label><input style={s.input} value={rdv.adresse} onChange={e => setRdv({ ...rdv, adresse: e.target.value })} placeholder="Adresse précise" /></div>
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
              <button style={{ ...s.submitBtn, width: "auto", padding: "12px 28px" }} onClick={validateRdv}>Confirmer le RDV ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* CHATBOT */}
      {chatOpen && (
        <div style={s.chatWindow}>
          <div style={{ background: `linear-gradient(135deg,${BLUE},${NAVY})`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💧</div>
            <div><div style={{ fontWeight: 600, fontSize: 14, color: WHITE }}>Assistant NÉOLAV</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>● En ligne</div></div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: WHITE }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ maxWidth: "80%", padding: "10px 13px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, background: m.from === "bot" ? GRAY : BLUE, color: m.from === "bot" ? TEXT : WHITE, alignSelf: m.from === "bot" ? "flex-start" : "flex-end", borderBottomLeftRadius: m.from === "bot" ? 3 : 12, borderBottomRightRadius: m.from === "user" ? 3 : 12 }}
                dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
            ))}
            <div ref={msgEnd} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "4px 14px 10px" }}>
            {["💰 Tarifs", "🚚 Livraison", "📱 Paiement", "📦 Commander"].map(c => (
              <button key={c} onClick={() => sendMsg(c.split(" ").slice(1).join(" "))}
                style={{ background: "rgba(11,95,165,0.08)", color: BLUE, border: "1px solid rgba(11,95,165,0.2)", borderRadius: 20, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderTop: `1px solid ${GRAY}` }}>
            <input style={{ flex: 1, border: `1.5px solid ${GRAY}`, borderRadius: 8, padding: "8px 12px", fontFamily: "Poppins,sans-serif", fontSize: 13, outline: "none" }}
              value={chatIn} onChange={e => setChatIn(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Posez votre question..." />
            <button onClick={() => sendMsg()} style={{ background: BLUE, color: WHITE, border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 14 }}>➤</button>
          </div>
        </div>
      )}
      <button style={s.chatFab} onClick={() => setChatOpen(!chatOpen)}>
        {chatOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
