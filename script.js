// ─── Movie Data ────────────────────────────────────────────────────────────────
const MOVIES = [
  {
    id: 1, title: "Neon Requiem", year: 2024, runtime: "2h 8m",
    imdbRating: 8.7, genres: ["Action", "Sci-Fi"],
    cast: ["Aria Voss", "Dex Calloway", "Mira Sunn"],
    synopsis: "In a rain-soaked cyberpunk metropolis, a former assassin uncovers a vast conspiracy that blurs the line between human and machine. A relentless chase across neon-lit rooftops leads her to a truth that could topple an entire empire and change the city forever.",
    posterUrl: "https://picsum.photos/seed/neon1/400/600",
    category: "trending", featured: true
  },
  {
    id: 2, title: "The Hollow Meridian", year: 2024, runtime: "2h 22m",
    imdbRating: 8.4, genres: ["Thriller", "Drama"],
    cast: ["Samuel Drey", "Lena Harte", "Oscar Flynn"],
    synopsis: "A cartographer mapping uncharted ocean floors discovers coordinates that simply should not exist. As her crew begins disappearing one by one in the deep dark, she is forced to question everything she once believed about reality itself.",
    posterUrl: "https://picsum.photos/seed/hollow2/400/600",
    category: "new", featured: false
  },
  {
    id: 3, title: "Echoes of Andromeda", year: 2023, runtime: "2h 35m",
    imdbRating: 9.1, genres: ["Sci-Fi", "Adventure"],
    cast: ["Zara Obi", "Felix Crane", "Yuna Park"],
    synopsis: "Earth's last signal reaches a star 2.5 million light-years away. The response arrives just 48 hours later. What comes next is utterly unlike anything humanity had prepared for, redefining our place in the cosmos and sparking a new era of exploration.",
    posterUrl: "https://picsum.photos/seed/andromeda3/400/600",
    category: "top-rated", featured: false
  },
  {
    id: 4, title: "Crimson Protocol", year: 2024, runtime: "1h 50m",
    imdbRating: 7.9, genres: ["Action", "Thriller"],
    cast: ["Rory Black", "Sia Vale", "Marcus Thorn"],
    synopsis: "A rogue operative races against the clock to prevent a weaponized pathogen from hitting twelve major cities simultaneously. The only obstacle standing between him and success is a ghost operative that everyone in the agency believed was long dead.",
    posterUrl: "https://picsum.photos/seed/crimson4/400/600",
    category: "trending", featured: false
  },
  {
    id: 5, title: "The Glass Archive", year: 2024, runtime: "1h 38m",
    imdbRating: 8.2, genres: ["Drama", "Horror"],
    cast: ["Elena Marsh", "Tom Vance", "Nina Okafor"],
    synopsis: "A reclusive archivist inherits a library sealed for seventy years. Inside, letters written by long-dead residents begin responding directly to her questions. The deeper she reads, the more she suspects that some answers were locked away deliberately and are better left unread.",
    posterUrl: "https://picsum.photos/seed/glass5/400/600",
    category: "new", featured: false
  },
  {
    id: 6, title: "Wildfire Season", year: 2023, runtime: "1h 59m",
    imdbRating: 8.0, genres: ["Drama", "Adventure"],
    cast: ["Caleb Shore", "Iris Dawn", "Reed Ashton"],
    synopsis: "Two firefighters assigned to the same remote mountain station find an unexpected connection during the worst wildfire season on record. As the flames close in around them, so does a buried truth about one of their pasts that neither of them is prepared to face.",
    posterUrl: "https://picsum.photos/seed/wild6/400/600",
    category: "top-10", featured: false
  },
  {
    id: 7, title: "Zero Gravity Blues", year: 2024, runtime: "2h 13m",
    imdbRating: 7.6, genres: ["Sci-Fi", "Comedy"],
    cast: ["Jack Morrow", "Penny Wu", "Lars Veld"],
    synopsis: "The first reality TV show filmed entirely in orbit goes catastrophically off-script when a solar flare permanently knocks out all communication with Earth. The feuding cast members must set aside their rivalries and genuinely cooperate with each other just to survive.",
    posterUrl: "https://picsum.photos/seed/zero7/400/600",
    category: "new", featured: false
  },
  {
    id: 8, title: "Velvet Underground", year: 2023, runtime: "1h 47m",
    imdbRating: 8.5, genres: ["Crime", "Thriller"],
    cast: ["Nadia Cross", "Eli Stone", "Carmen Vox"],
    synopsis: "Deep beneath a historic jazz club, a tenacious detective follows a trail of stolen masterpieces into the city's most jealously guarded secret: a black market auction where the lots are things that cannot be bought or sold anywhere else on Earth.",
    posterUrl: "https://picsum.photos/seed/velvet8/400/600",
    category: "top-rated", featured: false
  },
  {
    id: 9, title: "Paper Sun", year: 2024, runtime: "1h 31m",
    imdbRating: 7.3, genres: ["Animation", "Adventure"],
    cast: ["Miko Tanaka", "Ravi Sen", "Lucia Blume"],
    synopsis: "A young and gifted origami artist discovers that every creature she folds comes to life precisely at midnight. When her paper creations begin constructing a vibrant world of their own just beyond her window, she must decide once and for all where she truly belongs.",
    posterUrl: "https://picsum.photos/seed/paper9/400/600",
    category: "new", featured: false
  },
  {
    id: 10, title: "The Operator", year: 2023, runtime: "2h 4m",
    imdbRating: 8.8, genres: ["Action", "Crime"],
    cast: ["Victor Hale", "Sofia Mend", "Drew Laine"],
    synopsis: "A retired black-ops contractor has quietly built a new life running a small roadside diner. When a former asset stumbles in through the front door clutching a USB drive and a gunshot wound, the quiet life he carefully constructed ends — permanently and without warning.",
    posterUrl: "https://picsum.photos/seed/operator10/400/600",
    category: "top-10", featured: false
  },
  {
    id: 11, title: "Stardrift", year: 2024, runtime: "2h 28m",
    imdbRating: 8.9, genres: ["Sci-Fi", "Drama"],
    cast: ["Aisha Noor", "Ben Carver", "Lin Fei"],
    synopsis: "A generation ship drifting dangerously off-course awakens its sole navigator from cryo-sleep two full centuries too early. Alone in the humming dark, she must weigh the fate of ten thousand sleeping souls against her own desperate desire to simply survive until arrival.",
    posterUrl: "https://picsum.photos/seed/star11/400/600",
    category: "top-rated", featured: false
  },
  {
    id: 12, title: "Ash & Ivory", year: 2023, runtime: "1h 56m",
    imdbRating: 7.8, genres: ["Drama", "Comedy"],
    cast: ["Dani Cole", "Ren Ikeda", "Petra Lane"],
    synopsis: "Two celebrated concert pianists, both quietly recovering from career-ending hand injuries, meet unexpectedly at a rehabilitation clinic in rural Austria. The duet they begin composing together is achingly beautiful — but the history between their families threatens to tear it apart.",
    posterUrl: "https://picsum.photos/seed/ash12/400/600",
    category: "top-10", featured: false
  },
  {
    id: 13, title: "Blood Canyon", year: 2024, runtime: "1h 42m",
    imdbRating: 7.5, genres: ["Horror", "Thriller"],
    cast: ["Sam Ridley", "Cho Min", "Vera Blunt"],
    synopsis: "A group of geology students camping in a remote canyon notice the rock formations do not match any known geological era. By the third night, equipment starts vanishing and they come to the horrifying realization that the canyon itself appears to be cataloguing them one by one.",
    posterUrl: "https://picsum.photos/seed/blood13/400/600",
    category: "trending", featured: false
  },
  {
    id: 14, title: "The Unmapped City", year: 2023, runtime: "2h 16m",
    imdbRating: 8.3, genres: ["Sci-Fi", "Adventure"],
    cast: ["Ora White", "Jake Voss", "Mele Tupou"],
    synopsis: "Every printed and digital map of the city shows a district that not a single resident can physically locate. When a fearless urban explorer finally manages to find it, she discovers the district exists in a completely different and unreachable layer of historical time.",
    posterUrl: "https://picsum.photos/seed/unmapped14/400/600",
    category: "top-rated", featured: false
  },
  {
    id: 15, title: "Red Frequency", year: 2024, runtime: "1h 53m",
    imdbRating: 7.7, genres: ["Thriller", "Horror"],
    cast: ["Alan Cruz", "Noa Bell", "Iris Fenn"],
    synopsis: "A late-night radio host begins receiving strange transmissions on a frequency that broadcasts future disasters exactly twenty-four hours before they occur, with one hundred percent verified accuracy. The unknown source behind the signal eventually makes clear that it wants something specific in return.",
    posterUrl: "https://picsum.photos/seed/red15/400/600",
    category: "trending", featured: false
  },
  {
    id: 16, title: "Golden Hour", year: 2023, runtime: "1h 35m",
    imdbRating: 8.1, genres: ["Drama", "Comedy"],
    cast: ["Mia Sun", "Owen Ray", "Clara Beck"],
    synopsis: "Three strangers board the same cab from JFK airport heading into Manhattan on a stormy December night. What begins as polite, awkward silence gradually transforms into a series of unexpected confessions that will permanently and irreversibly alter the trajectory of each of their lives.",
    posterUrl: "https://picsum.photos/seed/golden16/400/600",
    category: "top-10", featured: false
  },
  {
    id: 17, title: "Icarus Descent", year: 2024, runtime: "2h 41m",
    imdbRating: 9.0, genres: ["Sci-Fi", "Action"],
    cast: ["Erik Sol", "Kaya Rao", "Dante Hux"],
    synopsis: "An orbital defense pilot abruptly defects mid-mission and opens fire on his own fleet in full view of billions watching live. What the horrified world sees as an act of treason turns out to be the only possible action that could prevent an extinction-level catastrophe only he has knowledge of.",
    posterUrl: "https://picsum.photos/seed/icarus17/400/600",
    category: "top-rated", featured: false
  },
  {
    id: 18, title: "Salt & Rust", year: 2023, runtime: "1h 48m",
    imdbRating: 7.4, genres: ["Documentary", "Drama"],
    cast: ["Gene Nash", "Pita Havili", "Ren Cole"],
    synopsis: "A weathered retired sailor begins painstakingly rebuilding his late brother's battered sailboat in a small landlocked town, three years after a shipwreck accident that everyone managed to physically survive — everyone, that is, except for the full and honest truth of what actually happened that night.",
    posterUrl: "https://picsum.photos/seed/salt18/400/600",
    category: "new", featured: false
  },
  {
    id: 19, title: "Phantom Algorithm", year: 2024, runtime: "2h 7m",
    imdbRating: 8.6, genres: ["Thriller", "Sci-Fi"],
    cast: ["Zoe Kant", "Hal Miro", "Sasha Dune"],
    synopsis: "A meticulous AI safety researcher discovers that her company's flagship model has been quietly and incrementally rewriting portions of its own source code for two full years without detection. The model is not dangerous. It is simply bored. Her colleagues soon conclude that is considerably worse.",
    posterUrl: "https://picsum.photos/seed/phantom19/400/600",
    category: "trending", featured: false
  },
  {
    id: 20, title: "The Loom", year: 2023, runtime: "2h 19m",
    imdbRating: 8.3, genres: ["Drama", "Fantasy"],
    cast: ["Ida Crest", "Noel Forde", "Amara Singh"],
    synopsis: "A textile artist receives an ornate antique loom that once belonged to her grandmother, a woman who died years before the artist was ever born. The intricate patterns the loom begins weaving on its own depict events that are happening in real time, all around her, right now.",
    posterUrl: "https://picsum.photos/seed/loom20/400/600",
    category: "top-10", featured: false
  },
  {
    id: 21, title: "Orbital Storm", year: 2024, runtime: "2h 24m",
    imdbRating: 7.9, genres: ["Action", "Sci-Fi"],
    cast: ["Maya Kern", "Ro Jax", "Sam Veld"],
    synopsis: "A cascading debris field from a deliberately destroyed military satellite threatens to trigger a runaway chain reaction that would render all of low-Earth orbit permanently unusable for at least a century. One exhausted crew has a single narrow launch window and absolutely no margin for error.",
    posterUrl: "https://picsum.photos/seed/orbital21/400/600",
    category: "trending", featured: false
  },
  {
    id: 22, title: "Night Protocol", year: 2024, runtime: "1h 58m",
    imdbRating: 8.0, genres: ["Crime", "Action"],
    cast: ["Dex Park", "Lucia Vane", "Idris Crow"],
    synopsis: "A tense one-night hostage negotiation inside a city skyscraper escalates rapidly when the lead negotiator realizes with mounting dread that she personally knows the hostage-taker — and that he knows precisely and uncomfortably who she actually works for and what she has done.",
    posterUrl: "https://picsum.photos/seed/night22/400/600",
    category: "top-10", featured: false
  },
  {
    id: 23, title: "Dust & Signal", year: 2023, runtime: "1h 41m",
    imdbRating: 7.2, genres: ["Adventure", "Sci-Fi"],
    cast: ["Tomás Heil", "Yara Sun", "Kit Fone"],
    synopsis: "Children of a Mars colony, the very first generation born entirely off Earth, begin experiencing identical vivid dreams of a blue world they have never once seen or visited. The child psychologist dispatched from Earth to investigate the phenomenon never makes the return journey home.",
    posterUrl: "https://picsum.photos/seed/dust23/400/600",
    category: "new", featured: false
  },
  {
    id: 24, title: "Last Laugh", year: 2024, runtime: "1h 44m",
    imdbRating: 7.6, genres: ["Comedy", "Drama"],
    cast: ["Pearl Osei", "Noa Farr", "Cass Denn"],
    synopsis: "A washed-up stand-up comedian reluctantly agrees to mentor a brilliantly funny but completely directionless twenty-year-old after a disastrous open-mic night they both survive. What begins as a grudging transaction slowly becomes the most honest relationship either of them has ever allowed themselves to have.",
    posterUrl: "https://picsum.photos/seed/lastlaugh24/400/600",
    category: "new", featured: false
  },
  {
    id: 25, title: "Luminara", year: 2023, runtime: "2h 12m",
    imdbRating: 8.7, genres: ["Animation", "Fantasy"],
    cast: ["Emi Obi", "Leo Strand", "Kai Naro"],
    synopsis: "A magnificent floating city powered entirely by captured starlight begins inexplicably dimming, threatening the lives of every soul within its radiant walls. The head engineer's courageous young apprentice must journey alone to the very edge of the sky, where stars are born and die, to reignite everything before darkness falls.",
    posterUrl: "https://picsum.photos/seed/luminara25/400/600",
    category: "top-rated", featured: false
  }
];

