SELECT url, password
FROM website_passwords
JOIN website_url_details ON website_url_details.id = website_passwords.id
JOIN users ON website_passwords.user_id = users.id
WHERE url LIKE '%123%' AND user_id= 15;
