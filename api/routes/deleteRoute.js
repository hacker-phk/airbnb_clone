const express = require('express');
const router = express.Router();
const Place = require('../models/Place'); // Adjust the path as necessary

router.delete('/delete', async (req, res) => {
    const filter = {}; // Define your filter criteria here

    try {
        const result = await Place.deleteMany(filter);

        if (result.deletedCount > 0) {
            res.status(200).json({ message: `${result.deletedCount} place(s) deleted.` });
        } else {
            res.status(404).json({ message: 'No places found to delete.' });
        }
    } catch (error) {
        console.error("Error deleting places", error);
        res.status(500).json({ error: 'An error occurred while deleting places.' });
    }
});

module.exports = router;
