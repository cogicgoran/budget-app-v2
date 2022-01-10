INSERT INTO marketplaces ( id, name, address ) VALUES (1, "Univerexport", "Bulevar Jase Tomica 10A");
INSERT INTO marketplaces ( id, name, address ) VALUES (2, "MAXI", "Bulevar Oslobodjena 36");
INSERT INTO marketplaces ( id, name, address ) VALUES (3, "Pekara Violeta", "Bulevar Kralja Petra 4");
-- ------------------------------------
INSERT INTO currencies ( code ) VALUES ("EUR");
INSERT INTO currencies ( code ) VALUES ("RSD");
INSERT INTO currencies ( code ) VALUES ("USD");
-- ------------------------------------ 
INSERT INTO categories ( id, name ) VALUES (1, "FOOD");
INSERT INTO categories ( id, name ) VALUES (2, "RESTAURANT");
INSERT INTO categories ( id, name ) VALUES (3, "GAS");
INSERT INTO categories ( id, name ) VALUES (4, "GROCERIES");
INSERT INTO categories ( id, name ) VALUES (5, "FRUITS");
INSERT INTO categories ( id, name ) VALUES (6, "OTHER");
-- ------------------------------------ 
INSERT INTO receipts ( id, marketplace_id, receipt_date, total_price, currency ) 
VALUES (1, 1, "2022-01-03 21:00:00", 333, "RSD");
INSERT INTO receipts ( id, marketplace_id, receipt_date, total_price, currency ) 
VALUES (2, 2, "2022-12-12 16:40:00", 444, "USD");
INSERT INTO receipts ( id, marketplace_id, receipt_date, total_price, currency ) 
VALUES (3, 3, "2023-01-05 16:16:16", 888, "RSD");
-- ------------------------------------
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, ammount, total_price ) 
VALUES (1, "Banana", 5, 1, "RSD", 250, 1, 111);
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, ammount, total_price ) 
VALUES (2, "Meda Igracka", 6, 1, "RSD", 2400, 1, 222);
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, ammount, total_price ) 
VALUES (3, "Kafa", 1, 2, "RSD", 240, 1, 444);
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, ammount, total_price ) 
VALUES (4, "Vino Vranjanac", 1, 3, "RSD", 470, 1, 333);
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, ammount, total_price ) 
VALUES (5, "Kafa", 1, 3, "RSD", 240, 1, 555);
------------------------------------
--  get last 5
SELECT r.id AS receipt_id, m.name AS shop_name, m.address AS shop_address, r.currency, r.receipt_date, r.total_price AS receipt_price, a.total_price AS articlePrice, c.name AS cat_name
 FROM ( SELECT * FROM receipts ORDER BY receipt_date DESC LIMIT 0,5 ) AS r 
INNER JOIN articles AS a ON r.id = a.receipt_id 
INNER JOIN marketplaces as m ON m.id = r.marketplace_id 
INNER JOIN categories as c ON c.id = a.category_id
WHERE adddate(receipt_date,90) > current_timestamp();
