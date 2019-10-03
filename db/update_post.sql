UPDATE posts
SET item = $1,
price = $2,
content = $3,
image_url = $4
WHERE post_id = $5
RETURNING *;