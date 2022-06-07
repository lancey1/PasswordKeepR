const express = require('express');
const router = express.Router();
const { queryMembersByOrganizationId, queryUsersByOrganizationId } = require('../helper/queries');

router.use((req, res, next) => {
    if (!res.locals.isAdmin) return res.status(401).render('401');
    next();
})

router.get('/manage', async (req, res) => {
    let organization_id = res.locals.user['organization_id'];
    console.log(organization_id);
    var members_arr;
    var nonMembers_arr;
    try {
        membesr_arr = await queryMembersByOrganizationId(organization_id);
    } catch (error) {
        throw error['message'];
    }
    try {
        nonMembers_arr = await queryUsersByOrganizationId(organization_id);
    } catch (error) {
        throw error['message'];
    }
    return res.render('admin', { members: members_arr, nonMembers: nonMembers_arr });
})

router.post('/manage/accept/:userId', (req, res) => {

})

router.post('/manage/ignore/:userId', (req, res) => {

})

router.post('/manage/kick/:userId', (req, res) => {

})

module.exports = router;