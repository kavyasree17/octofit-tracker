import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        profile: 'Trail runner focused on consistent weekly mileage.',
      },
      {
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        profile: 'Strength enthusiast building a balanced routine.',
      },
      {
        username: 'sam-taylor',
        email: 'sam.taylor@example.com',
        profile: 'Cyclist training for a summer charity ride.',
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly team for outdoor cardio and endurance goals.',
        memberIds: [users[0]._id, users[2]._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength, mobility, and steady progress together.',
        memberIds: [users[1]._id],
      },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { teamId: teams[1]._id });
    await User.findByIdAndUpdate(users[2]._id, { teamId: teams[0]._id });

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Trail run',
        durationMinutes: 48,
        points: 96,
        completedAt: new Date('2026-09-22T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 42,
        points: 84,
        completedAt: new Date('2026-09-23T17:45:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 65,
        points: 130,
        completedAt: new Date('2026-09-24T06:45:00Z'),
      },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 420, rank: 2 },
      { userId: users[1]._id, points: 365, rank: 3 },
      { userId: users[2]._id, points: 510, rank: 1 },
    ]);

    await Workout.create([
      {
        name: 'Morning Mobility Reset',
        description: 'Gentle movement to prepare the hips, shoulders, and spine.',
        difficulty: 'beginner',
        durationMinutes: 15,
        target: 'Mobility',
      },
      {
        name: 'Full Body Foundation',
        description: 'A practical circuit covering the major movement patterns.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        target: 'Strength',
      },
      {
        name: 'Tempo Run Builder',
        description: 'Intervals that develop sustainable speed and running form.',
        difficulty: 'advanced',
        durationMinutes: 40,
        target: 'Endurance',
      },
    ]);

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);
    console.log(`Seeded users=${counts[0]}, teams=${counts[1]}, activities=${counts[2]}, leaderboard=${counts[3]}, workouts=${counts[4]}`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
