import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients',patientRouter);
app.get('/api/ping',(_req, res) => {
    console.log('somebody pinged');
    res.send('pongggggg');
});

const PORT = 3001;

app.listen(PORT,() => {
    console.log(`Server listening at ${PORT}`);
});