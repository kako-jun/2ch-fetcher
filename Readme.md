# 2ch-fetcher-with-proxy

a fork of [2ch fetcher](https://github.com/Narazaka/2ch-fetcher).

## Install

```bash
npm install 2ch-fetcher-with-proxy
```

## Usage

```typescript
import { BBSMenu, Thread } from "2ch-fetcher-with-proxy";

async function hierarchal() {
    const menu = new BBSMenu(); // default url is bbsmenu of 2ch.sc
    const boards = await menu.fetchBoards();
    console.log(boards.names);
    const threads = await boards.name("河川・ダム等").fetchThreads();
    console.log(threads.titles);
    console.log(threads.searchByTitle(/なんとか/).map((thread) => thread.title));
    const posts = await threads.title("なんとかスレ").fetchPosts();
    const post = posts.index(1); // 1 origin
    if (post) { // あぼーん post is undefined
        console.log(post.name);
    }
    console.log(posts.indexRange(1, 2));
}

async function single() {
    const thread = new Thread("https://example.com/foobar/dat/123456789.dat", "title", 42);
    const posts = await thread.fetchPosts();
    console.log(posts.index(1));
}

hierarchal().then(single);
```

## License

This is released under [MIT License](https://narazaka.net/license/MIT?2017)
