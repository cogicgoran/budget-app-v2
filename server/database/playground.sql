INSERT INTO marketplaces ( id, name, address ) 
VALUES (1, "Univerexport", "Bulevar Jase Tomica 10A"),
	(2, "MAXI", "Bulevar Oslobodjena 36"),
	(3, "Pekara Violeta", "Bulevar Kralja Petra 4");
-- ------------------------------------
INSERT INTO currencies ( code )
 VALUES ("EUR"),
	("RSD"),
	("USD");
-- ------------------------------------ 
INSERT INTO categories ( id, name, icon_name, color_main, color_border ) 
VALUES (1, "FOOD", "apple-alt", "#EB6383", "#CB4363"),
	(2, "RESTAURANT", "coctail", "#E7B2A5", "#C79285"),
	(3, "GAS", "car", "#EEF9BF", "#BED99F"),
	(4, "GROCERIES", "cart-shopping", "#F39189", "#D37169"),
	(5, "FRUITS", "carrot", "#6E7582", "#5E5562"),
	(6, "OTHER", "football", "#046582", "#005562");
-- ------------------------------------ 
INSERT INTO receipts ( id, marketplace_id, receipt_date, total_price, currency ) 
VALUES (1, 1, "2022-01-02 21:00:00", 333, "RSD"),
	(2, 2, "2021-08-12 16:40:00", 444, "USD"),
	(3, 3, "2021-01-05 16:16:16", 888, "RSD"),
	(4, 1, "2022-01-04 23:00:00", 350, "RSD"),
	(5, 2, "2022-01-03 22:00:00", 340, "RSD");
-- ------------------------------------
INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, amount, total_price ) 
VALUES (1, "Banana", 5, 1, "RSD", 30, 1, 30),
	(2, "Meda Igracka", 6, 1, "RSD", 200, 1, 200),
	(3, "Kafa", 1, 2, "RSD", 440, 1, 444),
	(4, "Vino Vranjanac", 1, 3, "RSD", 333, 1, 333),
	(5, "Kafa", 1, 3, "RSD", 555, 1, 555),
	(6, "Testenina", 1, 1, "RSD", 100, 1, 100),
	(7, "Zvaka", 4, 1, "RSD", 3, 1, 3),
	(8, "Zvucnik", 1, 4, "RSD", 350, 1, 350),
	(9, "Krompir", 4, 5, "RSD", 340, 1, 340);
-- ----------------------------------
--  get last 5

SELECT r.id AS receipt_id, m.name AS shop_name, m.address AS shop_address, r.currency, r.receipt_date, r.total_price AS receipt_price, a.total_price AS articlePrice, c.name AS cat_name
 FROM ( SELECT * FROM receipts ORDER BY receipt_date DESC LIMIT 0,5 ) AS r 
INNER JOIN articles AS a ON r.id = a.receipt_id 
INNER JOIN marketplaces as m ON m.id = r.marketplace_id 
INNER JOIN categories as c ON c.id = a.category_id
WHERE adddate(receipt_date,90) > current_timestamp() ORDER BY receipt_date DESC;

-- get info for current month
SELECT a.name, a.total_price, a.currency, c.name FROM (SELECT * FROM receipts WHERE month(receipt_date) = month(current_timestamp()) AND year(receipt_date) = year(current_timestamp())) AS r
INNER JOIN articles AS a ON r.id = a.receipt_id
INNER JOIN categories AS c on a.category_id = c.id;

SELECT COUNT(id) FROM categories WHERE name IN ('FRUITS', 'GROCERIES');

SELECT * FROM articles;
SELECT * FROM currencies;
SELECT * FROM receipts;
SELECT * FROM marketplaces;