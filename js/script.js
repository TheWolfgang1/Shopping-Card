// Initialisation du panier
let cart = []; // un tableau vide pour stocker les produits ajoutés

// Fonction pour mettre à jour le prix total
function updateTotalPrice() {
  let total = 0; // on initialise le prix à 0
  cart.forEach(item => {
    total += item.price * item.quantity; // je multiplie le prix par la quantity pour chaque éléments
  });
  document.querySelector('.total').textContent = `${total} $`; // permet de mettre à jour le total
}

// Fonction pour ajouter un produit au panier
function addProduct(productName, price) {
  const existingProduct = cart.find(item => item.name === productName); // vérifie si le produit est dans le panier
  if (existingProduct) {
    existingProduct.quantity += 1; // si oui on augmente la quantité de 1
  } else {
    cart.push({ name: productName, price: price, quantity: 1 }); // si non on ajoute le produit au panier avec 1 comme quatité
  }
  updateTotalPrice(); // je rappel la fonction pour mettre à jour le prix total
  updateQuantityDisplay(productName); // pour mettre à jour la quantité du produit
}

// Fonction pour retirer un produit du panier
function removeProduct(productName) {
  const existingProduct = cart.find(item => item.name === productName); // pour retrouver le produit dans le panier
  if (existingProduct && existingProduct.quantity > 0) {
    existingProduct.quantity -= 1; // si la quantité du produit est >0 je diminue de 1 
    if (existingProduct.quantity === 0) {
      cart = cart.filter(item => item.name !== productName); // je supprime le produit si la quantité atteint 0
    }
  }
  // je met à jour le total et la quanité
  updateTotalPrice();
  updateQuantityDisplay(productName);
}

// Fonction pour mettre à jour l'affichage de la quantité
function updateQuantityDisplay(productName) {
  // Trouver tous les éléments de carte
  document.querySelectorAll('.card-body').forEach(cardBody => {
    const cardTitle = cardBody.querySelector('.card-title').textContent; // récupère le nom du produit
    if (cardTitle === productName) { // vérifie si le nom correspond
      const quantityElement = cardBody.querySelector('.quantity');
      const existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
        quantityElement.textContent = existingProduct.quantity;
      } else {
        quantityElement.textContent = '0';
      }
    }
  });
}

// Fonction pour supprimer un produit du panier
function deleteProduct(productName) {
  cart = cart.filter(item => item.name !== productName); // je filtre le panier pour retirer le produit
  updateTotalPrice();
  updateQuantityDisplay(productName);
}

// Fonction pour ajouter un produit aux favoris
function addToFavorites(productName, heartButton) {
    heartButton.classList.toggle('red'); // Ajoute ou supprime la classe 'red' pour changer la couleur du cœur.
  
    if (heartButton.classList.contains('red')) {
      console.log(`${productName} ajouté aux favoris`); // Si le cœur est rouge, le produit est ajouté aux favoris.
    } else {
      console.log(`${productName} retiré des favoris`); // Si le cœur n'est pas rouge, le produit est retiré des favoris.
    }
  }
// Ajouter des écouteurs d'événements aux boutons


document.querySelectorAll('.fa-plus-circle').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.closest('.card-body').querySelector('.card-title').textContent;
    const price = parseFloat(button.closest('.card-body').querySelector('.unit-price').textContent.replace(' $', ''));
    addProduct(productName, price);
  });
});

document.querySelectorAll('.fa-minus-circle').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.closest('.card-body').querySelector('.card-title').textContent;
    removeProduct(productName);
  });
});

// bouton supprimer
document.querySelectorAll('.fa-trash-alt').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.closest('.card-body').querySelector('.card-title').textContent; // récupère le nom du produit
    deleteProduct(productName); // j'appel la fonction pour supprimer le produit
  });
});

// boutton favori
document.querySelectorAll('.fa-heart').forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.closest('.card-body').querySelector('.card-title').textContent; // Récupère le nom du produit.
      addToFavorites(productName, button); // Appelle la fonction pour ajouter le produit aux favoris.
    });
  });