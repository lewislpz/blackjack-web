import { createApp } from './app';
import { API_PORT } from './config';

const app = createApp();

app.listen(API_PORT, () => {
  console.log(`Blackjack API listening on http://localhost:${API_PORT}`);
});

