import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-card-cars',
  templateUrl: './card-cars.component.html',
  styleUrls: ['./card-cars.component.css']
})
export class CardCarsComponent implements OnInit {
  @Input() vehicle!:any
  @Output() DeletecarById =  new EventEmitter<any>()
  @Output() editVehicleById =  new EventEmitter<any>()


  constructor(private router:Router, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  async generatePDF() {
    const doc = new jsPDF();

    const data = this.vehicle
    data.precio_unitario = 10
       // Generar un código QR
     const qrData = `
    anualidad: ${data.anualidad}
    clase: ${data.clase}
    color:  ${data.color}
    marca:  ${data.marca}
    modelo:  ${data.modelo}
    placa:  ${data.placa}
    puestos:  ${data.puestos}
    serialCarroceria:  ${data.serialCarroceria}
    serialMotor:  ${data.serialMotor}
    tipo:  ${data.tipo}
    uso:  ${data.uso}
    propietario: {
    cedula_beneficiario: ${data.propietario.cedula_beneficiario}
    cedula_contratante: ${data.propietario.cedula_contratante}
    direccion_contratante: ${data.propietario.direccion_contratante}
    fecha_ingreso: ${data.propietario.fecha_ingreso}
    fecha_vencimiento: ${data.propietario.fecha_vencimiento}
    nombre_beneficiario: ${data.propietario.nombre_beneficiario}
    nombre_contratante: ${data.propietario.nombre_contratante}
    numero_control: ${data.propietario.numero_control}
    numero_factura: ${data.propietario.numero_factura}
    promotor: ${data.propietario.promotor}
    telefono_contratante: ${data.propietario.telefono_contratante}
    }`

     const qrCanvas = await QRCode.toCanvas(qrData);

     // Obtener el URI de la imagen del código QR
     const qrDataUri = qrCanvas.toDataURL('image/png');

     // Agregar el código QR al PDF
     // @ts-ignore
     doc.addImage(qrDataUri, 'PNG', 70, 278, 15, 15);

    doc.setTextColor(255, 0, 0);
    doc.text(`Nº ${data.propietario.numero_factura}`, 50, 45);
    doc.text(`${data.propietario.numero_control}`, 150, 45);

    doc.setTextColor(60, 60, 60)
    doc.setFontSize(12);
    doc.text(`Contratante: ${data.propietario.nombre_contratante}`, 25, 55);
    doc.text(`Fecha de emisión: ${this.datePipe.transform(data.propietario.fecha_ingreso, 'dd/MM/yyyy ', 'UTC')}`, 140, 55);
    doc.text(`Rif / C.I.: ${data.propietario.cedula_contratante}`, 25, 60);

    doc.text(`Dirección: ${data.propietario.direccion_contratante}`, 25, 70);
    doc.text(`Forma de pago: CONTADO`, 140, 70);


    doc.text(`Telefono(s): ${data.propietario.telefono_contratante}`, 25, 90);
    doc.text(`Vendedor: ${data.propietario.promotor}`, 140, 90);

    doc.setFontSize(10);
    doc.text(`Contrato`, 20, 110);
    doc.text(`${data.contrato}`, 20, 115);

    doc.text(`Clase`, 40, 110);
    doc.text(`${data.clase}`, 40, 115);

    doc.text(`Marca`, 60, 110);
    doc.text(`${data.marca}`, 60, 115);

    doc.text(`Modelo`, 80, 110);
    doc.text(`${data.modelo}`, 80, 115);

    doc.text(`Color`, 100, 110);
    doc.text(`${data.color}`, 100, 115);

    doc.text(`Placa`, 120, 110);
    doc.text(`${data.placa}`, 120, 115);

    doc.text(`Precio Unitario`, 140, 110);
    doc.text(`${data.precio_unitario}`, 140, 115);

    doc.text(`Base disponible`, 170, 110);
    doc.text(`${data.precio_unitario}`, 170, 115);


    doc.setFontSize(12);
    doc.text('Exento',130, 170);

    doc.text(`Subtotal: ${data.precio_unitario}`, 130, 180);

    doc.text(`Iva(16%): ${data.precio_unitario * 0.16}`, 130, 185);
    doc.setFontSize(14);
    doc.text(`Total: ${data.precio_unitario +  data.precio_unitario * 0.16}`, 130, 195);

    doc.setFontSize(8);
    doc.text(`Certificado de datos de rcv`, 68, 245);
    doc.setFontSize(6);
    doc.text(`Nª Factura: ${data.propietario.numero_factura}`, 40, 250);
    doc.text(`Contratante: ${data.propietario.nombre_contratante}`, 40, 255);
    doc.text(`Rif / C.I.: ${data.propietario.cedula_contratante}`, 40, 260);
    doc.setFontSize(8);
    doc.text(`Descripcion del vehiculo`, 50, 265);
    doc.setFontSize(6);
    doc.text(`Placa: ${data.placa}`, 40, 270);
    doc.text(`Marca: ${data.marca}`, 40, 275);
    doc.text(`Tipo: ${data.tipo}`, 40, 280);
    doc.text(`Modelo: ${data.modelo}`, 40, 285);
    doc.text(`Clase: ${data.clase}`, 40, 290);
    doc.text(`S.Carrocería: ${data.serialCarroceria}`, 70, 260);
    doc.text(`Color: ${data.color}`, 70, 270);
    doc.text(`Año:  ${this.datePipe.transform(data.propietario.fecha_ingreso, 'yyyy', 'UTC')} / ${this.datePipe.transform(data.propietario.fecha_vencimiento, 'yyyy', 'UTC')}`, 70, 275);
    doc.text(`Nª Control: ${data.contrato}`, 70, 250);
    doc.setFontSize(6);
    doc.text(`F. Emision: ${this.datePipe.transform(data.propietario.fecha_ingreso, 'dd/MM/yyyy', 'UTC')}`, 140, 255);
    doc.text(`F. Vencimiento: ${this.datePipe.transform(data.propietario.fecha_vencimiento, 'dd/MM/yyyy', 'UTC')}`, 140, 260);
    doc.setFontSize(8);


    doc.text(`Se agradece a las autoridades brindar apoyo`, 125, 270);
    doc.text(`al portador de este carnet`, 135, 275);
    doc.setFontSize(6);
    doc.text(`Oficina: avenida intercomunal. Sector R:10 Edificio Marba PB`, 125, 280);
    doc.text(`Local, 1-A Parroquia La Rosa, Cabimas, Estado Zulia`, 130, 285);

    doc.autoPrint({variant: 'non-conform'});
     doc.save('factura.pdf');
  }

   editVehicle(id:any) {
    this.editVehicleById.emit(id)
  }

  deleteVehicle(id:any){
    Swal.fire({
      title: "Estas seguro",
      text: "Quieres eliminar el usuario",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText:  "Remover"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.DeletecarById.emit(id)
        Swal.fire(
          "Eliminado",
          "El usuario a sido removido exitosamente",
          'success'
        )
      }
    })
  }
}
