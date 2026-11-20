/* Portsmouth photographs. Pages call a slot name; swap a picture by changing the file here.
 * Original hotel photos live under assets/img/portsmouth/.
 * Chidera Hall and Festcave still use Silkwood stand-ins until Portsmouth supplies those spaces.
 */
(function (global) {
  var slots = {
    "home.hero": {
      file: "portsmouth/building/exterior.jpg",
      alt: "The cream and gold facade of Portsmouth Villa Hotel & Suites with flags at the entrance",
      focus: "50% 45%"
    },
    "home.intro": {
      file: "portsmouth/reception/desk.jpg",
      alt: "The reception desk with gold pendant lights, marble flooring and a lounge beyond",
      focus: "55% 50%"
    },
    "experience.reception": {
      file: "portsmouth/reception/lobby.jpg",
      alt: "The lobby lounge beside reception with armchairs and a curved staircase",
      focus: "45% 50%"
    },
    "room.royal": {
      file: "portsmouth/rooms/royal/bed.jpg",
      alt: "A Portsmouth Royal bedroom with a carved wood headboard and purple accent lighting",
      focus: "45% 50%"
    },
    "room.royal.desk": {
      file: "portsmouth/rooms/royal/desk.jpg",
      alt: "A work desk with a wall-mounted screen and embroidered hotel towels on the bed",
      focus: "50% 55%"
    },
    "room.diplomatic": {
      file: "portsmouth/rooms/diplomatic/bed.jpg",
      alt: "A Diplomatic Room bed with gold-embroidered pillows and a lit wood headboard",
      focus: "50% 50%"
    },
    "room.diplomatic.sitting": {
      file: "portsmouth/rooms/diplomatic/angle-a.jpg",
      alt: "A Diplomatic Room view showing the bed, desk area and room lighting",
      focus: "50% 50%"
    },
    "room.diplomatic.view": {
      file: "portsmouth/rooms/diplomatic/angle-b.jpg",
      alt: "Another angle of the Diplomatic Room with desk, screen and seating",
      focus: "50% 55%"
    },
    "room.diplomatic.overview": {
      file: "portsmouth/rooms/diplomatic/overview.jpg",
      alt: "Overview of the Diplomatic Room",
      focus: "50% 50%"
    },
    "room.ambassadorial": {
      file: "portsmouth/rooms/ambassadorial/suite-b.jpg",
      alt: "An Ambassadorial Suite with a gold bed runner, ottoman and round sitting table",
      focus: "50% 50%"
    },
    "room.ambassadorial.bed": {
      file: "portsmouth/rooms/ambassadorial/suite-d.jpg",
      alt: "The Ambassadorial Suite bedroom with a diamond-pattern wood headboard",
      focus: "50% 50%"
    },
    "room.ambassadorial.sitting": {
      file: "portsmouth/rooms/ambassadorial/suite-a.jpg",
      alt: "Ambassadorial Suite sitting and sleeping space in one open room",
      focus: "50% 55%"
    },
    "room.ambassadorial.desk": {
      file: "portsmouth/rooms/ambassadorial/suite-c.jpg",
      alt: "Ambassadorial Suite desk and entertainment wall",
      focus: "50% 55%"
    },
    "room.senatorial": {
      file: "portsmouth/rooms/senatorial/bedroom.jpg",
      alt: "The Senatorial Suite bedroom with blue cove lighting and a carved headboard",
      focus: "50% 48%"
    },
    "room.senatorial.bed": {
      file: "portsmouth/rooms/senatorial/bedroom-2.jpg",
      alt: "A wider view of the Senatorial Suite bedroom",
      focus: "50% 50%"
    },
    "room.senatorial.parlor": {
      file: "portsmouth/rooms/senatorial/parlor-a.jpg",
      alt: "The Senatorial Suite parlor with lounge seating",
      focus: "50% 50%"
    },
    "room.senatorial.parlor2": {
      file: "portsmouth/rooms/senatorial/parlor-b.jpg",
      alt: "Another view of the Senatorial Suite parlor",
      focus: "50% 50%"
    },
    "experience.table": {
      file: "portsmouth/dining/table-a.jpg",
      alt: "The Villa Table dining room with a set table and gold buffet service",
      focus: "50% 55%"
    },
    "experience.table.buffet": {
      file: "portsmouth/dining/table-b.jpg",
      alt: "Villa Table buffet counter with gold serving dishes and juice service",
      focus: "50% 50%"
    },
    "experience.chidera": {
      file: "placeholder/meeting-space/silkwood-151.jpg",
      alt: "A meeting room with long tables, chairs and notepads set for a session",
      focus: "50% 60%"
    },
    "experience.sky.lounge": {
      file: "portsmouth/skydeck/bar-a.jpg",
      alt: "Skydeck Pool & Bar seating under green wall planting",
      focus: "50% 50%"
    },
    "experience.sky.seating": {
      file: "portsmouth/skydeck/bar-b.jpg",
      alt: "Skydeck lounge seating beside the pool deck",
      focus: "50% 55%"
    },
    "experience.sky.pool": {
      file: "portsmouth/skydeck/pool.jpg",
      alt: "The Skydeck swimming pool with a waterfall spout and turf-clad walls",
      focus: "50% 55%"
    },
    "experience.sky.table": {
      file: "portsmouth/skydeck/vip.jpg",
      alt: "VIP seating at the Skydeck Pool & Bar",
      focus: "50% 50%"
    },
    "evening.rooftop": {
      file: "portsmouth/rooftop/vibe-a.jpg",
      alt: "Rooftop Vibe seating and evening lights on the roof",
      focus: "50% 50%"
    },
    "evening.rooftop.alt": {
      file: "portsmouth/rooftop/vibe-b.jpg",
      alt: "Another view of the rooftop terrace",
      focus: "50% 55%"
    },
    "evening.festcave": {
      file: "placeholder/pool-bar/silkwood-120.jpg",
      alt: "A nightlife room with music and evening seating",
      focus: "50% 58%"
    },
    "evening.prive": {
      file: "portsmouth/prive/prive-1.jpg",
      alt: "Portsmouth Privé lounge seating with gold wall details",
      focus: "50% 50%"
    },
    "evening.prive.bar": {
      file: "portsmouth/prive/prive-3.jpg",
      alt: "The Portsmouth Privé VIP bar area",
      focus: "50% 50%"
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
      file: "portsmouth/lounge/lounge-a.jpg",
      alt: "Portsmouth Lounge with sofas, coffee tables and warm lighting",
      focus: "50% 50%"
    },
    "experience.lounge.alt": {
      file: "portsmouth/lounge/lounge-b.jpg",
      alt: "Another view of the Portsmouth Lounge",
      focus: "50% 55%"
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
