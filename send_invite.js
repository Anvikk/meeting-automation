const nodemailer = require('nodemailer');

// ─── MEETING LINKS ────────────────────────────────────────────────
const MEETINGS = {
  '2026-04-28': 'https://meeting.tencent.com/dm/hLYvWGeUESs4',
  '2026-04-30': 'https://meeting.tencent.com/dm/aDqr3THCy7iz',
  '2026-05-05': 'https://meeting.tencent.com/dm/Ez1yN2vLFGQ6',
  '2026-05-07': 'https://meeting.tencent.com/dm/9o0detxRHmqj',
  '2026-05-12': 'https://meeting.tencent.com/dm/Y4CyHq3nAg82',
  '2026-05-14': 'https://meeting.tencent.com/dm/KQ7upYlOnhXg',
  '2026-05-19': 'https://meeting.tencent.com/dm/MMRBfO9Cj98k',
  '2026-05-21': 'https://meeting.tencent.com/dm/o6OzpdgnvabP',
  '2026-05-26': 'https://meeting.tencent.com/dm/w1MctqMOqH4I',
  '2026-05-28': 'https://meeting.tencent.com/dm/pndCrhbUSXQz',
  '2026-06-02': 'https://meeting.tencent.com/dm/nesr2KOEtE8c',
  '2026-06-04': 'https://meeting.tencent.com/dm/qc9Q4XayExNE',
  '2026-06-09': 'https://meeting.tencent.com/dm/edy8ocQWfcAx',
  '2026-06-11': 'https://meeting.tencent.com/dm/soSTVGu11ead',
  '2026-06-16': 'https://meeting.tencent.com/dm/BCBl5iChnBU3',
  '2026-06-18': 'https://meeting.tencent.com/dm/UiWthIHRssFG',
  '2026-06-23': 'https://meeting.tencent.com/dm/UqkWCAvu86Rl',
  '2026-06-25': 'https://meeting.tencent.com/dm/GGtvq8bEplq9',
  '2026-06-30': 'https://meeting.tencent.com/dm/Zgdobnp1hzH3',
  '2026-07-07': 'https://meeting.tencent.com/dm/BXdY9HN3ScVE',
  '2026-07-09': 'https://meeting.tencent.com/dm/jsDrUnq3wfnF',
  '2026-07-14': 'https://meeting.tencent.com/dm/6a9N5oNxOH8g',
  '2026-07-16': 'https://meeting.tencent.com/dm/GrDkpCtvZyBR',
  '2026-07-21': 'https://meeting.tencent.com/dm/oul8KV7uXInR',
  '2026-07-23': 'https://meeting.tencent.com/dm/ph1owJdLYFlm',
  '2026-07-28': 'https://meeting.tencent.com/dm/9NWdtPy55ODZ',
  '2026-07-30': 'https://meeting.tencent.com/dm/QrHvfg95TBzf',

  // ─── Sept/Oct 2026: schedule changed to Mondays, 6:30–7:30 PM CST ───
  '2026-09-07': 'https://meeting.tencent.com/dm/NzXaCvcC3SSn',
  '2026-09-14': 'https://meeting.tencent.com/dm/q7VRqr4t9DI3',
  '2026-09-21': 'https://meeting.tencent.com/dm/Xc2rKeJoj6LQ',
  '2026-09-28': 'https://meeting.tencent.com/dm/0cx1U43yOtTx',
  '2026-10-05': 'https://meeting.tencent.com/dm/xaIKPnp6trxQ',
  '2026-10-12': 'https://meeting.tencent.com/dm/yYg4e7rmhYQE',


  // ─── Wednesday schedule (from 2026-10-21): 6:30–7:30 PM China time ───
  '2026-10-21': 'https://meeting.tencent.com/dm/yBqOr8iuTO4k',
  '2026-10-28': 'https://meeting.tencent.com/dm/8iIS9K2GMUtJ',
  '2026-11-04': 'https://meeting.tencent.com/dm/ZKKIGMmaG2jj',
  '2026-11-11': 'https://meeting.tencent.com/dm/2XFEAHb8VeZM',
  '2026-11-18': 'https://meeting.tencent.com/dm/lPq7YcmZYxpx',
  '2026-11-25': 'https://meeting.tencent.com/dm/UajnMx2cqtkE',
  '2026-12-02': 'https://meeting.tencent.com/dm/olpUen7cDE0H',
  '2026-12-09': 'https://meeting.tencent.com/dm/uFo7V71itJUi',
  '2026-12-16': 'https://meeting.tencent.com/dm/0eUScvKXLtns',
  '2026-12-23': 'https://meeting.tencent.com/dm/8c2xnxywxWpY',
};

