DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    isAdmin BOOLEAN
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    item VARCHAR(100),
    price VARCHAR(100),
    content TEXT,
    image_url TEXT
);

INSERT INTO users (username, password, isAdmin)
VALUES ('kt', 'ktkt', true);
SELECT * FROM users;

INSERT INTO posts (user_id, item, price, content, image_url)
VALUES (1, 'Fresh Produce', '$5.00', 'I have some extra fresh produce if anyone wants/needs it!', 'https://www.goodnature.com/wp-content/uploads/2014/06/Farm-Fresh-to-You-produce.jpg');
SELECT * FROM posts;