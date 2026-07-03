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
};

// ─── RECIPIENTS ───────────────────────────────────────────────────
const TO = [
  'gxt661215@icloud.com',
  's.sheik0123@gmail.com',
  'montallamitchel1717@gmail.com',
];
const CC = 'petrpesekpesek@gmail.com';

// ─── FIND TODAY'S MEETING ─────────────────────────────────────────
// cron-job.org triggers this at 16:45 CST (UTC+8) = exactly 2 hours before the 18:45 class.
const nowUTC = new Date();
const cstOffset = 8 * 60 * 60 * 1000;
const nowCST = new Date(nowUTC.getTime() + cstOffset);
const todayStr = nowCST.toISOString().slice(0, 10); // 'YYYY-MM-DD'

const meetingLink = MEETINGS[todayStr];

if (!meetingLink) {
  console.log(`No meeting scheduled for ${todayStr}. Nothing to send.`);
  process.exit(0);
}

// ─── FORMAT DATE FOR EMAIL ────────────────────────────────────────
const dateForEmail = nowCST.toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  timeZone: 'Asia/Shanghai',
});

// ─── EMAIL CONTENT ────────────────────────────────────────────────
const subject = `Class Meeting in 2 Hours – ${dateForEmail}`;

const body = `Dear Eva, Sue & Mitchel,

Your class meeting is starting in 2 hours.

📅 Date: ${dateForEmail}
⏰ Time: 6:45 PM – 7:45 PM (China Standard Time)
🔗 Join here: ${meetingLink}

Please make sure you are ready 5 minutes before the session begins.

See you soon!
Petr

---

亲爱的 Eva、Sue 和 Mitchel，

您的课程会议将在2小时后开始。

📅 日期：${dateForEmail}
⏰ 时间：晚上 6:45 – 7:45（北京时间）
🔗 点击加入：${meetingLink}

请在上课前5分钟做好准备。

期待与您相见！
Petr`;

// ─── SEND EMAIL ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.sendMail({
  from: `"Petr Pešek" <${process.env.GMAIL_USER}>`,
  to: TO.join(', '),
  cc: CC,
  subject,
  text: body,
}, (err, info) => {
  if (err) {
    console.error('Failed to send email:', err);
    process.exit(1);
  } else {
    console.log(`✅ Invite sent successfully for ${todayStr}!`);
    console.log('Message ID:', info.messageId);
  }
});
