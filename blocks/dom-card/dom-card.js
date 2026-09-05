export default function decorate(block) {
  const row = block.children[0];

  const title = row.children[0]?.textContent.trim();
  const description = row.children[1]?.textContent.trim();

  const article = document.createElement('article');

  const heading = document.createElement('h2');
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.textContent = description;

  const button = document.createElement('button');
  button.textContent = 'View details';

  article.append(
    heading,
    paragraph,
    button,
  );

  block.replaceChildren(article);
}
