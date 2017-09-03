const express = require('express')();
const port = process.env.PORT || 3000;

express.listen(port);

console.log(`Server started on: ${port}`);
