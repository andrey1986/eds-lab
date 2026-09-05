export default async function decorate(block) {
  // El autor escribe el tag en el bloque de DA
  const tag = block.textContent.trim().toLowerCase();

  // Obtener las páginas indexadas
  const response = await fetch('/query-index.json');
  const json = await response.json();

  // Buscar páginas que tengan exactamente ese tag
  const pages = json.data.filter((page) => {
    const tags = (page.tags || '')
      .split(',')
      .map((item) => item.trim().toLowerCase());

    return tags.includes(tag);
  });

  // Limpiamos el HTML original del bloque
  block.replaceChildren();

  // Si no encontramos páginas
  if (pages.length === 0) {
    const message = document.createElement('p');
    message.textContent = `No pages found for "${tag}".`;
    block.append(message);
    return;
  }

  // Contenedor de resultados
  const list = document.createElement('div');
  list.className = 'page-list-results';

  pages.forEach((page) => {
    const article = document.createElement('article');

    const title = document.createElement('h3');
    title.textContent = page.title;

    const description = document.createElement('p');
    description.textContent = page.description || '';

    const link = document.createElement('a');
    link.href = page.path;
    link.textContent = 'View page';

    article.append(title, description, link);
    list.append(article);
  });

  block.append(list);
}
