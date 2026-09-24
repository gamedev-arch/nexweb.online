
const WHATSAPP = "917046419638";
const EMAIL = "newebsolutions59@gmail.com";

function waLink(message){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`; }

document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  const menu = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => links.classList.toggle("show"));
  links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("show")));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); observer.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll("[data-count]").forEach(el => {
    const target = Number(el.dataset.count), suffix = el.dataset.suffix || "";
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || started) return;
      started = true; let n = 0; const step = target / 45;
      const t = setInterval(() => { n += step; if (n >= target) { n=target; clearInterval(t); } el.textContent = Math.round(n) + suffix; }, 25);
      io.disconnect();
    }, {threshold:.6});
    io.observe(el);
  });

  document.querySelectorAll(".faq-q").forEach(q => q.addEventListener("click", () => {
    const item = q.closest(".faq-item");
    document.querySelectorAll(".faq-item.open").forEach(x => { if (x!==item) x.classList.remove("open"); });
    item.classList.toggle("open");
  }));

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project[data-cat]");
  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active")); btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach(p => p.style.display = (f==="all" || p.dataset.cat.includes(f)) ? "" : "none");
  }));

  const modal = document.querySelector(".modal-wrap");
  document.querySelectorAll("[data-modal]").forEach(btn => btn.addEventListener("click", () => modal?.classList.add("show")));
  modal?.addEventListener("click", e => { if (e.target===modal || e.target.closest(".modal-close")) modal.classList.remove("show"); });

  const bookingForm = document.querySelector("#bookingForm");
  bookingForm?.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(bookingForm);
    const msg = `NexWeb Solutions Booking Request\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nEmail: ${fd.get("email")}\nPreferred Date: ${fd.get("date")}\nService: ${fd.get("service")}\nMessage: ${fd.get("message") || "-"}`;
    window.open(waLink(msg), "_blank");
    bookingForm.reset();
    modal?.classList.remove("show");
  });

  const contactForm = document.querySelector("#contactForm");
  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const msg = `NexWeb Solutions Enquiry\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nEmail: ${fd.get("email")}\nBusiness: ${fd.get("business")}\nService: ${fd.get("service")}\nBudget: ${fd.get("budget")}\nMessage: ${fd.get("message")}`;
    window.open(waLink(msg), "_blank");
    const note = document.querySelector("#formNote"); if(note){note.textContent="Your enquiry is ready in WhatsApp. Send it to complete the request."; note.style.display="block";}
  });

  const copyBtn = document.querySelector("[data-copy-email]");
  copyBtn?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(EMAIL); copyBtn.textContent="Email Copied"; setTimeout(()=>copyBtn.textContent="Copy Email",1400); } catch {}
  });

  const calcForm = document.querySelector("#calcForm");
  const total = document.querySelector("#estimateTotal");
  function updateEstimate(){
    if(!calcForm || !total) return;
    const pages = Number(calcForm.pages.value), seo = calcForm.seo.checked, social = calcForm.social.checked;
    const ads = calcForm.ads.checked, ecommerce = calcForm.ecommerce.checked, automation = calcForm.automation.checked;
    let base = pages<=3?6500:pages<=7?12000:pages<=12?19000:28000;
    if(seo) base+=4500; if(social) base+=3500; if(ads) base+=4000; if(ecommerce) base+=9000; if(automation) base+=5000;
    total.textContent = "₹"+base.toLocaleString("en-IN");
  }
  calcForm?.addEventListener("input", updateEstimate); updateEstimate();

  const estBtn = document.querySelector("#sendEstimate");
  estBtn?.addEventListener("click", () => {
    const pages = calcForm.pages.value;
    const msg = `NexWeb Solutions Price Estimate Request\nPages: ${pages}\nSEO: ${calcForm.seo.checked?"Yes":"No"}\nSocial Media: ${calcForm.social.checked?"Yes":"No"}\nPaid Ads: ${calcForm.ads.checked?"Yes":"No"}\nE-commerce: ${calcForm.ecommerce.checked?"Yes":"No"}\nAutomation: ${calcForm.automation.checked?"Yes":"No"}\nEstimated: ${total.textContent}`;
    window.open(waLink(msg), "_blank");
  });

  const cookie = document.querySelector(".cookie");
  if (cookie && !localStorage.getItem("nexweb_cookie_ok")) cookie.classList.add("show");
  document.querySelector("[data-cookie-ok]")?.addEventListener("click",()=>{localStorage.setItem("nexweb_cookie_ok","1");cookie?.classList.remove("show");});

  document.querySelectorAll("[data-wa]").forEach(a => {
    a.setAttribute("href", waLink(a.dataset.wa || "Hi NexWeb Solutions, I would like to discuss a project."));
    a.setAttribute("target","_blank");
  });

  document.querySelectorAll(".year").forEach(el=>el.textContent=new Date().getFullYear());
});
