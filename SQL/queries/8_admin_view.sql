SELECT users.id as id,
       users.name as name,
       permissions.role as role,
       users.email as email,
       website_url_details.URL as URL,
       website_passwords.website_username as username,
       website_passwords.generated_password as website_passwords,
       organization_id
       FROM users
JOIN permissions ON users.permission_id = permissions.id
JOIN organizations ON users.organization_id = organizations.id
JOIN website_passwords ON users.id = website_passwords.user_id
JOIN website_url_details ON website_url_details.id = website_passwords.website_url_id
WHERE organization_id = 1
ORDER BY users.id;
