INSERT INTO blogful_articles (title, date_published, content) 
VALUES
  ('Article 1A', now() - '30 days'::INTERVAL, 'Articles 1A is...'),
  ('Article 1B', now() - '21 days'::INTERVAL, 'Released on Article 1A''s aniversary...'),
  ('Article 1C', now() - '11 days'::INTERVAL, 'Article 1C was writtent to provide clarification on several errors made...'),
  ('Article 2A', now() - '24 days'::INTERVAL, 'Content 112'),
  ('Article 2B', now() - '13 days'::INTERVAL, 'Content 142'),
  ('Article 2C', now() - '15 days'::INTERVAL, 'Content 152'),
  ('Article 3A', now() - '22 days'::INTERVAL, 'Content 161'),
  ('Article 3B', now() - '32 days'::INTERVAL, 'Content 131'),
  ('Article 4A', now() - '50 days'::INTERVAL, 'Content 132'),
  ('Article 4B', now() - '01 days'::INTERVAL, 'Content 2132'),
  ('Article 4C', now() - '08 days'::INTERVAL,'Content 1342'),
  ('Article 4D', now() - '18 days'::INTERVAL,'Content 1232'),
  ('Happy, happy', now() - '55 days'::INTERVAL, 'Content 1332'),
  ('Blue skys', now() - '01 days'::INTERVAL, 'Content 1367'),
  ('Inside', now() - '21 days'::INTERVAL, 'Content 1387'),
  ('Reckoner', now() - '16 days'::INTERVAL, 'Content 1223'),
  ('Peacan pie', now() - '25 days'::INTERVAL, 'Content 1362'),
  ('SSBM', now() - '24 days'::INTERVAL, 'Content 9132'),
  ('Lux Prima', now() - '23 days'::INTERVAL, 'Content 1325'),
  ('S*x S*cks S*nk', now() - '28 days'::INTERVAL, 'Content 1132'),
  ('Final', now(), 'Content 1452')