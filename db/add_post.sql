INSERT INTO posts (user_id, item, price, description)
VALUES ($1,$2,$3,$4);

SELECT p.post_id, p.user_id, p.item, p.price, p.description
FROM posts p
JOIN users u ON p.user_id = u.user_id;