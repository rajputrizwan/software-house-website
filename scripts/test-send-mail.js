const fetch = require('node-fetch');

// Config
const URL = process.env.TEST_SENDMAIL_URL || 'http://localhost:3000/api/send-mail';

async function run() {
  const payload = {
    subject: 'Test email from scripts/test-send-mail.js',
    type: 'test',
    name: 'Local Tester',
    email: 'tester@example.com',
    message: 'This is a test message sent to exercise the API route.'
  };

  try {
    console.log('Posting to', URL);
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);

    if (!res.ok) {
      process.exitCode = 2;
    }
  } catch (err) {
    console.error('Error calling send-mail API:', err);
    process.exitCode = 3;
  }
}

run();