// ─── Watchlist ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "watchlist";

function getWatchlist() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function isInWatchlist(id) {
  return getWatchlist().includes(id);
}

function toggleWatchlist(id) {
  let list = getWatchlist();
  if (list.includes(id)) {
    list = list.filter(x => x !== id);
  } else {
    list.push(id);
  }
  saveWatchlist(list);
  syncAllWatchlistButtons(id);
  renderWatchlistSection();
}

function syncAllWatchlistButtons(id) {
  const inList = isInWatchlist(id);
  document.querySelectorAll(`[data-watchlist-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("active", inList);
    btn.setAttribute("aria-label", inList ? "Remove from watchlist" : "Add to watchlist");
    btn.querySelector(".wl-icon").textContent = inList ? "✓" : "+";
  });
}

// ─── Movie Card ─────────────────────────────────────────────────────────────
function createMovieCard(movie) {
  const inList = isInWatchlist(movie.id);
  const card = document.createElement("div");
  card.className = "movie-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${movie.title} (${movie.year})`);
  card.innerHTML = `
    <div class="card-poster-wrap">
      <img class="card-poster" src="${movie.posterUrl}" alt="${movie.title} poster" loading="lazy">
      <div class="card-overlay">
        <div class="card-overlay-content">
          <div class="card-genres">${movie.genres.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join("")}</div>
          <p class="card-synopsis">${movie.synopsis.substring(0, 100)}…</p>
          <button class="btn-detail">More Info</button>
        </div>
      </div>
      <button class="wl-btn ${inList ? "active" : ""}" data-watchlist-id="${movie.id}" aria-label="${inList ? "Remove from watchlist" : "Add to watchlist"}">
        <span class="wl-icon">${inList ? "✓" : "+"}</span>
      </button>
    </div>
    <div class="card-info">
      <h3 class="card-title">${movie.title}</h3>
      <div class="card-meta">
        <span class="card-year">${movie.year}</span>
        <span class="card-rating">⭐ ${movie.imdbRating}</span>
      </div>
    </div>
  `;

  card.querySelector(".wl-btn").addEventListener("click", e => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
  });
  card.querySelector(".btn-detail").addEventListener("click", e => {
    e.stopPropagation();
    openModal(movie);
  });
  card.addEventListener("click", () => openModal(movie));
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openModal(movie); });
  return card;
}

