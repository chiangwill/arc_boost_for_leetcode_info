// Arc Boost for LeetCode to Notion Sync
console.log('🚀 LeetCode to Notion script started!');

const N8N_WEBHOOK_URL = 'your_webhook_url';

// 檢查提交按鈕
function checkForSubmitButton() {
    const submitButton = document.querySelector('[data-e2e-locator="console-submit-button"]');
    if (submitButton) {
        console.log('Found submit button, adding click listener');
        submitButton.addEventListener('click', () => {
            setTimeout(checkSubmissionResult, 1000);
        });
    } else {
        setTimeout(checkForSubmitButton, 1000);
    }
}

// 檢查提交結果
function checkSubmissionResult() {
    const checkInterval = setInterval(() => {
        const submissionResult = document.querySelector('[data-e2e-locator="submission-result"]');
        if (submissionResult && submissionResult.textContent.includes('Accepted')) {
            clearInterval(checkInterval);
            console.log('Solution accepted, collecting data');
            collectAndSendData();
        }
    }, 1000);

    // 60秒後停止檢查
    setTimeout(() => clearInterval(checkInterval), 60000);
}

// 收集資料的函數
function collectData() {
    // 題目名稱
    const titleElement = document.querySelector('div[data-cy="question-title"]');
    const problemName = titleElement ? titleElement.textContent.trim() : document.title.split('|')[0].trim();
    console.log('題目名稱:', problemName);

    // 難度
    const difficultyElement = document.querySelector('[class*="text-difficulty-"]');
    const difficulty = difficultyElement ? difficultyElement.textContent.trim() : '';
    console.log('難度:', difficulty);

    // 題型標籤 - 使用正確的選擇器
    console.log('正在尋找題型標籤...');
    const topicElements = document.querySelectorAll('a[href^="/tag/"]');
    console.log('找到的題型元素:', topicElements);

    const topicTags = Array.from(topicElements)
        .map(tag => {
            const text = tag.textContent.trim();
            console.log('題型標籤:', text);
            return text;
        })
        .filter(tag => tag && tag.length > 0);

    console.log('最終收集到的標籤:', [difficulty, ...topicTags]);

    return {
        problemName,
        problemUrl: window.location.href,
        tags: [difficulty, ...topicTags]
    };
}

// 收集並發送數據
function collectAndSendData() {
    try {
        const data = collectData();
        console.log('Collected data:', data);

        fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            console.log('Sync success:', result);
            showNotification('成功同步到 Notion！');
        })
        .catch(error => {
            console.error('Request failed:', error);
            showNotification('同步失敗，請檢查 Console', true);
        });
    } catch (error) {
        console.error('Error collecting data:', error);
        showNotification('收集資料時發生錯誤', true);
    }
}

// 顯示通知
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: ${isError ? '#f44336' : '#4CAF50'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// 開始監聽
setTimeout(checkForSubmitButton, 2000);