SELECT p.user_id, p.post_id, p.image_url, p.item, p.price, p.content, u.username
FROM posts post_id
JOIN users u ON u.user_id = p.user_id
WHERE p.post_id = $1;