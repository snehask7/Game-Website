const express = require('express');
const compression = require('compression');
const path = require('path');



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
