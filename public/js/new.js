const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const content = document.querySelector('textarea[name="blog-content"]').value;

  await fetch(`/api/blog`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-blog-form')
  .addEventListener('submit', newFormHandler);
