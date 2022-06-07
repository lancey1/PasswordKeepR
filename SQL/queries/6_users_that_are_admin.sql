SELECT users.name, organizations.name, organization_id FROM users
JOIN organizations ON users.organization_id = organizations.id
JOIN permissions ON users.permission_id = permissions.id -- might not be necessary
WHERE permission_id = 1 AND organization_id = 1;
-- WHERE permissions.role = 'Admin' AND organization_id = 1; not sure which one is better
