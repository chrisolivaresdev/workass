
export interface User {
  numero_control?:        number;
  fecha_ingreso:         Date;
  nombre_contratante:    string;
  cedula_contratante:    string;
  telefono_contratante:  string;
  direccion_contratante: string;
  nombre_beneficiario:   string;
  cedula_beneficiario:   string;
  promotor:              string;
  numero_factura?:        number;
  fecha_vencimiento:     Date;
}