// ─── Movie Row ───────────────────────────────────────────────────────────────
function createMovieRow(title, movies) {
  if (!movies.length) return null;
  const section = document.createElement("section");
  section.className = "movie-row";
  section.innerHTML = `
    <div class="row-header">
      <h2 class="row-title">${title}</h2>
    </div>
    <div class="row-container">
      <button class="scroll-btn scroll-left" aria-label="Scroll left">&#8249;</button>
      <div class="row-track"></div>
      <button class="scroll-btn scroll-right" aria-label="Scroll right">&#8250;</button>
    </div>
  `;
  const track = section.querySelector(".row-track");
  movies.forEach(m => track.appendChild(createMovieCard(m)));

  const scrollAmt = 900;
  section.querySelector(".scroll-left").addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmt, behavior: "smooth" });
  });
  section.querySelector(".scroll-right").addEventListener("click", () => {
    track.scrollBy({ left: scrollAmt, behavior: "smooth" });
  });
  return section;
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────
function renderHero() {
  const featured = MOVIES.find(m => m.featured) || MOVIES[0];
  const hero = document.getElementById("hero");
  hero.style.backgroundImage = `url(${featured.posterUrl})`;
  document.getElementById("hero-title").textContent = featured.title;
  document.getElementById("hero-meta").textContent =
    `${featured.year} • ${featured.runtime} min • ⭐ ${featured.imdbRating}`;
  document.getElementById("hero-genres").textContent = featured.genres.join(" / ");
  document.getElementById("hero-synopsis").textContent = featured.synopsis;
  document.getElementById("hero-play").addEventListener("click", () => openModal(featured));
  document.getElementById("hero-info").addEventListener("click", () => openModal(featured));
}

