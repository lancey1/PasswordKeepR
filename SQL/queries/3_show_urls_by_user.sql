SELECT website_url_details.id as website_id , 
       website_url_details.url as website_url, 
       website_url_details.website_type as website_type 
FROM website_url_details
JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
JOIN users ON website_passwords.user_id = users.id
WHERE users.id = 1;