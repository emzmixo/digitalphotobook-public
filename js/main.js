(async function initApp() {
    await BookBuilder.build();

    BookNavigation.init(
        BookBuilder.getLeaves(),
        BookBuilder.getContainer()
    );

    console.log('%c📖 Photobook siap!', 'color:#8b5a2b;font-weight:bold;font-size:14px;');
})();