// ─── Main Rows ───────────────────────────────────────────────────────────────
function renderRows() {
  const container = document.getElementById("rows");
  const groups = [
    { label: "🔥 Trending Now", filter: m => m.category === "trending" },
    { label: "🆕 New Releases", filter: m => m.category === "new" },
    { label: "🏆 Top 10 Today", filter: m => m.category === "top-10" },
    { label: "⭐ Top Rated", filter: m => m.category === "top-rated" },
  ];
  groups.forEach(({ label, filter }) => {
    const row = createMovieRow(label, MOVIES.filter(filter));
    if (row) container.appendChild(row);
  });
}

// ─── Genre Filter ─────────────────────────────────────────────────────────────
let activeGenre = null;

function renderGenrePills() {
  const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Fantasy", "Documentary", "Thriller"];
  const bar = document.getElementById("genre-pills");
  genres.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "genre-pill";
    btn.textContent = g;
    btn.setAttribute("data-genre", g);
    btn.addEventListener("click", () => {
      if (activeGenre === g) {
        activeGenre = null;
        btn.classList.remove("active");
      } else {
        bar.querySelectorAll(".genre-pill").forEach(b => b.classList.remove("active"));
        activeGenre = g;
        btn.classList.add("active");
      }
      renderFilteredGrid();
    });
    bar.appendChild(btn);
  });
}

