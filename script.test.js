/**
 * Tests for Task 7.1 — createMovieCard factory
 * Tests for Task 8.1 — Watchlist state and persistence
 *
 * Validates: Requirements 7.1, 7.6, 10.1, 10.2, 10.7
 *
 * Runs under Jest with testEnvironment=node.
 * Each test gets its own fresh JSDOM instance so const re-declaration errors
 * cannot occur between tests.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// ─── Source ───────────────────────────────────────────────────────────────────

const SCRIPT_SRC = fs.readFileSync(
  path.join(__dirname, "script.js"),
  "utf-8"
);

// Appended after script.js so the top-level const/let bindings (not auto-
// assigned to window) become reachable as window properties for assertions.
const EXPOSE_SHIM = `
  window.MOVIES                  = typeof MOVIES !== 'undefined' ? MOVIES : undefined;
  window.getWatchlist            = typeof getWatchlist !== 'undefined' ? getWatchlist : undefined;
  window.saveWatchlist           = typeof saveWatchlist !== 'undefined' ? saveWatchlist : undefined;
  window.isInWatchlist           = typeof isInWatchlist !== 'undefined' ? isInWatchlist : undefined;
  window.toggleWatchlist         = typeof toggleWatchlist !== 'undefined' ? toggleWatchlist : undefined;
  window.syncAllWatchlistButtons = typeof syncAllWatchlistButtons !== 'undefined' ? syncAllWatchlistButtons : undefined;
  window.createMovieCard         = typeof createMovieCard !== 'undefined' ? createMovieCard : undefined;
  window.openModal               = typeof openModal !== 'undefined' ? openModal : undefined;
  window.closeModal              = typeof closeModal !== 'undefined' ? closeModal : undefined;
  window.renderWatchlistSection  = typeof renderWatchlistSection !== 'undefined' ? renderWatchlistSection : undefined;
  window.renderGenrePills        = typeof renderGenrePills !== 'undefined' ? renderGenrePills : undefined;
  window.renderFilteredGrid      = typeof renderFilteredGrid !== 'undefined' ? renderFilteredGrid : undefined;
  Object.defineProperty(window, '_getActiveGenre', {
    get: () => typeof activeGenre !== 'undefined' ? activeGenre : null,
    set: v => { activeGenre = v; },
  });
`;

const FULL_SRC = SCRIPT_SRC + "\n" + EXPOSE_SHIM;

// ─── Environment factory ──────────────────────────────────────────────────────

/**
 * Creates a fresh JSDOM environment with the minimal HTML scaffold that
 * script.js requires, injects the script, fires DOMContentLoaded, and
 * returns `{ win, doc }` for use in a single test.
 *
 * @param {string} [extraLocalStorage] - JSON string to pre-set for key "watchlist"
 */
function makeEnv(extraLocalStorage) {
  const html = `<!DOCTYPE html>
  <html><head></head><body>
    <nav id="navbar"></nav>
    <section id="hero" style="background-image:none"></section>
    <h1 id="hero-title"></h1>
    <p id="hero-meta"></p>
    <p id="hero-genres"></p>
    <p id="hero-synopsis"></p>
    <button id="hero-play"></button>
    <button id="hero-info"></button>
    <section id="watchlist-section" style="display:none">
      <div class="row-header">
        <h2 class="row-label">My Watchlist <span id="watchlist-count">0</span></h2>
      </div>
      <div class="row-container">
        <button class="scroll-btn scroll-left"></button>
        <div class="row-track" id="watchlist-track"></div>
        <button class="scroll-btn scroll-right"></button>
      </div>
    </section>
    <section id="rows"></section>
    <div id="genre-pills"></div>
    <section id="filtered-section" style="display:none">
      <h2 id="filtered-heading"></h2>
      <div id="filtered-grid"></div>
    </section>
    <input id="search-input">
    <div id="search-results"></div>
    <div id="modal" style="display:none" role="dialog">
      <div class="modal-inner" tabindex="-1">
        <div class="modal-banner">
          <img id="modal-banner-bg" src="" alt="">
          <button id="modal-close"></button>
        </div>
        <div class="modal-body">
          <img id="modal-poster" src="" alt="">
          <div class="modal-details">
            <h2 id="modal-title"></h2>
            <div class="modal-meta-row">
              <span><strong id="modal-year"></strong></span>
              <span><strong id="modal-runtime"></strong></span>
              <span><strong id="modal-rating"></strong></span>
            </div>
            <div id="modal-genres"></div>
            <p id="modal-synopsis"></p>
            <div id="modal-cast"></div>
            <div class="modal-actions">
              <button id="modal-wl-btn" class="btn-modal-wl wl-btn" aria-label="Add to watchlist">
                <span class="wl-icon">+</span>
                <span class="wl-label">Watchlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body></html>`;

  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    url: "http://localhost/",
  });

  const { window: win } = dom;

  // Pre-seed localStorage if requested (simulates a returning visitor).
  if (extraLocalStorage !== undefined) {
    win.localStorage.setItem("watchlist", extraLocalStorage);
  }

  // Inject script as a <script> tag (runs synchronously in jsdom with runScripts:"dangerously").
  const scriptEl = win.document.createElement("script");
  scriptEl.textContent = FULL_SRC;
  win.document.head.appendChild(scriptEl);

  // Fire DOMContentLoaded so the init block executes.
  const dclEvent = win.document.createEvent("Event");
  dclEvent.initEvent("DOMContentLoaded", true, false);
  win.document.dispatchEvent(dclEvent);

  return { win, doc: win.document };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Task 7.1 — createMovieCard factory
