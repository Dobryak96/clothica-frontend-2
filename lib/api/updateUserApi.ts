import { updateUserProps } from "@/types/user";

export async function updateUser({firstName, secondName, telephone, city, post}: updateUserProps): Promise<void> {
  const respone = await fetch('/users/current', {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      },
      body: JSON.stringify({
          name: firstName,
          lastName: secondName,
          phone: telephone,
          city: city,
          postOffice: post
    })
  });
  if (!respone.ok) {
    const errorData = await respone.json().catch(() => ({}));
    throw new Error(errorData.message || 'Помилка при оновленні даних')
  }
}