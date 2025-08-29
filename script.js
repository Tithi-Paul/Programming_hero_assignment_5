
document.addEventListener('DOMContentLoaded', function() {
  
    const favCount = document.getElementById('favCount');
    const coinCount = document.getElementById('coinCount');
    const copyCount = document.getElementById('copyCount');
    const copyBtn = document.getElementById('copyBtn');

    let currentFavCount = parseInt(localStorage.getItem('favCount')) || 0;
    let currentCoinCount = parseInt(localStorage.getItem('coinCount')) || 100;
    let currentCopyCount = parseInt(localStorage.getItem('copyCount')) || 2;

    let callHistory = JSON.parse(localStorage.getItem('callHistory')) || [];
    const callHistoryContainer = document.getElementById('callHistory');

    function updateDisplay() {
        favCount.textContent = currentFavCount;
        coinCount.textContent = currentCoinCount;
        copyCount.textContent = currentCopyCount;
    }

    function updateCallHistoryDisplay() {
        callHistoryContainer.innerHTML = '';
        callHistory.forEach(entry => {
            const historyItem = document.createElement('div');
            historyItem.className = 'bg-gray-50 rounded-md p-3 border-l-4 border-green-500';
            historyItem.innerHTML = `
                <div class="font-medium text-gray-800">${entry.serviceName}</div>
                <div class="text-sm text-gray-600">${entry.number}</div>
                <div class="text-xs text-gray-500">${entry.timestamp}</div>
            `;
            callHistoryContainer.appendChild(historyItem);
        });
    }

    function addToCallHistory(serviceName, number) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = {
            serviceName: serviceName,
            number: number,
            timestamp: timestamp
        };
        callHistory.unshift(entry);
        
        if (callHistory.length > 10) {
            callHistory = callHistory.slice(0, 10);
        }
        
        localStorage.setItem('callHistory', JSON.stringify(callHistory));
        updateCallHistoryDisplay();
    }

    function clearHistory() {
        callHistory = [];
        localStorage.setItem('callHistory', JSON.stringify(callHistory));
        updateCallHistoryDisplay();
    }

    window.toggleFavorite = function(button) {
        if (button.textContent === '💗') {
            button.textContent = '❤️';
            currentFavCount++;
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        } else {
            button.textContent = '💗';
            currentFavCount = Math.max(0, currentFavCount - 1);
        }
        updateDisplay();
        saveToStorage();
    };

    window.copyNumber = function(number, serviceName) {
        navigator.clipboard.writeText(number).then(() => {
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '✅ Copied!';
            button.classList.add('bg-green-100', 'text-green-800');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-100', 'text-green-800');
            }, 1500);
            
            currentCopyCount++;
            updateDisplay();
            saveToStorage();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    window.callNumber = function(number, serviceName) {
        addToCallHistory(serviceName, number);
        
        currentCoinCount -= 20;
        updateDisplay();
        saveToStorage();
        
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '📞 Calling...';
        button.classList.add('bg-green-700');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-700');
        }, 2000);
        
        console.log(`Calling ${serviceName}: ${number}`);
    };

    window.clearHistory = function() {
        clearHistory();
    };

    function saveToStorage() {
        localStorage.setItem('favCount', currentFavCount);
        localStorage.setItem('coinCount', currentCoinCount);
        localStorage.setItem('copyCount', currentCopyCount);
    }

    function incrementHeartCount() {
        currentFavCount++;
        updateDisplay();
        saveToStorage();
        
        favCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            favCount.style.transform = 'scale(1)';
        }, 200);
    }

    function incrementCoinCount(amount = 1) {
        currentCoinCount += amount;
        updateDisplay();
        saveToStorage();
        
        coinCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            coinCount.style.transform = 'scale(1)';
        }, 200);
    }

    function incrementCopyCount() {
        currentCopyCount++;
        updateDisplay();
        saveToStorage();
        
        copyBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            copyBtn.style.transform = 'scale(1)';
        }, 200);
    }

    copyBtn.addEventListener('click', function() {
        incrementCopyCount();
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span>';
        copyBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('bg-green-500');
        }, 1000);
    });

    favCount.parentElement.addEventListener('click', function() {
        incrementHeartCount();
    });

    coinCount.parentElement.addEventListener('click', function() {
        incrementCoinCount(5); 
    });

    updateDisplay();
    updateCallHistoryDisplay();

    const style = document.createElement('style');
    style.textContent = `
        #favCount, #coinCount, #copyBtn {
            transition: transform 0.2s ease-in-out;
        }
        
        .bg-green-100 {
            cursor: pointer;
        }
        
        .bg-green-100:hover {
            background-color: rgb(187 247 208);
        }
    `;
    document.head.appendChild(style);
}); 