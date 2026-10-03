// TODO: replace the placeholder values below with the real cafe details.
export const cafe = {
  name: 'Café de Paris',
  tagline: 'A little corner of Paris, poured into every cup.',
  phone: '+91 99999 99999',
  whatsapp: '919999999999', // country code + number, digits only
  address: 'Your street address, Goa, India',
  hours: 'Daily · 10:00 AM – 10:00 PM',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Cafe+de+Paris+Goa',
};
export const wa = (text) => `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`;
