export default async function decorate(block) {
  const response = await fetch('/query-index.json');
  const { data } = await response.json();

  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search...';

  const results = document.createElement('div');
  results.className = 'search-results';

  input.addEventListener('input', () => {
    const search = input.value
      .trim()
      .toLowerCase();

    results.replaceChildren();

    if (!search) return;

    const matches = data.filter((page) => {
      const text = [
        page.title,
        page.description,
        page.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return text.includes(search);
    });

    matches.forEach((page) => {
      const link = document.createElement('a');

      link.href = page.path;
      link.textContent = page.title;

      results.append(link);
    });
  });

  block.replaceChildren(input, results);
}
