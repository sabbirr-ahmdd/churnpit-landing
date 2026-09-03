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