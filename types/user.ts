export type User = {
  _id: string;
  name: string;
  lastName: string;
  phone: string;
  city: string;
  postOffice: string;
};

export interface updateUserProps {
    firstName: string,
    secondName: string,
    telephone: string,
    city: string,
    post: string,
}