// Class time is 6:30–7:30 PM China Standard Time. The cron-job.org trigger decides when it runs; wording adapts to the time left.
const CLASS_DAY = 'Wednesday';

// ─── RECIPIENTS ───────────────────────────────────────────────────
const TO = [
  'gxt661215@icloud.com',
  's.sheik0123@gmail.com',
  'montallamitchel1717@gmail.com',
];
const CC = 'petrpesekpesek@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const now = new Date();
const chinaParts = Object.fromEntries(
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now).map(({ type, value }) => [type, value]),
);
const todayStr = `${chinaParts.year}-${chinaParts.month}-${chinaParts.day}`;
const dateForEmail = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  timeZone: 'Asia/Shanghai',
}).format(now);
// Time left until class (18:30 China time), so the wording is always true
const CLASS_START_MIN = 18 * 60 + 30;
const minsLeft = CLASS_START_MIN - (Number(chinaParts.hour) * 60 + Number(chinaParts.minute));
let timeLeftEn;
let timeLeftZh;
if (minsLeft >= 90) {
  const h = Math.round(minsLeft / 60);
  timeLeftEn = `about ${h} hours`;
  timeLeftZh = `大约${h}小时`;
} else {
  const m = Math.max(5, Math.round(minsLeft / 5) * 5);
  timeLeftEn = `about ${m} minutes`;
  timeLeftZh = `大约${m}分钟`;
}
const from = `"Petr Pešek" <${process.env.GMAIL_USER}>`;

async function main() {
  if (process.env.TEST_EMAIL === 'true') {
    const info = await transporter.sendMail({
      from,
      to: CC,
      subject: '[Test] Meeting automation email delivery',
      text: 'This is a test of the meeting automation email delivery. No class invitation was sent.',
    });
    console.log(`Test email sent only to the CC address. Message ID: ${info.messageId}`);
    return;
  }

  if (chinaParts.weekday !== CLASS_DAY) {
    console.log(`${todayStr} is ${chinaParts.weekday}; ${CLASS_DAY}-only schedule, nothing to send.`);
    return;
  }

  const meetingLink = MEETINGS[todayStr];
  if (!meetingLink) {
    // Fail loudly so a missing link doesn't silently skip a class day.
    throw new Error(`No meeting link set for ${todayStr} (${CLASS_DAY}). Add it to MEETINGS.`);
  }

  const subject = `Class Meeting in ${timeLeftEn.replace('about','About')} – ${dateForEmail}`;
  const body = `Dear Eva, Sue & Mitchel,

Your class meeting is starting in ${timeLeftEn}.

📅 Date: ${dateForEmail}
⏰ Time: 6:30 PM – 7:30 PM (China Standard Time)
🔗 Join here: ${meetingLink}

Please make sure you are ready 5 minutes before the session begins.

See you soon!
Petr

---

亲爱的 Eva、Sue 和 Mitchel，

您的课程会议将在${timeLeftZh}后开始。

📅 日期：${dateForEmail}
⏰ 时间：晚上 6:30 – 7:30（北京时间）
🔗 点击加入：${meetingLink}

请在上课前5分钟做好准备。

期待与您相见！
Petr`;

  const info = await transporter.sendMail({
    from,
    to: TO.join(', '),
    cc: CC,
    subject,
    text: body,
  });
  console.log(`Invite sent successfully for ${todayStr}!`);
  console.log('Message ID:', info.messageId);
}

main().catch((err) => {
  console.error('Failed to send email:', err);
  process.exitCode = 1;
});
