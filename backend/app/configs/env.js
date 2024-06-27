
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), '.env') });

const envConfigs = {
    dbUri: process.env.MONGODB_URI,
    port: process.env.PORT || 3000,
};
module.exports = envConfigs;