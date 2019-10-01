DROP TABLE users;
DROP TABLE posts;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    item VARCHAR(50),
    price VHARCHAR(10),
    content TEXT,
    image_url TEXT
);