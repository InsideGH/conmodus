const getWeather = async (req, res) => {
    console.log(`Api getWeather host=${req.get('host')} origin=${req.get('origin')}`);
    res.send('API service Sunny and warm @' + new Date().getTime() + " " + req.url);
};

module.exports = getWeather;
