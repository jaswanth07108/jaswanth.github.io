const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const payNowBtn = document.getElementById('payNowBtn');
const qrSection = document.getElementById('qrSection');
const cartBtn = document.getElementById('cartBtn');
const orderConfirmation = document.getElementById('orderConfirmation');
const cartSection = document.getElementById('cartSection');

// Cart count badge
const cartCount = document.createElement('span');
cartCount.id = 'cartCount';
cartCount.style.background = '#f5f5dc';
cartCount.style.color = '#4b2e2e';
cartCount.style.borderRadius = '50%';
cartCount.style.padding = '2px 8px';
cartCount.style.fontSize = '14px';
cartCount.style.marginLeft = '6px';
cartBtn.appendChild(cartCount);

// Add item to cart (Pre-book)
document.querySelectorAll('.item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.dataset.item;
    const price = parseInt(button.dataset.price);

    // Add to cart and save
    cartItems.push({ id: Date.now(), name: item, price });
    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCart(); // Refresh cart
    showOrderConfirmation(); // Tick mark confirmation
  });
});

// Update cart display
function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  if (cartItems.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: ₹0";
    qrSection.style.display = "none";
    return;
  }

  cartItems.forEach(cart => {
    total += cart.price;
    const li = document.createElement('li');
    li.innerHTML = `
      ${cart.name} - ₹${cart.price} 
      <button onclick="removeFromCart(${cart.id})">Cancel</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
  cartCount.textContent = cartItems.length;
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Remove item from cart
function removeFromCart(itemId) {
  const index = cartItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCart();
    alert("Item removed from cart!");
  }
}

// Show QR on Pay Now
payNowBtn.addEventListener('click', () => {
  if (cartItems.length > 0) {
    qrSection.style.display = 'block';
    qrSection.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Your cart is empty! Please add items before paying.");
  }
});

// Show tick mark confirmation
function showOrderConfirmation() {
  orderConfirmation.style.display = "block";
  setTimeout(() => {
    orderConfirmation.style.display = "none";
  }, 2000);
}

// Open cart from navbar
cartBtn.addEventListener('click', () => {
  cartSection.style.display = 'block';
  updateCart();
  cartSection.scrollIntoView({ behavior: "smooth" });
});

// On page load, restore cart
document.addEventListener("DOMContentLoaded", updateCart);
// Show QR on Pay Now
payNowBtn.addEventListener('click', () => {
  if (cartItems.length > 0) {
    qrSection.style.display = 'block';
    qrSection.scrollIntoView({ behavior: "smooth" });

    // Auto-close QR after 5 seconds and clear cart
    setTimeout(() => {
      qrSection.style.display = 'none';
      cartItems.length = 0; // Clear cart array
      localStorage.removeItem("cart"); // Clear storage
      updateCart();
      alert("Payment Successful! Cart cleared.");
    }, 5000); // 5 seconds auto close
  } else {
    alert("Your cart is empty! Please add items before paying.");
  }
});

// Close QR manually
document.getElementById('closeQRBtn').addEventListener('click', () => {
  qrSection.style.display = 'none';
  cartItems.length = 0; // Clear cart
  localStorage.removeItem("cart"); // Clear storage
  updateCart();
  alert("Payment Successful! Cart cleared.");
});
// Close Cart when ✖ clicked
document.getElementById('closeCartBtn').addEventListener('click', () => {
  cartSection.style.display = 'none';
});
