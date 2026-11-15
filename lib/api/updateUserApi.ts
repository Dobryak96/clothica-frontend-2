import { api } from './api';
import { updateUserProps } from "@/types/user";

export async function updateUser({firstName, secondName, telephone, city, post}: updateUserProps): Promise<void> {
  await api.patch('/users/current', {
    name: firstName,
    lastName: secondName,
    phone: telephone,
    city,
    postOffice: post,
  });
}
