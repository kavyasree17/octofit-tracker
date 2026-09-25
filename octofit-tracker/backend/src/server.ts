import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiUrl: baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }));
});

app.post('/api/users/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('memberIds', 'username email').sort({ name: 1 }));
});

app.post('/api/teams/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

app.get('/api/activities/', async (request, response) => {
  const filter = request.query.userId ? { userId: request.query.userId } : {};
  response.json(await Activity.find(filter).sort({ completedAt: -1 }));
});

app.post('/api/activities/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('userId', 'username profile')
    .sort({ points: -1 });
  response.json(leaderboard.map((entry, index) => ({ ...entry.toObject(), rank: index + 1 })));
});

app.post('/api/leaderboard/', async (request, response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json(entry);
});

app.get('/api/workouts/', async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {};
  response.json(await Workout.find(filter).sort({ name: 1 }));
});

app.post('/api/workouts/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});