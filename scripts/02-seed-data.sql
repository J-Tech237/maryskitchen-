-- Insert sample categories
INSERT INTO public.categories (name_en, name_fr, description_en, description_fr, display_order) VALUES
  ('Main Dishes', 'Plats Principaux', 'Hearty main courses', 'Plats principaux copieux', 1),
  ('Appetizers', 'Entrées', 'Start your meal right', 'Commencez bien votre repas', 2),
  ('Desserts', 'Desserts', 'Sweet treats', 'Douceurs sucrées', 3),
  ('Beverages', 'Boissons', 'Refreshing drinks', 'Boissons rafraîchissantes', 4);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Grilled Chicken with Rice',
  'Poulet Grillé avec Riz',
  'Tender grilled chicken served with seasoned rice and vegetables',
  'Poulet grillé tendre servi avec du riz assaisonné et des légumes',
  8500,
  '/placeholder.svg?height=400&width=400',
  25
FROM public.categories c WHERE c.name_en = 'Main Dishes';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Jollof Rice with Fish',
  'Riz Jollof avec Poisson',
  'Traditional West African jollof rice with grilled fish',
  'Riz jollof ouest-africain traditionnel avec poisson grillé',
  9000,
  '/placeholder.svg?height=400&width=400',
  30
FROM public.categories c WHERE c.name_en = 'Main Dishes';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Beef Stew with Plantains',
  'Ragoût de Boeuf avec Plantains',
  'Rich beef stew served with fried plantains',
  'Ragoût de boeuf riche servi avec des plantains frits',
  10000,
  '/placeholder.svg?height=400&width=400',
  35
FROM public.categories c WHERE c.name_en = 'Main Dishes';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Spring Rolls',
  'Rouleaux de Printemps',
  'Crispy vegetable spring rolls with sweet chili sauce',
  'Rouleaux de printemps aux légumes croustillants avec sauce chili douce',
  3000,
  '/placeholder.svg?height=400&width=400',
  15
FROM public.categories c WHERE c.name_en = 'Appetizers';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Meat Samosas',
  'Samosas à la Viande',
  'Spiced meat-filled pastries, perfectly fried',
  'Pâtisseries farcies à la viande épicée, parfaitement frites',
  2500,
  '/placeholder.svg?height=400&width=400',
  15
FROM public.categories c WHERE c.name_en = 'Appetizers';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Chocolate Cake',
  'Gâteau au Chocolat',
  'Rich chocolate cake with chocolate ganache',
  'Gâteau au chocolat riche avec ganache au chocolat',
  4000,
  '/placeholder.svg?height=400&width=400',
  10
FROM public.categories c WHERE c.name_en = 'Desserts';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Fruit Salad',
  'Salade de Fruits',
  'Fresh seasonal fruits with honey drizzle',
  'Fruits frais de saison avec filet de miel',
  3500,
  '/placeholder.svg?height=400&width=400',
  10
FROM public.categories c WHERE c.name_en = 'Desserts';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Fresh Orange Juice',
  'Jus d''Orange Frais',
  'Freshly squeezed orange juice',
  'Jus d''orange fraîchement pressé',
  2000,
  '/placeholder.svg?height=400&width=400',
  5
FROM public.categories c WHERE c.name_en = 'Beverages';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Iced Tea',
  'Thé Glacé',
  'Refreshing iced tea with lemon',
  'Thé glacé rafraîchissant au citron',
  1500,
  '/placeholder.svg?height=400&width=400',
  5
FROM public.categories c WHERE c.name_en = 'Beverages';

INSERT INTO public.menu_items (category_id, name_en, name_fr, description_en, description_fr, price, image_url, preparation_time) 
SELECT 
  c.id,
  'Mineral Water',
  'Eau Minérale',
  'Bottled mineral water',
  'Eau minérale en bouteille',
  1000,
  '/placeholder.svg?height=400&width=400',
  2
FROM public.categories c WHERE c.name_en = 'Beverages';
