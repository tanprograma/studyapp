import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

import users from './api/routes/users';
import notes from './api/routes/notes.mjs';
import topics from './api/routes/topics.mjs';
import subjects from './api/routes/subjects.mjs';
import quotes from './api/routes/quotes';
import todos from './api/routes/todos';
import plans from './api/routes/plans';
import articles from './api/routes/articles';
import exams from './api/routes/exams';
import results from './api/routes/exam-results';

import books from './api/routes/books';
import projects from './api/routes/projects';
import studyqns from './api/routes/studyqns';
import journals from './api/routes/journal';

dotenv.config();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();
  server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', ['*']);
    res.append('Access-Control-Allow-Methods', [
      'PUT',
      'GET',
      'HEAD',
      'POST',
      'DELETE',
      'OPTIONS',
    ]);

    next();
  });
  server.use(express.json());

  server.use('/api/users', users);
  server.use('/api/notes', notes);
  server.use('/api/exams', exams);
  server.use('/api/study', studyqns);
  server.use('/api/projects', projects);
  server.use('/api/books', books);

  server.use('/api/exam-results', results);
  server.use('/api/quotes', quotes);
  server.use('/api/todos', todos);
  server.use('/api/plans', plans);
  server.use('/api/articles', articles);
  server.use('/api/topics', topics);
  server.use('/api/subjects', subjects);
  server.use('/api/journal', journals);
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const DATABASE_URL = process.env['DATABASE_URL'] as string;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    mongoose
      .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`database ${DATABASE_URL} connected successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

run();
