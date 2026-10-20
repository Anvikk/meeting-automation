name: Send Meeting Invite

on:
  workflow_dispatch: # triggered externally by cron-job.org (the only trigger; no GitHub schedule, to avoid duplicate sends)
    inputs:
      test_email:
        description: Send a test email only to the CC address
        type: boolean
        required: false
        default: false

jobs:
  send-invite:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'

      - name: Install dependencies
        run: npm install nodemailer

      - name: Send meeting invite
        env:
          GMAIL_USER: ${{ secrets.GMAIL_USER }}
          GMAIL_APP_PASSWORD: ${{ secrets.GMAIL_APP_PASSWORD }}
          TEST_EMAIL: ${{ inputs.test_email }}
        run: node send_invite.js
