interface model {
  id: string,
  fullname: string,
  documentNumber: string,
  birthday: Date,
  phoneNumber: string,
  status: number,
  dataVerified: boolean,
  createdAt?: Date
}
export {model}