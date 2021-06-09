const getToken = (cookie) => {};

export default {
  'POST /api/auth/login': (req, res) => {
    const { username, password } = req.body;
    if (username == 'admin' && password == '123456') {
      setTimeout(() => {
        res.send({
          status: 0,
          loginUser: `系统管理员`,
          userRole: 1,
        });
      }, 500);
    } else {
      res.send({ code: 1, errorText: '用户名或密码错误' });
    }
  },

  'GET /api/auth': (req, res) => {
    const username = 'admin';
    res.send({
      code: 0,
      loginUser: `系统管理员`,
      userRole: 1,
    });
  },
};
