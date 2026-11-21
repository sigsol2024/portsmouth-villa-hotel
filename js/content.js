/* Portsmouth Villa Hotel & Suites
 * One record for names, stay details, and copy.
 * Stand-in rates, the deposit, check-in, and the address are working figures.
 * Replace or delete them here. Every page reads this file.
 * Homepage uses the general Portsmouth StayEazi calendar widget.
 * Room pages use the same widget UI, then redirect into that room's reservation URL with the chosen dates.
 */
(function (global) {
  var STAYEAZI = "https://app.stayeazi.com/reservation/portsmouth-villa-hotel-suites";

  global.Portsmouth = {
    name: "Portsmouth Villa Hotel & Suites",
    short: "Portsmouth",
    lines: {
      headline: "In the city of Onitsha, one destination.",
      rhythm: "Stay. Dine. Relax. Celebrate. Connect. Experience. Belong.",
      promise: "Your royal comfort starts in the heart of Onitsha.",
      value: "Every guest deserves royal treatment and exceptional value."
    },
    address: {
      lines: ["No. 4, 6 & 8 Obinwe Street", "Fegge, Onitsha"],
      short: "Obinwe Street, Fegge, Onitsha"
    },
    phones: [
      { display: "0806 146 3304", tel: "+2348061463304" },
      { display: "0806 094 0609", tel: "+2348060940609" }
    ],
    email: "portsmouthvillahotels@gmail.com",
    stayeazi: {
      token: "nAEa2ceqfGNsXdXq2zRCvbxhRuye91Mz",
      note: "Portsmouth Villa Hotel & Suites StayEazi property widget."
    },
    stay: {
      checkIn: "14:00",
      checkOut: "12:00",
      guests: 2,
      deposit: "One night to confirm the booking.",
      breakfast: "Complimentary breakfast for one",
      internet: "High-speed internet",
      leisure: "Access to the hotel’s leisure and entertainment",
      inRoom: [
        "Air conditioning",
        "Ensuite bathroom",
        "Television",
        "Tea and coffee",
        "Work area",
        "In-room safe"
      ]
    },
    dining: {
      breakfast: "07:00 – 10:30",
      dinner: "18:30 – 22:00",
      brunch: "Sundays",
      note: "Working meal times. Replace when the hotel confirms service hours."
    },
    rooms: [
      {
        id: "royal",
        name: "Portsmouth Royal",
        line: "Comfort, privacy, neatness and excellent service.",
        sentence:
          "The Portsmouth Royal is for guests who want comfort, privacy, neatness and excellent service. It suits business travellers, couples, leisure guests and short stays that want quality without unnecessary extravagance.",
        rate: 45000,
        rateNote: "Stand-in nightly rate. Replace or remove.",
        image: "room.royal",
        gallery: ["room.royal", "room.royal.desk"],
        bookUrl: STAYEAZI + "/portsmouth-royal"
      },
      {
        id: "diplomatic",
        name: "Diplomatic Room",
        line: "Sophistication, privacy and refined hospitality.",
        sentence:
          "The Diplomatic Room is a more elevated stay for executives, corporate travellers, professionals and distinguished visitors who want sophistication, privacy and refined hospitality.",
        rate: 65000,
        rateNote: "Stand-in nightly rate. Replace or remove.",
        image: "room.diplomatic",
        gallery: ["room.diplomatic", "room.diplomatic.sitting", "room.diplomatic.view", "room.diplomatic.overview"],
        bookUrl: STAYEAZI + "/diplomatic-room"
      },
      {
        id: "ambassadorial",
        name: "Ambassadorial Suite",
        line: "A further level of comfort and distinction.",
        sentence:
          "The Ambassadorial Suite is for senior executives, VIP guests, special occasions and memorable stays. It offers a further level of comfort and distinction.",
        rate: 95000,
        rateNote: "Stand-in nightly rate. Replace or remove.",
        image: "room.ambassadorial",
        gallery: ["room.ambassadorial", "room.ambassadorial.bed", "room.ambassadorial.sitting", "room.ambassadorial.desk"],
        bookUrl: STAYEAZI + "/ambassadorial-suite"
      },
      {
        id: "senatorial",
        name: "Senatorial Suite",
        line: "The highest stay at Portsmouth.",
        sentence:
          "The Senatorial Suite is the highest stay at Portsmouth, for VIPs, high-profile travellers, executives and guests marking a significant occasion.",
        rate: 150000,
        rateNote: "Stand-in nightly rate. Replace or remove.",
        image: "room.senatorial",
        gallery: ["room.senatorial", "room.senatorial.bed", "room.senatorial.parlor", "room.senatorial.parlor2"],
        bookUrl: STAYEAZI + "/senatorial-suite"
      }
    ],
    experiences: [
      {
        id: "reception",
        name: "The Reception",
        sentence:
          "The stay begins on arrival, with a warm, professional front of house and a clear first impression.",
        image: "experience.reception"
      },
      {
        id: "accommodation",
        name: "Accommodation",
        sentence:
          "Rooms and suites arranged for comfort, privacy and different kinds of stay.",
        image: "room.royal"
      },
      {
        id: "lounge",
        name: "Portsmouth Lounge",
        sentence:
          "A comfortable room for conversation, a meeting, or an unhurried hour.",
        image: "experience.lounge"
      },
      {
        id: "table",
        name: "The Villa Table",
        sentence:
          "Dining for one guest, a family, a couple, or a corporate table. Good food and an inviting room.",
        image: "experience.table"
      },
      {
        id: "skydeck",
        name: "Skydeck Pool & Bar",
        sentence:
          "An elevated place to sit by the pool, take a drink, and step away from the city for a while.",
        image: "experience.sky.pool"
      },
      {
        id: "rooftop",
        name: "Rooftop Vibe",
        sentence:
          "Food, music, drinks and company, on the roof, for guests who want the city’s energy.",
        image: "evening.rooftop"
      },
      {
        id: "festcave",
        name: "Festcave Club",
        sentence:
          "When the evening comes alive, Festcave Club is the nightlife room: music, entertainment and a full night.",
        image: "evening.festcave"
      },
      {
        id: "prive",
        name: "The Portsmouth Privé",
        sentence:
          "A private setting for a celebration, an intimate gathering, or a moment kept away from the crowd.",
        image: "evening.prive"
      },
      {
        id: "chidera",
        name: "Chidera Hall",
        sentence:
          "Weddings, birthdays, conferences, corporate events, meetings and celebrations, for about 150 guests.",
        image: "experience.chidera",
        capacity: "About 150 guests"
      }
    ],
    leaders: [
      {
        name: "Chief Amb. Festus Okolie Udungwo",
        role: "Owner and Chief Executive Officer"
      },
      {
        name: "Rev. Amb. Zeal Festus Okolie",
        role: "Managing Director"
      }
    ],
    ambassador: {
      name: "Deborah Okolie",
      known: "KamDebbie",
      sentence:
        "Deborah Okolie, known as KamDebbie, is the brand ambassador. The partnership joins a young entertainer’s audience with the hotel’s hospitality: youth, entertainment and a stay in Onitsha."
    }
  };
})(window);
