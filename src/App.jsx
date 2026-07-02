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
const EMAILJS_SERVICE_ID = "service_tw5xn1h";
const EMAILJS_TEMPLATE_ID = "template_jto1h6u";
const EMAILJS_PUBLIC_KEY = "qGuMjROe1doISSEJ5";

const INIT_ORDERS = [
  { id: "NL-001", client: "Adjoavi K.", tel: "97001122", quartier: "Akpakpa", kg: 5, total: 4000, status: "done", date: "10/06/2025", heure: "09:30" },
  { id: "NL-002", client: "Rachid M.", tel: "96552233", quartier: "Cadjehoun", kg: 3, total: 2400, status: "transit", date: "12/06/2025", heure: "14:15" },
  { id: "NL-003", client: "Marie T.", tel: "95778899", quartier: "Sikecodji", kg: 7, total: 5600, status: "pending", date: "14/06/2025", heure: "11:00" },
  { id: "NL-004", client: "Kossi A.", tel: "94112233", quartier: "Godomey", kg: 4, total: 3200, status: "done", date: "15/06/2025", heure: "16:45" },
  { id: "NL-005", client: "Fatouma B.", tel: "90998877", quartier: "Calavi", kg: 6, total: 4800, status: "transit", date: "16/06/2025", heure: "10:20" },
];

const TESTIMONIALS = [
  { name: "Adjoavi K.", quartier: "Akpakpa", rating: 5, text: "Service impeccable ! Mon linge collecte le matin et livre propre et plie le lendemain. Je recommande vivement.", avatar: "AK" },
  { name: "Rachid M.", quartier: "Cadjehoun", rating: 5, text: "Tres pratique pour mon emploi du temps charge. Le paiement par Mobile Money est super simple.", avatar: "RM" },
  { name: "Marie T.", quartier: "Sikecodji", rating: 4, text: "Bon rapport qualite-prix. Le linge sent vraiment bon. Livraison toujours dans les delais.", avatar: "MT" },
  { name: "Kossi A.", quartier: "Godomey", rating: 5, text: "Premiere fois que j utilise un tel service a Cotonou. Tres professionnel, je vais continuer !", avatar: "KA" },
];

const FAQ_ITEMS = [
  { q: "Livrez-vous le dimanche ?", a: "Non, nous travaillons du lundi au samedi. Nous pouvons cependant receptonner les colis avant 12h le dimanche selon disponibilite." },
  { q: "Comment peser mon linge ?", a: "Pas besoin de balance ! Estimez le volume lors de la commande, notre equipe pesera precisement a la collecte." },
  { q: "Que faire si mon linge est abime ?", a: "Nous traitons votre linge avec le plus grand soin. En cas de probleme, contactez-nous immediatement au 01 96 28 18 86." },
  { q: "Puis-je payer a la livraison ?", a: "Oui ! Vous pouvez choisir de payer en especes directement a la collecte ou a la livraison." },
  { q: "Quelle est la zone de livraison ?", a: "Nous livrons partout a Cotonou : Akpakpa, Cadjehoun, Sikecodji, Godomey, Calavi, Fidjrosse, Agla, Jericho et plus encore." },
  { q: "Combien de temps pour recuperer mon linge ?", a: "Votre linge est livre propre en 24h a 48h maximum apres la collecte." },
];

const BOT_RULES = [
  { keys: ["prix", "tarif", "cout", "combien", "cher"], reply: "Le lavage est a **800 FCFA/kg**. Livraison **gratuite** partout a Cotonou. Profitez de **-10%** des 10kg ! 🧺" },
  { keys: ["recuperer", "recupere", "domicile", "chercher", "venir"], reply: "Nous venons **collecter votre linge chez vous** et le **livrons propre a domicile**. Pas besoin de vous deplacer. 🏠" },
  { keys: ["livraison", "livrer", "delai", "quand"], reply: "Nous livrons **partout a Cotonou** en **24h a 48h maximum**. La livraison est **gratuite** ! 🚚" },
  { keys: ["payer", "paiement", "mobile money", "mtn", "momo"], reply: "MTN Mobile Money ou especes a la collecte/livraison.\n\n📱 **01 96 28 18 86**\n📱 **01 61 75 30 77**\n\nDisponibles aussi sur **WhatsApp** ! 💛" },
  { keys: ["whatsapp"], reply: "Contactez-nous sur **WhatsApp** au **01 96 28 18 86** ou **01 61 75 30 77**. 💬" },
  { keys: ["numero", "contact", "appeler", "telephone"], reply: "📞 **01 96 28 18 86**\n📞 **01 61 75 30 77**\n\nLundi-samedi 9h-18h, appel ou WhatsApp." },
  { keys: ["ou", "adresse", "localisation", "situe", "trouver"], reply: "Nous sommes situes a **Fidjrosse fin pave Von**, en face de la **station Yatt & Co**. Livraison partout a Cotonou ! 📍" },
  { keys: ["horaire", "heure", "ouvert", "ferme", "dimanche"], reply: "Lundi-samedi **9h a 18h**. Le dimanche, reception de colis possible avant 12h selon disponibilite. ⏰" },
  { keys: ["commander", "commande"], reply: "Cliquez sur **«Commander»** en haut de la page. C'est rapide ! 📦" },
  { keys: ["rdv", "rendez", "planifier"], reply: "Cliquez sur **«RDV»** en haut de la page pour choisir votre creneau. 📅" },
  { keys: ["zone", "quartier", "cotonou"], reply: "Nous livrons dans **tous les quartiers de Cotonou** ! 📍" },
  { keys: ["drap", "vetement", "laver quoi"], reply: "Vetements, draps, serviettes, uniformes. **800 FCFA/kg**, livraison gratuite ! 🧺" },
  { keys: ["abime", "tache", "probleme linge"], reply: "En cas de probleme, appelez le **01 96 28 18 86** immediatement. 🙏" },
  { keys: ["especes", "cash"], reply: "Paiement en **especes a la collecte ou livraison** possible ! 💵" },
  { keys: ["promo", "reduction", "offre"], reply: "🎉 **-10%** des 10kg et **-5%** pour moins de 10kg sur premiere commande !" },
  { keys: ["kg", "kilogramme", "calcul"], reply: "**800 FCFA/kg**. Ex : 5kg = 4000F, 10kg = 7200F (avec -10%). 🧺" },
  { keys: ["bonjour", "bonsoir", "salut", "hello"], reply: "Bonjour ! 👋 Je suis l'assistant NEOLAV. Comment puis-je vous aider ?" },
  { keys: ["merci", "super", "parfait"], reply: "Avec plaisir ! 😊 N'hesitez pas si vous avez d'autres questions. 💧" },
  { keys: ["aide", "help", "info"], reply: "Je peux vous aider sur :\n\n💰 **Prix** | 🚚 **Livraison** | 📱 **Paiement** | 📦 **Commander** | 📅 **RDV** | 📍 **Adresse**" },
];