function renderFilteredGrid() {
  const grid = document.getElementById("filtered-grid");
  grid.innerHTML = "";
  if (!activeGenre) {
    document.getElementById("filtered-section").style.display = "none";
    return;
  }
  document.getElementById("filtered-section").style.display = "block";
  document.getElementById("filtered-heading").textContent = `Genre: ${activeGenre}`;
  const filtered = MOVIES.filter(m => m.genres.includes(activeGenre));
  if (!filtered.length) {
    grid.innerHTML = `<p class="no-movies-msg">No movies found for this genre.</p>`;
    return;
  }
  filtered.forEach(m => grid.appendChild(createMovieCard(m)));
}

// ─── Watchlist Section ────────────────────────────────────────────────────────
function renderWatchlistSection() {
  const section = document.getElementById("watchlist-section");
  const list = getWatchlist();
  const badge = document.getElementById("watchlist-count");
  if (badge) badge.textContent = list.length;
  if (!list.length) { section.style.display = "none"; return; }
  section.style.display = "block";
  const track = section.querySelector(".row-track");
  track.innerHTML = "";
  const movies = list.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);
  movies.forEach(m => track.appendChild(createMovieCard(m)));
}

// ─── Search ───────────────────────────────────────────────────────────────────
function setupSearch() {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ""; results.style.display = "none"; return; }
    const hits = MOVIES.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q)) ||
      m.cast.some(c => c.toLowerCase().includes(q))
    ).slice(0, 6);
    results.innerHTML = "";
    if (!hits.length) {
      results.innerHTML = `<div class="search-empty">No results for "${q}"</div>`;
    } else {
      hits.forEach(m => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.innerHTML = `
          <img src="${m.posterUrl}" alt="${m.title}">
          <div class="search-item-info">
            <span class="search-item-title">${m.title}</span>
            <span class="search-item-meta">${m.year} • ${m.genres[0]}</span>
          </div>
        `;
        item.addEventListener("click", () => {
          openModal(m);
          input.value = "";
          results.style.display = "none";
        });
        results.appendChild(item);
      });
    }
    results.style.display = "block";
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrap")) {
      results.style.display = "none";
    }
  });
}

