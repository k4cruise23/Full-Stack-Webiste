INSERT INTO users (username, password, is_admin)
VALUES ($1, $2, false)
RETURNING user_id, username, password;