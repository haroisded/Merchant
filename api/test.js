function test(req, res) {
    const {method, query} = req;
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Methods', 'GET');
    res.setHeader('Access-Control-', 'GET');

    return res.status(200).json({
        success: true,
        method: method
    })
}

export default test