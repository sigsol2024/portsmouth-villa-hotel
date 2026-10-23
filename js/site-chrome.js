(function () {
  var P = window.Portsmouth;
  var LOGO_DARK = "assets/branding/Portsmouth Hotels Logo Landscape 2.png";
  var LOGO_LIGHT = "assets/branding/Portsmouth Hotels Landscape black 2.png";

  var NAV = [
    { id: "stay", label: "Stay", href: "stay.html" },
    { id: "experiences", label: "Experiences", href: "experiences.html" },
    { id: "chidera", label: "Chidera Hall", href: "chidera-hall.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  function phones() {
    return '<span class="topbar__phones">' + P.phones.map(function (phone) {
      return '<a href="tel:' + phone.tel + '">' + phone.display + "</a>";
    }).join('<span class="topbar__dot" aria-hidden="true"> · </span>') + "</span>";
  }

  function renderHeader(page) {
    var links = NAV.map(function (item) {
      var on = page === item.id || (page === "rooms" && item.id === "stay");
      var current = on ? ' aria-current="page"' : "";
      return '<a href="' + item.href + '"' + current + ">" + item.label + "</a>";
    }).join("");

    var bookHref = page === "home" || page === "rooms" ? "#stay-book" : "contact.html#enquire";
    var bookLabel = page === "home" ? "Reserve a Stay" : "Book";

    return (
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header" id="site-header">' +
        '<div class="topbar">' +
          '<span class="topbar__address">' + P.address.short + "</span>" +
          "<span>" + phones() + "</span>" +
          '<a href="mailto:' + P.email + '">' + P.email + "</a>" +
        "</div>" +
        '<div class="navrow">' +
          '<a class="logo" href="index.html" aria-label="Portsmouth Villa Hotel home">' +
            '<img class="logo__on-dark" src="' + LOGO_DARK + '" alt="Portsmouth">' +
            '<img class="logo__on-light" src="' + LOGO_LIGHT + '" alt="">' +
          "</a>" +
          '<nav class="nav" aria-label="Primary">' + links + "</nav>" +
          '<a class="book" href="' + bookHref + '">' + bookLabel + "</a>" +
          '<button class="menu-btn" type="button" aria-label="Open menu" data-menu-open><span></span></button>' +
        "</div>" +
      "</header>" +
      '<div class="mobile-nav" id="mobile-nav" hidden>' +
        '<div class="mobile-nav__top">' +
          '<a class="logo" href="index.html"><img class="logo__on-light" src="' + LOGO_LIGHT + '" alt="Portsmouth" style="display:block"></a>' +
          '<button class="menu-btn" type="button" aria-label="Close menu" data-menu-close><span></span></button>' +
        "</div>" +
        '<nav aria-label="Mobile">' + links + "</nav>" +
        '<div class="mobile-nav__meta">' +
          "<p>" + P.address.lines.join("<br>") + "</p>" +
          "<p>" + phones() + "</p>" +
          '<p><a href="mailto:' + P.email + '">' + P.email + "</a></p>" +
          '<p><a class="book" href="' + bookHref + '" style="display:inline-flex">' + bookLabel + "</a></p>" +
        "</div>" +
      "</div>"
    );
  }

  function renderFooter() {
    var links = NAV.map(function (item) {
      return '<a href="' + item.href + '">' + item.label + "</a>";
    }).join("");

    return (
      '<footer class="site-footer">' +
        '<div class="wreath wreath--corner" aria-hidden="true"></div>' +
        '<div class="wrap footer-grid">' +
          "<div>" +
            '<a class="logo" href="index.html" aria-label="Portsmouth Villa Hotel home">' +
              '<img class="logo__on-dark" src="' + LOGO_DARK + '" alt="Portsmouth">' +
              '<img class="logo__on-light" src="' + LOGO_LIGHT + '" alt="" style="display:none">' +
            "</a>" +
            "<p>" + P.lines.promise + "</p>" +
          "</div>" +
          '<div class="footer-links">' + links + "</div>" +
          "<div>" +
            "<p>" + P.address.lines.join("<br>") + "</p>" +
            "<p>" + phones() + "</p>" +
            '<p><a href="mailto:' + P.email + '">' + P.email + "</a></p>" +
          "</div>" +
        "</div>" +
        '<div class="wrap footer-base">' +
          "<p>© " + new Date().getFullYear() + " " + P.name + "</p>" +
          '<p><a href="terms.html">Terms of Use</a> · <a href="privacy.html">Privacy Policy</a></p>' +
        "</div>" +
      "</footer>"
    );
  }

  function bindMenu() {
    var panel = document.getElementById("mobile-nav");
    if (!panel) return;
    panel.hidden = false;

    function open() {
      panel.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      panel.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-menu-open]").forEach(function (btn) {
      btn.addEventListener("click", open);
    });
    document.querySelectorAll("[data-menu-close]").forEach(function (btn) {
      btn.addEventListener("click", close);
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  function bindScroll() {
    if (document.body.getAttribute("data-page") !== "home") return;
    var header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-solid", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function parseStayEaziDate(dateStr) {
    if (!dateStr) return null;
    var parts = String(dateStr).split("-");
    if (parts.length !== 3) return null;
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var yearPart = parts[2];
    var year = parseInt(yearPart, 10);
    if (!day || !month || isNaN(year)) return null;
    if (yearPart.length === 2) year = year < 50 ? 2000 + year : 1900 + year;
    var mm = month < 10 ? "0" + month : String(month);
    var dd = day < 10 ? "0" + day : String(day);
    return year + "-" + mm + "-" + dd;
  }

  function initStayEazi() {
    var containers = document.querySelectorAll(".stayeazi-booking-widget[data-widget-token]");
    if (!containers.length) return;

    function hookRoomSpecificRedirect(container) {
      function attach() {
        var form = container.querySelector("#stayeazi-booking-form");
        if (!form || form.getAttribute("data-room-hook") === "1") return !!form;
        form.setAttribute("data-room-hook", "1");
        form.addEventListener("submit", function (event) {
          var base = container.getAttribute("data-booking-url");
          if (!base) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          var from = parseStayEaziDate((container.querySelector("#stayeazi-checkin") || {}).value);
          var to = parseStayEaziDate((container.querySelector("#stayeazi-checkout") || {}).value);
          var adults = parseInt((container.querySelector("#stayeazi-adults") || {}).value, 10);
          var children = parseInt((container.querySelector("#stayeazi-children") || {}).value, 10);
          if (!from || !to) {
            window.alert("Please select check-in and check-out dates");
            return;
          }
          if (isNaN(adults) || adults < 1) adults = 2;
          if (isNaN(children) || children < 0) children = 0;
          window.location.href = base + "?from=" + encodeURIComponent(from) + "&to=" + encodeURIComponent(to) + "&adult=" + encodeURIComponent(adults) + "&child=" + encodeURIComponent(children);
        }, true);
        return true;
      }
      if (attach()) return;
      var observer = new MutationObserver(function () {
        if (attach()) observer.disconnect();
      });
      observer.observe(container, { childList: true, subtree: true });
      window.setTimeout(function () { observer.disconnect(); }, 5000);
    }

    function applyGuestDefaults(container) {
      var adults = container.querySelector("#stayeazi-adults");
      var children = container.querySelector("#stayeazi-children");
      if (!adults) return false;
      adults.value = "2";
      Array.prototype.forEach.call(adults.options, function (opt) {
        opt.selected = opt.value === "2";
      });
      if (children) {
        children.value = "0";
        Array.prototype.forEach.call(children.options, function (opt) {
          opt.selected = opt.value === "0";
        });
      }
      return true;
    }

    containers.forEach(function (container) {
      var token = container.getAttribute("data-widget-token");
      if (!token) return;
      hookRoomSpecificRedirect(container);
      var scriptId = "stayeazi-widget-script-" + token;
      if (!document.getElementById(scriptId)) {
        var script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://app.stayeazi.com/widget/load/" + token;
        script.async = true;
        script.onload = function () {
          applyGuestDefaults(container);
          hookRoomSpecificRedirect(container);
        };
        document.head.appendChild(script);
      }
    });
  }

  var page = document.body.getAttribute("data-page") || "home";
  var headerRoot = document.getElementById("site-header-root");
  var footerRoot = document.getElementById("site-footer-root");
  if (headerRoot) headerRoot.innerHTML = renderHeader(page);
  if (footerRoot) footerRoot.innerHTML = renderFooter();
  bindMenu();
  bindScroll();
  initStayEazi();

  function syncHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header", header.offsetHeight + "px");
  }

  syncHeader();
  window.addEventListener("resize", syncHeader);
})();
