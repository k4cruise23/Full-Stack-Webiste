UPDATE posts
SET item = $2,
price = $3,
content = $4,
image_url = $5
WHERE post_id = $1;

SELECT * FROM posts;