const express = require('express')
const app = express()
const port = 1991
const cors = require('cors')
const connectDB = require('./models/database')
require('dotenv').config({path: '.env'})
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes/index')

const corsOptions = {
    exposedHeaders: 'Authorization',
};

connectDB()


app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

routes(app);

app.get('/logout', (req, res) => {
    // Xóa cookie bằng cách đặt lại nó với thời gian hết hạn 0
    res.cookie('yourCookieName', '', { expires: new Date(0), path: '/' });
    res.redirect('/signin'); // Chuyển hướng đến trang đăng nhập sau khi xóa cookie
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



