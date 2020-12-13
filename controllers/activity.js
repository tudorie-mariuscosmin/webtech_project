const { User, Activity } = require("../models")

module.exports = {

    createActivity: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id)
            if (user) {
                if (!req.body.name || !req.body.description || !req.body.subject) {
                    res.send(400).json({ message: "Enter activity detailes" })
                } else {
                    const activity = new Activity({
                        name: req.body.name,
                        subject: req.body.subject,
                        description: req.body.description
                    })
                    activity.userId = req.user.id
                    await activity.save()
                    res.status(201).json(activity)
                }
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    },
    getUserActivities: async (req, res) => {
        try {
            const activities = await Activity.findAll({
                where: {
                    userId: req.user.id
                }
            })
            if (activities) {
                const data = activities.map(activity => {
                    return {
                        id: activity.id,
                        name: activity.name,
                        subject: activity.subject,
                        description: activity.description,
                        token: activity.token,
                        createdAt: activity.createdAt
                    }
                })
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "No activities found" })
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    },
    updateActivities: async (req, res) => {
        try {
            const activity = await Activity.findByPk(req.params.activityId)
            if(activity) {
                if(req.body.name) {
                    activity.name = req.body.name
                } 
                if(req.body.subject) {
                    activity.subject = req.body.subject
                }
                if(req.body.description) {
                    activity.description = req.body.description
                }
                await activity.save()
                res.status(200).json({message: "Activity updated!"})
            } else {
                res.status(404).json({message: "Activity not found!"})
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    }
}