let i = 0;

function count() {
    i += 1;
    postMessage(i);
    setTimeout(count, 1000);
}

count();