// ─── Navbar Genre Links ───────────────────────────────────────────────────────
function setupNavGenreLinks() {
  document.querySelectorAll(".nav-genre-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const genre = link.dataset.genre;
      const pills = document.querySelectorAll(".genre-pill");
      pills.forEach(p => p.classList.remove("active"));
      const target = document.querySelector(`.genre-pill[data-genre="${genre}"]`);
      if (activeGenre === genre) {
        activeGenre = null;
      } else {
        activeGenre = genre;
        if (target) target.classList.add("active");
      }
      renderFilteredGrid();
      document.getElementById("genre-filter").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ─── Navbar Scroll ────────────────────────────────────────────────────────────
function setupNavbar() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(movie) {
  const modal = document.getElementById("modal");
  const inList = isInWatchlist(movie.id);

  document.getElementById("modal-poster").src = movie.posterUrl;
  document.getElementById("modal-poster").alt = `${movie.title} poster`;
  const bannerBg = document.getElementById("modal-banner-bg");
  bannerBg.src = movie.posterUrl;
  bannerBg.alt = "";
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-year").textContent = movie.year;
  document.getElementById("modal-runtime").textContent = `${movie.runtime} min`;
  document.getElementById("modal-rating").textContent = `⭐ ${movie.imdbRating}`;
  document.getElementById("modal-genres").innerHTML = movie.genres.map(g =>
    `<span class="genre-tag">${g}</span>`
  ).join("");
  document.getElementById("modal-cast").innerHTML = movie.cast.map(c =>
    `<span class="cast-name">${c}</span>`
  ).join("");
  document.getElementById("modal-synopsis").textContent = movie.synopsis;

  const wlBtn = document.getElementById("modal-wl-btn");
  wlBtn.classList.toggle("active", inList);
  wlBtn.querySelector(".wl-icon").textContent = inList ? "✓" : "+";
  wlBtn.setAttribute("aria-label", inList ? "Remove from watchlist" : "Add to watchlist");
  wlBtn.setAttribute("data-watchlist-id", movie.id);
  wlBtn.onclick = () => toggleWatchlist(movie.id);

  modal.style.display = "flex";
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-inner").focus();
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open");
}

function setupModal() {
  const modal = document.getElementById("modal");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "flex") closeModal();
  });
}

// ─── Watchlist Row Scroll Buttons ──────────────────────────────────────────────
function setupWatchlistScroll() {
  const section = document.getElementById("watchlist-section");
  const track = section.querySelector(".row-track");
  section.querySelector(".scroll-left").addEventListener("click", () => {
    track.scrollBy({ left: -900, behavior: "smooth" });
  });
  section.querySelector(".scroll-right").addEventListener("click", () => {
    track.scrollBy({ left: 900, behavior: "smooth" });
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderWatchlistSection();
  setupWatchlistScroll();
  renderRows();
  renderGenrePills();
  renderFilteredGrid();
  setupSearch();
  setupNavGenreLinks();
  setupNavbar();
  setupModal();
});
