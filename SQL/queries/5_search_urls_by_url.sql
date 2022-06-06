SELECT url, password, user_id
FROM website_url_details
JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
JOIN users ON website_passwords.user_id = users.id
WHERE url LIKE '%accu%' and user_id = 12;
