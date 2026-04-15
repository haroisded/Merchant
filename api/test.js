function test(req, res) {
    const { method, body } = req;

    const user = {
        username: body.username,
        email: body.email,
        phone: body.phone,
        password: body.password,
    };

    return res.status(200).json({
        success: true,
        method: method,
        user: user
    });
}

export default test;