SELECT users.name, organizations.name FROM users
JOIN organizations ON users.organization_id = organizations.id
JOIN permissions ON users.permission_id = permissions.id
WHERE permissions.role = 'User' AND organization_id = 1;
