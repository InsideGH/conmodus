const getWeather = async (req, res) => {
    res.send('Sunny and warm @' + new Date().getTime());
};

module.exports = getWeather;