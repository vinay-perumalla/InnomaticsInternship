// Product data
const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'MacBook Pro M3',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1695675471757-a1f14b5f7a6b?w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'AirPods Max',
      price: 549,
      image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop'
    },
    {
      id: '4',
      name: 'iPad Pro M2',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1635016288720-c52507b9a717?w=800&auto=format&fit=crop'
    }
  ];
  
  // Cart state
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let isCartOpen = false;
  
  // DOM Elements
  const productGrid = document.getElementById('product-grid');
  const cartPanel = document.getElementById('cart-panel');
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const clearCart = document.getElementById('clear-cart');
  const checkout = document.getElementById('checkout');
  
  // Initialize products
  function initializeProducts() {
    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price}</p>
          <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
  }
  
  // Update cart UI
  function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  
    // Update cart items
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" class="cart-item-image">
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      `;
    }).join('');
  
    // Update total
    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product.price * item.quantity);
    }, 0);
    cartTotal.textContent = `$${total}`;
  
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add to cart
  function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    
    updateCartUI();
    openCart();
  }
  
  // Update quantity
  function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
      }
    }
    updateCartUI();
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  }
  
  // Clear cart
  function clearCartItems() {
    cart = [];
    updateCartUI();
  }
  
  // Toggle cart
  function toggleCart() {
    isCartOpen = !isCartOpen;
    cartPanel.style.transform = isCartOpen ? 'translateX(0)' : '';
  }
  
  // Open cart
  function openCart() {
    isCartOpen = true;
    cartPanel.style.transform = 'translateX(0)';
  }
  
  // Event listeners
  cartToggle.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', toggleCart);
  clearCart.addEventListener('click', clearCartItems);
  checkout.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    clearCartItems();
    toggleCart();
  });
  
  // Initialize
  initializeProducts();
  updateCartUI();