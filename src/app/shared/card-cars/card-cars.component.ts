import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
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


  constructor(private router:Router) {
  }

  ngOnInit(): void {
    console.log(this.vehicle)
  }

  async generatePDF() {
    const doc = new jsPDF();

    const data = this.vehicle

    // Agregar imagen desde la carpeta "assets"
    const img = new Image();
    img.src = 'assets/img/logo.jpeg'; // Ruta a tu imagen en la carpeta "assets"

    // Asegúrate de que la imagen se haya cargado antes de agregarla al PDF
    img.onload = async (resolve) => {


     // Añadir la imagen al PDF en una posición específica
      // @ts-ignore
      doc.addImage(img, 'JPEG', 15, 5 , 50, 30);
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
     doc.addImage(qrDataUri, 'PNG', 10, 120, 40, 40);


     doc.save('factura.pdf');
      resolve
    };

    doc.setFontSize(22);
    doc.setTextColor(52, 122, 229);
    doc.text('Tu seguridad en todos lados . . .', 80, 12);
    doc.setFontSize(8);
    doc.text('Dirección: Av. Intercomunal Edif. Mar a Piso P/b', 95, 18);
    doc.text("Local 1-A, Sector R:10, Municipio Cabimas, Estado Zulia", 95, 22);
    doc.text('Telf. 0424-6616970 / E-mail:worcassca@gmail.com', 95, 26);
    doc.setFontSize(12);
    doc.text('Exento',130, 130);

    doc.text("Subtotal", 130, 135);

    doc.text("Iva(16%)", 130, 141);
    doc.setFontSize(14);
    doc.text('Total', 130,  151);



    const tableData = [
      [ `Factura: ${data.propietario.numero_factura}`,`Nª de control: ${data.propietario.numero_control}`],
      [`Contratante: ${data.propietario.nombre_contratante}`, `Fecha de ingreso: ${data.propietario.fecha_ingreso}`],
      [`Rif / C.I.: ${data.propietario.cedula_contratante}`],
      [`Telefono: ${data.propietario.telefono_contratante}`, `Vendedor: Winder`],
    ];

    // @ts-ignore
    doc.autoTable({
      startY: 40,
      head: [tableData[0]],
      body: tableData.slice(1),
      didDrawPage: function(data : any) {
        console.log(data)
        // Footer
        const pageSize = doc.internal.pageSize;
        const footerY = pageSize.height - 10;
      }
    });

    const tableData2 = [
      [ 'Contrato',`Clase`, 'Marca', 'Modelo', 'Color', 'Placa', 'Precio unitario', 'Base disponible'],
      [ `${data.propietario.numero_control}`,`${data.clase}`, `${data.marca}`, `${data.modelo}`, `${data.color}`, `${data.placa}`, 'Precio unitario', 'Base disponible'],
    ];

      // @ts-ignore
      doc.autoTable({
        startY: 70,
        head: [tableData2[0]],
        body: tableData2.slice(1),
        didDrawPage: function(data : any) {
          console.log(data)
          // Footer
          const pageSize = doc.internal.pageSize;
          const footerY = pageSize.height - 10;
        }
      });
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
