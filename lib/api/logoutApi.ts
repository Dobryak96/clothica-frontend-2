export async function logout(): Promise<void> {
  const respone = await fetch('/auth/logout', {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
  });
  if (!respone.ok) {
    const errorData = await respone.json().catch(() => ({}));
    throw new Error(errorData.message || 'Помилка при виході з системи')
  }
}