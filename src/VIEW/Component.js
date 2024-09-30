import React from 'react';
import Header from './HEAD/headerIndex'; // Importamos el header personalizado
import Footer from './HEAD/Footer'; // Importamos el footer
import logo from './IMG/logoFond.png'; // Importamos el logo
import reactLogo from './IMG/react.png'; // Logo de React
import xamppLogo from './IMG/xampp.png'; // Logo de XAMPP
import mysqlLogo from './IMG/mysql.png'; // Logo de MySQL
import vscodeLogo from './IMG/vscode.png'; // Logo de Visual Studio Code
import laptop from './IMG/LAPTOP.png'; // Importamos la imagen de laptop
import cell from './IMG/Cell.png'; // Importamos la imagen de celular
import pc from './IMG/pc.png'; // Importamos la imagen de PC

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Llamamos al header personalizado */}
      <Header />

      {/* Contenido principal de la página de inicio */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-12">
        {/* Logo centrado */}
        <div className="mb-5 text-center">
          <img 
            src={logo} 
            alt="Logo de InvControl" 
            style={{ height: '200px', width: '200px' }} 
            className="rounded-circle shadow"
          />
          <h1 className="display-4 mt-4 font-weight-bold">SISTEMA DE CONTROL DE INVENTARIO</h1>
        </div>

        {/* Descripción */}
        <section className="container mb-5">
          <h2 className="text-center mb-4">Solución Integral para la Gestión de Inventarios</h2>
          <p className="lead text-center">
            <strong>InvControl</strong> es una solución diseñada para optimizar el control de inventarios de empresas. 
            Nuestro sistema permite gestionar productos, visualizar movimientos de inventario, y administrar usuarios 
            con diferentes roles desde una plataforma intuitiva y moderna.
          </p>
        </section>

        {/* Sección con imágenes y texto */}
        <section className="container text-center mb-5">
          <div className="row">
            <div className="col-md-4">
              <img src={laptop} alt="Laptop" className="img-fluid mb-3" />
              <h3>Tecnología Avanzada</h3>
              <p className="text-muted">
                Desarrollado con <strong>React</strong>, este sistema garantiza una experiencia rápida y eficiente.
              </p>
            </div>
            <div className="col-md-4">
              <img src={cell} alt="Celular" className="img-fluid mb-3" />
              <h3>Accesible desde Cualquier Dispositivo</h3>
              <p className="text-muted">
                Administra tu inventario desde tu celular, tablet o computadora sin complicaciones.
              </p>
            </div>
            <div className="col-md-4">
              <img src={pc} alt="PC" className="img-fluid mb-3" />
              <h3>Centralización de Datos</h3>
              <p className="text-muted">
                Utilizando <strong>XAMPP</strong> y <strong>MySQL</strong> como base de datos, InvControl centraliza toda la información.
              </p>
            </div>
          </div>
        </section>

        {/* Bloques adicionales */}
        <section className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold mb-3">Objetivo Principal</h4>
                <p>
                  Reducir errores humanos y optimizar la gestión de inventarios mediante un control eficiente y en tiempo real.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold mb-3">Funcionalidades Clave</h4>
                <ul className="list-unstyled">
                  <li>✔️ Control de precios y stock.</li>
                  <li>✔️ Gestión de movimientos de inventario.</li>
                  <li>✔️ Administración de roles y permisos.</li>
                  <li>✔️ Reportes detallados en tiempo real.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de precios y modalidades de adquisición */}
        <section className="container text-center mt-5">
          <h3 className="mb-4">Opciones de Compra, Renta o Instalación Local</h3>
          <p className="lead text-muted mb-5">
            Ofrecemos diferentes modalidades para adquirir <strong>InvControl</strong>, adaptadas a las necesidades de negocios pequeños. 
            Ya sea que desees adquirir el sistema, rentarlo o instalarlo localmente, tenemos opciones económicas para ti.
          </p>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold mb-3">Compra del Sistema</h4>
                <p>
                  Obtén el sistema en su totalidad y aloja tu inventario en el hosting de tu elección. Esta opción te brinda autonomía total sobre el sistema.
                </p>
                <p className="font-weight-bold">Precio: $6,000 MXN</p> {/* Precio de compra */}
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold mb-3">Renta del Sistema</h4>
                <p>
                  Alquila <strong>InvControl</strong> con un hosting anual incluido a un precio accesible. Ideal para pequeños negocios que prefieren no manejar infraestructura propia.
                </p>
                <p className="font-weight-bold">Renta Anual: $4,500 MXN</p> {/* Precio de renta */}
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold mb-3">Instalación Local</h4>
                <p>
                  Si prefieres tener el sistema funcionando en tu propio equipo de forma local, ofrecemos el servicio de instalación personalizado. 
                  Nos encargaremos de configurar el sistema en tus instalaciones.
                </p>
                <p className="font-weight-bold">Costo de Instalación: $3,500 MXN</p> {/* Precio de instalación local */}
              </div>
            </div>
          </div>

          <p className="text-muted mt-4">
            Si necesitas funciones adicionales específicas para tu negocio, no dudes en contactarnos. El precio puede variar según tus requerimientos.
          </p>
        </section>

        {/* Sección con logos de herramientas de desarrollo */}
        <section className="container text-center mt-5">
          <h3 className="mb-4">Herramientas de Desarrollo</h3>
          <div className="row justify-content-center">
            <div className="col-3 col-md-2">
              <img src={reactLogo} alt="React Logo" className="img-fluid mb-3" />
              <p className="text-muted">React</p>
            </div>
            <div className="col-3 col-md-2">
              <img src={xamppLogo} alt="XAMPP Logo" className="img-fluid mb-3" />
              <p className="text-muted">XAMPP</p>
            </div>
            <div className="col-3 col-md-2">
              <img src={mysqlLogo} alt="MySQL Logo" className="img-fluid mb-3" />
              <p className="text-muted">MySQL</p>
            </div>
            <div className="col-3 col-md-2">
              <img src={vscodeLogo} alt="VS Code Logo" className="img-fluid mb-3" />
              <p className="text-muted">Visual Studio Code</p>
            </div>
          </div>
        </section>

        {/* Sección adicional con otros sistemas */}
        <section className="container text-center mt-5">
          <h3 className="mb-4">Otros Sistemas que Ofrecemos</h3>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold">Sistemas de Administración de Archivos</h4>
                <p>Administra documentos y archivos con facilidad, permitiendo almacenamiento y acceso seguro.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold">Catálogos de Productos</h4>
                <p>Presenta tus productos de manera organizada, con opciones de búsqueda y filtrado intuitivas.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold">Páginas Web de Visualización</h4>
                <p>Creación de páginas web dinámicas para visualizar información empresarial o de productos.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-weight-bold">Sistemas para Instituciones</h4>
                <p>Sistemas personalizados para la gestión de procesos y datos en instituciones educativas o corporativas.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
