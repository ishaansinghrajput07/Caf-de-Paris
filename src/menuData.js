// Prices (₹) taken from the printed menu card — please verify before launch.
const sizes = (name, s, m, l) => [['Small', s], ['Medium', m], ['Large', l]].map(([z, p]) => ({ id: `${name}-${z}`, name: `${name} (${z})`, price: p }));
const it = (name, price) => ({ id: name, name, price });
export const categories = [
  { title: 'Hot & Cold', items: [it('Cappuccino', 120), it('Americano', 120), it('Vanilla Bean Latte', 120), it('Hot Chocolate', 120), it('Cold Coffee', 120), it('Espresso', 70), it('Fresh Lime Soda', 50)] },
  { title: 'Veg Pizza', items: [...sizes('Margherita', 110, 200, 300), ...sizes('Veg Delight', 250, 450, 550), ...sizes('Capsicum', 140, 250, 350)] },
  { title: 'Non-Veg Pizza', items: [...sizes('BBQ Chicken', 190, 350, 550), ...sizes('Chicken Supreme', 350, 650, 750)] },
  { title: 'Burgers', items: [it('Veg Burger', 150), it('Chicken Burger', 100), it('Chicken Burger BBQ', 180), it('Crunch Chicken Burger', 180)] },
  { title: 'Bites', items: [it('Cheese Corn Nuggets (6pcs)', 100), it('French Fries', 80), it('Veg Sandwich', 100), it('Chicken Sandwich', 120), it('Chicken Roll', 70)] },
  { title: 'Pastries', items: [it('Chocolate Brownie', 120), it('Chocolate Truffle', 80), it('Pineapple Pastry', 60), it('Strawberry Pastry', 60), it('Doughnut', 50), it('Cupcake', 50)] },
];
