const express = require('express');
const router = express.Router();
const { queryMembersByOrganizationId, queryUsersByOrganizationId, grantUserPermission, deleteUserPermission, ignoreUserPermission } = require('../helper/queries');
const {protectAdminRoutes} = require('../helper/protectRoutes')

router.get('/manage', protectAdminRoutes, async (req, res) => {
    let organization_id = res.locals.user['organization_id'];
    var members_arr;
    var nonMembers_arr;
    try {
        members_arr = await queryMembersByOrganizationId(organization_id);
    } catch (error) {
        throw error['message'];
    }
    try {
        nonMembers_arr = await queryUsersByOrganizationId(organization_id);
    } catch (error) {
        throw error['message'];
    }
    console.log(members_arr, ' ', nonMembers_arr);
    return res.render('admin', { members: members_arr, nonMembers: nonMembers_arr });
})

router.post('/manage/accept/:userId', protectAdminRoutes, async (req, res) => {
    try {
        await grantUserPermission(req.params.userId);
        return res.redirect('/manage');
    } catch (error) {
        throw error;
    }
})

router.post('/manage/ignore/:userId', protectAdminRoutes,async (req, res) => {
    try {
        await ignoreUserPermission(req.params.userId);
        return res.redirect('/manage');
    } catch (error) {
        throw error;
    }
})

router.post('/manage/kick/:userId', protectAdminRoutes,async (req, res) => {
    try {
        await deleteUserPermission(req.params.userId);
        return res.redirect('/manage');
    } catch (error) {
        throw error;
    }
})

module.exports = router;