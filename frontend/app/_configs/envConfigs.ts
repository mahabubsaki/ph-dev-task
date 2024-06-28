const envConfigs = {
    apiUrl: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.LOCAL_API_URL,
    publicApiUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_LOCAL_API_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: +(process.env.JWT_EXPIRES_HOUR!) * 60 * 60 * 1000,
};

export default envConfigs;