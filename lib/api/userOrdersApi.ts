export async function getUserOrders() {
  const response = await fetch('/orders', {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": 'application/json',
      },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Помилка при завантаженні ваших покупок')
    }
    return await response.json()
}