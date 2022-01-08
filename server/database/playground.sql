INSERT INTO marketplaces ( name, address ) VALUES ("Univerexport", "Bulevar Jase Tomica 10A");
INSERT INTO marketplaces ( name, address ) VALUES ("MAXI", "Bulevar Oslobodjena 36");
INSERT INTO marketplaces ( name, address ) VALUES ("Pekara Violeta", "Bulevar Kralja Petra 4");
-- ------------------------------------
INSERT INTO currencies ( code ) VALUES ("EUR");
INSERT INTO currencies ( code ) VALUES ("RSD");
INSERT INTO currencies ( code ) VALUES ("USD");
-- ------------------------------------ 
INSERT INTO categories ( name ) VALUES ("FOOD");
INSERT INTO categories ( name ) VALUES ("RESTAURANT");
INSERT INTO categories ( name ) VALUES ("GAS");
INSERT INTO categories ( name ) VALUES ("GROCERIES");
INSERT INTO categories ( name ) VALUES ("FRUITS");
-- ------------------------------------ 
INSERT INTO receipts ( shop_name, shop_address, receipt_date, total_price, most_spent_category, currency ) 
VALUES ("Univerexport", "Pariske Komune 25A", "2022-01-03 21:00:00", 250, 1, "RSD");
INSERT INTO receipts ( shop_name, shop_address, receipt_date, total_price, most_spent_category, currency ) 
VALUES ("MAXI", "Bulevar Oslobodjenja", "2021-12-12 16:40:00", 2370, 3, "USD");
INSERT INTO receipts ( shop_name, shop_address, receipt_date, total_price, most_spent_category, currency ) 
VALUES ("Panda", "Bulevar Oslobodjenja", "2022-01-05 16:16:16", 800, 1, "RSD");
-- ------------------------------------
INSERT INTO articles ( name,  )
VALUES ("Ratluk", 1, 1);
------------------------------------





DESCRIBE receipts;

SELECT * FROM marketplaces;
SELECT * FROM currencies;
SELECT * FROM categories;
SELECT * FROM receipts;
SELECT * FROM articles;
