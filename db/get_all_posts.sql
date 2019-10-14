SELECT * FROM posts;

-- SELECT u.username, p.post_id, p.user_id, p.price, p.content, p.image_url
-- FROM users u
-- JOIN posts p ON u.user_id = p.user_id
-- WHERE u.user_id = $1;