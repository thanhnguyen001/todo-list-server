const express = require('express');
const router = express.Router();
const User = require('../app/Models/User');

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) return res.json({ success: false, message: "Username or password is incorrect" });

        res.json({
            success: true, user: {
                id: user._id,
                username: user.username,
                list: user.list
            }
        })
    } catch (error) {
        res.json({ success: false, message: "Invalid server" })
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const isExist = await User.findOne({ username });
        if (isExist) return res.json({ success: false, message: "User has already existed" })
        const newUser = new User({
            username, password, list: []
        });
        console.log(req.body)
        const user = await newUser.save();

        res.json({
            success: true, user: {
                id: user._id,
                username: user.username,
                list: []
            }
        })

    } catch (error) {
        res.json({ success: false, message: "Invalid server" })
    }
})
router.post("/update/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { list } = req.body;
        const isExistUser = await User.findById(id);
        if (!isExistUser) return res.json({ success: false, message: "User doesn't exist" });
        isExistUser.list = [...list];
        const user = await isExistUser.save();
        res.json({
            success: true, user: {
                id: user._id,
                username: user.username,
                list: user.list
            }
        })

    } catch (error) {
        res.json({ success: false, message: "Invalid server" })
    }
})

module.exports = router;