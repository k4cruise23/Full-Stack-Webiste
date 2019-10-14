INSERT INTO posts (user_id, item, price, content, image_url)
VALUES ($1,$2,$3,$4,$5);

SELECT p.post_id, p.user_id, p.item, p.price, p.content, p.image_url
FROM posts p
JOIN users u ON p.user_id = u.user_id;

