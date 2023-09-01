import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-carList',
  templateUrl: './user-carList.component.html',
  styleUrls: ['./user-carList.component.css'],
})
export class UsercarListComponent implements OnInit {

  vehicles!:[]
  vehicle:any
  id:any
  elementosPorPagina: number = 4;
  paginaActual: number = 1;
  math = Math.ceil

  constructor( private router:Router, private activateRoute:ActivatedRoute, private VehicleService:VehiclesService,  public datePipe: DatePipe) { }

  ngOnInit(): void {

    if(this.router.url.includes('carList')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.id = id
          this.getCars(this.id)
          },
      });
    }

  }

  obtenerElementosPagina(): any[] {
    const startIndex = (this.paginaActual - 1) * this.elementosPorPagina;
    const endIndex = startIndex + this.elementosPorPagina;
    return this.vehicles.slice(startIndex, endIndex);
  }

  paginaSiguiente(): void {
    if (this.paginaActual < Math.ceil(this.vehicles.length / this.elementosPorPagina)) {
      this.paginaActual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }


  getCars(id:any){
    this.VehicleService.getVehicles(id).subscribe( resp => {
      this.vehicles = resp.data
    })
  }

  DeleteCarById(id:any){
    this.VehicleService.deleteVehicles(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: "¡Bien!",
        text: "Vehiculo eliminado correctamente"
      })
      this.ngOnInit()
    }, (err) => {
      Swal.fire({
    icon: 'warning',
    title: "Ha ocurrido un error",
    text: err.error.message
  })
    })
  }

  editVehicleById(id:any){
    this.router.navigate([`${this.id}/editarVehicle/${id}`])
  }

  CrearVehicle(){
    this.router.navigate([`${this.id}/CrearVehicle`])
  }

  backPage(){
    this.router.navigate(['/Usuarios'])
  }

  downloadPDF(e:any) {
    this.vehicle = e

    setTimeout(() => {

      const data = e
    const DATA:any = document.getElementById('contrato');
    const doc = new jsPDF('p', 'px', 'letter');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/JPEG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Contrato-${data.propietario.nombre_contratante}.pdf`);
    });
    }, 5000)

    this.generatePDF(e)
  }

  async generatePDF(dataVehicle:any) {
    const doc = new jsPDF();

    const data = dataVehicle
    data.precio_unitario = 10
       // Generar un código QR
     const qrData = `
    Anualidad: ${data.anualidad}
    Clase: ${data.clase}
    Color:  ${data.color}
    Marca:  ${data.marca}
    Modelo:  ${data.modelo}
    Placa:  ${data.placa}
    Puestos:  ${data.puestos}
    Serial de la carroceria:  ${data.serialCarroceria}
    Serial de motor:  ${data.serialMotor}
    tipo:  ${data.tipo}
    uso:  ${data.uso}
    numero de contrato: ${data.contrato}
    Propietario:
    Cedula del beneficiario: ${data.propietario.cedula_beneficiario}
    Cedula del contratante: ${data.propietario.cedula_contratante}
    Direccion del contratante: ${data.propietario.direccion_contratante}
    Fecha de ingreso: ${this.datePipe.transform(data.propietario.fecha_ingreso, 'dd/MM/yyyy', 'UTC')},
    Fecha de vencimiento: ${this.datePipe.transform(data.propietario.fecha_vencimiento, 'dd/MM/yyyy', 'UTC')},
    Nombre del contratante: ${data.propietario.nombre_contratante}
    Nombre del beneficiario: ${data.propietario.nombre_beneficiario}
    Numero de control: ${data.propietario.numero_control}
    Numero de factura: ${data.propietario.numero_factura}
    Promotor: ${data.propietario.promotor}
    Telefono del contratante: ${data.propietario.telefono_contratante}`

     const qrCanvas = await QRCode.toCanvas(qrData);

     const qrDataUri = qrCanvas.toDataURL('image/png');

    doc.setTextColor(60, 60, 60)
    doc.setFontSize(10);
    doc.setFont('arial','normal')
    doc.text(`CONTRATANTE:`, 20, 55);
    doc.setFont('arial','bold')
    doc.text(`${data.propietario.nombre_contratante.toUpperCase()}`, 48, 55);
    doc.setFont('arial','normal')
    doc.text(`FECHA DE EMISIÓN:`, 140, 55);
    doc.setFont('arial','bold')
    doc.text(`${this.datePipe.transform(data.propietario.fecha_ingreso, 'dd/MM/yyyy ', 'UTC')}`, 175, 55);
    doc.setFont('arial','normal')
    doc.text(`RIF / C.I.:`, 20, 65);
    doc.setFont('arial','bold')
    doc.text(`${data.propietario.cedula_contratante}`, 38, 65);
    doc.setFont('arial','normal')
    doc.text(`DIRECCION:`, 20, 60);
    doc.setFont('arial','bold')
    doc.text(`${data.propietario.direccion_contratante.toUpperCase()}`, 43, 60);
    doc.setFont('arial','normal')
    doc.text(`FORMA DE PAGO:`, 140, 68);
    doc.setFont('arial','bold')
    doc.text(`CONTADO`, 172, 68);
    doc.setFont('arial','normal')
    doc.text(`TELEFONO(S):`, 20, 79);
    doc.setFont('arial','bold')
    doc.text(`${data.propietario.telefono_contratante}`, 47, 79);
    doc.setFont('arial','normal')
    doc.text(`VENDEDOR:`, 140, 79);
    doc.setFont('arial','bold')
    doc.text(`${data.propietario.promotor.toUpperCase()}`, 162, 79);
    doc.setFontSize(8);

    doc.text(`CONTRATO`, 20, 100);
    doc.setFontSize(6);

    doc.text(`${data.contrato.toUpperCase()}`, 20, 105);

    doc.setFontSize(8);
    doc.text(`CLASE`, 40, 100);
    doc.setFontSize(6);
    doc.text(`${data.clase.toUpperCase()}`, 40, 105);

    doc.setFontSize(8);
    doc.text(`MARCA`, 60, 100);
    doc.setFontSize(6);
    doc.text(`${data.marca.toUpperCase()}`, 60, 105);

    doc.setFontSize(8);
    doc.text(`MODELO`, 80, 100);
    doc.setFontSize(6);
    doc.text(`${data.modelo.toUpperCase()}`, 80, 105);

    doc.setFontSize(8);
    doc.text(`COLOR`, 100, 100);
    doc.setFontSize(6);
    doc.text(`${data.color.toUpperCase()}`, 100, 105);

    doc.setFontSize(8);
    doc.text(`PLACA`, 120, 100);
    doc.setFontSize(6);
    doc.text(`${data.placa.toUpperCase()}`, 120, 105);

    doc.setFontSize(8);
    doc.text(`PRECIO`, 140, 95);
    doc.text(`UNITARIO`, 140, 100);
    doc.setFontSize(6);
    doc.text(`${data.precio_unitario}`, 140, 105);
    doc.setFontSize(6);
    doc.setFont('arial','normal')
    doc.text(`BASE IMPONIBLE`, 160, 100);
    doc.text(`${data.precio_unitario}`, 180, 100);


    doc.setFontSize(10);
    doc.text('EXENTO',160, 150);
    doc.text(`SUBTOTAL:`,160,155);
    doc.text(`${data.precio_unitario.toFixed(2).replace('.', ',')}`, 180,155);
    doc.text(`IVA(16%): `, 160, 160);
    doc.text(`${(data.precio_unitario * 0.16).toFixed(2).replace('.', ',')}`, 180, 160);
    doc.setFontSize(12);
    doc.text(`TOTAL:`, 160, 168);
    doc.text(`${(data.precio_unitario +  data.precio_unitario * 0.16).toFixed(2).replace('.', ',')}`, 180, 168);


    doc.setFontSize(9);
    doc.setFont('arial','bold')
    doc.text(`CERTIFICADO DE DATOS DE RCV`, 45, 228);
    doc.setFont('arial','normal')
    doc.setFontSize(7);
    doc.text(`Nª FACTURA`, 25, 231);
    doc.text(`:  ${data.propietario.numero_factura}`, 41, 231);

    doc.text(`Nª CONTROL`, 62, 231);
    doc.text(`:  ${data.contrato}`, 78, 231);
    doc.text(`CONTRATANTE `, 21, 234);
    doc.text(`:  ${data.propietario.nombre_contratante.toUpperCase()}`, 41, 234);

    doc.text(`RIF / C.I.`, 31, 237);
    doc.text(`:  ${data.propietario.cedula_contratante}`, 41, 237);

    doc.setFontSize(8 );
    doc.text(`DESCIPCIÓN DEL VEHICULO`, 25, 240);
    doc.setFontSize(7);
    doc.text(`PLACA`, 32, 243);
    doc.text(`:  ${data.placa.toUpperCase()}`, 41, 243);

    doc.text(`MARCA`, 31, 246);
    doc.text(`:  ${data.marca.toUpperCase()}`, 41, 246);

    doc.text(`TIPO`, 35, 249);
    doc.text(`:  ${data.tipo.toUpperCase()}`, 41, 249);

    doc.text(`MODELO`, 30, 252);
    doc.text(`:  ${data.modelo.toUpperCase()}`, 41, 252);

    doc.text(`CLASE`, 33, 255);
    doc.text(`:  ${data.clase.toUpperCase()}`, 41, 255);

    doc.text(`AÑO`, 35, 258);
    doc.text(`:  ${this.datePipe.transform(data.propietario.fecha_ingreso, 'yyyy', 'UTC')} / ${this.datePipe.transform(data.propietario.fecha_vencimiento, 'yyyy', 'UTC')}`, 41, 258);
    doc.text(`S.CARROCERÍA`, 22, 261);
    doc.text(`:  ${data.serialCarroceria.toUpperCase()}`, 41, 261);

    doc.text(`COLOR`, 32, 264);
    doc.text(`:  ${data.color.toUpperCase()}`, 41, 264);

    doc.setFontSize(8);
         // @ts-ignore
         doc.addImage(qrDataUri, 'PNG', 115, 225, 25, 25);
    doc.setFont('arial','bold')
    doc.text(`F. EMISIÓN: ${this.datePipe.transform(data.propietario.fecha_ingreso, 'dd/MM/yyyy', 'UTC')}`, 145, 235);
    doc.text(`F. VENCIMIENTO: ${this.datePipe.transform(data.propietario.fecha_vencimiento, 'dd/MM/yyyy', 'UTC')}`, 145, 240);

    doc.setFontSize(8);

    doc.text(`Se agradece a las autoridades brondar apoyo`, 130, 255);
    doc.text(`al portador de este carnet`, 143, 260);
    doc.setFontSize(6);
    doc.setFont('arial','bold')
    doc.text(`OFICINA: AVENIDA INTERCOMUNAL. SECTOR 4:10 EDIFICIO MARBA PB`, 120, 265);
    doc.text(`LOCAL, 1-A PARROQUIA LA ROSA, CABIMAS, ESTADO ZULIA`, 125, 270);

     doc.save(`factura-${data.propietario.nombre_contratante}.pdf`);
  }

  nextPage(){
  }

  lastPage(){
  }
}
