import bodyParser from 'body-parser';
import express from 'express';
import bookRoutes from './routes/book';

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use('/books', bookRoutes);

router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});
router.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})