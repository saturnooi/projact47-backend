export class CreatePatientDto {

  email: string;
  card_id: string;
  img: string;
  prefix: string;
  first_name: string;
  last_name: string;
  dateofbirth: Date;
  tel: string;
  underlying_disease?: string;
  allergy?: string;

}
