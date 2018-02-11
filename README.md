# javascript-tetris

This is a small challenge I made for fun. I decided to code a Vanilla JS version of Tetris in few hours. 

### Preview

Here the result ! You can play it just by clone this repo and open index.html in the browser. The keys are :

- Up, Down, Lerf, Right arrows : move the blocks
- Q : Flip the block left
- S : Flip the block right

![Tetris preview](https://raw.githubusercontent.com/tomahim/javascript-tetris/master/app/resources/tetris-screenshot.png)

#### Implementation detail : Deep first search algorithm

The challenging part was to detect when a line is complete and to make the blocks falling accordingly. I implemented a Deep first search algorithm (DFS) that you can [see here](https://github.com/tomahim/javascript-tetris/blob/master/app/modules/board/board.dfs.js).

I enjoyed trying to make the code as small and concise as possible.