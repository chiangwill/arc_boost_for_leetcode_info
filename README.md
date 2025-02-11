# LeetCode to Notion Sync Browser Script

A browser script that automatically syncs LeetCode problem information to Notion when you successfully submit a solution.

## Features

- 🔄 Automatically detects successful submissions
- 📝 Collects problem metadata:
 - Problem title
 - Problem URL
 - Difficulty level
 - Topic tags
- 🚀 Syncs data to Notion via n8n webhook
- 📱 Shows notification on sync success/failure

## Prerequisites

- [Arc Browser](https://arc.net/) installed
- [n8n](https://n8n.io/) server running locally on port 5678
- Notion account and workspace setup

## Setup

1. Create a new Arc Boost for LeetCode
2. Copy the script into the boost editor
3. Set up your n8n webhook URL in the `N8N_WEBHOOK_URL` constant
4. Configure your n8n workflow to receive data and sync with Notion

## How It Works

1. Script monitors for successful solution submissions on LeetCode
2. Upon successful submission, it collects:
  - Problem name
  - Problem URL
  - Difficulty level
  - Topic tags
3. Sends collected data to n8n webhook
4. Displays a notification indicating sync status

## Code Structure

```javascript
// Main functions
checkForSubmitButton()    // Monitors submit button
checkSubmissionResult()   // Checks submission status
collectData()            // Gathers problem information
collectAndSendData()     // Sends data to webhook
showNotification()       // Displays status messages
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
