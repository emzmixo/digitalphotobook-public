const BookBuilder = (function () {
    const bookContainer = document.getElementById('bookContainer');
    const leaves = [];

    async function scanFolder(folderName) {
        try {
            const res = await fetch(ASSETS_PATH + folderName + "/");
            if (!res.ok) return [];
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const links = doc.querySelectorAll("a");

            const files = [];
            links.forEach(function (a) {
                const href = a.getAttribute("href");
                if (!href) return;
                if (href === "../" || href === "/" || href.endsWith("/")) return;
                const lower = href.toLowerCase();
                for (let i = 0; i < IMG_EXTENSIONS.length; i++) {
                    if (lower.endsWith(IMG_EXTENSIONS[i])) {
                        files.push(ASSETS_PATH + folderName + "/" + href);
                        break;
                    }
                }
            });
            return files.sort();
        } catch (err) {
            return [];
        }
    }

    async function buildPhotoMap() {
        const map = {};
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            map[i] = await scanFolder("page-" + i);
        }
        return map;
    }

    function buildInnerPage(text, stickers, photoUrls, leafIndex, side) {
        const photosHtml = photoUrls.map(function (url, idx) {
            const rot = ROTATIONS[idx % ROTATIONS.length];
            const washi = WASHI[idx % WASHI.length];
            return '<div class="polaroid ' + rot + '">' +
                '<div class="washi-tape ' + washi + '"></div>' +
                '<div class="w-full h-24 sm:h-32 bg-gray-200 overflow-hidden">' +
                    '<img src="' + url + '" class="w-full h-full object-cover" alt="Memori">' +
                '</div>' +
            '</div>';
        }).join('');

        const gridClass = photoUrls.length === 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-2";
        const clickZone = side === 'front'
            ? '<div class="click-zone-right" onclick="turnPage(' + leafIndex + ', \'forward\')"></div>'
            : '<div class="click-zone-left" onclick="turnPage(' + leafIndex + ', \'backward\')"></div>';
        const paddingClass = side === 'front' ? 'pl-10 pr-6' : 'pl-6 pr-10';

        return '<div class="w-full h-full diary-texture flex flex-col justify-between py-10 ' + paddingClass + ' relative">' +
            clickZone +
            '<div class="grid ' + gridClass + ' gap-4 sm:gap-6 px-4">' + photosHtml + '</div>' +
            '<div class="mt-8 px-6 pb-6 relative z-10 pointer-events-none">' +
                '<div class="absolute -top-4 -left-2 text-2xl">' + stickers[0] + '</div>' +
                '<div class="absolute -bottom-4 right-4 text-2xl">' + stickers[1] + '</div>' +
                '<div class="absolute top-1/2 right-0 text-xl">' + stickers[2] + '</div>' +
                '<p class="font-handwriting text-2xl sm:text-3xl text-gray-800 leading-relaxed text-center">"' + text + '"</p>' +
            '</div>' +
        '</div>';
    }

    function buildFrontCover() {
        return '<div class="w-full h-full cover-texture flex flex-col items-center justify-center p-8 text-center relative shadow-[inset_-15px_0_30px_rgba(0,0,0,0.3)]">' +
            '<div class="w-64 h-64 sm:w-80 sm:h-80 rounded overflow-hidden mb-8 border-8 border-[#3b2515] shadow-2xl">' +
                '<img src="' + BOOK_CONFIG.coverImage + '" class="w-full h-full object-cover cover-image-blend" alt="Cover">' +
            '</div>' +
            '<h1 class="font-serif text-4xl sm:text-5xl text-[#e5d9c5] drop-shadow-md tracking-wider">' + BOOK_CONFIG.coverTitle + '</h1>' +
            '<div class="cover-click-overlay absolute inset-0" onclick="handleCoverClick(event)"></div>' +
            '<div class="click-zone-right" onclick="turnPage(0, \'forward\')"></div>' +
        '</div>';
    }

    function buildBackCover(leafIndex) {
        return '<div class="w-full h-full cover-texture flex flex-col items-center justify-center relative shadow-[inset_15px_0_30px_rgba(0,0,0,0.3)]">' +
            '<button onclick="resetBook(event)" class="relative z-[60] px-8 py-4 bg-[#e5d9c5] text-[#3b2515] font-serif font-bold text-xl rounded shadow-xl border-2 border-[#8b5a2b] hover:bg-white transition duration-300 cursor-pointer">Kembali ke sampul depan</button>' +
            '<div class="click-zone-left" onclick="turnPage(' + leafIndex + ', \'backward\')"></div>' +
        '</div>';
    }
    function resolveLeafContent(i, photoMap) {
        const totalLeaves = BOOK_CONFIG.totalLeaves;
        let frontHtml = '';
        let backHtml = '';

        if (i === 0) {
            frontHtml = buildFrontCover();
            backHtml = buildInnerPage(pageTexts[0], pageStickers[0], photoMap[1], i, 'back');
        } else if (i === totalLeaves - 1) {
            frontHtml = buildInnerPage(pageTexts[13], pageStickers[13], photoMap[14], i, 'front');
            backHtml = buildBackCover(i);
        } else {
            const idxFront = (i * 2) - 1;
            const idxBack = (i * 2);
            frontHtml = buildInnerPage(pageTexts[idxFront], pageStickers[idxFront], photoMap[idxFront + 1], i, 'front');
            backHtml = buildInnerPage(pageTexts[idxBack], pageStickers[idxBack], photoMap[idxBack + 1], i, 'back');
        }

        return { frontHtml: frontHtml, backHtml: backHtml };
    }
    async function build() {
        const photoMap = await buildPhotoMap();

        for (let i = 0; i < BOOK_CONFIG.totalLeaves; i++) {
            const content = resolveLeafContent(i, photoMap);

            const leafDiv = document.createElement('div');
            leafDiv.className = 'leaf';
            leafDiv.id = 'leaf-' + i;
            leafDiv.style.zIndex = BOOK_CONFIG.totalLeaves - i;

            leafDiv.innerHTML =
                '<div class="page page-front">' + content.frontHtml + '</div>' +
                '<div class="page page-back">' + content.backHtml + '</div>';

            bookContainer.appendChild(leafDiv);
            leaves.push(leafDiv);
        }
    }
    return {
        build: build,
        getLeaves: function () { return leaves; },
        getContainer: function () { return bookContainer; }
    };
})();