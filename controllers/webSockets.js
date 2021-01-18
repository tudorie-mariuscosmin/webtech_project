const { Feedback, Activity } = require('../models')
module.exports = (socket) => {
    socket.on('joinActivity', ({ token }) => {
        socket.join(token)
        console.log(token)
    })


    socket.on('feedback', async ({ feedbacksent, token, time }) => {
        const activity = await Activity.findOne({
            where: {
                token: token
            }
        })
        if (activity) {
            let feedback = new Feedback({
                data: feedbacksent
            })
            feedback.activityId = activity.id
            await feedback.save()
            socket.broadcast.to(token).emit('feedback', { feedbacksent, time })
        }
    })

}