function getBotReply(msg) {
  const m = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?!.,]/g, "");
  for (const rule of BOT_RULES) {
    for (const key of rule.keys) { if (m.includes(key)) return rule.reply; }
  }
  return "Je n'ai pas bien compris 🙏. Tapez : **Prix**, **Livraison**, **Paiement**, **Commander**, **RDV**, **Adresse**.\n\nOu appelez le **01 96 28 18 86** !";
}

async function sendEmailNotification(type, data) {
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          type, nom: data.nom || data.client || "",
          tel: data.tel || "", quartier: data.quartier || "",
          adresse: data.adresse || "", date: data.date || "",
          heure: data.heure || "", kg: data.kg ? data.kg + " kg" : "",
          total: data.total ? data.total.toLocaleString() + " FCFA" : "",
          paiement: data.paiementType === "especes" ? "Especes" : "MTN Mobile Money",
        },
      }),
    });
    console.log(response.ok ? "Email envoye !" : "Erreur email: " + response.status);
  } catch (err) { console.error("EmailJS error:", err); }
}

function calcDiscount(kg) { return kg >= 10 ? 0.10 : 0.05; }

function Logo({ size = 36, color = BLUE }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 5C50 5 15 40 15 65C15 84 30.7 100 50 100C69.3 100 85 84 85 65C85 40 50 5 50 5Z" stroke={color} strokeWidth="6" fill="none" />
      <text x="50" y="78" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="800" fontSize="38" fill={color}>N</text>
    </svg>
  );
}

