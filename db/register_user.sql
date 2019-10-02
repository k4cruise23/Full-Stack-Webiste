INSERT INTO users (username, password, isAdmin)
VALUES ($1, $2, false)
RETURNING *;