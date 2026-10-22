(function () {
  var P = window.Portsmouth;
  var Images = window.PortsmouthImages;

  function money(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  function roomHref(id) {
    return "room-details.html?room=" + id + "#" + id;
  }

  function roomById(id) {
    return P.rooms.filter(function (room) { return room.id === id; })[0] || P.rooms[0];
  }

  var AMENITIES = [
    { name: "Air conditioning", short: "Air conditioning", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M4 8l16 8M4 16l16-8"/></svg>' },
    { name: "Ensuite bathroom", short: "Ensuite", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8zM9 10V7a3 3 0 0 1 6 0v3"/></svg>' },
    { name: "Television", short: "Television", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M8 21h8"/></svg>' },
    { name: "Tea and coffee", short: "Tea and coffee", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-5z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3"/></svg>' },
    { name: "Work area", short: "Work area", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="10" rx="1"/><path d="M2 20h20M10 20l1.2-3M14 20l-1.2-3"/></svg>' },
    { name: "In-room safe", short: "In-room safe", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3.2"/><path d="M12 8.8v1M12 14.2v1M8.8 12h1M14.2 12h1"/></svg>' }
  ];

  function amenitiesHtml(list, useShort) {
    return '<ul class="room-amenities">' + list.map(function (item) {
      return "<li>" + item.icon + "<span>" + (useShort ? item.short : item.name) + "</span></li>";
    }).join("") + "</ul>";
  }

  function reveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (node) { node.classList.add("is-in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  function mountHero() {
    var root = document.querySelector("[data-hero]");
    if (!root) return;
    var track = root.querySelector("[data-hero-track]");
    var slides = [{
      image: "home.hero",
      kicker: "Onitsha",
      title: P.lines.headline,
      text: P.lines.rhythm,
      href: "#rooms",
      cta: "See the rooms"
    }].concat(P.rooms.map(function (room) {
      return {
        image: room.image,
        kicker: "Stay",
        title: room.name,
        text: room.line,
        href: roomHref(room.id),
        cta: "View this room"
      };
    }));

    track.innerHTML = slides.map(function (slide, index) {
      return (
        '<article class="hero-slide' + (index === 0 ? " is-active" : "") + '" data-hero-slide>' +
          '<div class="hero-slide__photo">' + Images.img(slide.image, { priority: index === 0 }) +
            '<div class="hero-slide__shade"></div></div>' +
          '<div class="hero-slide__card">' +
            '<p class="label">' + slide.kicker + "</p>" +
            "<h2>" + slide.title + "</h2>" +
            "<p>" + slide.text + "</p>" +
            '<a class="book" href="' + slide.href + '">' + slide.cta + "</a>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    var dots = root.querySelector("[data-hero-dots]");
    dots.innerHTML = slides.map(function (_, index) {
      return '<button type="button" aria-label="Slide ' + (index + 1) + '" aria-current="' + (index === 0 ? "true" : "false") + '"></button>';
    }).join("");

    var articles = track.querySelectorAll("[data-hero-slide]");
    var index = 0;
    var timer = null;
    var desktop = window.matchMedia("(min-width: 900px)");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function paint(next, fromScroll) {
      index = (next + slides.length) % slides.length;
      var slide = slides[index];
      articles.forEach(function (article, i) { article.classList.toggle("is-active", i === index); });
      dots.querySelectorAll("button").forEach(function (button, i) {
        button.setAttribute("aria-current", i === index ? "true" : "false");
      });
      root.querySelector("[data-hero-kicker]").textContent = slide.kicker;
      root.querySelector("[data-hero-title]").textContent = slide.title;
      root.querySelector("[data-hero-text]").textContent = slide.text;
      var cta = root.querySelector("[data-hero-cta]");
      cta.textContent = slide.cta;
      cta.setAttribute("href", slide.href);
      if (!fromScroll && !desktop.matches) {
        track.scrollTo({ left: articles[index].offsetLeft, behavior: reduced ? "auto" : "smooth" });
      }
    }

    function start() {
      window.clearInterval(timer);
      if (reduced || !desktop.matches) return;
      timer = window.setInterval(function () { paint(index + 1); }, 6500);
    }

    root.querySelector("[data-hero-prev]").addEventListener("click", function () { paint(index - 1); start(); });
    root.querySelector("[data-hero-next]").addEventListener("click", function () { paint(index + 1); start(); });
    dots.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      paint(Array.prototype.indexOf.call(dots.children, button));
      start();
    });
    track.addEventListener("scroll", function () {
      if (desktop.matches) return;
      var width = track.clientWidth || 1;
      var next = Math.round(track.scrollLeft / width);
      if (next !== index && next >= 0 && next < slides.length) paint(next, true);
    }, { passive: true });
    var startX = 0;
    root.addEventListener("pointerdown", function (event) { startX = event.clientX; });
    root.addEventListener("pointerup", function (event) {
      if (!desktop.matches) return;
      var delta = event.clientX - startX;
      if (Math.abs(delta) < 48) return;
      paint(index + (delta < 0 ? 1 : -1));
      start();
    });
    paint(0);
    start();
  }

  function mountRoomSequence() {
    var track = document.querySelector("[data-seq]");
    var mobile = document.querySelector("[data-seq-mobile]");
    if (!track || !mobile) return;
    var rooms = P.rooms;
    track.style.setProperty("--count", rooms.length);

    function frame(room) {
      return Images.img(room.image, { ratio: "3x2" });
    }

    var amenityList = amenitiesHtml(AMENITIES.slice(0, 3), true);

    mobile.style.setProperty("--count", rooms.length);
    mobile.innerHTML =
      '<div class="room-seq__pin">' +
        '<div class="room-seq__steps" aria-hidden="true">' +
          rooms.map(function (_, index) {
            return '<span' + (index === 0 ? ' class="is-active"' : "") + "></span>";
          }).join("") +
        "</div>" +
        '<div class="room-seq__slides">' +
          rooms.map(function (room, index) {
            return (
              '<article class="room-card' + (index === 0 ? " is-active" : "") + '">' +
                frame(room) +
                '<div class="room-card__body">' +
                  "<h3>" + room.name + "</h3>" +
                  amenityList +
                  '<a class="book" href="' + roomHref(room.id) + '">View this room</a>' +
                "</div>" +
              "</article>"
            );
          }).join("") +
        "</div>" +
      "</div>";

    var cards = mobile.querySelectorAll(".room-card");
    var steps = mobile.querySelectorAll(".room-seq__steps span");
    var mobileIndex = -1;

    function setMobile(index) {
      if (index === mobileIndex) return;
      mobileIndex = index;
      cards.forEach(function (card, i) {
        card.classList.toggle("is-active", i === index);
        card.classList.toggle("is-past", i < index);
      });
      steps.forEach(function (step, i) {
        step.classList.toggle("is-active", i === index);
        step.classList.toggle("is-past", i < index);
      });
    }

    function onMobileScroll() {
      if (window.matchMedia("(min-width: 900px)").matches) return;
      var stage = mobile.querySelector(".room-seq__pin");
      var pin = parseFloat(getComputedStyle(stage).top) || 0;
      var travel = Math.max(1, mobile.offsetHeight - stage.offsetHeight);
      var progress = (pin - mobile.getBoundingClientRect().top) / travel;
      progress = Math.min(1, Math.max(0, progress));
      setMobile(Math.min(rooms.length - 1, Math.floor(progress * rooms.length)));
    }

    function fitMobilePin() {
      var pinEl = mobile.querySelector(".room-seq__pin");
      if (!pinEl) return;
      if (window.matchMedia("(min-width: 900px)").matches) {
        pinEl.style.height = "";
        return;
      }
      var viewH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      var stickyTop = parseFloat(window.getComputedStyle(pinEl).top) || 0;
      pinEl.style.height = Math.max(280, Math.round(viewH - stickyTop)) + "px";
    }

    setMobile(0);
    fitMobilePin();
    window.addEventListener("scroll", onMobileScroll, { passive: true });
    window.addEventListener("resize", fitMobilePin);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", fitMobilePin);
    onMobileScroll();

    var title = track.querySelector("[data-seq-title]");
    var text = track.querySelector("[data-seq-text]");
    var rate = track.querySelector("[data-seq-rate]");
    var cta = track.querySelector("[data-seq-cta]");
    var frameBox = track.querySelector("[data-seq-frame]");
    var names = track.querySelector("[data-seq-names]");
    names.innerHTML = rooms.map(function (room, i) {
      return '<li><button type="button" data-index="' + i + '">' + room.name + "</button></li>";
    }).join("");

    var current = -1;
    function setActive(index) {
      if (index === current) return;
      current = index;
      var room = rooms[index];
      title.textContent = room.name;
      text.textContent = room.sentence;
      rate.textContent = money(room.rate) + " a night";
      cta.setAttribute("href", roomHref(room.id));
      frameBox.innerHTML = frame(room);
      names.querySelectorAll("button").forEach(function (button, i) {
        button.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function scrollToIndex(index) {
      var stage = track.querySelector(".room-seq__stage");
      var pin = parseFloat(getComputedStyle(stage).top) || 0;
      var travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      var top = window.scrollY + track.getBoundingClientRect().top - pin + ((index + 0.5) / rooms.length) * travel;
      window.scrollTo({ top: Math.round(top), behavior: "smooth" });
    }

    function onScroll() {
      if (!window.matchMedia("(min-width: 900px)").matches) return;
      var stage = track.querySelector(".room-seq__stage");
      var pin = parseFloat(getComputedStyle(stage).top) || 0;
      var travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
      var progress = (pin - track.getBoundingClientRect().top) / travel;
      progress = Math.min(1, Math.max(0, progress));
      setActive(Math.min(rooms.length - 1, Math.floor(progress * rooms.length)));
    }

    names.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      scrollToIndex(Number(button.getAttribute("data-index")));
    });
    setActive(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function mountEvening() {
    var root = document.getElementById("evening");
    if (!root) return;
    root.innerHTML = ["rooftop", "festcave", "prive"].map(function (id) {
      var item = P.experiences.filter(function (entry) { return entry.id === id; })[0];
      return '<a href="experiences.html#' + id + '">' + Images.img(item.image, { ratio: "3x2" }) + "<strong>" + item.name + "</strong><p>" + item.sentence + "</p></a>";
    }).join("");
  }

  function mountHomeRooms() {
    var stage = document.getElementById("room-stage");
    var list = document.getElementById("room-names");
    if (!stage || !list) return;

    function show(id) {
      var room = roomById(id);
      stage.innerHTML = Images.img(room.image, { ratio: "3x2" });
      list.querySelectorAll("button").forEach(function (button) {
        button.setAttribute("aria-pressed", button.getAttribute("data-room") === id ? "true" : "false");
      });
      var view = document.getElementById("room-open");
      if (view) view.setAttribute("href", roomHref(id));
    }

    list.innerHTML = P.rooms.map(function (room, index) {
      return (
        "<li><button type=\"button\" data-room=\"" + room.id + "\" aria-pressed=\"" + (index === 0 ? "true" : "false") + "\">" +
          "<strong>" + room.name + "</strong><span>" + room.line + "</span>" +
        "</button></li>"
      );
    }).join("");

    list.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      show(button.getAttribute("data-room"));
    });
    list.addEventListener("mouseover", function (event) {
      var button = event.target.closest("button");
      if (button) show(button.getAttribute("data-room"));
    });
    show(P.rooms[0].id);
  }

  function mountRoomPage() {
    var root = document.getElementById("room-root");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var hash = decodeURIComponent((window.location.hash || "").replace(/^#/, ""));
    var room = roomById(params.get("room") || hash || "royal");
    var index = P.rooms.indexOf(room);
    var next = P.rooms[(index + 1) % P.rooms.length];
    var stay = P.stay;
    document.title = room.name + " | " + P.name;

    var widget = document.getElementById("stayeazi-widget-room");
    if (widget) widget.setAttribute("data-booking-url", room.bookUrl);

    var gallery = room.gallery && room.gallery.length ? room.gallery : [room.image];
    var others = P.rooms.filter(function (entry) { return entry.id !== room.id; });

    root.innerHTML =
      '<section class="hero room-hero">' +
        '<div class="hero__photo">' + Images.img(room.image, { priority: true }) + "</div>" +
        '<div class="hero__shade"></div>' +
        '<div class="hero__copy room-hero__copy">' +
          '<p class="label">' + room.line + "</p>" +
          "<h1 class=\"h1\">" + room.name + "</h1>" +
          '<ul class="room-hero__facts">' +
            "<li>" + stay.guests + " guests</li>" +
            "<li>Check-in " + stay.checkIn + "</li>" +
            "<li>" + money(room.rate) + " a night</li>" +
          "</ul>" +
          '<p class="room-hero__ctas"><a class="book" href="#stay-book">Book this room</a> <a class="book book--ghost" href="#room-gallery">View gallery</a></p>' +
        "</div>" +
      "</section>" +

      '<nav class="room-subnav" aria-label="On this page"><div class="wrap room-subnav__row">' +
        '<a href="#room-about">The room</a><a href="#room-gallery">Gallery</a><a href="#room-amenities">In the room</a><a href="#stay-book">Book</a>' +
        '<span class="room-subnav__rate">' + money(room.rate) + " a night</span>" +
      "</div></nav>" +

      '<section class="wrap room-about" id="room-about">' +
        '<div class="room-about__intro">' +
          '<p class="label">The room</p>' +
          '<p class="room-about__sentence">' + room.sentence + "</p>" +
        "</div>" +
        '<dl class="facts">' +
          "<div><dt>Check-in</dt><dd>" + stay.checkIn + "</dd></div>" +
          "<div><dt>Check-out</dt><dd>" + stay.checkOut + "</dd></div>" +
          "<div><dt>Guests</dt><dd>" + stay.guests + "</dd></div>" +
          "<div><dt>Breakfast</dt><dd>" + stay.breakfast + "</dd></div>" +
          "<div><dt>Nightly rate</dt><dd>" + money(room.rate) + "</dd></div>" +
          "<div><dt>Deposit</dt><dd>" + stay.deposit + "</dd></div>" +
        "</dl>" +
      "</section>" +

      '<section class="wrap gallery-block" id="room-gallery">' +
        '<div class="gallery-head"><div><p class="label">Gallery</p><h2 class="h2">Inside the ' + room.name + '</h2></div>' +
        '<p class="gallery-count"><span data-gallery-count>1</span> / ' + gallery.length + "</p></div>" +
        '<div class="gallery">' +
          '<div class="gallery__main" data-gallery-main>' + Images.img(gallery[0]) + "</div>" +
          '<div class="gallery__thumbs">' +
            gallery.map(function (slot, i) {
              return '<button type="button" class="gallery__thumb' + (i === 0 ? " is-active" : "") + '" data-gallery-index="' + i + '" aria-label="Photograph ' + (i + 1) + '">' + Images.img(slot) + "</button>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>" +

      '<section class="room-amen-band" id="room-amenities"><div class="wrap">' +
        '<p class="label">In the room</p><h2 class="h2">Everything in place.</h2>' +
        amenitiesHtml(AMENITIES, false) +
        '<ul class="included">' +
          "<li>" + stay.breakfast + "</li><li>" + stay.internet + "</li><li>" + stay.leisure + "</li>" +
        "</ul>" +
      "</div></section>" +

      '<section class="wrap others-block">' +
        '<div class="gallery-head"><div><p class="label">Stay</p><h2 class="h2">Other rooms</h2></div>' +
        '<p><a class="link" href="stay.html">All four rooms</a></p></div>' +
        '<div class="stay-grid">' +
          others.map(function (other) {
            return (
              '<article class="room-tile">' +
                '<a class="room-tile__photo" href="' + roomHref(other.id) + '">' + Images.img(other.image, { ratio: "3x2" }) + "</a>" +
                '<div class="room-tile__body"><h2>' + other.name + "</h2>" +
                '<div class="room-tile__foot"><span class="room-tile__rate">' + money(other.rate) + ' <small>a night</small></span>' +
                '<a class="book" href="' + roomHref(other.id) + '">View this room</a></div></div>' +
              "</article>"
            );
          }).join("") +
        "</div>" +
      "</section>";

    var main = root.querySelector("[data-gallery-main]");
    var count = root.querySelector("[data-gallery-count]");
    var thumbs = root.querySelectorAll("[data-gallery-index]");
    thumbs.forEach(function (button) {
      button.addEventListener("click", function () {
        var i = Number(button.getAttribute("data-gallery-index"));
        main.innerHTML = Images.img(gallery[i]);
        if (count) count.textContent = String(i + 1);
        thumbs.forEach(function (b, j) { b.classList.toggle("is-active", j === i); });
      });
    });
  }

  function mountEnquire() {
    var form = document.querySelector("form.enquire");
    if (!form) return;
    var select = form.querySelector("[name=interest]");
    if (select && !select.options.length) {
      P.rooms.forEach(function (room) {
        var option = document.createElement("option");
        option.value = room.name;
        option.textContent = room.name;
        select.appendChild(option);
      });
      var hall = document.createElement("option");
      hall.value = "Chidera Hall";
      hall.textContent = "Chidera Hall";
      select.appendChild(hall);
      var wanted = form.getAttribute("data-default-interest");
      if (wanted) select.value = wanted;
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var labels = { name: "Name", phone: "Phone", dates: "Dates", interest: "Room or hall", occasion: "Occasion", guests: "Guests", note: "Note" };
      var lines = [];
      new FormData(form).forEach(function (value, key) {
        var text = String(value || "").trim();
        if (text) lines.push((labels[key] || key) + ": " + text);
      });
      window.location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent("Enquiry from the website") + "&body=" + encodeURIComponent(lines.join("\n"));
    });
  }

  function fillSlot(id, slot, ratio, priority) {
    var node = document.getElementById(id);
    if (node) node.innerHTML = Images.img(slot, { ratio: ratio, priority: priority });
  }

  function mountStayList() {
    var list = document.getElementById("stay-list");
    if (!list) return;
    list.innerHTML = P.rooms.map(function (room, index) {
      return (
        '<article class="room-tile reveal">' +
          '<a class="room-tile__photo" href="' + roomHref(room.id) + '">' +
            Images.img(room.image, { ratio: "3x2" }) +
            '<span class="room-tile__no">Stay · ' + String(index + 1).padStart(2, "0") + "</span>" +
          "</a>" +
          '<div class="room-tile__body">' +
            "<h2>" + room.name + "</h2>" +
            amenitiesHtml(AMENITIES, false) +
            '<div class="room-tile__foot">' +
              '<span class="room-tile__rate">' + money(room.rate) + " <small>a night</small></span>" +
              '<a class="book" href="' + roomHref(room.id) + '">View this room</a>' +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
    var shared = document.getElementById("stay-shared");
    if (shared) {
      shared.textContent = P.stay.breakfast + ". " + P.stay.internet + ". " + P.stay.leisure + ". Check-in " + P.stay.checkIn + ", check-out " + P.stay.checkOut + ". " + P.stay.deposit;
    }
  }

  var EXP_ICONS = {
    reception: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M3 17h18"/><path d="M4 21h16"/><path d="M12 10V8"/><circle cx="12" cy="7" r="1"/></svg>',
    accommodation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-7"/><path d="M3 15h18v3"/><path d="M3 15v-1.5A2.5 2.5 0 0 1 5.5 11h8A5.5 5.5 0 0 1 19 16.5"/><circle cx="7.5" cy="8.5" r="1.7"/></svg>',
    lounge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"/><path d="M4 14a2 2 0 0 1 4 0v1h8v-1a2 2 0 0 1 4 0v4H4v-4z"/><path d="M6 21v-3M18 21v-3"/></svg>',
    table: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18a7 7 0 0 1 14 0"/><path d="M3 18h18"/><path d="M4 21h16"/><path d="M12 11V9.5"/><circle cx="12" cy="8.5" r="0.8"/></svg>',
    skydeck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 15c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><path d="M2 20c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><circle cx="17.5" cy="6" r="2.3"/><path d="M17.5 1v1.2M22 6h-1.2M13 6h1.2"/></svg>',
    rooftop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
    festcave: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3a9 9 0 0 1 6.4 2.7"/></svg>',
    prive: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4.5"/><path d="M11.3 11.7L20 3"/><path d="M16.5 6.5l2.5 2.5M14 9l2 2"/></svg>',
    chidera: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M15.3 5.3a3.2 3.2 0 0 1 0 5.6M17.2 14.9a5.5 5.5 0 0 1 3.3 5.1"/></svg>'
  };

  function mountExperiences() {
    var root = document.getElementById("experience-list");
    if (!root) return;
    var links = {
      accommodation: '<p><a class="book" href="stay.html">See the rooms</a></p>',
      chidera: '<p><a class="book" href="chidera-hall.html">Enquire for the hall</a></p>'
    };
    root.innerHTML = P.experiences.map(function (item, index) {
      var alt = index % 2 === 1 ? " exp-full--alt" : "";
      return (
        '<article class="exp-full' + alt + '" id="' + item.id + '">' +
          '<div class="exp-full__bg">' + Images.img(item.image) + "</div>" +
          '<div class="exp-full__shade"></div>' +
          '<div class="wrap exp-full__content"><div class="exp-full__inner">' +
            '<p class="label">Experience ' + String(index + 1).padStart(2, "0") + " of 09</p>" +
            '<span class="exp-full__icon">' + (EXP_ICONS[item.id] || "") + "</span>" +
            "<h2>" + item.name + "</h2>" +
            "<p>" + item.sentence + "</p>" +
            (links[item.id] || "") +
          "</div></div>" +
        "</article>"
      );
    }).join("");
  }

  function mountSky() {
    var root = document.getElementById("sky-gallery");
    if (!root || !Images) return;
    root.innerHTML =
      '<div class="sky-gallery__main reveal">' +
        Images.img("experience.sky.pool") +
      "</div>" +
      '<div class="sky-gallery__col">' +
        '<div class="sky-anim sky-anim--top reveal">' + Images.img("experience.sky.lounge") + "</div>" +
        '<div class="sky-anim sky-anim--bottom reveal">' + Images.img("experience.sky.seating") + "</div>" +
      "</div>";
  }

  function fillTokens() {
    var map = {
      checkIn: P.stay.checkIn,
      checkOut: P.stay.checkOut,
      deposit: P.stay.deposit,
      address: P.address.lines.join(", "),
      email: P.email,
      phones: P.phones.map(function (phone) { return phone.display; }).join(" | "),
      guests: P.stay.guests + " guests",
      breakfastHours: P.dining.breakfast,
      dinnerHours: P.dining.dinner,
      brunchHours: P.dining.brunch
    };
    document.querySelectorAll("[data-fill]").forEach(function (node) {
      var value = map[node.getAttribute("data-fill")];
      if (value) node.textContent = value;
    });
  }

  function mountAboutExp() {
    var node = document.getElementById("about-exp");
    if (!node) return;
    node.innerHTML = P.experiences.map(function (item, index) {
      return '<li><a href="experiences.html#' + item.id + '"><span>' + String(index + 1).padStart(2, "0") + "</span>" + item.name + "</a></li>";
    }).join("");
  }

  fillSlot("intro-photo", "home.intro", "4x5");
  fillSlot("table-photo", "experience.table", "3x2");
  fillSlot("chidera-photo", "experience.chidera", "3x2", true);
  fillSlot("chidera-celebration", "chidera.celebration", "3x2");
  fillSlot("chidera-conference", "chidera.conference", "3x2");
  fillSlot("chidera-meeting", "chidera.meeting", "3x2");
  fillSlot("chidera-form-photo", "chidera.celebration", "3x2");
  fillSlot("about-photo", "home.hero", "3x2", true);
  mountStayList();
  mountExperiences();
  mountAboutExp();
  fillTokens();
  mountHero();
  mountRoomSequence();
  mountEvening();
  mountSky();
  mountRoomPage();
  mountEnquire();
  reveal();
})();
