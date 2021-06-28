CREATE TABLE users (
id          SERIAL PRIMARY KEY,
first_name  TEXT NOT NULL,
last_name   TEXT NOT NULL,
email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
password    TEXT NOT NULL,
is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE excercises (
id          SERIAL PRIMARY KEY,
name        TEXT NOT NULL,
category    TEXT,
duration    INTEGER,
intensity   INTEGER,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
timestamp  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
id          SERIAL PRIMARY KEY,
name        TEXT NOT NULL,
category    TEXT,
quantity    INTEGER,
calories    INTEGER,
image_url   TEXT,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
timestamp  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sleep (
id          SERIAL PRIMARY KEY,
start_time  TIMESTAMP NOT NULL,
end_time    TIMESTAMP NOT NULL,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
timestamp  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE activity (
id                 SERIAL PRIMARY KEY,
activity_type      VARCHAR(50) NOT NULL,
excercise_id       INTEGER REFERENCES excercises(id) on DELETE CASCADE,
nutrition_id       INTEGER REFERENCES nutrition(id) on DELETE CASCADE,
sleep_id           INTEGER REFERENCES sleep(id) on DELETE CASCADE,
timestamp          TIMESTAMP DEFAULT NOW()
);