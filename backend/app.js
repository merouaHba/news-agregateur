require('dotenv').config()
require('express-async-errors');

// extra security packages
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const limiter = require('./middlewares/rateLimiter');
const mongoSanitize = require('express-mongo-sanitize');

// extra performance packages
const compression = require('compression');

// logger
const { successHandle, errorHandle } = require('./middlewares/morgan');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express')
const app = express();
const http = require('http');
const socketIo = require('socket.io');



// // Set trust proxy to true
app.enable('trust proxy');
// // Morgan logging Handler
app.use(successHandle);
app.use(errorHandle);

// routers
const authRouter = require('./routes/authRouter');
// const userRouter = require('./routes/userRouter');
const articleRouter = require('./routes/articleRouter');

// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');



// Set Body parser, reading data from body into req.body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));






// Set security HTTP headers
app.use(helmet());
    
// Implement CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.options('*', cors());
app.use((_,res,next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})
// Data sanitization against XSS
app.use(xss());

// MongoDB data sanitization
app.use(mongoSanitize())

app.use(cookieParser(process.env.JWT_SECRET));


// disable attackers to know the server stack (express - php ...ect)
app.disable('x-powered-by');

// response data compression
app.use(compression())


// Limit Repeated Failed Requests to Auth Endpoints
if (process.env.NODE_ENV === 'production') {
    app.use('/api/v1', limiter);
}


app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));





// routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users',  userRouter);
app.use('/api/v1/news',  articleRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});


// fetch rss feed every minute
const fetchNews = require('./services/fetchGoogleRssNews');

// Fetch news every minute using cron
const { sheduledFunction } = require('./utils');
sheduledFunction('* * * * *', () => fetchNews(io));


module.exports = { server }
