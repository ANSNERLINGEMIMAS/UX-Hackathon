function applyOffer(offerText) {
  // Save selected offer in local storage
  localStorage.setItem("selectedOffer", offerText);
  // Redirect to cart page
  window.location.href = "cart.html";
}

// When the page loads, check if an offer was applied
window.onload = function () {
  const offer = localStorage.getItem("selectedOffer");
  const offerDiv = document.getElementById("offerApplied");

  if (offer && offerDiv) {
    offerDiv.style.display = "block";
    offerDiv.innerText = "✅ Offer Applied: " + offer;
  }

  // Optional: handle "Pay Now" success
  const payForm = document.querySelector("form");
  if (payForm) {
    payForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("💳 Payment Successful! Thank you for shopping with Fastrack Inspired 🕶️");
      localStorage.removeItem("selectedOffer"); // clear after payment
      window.location.href = "index.html"; // redirect to home page
    });
  }
};
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {

      // Read product info
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);

      // Fetch existing cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already exists
      let item = cart.find(i => i.id === id);

      if (item) {
        item.quantity++;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      // Save back to storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Visual button animation
      this.classList.add("added");

      setTimeout(() => {
        this.classList.remove("added");
      }, 600);

      // Pop-up confirmation
      const addMsg = document.createElement("div");
      addMsg.innerText = `${name} added to cart! ✔`;
      addMsg.style.position = "fixed";
      addMsg.style.bottom = "20px";
      addMsg.style.right = "20px";
      addMsg.style.background = "#28a745";
      addMsg.style.color = "#fff";
      addMsg.style.padding = "10px 18px";
      addMsg.style.borderRadius = "8px";
      addMsg.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
      addMsg.style.zIndex = "2000";
      addMsg.style.opacity = "1";
      addMsg.style.transition = "0.5s";

      document.body.appendChild(addMsg);

      // Fade out
      setTimeout(() => (addMsg.style.opacity = "0"), 1500);
      setTimeout(() => addMsg.remove(), 2000);

    });
  });

});




