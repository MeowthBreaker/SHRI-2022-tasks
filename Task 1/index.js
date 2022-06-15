function renderWaterfall(rootNode, columnCount, elementGap) {
  if(rootNode.children.length === 0) return;

  let gap = parseInt(elementGap, 10);
  let count = parseInt(columnCount, 10);

  if(rootNode.children.length < count)
    count = rootNode.children.length;

  if(isNaN(gap) || isNaN(count) || count === 0) return;

  let articles = [];

  rootNode.childNodes.forEach((node) => {
    if(node.nodeName !== '#text')
      articles.push(node.cloneNode(true));
  });

  while(rootNode.firstChild) {
    rootNode.removeChild(rootNode.lastChild);
  }

  rootNode.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  rootNode.style.display = "grid";

  while (count) {
    let div = document.createElement('div');

    div.style.paddingRight = `${gap}px`;
    div.style.rowGap = `${gap}px`;
    div.style.display = "flex";
    div.style.flexDirection = 'column';
    div.style.height = "fit-content";

    rootNode.append(div);

    count--;
  }

  rootNode.lastChild.style.paddingRight = 0;

  while(articles.length) {
    let column = getShortestColumn([...rootNode.children]);

    column.append(articles[0]);

    articles.shift();
  }
}


function getShortestColumn(columns) {
  if(!columns) return;

  let lastNodesValues = [];

  //getting array of bottom side height of last article of each column
  columns.forEach((column) => {
    if(!column.lastChild) {
      lastNodesValues.push(0);
    } else {
      let r = column.lastElementChild.getBoundingClientRect();

      lastNodesValues.push(r.bottom);
    }
  });

  let shortestColumnIndex = lastNodesValues.indexOf(Math.min(...lastNodesValues));

  return columns[shortestColumnIndex];
}

renderWaterfall(document.querySelector('.root'), 8, 10);