const getWeather = async (req, res) => {
    res.send('API service Sunny and warm @' + new Date().getTime() + " " + req.url);
};

module.exports = getWeather;
