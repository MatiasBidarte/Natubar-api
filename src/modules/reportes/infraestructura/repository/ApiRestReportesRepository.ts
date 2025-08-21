import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { PedidosService } from 'src/modules/pedidos/infraestructura/pedidos.service';
import { ReporteRepository } from '../../dominio/interfaces/ReporteRepository';
import {
  EstadosPedido,
  Pedido,
} from 'src/modules/pedidos/infraestructura/entities/pedido.entity';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';

@Injectable()
export class ApiRestReportesRepository implements ReporteRepository {
  constructor(private readonly pedidosService: PedidosService) {}

  async generarReporteEntregas(): Promise<Buffer> {
    const pedidos = await this.pedidosService.getByEstado(
      EstadosPedido.enCamino,
    );

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true,
      });
      doc.fontSize(20).text('Reporte de Entregas - NatuBar', {
        align: 'center',
      });
      doc.moveDown();
      doc.fontSize(14).text(
        `Fecha: ${new Date().toLocaleDateString('es-UY', {
          timeZone: 'America/Montevideo',
        })}`,
        {
          align: 'right',
        },
      );
      doc.moveDown();

      pedidos.forEach((pedido, index) => {
        this.generarPaginaPedido(doc, pedido, index + 1);
        doc.moveDown(2);
      });

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  private generarPaginaPedido(
    doc: typeof PDFDocument,
    pedido: Pedido,
    numero: number,
  ) {
    const datos = [
      { label: 'Cliente', value: '' },
      { label: 'Dirección', value: '' },
      { label: 'Ciudad', value: '' },
      { label: 'Teléfono', value: '' },
    ];
    const rowHeight = 25;
    const tablaAltura = datos.length * rowHeight + rowHeight; // altura de la tabla
    const espacioTitulos = 80; // espacio para títulos y separaciones
    const espacioObservaciones = 60; // espacio para observaciones y monto
    const espacioTotalNecesario =
      tablaAltura + espacioTitulos + espacioObservaciones;

    // Verificar si hay suficiente espacio en la página actual
    const espacioDisponible = doc.page.height - doc.y - 50; // 50 = margen inferior

    if (espacioTotalNecesario > espacioDisponible) {
      doc.addPage();
    }

    doc.x = 50;
    doc.fontSize(16).text(`Entrega #${numero}`, {
      align: 'center',
    });
    doc.moveDown();

    const nombreCliente =
      pedido.cliente.tipo === 'Persona'
        ? (pedido.cliente as ClientePersona).nombre
        : (pedido.cliente as ClienteEmpresa).nombreEmpresa;

    doc.fontSize(12).text('Información del Cliente:', {
      underline: true,
    });

    this.crearTablaCliente(doc, [
      { label: 'Cliente', value: nombreCliente },
      { label: 'Dirección', value: pedido.cliente.direccion },
      { label: 'Ciudad', value: pedido.cliente.ciudad },
      { label: 'Teléfono', value: pedido.cliente.telefono },
    ]);

    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(
        `Observaciones: ${pedido.observaciones || pedido.cliente.observaciones || 'No hay observaciones'}`,
      );
  }

  private crearTablaCliente(
    doc: typeof PDFDocument,
    datos: { label: string; value: string }[],
  ) {
    const startX = 50;
    const columnWidth = [150, 350];
    const rowHeight = 25;

    let yPosition = doc.y + rowHeight;

    doc.font('Helvetica').fontSize(12);
    datos.forEach((dato) => {
      doc.rect(startX, yPosition, columnWidth[0], rowHeight).stroke();
      doc
        .rect(startX + columnWidth[0], yPosition, columnWidth[1], rowHeight)
        .stroke();

      doc.text(dato.label, startX + 5, yPosition + 7, {
        width: columnWidth[0] - 10,
      });
      doc.text(
        dato.value || 'N/A',
        startX + columnWidth[0] + 5,
        yPosition + 7,
        { width: columnWidth[1] - 10 },
      );

      yPosition += rowHeight;
    });

    doc.y = yPosition;
    doc.x = 50;
  }
}
