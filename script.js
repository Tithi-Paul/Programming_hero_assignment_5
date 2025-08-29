
document.addEventListener('DOMContentLoaded', function() {
  
    const favCount = document.getElementById('favCount');
    const coinCount = document.getElementById('coinCount');
    const copyCount = document.getElementById('copyCount');
    const copyBtn = document.getElementById('copyBtn');

   
    let currentFavCount = parseInt(localStorage.getItem('favCount')) || 0;
    let currentCoinCount = parseInt(localStorage.getItem('coinCount')) || 100;
    let currentCopyCount = parseInt(localStorage.getItem('copyCount')) || 2;

  
    function updateDisplay() {
        favCount.textContent = currentFavCount;
        coinCount.textContent = currentCoinCount;
        copyCount.textContent = currentCopyCount;
    }


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