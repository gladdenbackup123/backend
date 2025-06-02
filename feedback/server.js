const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/feedbackbox', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Error:', err));

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Test Route
app.get('/hi', (req, res) => {
    res.json({ message: 'Server running!' });
});

app.get('/admin', async (req,res)=>{
    const adminPassword = req.headers['admin-password'];
    if (adminPassword !== 'admin123'){
        return res.status(401).json({error:'Unauthorized Request: Invalid Password'});
    }

    try{
        const allFeedbacks = await Feedback.find().sort({createdAt:-1});
        res.json({count:allFeedbacks.length , feedback: allFeedbacks})
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Failed to fetch feedbacks'})
    }

});

//Public Feedback Submission Route
app.post('/api/feedback', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const feedback = await Feedback.create({ message });
        res.status(201).json({ success: true, feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



// Start Server
app.listen(5008, () => {
    console.log('🚀 Server running on port 5008');
});