function StarRating({ rating }) {
  return <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= rating ? "#FBB824" : "#E5E7EB", fontSize: 16 }}>★</span>)}</div>;
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${GRAY}`, padding: "16px 0" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: NAVY }}>{item.q}</span>
        <span style={{ fontSize: 20, color: BLUE, transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s", lineHeight: 1 }}>+</span>
      </div>
      {open && <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{item.a}</p>}
    </div>
  );
}

const inp = { width: "100%", padding: "12px 16px", border: `1.5px solid ${GRAY}`, borderRadius: 10, fontFamily: "Poppins,sans-serif", fontSize: 14, color: TEXT, outline: "none", boxSizing: "border-box" };
const lbl = { fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 6, display: "block" };
const subBtn = { width: "100%", padding: 14, background: BLUE, color: WHITE, border: "none", borderRadius: 12, fontFamily: "Poppins,sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8 };
const clsBtn = { background: GRAY, color: MUTED, border: "none", borderRadius: 10, padding: "10px 20px", fontFamily: "Poppins,sans-serif", fontSize: 14, cursor: "pointer", marginRight: 12 };
const ovl = { position: "fixed", inset: 0, background: "rgba(10,37,64,0.6)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 };
const mdl = { background: WHITE, borderRadius: 24, padding: 40, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" };
const momoBox = { background: `linear-gradient(135deg,${SKY},rgba(168,216,240,0.3))`, borderRadius: 12, padding: 20, margin: "16px 0", border: "1px solid rgba(11,95,165,0.2)", textAlign: "center" };
const sumBox = { background: GRAY, borderRadius: 12, padding: 16, margin: "20px 0" };

const NAV_LINKS = [
  { label: "Accueil", id: "hero" },
  { label: "Services", id: "services" },
  { label: "Comment ca marche", id: "etapes" },
  { label: "Avis", id: "temoignages" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [view, setView] = useState("home");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [showOrder, setShowOrder] = useState(false);
  const [showRdv, setShowRdv] = useState(false);
  const [showRdvSuccess, setShowRdvSuccess] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatBubble, setChatBubble] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [order, setOrder] = useState({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "", paiementType: "momo" });
  const [rdv, setRdv] = useState({ nom: "", tel: "", quartier: "", adresse: "", date: "", heure: "" });
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Bonjour ! 👋 Je suis l'assistant NEOLAV. Comment puis-je vous aider ?" }]);
  const [chatIn, setChatIn] = useState("");
  const [typing, setTyping] = useState(false);
  const [exportRange, setExportRange] = useState("jour");
  const [sending, setSending] = useState(false);
  const msgEnd = useRef(null);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { const t = setTimeout(() => setChatBubble(false), 8000); return () => clearTimeout(t); }, []);

  const discount = calcDiscount(order.kg);
  const subtotal = order.kg * PRICE_KG;
  const discountAmt = Math.round(subtotal * discount);
  const total = subtotal - discountAmt;

  function sendMsg(txt) {
    const m = txt || chatIn;
    if (!m.trim()) return;
    setMsgs(p => [...p, { from: "user", text: m }]);
    setChatIn("");
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(p => [...p, { from: "bot", text: getBotReply(m) }]); }, 900);
  }

  function validateOrder() {
    if (!order.nom || !order.tel || !order.quartier || !order.date) { alert("Veuillez remplir tous les champs obligatoires *"); return; }
    setOrderStep(2);
  }

  async function submitOrder() {
    setSending(true);
    const now = new Date();
    const n = { id: `NL-00${orders.length + 1}`, client: order.nom, tel: order.tel, quartier: order.quartier, kg: order.kg, total, status: "pending", date: now.toLocaleDateString("fr-FR"), heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) };
    setOrders(p => [n, ...p]);
    await sendEmailNotification("NOUVELLE COMMANDE", { ...order, total, id: n.id, date: n.date, heure: n.heure });
    setSending(false);
    setOrderStep(3);
  }

  async function validateRdv() {
    if (!rdv.nom || !rdv.tel || !rdv.quartier || !rdv.date || !rdv.heure) { alert("Veuillez remplir tous les champs *"); return; }
    setSending(true);
    await sendEmailNotification("NOUVEAU RDV", rdv);
    setSending(false);
    setShowRdv(false);
    setShowRdvSuccess(true);
  }

  function resetOrder() { setShowOrder(false); setOrderStep(1); setOrder({ nom: "", tel: "", quartier: "", adresse: "", kg: 3, date: "", ref: "", paiementType: "momo" }); }

  function renderText(t) { return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>"); }

  function exportCSV() {
    const h = ["ID","Client","Telephone","Quartier","Kg","Total (FCFA)","Date","Heure","Statut"];
    const rows = orders.map(o => [o.id, o.client, o.tel||"", o.quartier, o.kg, o.total, o.date, o.heure||"", o.status]);
    const csv = [h, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `neolav_${exportRange}_${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  const tCA = orders.reduce((s,o) => s+o.total, 0);
  const tKg = orders.reduce((s,o) => s+o.kg, 0);
  const done = orders.filter(o => o.status==="done").length;

  // ── ADMIN LOGIN ─────────────────────────────────────────────────────────────
  if (view === "admin" && !adminAuth) return (
    <div style={{ minHeight:"100vh", background:NAVY, display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Poppins,sans-serif" }}>
      <div style={{ ...mdl, maxWidth:380 }}>
        <div style={{ textAlign:"center", marginBottom:20 }}><Logo size={48}/></div>
        <h2 style={{ textAlign:"center", fontFamily:"Montserrat,sans-serif", color:NAVY, marginBottom:4 }}>Espace Admin</h2>
        <p style={{ textAlign:"center", color:MUTED, fontSize:14, marginBottom:24 }}>Acces reserve — NEOLAV</p>
        <label style={lbl}>Mot de passe</label>
        <input style={inp} type="password" value={adminPwd} onChange={e=>setAdminPwd(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&(adminPwd===ADMIN_PWD?(setAdminAuth(true),setPwdErr(false)):setPwdErr(true))}
          placeholder="Entrez le mot de passe"/>
        {pwdErr && <p style={{ color:RED, fontSize:13, marginTop:6 }}>Mot de passe incorrect</p>}
        <button style={subBtn} onClick={()=>adminPwd===ADMIN_PWD?(setAdminAuth(true),setPwdErr(false)):setPwdErr(true)}>Acceder au tableau de bord</button>
        <button style={{ ...clsBtn, width:"100%", marginTop:10, marginRight:0 }} onClick={()=>setView("home")}>Retour au site</button>
      </div>
    </div>
  );

  // ── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
  if (view === "admin" && adminAuth) {
    const wDays = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
    const wData = [3,5,2,7,4,6,1];
    const wMax = Math.max(...wData);
    return (
      <div style={{ minHeight:"100vh", background:NAVY, color:WHITE, padding:"80px 24px 40px", fontFamily:"Poppins,sans-serif" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <Logo size={40} color={SKY}/>
              <div>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:20, color:WHITE, letterSpacing:2 }}>NEOLAV</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>Tableau de bord administrateur</div>
              </div>
            </div>
            <button style={{ padding:"8px 18px", borderRadius:8, border:"1px solid rgba(255,255,255,0.2)", background:"transparent", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontFamily:"Poppins,sans-serif" }}
              onClick={()=>{setView("home");setAdminAuth(false);setAdminPwd("");}}>Retour au site</button>
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
            {[["dashboard","Dashboard"],["commandes","Commandes"],["idees","Idees"]].map(([t,l])=>(
              <button key={t} onClick={()=>setAdminTab(t)}
                style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", fontFamily:"Poppins,sans-serif", fontSize:14, fontWeight:500, background:adminTab===t?BLUE:"rgba(255,255,255,0.06)", color:adminTab===t?WHITE:"rgba(255,255,255,0.5)" }}>{l}</button>
            ))}
          </div>

          {adminTab==="dashboard" && <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, marginBottom:24 }}>
              {[[tCA.toLocaleString()+" FCFA","Chiffre d'affaires","En croissance",SKY],[orders.length,"Commandes totales",done+" livrees",GREEN],[tKg+" kg","Kg traites","Moy. "+(tKg/orders.length).toFixed(1)+" kg/cmd","#FBB824"],[Math.round(tCA/orders.length).toLocaleString(),"Revenu moyen","FCFA/commande",WHITE]].map(([v,l,sub,c])=>(
                <div key={l} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:24 }}>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{l}</div>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:28, fontWeight:800, color:c }}>{v}</div>
                  <div style={{ fontSize:12, color:GREEN, marginTop:4 }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:24, marginBottom:24 }}>
              <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:18, fontWeight:700, marginBottom:20 }}>Statut des commandes</p>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {[["En attente",orders.filter(o=>o.status==="pending").length,"#FBB824"],["En livraison",orders.filter(o=>o.status==="transit").length,SKY],["Livrees",done,GREEN]].map(([l,v,c])=>(
                  <div key={l} style={{ background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"16px 24px", flex:1, minWidth:120, textAlign:"center" }}>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:28, fontWeight:800, color:c }}>{v}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:24 }}>
              <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:18, fontWeight:700, marginBottom:24 }}>Evolution de la semaine</p>
              <div style={{ display:"flex", alignItems:"flex-end", gap:16, height:160, padding:"0 8px" }}>
                {wDays.map((d,i)=>(
                  <div key={d} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                    <div style={{ width:"100%", maxWidth:40, height:`${(wData[i]/wMax)*120}px`, background:`linear-gradient(180deg,${SKY},${BLUE})`, borderRadius:"8px 8px 0 0" }}/>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>{d}</div>
                    <div style={{ fontSize:11, color:SKY, fontWeight:600 }}>{wData[i]}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, fontSize:12, color:"rgba(255,255,255,0.4)", textAlign:"center" }}>Commandes par jour cette semaine</div>
            </div>
          </>}

          {adminTab==="commandes" && <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
              <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:20, fontWeight:700 }}>Toutes les commandes</p>
              <div style={{ display:"flex", gap:8 }}>
                <select value={exportRange} onChange={e=>setExportRange(e.target.value)}
                  style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:WHITE, padding:"8px 12px", borderRadius:8, fontSize:13, cursor:"pointer" }}>
                  <option value="jour">Par jour</option><option value="mois">Par mois</option><option value="annee">Par annee</option>
                </select>
                <button onClick={exportCSV} style={{ background:BLUE, color:WHITE, border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Exporter CSV</button>
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", background:"rgba(255,255,255,0.04)", borderRadius:16, overflow:"hidden" }}>
                <thead><tr>{["ID","Client","Tel","Quartier","Kg","Total","Date","Heure","Statut","Action"].map(h=>(
                  <th key={h} style={{ background:"rgba(255,255,255,0.08)", padding:"12px 14px", textAlign:"left", fontSize:11, textTransform:"uppercase", letterSpacing:1, color:"rgba(255,255,255,0.5)" }}>{h}</th>
                ))}</tr></thead>
                <tbody>{orders.map(o=>(
                  <tr key={o.id}>
                    <td style={{ padding:"12px 14px", color:SKY, fontWeight:600, fontSize:13 }}>{o.id}</td>
                    <td style={{ padding:"12px 14px", fontSize:13 }}>{o.client}</td>
                    <td style={{ padding:"12px 14px", fontSize:13, color:SKY }}>{o.tel||"—"}</td>
                    <td style={{ padding:"12px 14px", fontSize:13 }}>{o.quartier}</td>
                    <td style={{ padding:"12px 14px", fontSize:13 }}>{o.kg} kg</td>
                    <td style={{ padding:"12px 14px", fontWeight:600, fontSize:13 }}>{o.total.toLocaleString()} F</td>
                    <td style={{ padding:"12px 14px", color:"rgba(255,255,255,0.5)", fontSize:13 }}>{o.date}</td>
                    <td style={{ padding:"12px 14px", color:"rgba(255,255,255,0.5)", fontSize:13 }}>{o.heure||"—"}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:500, background:o.status==="pending"?"rgba(251,184,36,0.15)":o.status==="transit"?"rgba(168,216,240,0.15)":"rgba(34,197,94,0.15)", color:o.status==="pending"?"#FBB824":o.status==="transit"?SKY:GREEN }}>
                        {o.status==="pending"?"En attente":o.status==="transit"?"En livraison":"Livre"}
                      </span>
                    </td>
                    <td style={{ padding:"12px 14px" }}>
                      <select style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:WHITE, padding:"4px 8px", borderRadius:6, fontSize:12, cursor:"pointer" }}
                        value={o.status} onChange={e=>setOrders(p=>p.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}>
                        <option value="pending">En attente</option><option value="transit">En livraison</option><option value="done">Livre</option>
                      </select>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {adminTab==="idees" && <>
            <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:20, fontWeight:700, marginBottom:20 }}>Propositions d'amelioration</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
              {[["Programme fidelite","1 kg gratuit apres 10 kg laves."],["Notifications WhatsApp","Message auto a chaque etape."],["Avis clients","Systeme de notation apres livraison."],["Service Express 12h","Option premium 1200 FCFA/kg."],["Rapport hebdomadaire","Resume auto chaque lundi."],["Parrainage","500 FCFA par filleul."]].map(([t,d])=>(
                <div key={t} style={{ background:"rgba(168,216,240,0.06)", border:"1px solid rgba(168,216,240,0.15)", borderRadius:14, padding:"16px 18px" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:SKY, marginBottom:6 }}>{t}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    );
  }

  // ── SITE CLIENT ─────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"Poppins,sans-serif", color:TEXT }}>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:WHITE, borderBottom:`1px solid ${GRAY}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:64, boxShadow:"0 2px 12px rgba(11,95,165,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:20, color:BLUE, letterSpacing:2, cursor:"pointer" }} onClick={()=>scrollTo("hero")}>
          <Logo size={28}/><span>NEOLAV</span>
        </div>
        {/* Desktop links */}
        <div style={{ display:"flex", gap:4, alignItems:"center" }} className="nav-desktop">
          {NAV_LINKS.map(l=>(
            <button key={l.id} onClick={()=>scrollTo(l.id)}
              style={{ background:"none", border:"none", color:MUTED, fontFamily:"Poppins,sans-serif", fontSize:13, fontWeight:500, cursor:"pointer", padding:"6px 10px", borderRadius:6 }}>{l.label}</button>
          ))}
          <div style={{ width:1, height:24, background:GRAY, margin:"0 8px" }}/>
          <button style={{ padding:"7px 14px", borderRadius:8, border:`1.5px solid ${BLUE}`, background:"transparent", color:BLUE, fontFamily:"Poppins,sans-serif", fontWeight:500, fontSize:13, cursor:"pointer" }} onClick={()=>setShowRdv(true)}>RDV</button>
          <button style={{ padding:"7px 14px", borderRadius:8, border:"none", background:BLUE, color:WHITE, fontFamily:"Poppins,sans-serif", fontWeight:500, fontSize:13, cursor:"pointer" }} onClick={()=>{setShowOrder(true);setOrderStep(1);}}>Commander</button>
          <button style={{ padding:"7px 10px", borderRadius:8, border:`1.5px solid ${GRAY}`, background:"transparent", color:MUTED, fontFamily:"Poppins,sans-serif", fontSize:11, cursor:"pointer" }} onClick={()=>setView("admin")}>Admin</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight:"100vh", background:`linear-gradient(135deg,${NAVY} 0%,${BLUE} 55%)`, paddingTop:64, display:"flex", alignItems:"stretch", overflow:"hidden" }}>
        <div style={{ display:"flex", width:"100%", flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 480px", padding:"60px 40px", display:"flex", flexDirection:"column", justifyContent:"center", zIndex:2 }}>
            <div style={{ display:"inline-block", background:"rgba(168,216,240,0.2)", border:"1px solid rgba(168,216,240,0.4)", color:SKY, padding:"6px 18px", borderRadius:20, fontSize:13, marginBottom:24, width:"fit-content" }}>Service laverie a domicile — Cotonou</div>
            <h1 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:WHITE, lineHeight:1.15, marginBottom:20 }}>Votre linge, <span style={{ color:SKY }}>notre signature</span> de perfection.</h1>
            <p style={{ color:"rgba(255,255,255,0.85)", fontSize:17, lineHeight:1.7, marginBottom:32, maxWidth:460 }}>Collecte a domicile · Lavage professionnel · Livraison en 24h/48h partout a Cotonou. Zero effort, linge impeccable.</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:48 }}>
              <button style={{ background:WHITE, color:BLUE, padding:"14px 28px", borderRadius:12, border:"none", fontFamily:"Poppins,sans-serif", fontWeight:600, fontSize:15, cursor:"pointer" }} onClick={()=>{setShowOrder(true);setOrderStep(1);}}>Commander maintenant</button>
              <button style={{ background:"transparent", color:WHITE, padding:"14px 28px", borderRadius:12, border:"2px solid rgba(255,255,255,0.4)", fontFamily:"Poppins,sans-serif", fontWeight:500, fontSize:15, cursor:"pointer" }} onClick={()=>setShowRdv(true)}>Prendre un RDV</button>
            </div>
            <div style={{ display:"flex", gap:32 }}>
              {[["24h","Delai livraison"],["800F","Par kilogramme"],["100%","Livraison gratuite"]].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:28, fontWeight:800, color:WHITE }}>{n}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:"1 1 480px", position:"relative", minHeight:400 }}>
            <img src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=900&q=80" alt="Service laverie NEOLAV" style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }}/>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg,${BLUE} 0%,rgba(11,95,165,0.3) 30%,transparent 55%)` }}/>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:NAVY, padding:"28px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:16, flexWrap:"wrap", justifyContent:"space-around" }}>
          {[["500+","Commandes satisfaites"],["24h","Delai de livraison max"],["100%","Livraison gratuite"],["5j/7","Disponibilite semaine"]].map(([n,l])=>(
            <div key={l} style={{ textAlign:"center", padding:"8px 16px" }}>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:28, fontWeight:800, color:SKY }}>{n}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROMO */}
      <div style={{ background:"linear-gradient(90deg,#FBB824,#F4A223)", padding:"14px 24px", textAlign:"center" }}>
        <p style={{ color:NAVY, fontWeight:600, fontSize:14, margin:0 }}>🎉 <strong>Premiere commande :</strong> profitez de <strong>10% de reduction</strong> des 10kg ! (5% pour moins de 10kg)</p>
      </div>

      {/* SERVICES */}
      <div id="services" style={{ background:WHITE, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Nos services</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:48 }}>Simple, rapide, efficace.</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {[["🧺","Lavage Standard","Lavage soigne avec collecte et livraison a domicile.","800 FCFA","/kg"],["🚚","Livraison Gratuite","Nous venons chercher et ramenons votre linge propre et plie.","Gratuite",""],["⚡","Service Express","Votre linge collecte et livre en 24h chrono garanti.","24h"," maxi"],["🏠","Collecte Domicile","Planifiez votre collecte a l heure qui vous convient.","Flexible",""]].map(([icon,name,desc,price,unit])=>(
              <div key={name} style={{ background:WHITE, border:`1.5px solid ${GRAY}`, borderRadius:20, padding:"32px 24px", textAlign:"center" }}>
                <div style={{ width:64, height:64, background:`linear-gradient(135deg,${SKY},${BLUE})`, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:28 }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:18, color:NAVY, marginBottom:8 }}>{name}</div>
                <div style={{ fontSize:14, color:MUTED, lineHeight:1.6, marginBottom:16 }}>{desc}</div>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:24, fontWeight:800, color:BLUE }}>{price}<span style={{ fontSize:13, color:MUTED, fontWeight:400 }}>{unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POURQUOI NEOLAV */}
      <div style={{ background:`linear-gradient(135deg,${NAVY},${BLUE})`, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:SKY, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Notre engagement</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:WHITE, marginBottom:48 }}>Pourquoi choisir NEOLAV ?</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {[["⚡","Rapidite","Votre linge pret en 24h maximum apres la collecte."],["✨","Qualite","Lavage soigne avec des produits professionnels de haute qualite."],["💰","Prix competitifs","800 FCFA/kg avec livraison gratuite, sans surprise."],["🏠","Flexibilite","Collecte a domicile, paiement mobile ou especes, selon vos preferences."]].map(([icon,title,desc])=>(
              <div key={title} style={{ background:"rgba(255,255,255,0.08)", borderRadius:16, padding:"28px 24px", border:"1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:17, color:WHITE, marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GALERIE */}
      <div style={{ background:GRAY, padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
          {["https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500&q=80","https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&q=80","https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&q=80"].map((url,i)=>(
            <div key={i} style={{ borderRadius:16, overflow:"hidden", height:220 }}>
              <img src={url} alt="NEOLAV service" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </div>
          ))}
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <div id="etapes" style={{ background:WHITE, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Comment ca marche</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:48 }}>4 etapes, c'est tout.</div>
          <div style={{ display:"flex", gap:32, flexWrap:"wrap", justifyContent:"center" }}>
            {[["1","Commandez","Remplissez le formulaire en 2 minutes"],["2","Collecte","Nous venons chercher votre linge"],["3","Lavage","Lavage professionnel soigne"],["4","Livraison","Linge propre livre en 24h/48h"]].map(([n,t,d])=>(
              <div key={n} style={{ textAlign:"center", maxWidth:200 }}>
                <div style={{ width:52, height:52, background:BLUE, color:WHITE, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:20, margin:"0 auto 16px" }}>{n}</div>
                <div style={{ fontWeight:600, fontSize:15, color:NAVY, marginBottom:8 }}>{t}</div>
                <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEMOIGNAGES */}
      <div id="temoignages" style={{ background:GRAY, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Avis clients</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:48 }}>Ce que disent nos clients.</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {TESTIMONIALS.filter(t=>t.rating>=4).map(t=>(
              <div key={t.name} style={{ background:WHITE, border:`1.5px solid ${GRAY}`, borderRadius:20, padding:"28px 24px" }}>
                <StarRating rating={t.rating}/>
                <p style={{ fontSize:14, color:TEXT, lineHeight:1.7, margin:"16px 0" }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${SKY},${BLUE})`, display:"flex", alignItems:"center", justifyContent:"center", color:WHITE, fontWeight:700, fontSize:13 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14, color:NAVY }}>{t.name}</div>
                    <div style={{ fontSize:12, color:MUTED }}>{t.quartier}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ background:WHITE, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Questions frequentes</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:40 }}>Tout ce que vous devez savoir.</div>
          <div style={{ maxWidth:700 }}>{FAQ_ITEMS.map((item,i)=><FAQItem key={i} item={item}/>)}</div>
        </div>
      </div>

      {/* PAIEMENT */}
      <div style={{ background:GRAY, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Paiement</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:48 }}>Mobile Money, simple et securise.</div>
          <div style={{ ...momoBox, maxWidth:480, margin:"0 auto" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>💛</div>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:20, color:BLUE, marginBottom:8 }}>MTN Mobile Money</div>
            <p style={{ color:MUTED, marginBottom:20, fontSize:14 }}>Payez facilement apres la collecte de votre linge</p>
            {MOMO.map(n=><div key={n} style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:6, letterSpacing:2 }}>{n}</div>)}
            <p style={{ fontSize:12, color:MUTED, marginTop:12 }}>Nom du beneficiaire : NEOLAV</p>
            <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(11,95,165,0.15)" }}>
              <p style={{ fontSize:13, color:BLUE, fontWeight:600, margin:0 }}>💬 Contactez-nous sur <strong>WhatsApp</strong> a ces memes numeros pour RDV, commande et paiement !</p>
            </div>
            <div style={{ marginTop:12 }}>
              <p style={{ fontSize:12, color:MUTED, margin:0 }}>Vous preferez ne pas payer en ligne ? Payez en <strong style={{ color:NAVY }}>especes a la collecte ou a la livraison</strong>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* HORAIRES & LOCALISATION */}
      <div id="contact" style={{ background:WHITE, padding:"80px 0" }}>
        <div style={{ padding:"0 24px", maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, color:BLUE, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Retrouvez-nous</div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:NAVY, marginBottom:48 }}>Horaires & Localisation</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            <div style={{ background:GRAY, borderRadius:20, padding:"32px 28px", border:`1.5px solid ${GRAY}` }}>
              <div style={{ width:48, height:48, background:`linear-gradient(135deg,${SKY},${BLUE})`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:20 }}>🕐</div>
              <div style={{ fontWeight:700, fontSize:18, color:NAVY, marginBottom:16 }}>Horaires d'ouverture</div>
              <div style={{ fontSize:14, color:TEXT, lineHeight:2 }}>
                <div><strong>Lundi — Vendredi</strong> : 9h00 — 18h00</div>
                <div><strong>Samedi</strong> : 9h00 — 18h00</div>
                <div><strong>Dimanche</strong> : Reception colis avant 12h</div>
              </div>
              <div style={{ marginTop:16, display:"inline-block", background:"rgba(11,95,165,0.08)", color:BLUE, padding:"6px 14px", borderRadius:20, fontSize:13, fontWeight:500 }}>Votre linge pret en 24h max</div>
            </div>
            <div style={{ background:GRAY, borderRadius:20, padding:"32px 28px", border:`1.5px solid ${GRAY}` }}>
              <div style={{ width:48, height:48, background:`linear-gradient(135deg,${SKY},${BLUE})`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:20 }}>📍</div>
              <div style={{ fontWeight:700, fontSize:18, color:NAVY, marginBottom:16 }}>Notre localisation</div>
              <div style={{ fontSize:14, color:TEXT, lineHeight:2 }}>
                <div><strong>Fidjrosse fin pave Von</strong></div>
                <div>En face de la Station Yatt & Co</div>
                <div>Cotonou, Benin</div>
              </div>
              <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:10 }}>
                <a href={`tel:+22901962818 86`} style={{ display:"flex", alignItems:"center", gap:8, color:BLUE, textDecoration:"none", fontSize:14, fontWeight:500 }}>📞 01 96 28 18 86</a>
                <a href={`tel:+22901617530 77`} style={{ display:"flex", alignItems:"center", gap:8, color:BLUE, textDecoration:"none", fontSize:14, fontWeight:500 }}>📞 01 61 75 30 77</a>
                <a href={`https://wa.me/22901962818 86`} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, color:"#25D366", textDecoration:"none", fontSize:14, fontWeight:500 }}>💬 WhatsApp</a>
              </div>
            </div>
            <div style={{ background:`linear-gradient(135deg,${NAVY},${BLUE})`, borderRadius:20, padding:"32px 28px", color:WHITE }}>
              <div style={{ fontWeight:700, fontSize:18, color:WHITE, marginBottom:16 }}>Nous contacter</div>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.7, marginBottom:20 }}>Passez une commande, prenez un RDV ou posez vos questions directement via WhatsApp ou par telephone.</p>
              <button style={{ background:WHITE, color:BLUE, padding:"12px 24px", borderRadius:10, border:"none", fontFamily:"Poppins,sans-serif", fontWeight:600, fontSize:14, cursor:"pointer", marginBottom:10, width:"100%" }}
                onClick={()=>{setShowOrder(true);setOrderStep(1);}}>Commander maintenant</button>
              <button style={{ background:"rgba(255,255,255,0.15)", color:WHITE, padding:"12px 24px", borderRadius:10, border:"2px solid rgba(255,255,255,0.3)", fontFamily:"Poppins,sans-serif", fontWeight:500, fontSize:14, cursor:"pointer", width:"100%" }}
                onClick={()=>setShowRdv(true)}>Prendre un RDV</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:NAVY, color:"rgba(255,255,255,0.5)", padding:"48px 24px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:40, marginBottom:40 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <Logo size={28} color={SKY}/><span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:18, color:WHITE, letterSpacing:2 }}>NEOLAV</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.7 }}>Votre partenaire de confiance pour l'entretien de votre linge a Cotonou. Service rapide, soigne et abordable.</p>
            </div>
            <div>
              <div style={{ fontWeight:600, color:WHITE, fontSize:14, marginBottom:16 }}>Navigation</div>
              {NAV_LINKS.map(l=>(
                <div key={l.id} style={{ marginBottom:8 }}>
                  <button onClick={()=>scrollTo(l.id)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", fontFamily:"Poppins,sans-serif", fontSize:13, cursor:"pointer", padding:0, textAlign:"left" }}>{l.label}</button>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:600, color:WHITE, fontSize:14, marginBottom:16 }}>Adresse</div>
              <div style={{ fontSize:13, lineHeight:2 }}>
                <div>Fidjrosse fin pave Von</div>
                <div>Face Station Yatt & Co</div>
                <div>Cotonou, Benin</div>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:600, color:WHITE, fontSize:14, marginBottom:16 }}>Contact</div>
              <div style={{ fontSize:13, lineHeight:2 }}>
                <div>Lun-Sam : 9h — 18h</div>
                <div>Dim : Reception avant 12h</div>
                <div style={{ marginTop:8 }}>
                  <a href="tel:+2290196281886" style={{ color:SKY, textDecoration:"none" }}>📞 01 96 28 18 86</a>
                </div>
                <div>
                  <a href="tel:+2290161753077" style={{ color:SKY, textDecoration:"none" }}>📞 01 61 75 30 77</a>
                </div>
                <div style={{ marginTop:8, fontSize:12, color:"rgba(255,255,255,0.35)" }}>Reseaux sociaux — a venir</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, fontSize:12 }}>
            <span>2025 NEOLAV. Tous droits reserves.</span>
            <span>Livraison gratuite partout a Cotonou</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showOrder && (
        <div style={ovl} onClick={e=>e.target===e.currentTarget&&resetOrder()}>
          <div style={mdl}>
            {orderStep===1 && <>
              <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:4 }}>Passer une commande</h2>
              <p style={{ fontSize:14, color:MUTED, marginBottom:24 }}>Remplissez vos informations pour la collecte</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div style={{ marginBottom:16 }}><label style={lbl}>Nom complet *</label><input style={inp} value={order.nom} onChange={e=>setOrder({...order,nom:e.target.value})} placeholder="Ex: Adjoavi Kokou"/></div>
                <div style={{ marginBottom:16 }}><label style={lbl}>Telephone *</label><input style={inp} value={order.tel} onChange={e=>setOrder({...order,tel:e.target.value})} placeholder="Ex: 97 00 00 00"/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div style={{ marginBottom:16 }}><label style={lbl}>Quartier *</label><input style={inp} value={order.quartier} onChange={e=>setOrder({...order,quartier:e.target.value})} placeholder="Ex: Akpakpa"/></div>
                <div style={{ marginBottom:16 }}><label style={lbl}>Date de collecte *</label><input style={inp} type="date" value={order.date} onChange={e=>setOrder({...order,date:e.target.value})}/></div>
              </div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Adresse precise</label><input style={inp} value={order.adresse} onChange={e=>setOrder({...order,adresse:e.target.value})} placeholder="Ex: Rue du marche"/></div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Poids estime : <strong style={{ color:BLUE }}>{order.kg} kg</strong></label>
                <input type="range" min={1} max={30} value={order.kg} onChange={e=>setOrder({...order,kg:Number(e.target.value)})} style={{ width:"100%", accentColor:BLUE }}/>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:MUTED, marginTop:4 }}><span>1 kg</span><span>30 kg</span></div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Mode de paiement *</label>
                <div style={{ display:"flex", gap:10 }}>
                  {[["momo","💛 Mobile Money"],["especes","💵 Especes"]].map(([val,label])=>(
                    <button key={val} onClick={()=>setOrder({...order,paiementType:val})}
                      style={{ flex:1, padding:12, borderRadius:10, border:order.paiementType===val?`2px solid ${BLUE}`:`1.5px solid ${GRAY}`, background:order.paiementType===val?"rgba(11,95,165,0.05)":WHITE, cursor:"pointer", fontSize:13, fontWeight:600, color:order.paiementType===val?BLUE:MUTED }}>{label}</button>
                  ))}
                </div>
              </div>
              <div style={sumBox}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, padding:"4px 0" }}><span>Lavage ({order.kg} kg x 800F)</span><span>{subtotal.toLocaleString()} FCFA</span></div>
                {discountAmt>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, padding:"4px 0", color:"#D97706" }}><span>Reduction (-{Math.round(discount*100)}%)</span><span>-{discountAmt.toLocaleString()} FCFA</span></div>}
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, padding:"4px 0" }}><span>Livraison</span><span style={{ color:GREEN }}>Gratuite</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:18, color:BLUE, borderTop:"1px solid rgba(11,95,165,0.15)", marginTop:8, paddingTop:8 }}><span>Total</span><span>{total.toLocaleString()} FCFA</span></div>
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button style={clsBtn} onClick={resetOrder}>Annuler</button>
                <button style={{ ...subBtn, width:"auto", padding:"12px 28px" }} onClick={validateOrder}>Continuer</button>
              </div>
            </>}
            {orderStep===2 && order.paiementType==="momo" && <>
              <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:4 }}>Paiement Mobile Money</h2>
              <p style={{ fontSize:14, color:MUTED, marginBottom:20 }}>Envoyez le montant sur l'un de ces numeros MTN MoMo</p>
              <div style={{ ...sumBox, textAlign:"center" }}>
                <div style={{ fontSize:13, color:MUTED, marginBottom:6 }}>Montant a envoyer</div>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:36, fontWeight:800, color:BLUE }}>{total.toLocaleString()} FCFA</div>
              </div>
              <div style={momoBox}>
                <div style={{ fontSize:13, color:MUTED, marginBottom:10 }}>Numeros MTN Mobile Money NEOLAV</div>
                {MOMO.map(n=><div key={n} style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:20, color:NAVY, letterSpacing:2, marginBottom:4 }}>{n}</div>)}
                <div style={{ fontSize:12, color:MUTED, marginTop:8 }}>Indiquez votre nom en reference</div>
              </div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Reference de transaction MoMo</label><input style={inp} value={order.ref} onChange={e=>setOrder({...order,ref:e.target.value})} placeholder="Ex: TXN123456789"/></div>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button style={clsBtn} onClick={()=>setOrderStep(1)}>Retour</button>
                <button style={{ ...subBtn, width:"auto", padding:"12px 28px" }} onClick={submitOrder} disabled={sending}>{sending?"Envoi...":"Confirmer la commande"}</button>
              </div>
            </>}
            {orderStep===2 && order.paiementType==="especes" && <>
              <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:4 }}>Paiement en especes</h2>
              <p style={{ fontSize:14, color:MUTED, marginBottom:20 }}>Vous paierez directement a la collecte ou a la livraison</p>
              <div style={{ ...sumBox, textAlign:"center" }}>
                <div style={{ fontSize:13, color:MUTED, marginBottom:6 }}>Montant a preparer</div>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:36, fontWeight:800, color:BLUE }}>{total.toLocaleString()} FCFA</div>
              </div>
              <div style={{ background:"#FFF8E1", borderRadius:12, padding:16, marginBottom:16, border:"1px solid rgba(251,184,36,0.3)" }}>
                <p style={{ fontSize:13, color:"#854F0B", margin:0 }}>💵 Notre agent collectera le paiement a la collecte ou a la livraison.</p>
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button style={clsBtn} onClick={()=>setOrderStep(1)}>Retour</button>
                <button style={{ ...subBtn, width:"auto", padding:"12px 28px" }} onClick={submitOrder} disabled={sending}>{sending?"Envoi...":"Confirmer la commande"}</button>
              </div>
            </>}
            {orderStep===3 && (
              <div style={{ textAlign:"center", padding:20 }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
                <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:12 }}>Commande confirmee !</h2>
                <p style={{ color:MUTED, fontSize:14, lineHeight:1.8 }}>Merci <strong>{order.nom}</strong> ! Votre commande a bien ete recue.<br/>Collecte le <strong>{order.date}</strong> a <strong>{order.quartier}</strong>.<br/>Livraison en <strong>24h a 48h</strong>.</p>
                <div style={{ ...momoBox, marginTop:20 }}>
                  <div style={{ fontSize:13, color:MUTED }}>{order.paiementType==="momo"?<>Paiement de <strong style={{ color:BLUE }}>{total.toLocaleString()} FCFA</strong> en cours de verification.</>:<>Vous paierez <strong style={{ color:BLUE }}>{total.toLocaleString()} FCFA</strong> en especes a la collecte/livraison.</>}</div>
                </div>
                <p style={{ fontSize:12, color:MUTED, marginTop:12 }}>Notre equipe a ete notifiee et vous contactera rapidement.</p>
                <button style={subBtn} onClick={resetOrder}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showRdv && (
        <div style={ovl} onClick={e=>e.target===e.currentTarget&&setShowRdv(false)}>
          <div style={mdl}>
            <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:4 }}>Prendre un RDV</h2>
            <p style={{ fontSize:14, color:MUTED, marginBottom:24 }}>Planifiez votre collecte a l'heure qui vous convient</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={{ marginBottom:16 }}><label style={lbl}>Nom complet *</label><input style={inp} value={rdv.nom} onChange={e=>setRdv({...rdv,nom:e.target.value})} placeholder="Votre nom"/></div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Telephone *</label><input style={inp} value={rdv.tel} onChange={e=>setRdv({...rdv,tel:e.target.value})} placeholder="Votre numero"/></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={{ marginBottom:16 }}><label style={lbl}>Quartier *</label><input style={inp} value={rdv.quartier} onChange={e=>setRdv({...rdv,quartier:e.target.value})} placeholder="Ex: Cadjehoun"/></div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Adresse</label><input style={inp} value={rdv.adresse} onChange={e=>setRdv({...rdv,adresse:e.target.value})} placeholder="Adresse precise"/></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={{ marginBottom:16 }}><label style={lbl}>Date *</label><input style={inp} type="date" value={rdv.date} onChange={e=>setRdv({...rdv,date:e.target.value})}/></div>
              <div style={{ marginBottom:16 }}><label style={lbl}>Heure *</label>
                <select style={inp} value={rdv.heure} onChange={e=>setRdv({...rdv,heure:e.target.value})}>
                  <option value="">Choisir</option>
                  {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"].map(h=><option key={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button style={clsBtn} onClick={()=>setShowRdv(false)}>Annuler</button>
              <button style={{ ...subBtn, width:"auto", padding:"12px 28px" }} onClick={validateRdv} disabled={sending}>{sending?"Envoi...":"Confirmer le RDV"}</button>
            </div>
          </div>
        </div>
      )}

      {showRdvSuccess && (
        <div style={ovl} onClick={e=>e.target===e.currentTarget&&setShowRdvSuccess(false)}>
          <div style={{ ...mdl, maxWidth:420, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📅</div>
            <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:800, color:NAVY, marginBottom:12 }}>RDV confirme !</h2>
            <p style={{ color:MUTED, fontSize:14, lineHeight:1.8 }}>Merci <strong>{rdv.nom}</strong> ! RDV le <strong>{rdv.date}</strong> a <strong>{rdv.heure}</strong> — Quartier <strong>{rdv.quartier}</strong>.<br/>Notre equipe vous contactera pour confirmer.</p>
            <p style={{ fontSize:12, color:MUTED, marginTop:8 }}>Une notification a ete envoyee a notre equipe.</p>
            <button style={subBtn} onClick={()=>{setShowRdvSuccess(false);setRdv({nom:"",tel:"",quartier:"",adresse:"",date:"",heure:""});}}>Fermer</button>
          </div>
        </div>
      )}

      {/* CHATBOT */}
      {chatOpen && (
        <div style={{ position:"fixed", bottom:100, right:28, zIndex:300, width:340, maxHeight:500, background:WHITE, borderRadius:20, boxShadow:"0 12px 40px rgba(0,0,0,0.15)", display:"flex", flexDirection:"column", overflow:"hidden", border:`1px solid ${GRAY}` }}>
          <div style={{ background:`linear-gradient(135deg,${BLUE},${NAVY})`, padding:"14px 18px", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, background:"rgba(255,255,255,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>💧</div>
            <div><div style={{ fontWeight:600, fontSize:14, color:WHITE }}>Assistant NEOLAV</div><div style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>En ligne</div></div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:14, display:"flex", flexDirection:"column", gap:10, background:WHITE }}>
            {msgs.map((m,i)=>(
              <div key={i} style={{ maxWidth:"85%", padding:"10px 13px", borderRadius:12, fontSize:13, lineHeight:1.6, background:m.from==="bot"?GRAY:BLUE, color:m.from==="bot"?TEXT:WHITE, alignSelf:m.from==="bot"?"flex-start":"flex-end", borderBottomLeftRadius:m.from==="bot"?3:12, borderBottomRightRadius:m.from==="user"?3:12 }}
                dangerouslySetInnerHTML={{ __html:renderText(m.text) }}/>
            ))}
            {typing && <div style={{ maxWidth:"85%", padding:"10px 13px", borderRadius:12, fontSize:13, background:GRAY, alignSelf:"flex-start", color:MUTED }}>En train d'ecrire...</div>}
            <div ref={msgEnd}/>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, padding:"4px 14px 10px", background:WHITE }}>
            {["Prix","Livraison","Paiement","RDV","Adresse"].map(c=>(
              <button key={c} onClick={()=>sendMsg(c)} style={{ background:"rgba(11,95,165,0.08)", color:BLUE, border:"1px solid rgba(11,95,165,0.2)", borderRadius:20, padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"Poppins,sans-serif" }}>{c}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:6, padding:"10px 14px", borderTop:`1px solid ${GRAY}` }}>
            <input style={{ flex:1, border:`1.5px solid ${GRAY}`, borderRadius:8, padding:"8px 12px", fontFamily:"Poppins,sans-serif", fontSize:13, outline:"none" }}
              value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Posez votre question..."/>
            <button onClick={()=>sendMsg()} style={{ background:BLUE, color:WHITE, border:"none", borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:14 }}>➤</button>
          </div>
        </div>
      )}

      <div style={{ position:"fixed", bottom:28, right:28, zIndex:300, display:"flex", alignItems:"center", gap:10 }}>
        {chatBubble && !chatOpen && (
          <div onClick={()=>{setChatOpen(true);setChatBubble(false);}}
            style={{ background:WHITE, padding:"12px 16px", borderRadius:16, boxShadow:"0 4px 20px rgba(0,0,0,0.15)", fontSize:13, color:TEXT, cursor:"pointer", maxWidth:220, border:`1px solid ${GRAY}` }}>
            👋 Une question ? Je suis la pour vous aider !
          </div>
        )}
        <button style={{ width:60, height:60, background:BLUE, borderRadius:"50%", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(11,95,165,0.5)", fontSize:24, flexShrink:0 }}
          onClick={()=>{setChatOpen(!chatOpen);setChatBubble(false);}}>
          {chatOpen?"✕":"💬"}
        </button>
      </div>
    </div>
  );
}
