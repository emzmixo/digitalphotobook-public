const BookNavigation = (function () {
    let currentLeaf = 0;
    let isAnimating = false;
    let leaves = [];
    let bookContainer = null;

    function init(leavesRef, containerRef) {
        leaves = leavesRef;
        bookContainer = containerRef;
    }

    function lock() {
        isAnimating = true;
        bookContainer.classList.add('animating');
    }

    function unlock() {
        isAnimating = false;
        bookContainer.classList.remove('animating');
    }

    function turnPage(leafIndex, direction) {
        if (isAnimating) return;
        const leaf = leaves[leafIndex];
        if (!leaf) return;

        if (direction === 'forward') {
            if (leafIndex !== currentLeaf) return;
            lock();
            leaf.style.zIndex = 999;
            leaf.classList.add('flipped');
            currentLeaf++;
            setTimeout(function () {
                leaf.style.zIndex = leafIndex + 1;
                unlock();
            }, BOOK_CONFIG.flipDuration);
        } else if (direction === 'backward') {
            if (leafIndex !== currentLeaf - 1) return;
            lock();
            leaf.style.zIndex = 999;
            leaf.classList.remove('flipped');
            currentLeaf--;
            setTimeout(function () {
                leaf.style.zIndex = BOOK_CONFIG.totalLeaves - leafIndex;
                unlock();
            }, BOOK_CONFIG.flipDuration);
        }
    }

    function handleCoverClick(event) {
        if (currentLeaf > 0) {
            event.stopPropagation();
            resetBook(event);
        }
    }

    function resetBook(event) {
        if (event) event.stopPropagation();
        if (currentLeaf === 0 || isAnimating) return;

        lock();

        for (let i = leaves.length - 1; i >= 0; i--) {
            const leaf = leaves[i];
            const delay = (leaves.length - 1 - i) * BOOK_CONFIG.resetStagger;

            setTimeout(function () {
                leaf.style.zIndex = 999;
                leaf.classList.remove('flipped');

                setTimeout(function () {
                    leaf.style.zIndex = BOOK_CONFIG.totalLeaves - i;
                }, BOOK_CONFIG.flipDuration);
            }, delay);
        }

        currentLeaf = 0;

        const totalTime = (leaves.length - 1) * BOOK_CONFIG.resetStagger + BOOK_CONFIG.flipDuration;
        setTimeout(function () {
            leaves.forEach(function (leaf, i) {
                leaf.style.zIndex = BOOK_CONFIG.totalLeaves - i;
            });
            unlock();
        }, totalTime);
    }

    return {
        init: init,
        turnPage: turnPage,
        handleCoverClick: handleCoverClick,
        resetBook: resetBook
    };
})();

function turnPage(leafIndex, direction) {
    BookNavigation.turnPage(leafIndex, direction);
}

function handleCoverClick(event) {
    BookNavigation.handleCoverClick(event);
}

function resetBook(event) {
    BookNavigation.resetBook(event);
}