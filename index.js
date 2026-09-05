const featureRequestApi = "https://formspree.io/f/mvkorbjr";
const waitlistApi = "https://formspree.io/f/xbgjyavz";

const featureForm = document.getElementById("feature-form");
const featureFormMsg = document.getElementById("feature-form-msg");
const featureBtn = document.getElementById("feature-btn");
const featureBtnText = featureBtn.textContent;

const waitlistForm = document.getElementById("waitlist-form");
const waitlistFormMsg = document.getElementById("waitlist-form-msg");
const waitlistBtn = document.getElementById("waitlist-btn");
const waitlistBtnText = waitlistBtn.textContent;

featureForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    featureBtn.disabled = true;
    featureBtn.textContent = "Submitting...";
    featureFormMsg.classList.remove("show", "error");

    try {
        const res = await fetch(featureRequestApi, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: new FormData(featureForm)
        });

        if (res.ok) {
            featureFormMsg.textContent = "Thanks, we've got it. We read every request.";
            featureFormMsg.classList.add("show");
            featureForm.reset();
        } else {
            featureFormMsg.textContent = "Something went wrong. Please try again in a moment.";
            featureFormMsg.classList.add("show", "error");
        }
    } catch (error) {
        console.log(error);
        featureFormMsg.textContent = "Network error. Please check your connection and try again.";
        featureFormMsg.classList.add("show", "error");
    } finally {
        featureBtn.disabled = false;
        featureBtn.textContent = featureBtnText;
    }
});


waitlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    waitlistBtn.disabled = true;
    waitlistBtn.textContent = "Submitting...";
    waitlistFormMsg.classList.remove("show", "error");

    try {
        const res = await fetch(waitlistApi, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: new FormData(waitlistForm)
        });

        if (res.ok) {
            waitlistFormMsg.textContent = "You're in. We'll email you when early access opens.";
            waitlistFormMsg.classList.add("show");
            waitlistForm.reset();
        } else {
            waitlistFormMsg.textContent = "Something went wrong. Please try again in a moment.";
            waitlistFormMsg.classList.add("show", "error");
        }
    } catch (error) {
        console.log(error);
        waitlistFormMsg.textContent = "Network error. Please check your connection and try again.";
        waitlistFormMsg.classList.add("show", "error");
    } finally {
        waitlistBtn.disabled = false;
        waitlistBtn.textContent = waitlistBtnText;
    }
});


(function () {
  document.documentElement.classList.add('js-ready');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- section registry (id -> element, dark?) ---------- */
  var sectionEls = [
    { id: 'hero', dark: true },
    { id: 'feature-health', dark: false },
    { id: 'feature-payments', dark: false },
    { id: 'feature-smtp', dark: false },
    { id: 'feature-reporting', dark: false },
    { id: 'how-it-works', dark: false },
    { id: 'pricing', dark: false },
    { id: 'request', dark: true },
    { id: 'cta', dark: true }
  ].map(function (s) {
    s.el = document.getElementById(s.id);
    return s;
  }).filter(function (s) { return s.el; });

  var dotsNav = document.querySelector('.section-dots');
  var dotLinks = dotsNav ? Array.prototype.slice.call(dotsNav.querySelectorAll('[data-dot]')) : [];

  function setActiveSection(id, dark) {
    dotLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-section') === id);
    });
    if (dotsNav) dotsNav.classList.toggle('on-dark', !!dark);
  }

  if ('IntersectionObserver' in window && sectionEls.length) {
    var current = sectionEls[0].id;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          var match = sectionEls.filter(function (s) { return s.el === entry.target; })[0];
          if (match) {
            current = match.id;
            setActiveSection(match.id, match.dark);
          }
        }
      });
    }, { threshold: [0.5] });

    sectionEls.forEach(function (s) { spy.observe(s.el); });
    setActiveSection(current, sectionEls[0].dark);
  }

  /* ---------- reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll('.feature-grid, .price-card, .request-card, .steps-list li');
  if ('IntersectionObserver' in window && revealTargets.length && !reduceMotion) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function (el) { reveal.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }
})();