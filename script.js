
document.addEventListener('DOMContentLoaded', function() {
  
    const favCount = document.getElementById('favCount');
    const coinCount = document.getElementById('coinCount');
    const copyCount = document.getElementById('copyCount');
    const copyBtn = document.getElementById('copyBtn');

    let currentFavCount = 0;
    let currentCoinCount = 100;
    let currentCopyCount = 0;

    let callHistory = [];
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
        
        updateCallHistoryDisplay();
    }

    function clearHistory() {
        callHistory = [];
        updateCallHistoryDisplay();
    }

    function copyToClipboardFallback(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }

    window.toggleFavorite = function(button) {
        const isFavorited = button.getAttribute('data-favorited') === 'true';
        
        if (!isFavorited) {
            button.textContent = '♥';
            button.setAttribute('data-favorited', 'true');
            button.classList.remove('text-gray-400', 'hover:text-red-500');
            button.classList.add('text-red-500');
            currentFavCount++;
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        } else {
            button.textContent = '♡';
            button.setAttribute('data-favorited', 'false');
            button.classList.remove('text-red-500');
            button.classList.add('text-gray-400', 'hover:text-red-500');
            currentFavCount = Math.max(0, currentFavCount - 1);
        }
        updateDisplay();
    };

    window.copyNumber = function(number, serviceName, button) {
        alert(`Copying ${serviceName} number: ${number}`);
        
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(number).then(() => {
                handleCopySuccess(number, button);
            }).catch(() => {
                // Fallback to legacy method
                handleCopyFallback(number, button);
            });
        } else {
            // Use fallback method directly
            handleCopyFallback(number, button);
        }
    };

    function handleCopySuccess(number, button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.classList.add('bg-green-100', 'text-green-800');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-100', 'text-green-800');
        }, 1500);
        
        currentCopyCount++;
        updateDisplay();
        
        console.log(`Successfully copied ${number} using modern API`);
    }

    function handleCopyFallback(number, button) {
        const success = copyToClipboardFallback(number);
        
        if (success) {
            const originalText = button.innerHTML;
            button.innerHTML = '✅ Copied!';
            button.classList.add('bg-green-100', 'text-green-800');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-100', 'text-green-800');
            }, 1500);
            
            currentCopyCount++;
            updateDisplay();
            
            console.log(`Successfully copied ${number} using fallback method`);
        } else {
            // If all methods fail, show the number for manual copy
            alert(`Copy failed. Here's the number to copy manually: ${number}`);
            console.error('All copy methods failed');
        }
    }

    window.callNumber = function(number, serviceName) {
        if (currentCoinCount < 20) {
            alert(`Insufficient coins! You need 20 coins to make a call. Current balance: ${currentCoinCount} coins.`);
            return;
        }

        alert(`Calling ${serviceName} at ${number}`);
        
        currentCoinCount -= 20;
        updateDisplay();
        
        addToCallHistory(serviceName, number);
        
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

    function incrementHeartCount() {
        currentFavCount++;
        updateDisplay();
        
        favCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            favCount.style.transform = 'scale(1)';
        }, 200);
    }

    function incrementCoinCount(amount = 1) {
        currentCoinCount += amount;
        updateDisplay();
        
        coinCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            coinCount.style.transform = 'scale(1)';
        }, 200);
    }

    function incrementCopyCount() {
        currentCopyCount++;
        updateDisplay();
        
        copyBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            copyBtn.style.transform = 'scale(1)';
        }, 200);
    }

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

        @media (max-width: 640px) {
            .container {
                padding-left: 1rem;
                padding-right: 1rem;
            }
            
            .grid {
                gap: 1rem;
            }
            
            .card {
                padding: 1rem;
            }
            
            .text-2xl {
                font-size: 1.5rem;
            }
            
            .text-xl {
                font-size: 1.25rem;
            }
            
            .text-lg {
                font-size: 1.125rem;
            }
            
            .text-sm {
                font-size: 0.875rem;
            }
            
            .text-xs {
                font-size: 0.75rem;
            }
            
            .p-6 {
                padding: 1rem;
            }
            
            .mb-6 {
                margin-bottom: 1rem;
            }
            
            .gap-8 {
                gap: 1.5rem;
            }
            
            .w-80 {
                width: 100%;
            }
            
            .flex-row {
                flex-direction: column;
            }
            
            .space-x-4 > * + * {
                margin-left: 0;
                margin-top: 0.5rem;
            }
            
            .space-y-3 > * + * {
                margin-top: 0.75rem;
            }
        }

        @media (max-width: 768px) {
            .lg\\:flex-row {
                flex-direction: column;
            }
            
            .lg\\:w-80 {
                width: 100%;
            }
            
            .lg\\:gap-8 {
                gap: 1.5rem;
            }
        }

        @media (max-width: 1024px) {
            .lg\\:grid-cols-3 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 640px) {
            .sm\\:grid-cols-2 {
                grid-template-columns: repeat(1, minmax(0, 1fr));
            }
        }

        .touch-manipulation {
            touch-action: manipulation;
        }

        .select-none {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .tap-highlight-transparent {
            -webkit-tap-highlight-color: transparent;
        }
    `;
    document.head.appendChild(style);

    document.body.classList.add('touch-manipulation', 'select-none', 'tap-highlight-transparent');
}); 
