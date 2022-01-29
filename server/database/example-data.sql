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
INSERT INTO categories ( id, name ) 
VALUES (1, "FOOD"),
	(2, "RESTAURANT"),
	(3, "GAS"),
	(4, "GROCERIES"),
	(5, "FRUITS"),
	(6, "OTHER");
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