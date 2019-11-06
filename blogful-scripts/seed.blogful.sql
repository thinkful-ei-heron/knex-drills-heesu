BEGIN;

INSERT INTO blogful_articles
  (title, date_published, content)

VALUES
  ('hello', now() - '21 days'::INTERVAL, 'afternoon'),
  ('bye', now() - '9 days'::INTERVAL, 'morning'),
  ('oops', now() - '7 days'::INTERVAL, 'soso'),
  ('morning', now() - '5 days'::INTERVAL, 'bad'),
  ('cup', now() - '4 days'::INTERVAL, 'good'),
  ('water', now() - '3 days'::INTERVAL, 'byeee')
;

COMMIT;