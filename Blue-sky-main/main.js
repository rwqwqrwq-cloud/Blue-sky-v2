const form = document.getElementById('commentForm');
const commentsDiv = document.getElementById('comments');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (username && comment) {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, comment })
    });

    form.reset();
    loadComments();
  }
});

async function loadComments() {
  const res = await fetch('/api/comments');
  const comments = await res.json();

  commentsDiv.innerHTML = '';
  comments.forEach(({ username, comment }) => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<strong>${username}</strong>: ${comment}`;
    commentsDiv.appendChild(div);
  });
}

// โหลดคอมเมนต์ทันทีเมื่อหน้าเว็บเปิด
loadComments();