// Validates: Requirements 7.1, 7.6
// ═══════════════════════════════════════════════════════════════════════════════

describe("Task 7.1 — createMovieCard(movie)", () => {

  test("returns a div with class .movie-card", () => {
    const { win } = makeEnv();
    const card = win.createMovieCard(win.MOVIES[0]);
    expect(card.classList.contains("movie-card")).toBe(true);
  });

  // ── Structural requirements (Requirement 7.1) ─────────────────────────────

  test("contains .card-poster-wrap with img.card-poster", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const wrap = card.querySelector(".card-poster-wrap");
    expect(wrap).not.toBeNull();

    const img = wrap.querySelector("img.card-poster");
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toBe(movie.posterUrl);
    expect(img.getAttribute("alt")).toContain(movie.title);
  });

  test(".card-overlay is present and contains genre tags", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const overlay = card.querySelector(".card-overlay");
    expect(overlay).not.toBeNull();

    const genreTags = overlay.querySelectorAll(".genre-tag");
    expect(genreTags.length).toBeGreaterThanOrEqual(1);
    const tagTexts = Array.from(genreTags).map(el => el.textContent);
    expect(tagTexts).toContain(movie.genres[0]);
  });

  test(".card-overlay contains a synopsis snippet (first ~100 chars)", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const overlay = card.querySelector(".card-overlay");
    const snippet = movie.synopsis.substring(0, 50);
    expect(overlay.innerHTML).toContain(snippet);
  });

  test(".card-overlay has a 'More Info' button (.btn-detail)", () => {
    const { win } = makeEnv();
    const card = win.createMovieCard(win.MOVIES[0]);
    const btn = card.querySelector(".card-overlay .btn-detail");
    expect(btn).not.toBeNull();
    expect(btn.textContent.trim()).toBe("More Info");
  });

  test(".card-info has .card-title showing the movie's title", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const info = card.querySelector(".card-info");
    expect(info).not.toBeNull();

    const title = info.querySelector(".card-title");
    expect(title).not.toBeNull();
    expect(title.textContent).toBe(movie.title);
  });

  test(".card-meta shows year and IMDb rating", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const meta = card.querySelector(".card-meta");
    expect(meta).not.toBeNull();
    expect(meta.textContent).toContain(String(movie.year));
    expect(meta.textContent).toContain(String(movie.imdbRating));
  });

  // ── Watchlist button (Requirement 7.6) ───────────────────────────────────

  test(".wl-btn carries correct data-watchlist-id attribute", () => {
    const { win } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const btn = card.querySelector(".wl-btn[data-watchlist-id]");
    expect(btn).not.toBeNull();
    expect(btn.getAttribute("data-watchlist-id")).toBe(String(movie.id));
  });

  test(".wl-btn shows '+' icon and no .active when movie is NOT in watchlist", () => {
    const { win } = makeEnv(); // empty localStorage
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);

    const btn = card.querySelector(".wl-btn");
    expect(btn.querySelector(".wl-icon").textContent).toBe("+");
    expect(btn.classList.contains("active")).toBe(false);
    expect(btn.getAttribute("aria-label")).toBe("Add to watchlist");
  });

  test(".wl-btn shows '✓' and .active when movie IS already in watchlist", () => {
    const { win } = makeEnv(JSON.stringify([1])); // movie id 1 pre-seeded
    const movie = win.MOVIES[0]; // id: 1
    const card = win.createMovieCard(movie);

    const btn = card.querySelector(".wl-btn");
    expect(btn.querySelector(".wl-icon").textContent).toBe("✓");
    expect(btn.classList.contains("active")).toBe(true);
    expect(btn.getAttribute("aria-label")).toBe("Remove from watchlist");
  });

  test(".wl-btn click toggles watchlist state and stops propagation to card", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);
    doc.body.appendChild(card);

    let cardClicked = false;
    card.addEventListener("click", () => { cardClicked = true; });

    const wasInList = win.isInWatchlist(movie.id);
    card.querySelector(".wl-btn").click();
    const nowInList = win.isInWatchlist(movie.id);

    expect(nowInList).toBe(!wasInList); // watchlist state flipped
    expect(cardClicked).toBe(false);    // propagation stopped
  });

  // ── Click behaviour ───────────────────────────────────────────────────────

  test("clicking the card body opens the detail modal for that movie", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);
    doc.body.appendChild(card);

    card.click();

    expect(doc.getElementById("modal").style.display).toBe("flex");
    expect(doc.getElementById("modal-title").textContent).toBe(movie.title);
  });

  test("clicking the 'More Info' (.btn-detail) button opens the modal", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[1];
    const card = win.createMovieCard(movie);
    doc.body.appendChild(card);

    card.querySelector(".btn-detail").click();

    expect(doc.getElementById("modal").style.display).toBe("flex");
    expect(doc.getElementById("modal-title").textContent).toBe(movie.title);
  });

  test("pressing Enter on the card opens the modal (keyboard a11y)", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);
    doc.body.appendChild(card);

    card.dispatchEvent(new win.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));

    expect(doc.getElementById("modal").style.display).toBe("flex");
  });

  test("pressing Space on the card opens the modal (keyboard a11y)", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[0];
    const card = win.createMovieCard(movie);
    doc.body.appendChild(card);

    card.dispatchEvent(new win.KeyboardEvent("keydown", { key: " ", bubbles: true }));

    expect(doc.getElementById("modal").style.display).toBe("flex");
  });

  test("card has role='button' and tabindex='0' for accessibility", () => {
    const { win } = makeEnv();
    const card = win.createMovieCard(win.MOVIES[0]);
    expect(card.getAttribute("role")).toBe("button");
    expect(card.getAttribute("tabindex")).toBe("0");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Task 8.1 — Watchlist state and persistence
// Validates: Requirements 10.1, 10.2, 10.7
// ═══════════════════════════════════════════════════════════════════════════════

describe("Task 8.1 — Watchlist state and persistence", () => {

  // ── getWatchlist (Requirements 10.1, 10.2) ───────────────────────────────

  test("getWatchlist() returns [] when localStorage is empty", () => {
    const { win } = makeEnv(); // no pre-seeded data
    expect(win.getWatchlist()).toEqual([]);
  });

  test("getWatchlist() returns persisted IDs from localStorage key 'watchlist'", () => {
    const { win } = makeEnv(JSON.stringify([3, 7, 12]));
    expect(win.getWatchlist()).toEqual([3, 7, 12]);
  });

  test("getWatchlist() returns [] when localStorage contains corrupt JSON (try/catch)", () => {
    const { win } = makeEnv();
    win.localStorage.setItem("watchlist", "{not-valid-json");
    expect(win.getWatchlist()).toEqual([]);
  });

  test("getWatchlist() returns [] when localStorage key is absent", () => {
    const { win } = makeEnv();
    win.localStorage.removeItem("watchlist");
    expect(win.getWatchlist()).toEqual([]);
  });

  // ── saveWatchlist ─────────────────────────────────────────────────────────

  test("saveWatchlist(list) persists array to localStorage key 'watchlist'", () => {
    const { win } = makeEnv();
    win.saveWatchlist([1, 5, 9]);
    expect(JSON.parse(win.localStorage.getItem("watchlist"))).toEqual([1, 5, 9]);
  });

  test("saveWatchlist([]) writes an empty array", () => {
    const { win } = makeEnv();
    win.saveWatchlist([]);
    expect(JSON.parse(win.localStorage.getItem("watchlist"))).toEqual([]);
  });

  // ── isInWatchlist ─────────────────────────────────────────────────────────

  test("isInWatchlist(id) returns false when id is absent", () => {
    const { win } = makeEnv();
    expect(win.isInWatchlist(99)).toBe(false);
  });

  test("isInWatchlist(id) returns true when id is present", () => {
    const { win } = makeEnv(JSON.stringify([1, 2, 3]));
    expect(win.isInWatchlist(2)).toBe(true);
  });

  // ── toggleWatchlist — add / remove ────────────────────────────────────────

  test("toggleWatchlist(id) adds id when not in watchlist", () => {
    const { win } = makeEnv();
    win.toggleWatchlist(5);
    expect(win.getWatchlist()).toContain(5);
  });

  test("toggleWatchlist(id) removes id when already in watchlist", () => {
    const { win } = makeEnv(JSON.stringify([5, 10]));
    win.toggleWatchlist(5);
    const list = win.getWatchlist();
    expect(list).not.toContain(5);
    expect(list).toContain(10); // other entries unaffected
  });

  test("toggleWatchlist(id) persists addition to localStorage immediately", () => {
    const { win } = makeEnv();
    win.toggleWatchlist(3);
    expect(JSON.parse(win.localStorage.getItem("watchlist"))).toContain(3);
  });

  test("toggleWatchlist(id) persists removal to localStorage immediately", () => {
    const { win } = makeEnv(JSON.stringify([3]));
    win.toggleWatchlist(3);
    expect(JSON.parse(win.localStorage.getItem("watchlist"))).not.toContain(3);
  });

  // ── syncAllWatchlistButtons — Requirement 10.7 ───────────────────────────

  test("syncAllWatchlistButtons adds .active and '✓' to ALL matching buttons", () => {
    const { win, doc } = makeEnv(JSON.stringify([1]));
    const id = win.MOVIES[0].id; // 1

    // Insert two separate wl-btn elements for the same movie
    [1, 2].forEach(() => {
      const btn = doc.createElement("button");
      btn.className = "wl-btn";
      btn.setAttribute("data-watchlist-id", String(id));
      btn.setAttribute("aria-label", "Add to watchlist");
      btn.innerHTML = `<span class="wl-icon">+</span>`;
      doc.body.appendChild(btn);
    });

    win.syncAllWatchlistButtons(id);

    doc.querySelectorAll(`[data-watchlist-id="${id}"]`).forEach(btn => {
      expect(btn.classList.contains("active")).toBe(true);
      expect(btn.querySelector(".wl-icon").textContent).toBe("✓");
      expect(btn.getAttribute("aria-label")).toBe("Remove from watchlist");
    });
  });

  test("syncAllWatchlistButtons removes .active and sets '+' when id is NOT in list", () => {
    const { win, doc } = makeEnv(); // empty list
    const id = win.MOVIES[0].id;

    const btn = doc.createElement("button");
    btn.className = "wl-btn active";
    btn.setAttribute("data-watchlist-id", String(id));
    btn.setAttribute("aria-label", "Remove from watchlist");
    btn.innerHTML = `<span class="wl-icon">✓</span>`;
    doc.body.appendChild(btn);

    win.syncAllWatchlistButtons(id);

    expect(btn.classList.contains("active")).toBe(false);
    expect(btn.querySelector(".wl-icon").textContent).toBe("+");
    expect(btn.getAttribute("aria-label")).toBe("Add to watchlist");
  });

  // ── toggleWatchlist calls sync (Requirement 10.7) ────────────────────────

  test("toggleWatchlist syncs ALL page buttons for that movie simultaneously", () => {
    const { win, doc } = makeEnv();
    const movie = win.MOVIES[1]; // id: 2

    [1, 2].forEach(() => {
      const btn = doc.createElement("button");
      btn.className = "wl-btn";
      btn.setAttribute("data-watchlist-id", String(movie.id));
      btn.setAttribute("aria-label", "Add to watchlist");
      btn.innerHTML = `<span class="wl-icon">+</span>`;
      doc.body.appendChild(btn);
    });

    win.toggleWatchlist(movie.id); // adds to list → all btns should activate

    doc.querySelectorAll(`[data-watchlist-id="${movie.id}"]`).forEach(btn => {
      expect(btn.classList.contains("active")).toBe(true);
      expect(btn.querySelector(".wl-icon").textContent).toBe("✓");
    });
  });

  test("toggleWatchlist shows watchlist section when list becomes non-empty", () => {
    const { win, doc } = makeEnv(); // empty list
    doc.getElementById("watchlist-section").style.display = "none";

    win.toggleWatchlist(win.MOVIES[0].id);

    expect(doc.getElementById("watchlist-section").style.display).toBe("block");
  });

  test("toggleWatchlist hides watchlist section when list becomes empty", () => {
    const { win, doc } = makeEnv(JSON.stringify([1]));
    doc.getElementById("watchlist-section").style.display = "block";

    win.toggleWatchlist(win.MOVIES[0].id); // removes the only item

    expect(doc.getElementById("watchlist-section").style.display).toBe("none");
  });

  // ── Requirement 10.2: state restoration on load ───────────────────────────

  test("isInWatchlist reflects what is in localStorage before any toggles (simulates page reload)", () => {
    // Pre-seed before env creation → simulates a returning visitor
    const { win } = makeEnv(JSON.stringify([7, 11]));

    expect(win.isInWatchlist(7)).toBe(true);
    expect(win.isInWatchlist(11)).toBe(true);
    expect(win.isInWatchlist(1)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Task 9.3 — Genre Filter Pill click handler
// Validates: Requirements 8.2, 8.3, 8.4, 8.5, 8.6
// ═══════════════════════════════════════════════════════════════════════════════

describe("Task 9.3 — renderGenrePills() and renderFilteredGrid()", () => {

  // ── Genres array — Requirement 8.1 ──────────────────────────────────────

  test("renders exactly 8 genre pills with the required genre names", () => {
    const { doc } = makeEnv();
    const pills = doc.querySelectorAll("#genre-pills .genre-pill");
    const labels = Array.from(pills).map(p => p.textContent.trim());
    expect(labels).toEqual([
      "Action", "Comedy", "Drama", "Sci-Fi",
      "Horror", "Fantasy", "Documentary", "Thriller",
    ]);
  });

  test("each pill has data-genre attribute matching its label", () => {
    const { doc } = makeEnv();
    doc.querySelectorAll("#genre-pills .genre-pill").forEach(pill => {
      expect(pill.getAttribute("data-genre")).toBe(pill.textContent.trim());
    });
  });

  // ── #filtered-section hidden by default — Requirement 8.4 ───────────────

  test("#filtered-section is hidden on page load (no active genre)", () => {
    const { doc } = makeEnv();
    expect(doc.getElementById("filtered-section").style.display).toBe("none");
  });

  // ── Clicking a pill shows filtered grid — Requirement 8.2 ───────────────

  test("clicking a pill shows #filtered-section", () => {
    const { doc } = makeEnv();
    const pill = doc.querySelector('.genre-pill[data-genre="Action"]');
    pill.click();
    expect(doc.getElementById("filtered-section").style.display).toBe("block");
  });

  test("clicking a pill sets #filtered-heading to 'Genre: <genre>'", () => {
    const { doc } = makeEnv();
    doc.querySelector('.genre-pill[data-genre="Drama"]').click();
    expect(doc.getElementById("filtered-heading").textContent).toBe("Genre: Drama");
  });

  test("clicking a pill populates #filtered-grid with matching movie cards", () => {
    const { win, doc } = makeEnv();
    doc.querySelector('.genre-pill[data-genre="Sci-Fi"]').click();
    const grid = doc.getElementById("filtered-grid");
    const cards = grid.querySelectorAll(".movie-card");
    const expected = win.MOVIES.filter(m => m.genres.includes("Sci-Fi")).length;
    expect(cards.length).toBe(expected);
    expect(expected).toBeGreaterThan(0);
  });

  test("filtered grid shows only movies that include the selected genre", () => {
    const { win, doc } = makeEnv();
    doc.querySelector('.genre-pill[data-genre="Horror"]').click();
    const grid = doc.getElementById("filtered-grid");
    const cards = grid.querySelectorAll(".movie-card");
    // Every rendered card's aria-label should belong to a Horror movie
    const horrorTitles = win.MOVIES
      .filter(m => m.genres.includes("Horror"))
      .map(m => m.title);
    cards.forEach(card => {
      const label = card.getAttribute("aria-label") || "";
      expect(horrorTitles.some(t => label.includes(t))).toBe(true);
    });
  });

  // ── Active pill styling — Requirement 8.3 ───────────────────────────────

  test("clicked pill gains .active class", () => {
    const { doc } = makeEnv();
    const pill = doc.querySelector('.genre-pill[data-genre="Action"]');
    pill.click();
    expect(pill.classList.contains("active")).toBe(true);
  });

  test("only one pill is .active at a time (switching genres)", () => {
    const { doc } = makeEnv();
    const action = doc.querySelector('.genre-pill[data-genre="Action"]');
    const comedy = doc.querySelector('.genre-pill[data-genre="Comedy"]');
    action.click();
    comedy.click();
    expect(action.classList.contains("active")).toBe(false);
    expect(comedy.classList.contains("active")).toBe(true);
  });

  // ── Clicking active pill deactivates filter — Requirement 8.4 ───────────

  test("clicking an already-active pill removes .active from it", () => {
    const { doc } = makeEnv();
    const pill = doc.querySelector('.genre-pill[data-genre="Thriller"]');
    pill.click(); // activate
    pill.click(); // deactivate
    expect(pill.classList.contains("active")).toBe(false);
  });

  test("clicking an already-active pill hides #filtered-section", () => {
    const { doc } = makeEnv();
    const pill = doc.querySelector('.genre-pill[data-genre="Thriller"]');
    pill.click(); // activate
    pill.click(); // deactivate
    expect(doc.getElementById("filtered-section").style.display).toBe("none");
  });

  test("clicking an already-active pill clears #filtered-grid", () => {
    const { doc } = makeEnv();
    const pill = doc.querySelector('.genre-pill[data-genre="Action"]');
    pill.click(); // populate
    pill.click(); // clear
    expect(doc.getElementById("filtered-grid").innerHTML).toBe("");
  });

  // ── Movie rows remain visible — Requirement 8.5 ─────────────────────────

  test("#rows section remains in the DOM while genre filter is active", () => {
    const { doc } = makeEnv();
    doc.querySelector('.genre-pill[data-genre="Action"]').click();
    const rows = doc.getElementById("rows");
    expect(rows).not.toBeNull();
    // rows section is not hidden by renderFilteredGrid
    expect(rows.style.display).not.toBe("none");
  });

  // ── "No movies found" message — Requirement 8.6 ─────────────────────────

  test("shows 'No movies found for this genre.' when no matches exist", () => {
    const { win, doc } = makeEnv();
    // Find a genre that has NO movies (or force one by clearing MOVIES temporarily)
    // Since Documentary appears in the data, we test by checking the message path:
    // We inject a genre that definitely has no movie matches by overriding activeGenre
    // and calling renderFilteredGrid directly with a no-match state.
    win._getActiveGenre; // read to confirm accessor works
    win._getActiveGenre = "NonexistentGenreXYZ";
    // We need to set activeGenre via the accessor and call renderFilteredGrid
    // But activeGenre is module-scoped. Use the pill click flow instead:
    // Replace MOVIES temporarily to simulate no matches for Documentary.
    const original = win.MOVIES;
    // Remove all Documentary movies
    const noDocMovies = original.filter(m => !m.genres.includes("Documentary"));
    // Splice out in place
    win.MOVIES.splice(0, win.MOVIES.length, ...noDocMovies);
    doc.querySelector('.genre-pill[data-genre="Documentary"]').click();
    const msg = doc.querySelector("#filtered-grid .no-movies-msg");
    expect(msg).not.toBeNull();
    expect(msg.textContent).toBe("No movies found for this genre.");
    // Restore
    win.MOVIES.splice(0, win.MOVIES.length, ...original);
  });

  test("'No movies found' message is a <p> with class 'no-movies-msg'", () => {
    const { win, doc } = makeEnv();
    const original = [...win.MOVIES];
    win.MOVIES.splice(0, win.MOVIES.length, ...original.filter(m => !m.genres.includes("Documentary")));
    doc.querySelector('.genre-pill[data-genre="Documentary"]').click();
    const msg = doc.querySelector("#filtered-grid .no-movies-msg");
    expect(msg).not.toBeNull();
    expect(msg.tagName).toBe("P");
    win.MOVIES.splice(0, win.MOVIES.length, ...original);
  });

  // ── Switching genres re-renders the grid correctly ───────────────────────

  test("switching to a different genre replaces grid contents, not appends", () => {
    const { win, doc } = makeEnv();
    doc.querySelector('.genre-pill[data-genre="Action"]').click();
    const firstCount = doc.querySelectorAll("#filtered-grid .movie-card").length;
    doc.querySelector('.genre-pill[data-genre="Drama"]').click();
    const secondCount = doc.querySelectorAll("#filtered-grid .movie-card").length;
    const expectedAction = win.MOVIES.filter(m => m.genres.includes("Action")).length;
    const expectedDrama  = win.MOVIES.filter(m => m.genres.includes("Drama")).length;
    expect(firstCount).toBe(expectedAction);
    expect(secondCount).toBe(expectedDrama);
  });
});
