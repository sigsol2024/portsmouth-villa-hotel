/* Temporary photographs copied from Silkwood images/hotel.
 * Pages call a slot name. Swap a picture by changing file here.
 * Alt text describes the scene and does not name either hotel.
 */
(function (global) {
  var slots = {
    "home.hero": {
      file: "placeholder/reception/silkwood-100.jpg",
      alt: "An arrival lounge with a sofa, armchairs and glass entrance doors",
      focus: "30% 60%"
    },
    "home.intro": {
      file: "placeholder/rooms/executive/silkwood-171.jpg",
      alt: "A suite sitting room with a round table, a sofa and a gold-pattern carpet",
      focus: "50% 55%"
    },
    "room.royal": {
      file: "placeholder/rooms/classic/silkwood-4.jpg",
      alt: "A guest room with a made bed, a dark desk and a gold-patterned wall",
      focus: "60% 55%"
    },
    "room.diplomatic": {
      file: "placeholder/rooms/executive/silkwood-179.jpg",
      alt: "A bedroom with white linen against a black and gold patterned wall",
      focus: "50% 55%"
    },
    "room.ambassadorial": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-207.jpg",
      alt: "A sitting room with a sofa, a round table, a desk and a wall-mounted screen",
      focus: "50% 55%"
    },
    "room.senatorial": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-221.jpg",
      alt: "A wide bed with white linen, bedside lamps and sheer curtains",
      focus: "50% 60%"
    },
    "experience.table": {
      file: "placeholder/restaurant/silkwood-74.jpg",
      alt: "A dining room with tables laid with white linen and folded napkins",
      focus: "50% 60%"
    },
    "experience.chidera": {
      file: "placeholder/meeting-space/silkwood-151.jpg",
      alt: "A meeting room with long tables, chairs and notepads set for a session",
      focus: "50% 60%"
    },
    "experience.sky.lounge": {
      file: "placeholder/pool-bar/silkwood-110.jpg",
      alt: "Lounge seating under a thatched roof strung with warm lights",
      focus: "50% 55%"
    },
    "experience.sky.seating": {
      file: "placeholder/pool-bar/silkwood-111.jpg",
      alt: "Tables and sofas beside the pool under a thatched roof",
      focus: "40% 62%"
    },
    "experience.sky.pool": {
      file: "placeholder/pool-bar/silkwood-112.jpg",
      alt: "A swimming pool beside shaded tables and lounge chairs",
      focus: "62% 72%"
    },
    "experience.sky.table": {
      file: "placeholder/pool-bar/silkwood-120.jpg",
      alt: "A pool table under a thatched roof with string lights",
      focus: "50% 58%"
    },
    "evening.rooftop": {
      file: "placeholder/pool-bar/silkwood-117.jpg",
      alt: "Outdoor lounge chairs under thatched umbrellas beside palm plants",
      focus: "30% 60%"
    },
    "evening.festcave": {
      file: "placeholder/pool-bar/silkwood-120.jpg",
      alt: "A pool table under a thatched roof strung with warm lights",
      focus: "50% 58%"
    },
    "evening.prive": {
      file: "placeholder/restaurant/silkwood-70.jpg",
      alt: "A private dining room with tables set, curtains and warm shelving",
      focus: "50% 55%"
    },
    "chidera.celebration": {
      file: "placeholder/main-hall/silkwood-160.jpg",
      alt: "A hall set with round tables, white cloths and gold-sashed chairs",
      focus: "50% 58%"
    },
    "chidera.conference": {
      file: "placeholder/main-hall/silkwood-154.jpg",
      alt: "A hall set in rows with tables, chairs and water for a conference",
      focus: "50% 55%"
    },
    "chidera.meeting": {
      file: "placeholder/conference-hall/silkwood-124.jpg",
      alt: "A meeting table arranged in a square with notes and water",
      focus: "50% 58%"
    },
    "experience.lounge": {
      file: "placeholder/reception/silkwood-86.jpg",
      alt: "A lounge with armchairs, sofas, shelves and plants",
      focus: "50% 55%"
    },
    "room.royal.bed": {
      file: "placeholder/rooms/classic/silkwood-12.jpg",
      alt: "A made bed against a black and gold patterned wall with lamps",
      focus: "50% 55%"
    },
    "room.royal.desk": {
      file: "placeholder/rooms/classic/silkwood-5.jpg",
      alt: "A desk, wardrobe and the edge of a bed in a guest room",
      focus: "45% 55%"
    },
    "room.royal.bath": {
      file: "placeholder/rooms/classic/silkwood-8.jpg",
      alt: "A marble bathroom with a basin, mirror and shower",
      focus: "50% 55%"
    },
    "room.diplomatic.sitting": {
      file: "placeholder/rooms/executive/silkwood-175.jpg",
      alt: "A sitting area with a screen, armchairs and a round table",
      focus: "50% 55%"
    },
    "room.diplomatic.bath": {
      file: "placeholder/rooms/executive/silkwood-190.jpg",
      alt: "A marble bathroom with a glass shower and a dark stone basin",
      focus: "50% 55%"
    },
    "room.ambassadorial.bed": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-216.jpg",
      alt: "A bed, desk and wall-mounted screen in a suite",
      focus: "50% 55%"
    },
    "room.ambassadorial.sitting": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-203.jpg",
      alt: "A suite sitting room with a sofa, round table and desk",
      focus: "50% 55%"
    },
    "room.senatorial.bed": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-224.jpg",
      alt: "A bed with sheer curtains and a desk against a gold-patterned wall",
      focus: "50% 55%"
    },
    "room.senatorial.wardrobe": {
      file: "placeholder/rooms/diplomatic-suite/silkwood-210.jpg",
      alt: "Wardrobes and a tea point in a suite",
      focus: "45% 55%"
    }
  };

  function img(slot, options) {
    var image = slots[slot];
    if (!image) return "";
    options = options || {};
    var ratio = options.ratio ? " media--" + options.ratio : "";
    var eager = options.priority ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"';
    return (
      '<div class="media' + ratio + '">' +
      '<img src="assets/img/' + image.file + '" alt="' + image.alt + '"' +
      ' style="object-position:' + image.focus + '"' + eager + ">" +
      "</div>"
    );
  }

  global.PortsmouthImages = { slots: slots, img: img };
})(window);
