const { User, Activity, Feedback } = require("../models")

module.exports = {

    createActivity: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id)
            if (user) {
                if (!req.body.name || !req.body.description || !req.body.subject || !req.body.endAt) {
                    res.send(400).json({ message: "Enter activity detailes" })
                } else {
                    const activity = new Activity({
                        name: req.body.name,
                        subject: req.body.subject,
                        description: req.body.description,
                        endAt: req.body.endAt
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
                        createdAt: activity.createdAt,
                        endAt: activity.endAt,
                        isOpen: activity.isOpen
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
            const activities = await Activity.findAll({
                where: {
                    userId: req.user.id
                }
            })
            if (activities) {
                console.log(activities)
                const activity = activities.find(x => x.id == req.params.activityId)
                if (activity) {
                    if (req.body.name) {
                        activity.name = req.body.name
                    }
                    if (req.body.subject) {
                        activity.subject = req.body.subject
                    }
                    if (req.body.description) {
                        activity.description = req.body.description
                    }
                    await activity.save()
                    res.status(200).json({ message: "Activity updated!" })
                } else {
                    res.status(404).json({ message: "Activity not found!" })
                }
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    },


    getActivity: async (req, res) => {
        try {
            const activity = await Activity.findOne({
                where: {
                    token: req.params.token
                }
            })
            if (activity) {
                if (activity.isOpen) {
                    if (new Date(activity.endAt) > new Date()) {
                        res.status(200).json({
                            name: activity.name,
                            subject: activity.subject,
                            description: activity.description,
                            token: activity.token
                        })
                    } else {
                        activity.isOpen = false;
                        await activity.save();
                        res.status(400).json({ message: "Activity ended" })
                    }
                }
                else {
                    res.status(400).json({ message: "Activity ended" })
                }

            }
            else {

            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    },


    getFeedback: async (req, res) => {
        try {
            const activity = await Activity.findOne({
                include: [Feedback],
                where: {
                    id: req.params.activityId,
                    userId: req.user.id
                }
            })
            if (activity) {
                const data = activity.feedbacks.map(x => {
                    return {
                        id: x.id,
                        data: x.data,
                        createdAt: x.createdAt
                    }
                })
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'No activity found' })
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    },
    deleteActivity: async (req, res) => {
        try {
            const activities = await Activity.findAll({
                where: {
                    userId: req.user.id
                }
            })
            if (activities) {
                console.log(activities)
                const activity = activities.find(x => x.id == req.params.activityId)
                if (activity) {
                    await activity.destroy()
                    res.status(200).json({ message: "Activity deleted" })
                } else {
                    res.status(404).json({ message: "Activity not found!" })
                }
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ err: err.message })
        }
    }
}